// 위촉 시뮬레이터 데모: 사내 기준 문구를 "대외비" 더미로 바꾸고, 데모 코드 전체의 주석을 지운다.
// usage: node scripts/fa-recruit-redact.cjs .   (src/demos/fa-recruit 에 원본을 새로 복사한 직후 실행)
const fs = require("fs");
const path = require("path");
const root = process.argv[2];
const ts = require(path.join(root, "node_modules/typescript"));
const DEMO = path.join(root, "src/demos/fa-recruit");

// 파일별로 더미로 바꿀 속성 이름 · 변수 이름
const RULES = {
  "lib/domain/rules/limit-items.ts": { props: ["n", "note", "q", "exemptNote"], choices: true },
  "lib/domain/rules/documents.ts": {
    props: ["guide", "note"],
    vars: ["INSURER_COMMON_NOTE", "INSURER_COMMON_PATH", "QUALIFICATION_GROUP_NOTE", "EXEMPT_EDU_GROUP_NOTE", "DEBT_DOC_GUIDE", "REVIEW_DOCS_GROUP_NOTE"],
  },
  "lib/domain/rules/todo-items.ts": { props: ["guide"] },
  "lib/domain/rules/special-condition-guide.ts": {
    props: ["text", "sub", "items", "badgeNote", "docsFootnote", "footnote"],
  },
  "lib/domain/rules/malso-faq.ts": { props: ["q", "text", "items", "rows"] },
  "components/steps/precheck-card.tsx": { props: ["body"] },
  "lib/domain/final-diagnosis.ts": { props: ["desc"], vars: ["SONBO_NOTE", "SONBO_NOTE_OK", "reentryFollowUp"], pushArgs: true },
  "lib/domain/reentry.ts": { props: ["text", "sub"], vars: ["REPAYMENT_RELATION_NOTE"] },
};

const CHOICES = { qOk: "해당없음", qBad: "해당 · 기준 이하", qBlocked: "해당 · 기준 초과" };

/** 원문 줄 수와 길이를 대략 맞춘 더미. 블러를 걸면 글처럼 보이고, 풀어도 "대외비"만 읽힌다. */
function filler(original) {
  return original
    .split("\n")
    .map((line) => {
      const len = line.trim().length;
      if (!len) return "";
      const words = Math.min(10, Math.max(1, Math.round(len / 6)));
      return Array(words).fill("대외비").join(" ");
    })
    .join("\n");
}

function literalText(node, sf) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node)) return node.getText(sf).slice(1, -1);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const l = literalText(node.left, sf), r = literalText(node.right, sf);
    return l === null || r === null ? null : l + r;
  }
  if (ts.isParenthesizedExpression(node)) return literalText(node.expression, sf);
  return null;
}

/** 문자열(또는 문자열 배열 · 2차원 배열)을 더미로 바꾸는 편집을 모은다 */
function redactValue(node, sf, edits, make = filler) {
  const text = literalText(node, sf);
  if (text !== null) {
    edits.push([node.getStart(sf), node.getEnd(), JSON.stringify(make(text))]);
    return true;
  }
  if (ts.isConditionalExpression(node)) {
    const a = redactValue(node.whenTrue, sf, edits, make);
    return redactValue(node.whenFalse, sf, edits, make) || a;
  }
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const a = redactValue(node.left, sf, edits, make);
    return redactValue(node.right, sf, edits, make) || a;
  }
  if (ts.isParenthesizedExpression(node)) return redactValue(node.expression, sf, edits, make);
  if (ts.isArrayLiteralExpression(node)) {
    let any = false;
    for (const el of node.elements) any = redactValue(el, sf, edits, make) || any;
    return any;
  }
  return false;
}

function applyEdits(src, edits) {
  edits.sort((a, b) => b[0] - a[0]);
  let out = src;
  let last = Infinity;
  for (const [s, e, t] of edits) {
    if (e > last) continue; // 겹치는 편집(바깥이 이미 바뀜)은 건너뛴다
    out = out.slice(0, s) + t + out.slice(e);
    last = s;
  }
  return out;
}

function parse(file, src) {
  const kind = file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  return ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, kind);
}

// 1) 대외비 치환
const counts = {};
for (const [rel, rule] of Object.entries(RULES)) {
  const file = path.join(DEMO, rel);
  const src = fs.readFileSync(file, "utf8");
  const sf = parse(file, src);
  const edits = [];
  const props = new Set(rule.props || []);
  const vars = new Set(rule.vars || []);
  (function visit(node) {
    if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name)) {
      const name = node.name.text;
      if (props.has(name) && redactValue(node.initializer, sf, edits)) return;
      if (rule.choices && CHOICES[name] && redactValue(node.initializer, sf, edits, () => CHOICES[name])) return;
    }
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && vars.has(node.name.text) && node.initializer) {
      if (redactValue(node.initializer, sf, edits)) return;
    }
    if (rule.pushArgs && ts.isCallExpression(node) && node.expression.getText(sf).endsWith(".push")) {
      let any = false;
      for (const a of node.arguments) any = redactValue(a, sf, edits) || any;
      if (any) return;
    }
    ts.forEachChild(node, visit);
  })(sf);
  counts[rel] = edits.length;
  fs.writeFileSync(file, applyEdits(src, edits));
}

// 2) 주석 제거 (원본 주석에 사내 매뉴얼 인용 · 한도 · 결재 절차가 있다)
function stripComments(file) {
  let src = fs.readFileSync(file, "utf8");
  let sf = parse(file, src);
  const ranges = new Map();
  const add = (list) => (list || []).forEach((r) => ranges.set(r.pos, r.end));
  (function visit(node) {
    if (node.kind !== ts.SyntaxKind.JsxText) {
      add(ts.getLeadingCommentRanges(src, node.pos));
      add(ts.getTrailingCommentRanges(src, node.end));
    }
    node.getChildren(sf).forEach(visit);
  })(sf);
  add(ts.getLeadingCommentRanges(src, sf.endOfFileToken.pos));
  src = applyEdits(src, [...ranges].map(([s, e]) => [s, e, ""]));
  // JSX 안의 {/* */} 가 {} 로 남으면 지운다
  sf = parse(file, src);
  const empties = [];
  (function visit(node) {
    if (ts.isJsxExpression(node) && !node.expression) empties.push([node.getStart(sf), node.getEnd(), ""]);
    ts.forEachChild(node, visit);
  })(sf);
  src = applyEdits(src, empties);
  // 주석이 있던 줄의 빈 줄 · 끝 공백 정리
  src = src
    .split("\n")
    .map((l) => l.replace(/[ \t]+$/, ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\n+/, "");
  fs.writeFileSync(file, src);
}

const files = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(f.name)) files.push(p);
  }
})(DEMO);
files.filter((f) => !f.endsWith("confidential.tsx")).forEach(stripComments);
console.log("redacted edits:", counts, "\nstripped comments in", files.length, "files");
