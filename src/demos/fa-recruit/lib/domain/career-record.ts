import { addYears, earlier, inclusiveDays, later, parseDate } from '../utils/date';

export type CareerRecord = {
  id: string;
  start: string;
  end: string;
};

export function careerDaysAt(
  records: readonly CareerRecord[],
  at: Date,
  windowYears: number,
): number {
  const windowStart = addYears(at, -windowYears);
  let total = 0;
  for (const r of records) {
    const start = parseDate(r.start);
    const end = parseDate(r.end);
    if (!start || !end) continue;
    const from = later(start, windowStart);
    const to = earlier(end, at);
    if (to >= from) total += inclusiveDays(from, to);
  }
  return total;
}

const DAY_MS = 86_400_000;

export function findCareerDeadline(
  records: readonly CareerRecord[],
  target: Date,
  windowYears: number,
  requiredDays: number,
): Date {

  let maxEnd: Date | null = null;
  for (const r of records) {
    const end = parseDate(r.end);
    if (end && (!maxEnd || end > maxEnd)) maxEnd = end;
  }
  let hi = addYears(maxEnd ?? target, windowYears + 1);
  let guard = 0;
  while (careerDaysAt(records, hi, windowYears) >= requiredDays && guard++ < 12) {
    hi = addYears(hi, 1);
  }

  let lo = target.getTime();
  let hiTime = hi.getTime();
  while (hiTime - lo > DAY_MS) {
    const mid = lo + Math.floor((hiTime - lo) / (2 * DAY_MS)) * DAY_MS;
    if (mid === lo) break;
    if (careerDaysAt(records, new Date(mid), windowYears) >= requiredDays) lo = mid;
    else hiTime = mid;
  }
  return new Date(lo);
}

export function latestRecordIndex(records: readonly CareerRecord[]): number {
  let latest: Date | null = null;
  let index = -1;
  for (let i = 0; i < records.length; i += 1) {
    const end = parseDate(records[i].end);
    if (end && (!latest || end > latest)) {
      latest = end;
      index = i;
    }
  }
  return index;
}

export function latestRecordEnd(records: readonly CareerRecord[]): string {
  const index = latestRecordIndex(records);
  return index < 0 ? '' : records[index].end;
}

export function hasCompleteRecords(records: readonly CareerRecord[]): boolean {
  return records.length > 0 && records.every((r) => parseDate(r.start) && parseDate(r.end));
}

export function isRecordInverted(record: CareerRecord): boolean {
  const start = parseDate(record.start);
  const end = parseDate(record.end);
  return start !== null && end !== null && start > end;
}

export function hasInvertedRecord(records: readonly CareerRecord[]): boolean {
  return records.some(isRecordInverted);
}
