'use client';

import {
  isAllAnswered,
  judgeFinalDiagnosis,
  visibleLimitItems,
  type DiagAnswers,
  type FinalDiagnosisResult,
} from '@/demos/fa-recruit/lib/domain/final-diagnosis';
import type { PrecheckWarning } from '@/demos/fa-recruit/lib/domain/precheck';
import { needsReentryCard, type MalsoTerm, type ReentryState } from '@/demos/fa-recruit/lib/domain/reentry';
import { LIMIT_CARDS } from '@/demos/fa-recruit/lib/domain/rules/limit-items';
import type { ApplicantType } from '@/demos/fa-recruit/lib/domain/self-diagnosis';
import { Button } from '@/demos/fa-recruit/components/ui/button';
import { Reveal, createRevealOrder } from '@/demos/fa-recruit/components/ui/reveal';

import { LimitCard } from './limit-card';
import { QualifyResult } from './qualify-result';
import { ReentryCard } from './reentry-card';

export const QUALIFY_JUDGE_LABEL = '위촉 진단 결과 미리 보기';

type QualifyStepProps = {
  applicantType: ApplicantType;

  assocHistory: boolean;
  reentry: ReentryState;
  onReentryChange: (next: ReentryState) => void;

  malsoTerm: MalsoTerm | null;
  malsoTermBasis: string | null;
  answers: DiagAnswers;
  onAnswersChange: (next: DiagAnswers) => void;
  result: FinalDiagnosisResult | null;
  onResultChange: (next: FinalDiagnosisResult | null) => void;
  warnings: readonly PrecheckWarning[];
};

export function QualifyStep({
  applicantType,
  assocHistory,
  reentry,
  onReentryChange,
  malsoTerm,
  malsoTermBasis,
  answers,
  onAnswersChange,
  result,
  onResultChange,
  warnings,
}: QualifyStepProps) {
  const showReentry = needsReentryCard(applicantType, assocHistory);
  const input = { type: applicantType, answers, reentry, malsoTerm };
  const ready = isAllAnswered(input, showReentry);

  const invalidate = () => {
    if (result) onResultChange(null);
  };

  const handleReentryChange = (next: ReentryState) => {
    onReentryChange(next);
    invalidate();
  };

  const handleAnswersChange = (next: DiagAnswers) => {
    onAnswersChange(next);
    invalidate();
  };

  const cards = LIMIT_CARDS.filter(
    (card) => visibleLimitItems(card.items, applicantType).length > 0,
  );
  const order = createRevealOrder();

  const buttonIndex = (showReentry ? 1 : 0) + cards.length;

  return (
    <>
      {showReentry && (
        <Reveal index={order()}>
          <ReentryCard
            value={reentry}
            onChange={handleReentryChange}
            malsoTerm={malsoTerm}
            malsoTermBasis={malsoTermBasis}
          />
        </Reveal>
      )}

      {cards.map((card) => (
        <Reveal key={card.key} index={order()}>
          <LimitCard
            cardKey={card.key}
            badge={card.badge}
            title={card.title}
            items={card.items}
            tone={card.tone}
            applicantType={applicantType}
            answers={answers}
            onChange={handleAnswersChange}
          />
        </Reveal>
      ))}

      {!ready && (
        <p className="text-danger mb-3 text-center text-[11px] font-extrabold">
          모든 항목을 체크해야 결과를 볼 수 있습니다.
        </p>
      )}

      <Reveal index={buttonIndex}>
        <Button
          size="lg"
          disabled={!ready}
          onClick={() => onResultChange(judgeFinalDiagnosis(input))}
        >
          {QUALIFY_JUDGE_LABEL}
        </Button>
      </Reveal>

      {result && (
        <QualifyResult result={result} applicantType={applicantType} warnings={warnings} />
      )}
    </>
  );
}
