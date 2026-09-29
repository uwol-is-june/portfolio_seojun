import { addMonths, addYears, formatDate, parseDate } from '../utils/date';
import type { ApplicantType } from './self-diagnosis';

export type ReentryCount = '0' | '1' | '2';

export type MalsoTerm = 'under6' | 'over6' | 'over2';

export type RepaymentStatus = 'none' | 'exist';

export type ReentryState = {

  count: ReentryCount;
  repayment: RepaymentStatus | null;
  repaymentExpected: RepaymentStatus | null;

  reasonLong: boolean;

  reasonForced: boolean;
};

export const EMPTY_REENTRY: ReentryState = {
  count: '0',
  repayment: null,
  repaymentExpected: null,
  reasonLong: false,
  reasonForced: false,
};

export const REENTRY_COUNT_OPTIONS: readonly { value: ReentryCount; label: string }[] = [
  { value: '0', label: '최초 등록 (재입사 아님)' },
  { value: '1', label: '1회 재등록 (당사 2회차)' },
  { value: '2', label: '2회 재등록 (당사 3회차)' },
];

export const MALSO_TERM_LABEL: Record<MalsoTerm, string> = {
  under6: '6개월 미만',
  over6: '6개월 이상 2년 미만',
  over2: '2년 이상',
};

export const MALSO_TERM_MONTHS = 6;

export const MALSO_TERM_YEARS = 2;

export function resolveMalsoTerm(malsoDate: string, targetDate: string): MalsoTerm | null {
  const malso = parseDate(malsoDate);
  const target = parseDate(targetDate);
  if (!malso || !target) return null;
  if (target < addMonths(malso, MALSO_TERM_MONTHS)) return 'under6';
  return target < addYears(malso, MALSO_TERM_YEARS) ? 'over6' : 'over2';
}

export function describeMalsoTerm(malsoDate: string, targetDate: string): string | null {
  const term = resolveMalsoTerm(malsoDate, targetDate);
  if (!term) return null;
  const malso = parseDate(malsoDate);
  const target = parseDate(targetDate);
  if (!malso || !target) return null;
  return `말소일 ${formatDate(malso)} → 등록예정일 ${formatDate(target)} · ${MALSO_TERM_LABEL[term]}`;
}

export const REPAYMENT_OPTIONS: readonly { value: RepaymentStatus; label: string }[] = [
  { value: 'none', label: '없음' },
  { value: 'exist', label: '있음' },
];

export const REPAYMENT_EXPECTED_OPTIONS: readonly { value: RepaymentStatus; label: string }[] = [
  { value: 'none', label: '없음' },
  { value: 'exist', label: '있음' },
];

export const REASON_LONG_LABEL = '1년 이상 환수금 미상환';
export const REASON_FORCED_LABEL = '보험업법 위반으로 강제해촉 처분';

export function needsReentryCard(type: ApplicantType | null, assocHistory: boolean): boolean {
  return type !== 'new' || assocHistory;
}

export function askLongUnrepaid(
  term: MalsoTerm | null,
  repayment: RepaymentStatus | null,
): boolean {
  return term !== null && term !== 'under6' && repayment === 'exist';
}

export function askForcedExit(state: ReentryState): boolean {

  return state.count === '1';
}

export function askRepayment(state: ReentryState): boolean {
  return askForcedExit(state) && !state.reasonForced;
}

export const REPAYMENT_RELATION_NOTE =
  "대외비 대외비 대외비 대외비 대외비 대외비 대외비 대외비 대외비 대외비";

export function isReentryComplete(state: ReentryState, term: MalsoTerm | null): boolean {
  if (state.count === '0') return true;

  if (state.reasonForced) return true;

  if (state.count === '2') return true;

  return term !== null && state.repayment !== null && state.repaymentExpected !== null;
}

