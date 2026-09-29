export const STEP_KEYS = ['precheck', 'career', 'qualify'] as const;

export type StepKey = (typeof STEP_KEYS)[number];

export type StepMeta = {
  key: StepKey;
  name: string;
  desc: string;
  icon: string;
};

export const STEPS: readonly StepMeta[] = [
  { key: 'precheck', name: '사전 체크', desc: '유형 자가진단 · 선행 절차', icon: '🧭' },
  { key: 'career', name: '경력 조회', desc: '자격 · 경력일수 요건', icon: '📋' },
  { key: 'qualify', name: '자격 진단', desc: '제한사유 판정', icon: '🔍' },
] as const;
