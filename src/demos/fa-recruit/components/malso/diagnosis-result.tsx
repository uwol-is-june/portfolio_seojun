'use client';

import {
  ASSOC_NAME,
  caseSummaryText,
  resolveCase,
  type MalsoCaseId,
} from '@/demos/fa-recruit/lib/domain/malso/case';
import type { MalsoAnswers } from '@/demos/fa-recruit/lib/domain/malso/wizard';
import {
  BOTH_ASSOC_ALERT,
  PROOF_INTRO,
  proofCommonSteps,
  proofSections,
} from '@/demos/fa-recruit/lib/domain/rules/malso-procedure';

import { DocPath } from './doc-path';
import { MethodSections, ResultSection } from './method-block';
import { Alert, RichText, StepList } from './rich';

type Props = {
  answers: MalsoAnswers;
  onRestart: () => void;
  onBack: () => void;
  onGoToSend: (caseId: MalsoCaseId, reason: string | null) => void;
  onGoToFaq: () => void;
};

export function DiagnosisResult({ answers, onRestart, onBack, onGoToSend, onGoToFaq }: Props) {
  const malsoCase = resolveCase(answers);

  if (!malsoCase) {
    return (
      <Alert tone="warn">
        답이 덜 채워져 케이스를 정할 수 없습니다.{' '}
        <button
          type="button"
          onClick={onRestart}
          className="text-brand-700 cursor-pointer font-bold underline underline-offset-2"
        >
          처음부터 다시
        </button>{' '}
        진행해주세요.
      </Alert>
    );
  }

  const proofYes = answers.proof === 'yes';

  return (
    <div className="space-y-4">

      <section className="bg-brand-700 rounded-[16px] px-5 py-6 text-white sm:px-7">
        <p className="text-[11px] font-bold tracking-[0.12em] text-white/70">진단 결과</p>
        <h2 className="mt-1.5 text-[19px] leading-tight font-extrabold sm:text-[22px]">
          {malsoCase.typeLabel}
          <span className="mt-1 block text-[13px] font-bold text-white/80 sm:mt-0 sm:ml-2 sm:inline">
            {proofYes ? '해촉증명서로 말소' : '해촉신청서(내용증명)로 말소'}
          </span>
        </h2>
        <p className="mt-3 text-[12.5px] leading-relaxed text-white/85">
          {caseSummaryText(malsoCase, proofYes ? 'yes' : 'no')}
        </p>
        {malsoCase.both && (
          <p className="mt-2.5 rounded-[8px] bg-white/15 px-3 py-2 text-[12px] leading-relaxed font-bold text-white">
            ⚠ 손보협회 + 생보협회 양쪽 모두 말소 신청 필수 — 한 곳만 하면 위촉 불가
          </p>
        )}
      </section>

      {proofYes ? (
        <ResultSection no="①" title="해촉증명서로 말소 — 진행 순서">
          <p className="text-body mb-4 text-[13px] leading-[1.75]">
            <RichText text={PROOF_INTRO} />
          </p>

          <div className="bg-surface mb-4 rounded-[12px] p-4">
            <p className="text-brand-700 mb-2.5 text-[12px] font-bold">공통 — 발급받고 확인하기</p>
            <StepList steps={proofCommonSteps(malsoCase.org)} />
          </div>

          {malsoCase.both && (
            <Alert tone="warn" className="mb-4">
              <RichText text={BOTH_ASSOC_ALERT} />
            </Alert>
          )}

          <MethodSections sections={proofSections(malsoCase.assoc)} />
        </ResultSection>
      ) : (
        <DocPath
          malsoCase={malsoCase}
          onGoToSend={() => onGoToSend(malsoCase.id, answers.reason)}
        />
      )}

      <Alert className="text-center">
        자주 묻는 질문은{' '}
        <button
          type="button"
          onClick={onGoToFaq}
          className="text-brand-700 focus-visible:outline-brand-700 cursor-pointer font-bold underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          ❓ FAQ 탭
        </button>
        에서 확인하세요.
      </Alert>

      <div className="flex flex-wrap justify-center gap-2 pt-1">
        <button
          type="button"
          onClick={onBack}
          className="border-line text-body hover:bg-surface focus-visible:outline-brand-700 cursor-pointer rounded-[10px] border bg-white px-4 py-2.5 text-[13px] font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          ← 이전 질문
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="border-line text-body hover:bg-surface focus-visible:outline-brand-700 cursor-pointer rounded-[10px] border bg-white px-4 py-2.5 text-[13px] font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          처음부터 다시
        </button>
      </div>
    </div>
  );
}

export function assocFullName(assoc: keyof typeof ASSOC_NAME): string {
  return assoc === 'both' ? '손해보험협회 + 생명보험협회' : ASSOC_NAME[assoc];
}
