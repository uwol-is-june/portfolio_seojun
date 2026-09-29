'use client';

import { ROLE_LABEL, TYPE_LABEL, type ApplicantType, type Role } from '@/demos/fa-recruit/lib/domain/self-diagnosis';
import {
  getSpecialConditionLabel,
  replacesApplicantType,
  type SpecialConditionState,
} from '@/demos/fa-recruit/lib/domain/special-condition';

type IdentitySummaryProps = {
  role: Role | null;

  applicantType: ApplicantType | null;
  specialCondition: SpecialConditionState;
  onChange: () => void;
};

export function IdentitySummary({
  role,
  applicantType,
  specialCondition,
  onChange,
}: IdentitySummaryProps) {
  const condition = specialCondition.condition;
  const typeLabel = replacesApplicantType(condition)
    ? getSpecialConditionLabel(condition)
    : applicantType
      ? TYPE_LABEL[applicantType]
      :
        '경력 입력 후 판정';

  return (
    <div className="border-brand-700 bg-brand-50 mb-4 flex flex-wrap items-center gap-2 rounded-[12px] border px-4 py-3">
      <span className="text-muted text-[11px] font-bold">사전 체크 결과</span>
      <span className="text-brand-700 text-[13.5px] font-extrabold">
        {role ? ROLE_LABEL[role] : '-'} · {typeLabel}
      </span>
      {condition && !replacesApplicantType(condition) && (
        <span className="bg-warn-light text-warn rounded-md px-2 py-0.5 text-[11px] font-bold">
          {getSpecialConditionLabel(condition)}
        </span>
      )}
      <button
        type="button"
        onClick={onChange}
        className="border-brand-700 text-brand-700 hover:bg-brand-100 focus-visible:outline-brand-700 ml-auto cursor-pointer rounded-md border px-2.5 py-1 text-[11px] font-bold focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        변경
      </button>
    </div>
  );
}
