import type { DiagnosisSnapshot, SnapshotCheckGroup } from '../share/diagnosis-snapshot';
import { CHECKED, UNCHECKED, cleanText, type SheetLink, type SheetSpec } from './diagnosis-sheets';

const SUMMARY_HEADERS = [
  'No.',
  '파트너명',
  '성명',
  '자격',
  '경력구분',
  '최종결과',
  '등록예정일',
  '경력조회',
  '시험합격일',
  '교육이수일',
  '보증보험',
  'E-클린',
  '말소일',
  '재입사횟수',
  '말소경과',
  '환수금',
  '환수예상금',
  '해당 진단 항목',

  '판정확정',
] as const;

const SUMMARY_WIDTHS = [5, 12, 10, 11, 9, 12, 12, 9, 12, 12, 9, 9, 13, 16, 14, 8, 10, 30, 17];

const SUMMARY_SHEET_NAME = '결과요약';

const SHEET_NAME_MAX = 31;
const FORBIDDEN_IN_SHEET_NAME = /[[\]:*?/\\]/g;

const DASH = '-';

const NOT_APPLICABLE = '해당없음';

export type MultiPerson = {

  no: number;
  snapshot: DiagnosisSnapshot;
};

function reentryValue(snapshot: DiagnosisSnapshot, label: string): string {
  if (snapshot.qualify.reentryRows.length === 0) return NOT_APPLICABLE;
  return snapshot.qualify.reentryRows.find((r) => r.label === label)?.value ?? DASH;
}

function summaryRow(person: MultiPerson): string[] {
  const { snapshot: s, no } = person;
  return [
    String(no),
    s.candidate.partner || DASH,
    s.candidate.name || DASH,
    s.identity.roleLabel,
    s.identity.typeLabel,
    s.qualify.title,
    s.identity.targetDate,
    s.career.done ? '확인완료' : '미확인',
    s.career.examDate,
    s.career.eduDate,
    s.precheck.bond,
    s.precheck.eclean,
    s.precheck.malso,
    reentryValue(s, '당사 등록 횟수'),
    reentryValue(s, '협회 말소 경과'),
    reentryValue(s, '환수금'),
    reentryValue(s, '환수예상금'),
    cleanText(s.qualify.flaggedText),
    s.judgedAt ?? DASH,
  ];
}

function buildSummarySheet(people: readonly MultiPerson[]): SheetSpec {
  return {
    name: SUMMARY_SHEET_NAME,
    rows: [[...SUMMARY_HEADERS], ...people.map(summaryRow)],
    colWidths: SUMMARY_WIDTHS,
    style: { colHeaderRow: 0 },
  };
}

export function safeSheetName(person: MultiPerson, used: Set<string>): string {
  const base = `${person.no}.${person.snapshot.candidate.name || '대상자'}`
    .replace(FORBIDDEN_IN_SHEET_NAME, ' ')
    .trim()
    .slice(0, SHEET_NAME_MAX);
  let name = base;
  let k = 1;
  while (used.has(name)) {
    k += 1;
    name = `${base.slice(0, SHEET_NAME_MAX - 4)}_${k}`.slice(0, SHEET_NAME_MAX);
  }
  used.add(name);
  return name;
}

export type PersonRowKind = 'person' | 'meta' | 'colhdr' | 'sub' | 'group' | 'item';

export type PersonSheetSpec = SheetSpec & {

  kinds: PersonRowKind[];

  headerColor: string;
};

const GRADE_COLOR: Record<string, string> = {
  ok: '1A6B3A',
  warn: 'D4830A',
  pending: 'D4830A',
  bad: 'C0392B',
};
const GRADE_COLOR_FALLBACK = '4A5568';

function pushCheckGroups(
  groups: readonly SnapshotCheckGroup[],
  rows: string[][],
  kinds: PersonRowKind[],
  links: SheetLink[],
): void {
  for (const group of groups) {
    rows.push([`[ ${cleanText(group.title)} ]`, '', '']);
    kinds.push('group');
    for (const item of group.items) {
      rows.push([cleanText(item.name), item.link?.text ?? '', item.checked ? CHECKED : UNCHECKED]);
      kinds.push('item');

      if (item.link) links.push({ row: rows.length - 1, col: 1, url: item.link.url });
    }
  }
}

export function buildPersonSheet(person: MultiPerson, name: string): PersonSheetSpec {
  const s = person.snapshot;
  const rows: string[][] = [];
  const kinds: PersonRowKind[] = [];
  const links: SheetLink[] = [];

  const docs = s.docs;
  const todo = s.todos.progress;
  const progressText = s.isBlocked
    ? `필수 ${todo.done}/${todo.total}`
    : `서류 ${docs?.progress.done ?? 0}/${docs?.progress.total ?? 0}  ·  필수 ${todo.done}/${todo.total}`;

  rows.push([
    `${person.no}. ${s.candidate.name || '대상자'} · ${s.qualify.title} (${s.identity.typeLabel})`,
    '',
    '',
  ]);
  kinds.push('person');
  rows.push([`파트너 ${s.candidate.partner || DASH}    ${progressText}`, '', '']);
  kinds.push('meta');
  rows.push(['항목', '링크', '상태']);
  kinds.push('colhdr');

  if (!s.isBlocked && docs) {
    rows.push(['구비서류', '', '']);
    kinds.push('sub');
    pushCheckGroups(docs.groups, rows, kinds, links);
  }

  rows.push(['필수이행', '', '']);
  kinds.push('sub');
  pushCheckGroups(s.todos.groups, rows, kinds, links);

  const merges = kinds.flatMap((kind, r) =>
    kind === 'item' || kind === 'colhdr' ? [] : [{ s: { r, c: 0 }, e: { r, c: 2 } }],
  );

  return {
    name,
    rows,
    kinds,
    colWidths: [42, 22, 10],
    merges,
    links,
    headerColor: GRADE_COLOR[s.qualify.grade ?? ''] ?? GRADE_COLOR_FALLBACK,
  };
}

export type MultiSheets = { summary: SheetSpec; people: PersonSheetSpec[] };

export function buildMultiSheets(people: readonly MultiPerson[]): MultiSheets {
  const used = new Set<string>([SUMMARY_SHEET_NAME]);
  return {
    summary: buildSummarySheet(people),
    people: people.map((person) => buildPersonSheet(person, safeSheetName(person, used))),
  };
}

export function multiExcelFilename(generatedAt: string): string {
  return `위촉진단_결과_${generatedAt.slice(0, 10).replace(/-/g, '')}.xlsx`;
}
