import {
  needsTransferDocs,
  resolveReentry,
  isReentryComplete,
  type MalsoTerm,
  type ReentryFlags,
  type ReentryState,
} from './reentry';
import {
  LIMIT_A,
  LIMIT_B,
  LIMIT_SONBO,
  REENTRY_LIMIT_ID,
  SONBO_LIMIT_ID,
  type LimitAnswer,
  type LimitItem,
} from './rules/limit-items';
import type { ApplicantType } from './self-diagnosis';

export type DiagAnswers = Record<string, LimitAnswer | undefined>;

export type DiagGrade = 'bad' | 'warn' | 'pending' | 'ok';

export type FinalDiagnosisInput = {
  type: ApplicantType;
  answers: DiagAnswers;
  reentry: ReentryState;

  malsoTerm: MalsoTerm | null;
};

export type FinalDiagnosisResult = {
  grade: DiagGrade;
  icon: string;
  title: string;

  desc: string;

  isSonboLimit: boolean;

  exemptNotes: string[];

  needsTransferDocs: boolean;
  hasA: boolean;
  hasB: boolean;
  hasBlocked: boolean;
  reentry: ReentryFlags;
};

export function visibleLimitItems(
  list: readonly LimitItem[],
  type: ApplicantType,
): readonly LimitItem[] {
  const isNew = type === 'new';
  return list.filter(
    (item) => !item.internalOnly && !(isNew && item.newExclude) && item.id !== REENTRY_LIMIT_ID,
  );
}

export function isAllAnswered(input: FinalDiagnosisInput, showReentryCard = true): boolean {
  const items = [
    ...visibleLimitItems(LIMIT_SONBO, input.type),
    ...visibleLimitItems(LIMIT_A, input.type),
    ...visibleLimitItems(LIMIT_B, input.type),
  ];
  const allAnswered = items.every((item) => Boolean(input.answers[item.id]));

  const reentryOk = showReentryCard ? isReentryComplete(input.reentry, input.malsoTerm) : true;
  return allAnswered && reentryOk;
}

export function getDisclaimerText(type: ApplicantType): string {
  return type === 'new'
    ? '보증보험 결과 확인 후 실제 결과가 다를 수 있습니다. 반드시 최종 확인 후 진행하세요.'
    : '보증보험 결과 및 이클린서비스 확인 후 실제 결과가 다를 수 있습니다. 반드시 최종 확인 후 진행하세요.';
}

const SONBO_NOTE = "\n대외비 대외비 대외비 대외비";
const SONBO_NOTE_OK = "\n대외비 대외비 대외비 대외비";

