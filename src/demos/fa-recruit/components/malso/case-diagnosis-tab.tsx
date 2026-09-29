'use client';

import { useState } from 'react';

import {
  type MalsoAssoc,
  type MalsoCaseId,
  type MalsoForm,
  type MalsoOrg,
  type MalsoProof,
} from '@/demos/fa-recruit/lib/domain/malso/case';
import {
  assocQuestionText,
  isLastQuestion,
  nextStep,
  prevStep,
  questionNumber,
  questionSteps,
  REASON_OPTIONS,
  setAnswer,
  visibleSteps,
  type MalsoAnswers,
  type MalsoStepId,
} from '@/demos/fa-recruit/lib/domain/malso/wizard';
import { FORM_LOOKUP_ROW, HISTORY_LOOKUP } from '@/demos/fa-recruit/lib/domain/rules/malso-procedure';
import { Collapse } from '@/demos/fa-recruit/components/ui/collapse';

import { DiagnosisResult } from './diagnosis-result';
import { ProgressDots, QuestionCard, type QuestionOption } from './question-card';
import { LinkRow, RichText } from './rich';

type Props = {
  answers: MalsoAnswers;
  onAnswersChange: (next: MalsoAnswers) => void;
  onGoToSend: (caseId: MalsoCaseId, reason: string | null) => void;
  onGoToFaq: () => void;
};

const PROOF_OPTIONS: QuestionOption<MalsoProof>[] = [
  {
    value: 'yes',
    label: '예 — 발급받을 수 있음',
    desc: '해촉증명서 경로 · 대기기간 없음',
  },
  {
    value: 'no',
    label: '아니오 — 지연·거부되거나 직접 진행',
    desc: '내용증명 경로 · 발송일 포함 11일째부터',
  },
];

const ORG_OPTIONS: QuestionOption<MalsoOrg>[] = [
  {
    value: 'company',
    label: '전속사 (보험회사 소속)',
    desc: '전속 또는 교차 · 수신처 = 소속 보험회사 대표',
  },
  {
    value: 'agency',
    label: 'GA대리점 (대리점 소속)',
    desc: '수신처 = 소속 대리점 대표 (사용인·유자격자 공통)',
  },
];

const FORM_OPTIONS: QuestionOption<MalsoForm>[] = [
  {
    value: 'jeon',
    label: '전속 (한 곳만 등록)',
    desc: '손보 또는 생보 중 한 협회에만 코드 → 해당 협회 1곳만 말소',
  },
  {
    value: 'gyo',
    label: '교차 등록 (한 회사 소속, 두 협회 코드)',
    desc: '소속 보험회사는 1곳이지만 손보·생보 양쪽 협회에 코드가 있는 경우. 두 협회 모두 말소 필수',
  },
];

const ASSOC_OPTIONS: QuestionOption<MalsoAssoc>[] = [
  { value: 'son', label: '손해보험협회', desc: '손해보험 코드만' },
  { value: 'life', label: '생명보험협회', desc: '생명보험 코드만' },
  { value: 'both', label: '양쪽 모두', desc: '손보협회 + 생보협회 둘 다 등록' },
];

function LookupBox({ title, firstRow }: { title: string; firstRow: string }) {
  return (
    <div className="bg-surface mt-4 rounded-[12px] p-3.5">
      <p className="text-strong text-[12.5px] font-bold">{title}</p>
      <p className="text-body mt-2 text-[12px] leading-[1.75]">
        <RichText text={firstRow} />
        <br />
        <span className="text-muted text-[11.5px]">{HISTORY_LOOKUP.note}</span>
      </p>
      <p className="text-body mt-2 text-[12px] leading-[1.75]">
        {HISTORY_LOOKUP.rows.slice(1).map((row, i) => (
          <span key={i} className="block">
            <RichText text={row} />
          </span>
        ))}
      </p>
      <div className="mt-3">
        <LinkRow links={HISTORY_LOOKUP.links} />
      </div>
    </div>
  );
}

