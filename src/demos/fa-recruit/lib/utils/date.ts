export function formatDateInput(raw: string): string {
  const v = raw.replace(/\D/g, '').slice(0, 8);
  if (v.length > 6) return `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6)}`;
  if (v.length > 4) return `${v.slice(0, 4)}-${v.slice(4)}`;
  return v;
}

export function toDigits(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 8);
}

export function isValidDate(digits: string): boolean {
  if (digits.length !== 8) return false;
  const y = Number(digits.slice(0, 4));
  const m = Number(digits.slice(4, 6));
  const d = Number(digits.slice(6, 8));
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

export function parseDate(digits: string): Date | null {
  if (!isValidDate(digits)) return null;
  return new Date(
    Number(digits.slice(0, 4)),
    Number(digits.slice(4, 6)) - 1,
    Number(digits.slice(6, 8)),
  );
}

export function formatDate(d: Date | null | undefined): string {
  if (!d || !(d instanceof Date) || Number.isNaN(d.getTime())) return '-';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function toDisplay(digits: string): string {
  if (digits.length !== 8) return '';
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
}

export const toPickerValue = toDisplay;

const DAY_MS = 1000 * 60 * 60 * 24;

export function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function addYears(d: Date, years: number): Date {
  const next = new Date(d);
  next.setFullYear(next.getFullYear() + years);
  return next;
}

export function addMonths(d: Date, months: number): Date {
  const next = new Date(d);
  next.setMonth(next.getMonth() + months);
  return next;
}

export function addDays(d: Date, days: number): Date {
  const next = new Date(d);
  next.setDate(next.getDate() + days);
  return next;
}

export function inclusiveDays(from: Date, to: Date): number {
  return Math.ceil(Math.abs(to.getTime() - from.getTime()) / DAY_MS) + 1;
}

export function ddayLabel(from: Date, to: Date): string {
  const diff = Math.ceil((to.getTime() - from.getTime()) / DAY_MS);
  if (diff > 0) return `D-${diff}`;
  if (diff === 0) return 'D-day';
  return `D+${Math.abs(diff)}`;
}

export function earlier(a: Date, b: Date): Date {
  return a < b ? a : b;
}
export function later(a: Date, b: Date): Date {
  return a > b ? a : b;
}

export function formatTimestamp(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatIsoTimestamp(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : formatTimestamp(d);
}
