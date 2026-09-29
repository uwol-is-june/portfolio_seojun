'use client';

import { useState } from 'react';

import { createEmptyFormValues, type MalsoFormValues } from '@/demos/fa-recruit/lib/domain/malso/document';
import { DEFAULT_CASE_ID, type MalsoCaseId } from '@/demos/fa-recruit/lib/domain/malso/case';
import { createEmptyAnswers, type MalsoAnswers } from '@/demos/fa-recruit/lib/domain/malso/wizard';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';

import { CalcTab } from './calc-tab';
import { CaseDiagnosisTab } from './case-diagnosis-tab';
import { FaqTab } from './faq-tab';
import { ManualModal } from './manual-modal';
import { SendTab } from './send-tab';

type TabKey = 'diag' | 'send' | 'calc' | 'faq';

const TABS: readonly { key: TabKey; icon: string; label: string; hint: string }[] = [
  {
    key: 'diag',
    icon: '🔍',
    label: '케이스 진단',
    hint: '내 상황에 맞는 말소 경로와 절차를 한 번에 진단합니다.',
  },
  {
    key: 'send',
    icon: '✉️',
    label: '내용증명 보내기',
    hint: '해촉신청서 작성·부수·수신처·협회 신청방법을 케이스별로 바로 확인하세요.',
  },
  {
    key: 'calc',
    icon: '📅',
    label: '날짜 계산기',
    hint: '이미 발송했다면 협회 말소 신청 가능일(발송일 포함 11일째, 주말·공휴일 보정)을 확인하세요.',
  },
  { key: 'faq', icon: '❓', label: 'FAQ', hint: '공통·경로별 자주 묻는 질문을 모았습니다.' },
];

export const MALSO_DISCLAIMER =
  '본 가이드는 협회 양식·공식 안내 기준의 참고 도구입니다. 협회별 발송 주소는 협회 홈페이지에서 직접 확인하세요. 최종 코드 현황은 협회 이력조회로 확인하시기 바랍니다.';

export function MalsoGuide({ onExit }: { onExit: () => void }) {
  const [tab, setTab] = useState<TabKey>('diag');
  const [manualOpen, setManualOpen] = useState(false);

  const [answers, setAnswers] = useState<MalsoAnswers>(createEmptyAnswers);

  const [sendCase, setSendCase] = useState<MalsoCaseId>(DEFAULT_CASE_ID);

  const [form, setForm] = useState<MalsoFormValues>(createEmptyFormValues);

  const active = TABS.find((t) => t.key === tab)!;

  const goToSend = (caseId: MalsoCaseId, reason: string | null) => {
    setSendCase(caseId);
    if (reason) setForm((prev) => (prev.reason ? prev : { ...prev, reason }));
    setTab('send');
  };

  return (
    <div className="bg-surface flex min-h-dvh flex-col">

      <div className="border-line border-b bg-white print:hidden">
        <div className="mx-auto flex max-w-[900px] items-center justify-between px-3 py-2 sm:px-4">
          <button
            type="button"
            onClick={onExit}
            className="text-muted hover:text-brand-700 focus-visible:outline-brand-700 cursor-pointer rounded px-1 py-0.5 text-[12px] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            ↺ 처음으로
          </button>
          <span className="text-muted text-[11.5px] font-semibold break-keep">
            말소 셀프 가이드
          </span>
        </div>
      </div>

      <main className="flex-1">
        <div className="mx-auto w-full max-w-[900px] px-4 py-7 sm:py-9">
          <header className="mb-6 print:hidden">
            <p className="text-brand-700 text-[12px] font-bold tracking-[0.08em]">
              말소 셀프 가이드
            </p>
            <h1 className="text-strong mt-1.5 text-[22px] leading-tight font-extrabold sm:text-[26px]">
              내 케이스 진단부터 <span className="text-brand-700">서류 작성</span>까지 한 번에
            </h1>
            <p className="text-muted mt-2 text-[12.5px] leading-relaxed">
              협회(손보·생보)에 등록된 본인 코드를 직접 말소하는 절차를 안내합니다. 위촉 진단과는
              별개 화면이며, 여기서 계산한 날짜는 진단에 자동으로 반영되지 않습니다.
            </p>
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setManualOpen(true)}
                className="border-line text-body hover:border-brand-700 hover:text-brand-700 focus-visible:outline-brand-700 cursor-pointer rounded-[8px] border bg-white px-3 py-1.5 text-[12px] font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                📖 사용 설명서
              </button>
            </div>
          </header>

          <div
            role="tablist"
            aria-label="말소 셀프 가이드"
            className="border-line grid grid-cols-2 gap-1.5 rounded-[12px] border bg-white p-1.5 sm:grid-cols-4 print:hidden"
          >
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  'focus-visible:outline-brand-700 cursor-pointer rounded-[9px] px-2 py-2.5 text-[12px] font-bold break-keep transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-[12.5px]',
                  tab === t.key
                    ? 'bg-brand-700 text-white'
                    : 'text-body hover:bg-surface-alt bg-white',
                )}
              >
                <span aria-hidden>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>

          <p className="text-muted mt-2.5 mb-5 text-[12px] leading-relaxed print:hidden">
            <span className="text-strong font-bold">
              {active.icon} {active.label}
            </span>{' '}
            — {active.hint}
          </p>

          {tab === 'diag' && (
            <CaseDiagnosisTab
              answers={answers}
              onAnswersChange={setAnswers}
              onGoToSend={goToSend}
              onGoToFaq={() => setTab('faq')}
            />
          )}
          {tab === 'send' && (
            <SendTab
              caseId={sendCase}
              onCaseChange={setSendCase}
              form={form}
              onFormChange={setForm}
              onGoToDiagnosis={() => setTab('diag')}
              onGoToCalc={() => setTab('calc')}
            />
          )}
          {tab === 'calc' && <CalcTab />}
          {tab === 'faq' && <FaqTab />}

          <p className="text-muted mt-8 text-[11.5px] leading-relaxed print:hidden">
            {MALSO_DISCLAIMER}
          </p>
        </div>
      </main>

      <ManualModal open={manualOpen} onClose={() => setManualOpen(false)} />
    </div>
  );
}
