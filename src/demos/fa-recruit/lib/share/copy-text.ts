import type { DiagnosisSnapshot } from './diagnosis-snapshot';

const SHORT_HEADER = '[인카 위촉 사전 진단 결과]';
const FULL_HEADER = '[인카 위촉 시뮬레이터 결과]';

export const COPY_SHORT_DONE_MESSAGE = '간단 결과가 복사되었습니다.';

export const COPY_FULL_DONE_MESSAGE = '✅ 전체 결과가 복사되었습니다!';
export const COPY_FAILED_MESSAGE = '복사 실패 — 직접 선택해 복사해주세요.';

class Lines {
  private readonly out: string[] = [];

  push(...lines: string[]): void {
    for (const line of lines) this.out.push(line);
  }

  blank(): void {
    if (this.out.length > 0 && this.out[this.out.length - 1] !== '') this.out.push('');
  }

  pushMultiline(text: string): void {
    for (const line of text.split('\n')) {
      const trimmed = line.trim();
      if (trimmed) this.out.push(trimmed);
    }
  }

  toString(): string {
    return this.out.join('\n');
  }
}

export function formatShortResult(snapshot: DiagnosisSnapshot): string {
  const lines = new Lines();
  const { candidate, identity, career, qualify } = snapshot;

  lines.push(SHORT_HEADER, snapshot.generatedAt);
  lines.blank();

  if (candidate.headline) lines.push(candidate.headline);
  lines.push(`${identity.roleLabel} · ${identity.typeLabel}`);
  if (identity.targetDate !== '미입력') lines.push(`등록예정일: ${identity.targetDate}`);

  if (qualify.done) {
    lines.blank();
    lines.push(`${qualify.icon} ${qualify.title}`.trim());
    lines.pushMultiline(qualify.desc);
  }

  if (career.done && career.title !== qualify.title) {
    lines.blank();
    lines.push(`[경력조회] ${career.icon} ${career.title}`.trim());
    if (career.desc) lines.pushMultiline(career.desc);
  }

  if (qualify.flagged.length > 0) {
    lines.blank();
    lines.push('[해당 사항]');
    for (const item of qualify.flagged) lines.push(`· ${item.name}`);
  }

  if (qualify.reentryCount && qualify.reentryCount !== '0' && qualify.reentryCountLabel) {
    lines.blank();
    lines.push(`[재입사] ${qualify.reentryCountLabel}`);
  }

  lines.blank();
  lines.push(snapshot.disclaimerShort);

  return lines.toString();
}

export function formatFullResult(snapshot: DiagnosisSnapshot): string {
  const lines = new Lines();
  const { candidate, precheck, identity, career, qualify, docs, todos } = snapshot;

  lines.push(FULL_HEADER);
  lines.blank();
  lines.push(`생성일시: ${snapshot.generatedAt}`);

  if (snapshot.judgedAt) lines.push(`판정 확정: ${snapshot.judgedAt}`);

  lines.blank();
  lines.push('■ 위촉 대상자 정보');
  for (const row of [...candidate.rows, ...precheck.rows]) lines.push(`${row.label}: ${row.value}`);

  for (const warning of precheck.warnings) lines.push(`  ${warning.line}`);

  lines.blank();
  lines.push(snapshot.disclaimerFull);

  lines.blank();
  lines.push('■ 경력조회');
  lines.push(`대상: ${identity.targetLabel}`);
  lines.push(`유형: ${identity.typeLabel}`);
  lines.push(`등록예정일: ${identity.targetDate}`);
  lines.push(`결과: ${career.line}`);
  if (career.conversionNote) lines.push(`  ※ ${career.conversionNote}`);

  lines.blank();
  lines.push('■ 위촉진단');
  lines.blank();
  for (const item of qualify.flagged) lines.push(`· ${item.name}: ${item.suffix}`);

  if (qualify.reentryCountLabel) lines.push(`당사 등록 횟수: ${qualify.reentryCountLabel}`);
  if (qualify.malsoTermLabel) lines.push(`협회 말소 경과: ${qualify.malsoTermLabel}`);
  lines.push(`결과: ${qualify.line}`);

  if (!snapshot.isBlocked) {
    lines.blank();
    lines.push('■ 제출 서류');
    lines.blank();
    const docNames = docs?.groups.flatMap((g) => g.items.map((i) => i.name)) ?? [];
    if (docNames.length > 0) {
      for (const name of docNames) lines.push(`· ${name}`);
    } else {
      lines.push('· (해당 서류 없음)');
    }

    lines.blank();
    lines.push('■ 필수이행');
    lines.blank();
    if (todos.remaining.length > 0) {
      for (const name of todos.remaining) lines.push(`· ${name}`);
    } else {
      lines.push('✅ 모든 필수이행 완료');
    }
  } else {

    const reviewNames = (docs?.groups ?? [])
      .filter((g) => g.review)
      .flatMap((g) => g.items.map((i) => i.name));
    if (reviewNames.length > 0) {
      lines.blank();
      lines.push('■ 사유 해소 후 심사에 필요한 서류');
      lines.blank();
      for (const name of reviewNames) lines.push(`· ${name}`);
    }
  }

  return lines.toString();
}
