'use client';

import {
  KEEP_TARGETS,
  RECIPIENT_ADDRESS_WARNING,
  recipientList,
  type MalsoCase,
} from '@/demos/fa-recruit/lib/domain/malso/case';
import {
  APPLY_SUPPLY_NOTE,
  BOTH_ASSOC_ALERT,
  DOC_FLOW_STEPS,
  applySummary,
  docSections,
  postOfficeSteps,
  WAIT_PERIOD_NOTE,
} from '@/demos/fa-recruit/lib/domain/rules/malso-procedure';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';

import { assocFullName } from './diagnosis-result';
import { MethodSections, ResultSection } from './method-block';
import { Alert, RichText, StepList } from './rich';

function FlowSummary() {
  return (
    <section className="border-line shadow-card rounded-[16px] border bg-white px-5 py-4">
      <p className="text-brand-700 mb-3 text-[12.5px] font-bold">📋 전체 진행 순서</p>
      <ol className="flex flex-wrap items-stretch gap-2">
        {DOC_FLOW_STEPS.map((s, i) => (
          <li key={s.num} className="flex min-w-0 flex-1 items-center gap-2">
            <div className="bg-surface min-w-0 flex-1 rounded-[10px] px-3 py-2.5">
              <span
                className={cn(
                  'inline-flex items-center justify-center rounded-full px-2 py-[2px] text-[10.5px] font-extrabold text-white',
                  s.wait ? 'bg-warn' : 'bg-brand-700',
                )}
              >
                {s.num}
              </span>
              <span className="text-strong mt-1.5 block text-[12px] font-bold break-keep">
                {s.title}
              </span>
              <span className="text-muted block text-[11px] break-keep">{s.sub}</span>
            </div>
            {i < DOC_FLOW_STEPS.length - 1 && (
              <span aria-hidden className="text-muted hidden shrink-0 text-[12px] sm:block">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function DocPath({
  malsoCase,
  onGoToSend,
}: {
  malsoCase: MalsoCase;
  onGoToSend: () => void;
}) {
  const recipients = recipientList(malsoCase);

  return (
    <div className="space-y-4">
      <FlowSummary />

      <ResultSection no="①" title="내용증명 부수 & 수신처">
        <div className="bg-brand-50 mb-4 flex items-center gap-4 rounded-[12px] px-4 py-3.5">
          <p className="text-brand-700 shrink-0 text-[32px] leading-none font-extrabold">
            {malsoCase.copies}
            <span className="ml-0.5 text-[14px] font-bold">부</span>
          </p>
          <div className="min-w-0">
            <p className="text-strong text-[12.5px] font-bold break-keep">
              {malsoCase.typeLabel} → 총 {malsoCase.copies}부 (모두 원본)
            </p>
            <p className="text-body mt-1 text-[12px] leading-relaxed break-keep">
              모두 <b className="font-bold">원본</b>이어야 합니다. 우체국에서 동일 문서를 부수만큼
              발송하세요.
            </p>
          </div>
        </div>

        <ul className="space-y-1.5">
          {recipients.map((r, i) => {

            const keep = i >= recipients.length - KEEP_TARGETS.length;
            return (
              <li
                key={r}
                className={cn(
                  'flex items-center gap-2.5 rounded-[10px] px-3.5 py-2.5 text-[12.5px]',
                  keep ? 'bg-surface text-muted' : 'bg-surface-alt text-strong font-semibold',
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'flex size-[20px] shrink-0 items-center justify-center rounded-full text-[10.5px] font-extrabold',
                    keep ? 'bg-line text-body' : 'bg-brand-700 text-white',
                  )}
                >
                  {keep ? '·' : i + 1}
                </span>
                <span className="break-keep">{r}</span>
              </li>
            );
          })}
        </ul>

        <Alert tone="warn" className="mt-3.5">
          <b className="font-bold">⚠ 수신처 주소 주의</b> — {RECIPIENT_ADDRESS_WARNING} 아래 작성
          화면의 주소 입력란 옆 링크에서 확인하세요.
        </Alert>
      </ResultSection>

      <ResultSection no="②" title="우체국 내용증명 발송">
        <StepList steps={postOfficeSteps(malsoCase.copies)} />
        <Alert tone="warn" className="mt-3.5">
          <RichText text={WAIT_PERIOD_NOTE} />
        </Alert>
      </ResultSection>

      <ResultSection no="③" title="협회 말소 신청" suffix="발송일 포함 11일째부터">
        <p className="text-body mb-3.5 text-[13px] leading-[1.8]">
          <RichText text={applySummary(assocFullName(malsoCase.assoc))} />
        </p>
        <Alert className="mb-4">
          <RichText text={APPLY_SUPPLY_NOTE} />
        </Alert>

        {malsoCase.both && (
          <Alert tone="warn" className="mb-4">
            <RichText text={BOTH_ASSOC_ALERT} />
          </Alert>
        )}

        <MethodSections sections={docSections(malsoCase.assoc)} />
      </ResultSection>

      <section className="border-brand-700 bg-brand-50 rounded-[16px] border px-5 py-5 text-center">
        <p className="text-body text-[13px] leading-[1.75]">
          위 절차대로 진행하려면 먼저 <b className="text-strong font-bold">해촉신청서를 작성</b>해야
          합니다.
          <br />
          아래 버튼을 누르면 이 케이스에 맞는 서류 작성·발송 화면으로 이동합니다.
        </p>
        <button
          type="button"
          onClick={onGoToSend}
          className="bg-brand-700 hover:bg-brand-600 active:bg-brand-800 shadow-card focus-visible:outline-brand-700 mt-3.5 cursor-pointer rounded-[10px] px-5 py-3 text-[13.5px] font-extrabold text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          ✉️ 이 케이스로 해촉신청서 작성·발송하기 →
        </button>
      </section>
    </div>
  );
}
