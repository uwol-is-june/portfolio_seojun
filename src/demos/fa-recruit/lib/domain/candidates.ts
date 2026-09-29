import { buildDocGroups, isDocsComplete } from './documents';
import { getApplicantType, type DiagnosisState } from './diagnosis-state';
import { isSelfDiagnosisComplete, TYPE_LABEL, type ApplicantType } from './self-diagnosis';

export type CandidateInfo = {

  partner: string;
  name: string;

  birth: string;

  empno: string;
};

export const EMPTY_CANDIDATE_INFO: CandidateInfo = {
  partner: '',
  name: '',
  birth: '',
  empno: '',
};

export type Candidate = {
  id: string;
  info: CandidateInfo;

  diagnosis: DiagnosisState;

  updatedAt: string;
};

export type CandidateStatus = 'none' | 'progress' | 'pass' | 'done' | 'fail';

export const CANDIDATE_STATUS_LABEL: Record<CandidateStatus, string> = {
  none: '미완료',
  progress: '진단중',
  pass: '완료 · 적격 ✓',
  done: '✓✓ 완료',
  fail: '완료 · 불가 ✗',
};

export function getCandidateStatus(state: DiagnosisState): CandidateStatus {
  const result = state.qualifyResult;
  if (result) {
    if (result.grade === 'bad') return 'fail';
    if (result.grade === 'ok') {
      const type = getCandidateType(state);
      const role = state.selfDiagnosis.role;
      if (!type || !role) return 'pass';
      const groups = buildDocGroups({
        type,
        role,
        special: state.specialCondition,
        result,
        answers: state.diagAnswers,
      });
      return isDocsComplete(groups, type, state.docChecks) ? 'done' : 'pass';
    }

    return 'pass';
  }

  if (state.careerResult || isSelfDiagnosisComplete(state.selfDiagnosis)) return 'progress';
  return 'none';
}

export function getFailReason(state: DiagnosisState): string {
  if (state.qualifyResult?.grade !== 'bad') return '';
  return state.qualifyResult.desc.trim().split('\n')[0] ?? '';
}

export function getCandidateType(state: DiagnosisState): ApplicantType | null {
  return getApplicantType(state);
}

export function getCandidateMeta(candidate: Candidate): string {
  const type = getCandidateType(candidate.diagnosis);
  return [candidate.info.partner, type ? TYPE_LABEL[type] : ''].filter(Boolean).join(' · ');
}

export function isDiagnosed(status: CandidateStatus): boolean {
  return status === 'pass' || status === 'done' || status === 'fail';
}

export const MAX_CANDIDATES = 50;

export const NAME_REQUIRED_MESSAGE = '이름을 입력해주세요.';
export const MAX_CANDIDATES_MESSAGE = `대상자는 최대 ${MAX_CANDIDATES}명까지 등록할 수 있습니다.`;

export function isCandidateInfoComplete(info: CandidateInfo): boolean {
  return (
    info.partner.trim() !== '' &&
    info.name.trim() !== '' &&
    info.birth.trim() !== '' &&
    info.empno.trim() !== ''
  );
}

export function createCandidateId(seed: string): string {
  return `c_${seed}`;
}

export type CandidateCount = { total: number; diagnosed: number; percent: number };

export function countCandidates(candidates: readonly Candidate[]): CandidateCount {
  const total = candidates.length;
  const diagnosed = candidates.filter((c) => isDiagnosed(getCandidateStatus(c.diagnosis))).length;
  return {
    total,
    diagnosed,
    percent: total === 0 ? 0 : Math.round((diagnosed / total) * 100),
  };
}

const EXPORT_ORDER: Record<string, number> = { ok: 1, warn: 2, pending: 2, bad: 3 };

export function selectDiagnosed(candidates: readonly Candidate[]): Candidate[] {
  return candidates
    .filter((c) => c.info.name.trim() !== '' && isDiagnosed(getCandidateStatus(c.diagnosis)))
    .sort((a, b) => {
      const pa = EXPORT_ORDER[a.diagnosis.qualifyResult?.grade ?? ''] ?? 9;
      const pb = EXPORT_ORDER[b.diagnosis.qualifyResult?.grade ?? ''] ?? 9;
      return pa - pb || a.info.name.localeCompare(b.info.name);
    });
}

export function findNextPending(
  candidates: readonly Candidate[],
  currentId: string | null,
): Candidate | null {
  return (
    candidates.find((c) => {
      if (c.id === currentId) return false;
      const status = getCandidateStatus(c.diagnosis);
      return status === 'none' || status === 'progress';
    }) ?? null
  );
}
