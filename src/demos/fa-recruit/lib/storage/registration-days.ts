const KEY = 'fa-recruit-sengbo-days';

export type StoredDesignatedDays = {

  days: number[];

  month: string;
};

export function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function loadDesignatedDays(): StoredDesignatedDays | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;
    const { days, month } = parsed as Partial<StoredDesignatedDays>;
    if (!Array.isArray(days) || typeof month !== 'string') return null;

    return { days: days.filter((d) => Number.isInteger(d) && d >= 1 && d <= 31), month };
  } catch {
    return null;
  }
}

export function saveDesignatedDays(days: readonly number[], month: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify({ days: [...days], month }));
  } catch {

  }
}
