import type { DiagnosisSnapshot } from '../share/diagnosis-snapshot';

export const IMAGE_WIDTH = 800;
export const PAD = 32;
export const ROW_H = 24;
export const GROUP_H = 22;

export const SCALE = 2;

const FINAL_LINE_H = 22;
const BAD_LINE_H = 14;

const BANNER_INNER_PAD = 28;

export const COLOR = {
  brand: '#1a3a6b',
  text: '#1a202c',
  muted: '#9aa3b2',
  subtle: '#5a6478',
  line: '#eef0f4',
  tableHead: '#e8eef8',
  tableBorder: '#9aa3b2',
  danger: '#c0392b',
  dangerBg: '#fdf0ef',
  warn: '#d4830a',
  warnBg: '#fef8ec',
  ok: '#1a6b3a',
  white: '#ffffff',
} as const;

const GRADE_COLOR: Record<string, string> = {
  ok: COLOR.ok,
  bad: COLOR.danger,
  warn: COLOR.warn,
  pending: COLOR.warn,
};

export type Measure = (text: string, font: string) => number;

export type ImageRow =
  { type: 'group'; label: string } | { type: 'item'; label: string; checked: boolean };

export type ImageWarning = { tone: 'danger' | 'warn'; text: string };

export type ResultImageModel = {

  height: number;
  subtitle: string;

  table: { labels: string[]; values: string[]; dangerCols: number[] };

  malsoLine: string | null;
  warnings: ImageWarning[];
  disclaimer: string;
  final: { color: string; lines: string[]; badLines: string[]; boxHeight: number };
  careerRows: [string, string][];

  reentryRows: [string, string][] | null;
  docRows: ImageRow[];
  todoRows: ImageRow[];
};

export const IMAGE_TITLE = '인카 위촉 사전 진단 시뮬레이터';

export function font(size: number, weight?: string): string {
  return `${weight ?? 'normal'} ${size}px -apple-system,Pretendard,"Noto Sans KR",sans-serif`;
}

export function wrapText(
  text: string,
  maxWidth: number,
  fontSpec: string,
  measure: Measure,
): string[] {
  const out: string[] = [];
  let cur = '';
  for (const ch of String(text ?? '')) {
    const test = cur + ch;
    if (measure(test, fontSpec) > maxWidth && cur) {
      out.push(cur);
      cur = ch;
    } else {
      cur = test;
    }
  }
  if (cur) out.push(cur);
  return out.length ? out : [''];
}

export function ellipsize(
  text: string,
  maxWidth: number,
  fontSpec: string,
  measure: Measure,
): string {
  if (measure(text, fontSpec) <= maxWidth) return text;
  let cut = text;
  while (cut.length > 0 && measure(`${cut}…`, fontSpec) > maxWidth) cut = cut.slice(0, -1);
  return `${cut}…`;
}

function stripEmoji(text: string): string {
  return text.replace(/[\p{Extended_Pictographic}\u{FE0F}]/gu, '').trim();
}

function buildDocRows(snapshot: DiagnosisSnapshot): ImageRow[] {
  const rows: ImageRow[] = [];

  const reviewSection = snapshot.qualify.sections.find((s) => s.title === '심사 대상 항목');
  const hits = (reviewSection?.rows ?? []).filter(
    (r) => r.answer === '해당' || r.answer === '해당(불가수준)',
  );
  if (hits.length > 0) {
    rows.push({ type: 'group', label: '⚠️ 심사 대상 항목 (승인 필요)' });
    for (const hit of hits) rows.push({ type: 'item', label: hit.name, checked: false });
  }

  for (const group of snapshot.docs?.groups ?? []) {
    rows.push({ type: 'group', label: stripEmoji(group.title) });
    for (const item of group.items) {
      rows.push({ type: 'item', label: item.name, checked: item.checked });
    }
  }
  return rows;
}

