import {
  EMPTY_CAREER_INPUT,
  isMalsoDatePending,
  latestRecordEnd,
  type CareerInput,
  type CareerResult,
} from './career';
import type { DocChecks } from './documents';
import type { DiagAnswers, FinalDiagnosisResult } from './final-diagnosis';
import { EMPTY_PRECHECK, type PrecheckState } from './precheck';
import {
  EMPTY_REENTRY,
  describeMalsoTerm,
  resolveMalsoTerm,
  type MalsoTerm,
  type ReentryState,
} from './reentry';
import {
  EMPTY_SELF_DIAGNOSIS,
  resolveApplicantTypeDetail,
  type ApplicantType,
  type ApplicantTypeResolution,
  type CareerEvidence,
  type SelfDiagnosis,
} from './self-diagnosis';
import {
  EMPTY_SPECIAL_CONDITION,
  replacesApplicantType,
  type SpecialConditionState,
} from './special-condition';

export type CareerFormState = Omit<CareerInput, 'role' | 'type' | 'assocHistory'>;

export type DiagnosisState = {
  selfDiagnosis: SelfDiagnosis;
  specialCondition: SpecialConditionState;
  precheck: PrecheckState;
  careerForm: CareerFormState;
  careerResult: CareerResult | null;

  typeOverride: ApplicantType | null;
  reentry: ReentryState;
  diagAnswers: DiagAnswers;
  qualifyResult: FinalDiagnosisResult | null;

  judgedAt: string | null;
  docChecks: DocChecks;
};

export const EMPTY_DIAGNOSIS_STATE: DiagnosisState = {
  selfDiagnosis: EMPTY_SELF_DIAGNOSIS,
  specialCondition: EMPTY_SPECIAL_CONDITION,
  precheck: EMPTY_PRECHECK,
  careerForm: EMPTY_CAREER_INPUT,
  careerResult: null,
  typeOverride: null,
  reentry: EMPTY_REENTRY,
  diagAnswers: {},
  qualifyResult: null,
  judgedAt: null,
  docChecks: {},
};

export function createEmptyDiagnosisState(): DiagnosisState {
  return {
    ...EMPTY_DIAGNOSIS_STATE,

    selfDiagnosis: { ...EMPTY_SELF_DIAGNOSIS },
    specialCondition: { ...EMPTY_SPECIAL_CONDITION },
    precheck: { ...EMPTY_PRECHECK },
    careerForm: { ...EMPTY_CAREER_INPUT, careerRecords: [], otherCareerRecords: [] },
    reentry: { ...EMPTY_REENTRY },
    diagAnswers: {},
    docChecks: {},
  };
}

export function careerEvidenceOf(state: DiagnosisState): CareerEvidence {
  const useOther = replacesApplicantType(state.specialCondition.condition);
  return {
    targetDate: state.careerForm.targetDate,
    records: useOther ? state.careerForm.otherCareerRecords : state.careerForm.careerRecords,
  };
}

export function getTypeResolution(state: DiagnosisState): ApplicantTypeResolution | null {
  return resolveApplicantTypeDetail(state.selfDiagnosis, careerEvidenceOf(state));
}

export function getApplicantType(state: DiagnosisState): ApplicantType | null {
  return state.typeOverride ?? getTypeResolution(state)?.type ?? null;
}

export function assocMalsoDateOf(state: DiagnosisState): string {
  return replacesApplicantType(state.specialCondition.condition)
    ? state.careerForm.assocMalsoDate
    : latestRecordEnd(state.careerForm.careerRecords);
}

export function isAssocMalsoPending(state: DiagnosisState, today?: Date): boolean {
  return isMalsoDatePending(assocMalsoDateOf(state), today);
}

export function getMalsoTerm(state: DiagnosisState): MalsoTerm | null {
  return resolveMalsoTerm(assocMalsoDateOf(state), state.careerForm.targetDate);
}

export function describeMalsoTermOf(state: DiagnosisState): string | null {
  return describeMalsoTerm(assocMalsoDateOf(state), state.careerForm.targetDate);
}