function ProofGuide() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="border-line text-body hover:bg-surface focus-visible:outline-brand-700 flex w-full cursor-pointer items-center justify-between rounded-[10px] border bg-white px-3.5 py-2.5 text-[12.5px] font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span>📋 해촉증명서 vs 해촉신청서 — 차이점</span>
        <span
          aria-hidden
          className={`text-muted text-[10px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>
      <Collapse open={open}>
        <div className="bg-surface mt-2 space-y-2.5 rounded-[10px] p-3.5">
          <p className="text-body text-[12.5px] leading-[1.75]">
            <RichText text="**해촉증명서** — **회사가 발급**해주는 문서. 받으면 대기 없이 바로 협회에 제출해 말소 신청." />
          </p>
          <p className="text-body text-[12.5px] leading-[1.75]">
            <RichText text="**해촉신청서(내용증명)** — 회사가 거부·지연하거나 본인이 직접 진행할 때 **본인이 작성**해 우체국 내용증명으로 발송. 발송일 포함 11일째부터 말소 신청 가능." />
          </p>
          <p className="text-muted rounded-[8px] bg-white px-3 py-2 text-[12px] leading-relaxed">
            둘 중 하나만 있으면 말소됩니다. 회사가 협조적이면 해촉증명서가 가장 빠릅니다.
          </p>
        </div>
      </Collapse>
    </div>
  );
}

export function CaseDiagnosisTab({ answers, onAnswersChange, onGoToSend, onGoToFaq }: Props) {
  const [step, setStep] = useState<MalsoStepId>('proof');

  const path = visibleSteps(answers);
  if (!path.includes(step)) setStep('proof');

  const goNext = () => {
    const n = nextStep(answers, step);
    if (n) setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goPrev = () => {
    const p = prevStep(answers, step);
    if (p) setStep(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pick =
    <K extends keyof MalsoAnswers>(key: K) =>
    (value: MalsoAnswers[K]) =>
      onAnswersChange(setAnswer(answers, key, value));

  const nextLabel = isLastQuestion(answers, step) ? '결과 보기 ✓' : '다음 →';
  const hasPrev = prevStep(answers, step) !== null;
  const common = {
    number: questionNumber(answers, step),
    onPrev: hasPrev ? goPrev : undefined,
    onNext: goNext,
    nextLabel,
  };

  if (step === 'result') {
    return (
      <DiagnosisResult
        answers={answers}
        onRestart={() => {
          onAnswersChange({ proof: null, org: null, form: null, assoc: null, reason: null });
          setStep('proof');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onBack={goPrev}
        onGoToSend={onGoToSend}
        onGoToFaq={onGoToFaq}
      />
    );
  }

  const dots = (
    <ProgressDots total={questionSteps(answers).length + 1} current={path.indexOf(step)} />
  );

  if (step === 'proof') {
    return (
      <>
        {dots}
        <QuestionCard
          {...common}
          title="회사가 해촉증명서를 발급해 주나요?"
          hint="발급되면 증명서로 바로 말소, 안 되면 내용증명(해촉신청서)을 발송합니다."
          options={PROOF_OPTIONS}
          value={answers.proof}
          onChange={pick('proof')}
        >
          <ProofGuide />
        </QuestionCard>
      </>
    );
  }

  if (step === 'org') {
    return (
      <>
        {dots}
        <QuestionCard
          {...common}
          title="어디에, 어떤 지위로 소속되어 있나요?"
          hint="이 선택이 수신처(누구 앞으로 보내는지)를 결정합니다."
          options={ORG_OPTIONS}
          value={answers.org}
          onChange={pick('org')}
        >
          <LookupBox
            title="소속·등록형태가 헷갈리면 이력조회로 확인하세요"
            firstRow={HISTORY_LOOKUP.rows[0]}
          />
        </QuestionCard>
      </>
    );
  }

  if (step === 'form') {
    return (
      <>
        {dots}
        <QuestionCard
          {...common}
          title="등록 형태가 전속인가요, 교차인가요?"
          hint="교차 등록이면 손보·생보 협회 **양쪽에 말소 신청**이 필요하고, 내용증명 부수와 수신처도 늘어납니다."
          options={FORM_OPTIONS}
          value={answers.form}
          onChange={pick('form')}
        >
          <LookupBox title="전속인지 교차인지 모르면 이력조회로 확인" firstRow={FORM_LOOKUP_ROW} />
        </QuestionCard>
      </>
    );
  }

  if (step === 'assoc') {
    const q = assocQuestionText(answers);
    return (
      <>
        {dots}
        <QuestionCard
          {...common}
          title={q.title}
          hint={q.hint}

          options={q.allowBoth ? ASSOC_OPTIONS : ASSOC_OPTIONS.filter((o) => o.value !== 'both')}
          value={answers.assoc}
          onChange={pick('assoc')}
        />
      </>
    );
  }

  return (
    <>
      {dots}
      <QuestionCard
        {...common}
        title="해촉(신청) 사유는 무엇인가요?"
        hint="해촉신청서의 '신청 사유'란에 들어갑니다."
        options={REASON_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
        value={answers.reason}
        onChange={pick('reason')}
      />
    </>
  );
}
