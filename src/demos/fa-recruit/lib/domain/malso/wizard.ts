import type { MalsoAssoc, MalsoForm, MalsoOrg, MalsoProof } from './case';

export type MalsoStepId = 'proof' | 'org' | 'form' | 'assoc' | 'reason' | 'result';

export type MalsoAnswers = {
  proof: MalsoProof | null;
  org: MalsoOrg | null;
  form: MalsoForm | null;
  assoc: MalsoAssoc | null;

  reason: string | null;
};

export function createEmptyAnswers(): MalsoAnswers {
  return { proof: null, org: null, form: null, assoc: null, reason: null };
}

const ANSWER_KEY: Partial<Record<MalsoStepId, keyof MalsoAnswers>> = {
  proof: 'proof',
  org: 'org',
  form: 'form',
  assoc: 'assoc',
  reason: 'reason',
};

export function visibleSteps(a: MalsoAnswers): MalsoStepId[] {
  const path: MalsoStepId[] = ['proof', 'org'];

  if (a.org !== 'agency') path.push('form');

  if (!(a.org === 'company' && a.form === 'gyo')) path.push('assoc');

  if (a.proof !== 'yes') path.push('reason');
  path.push('result');
  return path;
}

export function questionSteps(a: MalsoAnswers): MalsoStepId[] {
  return visibleSteps(a).filter((s) => s !== 'result');
}

export function questionNumber(
  a: MalsoAnswers,
  step: MalsoStepId,
): { index: number; total: number } | null {
  const qs = questionSteps(a);
  const i = qs.indexOf(step);
  return i < 0 ? null : { index: i + 1, total: qs.length };
}

export function isStepAnswered(a: MalsoAnswers, step: MalsoStepId): boolean {
  const key = ANSWER_KEY[step];
  return key ? a[key] !== null : true;
}

export function nextStep(a: MalsoAnswers, step: MalsoStepId): MalsoStepId | null {
  const path = visibleSteps(a);
  const i = path.indexOf(step);
  if (i < 0 || i === path.length - 1) return null;
  return path[i + 1];
}

export function prevStep(a: MalsoAnswers, step: MalsoStepId): MalsoStepId | null {
  const path = visibleSteps(a);
  const i = path.indexOf(step);
  return i <= 0 ? null : path[i - 1];
}

export function isLastQuestion(a: MalsoAnswers, step: MalsoStepId): boolean {
  return nextStep(a, step) === 'result';
}

export function setAnswer<K extends keyof MalsoAnswers>(
  a: MalsoAnswers,
  key: K,
  value: MalsoAnswers[K],
): MalsoAnswers {
  const next: MalsoAnswers = { ...a, [key]: value };

  if (key === 'form' && value === 'gyo') next.assoc = 'both';

  if (key === 'form' && value === 'jeon' && a.form === 'gyo') next.assoc = null;

  if (key === 'org' && value !== a.org) {
    next.form = null;
    next.assoc = null;
  }

  return next;
}

export function isDiagnosisComplete(a: MalsoAnswers): boolean {
  return questionSteps(a).every((s) => isStepAnswered(a, s));
}

export const REASON_OPTIONS: readonly { value: string; label: string }[] = [
  { value: '개인 사정', label: '개인 사정 (가장 일반적)' },
  { value: '이직', label: '이직 / 타사 위촉 예정' },
  { value: '일신상의 사유', label: '일신상의 사유' },
];

export function assocQuestionText(a: MalsoAnswers): {
  title: string;
  hint: string;

  allowBoth: boolean;
} {
  if (a.org === 'agency') {
    return {
      title: '대리점이 어느 협회에 등록되어 있나요?',
      hint: '대리점이 등록한 협회를 고르세요. 손보·생보 한 곳 또는 양쪽일 수 있습니다.',
      allowBoth: true,
    };
  }
  return {
    title: '어느 협회에 등록되어 있나요?',
    hint: '전속이면 한 곳을 고르세요.',
    allowBoth: false,
  };
}
