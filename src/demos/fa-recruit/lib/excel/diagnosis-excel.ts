import * as XLSX from 'xlsx-js-style';

import type { DiagnosisSnapshot } from '../share/diagnosis-snapshot';
import {
  CHECKED,
  UNCHECKED,
  buildDiagnosisSheets,
  diagnosisExcelFilename,
  type SheetSpec,
} from './diagnosis-sheets';
import {
  buildMultiSheets,
  multiExcelFilename,
  type MultiPerson,
  type MultiSheets,
  type PersonRowKind,
  type PersonSheetSpec,
} from './multi-sheets';

const BORDER_COLOR = 'C8D4E8';
const TITLE_BG = '1E3A6E';
const SUB_BG = 'F7F9FD';
const SUB_FG = '888888';
const COL_HEADER_BG = '3A5F9F';
const SECTION_BG = 'D9E4F5';
const SECTION_FG = '1E3A6E';
const LABEL_BG = 'F0F4FB';
const LABEL_FG = '444444';
const CHECKED_FG = '1A6B3A';
const UNCHECKED_FG = 'AAB2C0';
const LINK_FG = '1A56B5';

const SECTION_PATTERN = /^\[ .* \]$/;

type CellStyle = Record<string, unknown>;

function thinBorder() {
  const thin = { style: 'thin', color: { rgb: BORDER_COLOR } };
  return { top: thin, bottom: thin, left: thin, right: thin };
}

function applyStyle(ws: XLSX.WorkSheet, spec: SheetSpec): void {
  if (!ws['!ref']) return;
  const range = XLSX.utils.decode_range(ws['!ref']);
  const border = thinBorder();
  const titleRows = spec.style?.titleRows ?? [];
  const subRows = spec.style?.subRows ?? [];
  const colHeaderRow = spec.style?.colHeaderRow ?? -1;
  const labelCol = spec.style?.labelCol ?? false;

  for (let r = range.s.r; r <= range.e.r; r += 1) {
    const first = ws[XLSX.utils.encode_cell({ r, c: 0 })];
    const firstText = first?.v != null ? String(first.v).trim() : '';
    const isSection = SECTION_PATTERN.test(firstText);
    const isTitle = titleRows.includes(r);
    const isSub = subRows.includes(r);
    const isColHeader = colHeaderRow === r;

    let hasContent = false;
    for (let c = range.s.c; c <= range.e.c; c += 1) {
      const cell = ws[XLSX.utils.encode_cell({ r, c })];
      if (cell && cell.v !== '' && cell.v != null) {
        hasContent = true;
        break;
      }
    }
    if (!hasContent && !isTitle && !isSub) continue;

    for (let c = range.s.c; c <= range.e.c; c += 1) {
      const addr = XLSX.utils.encode_cell({ r, c });

      const cell = ws[addr] ?? (ws[addr] = { t: 's', v: '' });
      cell.s = cellStyle({ border, isTitle, isSub, isColHeader, isSection, labelCol, cell, c });
    }
  }
}

function cellStyle(args: {
  border: ReturnType<typeof thinBorder>;
  isTitle: boolean;
  isSub: boolean;
  isColHeader: boolean;
  isSection: boolean;
  labelCol: boolean;
  cell: XLSX.CellObject;
  c: number;
}): CellStyle {
  const { border, isTitle, isSub, isColHeader, isSection, labelCol, cell, c } = args;
  const base: CellStyle = { border };

  if (isTitle) {
    return {
      ...base,
      font: { bold: true, sz: 13, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: TITLE_BG } },
      alignment: { horizontal: 'center', vertical: 'center' },
    };
  }
  if (isSub) {
    return {
      ...base,
      font: { sz: 8, color: { rgb: SUB_FG } },
      fill: { fgColor: { rgb: SUB_BG } },
      alignment: { horizontal: 'center', wrapText: true },
    };
  }
  if (isColHeader) {
    return {
      ...base,
      font: { bold: true, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: COL_HEADER_BG } },
      alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    };
  }
  if (isSection) {
    return {
      ...base,
      font: { bold: true, color: { rgb: SECTION_FG } },
      fill: { fgColor: { rgb: SECTION_BG } },
    };
  }
  if (labelCol && c === 0) {
    return {
      ...base,
      font: { bold: true, color: { rgb: LABEL_FG } },
      fill: { fgColor: { rgb: LABEL_BG } },
      alignment: { vertical: 'center', wrapText: true },
    };
  }

  const body: CellStyle = { ...base, alignment: { vertical: 'center', wrapText: true } };
  if (cell.v === CHECKED) {
    return {
      ...body,
      font: { bold: true, sz: 12, color: { rgb: CHECKED_FG } },
      alignment: { horizontal: 'center', vertical: 'center' },
    };
  }
  if (cell.v === UNCHECKED) {
    return {
      ...body,
      font: { sz: 12, color: { rgb: UNCHECKED_FG } },
      alignment: { horizontal: 'center', vertical: 'center' },
    };
  }
  if (cell.l) return { ...body, font: { color: { rgb: LINK_FG }, underline: true } };
  return body;
}