export function judgeFinalDiagnosis(input: FinalDiagnosisInput): FinalDiagnosisResult {
  const { type, answers } = input;
  const isNew = type === 'new';

  const visibleA = visibleLimitItems(LIMIT_A, type);
  const visibleB = visibleLimitItems(LIMIT_B, type);

  const hasA = visibleA.some((i) => answers[i.id] === 'bad');

  const hasB = visibleB.some((i) => !i.reviewExempt && answers[i.id] === 'bad');
  const hasBlocked = visibleB.some((i) => !i.reviewExempt && answers[i.id] === 'blocked');
  const isSonboLimit = !isNew && answers[SONBO_LIMIT_ID] === 'bad';
  const exemptNotes = visibleB
    .filter((i) => i.reviewExempt && answers[i.id] === 'bad' && i.exemptNote)
    .map((i) => i.exemptNote!);

  const exemptText = exemptNotes.length ? '\n\n' + exemptNotes.map((n) => `※ ${n}`).join('\n') : '';

  const rs = input.reentry;
  const flags = resolveReentry(rs, input.malsoTerm);

  const reentryFollowUp = flags.isReentry
    ? "\n\n대외비 대외비 대외비 대외비 대외비 대외비 대외비 대외비 대외비 대외비"
    : "";
  const blockedByLimitItems = hasA || hasBlocked;
  const transfer = needsTransferDocs(flags, rs, blockedByLimitItems);

  const base = {
    isSonboLimit,
    exemptNotes,
    needsTransferDocs: transfer,
    hasA,
    hasB,
    hasBlocked,
    reentry: flags,
  };

  if (hasA || flags.isReentryBlocked || hasBlocked) {
    const lines: string[] = [];
    if (hasA) lines.push("대외비 대외비 대외비");
    if (hasBlocked) lines.push("대외비 대외비 대외비");

    if (flags.isReentryReview) {
      lines.push(
        "대외비 대외비 대외비 대외비 대외비",
      );
    }
    if (flags.isReentryBlocked && rs.repayment === 'exist') {
      lines.push(
        "대외비 대외비 대외비 대외비 대외비",
      );
    }
    if (flags.isReentryBlocked && flags.limitReasons.length) {
      lines.push(
        "대외비 대외비 대외비 대외비 대외비 대외비 대외비",
      );
    }
    let desc = lines.join('\n\n');

    if (hasB) {

      const names = visibleB
        .filter((i) => !i.reviewExempt && answers[i.id] === 'bad')
        .map((i) => i.n);
      if (names.length) {
        desc += `\n\n[참고] 심사 대상 항목도 함께 확인됨: ${names.join(', ')}\n위 불가 사유 해소 후 해당 항목에 대한 심사가 필요합니다.`;
      }
    }
    if (isSonboLimit) desc += SONBO_NOTE;
    desc += exemptText;
    desc += '\n\n세부사항은 담당자에게 문의 바랍니다.';
    return { ...base, grade: 'bad', icon: '🛑', title: '위촉 불가', desc };
  }

  if (hasB) {
    let desc = '심사 대상 규정에 해당하여 심사를 통해 승인 여부를 판단해야 합니다.';
    if (flags.isReentry) {
      const lines: string[] = [];
      if (flags.isUnder6) {
        lines.push("대외비 대외비 대외비 대외비 대외비");
      } else if (rs.repaymentExpected === 'exist') {
        lines.push("대외비 대외비 대외비 대외비 대외비");
      }
      if (lines.length) desc += (desc ? '\n\n' : '') + '[재입사] ' + lines.join('\n');
    }
    desc += '\n세부사항은 담당자에게 문의하세요.';
    if (isSonboLimit) desc += SONBO_NOTE;
    desc += exemptText;
    return { ...base, grade: 'warn', icon: '⚠️', title: '심사 대상', desc };
  }

  if (flags.isUnder6) {
    return {
      ...base,
      grade: 'pending',
      icon: '🔔',
      title: '조건부 입사 가능',
      desc:
        "대외비 대외비 대외비\n대외비 대외비 대외비 대외비 대외비 대외비 대외비\n대외비 대외비" +
        (isSonboLimit ? SONBO_NOTE : "") +
        exemptText +
        reentryFollowUp,
    };
  }

  if (flags.isBranchChange) {
    return {
      ...base,
      grade: 'pending',
      icon: '🔔',
      title: '조건부 입사 가능',
      desc:
        "대외비 대외비\n대외비 대외비 대외비 대외비 대외비 대외비\n대외비 대외비" +
        (isSonboLimit ? SONBO_NOTE : "") +
        exemptText +
        reentryFollowUp,
    };
  }

  if (flags.isNewIdGrant) {
    return {
      ...base,
      grade: 'ok',
      icon: '✅',
      title: '최종 적격',
      desc:
        "대외비 대외비 대외비 대외비 대외비 대외비 대외비 대외비" +
        (isSonboLimit ? SONBO_NOTE_OK : "") +
        exemptText +
        reentryFollowUp,
    };
  }

  const desc = isSonboLimit
    ? '적격\n대외비 대외비 대외비'
    : flags.isReentry
      ? '대외비 대외비 대외비 대외비 대외비'
      : '모든 위촉 적격 기준을 충족합니다.';
  return { ...base, grade: 'ok', icon: '✅', title: '최종 적격', desc: desc + exemptText + reentryFollowUp };
}
