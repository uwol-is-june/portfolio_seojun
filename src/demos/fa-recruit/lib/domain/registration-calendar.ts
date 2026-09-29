import { addDays, formatDate } from '../utils/date';

export type InsuranceKind = 'sonbo' | 'sengbo';

export const INSURANCE_LABEL: Record<InsuranceKind, string> = {
  sonbo: '손해보험',
  sengbo: '생명보험',
};

export const SONBO_ACCEPT_DOWS = [2, 4] as const;

export const SONBO_LEAD_DAYS = 8;

export const SONBO_CUTOFF_HOUR = 11;

export function isSonboAcceptDay(date: Date): boolean {
  return (SONBO_ACCEPT_DOWS as readonly number[]).includes(date.getDay());
}

export function resolveSonboRegistrationDate(acceptDate: Date): Date {
  return addDays(acceptDate, SONBO_LEAD_DAYS);
}

export const MAX_DESIGNATED_DAYS = 3;

export function parseDesignatedDays(raw: readonly string[]): number[] {
  const days = raw
    .map((value) => Number.parseInt(value, 10))
    .filter((n) => Number.isInteger(n) && n >= 1 && n <= 31);

  return [...new Set(days)].sort((a, b) => a - b);
}

function dayInMonth(year: number, month: number, day: number): Date | null {
  const candidate = new Date(year, month, day);
  return candidate.getDate() === day ? candidate : null;
}

export function resolveSengboRegistrationDate(
  acceptDate: Date,
  designatedDays: readonly number[],
): Date | null {
  if (designatedDays.length === 0) return null;
  const days = [...designatedDays].sort((a, b) => a - b);
  const year = acceptDate.getFullYear();
  const month = acceptDate.getMonth();

  for (const day of days) {
    if (day <= acceptDate.getDate()) continue;
    const found = dayInMonth(year, month, day);
    if (found) return found;
  }

  const nextMonth = month + 1 > 11 ? 0 : month + 1;
  const nextYear = month + 1 > 11 ? year + 1 : year;
  for (const day of days) {
    const found = dayInMonth(nextYear, nextMonth, day);
    if (found) return found;
  }
  return null;
}

export const SONBO_ACCEPT_ONLY_MESSAGE = '손해보험은 화요일 또는 목요일에만 접수 가능합니다.';
export const SONBO_CUTOFF_NOTE = `※ 오전 ${SONBO_CUTOFF_HOUR}시까지 접수 기준 (화 접수 → 익주 수요일 · 목 접수 → 익주 금요일) · 마감 이후 접수는 한 주 밀립니다.`;
export const SONBO_REG_NOTE = '17시 이후 확인 가능';
export const SENGBO_DAYS_REQUIRED_MESSAGE = '협회등록 지정일을 입력해주세요.';
export const SENGBO_DAYS_INVALID_MESSAGE = '지정일을 확인해주세요. (해당 월에 없는 날짜입니다)';
export const SENGBO_REG_NOTE = '다음 지정일 기준';
export const PLANNER_DISCLAIMER = '※ 참고용 · 실제 등록일은 담당자 확인이 필요합니다.';

export type RegistrationPlan =
  | { ok: true; acceptDate: Date; registrationDate: Date; note: string }
  | { ok: false; message: string };

export function planRegistration(
  kind: InsuranceKind,
  acceptDate: Date,
  designatedDays: readonly number[] = [],
): RegistrationPlan {
  if (kind === 'sonbo') {
    if (!isSonboAcceptDay(acceptDate)) {
      return { ok: false, message: SONBO_ACCEPT_ONLY_MESSAGE };
    }
    return {
      ok: true,
      acceptDate,
      registrationDate: resolveSonboRegistrationDate(acceptDate),
      note: SONBO_CUTOFF_NOTE,
    };
  }

  if (designatedDays.length === 0) {
    return { ok: false, message: SENGBO_DAYS_REQUIRED_MESSAGE };
  }
  const registrationDate = resolveSengboRegistrationDate(acceptDate, designatedDays);
  if (!registrationDate) {
    return { ok: false, message: SENGBO_DAYS_INVALID_MESSAGE };
  }
  return { ok: true, acceptDate, registrationDate, note: PLANNER_DISCLAIMER };
}

const DOW_KR = ['일', '월', '화', '수', '목', '금', '토'] as const;

export function formatPlannerDate(date: Date): string {
  return `${formatDate(date).replace(/-/g, '.')}(${DOW_KR[date.getDay()]})`;
}