function buildTodoRows(snapshot: DiagnosisSnapshot): ImageRow[] {
  return snapshot.todos.groups.flatMap((group): ImageRow[] => [
    { type: 'group', label: stripEmoji(group.title) },
    ...group.items.map((item): ImageRow => ({
      type: 'item',
      label: item.name,
      checked: item.checked,
    })),
  ]);
}

function warningTone(key: string): 'danger' | 'warn' {
  return key === 'malso' ? 'danger' : 'warn';
}

export function buildResultImageModel(
  snapshot: DiagnosisSnapshot,
  measure: Measure,
): ResultImageModel {
  const { candidate, precheck, identity, career, qualify } = snapshot;

  const statusValues = [precheck.malsoStatus, precheck.bond, precheck.eclean];
  const STATUS_FIRST_COL = 3;

  const bannerMaxW = IMAGE_WIDTH - PAD * 2 - BANNER_INNER_PAD;
  const finalText = qualify.done ? qualify.line : qualify.title;
  const finalLines = wrapText(finalText, bannerMaxW, font(14, '800'), measure);

  const badText = qualify.flagged.map((f) => `· ${f.name} (${f.suffix})`).join('  ');
  const badLines = badText ? wrapText(badText, bannerMaxW, font(10), measure) : [];

  let finalBoxH = 14 + finalLines.length * FINAL_LINE_H;
  if (badLines.length) finalBoxH += 8 + badLines.length * BAD_LINE_H;
  finalBoxH = Math.max(36, finalBoxH);
  const bannerExtra = Math.max(0, finalBoxH - (badLines.length ? 52 : 36));

  const docRows = buildDocRows(snapshot);
  const todoRows = buildTodoRows(snapshot);
  const tableRows = Math.max(docRows.length, todoRows.length);

  const malsoLine = precheck.malsoDate
    ? `말소일: ${precheck.malsoDate}${precheck.malsoStatus === '미완료' ? ' (예정)' : ''}`
    : null;
  const TABLE_BLOCK_H = 76;
  const malsoH = malsoLine ? 20 : 0;
  const warnH = precheck.warnings.length * 36;
  const reentryRows: [string, string][] | null =
    qualify.reentryRows.length > 0
      ? qualify.reentryRows.map((r): [string, string] => [r.label, r.value])
      : null;
  const reentryH = reentryRows ? 22 + 18 * reentryRows.length + 8 : 0;

  const height =
    260 + tableRows * ROW_H + 60 + TABLE_BLOCK_H + malsoH + warnH + bannerExtra + reentryH;

  return {
    height,
    subtitle: `생성일시: ${snapshot.generatedAt}  ·  유형: ${identity.typeLabel}`,
    table: {
      labels: ['파트너명', '성명', '인카사번', '말소여부', '보증보험', 'E-클린', '생년월일'],
      values: [
        candidate.partner || '-',
        candidate.name || '-',
        candidate.empno || '-',
        precheck.malsoStatus,
        precheck.bond,
        precheck.eclean,
        candidate.birth || '-',
      ],

      dangerCols: statusValues.flatMap((v, i) =>
        v.startsWith('미') ? [STATUS_FIRST_COL + i] : [],
      ),
    },
    malsoLine,
    warnings: precheck.warnings.map((w) => ({ tone: warningTone(w.key), text: w.line })),
    disclaimer: `⚠️  ${snapshot.disclaimerFull.replace(/^※\s*/, '')}`,
    final: {
      color: GRADE_COLOR[qualify.grade ?? ''] ?? COLOR.warn,
      lines: finalLines,
      badLines,
      boxHeight: finalBoxH,
    },
    careerRows: [
      ['등록예정일', identity.targetDate],
      ['결과', career.line],
    ],
    reentryRows,
    docRows,
    todoRows,
  };
}

export function resultImageFilename(generatedAt: string): string {
  return `위촉진단결과_${generatedAt.slice(0, 10).replace(/-/g, '')}.png`;
}
