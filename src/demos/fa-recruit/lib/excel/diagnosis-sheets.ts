import type { DiagnosisSnapshot, SnapshotCheckGroup } from '../share/diagnosis-snapshot';

export type SheetCell = string;

export type SheetLink = { row: number; col: number; url: string };

export type SheetMerge = { s: { r: number; c: number }; e: { r: number; c: number } };

export type SheetSpec = {

  name: string;
  rows: SheetCell[][];

  colWidths: number[];
  merges?: SheetMerge[];
  links?: SheetLink[];

  style?: {

    titleRows?: number[];

    subRows?: number[];

    colHeaderRow?: number;

    labelCol?: boolean;
  };
};

export const CHECKED = '☑';
export const UNCHECKED = '☐';

const DASH = '-';

export function cleanText(text: string): string {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/\n/g, ' ')
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{20E3}■]/gu, '')
    .replace(/^\s*\d+\.\s*/, '')
    .trim();
}

function section(title: string, width: number): SheetCell[] {
  return [`[ ${cleanText(title)} ]`, ...Array<string>(width - 1).fill('')];
}

function buildSummarySheet(snapshot: DiagnosisSnapshot): SheetSpec {
  const { candidate, identity, career, qualify } = snapshot;
  const rows: SheetCell[][] = [
    ['위촉 사전 진단 결과', ''],
    [
      `작성일: ${snapshot.generatedAt}  ·  입력 기반 참고용 · 실제 위촉 결과는 달라질 수 있습니다`,
      '',
    ],
    ['', ''],
    section('인적사항', 2),
  ];

  for (const row of [...candidate.rows, ...snapshot.precheck.rows])
    rows.push([row.label, row.value]);

  rows.push(['', ''], section('진단 설정', 2));
  rows.push(['자격', identity.roleLabel]);
  rows.push(['유형', identity.typeLabel]);
  if (identity.specialLabel) rows.push(['특수 조건', identity.specialLabel]);
  rows.push(['등록예정일', identity.targetDate]);

  rows.push(['', ''], section('경력조회', 2));
  rows.push(['경력 결과', career.line]);
  rows.push(['유효기간 만료일', career.expiresAt ?? DASH]);
  if (career.conversionNote) rows.push(['유형 전환 근거', career.conversionNote]);

  rows.push(['', ''], section('최종 진단 결과', 2));
  rows.push(['진단 결과', qualify.title]);
  rows.push(['결과 상세', qualify.desc ? cleanText(qualify.desc) : DASH]);

  if (snapshot.judgedAt) rows.push(['판정 확정 시각', snapshot.judgedAt]);

  if (qualify.reentryRows.length > 0) {
    rows.push(['', ''], section('재입사 정보', 2));
    for (const row of qualify.reentryRows) rows.push([row.label, row.value]);
  }

  return {
    name: '진단요약',
    rows,
    colWidths: [14, 46],

    merges: [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } },
    ],
    style: { titleRows: [0], subRows: [1], labelCol: true },
  };
}

function buildItemSheet(snapshot: DiagnosisSnapshot): SheetSpec {
  const rows: SheetCell[][] = [['항목', '확인처', '결과']];
  for (const sec of snapshot.qualify.sections) {
    rows.push(section(sec.title, 3));
    for (const row of sec.rows) rows.push([cleanText(row.name), row.agency, row.answer]);
  }
  if (snapshot.qualify.reentryRows.length > 0) {
    rows.push(section('재입사 확인', 3));
    for (const row of snapshot.qualify.reentryRows) {

      rows.push([row.label, row.label === '당사 등록 횟수' ? '당사 확인' : DASH, row.value]);
    }
  }
  return { name: '항목별결과', rows, colWidths: [28, 18, 14], style: { colHeaderRow: 0 } };
}

function buildCheckSheet(
  name: string,
  headers: [string, string, string, string],
  groups: readonly SnapshotCheckGroup[],
  colWidths: number[],
): SheetSpec {
  const rows: SheetCell[][] = [[...headers]];
  const links: SheetLink[] = [];
  for (const group of groups) {
    rows.push(section(group.title, 4));
    for (const item of group.items) {
      rows.push([
        cleanText(item.name),
        item.note,
        item.link?.text ?? '',
        item.checked ? CHECKED : UNCHECKED,
      ]);

      if (item.link) links.push({ row: rows.length - 1, col: 2, url: item.link.url });
    }
  }
  return { name, rows, colWidths, links, style: { colHeaderRow: 0 } };
}

export function buildDiagnosisSheets(snapshot: DiagnosisSnapshot): SheetSpec[] {
  const sheets: SheetSpec[] = [buildSummarySheet(snapshot), buildItemSheet(snapshot)];

  if (!snapshot.isBlocked) {
    if (snapshot.docs) {
      sheets.push(
        buildCheckSheet(
          '제출서류',
          ['서류명', '비고/출처', '링크', '상태'],
          snapshot.docs.groups,
          [34, 22, 24, 8],
        ),
      );
    }
    sheets.push(
      buildCheckSheet(
        '필수이행',
        ['항목', '설명', '링크', '상태'],
        snapshot.todos.groups,
        [26, 36, 22, 8],
      ),
    );
  } else {

    const reviewGroups = (snapshot.docs?.groups ?? []).filter((g) => g.review);
    if (reviewGroups.length > 0) {
      sheets.push(
        buildCheckSheet(
          '심사보완서류',
          ['서류명', '비고/출처', '링크', '상태'],
          reviewGroups,
          [34, 22, 24, 8],
        ),
      );
    }
  }

  return sheets;
}

export function diagnosisExcelFilename(snapshot: DiagnosisSnapshot): string {
  const name = snapshot.candidate.name || '대상자';

  const stamp = snapshot.generatedAt.slice(0, 10).replace(/-/g, '');
  return `위촉진단_${name}_${stamp}.xlsx`;
}
