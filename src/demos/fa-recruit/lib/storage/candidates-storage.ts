import { EMPTY_CAREER_INPUT } from '../domain/career';
import type { Candidate } from '../domain/candidates';
import type { CareerFormState } from '../domain/diagnosis-state';
import { EMPTY_REENTRY } from '../domain/reentry';
import DEMO_CANDIDATES from './demo-candidates.json';

const STORAGE_KEY = 'fa-recruit-candidates-v2';

function reviveCandidate(raw: Candidate): Candidate {
  if (!raw.diagnosis) return raw;
  const career = raw.diagnosis.careerResult;
  const reentry = raw.diagnosis.reentry;

  const emptyForm: CareerFormState = {
    ...EMPTY_CAREER_INPUT,
    careerRecords: [],
    otherCareerRecords: [],
  };
  return {
    ...raw,
    diagnosis: {
      ...raw.diagnosis,
      careerForm: { ...emptyForm, ...raw.diagnosis.careerForm },
      reentry: { ...EMPTY_REENTRY, ...reentry, count: reentry?.count ?? EMPTY_REENTRY.count },
      careerResult: career?.expiresAt
        ? { ...career, expiresAt: new Date(career.expiresAt) }
        : career,

      judgedAt: raw.diagnosis.judgedAt ?? null,
    },
  };
}

export function loadCandidates(): Candidate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // 공개 데모: 저장된 명단이 없으면(첫 방문) 판정별 가상 대상자 5명으로 시작한다
    if (raw === null) return (DEMO_CANDIDATES as unknown as Candidate[]).map(reviveCandidate);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((c): c is Candidate => Boolean(c) && typeof c === 'object' && 'id' in c)
      .map(reviveCandidate);
  } catch {

    return [];
  }
}

export function saveCandidates(candidates: readonly Candidate[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
    return true;
  } catch {
    return false;
  }
}

export const STORAGE_FULL_MESSAGE =
  '저장 공간이 부족합니다. 진단이 끝난 대상자를 삭제한 뒤 다시 시도해주세요.';
