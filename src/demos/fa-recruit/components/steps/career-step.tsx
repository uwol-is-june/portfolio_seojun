'use client';

import {
  CONVERTED_TO_NEW_MESSAGE,
  INVERTED_RECORD_MESSAGE,
  TYPE_UNRESOLVED_MESSAGE,
  calculateCareer,
  careerRecordsInUse,
  hasInvertedRecord,
  type CareerOutcome,
  type CareerResult as CareerResultData,
} from '@/demos/fa-recruit/lib/domain/career';
import type { ApplicantType, ApplicantTypeResolution, Role } from '@/demos/fa-recruit/lib/domain/self-diagnosis';
import { replacesApplicantType, type SpecialConditionState } from '@/demos/fa-recruit/lib/domain/special-condition';
import { Button } from '@/demos/fa-recruit/components/ui/button';
import { ConfirmLink } from '@/demos/fa-recruit/components/ui/confirm-link';
import { Reveal } from '@/demos/fa-recruit/components/ui/reveal';
import { useToast } from '@/demos/fa-recruit/components/ui/toast';

import { CareerDateFields, type CareerFormValue } from './career-date-fields';
import { CareerResult } from './career-result';
import { IdentitySummary } from './identity-summary';

export const CAREER_CALCULATE_LABEL = '경력 요건 미리 계산하기';

export type CareerCalculation = {
  result: CareerResultData | null;
  convertedType?: ApplicantType;
};

type CareerStepProps = {
  role: Role;

  applicantType: ApplicantType | null;
  typeResolution: ApplicantTypeResolution | null;
  specialCondition: SpecialConditionState;
  form: CareerFormValue;
  onFormChange: (next: CareerFormValue) => void;
  result: CareerResultData | null;

  onCalculated: (next: CareerCalculation) => void;

  onEditIdentity: () => void;

  onSwitchToGeneralRoute: () => void;

  onReset: () => void;

  assocHistory: boolean;
};

export function CareerStep({
  role,
  applicantType,
  typeResolution,
  specialCondition,
  form,
  onFormChange,
  result,
  onCalculated,
  onEditIdentity,
  onSwitchToGeneralRoute,
  onReset,
  assocHistory,
}: CareerStepProps) {
  const { showToast } = useToast();

  const handleCalculate = () => {

    if (hasInvertedRecord(careerRecordsInUse({ ...form, assocHistory }, specialCondition))) {
      showToast(INVERTED_RECORD_MESSAGE);
      onCalculated({ result: null });
      return;
    }

    if (!applicantType) {
      showToast(TYPE_UNRESOLVED_MESSAGE);
      onCalculated({ result: null });
      return;
    }

    const outcome: CareerOutcome = calculateCareer(
      { ...form, role, type: applicantType, assocHistory },
      specialCondition,
    );

    if (outcome.convertedType) showToast(CONVERTED_TO_NEW_MESSAGE);

    if (outcome.kind === 'incomplete') {
      if (!outcome.convertedType) showToast(outcome.message);
      onCalculated({ result: null, convertedType: outcome.convertedType });
      return;
    }
    onCalculated({ result: outcome.result, convertedType: outcome.convertedType });
  };

  const isOtherCareer = replacesApplicantType(specialCondition.condition);

  return (
    <>
      <Reveal index={0}>
        <IdentitySummary
          role={role}
          applicantType={isOtherCareer ? null : applicantType}
          specialCondition={specialCondition}
          onChange={onEditIdentity}
        />
      </Reveal>

      <Reveal index={1}>
        <CareerDateFields
          value={form}
          onChange={onFormChange}
          role={role}
          applicantType={applicantType}
          typeResolution={typeResolution}
          specialCondition={specialCondition.condition}
          assocHistory={assocHistory}
        />
      </Reveal>

      <Reveal index={2}>
        <Button size="lg" onClick={handleCalculate}>
          {CAREER_CALCULATE_LABEL}
        </Button>
      </Reveal>

      {result && <CareerResult result={result} onSwitchToGeneralRoute={onSwitchToGeneralRoute} />}

      <Reveal index={3}>
        <ConfirmLink
          label="↺ 처음부터 다시 입력하기"
          confirmLabel="한 번 더 누르면 입력값이 모두 지워집니다"
          onConfirm={onReset}
        />
      </Reveal>
    </>
  );
}
