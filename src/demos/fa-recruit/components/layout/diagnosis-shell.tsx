'use client';

import { useEffect, useRef, useState } from 'react';

import { EMPTY_CAREER_INPUT } from '@/demos/fa-recruit/lib/domain/career';
import type { CandidateInfo } from '@/demos/fa-recruit/lib/domain/candidates';
import {
  describeMalsoTermOf,
  getMalsoTerm,
  isAssocMalsoPending,
  getTypeResolution,
  type CareerFormState,
  type DiagnosisState,
} from '@/demos/fa-recruit/lib/domain/diagnosis-state';
import type { DocsInput } from '@/demos/fa-recruit/lib/domain/documents';
import type { FinalDiagnosisResult } from '@/demos/fa-recruit/lib/domain/final-diagnosis';
import { getPrecheckWarnings, isPrecheckComplete } from '@/demos/fa-recruit/lib/domain/precheck';
import { isSelfDiagnosisComplete, type SelfDiagnosis } from '@/demos/fa-recruit/lib/domain/self-diagnosis';
import {
  isSpecialConditionComplete,
  type SpecialConditionState,
} from '@/demos/fa-recruit/lib/domain/special-condition';
import { STEPS, type StepKey } from '@/demos/fa-recruit/lib/steps';
import { Button } from '@/demos/fa-recruit/components/ui/button';
import {
  CAREER_CALCULATE_LABEL,
  CareerStep,
  type CareerCalculation,
} from '@/demos/fa-recruit/components/steps/career-step';
import { DiagnosisSummary } from '@/demos/fa-recruit/components/steps/diagnosis-summary';
import { PrecheckStep } from '@/demos/fa-recruit/components/steps/precheck-step';
import { QUALIFY_JUDGE_LABEL, QualifyStep } from '@/demos/fa-recruit/components/steps/qualify-step';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';

import { ScrollToTop } from './scroll-to-top';
import { StepFlow } from './step-flow';
import type { DiagnosisScope } from './mode-landing';

type DiagnosisShellProps = {
  scope: DiagnosisScope;

  onExit: () => void;

  state: DiagnosisState;
  onStateChange: (next: DiagnosisState) => void;

  candidateName?: string;

  candidateInfo?: CandidateInfo | null;

  onBackToList?: () => void;

  nextCandidateName?: string | null;
  onNextCandidate?: () => void;
};