export function toWorksheet(spec: SheetSpec): XLSX.WorkSheet {
  const ws = XLSX.utils.aoa_to_sheet(spec.rows);
  ws['!cols'] = spec.colWidths.map((wch) => ({ wch }));
  if (spec.merges) ws['!merges'] = spec.merges;
  for (const link of spec.links ?? []) {
    const addr = XLSX.utils.encode_cell({ r: link.row, c: link.col });
    const cell = ws[addr];
    if (cell) cell.l = { Target: link.url, Tooltip: link.url };
  }
  applyStyle(ws, spec);
  return ws;
}

export function toWorkbook(sheets: readonly SheetSpec[]): XLSX.WorkBook {
  const wb = XLSX.utils.book_new();
  for (const spec of sheets) XLSX.utils.book_append_sheet(wb, toWorksheet(spec), spec.name);
  return wb;
}

export function downloadDiagnosisExcel(snapshot: DiagnosisSnapshot): string {
  const filename = diagnosisExcelFilename(snapshot);
  XLSX.writeFile(toWorkbook(buildDiagnosisSheets(snapshot)), filename);
  return filename;
}

export const EXCEL_DONE_MESSAGE = '엑셀(.xlsx) 저장 완료';

const PERSON_ROW_STYLE: Record<Exclude<PersonRowKind, 'person' | 'item'>, CellStyle> = {
  meta: {
    font: { sz: 9, color: { rgb: '666666' } },
    fill: { fgColor: { rgb: 'F7F9FD' } },
    alignment: { vertical: 'center' },
  },
  colhdr: {
    font: { bold: true, color: { rgb: 'FFFFFF' } },
    fill: { fgColor: { rgb: COL_HEADER_BG } },
    alignment: { horizontal: 'center', vertical: 'center' },
  },
  sub: {
    font: { bold: true, color: { rgb: '1E3A6E' } },
    fill: { fgColor: { rgb: 'E8EEF8' } },
    alignment: { vertical: 'center' },
  },
  group: {
    font: { bold: true, color: { rgb: '2A5298' } },
    fill: { fgColor: { rgb: LABEL_BG } },
    alignment: { vertical: 'center' },
  },
};

export function toPersonWorksheet(spec: PersonSheetSpec): XLSX.WorkSheet {
  const ws = XLSX.utils.aoa_to_sheet(spec.rows);
  ws['!cols'] = spec.colWidths.map((wch) => ({ wch }));
  if (spec.merges) ws['!merges'] = spec.merges;
  for (const link of spec.links ?? []) {
    const addr = XLSX.utils.encode_cell({ r: link.row, c: link.col });
    const cell = ws[addr];
    if (cell) cell.l = { Target: link.url, Tooltip: link.url };
  }

  const border = thinBorder();
  spec.kinds.forEach((kind, r) => {
    for (let c = 0; c < 3; c += 1) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const cell = ws[addr] ?? (ws[addr] = { t: 's', v: '' });
      cell.s = { border, ...personCellStyle(kind, spec.headerColor, cell, c) };
    }
  });
  return ws;
}

function personCellStyle(
  kind: PersonRowKind,
  headerColor: string,
  cell: XLSX.CellObject,
  c: number,
): CellStyle {
  if (kind === 'person') {
    return {
      font: { bold: true, sz: 12, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: headerColor } },
      alignment: { vertical: 'center', wrapText: true },
    };
  }
  if (kind !== 'item') return PERSON_ROW_STYLE[kind];

  const body: CellStyle = { alignment: { vertical: 'center', wrapText: true } };
  if (c === 1 && cell.l) return { ...body, font: { color: { rgb: LINK_FG }, underline: true } };
  if (c === 2 && cell.v === CHECKED) {
    return {
      font: { bold: true, sz: 12, color: { rgb: CHECKED_FG } },
      alignment: { horizontal: 'center', vertical: 'center' },
    };
  }
  if (c === 2 && cell.v === UNCHECKED) {
    return {
      font: { sz: 12, color: { rgb: UNCHECKED_FG } },
      alignment: { horizontal: 'center', vertical: 'center' },
    };
  }
  return body;
}

export function toMultiWorkbook(sheets: MultiSheets): XLSX.WorkBook {
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, toWorksheet(sheets.summary), sheets.summary.name);
  for (const person of sheets.people) {
    XLSX.utils.book_append_sheet(wb, toPersonWorksheet(person), person.name);
  }
  return wb;
}

export function downloadMultiExcel(people: readonly MultiPerson[], generatedAt: string): string {
  const filename = multiExcelFilename(generatedAt);
  XLSX.writeFile(toMultiWorkbook(buildMultiSheets(people)), filename);
  return filename;
}

export function multiExcelDoneMessage(count: number): string {
  return `엑셀(.xlsx) 저장 완료 — ${count}명 (탭 ${count}개)`;
}

export const NO_DIAGNOSED_MESSAGE = '진단 완료된 대상자가 없습니다.';
