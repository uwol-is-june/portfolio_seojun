export type SpecialCondition = 'minor' | 'foreigner' | 'ins_career' | 'adjuster';

export type ForeignerCode = 'eligible' | 'F4' | 'other';

export const NO_SPECIAL_CONDITION_LABEL = '특수 조건 없음';

export const SPECIAL_CONDITION_LABEL: Record<SpecialCondition, string> = {
  minor: '미성년자',
  foreigner: '외국인',
  ins_career: '내근직 경력자',
  adjuster: '손해사정사',
};

export const SPECIAL_CONDITION_SHORT_LABEL: Record<SpecialCondition, string> = {
  minor: '미성년자',
  foreigner: '외국인',
  ins_career: '내근직',
  adjuster: '손해사정사',
};

export const NO_SPECIAL_CONDITION_SHORT_LABEL = '해당 없음';

export const SPECIAL_CONDITION_ICON: Record<SpecialCondition, string> = {
  minor: '👶',
  foreigner: '🌍',
  ins_career: '💼',
  adjuster: '⚖️',
};

export const SPECIAL_CONDITIONS: SpecialCondition[] = [
  'minor',
  'foreigner',
  'ins_career',
  'adjuster',
];

export const FOREIGNER_CODES: {
  value: ForeignerCode;
  icon: string;
  name: string;
  sub: string;
  eligible: boolean;
}[] = [
  { value: 'eligible', icon: '✅', name: '거주·영주·결혼', sub: 'F-2 / F-5 / F-6', eligible: true },
  { value: 'F4', icon: '📋', name: '재외동포', sub: 'F-4', eligible: true },
  { value: 'other', icon: '❌', name: '기타', sub: '등록 불가', eligible: false },
];

export const ELIGIBLE_FOREIGNER_CODES = [
  'F-2 거주',
  'F-4 재외동포',
  'F-5 영주',
  'F-6 결혼이민',
] as const;

export type SpecialConditionState = {
  condition: SpecialCondition | null;

  foreignerCode: ForeignerCode | null;
};

export const EMPTY_SPECIAL_CONDITION: SpecialConditionState = {
  condition: null,
  foreignerCode: null,
};

export function getSpecialConditionLabel(condition: SpecialCondition | null): string {
  if (!condition) return NO_SPECIAL_CONDITION_LABEL;
  return `${SPECIAL_CONDITION_ICON[condition]} ${SPECIAL_CONDITION_LABEL[condition]}`;
}

export function needsForeignerCode(condition: SpecialCondition | null): boolean {
  return condition === 'foreigner';
}

export type TypeReplacingCondition = 'ins_career' | 'adjuster';

export function replacesApplicantType(
  condition: SpecialCondition | null,
): condition is TypeReplacingCondition {
  return condition === 'ins_career' || condition === 'adjuster';
}

export function isForeignerBlocked(state: SpecialConditionState): boolean {
  return state.condition === 'foreigner' && state.foreignerCode === 'other';
}

export function isSpecialConditionComplete(state: SpecialConditionState): boolean {
  if (needsForeignerCode(state.condition)) return state.foreignerCode !== null;
  return true;
}