export type ReentryFlags = {
  isReentry: boolean;

  isReentryReview: boolean;

  isReentryBothExist: boolean;

  isReentryBlocked: boolean;

  isUnder6: boolean;

  isBranchChange: boolean;

  isNewIdGrant: boolean;

  limitReasons: string[];
};

const REASON_NAMES = {
  long: '1년 이상 환수금 미상환',
  forced: '보험업법 위반 강제해촉',
} as const;

export function resolveReentry(state: ReentryState, term: MalsoTerm | null): ReentryFlags {
  const isReentry = state.count === '1' || state.count === '2';

  const limitReasons: string[] = [];
  if (isReentry) {
    if (state.reasonLong) limitReasons.push(REASON_NAMES.long);
    if (state.reasonForced) limitReasons.push(REASON_NAMES.forced);
  }

  const isReentryReview = state.count === '2';
  const hasRepayment = state.repayment === 'exist';
  const hasExpected = state.repaymentExpected === 'exist';

  const isReentryBothExist = isReentry && hasRepayment && hasExpected;

  const isReentryBlocked =
    isReentry && (isReentryReview || hasRepayment || limitReasons.length > 0);

  const isUnder6 = isReentry && term === 'under6';

  const isOver6 = isReentry && (term === 'over6' || term === 'over2');
  const isBranchChange = isOver6 && !hasRepayment && hasExpected;
  const isNewIdGrant = isReentry && term === 'over2' && !hasRepayment && !hasExpected;

  return {
    isReentry,
    isReentryReview,
    isReentryBothExist,
    isReentryBlocked,
    isUnder6,
    isBranchChange,
    isNewIdGrant,
    limitReasons,
  };
}

export function needsTransferDocs(
  flags: ReentryFlags,
  state: ReentryState,
  blockedByLimitItems: boolean,
): boolean {
  if (!flags.isReentry || flags.isReentryBlocked || blockedByLimitItems) return false;

  return state.repaymentExpected === 'exist' || flags.isUnder6;
}

export type ReentryNotice = {
  tone: 'danger' | 'warn' | 'ok';
  text: string;

  sub?: string;
};

export const MALSO_TERM_PENDING_NOTICE: ReentryNotice = {
  tone: 'warn',
  text: "대외비 대외비 대외비",
  sub: "대외비 대외비 대외비 대외비 대외비",
};

export function getReentryNotice(
  state: ReentryState,
  term: MalsoTerm | null,
): ReentryNotice | null {
  if (state.count === '0') return null;

  const { limitReasons, isReentryReview } = resolveReentry(state, term);

  if (limitReasons.length > 0) {
    return {
      tone: 'danger',
      text: "대외비 대외비 대외비 대외비 대외비",
      sub: "대외비 대외비",
    };
  }

  if (isReentryReview) {
    return {
      tone: 'danger',
      text: "대외비 대외비 대외비",
      sub: "대외비 대외비 대외비 대외비 대외비",
    };
  }

  if (term === null) return MALSO_TERM_PENDING_NOTICE;
  if (!isReentryComplete(state, term)) return null;

  const hasRepayment = state.repayment === 'exist';
  const hasExpected = state.repaymentExpected === 'exist';

  if (hasRepayment) {
    return {
      tone: 'danger',
      text: hasExpected
        ? "대외비 대외비 대외비 대외비 대외비"
        : "대외비 대외비 대외비",
      sub: hasExpected
        ? "대외비 대외비 대외비 대외비 대외비 대외비"
        : "대외비 대외비 대외비 대외비",
    };
  }
  if (term === 'under6') {
    return {
      tone: 'warn',
      text: "대외비 대외비 대외비",
      sub: "대외비 대외비 대외비",
    };
  }
  if (hasExpected) {
    return {
      tone: 'warn',
      text: "대외비 대외비 대외비",
      sub: "대외비 대외비 대외비 대외비",
    };
  }
  return {
    tone: 'ok',
    text: "대외비 대외비 대외비",
    sub: "대외비 대외비 대외비",
  };
}
