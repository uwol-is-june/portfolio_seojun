import type { DiagnosisSnapshot } from '../share/diagnosis-snapshot';
import {
  COLOR,
  GROUP_H,
  IMAGE_TITLE,
  IMAGE_WIDTH,
  PAD,
  ROW_H,
  SCALE,
  buildResultImageModel,
  ellipsize,
  font,
  resultImageFilename,
  type ImageRow,
  type ResultImageModel,
} from './result-image-layout';

function canvasMeasure(): (text: string, fontSpec: string) => number {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return (text) => text.length * 7;
  return (text, fontSpec) => {
    ctx.font = fontSpec;
    return ctx.measureText(text).width;
  };
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function sectionTitle(
  ctx: CanvasRenderingContext2D,
  title: string,
  x: number,
  y: number,
  width: number,
): number {
  ctx.font = font(12, '800');
  ctx.fillStyle = COLOR.brand;
  ctx.fillText(title, x, y + 12);
  ctx.strokeStyle = COLOR.brand;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y + 16);
  ctx.lineTo(x + width, y + 16);
  ctx.stroke();
  return y + 22;
}

function labelValue(
  ctx: CanvasRenderingContext2D,
  label: string,
  value: string,
  y: number,
): number {
  ctx.font = font(11);
  ctx.fillStyle = COLOR.muted;
  ctx.fillText(label, PAD, y + 12);
  ctx.fillStyle = COLOR.text;
  ctx.fillText(value, PAD + 76, y + 12);
  return y + 18;
}

function warningBox(
  ctx: CanvasRenderingContext2D,
  text: string,
  tone: 'danger' | 'warn',
  y: number,
  width: number,
): number {
  ctx.fillStyle = tone === 'danger' ? COLOR.dangerBg : COLOR.warnBg;
  ctx.strokeStyle = tone === 'danger' ? COLOR.danger : COLOR.warn;
  ctx.lineWidth = 1;
  roundRect(ctx, PAD, y, width, 28, 6);
  ctx.font = font(10.5, '700');
  ctx.fillStyle = tone === 'danger' ? COLOR.danger : COLOR.warn;
  ctx.fillText(text, PAD + 10, y + 18);
  return y + 36;
}

function checkColumn(
  ctx: CanvasRenderingContext2D,
  title: string,
  rows: readonly ImageRow[],
  x: number,
  y: number,
  width: number,
  measure: (text: string, fontSpec: string) => number,
): void {
  let cy = sectionTitle(ctx, title, x, y, width);
  for (const row of rows) {
    if (row.type === 'group') {
      ctx.fillStyle = COLOR.tableHead;
      ctx.fillRect(x, cy, width, GROUP_H);
      ctx.font = font(10.5, '800');
      ctx.fillStyle = COLOR.brand;
      ctx.fillText(row.label, x + 6, cy + 15);
      cy += GROUP_H;
      continue;
    }
    ctx.font = font(10.5);
    ctx.fillStyle = COLOR.text;
    ctx.fillText(row.checked ? '✅' : '⬜', x + 6, cy + 16);
    ctx.fillText(ellipsize(row.label, width - 48, font(10.5), measure), x + 26, cy + 16);
    ctx.strokeStyle = COLOR.line;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x, cy + ROW_H);
    ctx.lineTo(x + width, cy + ROW_H);
    ctx.stroke();
    cy += ROW_H;
  }
}

function infoTable(
  ctx: CanvasRenderingContext2D,
  table: ResultImageModel['table'],
  y: number,
  width: number,
  measure: (text: string, fontSpec: string) => number,
): number {
  const cellW = width / table.labels.length;

  ctx.fillStyle = COLOR.tableHead;
  ctx.fillRect(PAD, y, width, 28);
  ctx.strokeStyle = COLOR.tableBorder;
  ctx.lineWidth = 0.5;
  ctx.strokeRect(PAD, y, width, 28);
  ctx.font = font(10.5, '800');
  ctx.fillStyle = COLOR.brand;
  table.labels.forEach((label, i) => {
    const cx = PAD + cellW * i;
    ctx.fillText(label, cx + 6, y + 18);

    if (i > 0) {
      ctx.beginPath();
      ctx.moveTo(cx, y);
      ctx.lineTo(cx, y + 56);
      ctx.stroke();
    }
  });
  y += 28;

  ctx.fillStyle = COLOR.white;
  ctx.fillRect(PAD, y, width, 28);
  ctx.strokeRect(PAD, y, width, 28);
  ctx.font = font(10.5);
  table.values.forEach((value, i) => {
    ctx.fillStyle = table.dangerCols.includes(i) ? COLOR.danger : COLOR.text;
    ctx.fillText(ellipsize(value, cellW - 12, font(10.5), measure), PAD + cellW * i + 6, y + 18);
  });
  return y + 28 + 16;
}

