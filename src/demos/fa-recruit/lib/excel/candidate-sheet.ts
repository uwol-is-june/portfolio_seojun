import * as XLSX from 'xlsx';

import { EMPTY_CANDIDATE_INFO, type CandidateInfo } from '../domain/candidates';

const HEADERS = ['소속(파트너명)', '이름', '생년월일', '사번'] as const;
const SAMPLE_ROW = ['00사업단', '홍길동', '19900101', 'A12345'] as const;

const SHEET_NAME = '대상자목록';
const TEMPLATE_FILENAME = '위촉진단_대상자목록_양식.xlsx';

export function downloadCandidateTemplate(): void {
  const sheet = XLSX.utils.aoa_to_sheet([[...HEADERS], [...SAMPLE_ROW]]);
  sheet['!cols'] = [{ wch: 16 }, { wch: 10 }, { wch: 12 }, { wch: 10 }];
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, sheet, SHEET_NAME);
  XLSX.writeFile(book, TEMPLATE_FILENAME);
}

export type ParseResult = { ok: true; rows: CandidateInfo[] } | { ok: false; message: string };

export const NO_NAME_COLUMN_MESSAGE = '"이름" 컬럼이 없습니다. 양식을 확인해주세요.';
export const NO_DATA_MESSAGE = '데이터가 없습니다.';
export const UNREADABLE_MESSAGE = '파일을 읽을 수 없습니다.';

function text(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

export function parseCandidateSheet(data: ArrayBuffer): ParseResult {
  try {
    const book = XLSX.read(data);
    const sheet = book.Sheets[book.SheetNames[0]];
    if (!sheet) return { ok: false, message: NO_DATA_MESSAGE };

    const grid = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, defval: '' });
    if (grid.length < 2) return { ok: false, message: NO_DATA_MESSAGE };

    const header = (grid[0] ?? []).map(text);
    const nameCol = header.indexOf('이름');
    if (nameCol < 0) return { ok: false, message: NO_NAME_COLUMN_MESSAGE };

    const columnOf = (label: string) => header.indexOf(label);
    const partnerCol = columnOf('소속(파트너명)');
    const birthCol = columnOf('생년월일');
    const empnoCol = columnOf('사번');

    const rows: CandidateInfo[] = [];
    for (const row of grid.slice(1)) {
      const name = text(row[nameCol]);
      if (!name) continue;
      rows.push({
        ...EMPTY_CANDIDATE_INFO,
        name,
        partner: partnerCol >= 0 ? text(row[partnerCol]) : '',

        birth: birthCol >= 0 ? text(row[birthCol]).replace(/[-./]/g, '') : '',
        empno: empnoCol >= 0 ? text(row[empnoCol]) : '',
      });
    }
    return { ok: true, rows };
  } catch {
    return { ok: false, message: UNREADABLE_MESSAGE };
  }
}