export function DiagnosisShell({
  scope,
  onExit,
  state,
  onStateChange,
  candidateName,
  candidateInfo,
  onBackToList,
  nextCandidateName,
  onNextCandidate,
}: DiagnosisShellProps) {
  const [index, setIndex] = useState(0);
  const [maxReachedIndex, setMaxReachedIndex] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const isFirstRender = useRef(true);

  const [showSummary, setShowSummary] = useState(false);

  const {
    selfDiagnosis,
    specialCondition,
    precheck,
    careerForm,
    careerResult,
    typeOverride,
    reentry,
    diagAnswers,
    qualifyResult,
    docChecks,
  } = state;

  const patch = (partial: Partial<DiagnosisState>) => onStateChange({ ...state, ...partial });

  const clearQualify = { qualifyResult: null, judgedAt: null } as const;

  const handleQualifyResult = (next: FinalDiagnosisResult | null) => {
    patch({ qualifyResult: next, judgedAt: next ? new Date().toISOString() : null });
  };

  const typeResolution = getTypeResolution(state);
  const applicantType = typeOverride ?? typeResolution?.type ?? null;

  const assocHistory = selfDiagnosis.assocHistory === true;

  const docsInput: DocsInput | null =
    applicantType && selfDiagnosis.role && qualifyResult
      ? {
          type: applicantType,
          role: selfDiagnosis.role,
          special: specialCondition,
          result: qualifyResult,
          answers: diagAnswers,
        }
      : null;
  const step = STEPS[index];
  const isFirst = index === 0;
  const isLast = index === STEPS.length - 1;

  const handleSelfDiagnosisChange = (next: SelfDiagnosis) => {
    patch({
      selfDiagnosis: next,
      typeOverride: null,
      careerResult: null,
      ...clearQualify,
    });
  };

  const handleSpecialConditionChange = (next: SpecialConditionState) => {

    patch({ specialCondition: next, careerResult: null, ...clearQualify });
  };

  const handleSwitchToGeneralRoute = () => {
    handleSpecialConditionChange({ condition: null, foreignerCode: null });
    goTo(0);
  };

  const handleCareerCalculated = ({ result, convertedType }: CareerCalculation) => {
    patch({
      careerResult: result,
      typeOverride: convertedType ?? null,
      ...clearQualify,
    });
  };

  const handleCareerFormChange = (next: CareerFormState) => {
    patch({ careerForm: next, careerResult: null, typeOverride: null, ...clearQualify });
  };

  const handleCareerReset = () => {
    patch({
      careerForm: { ...EMPTY_CAREER_INPUT, careerRecords: [], otherCareerRecords: [] },
      careerResult: null,
      typeOverride: null,
      ...clearQualify,
    });
  };

  const completed: Partial<Record<StepKey, boolean>> = {

    precheck:
      isSelfDiagnosisComplete(selfDiagnosis) &&
      isSpecialConditionComplete(specialCondition) &&
      isPrecheckComplete(precheck, assocHistory, specialCondition.condition),

    career: careerResult !== null,
    qualify: qualifyResult !== null,
  };

  const canProceed =
    step.key === 'career'
      ? careerResult !== null &&
        careerResult.verdict !== 'bad' &&

        !careerResult.needsGeneralRoute
      : (completed[step.key] ?? true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [index, showSummary]);

  const goTo = (next: number) => {
    if (next < 0 || next >= STEPS.length) return;
    setDirection(next > index ? 'forward' : 'back');
    setIndex(next);
    setMaxReachedIndex((m) => Math.max(m, next));
  };

  const handleNavigate = (key: StepKey) => {
    const next = STEPS.findIndex((s) => s.key === key);
    if (next >= 0 && next <= maxReachedIndex) goTo(next);
  };

  return (
    <div className="bg-surface flex min-h-dvh flex-col">

      <div className="border-line border-b bg-white">
        <div className="mx-auto flex max-w-[820px] items-center justify-between px-3 py-2 sm:px-4">
          <button
            type="button"
            onClick={onBackToList ?? onExit}
            className="text-muted hover:text-brand-700 focus-visible:outline-brand-700 cursor-pointer rounded px-1 py-0.5 text-[12px] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {onBackToList ? '← 명단으로' : '↺ 처음으로'}
          </button>
          <span className="text-muted text-[11.5px] font-semibold break-keep">
            {candidateName ?? (scope === 'single' ? '개인 진단' : '단체 진단')}
          </span>
        </div>
      </div>

      {!showSummary && (
        <StepFlow
          active={step.key}
          maxReachedIndex={maxReachedIndex}
          completed={completed}
          onNavigate={handleNavigate}
        />
      )}

      <main className="flex-1">
        <div
          key={showSummary ? 'summary' : step.key}
          className={cn(
            'mx-auto w-full max-w-[820px] px-4 py-7 sm:py-10',
            direction === 'forward' ? 'animate-step-forward' : 'animate-step-back',
          )}
        >
          <header className="mb-6">
            <p className="text-brand-700 text-[12px] font-bold">
              {showSummary ? '진단 완료' : `${index + 1} / ${STEPS.length} 단계`}
            </p>
            <h1 className="text-strong mt-1.5 flex items-center gap-2 text-[22px] font-extrabold sm:text-[26px]">
              <span aria-hidden>{showSummary ? '🎉' : step.icon}</span>
              {showSummary ? '진단 결과 요약' : step.name}
            </h1>
          </header>

          {showSummary && docsInput && (
            <DiagnosisSummary
              state={state}
              candidateInfo={candidateInfo}
              docsInput={docsInput}
              careerResult={careerResult}
              special={specialCondition}
              checks={docChecks}
              onChecksChange={(next) => patch({ docChecks: next })}
              reentry={reentry}
              assocHistory={assocHistory}
              onExit={onExit}
              onBack={() => setShowSummary(false)}
              onBackToList={onBackToList}
              nextCandidateName={nextCandidateName}
              onNextCandidate={onNextCandidate}
            />
          )}

          {!showSummary && step.key === 'precheck' && (
            <PrecheckStep
              selfDiagnosis={selfDiagnosis}
              onSelfDiagnosisChange={handleSelfDiagnosisChange}
              specialCondition={specialCondition}
              onSpecialConditionChange={handleSpecialConditionChange}
              precheck={precheck}
              onPrecheckChange={(next) => patch({ precheck: next })}
            />
          )}

          {!showSummary && step.key === 'career' && selfDiagnosis.role && (
            <CareerStep
              role={selfDiagnosis.role}
              applicantType={applicantType}
              typeResolution={typeResolution}
              specialCondition={specialCondition}
              form={careerForm}
              onFormChange={handleCareerFormChange}
              result={careerResult}
              onCalculated={handleCareerCalculated}
              onEditIdentity={() => goTo(0)}
              onSwitchToGeneralRoute={handleSwitchToGeneralRoute}
              onReset={handleCareerReset}
              assocHistory={assocHistory}
            />
          )}

          {!showSummary && step.key === 'qualify' && applicantType && (
            <QualifyStep
              applicantType={applicantType}
              assocHistory={assocHistory}
              reentry={reentry}
              onReentryChange={(next) => patch({ reentry: next })}
              malsoTerm={getMalsoTerm(state)}
              malsoTermBasis={describeMalsoTermOf(state)}
              answers={diagAnswers}
              onAnswersChange={(next) => patch({ diagAnswers: next })}
              result={qualifyResult}
              onResultChange={handleQualifyResult}
              warnings={getPrecheckWarnings(
                precheck,
                assocHistory,
                specialCondition.condition,
                isAssocMalsoPending(state),
              )}
            />
          )}

          {!showSummary && !canProceed && (
            <p className="text-warn mt-5 text-center text-[12px] font-semibold">
              {step.key === 'career'
                ? careerResult
                  ? '위촉 불가 판정이라 다음 단계로 넘어갈 수 없습니다.'
                  : `${CAREER_CALCULATE_LABEL}를 눌러 결과를 확인하세요.`
                : step.key === 'qualify'
                  ? `${QUALIFY_JUDGE_LABEL}를 눌러 판정을 확인하세요.`
                  : '위 항목을 모두 선택해야 다음 단계로 넘어갈 수 있습니다.'}
            </p>
          )}

          {!showSummary && (
            <div className="mt-4 flex items-center gap-3">
              <Button
                variant="outline"
                className="flex-1"
                disabled={isFirst}
                onClick={() => goTo(index - 1)}
              >
                ← 이전
              </Button>
              <Button
                className="flex-[2]"
                variant={isLast ? 'ok' : 'primary'}
                disabled={!canProceed}
                onClick={() => (isLast ? setShowSummary(true) : goTo(index + 1))}
              >
                {isLast ? '진단 완료' : '다음 →'}
              </Button>
            </div>
          )}
        </div>
      </main>

      <footer className="text-muted px-3 pt-4 pb-6 text-center text-[10.5px]">
        본 결과는 사전 진단 참고용입니다.
      </footer>

      <ScrollToTop />
    </div>
  );
}
