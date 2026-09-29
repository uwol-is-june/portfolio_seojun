import { replacesApplicantType, type SpecialCondition } from './special-condition';

export type PrecheckAnswer = 'done' | 'not-yet';

export type PrecheckState = {

  bond: PrecheckAnswer | null;

  eclean: PrecheckAnswer | null;
};

export const EMPTY_PRECHECK: PrecheckState = { bond: null, eclean: null };

export function shouldAskEclean(
  assocHistory: boolean,
  condition: SpecialCondition | null,
): boolean {
  return assocHistory || replacesApplicantType(condition);
}

export function isPrecheckComplete(
  state: PrecheckState,
  assocHistory: boolean,
  condition: SpecialCondition | null = null,
): boolean {
  if (state.bond === null) return false;
  if (shouldAskEclean(assocHistory, condition) && state.eclean === null) return false;
  return true;
}

export type PrecheckWarningKey = 'malso' | 'bond' | 'eclean';

export type PrecheckWarning = {
  key: PrecheckWarningKey;
  label: string;

  title: string;

  body: string;
};

const WARNING_DETAIL: Record<PrecheckWarningKey, Omit<PrecheckWarning, 'key'>> = {
  malso: {
    label: '협회 말소',
    title: '말소 미완료 상태',

    body: '손보·생보 자격 보유 시, 등록된 협회의 말소가 완료되어야 실제 위촉 서류 접수가 가능합니다.\n시뮬레이션 단계에서는 말소가 완료되지 않았어도 진단은 진행되지만, 실제 접수 시점에는 반드시 말소 완료가 선행되어야 합니다.',
  },
  bond: {
    label: '보증보험 동의',
    title: '보증보험 동의 미진행',
    body: '보증보험 동의는 정확한 위촉 진단을 위한 필수 선행 절차입니다.\n미진행 시 파산·사고수당·금융규제·회생회복 등 보증보험 출처 항목이 자가응답 기반으로 처리되어 실제 결과와 다를 수 있습니다. 반드시 동의 후 재진단을 권장합니다.',
  },
  eclean: {
    label: 'E-클린서비스 조회',
    title: 'E-클린서비스 조회 미진행',
    body: 'E-클린 조회는 경력자(경력신입·경력자) 진단의 핵심 선행 절차입니다.\n미진행 시 이클린 출처 항목(부실모집·법규위반·불완전판매·이적횟수·수당환수 등)이 자가응답 기반으로 처리되어 실제 결과와 다를 수 있습니다. 반드시 조회 후 재진단을 권장합니다.',
  },
};

export function getPrecheckWarnings(
  state: PrecheckState,
  assocHistory: boolean,
  condition: SpecialCondition | null = null,
  malsoPending = false,
): PrecheckWarning[] {
  const warnings: PrecheckWarning[] = [];

  if (assocHistory && malsoPending) {
    warnings.push({ key: 'malso', ...WARNING_DETAIL.malso });
  }
  if (state.bond === 'not-yet') warnings.push({ key: 'bond', ...WARNING_DETAIL.bond });
  if (shouldAskEclean(assocHistory, condition) && state.eclean === 'not-yet') {
    warnings.push({ key: 'eclean', ...WARNING_DETAIL.eclean });
  }
  return warnings;
}
