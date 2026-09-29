'use client';

import type { PrecheckState } from '@/demos/fa-recruit/lib/domain/precheck';
import { isSelfDiagnosisComplete, type SelfDiagnosis } from '@/demos/fa-recruit/lib/domain/self-diagnosis';
import { replacesApplicantType, type SpecialConditionState } from '@/demos/fa-recruit/lib/domain/special-condition';
import { Reveal } from '@/demos/fa-recruit/components/ui/reveal';

import { PrecheckCard } from './precheck-card';
import { SelfDiagnosisCard } from './self-diagnosis-card';
import { SpecialConditionCard } from './special-condition-card';
import { SpecialConditionInfoCard } from './special-condition-info-card';

type PrecheckStepProps = {
  selfDiagnosis: SelfDiagnosis;
  onSelfDiagnosisChange: (next: SelfDiagnosis) => void;
  specialCondition: SpecialConditionState;
  onSpecialConditionChange: (next: SpecialConditionState) => void;
  precheck: PrecheckState;
  onPrecheckChange: (next: PrecheckState) => void;
};

export function PrecheckStep({
  selfDiagnosis,
  onSelfDiagnosisChange,
  specialCondition,
  onSpecialConditionChange,
  precheck,
  onPrecheckChange,
}: PrecheckStepProps) {
  const selfDiagnosisDone = isSelfDiagnosisComplete(selfDiagnosis);
  const condition = specialCondition.condition;

  return (
    <>
      <Reveal index={0}>
        <SpecialConditionCard value={specialCondition} onChange={onSpecialConditionChange} />
      </Reveal>

      {condition && (
        <Reveal key={`${condition}-${specialCondition.foreignerCode ?? ''}`} index={1}>
          <SpecialConditionInfoCard value={specialCondition} role={selfDiagnosis.role} />
        </Reveal>
      )}

      <Reveal index={2}>
        <SelfDiagnosisCard
          value={selfDiagnosis}
          onChange={onSelfDiagnosisChange}
          typeReplacedBy={replacesApplicantType(condition) ? condition : null}
        />
      </Reveal>

      {selfDiagnosisDone && (
        <Reveal index={3}>
          <PrecheckCard
            value={precheck}
            onChange={onPrecheckChange}
            assocHistory={selfDiagnosis.assocHistory === true}
            specialCondition={condition}
          />
        </Reveal>
      )}
    </>
  );
}
