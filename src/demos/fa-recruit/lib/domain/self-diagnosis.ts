import { parseDate } from '../utils/date';
import {
  careerDaysAt,
  hasCompleteRecords,
  hasInvertedRecord,
  type CareerRecord,
} from './career-record';

export type Role = 'sales' | 'qualified';

export type ApplicantType = 'new' | 'junior' | 'senior';

export const ROLE_LABEL: Record<Role, string> = {
  sales: '보험설계사',
  qualified: '유자격자',
};

export const TYPE_LABEL: Record<ApplicantType, string> = {
  new: '신인',
  junior: '경력신입',
  senior: '경력자',
};

export const CAREER_CRITERIA: Record<
  Role,
  { windowYears: number; requiredDays: number; label: string }
> = {
  sales: { windowYears: 3, requiredDays: 365, label: '최근 3년 내 1년 이상' },
  qualified: { windowYears: 4, requiredDays: 730, label: '최근 4년 내 2년 이상' },
};

export type SelfDiagnosis = {

  role: Role | null;

  assocHistory: boolean | null;
};

export const EMPTY_SELF_DIAGNOSIS: SelfDiagnosis = {
  role: null,
  assocHistory: null,
};

export function isSelfDiagnosisComplete(d: SelfDiagnosis): boolean {
  return d.role !== null && d.assocHistory !== null;
}

export type CareerEvidence = {

  targetDate: string;
  records: readonly CareerRecord[];
};

export const EMPTY_CAREER_EVIDENCE: CareerEvidence = { targetDate: '', records: [] };

export type ApplicantTypeResolution =
  | { type: 'new'; reason: 'no-history' }
  | {
      type: 'senior' | 'junior';
      reason: 'career-days';
      days: number;
      windowYears: number;
      requiredDays: number;
    };

export function resolveApplicantTypeDetail(
  d: SelfDiagnosis,
  evidence: CareerEvidence = EMPTY_CAREER_EVIDENCE,
): ApplicantTypeResolution | null {
  if (d.assocHistory === null) return null;
  if (d.assocHistory === false) return { type: 'new', reason: 'no-history' };
  if (d.role === null) return null;

  const at = parseDate(evidence.targetDate);
  if (!at || !hasCompleteRecords(evidence.records)) return null;
  if (hasInvertedRecord(evidence.records)) return null;

  const { windowYears, requiredDays } = CAREER_CRITERIA[d.role];
  const days = careerDaysAt(evidence.records, at, windowYears);
  return {
    type: days >= requiredDays ? 'senior' : 'junior',
    reason: 'career-days',
    days,
    windowYears,
    requiredDays,
  };
}

export function resolveApplicantType(
  d: SelfDiagnosis,
  evidence: CareerEvidence = EMPTY_CAREER_EVIDENCE,
): ApplicantType | null {
  return resolveApplicantTypeDetail(d, evidence)?.type ?? null;
}

export function describeTypeResolution(resolution: ApplicantTypeResolution): string {
  if (resolution.reason === 'no-history') {
    return `협회 등록 이력 없음 → ${TYPE_LABEL.new}`;
  }
  const { days, windowYears, requiredDays, type } = resolution;
  return `최근 ${windowYears}년 내 ${days}일 (기준 ${requiredDays}일) → ${TYPE_LABEL[type]}`;
}

