import { addDays, formatDate, parseDate } from '../../utils/date';
import { isHolidayYearCovered, nextBizDay } from '../rules/kr-holidays';

export const WAIT_DAYS = 10;

export const VALID_DAYS = 90;

export const URGENT_DAYS = 10;

export type MalsoCalcStatus = 'wait' | 'ready' | 'urgent' | 'expired';

export type MalsoCalcResult = {

  sendDate: Date;

  rawApplyDate: Date;

  applyDate: Date;

  expireDate: Date;

  shifted: boolean;
  status: MalsoCalcStatus;

  elapsedDays: number;

  daysToApply: number;

  daysToExpire: number;

  progressPercent: number;

  holidaysKnown: boolean;
};

const DAY_MS = 1000 * 60 * 60 * 24;

function diffDays(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / DAY_MS);
}

export function calcMalsoSchedule(sendDate: Date, today: Date): MalsoCalcResult {
  const rawApplyDate = addDays(sendDate, WAIT_DAYS);
  const applyDate = nextBizDay(rawApplyDate);
  const expireDate = addDays(sendDate, VALID_DAYS);

  const elapsedDays = diffDays(sendDate, today);
  const daysToApply = diffDays(today, applyDate);
  const daysToExpire = diffDays(today, expireDate);

  let status: MalsoCalcStatus;
  if (today < applyDate) status = 'wait';
  else if (daysToExpire <= 0) status = 'expired';
  else if (daysToExpire <= URGENT_DAYS) status = 'urgent';
  else status = 'ready';

  const progressPercent = Math.min(100, Math.max(0, Math.round((elapsedDays / VALID_DAYS) * 100)));

  return {
    sendDate,
    rawApplyDate,
    applyDate,
    expireDate,
    shifted: rawApplyDate.getTime() !== applyDate.getTime(),
    status,
    elapsedDays,
    daysToApply,
    daysToExpire,
    progressPercent,

    holidaysKnown:
      isHolidayYearCovered(rawApplyDate.getFullYear()) &&
      isHolidayYearCovered(applyDate.getFullYear()),
  };
}

export const SEND_DATE_REQUIRED_MESSAGE = '내용증명 발송일을 입력해주세요.';

export const SEND_DATE_INVALID_MESSAGE = '발송일 형식이 올바르지 않습니다. (YYYY-MM-DD)';

export const SEND_DATE_FUTURE_MESSAGE =
  '발송일이 오늘보다 뒤입니다. 우체국 소인 날짜를 확인해주세요.';

export const HOLIDAYS_UNKNOWN_NOTE =
  '이 기간의 공휴일 정보가 없어 토·일요일만 반영했습니다. 공휴일이 끼어 있으면 신청 가능일이 더 밀릴 수 있으니 직접 확인해주세요.';

export function calcFromDigits(
  digits: string,
  today: Date,
): { ok: true; result: MalsoCalcResult } | { ok: false; message: string } {
  if (!digits) return { ok: false, message: SEND_DATE_REQUIRED_MESSAGE };
  const sendDate = parseDate(digits);
  if (!sendDate) return { ok: false, message: SEND_DATE_INVALID_MESSAGE };
  if (sendDate > today) return { ok: false, message: SEND_DATE_FUTURE_MESSAGE };
  return { ok: true, result: calcMalsoSchedule(sendDate, today) };
}

const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'] as const;

export function formatKoreanDate(d: Date): string {
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export function formatShortDate(d: Date): string {
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export function formatDow(d: Date): string {
  return `(${WEEKDAY[d.getDay()]})`;
}

export function toInputValue(d: Date): string {
  return formatDate(d);
}

export type MalsoCalcBanner = {
  icon: string;
  title: string;

  subtitle: string;
  emphasis?: string;
};

export function malsoCalcBanner(r: MalsoCalcResult): MalsoCalcBanner {
  switch (r.status) {
    case 'wait':
      return {
        icon: '⏳',
        title: `D+${r.daysToApply}일 후부터 협회 말소 신청이 가능합니다`,
        subtitle: `${formatKoreanDate(r.applyDate)} ${formatDow(r.applyDate)}부터 — `,
        emphasis: '그 전까지는 협회에 신청해도 접수가 되지 않습니다',
      };
    case 'ready':
      return {
        icon: '✅',
        title: '지금 바로 말소 신청 가능합니다',
        subtitle: `유효기간 ${r.daysToExpire}일 남음 (만료: ${formatKoreanDate(r.expireDate)})`,
      };
    case 'urgent':
      return {
        icon: '⚠️',
        title: `유효기간이 ${r.daysToExpire}일밖에 남지 않았습니다`,
        subtitle: '서두르세요! 만료 전에 협회 말소 신청을 완료하세요.',
      };
    case 'expired':
      return {
        icon: '❌',
        title: '유효기간이 만료되었습니다',
        subtitle: '내용증명을 다시 발송해야 합니다.',
      };
  }
}

export const CALC_RULE_NOTE =
  '발송일을 1일째로 포함해 세어, 11일째 되는 날(= 발송일 + 10일)부터 협회 말소 신청이 가능합니다. 단, 해당일이 토·일·공휴일(대체공휴일 포함)이면 다음 영업일로 자동 이동합니다. 유효기간은 발송일로부터 3개월(90일)입니다.';

export function calendarMonths(r: MalsoCalcResult): Date[] {
  const months: Date[] = [];
  const last = new Date(r.applyDate.getFullYear(), r.applyDate.getMonth(), 1);
  let cursor = new Date(r.sendDate.getFullYear(), r.sendDate.getMonth(), 1);
  while (cursor <= last) {
    months.push(cursor);
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  }
  return months;
}