export function drawResultImage(model: ResultImageModel): HTMLCanvasElement {
  const measure = canvasMeasure();
  const canvas = document.createElement('canvas');
  canvas.width = IMAGE_WIDTH * SCALE;
  canvas.height = model.height * SCALE;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('캔버스를 만들 수 없습니다.');
  ctx.scale(SCALE, SCALE);
  ctx.fillStyle = COLOR.white;
  ctx.fillRect(0, 0, IMAGE_WIDTH, model.height);

  const contentW = IMAGE_WIDTH - PAD * 2;
  let y = PAD;

  ctx.font = font(18, '900');
  ctx.fillStyle = COLOR.brand;
  ctx.fillText(IMAGE_TITLE, PAD, y + 18);
  y += 28;
  ctx.font = font(11);
  ctx.fillStyle = COLOR.muted;
  ctx.fillText(model.subtitle, PAD, y + 12);
  y += 20;

  y = infoTable(ctx, model.table, y, contentW, measure);

  if (model.malsoLine) {
    ctx.font = font(11);
    ctx.fillStyle = COLOR.subtle;
    ctx.fillText(model.malsoLine, PAD, y + 4);
    y += 20;
  }

  for (const warning of model.warnings) {
    y = warningBox(ctx, warning.text, warning.tone, y, contentW);
  }

  ctx.fillStyle = COLOR.warnBg;
  ctx.strokeStyle = COLOR.warn;
  ctx.lineWidth = 1;
  roundRect(ctx, PAD, y, contentW, 28, 6);
  ctx.font = font(10.5);
  ctx.fillStyle = COLOR.warn;
  ctx.fillText(ellipsize(model.disclaimer, contentW - 20, font(10.5), measure), PAD + 10, y + 18);
  y += 38;

  ctx.fillStyle = model.final.color;
  ctx.strokeStyle = 'transparent';
  roundRect(ctx, PAD, y, contentW, model.final.boxHeight, 8);
  ctx.font = font(14, '800');
  ctx.fillStyle = COLOR.white;
  model.final.lines.forEach((line, i) => ctx.fillText(line, PAD + 14, y + 22 + i * 22));
  if (model.final.badLines.length) {
    ctx.font = font(10);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    const start = y + 14 + model.final.lines.length * 22 + 8;
    model.final.badLines.forEach((line, i) => ctx.fillText(line, PAD + 14, start + i * 14));
  }
  y += model.final.boxHeight + 16;

  y = sectionTitle(ctx, '■ 경력조회', PAD, y, contentW);
  for (const [label, value] of model.careerRows) {
    y = labelValue(ctx, label, ellipsize(value, contentW - 90, font(11), measure), y);
  }
  y += 6;

  if (model.reentryRows) {
    y = sectionTitle(ctx, '■ 재입사 정보', PAD, y, contentW);
    for (const [label, value] of model.reentryRows) y = labelValue(ctx, label, value, y);
    y += 8;
  }

  const colW = IMAGE_WIDTH / 2 - PAD - 8;
  const midX = IMAGE_WIDTH / 2 + PAD / 2;
  checkColumn(ctx, '■ 제출 서류', model.docRows, PAD, y, colW, measure);
  checkColumn(ctx, '■ 필수이행', model.todoRows, midX, y, colW, measure);

  return canvas;
}

export function downloadResultImage(snapshot: DiagnosisSnapshot): string {
  const canvas = drawResultImage(buildResultImageModel(snapshot, canvasMeasure()));
  const filename = resultImageFilename(snapshot.generatedAt);

  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  return filename;
}

export const IMAGE_DONE_MESSAGE = '이미지(.png) 저장 완료';
