'use client';

import {
  GENERAL_ROUTE_BUTTON_LABEL,
  type CareerResult as CareerResultData,
  type CareerVerdict,
} from '@/demos/fa-recruit/lib/domain/career';
import { Button } from '@/demos/fa-recruit/components/ui/button';
import { Reveal, createRevealOrder } from '@/demos/fa-recruit/components/ui/reveal';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';

const VERDICT_TONE: Record<CareerVerdict, string> = {
  ok: 'bg-ok-light border-ok text-ok',
  warn: 'bg-warn-light border-warn text-warn',
  bad: 'bg-danger-light border-danger text-danger',
};

type CareerResultProps = {
  result: CareerResultData;

  onSwitchToGeneralRoute?: () => void;
};

export function CareerResult({ result, onSwitchToGeneralRoute }: CareerResultProps) {

  const order = createRevealOrder();

  return (
    <div className="mt-6">
      <Reveal index={order()} className="mb-3 flex items-center gap-2.5">

        <span className="text-ok text-[12px] font-extrabold">경력 요건 예상 결과</span>
        <span className="bg-line h-px flex-1" />
      </Reveal>

      {result.conversionNote && (
        <Reveal
          index={order()}
          className="border-brand-700 bg-brand-50 mb-3 rounded-r-lg border-l-[3px] px-3.5 py-2.5"
        >
          <p className="text-brand-700 text-[12px] font-extrabold">🔄 유형 전환 · 신인</p>
          <p className="text-body mt-0.5 text-[11.5px] leading-snug">{result.conversionNote}</p>
        </Reveal>
      )}

      <Reveal
        index={order()}
        className={cn(
          'flex items-start gap-3 rounded-[12px] border px-4 py-4',
          VERDICT_TONE[result.verdict],
        )}
      >
        <span aria-hidden className="text-[32px] leading-none">
          {result.icon}
        </span>
        <div className="min-w-0">
          <p className="text-[14px] font-extrabold">{result.title}</p>
          <p className="mt-1 text-[12px] leading-relaxed whitespace-pre-line">{result.desc}</p>
        </div>
      </Reveal>

      {result.basis.length > 0 && (
        <Reveal
          index={order()}
          className="border-line mt-3 overflow-hidden rounded-[12px] border bg-white"
        >
          {result.basis.map((row) => (
            <div
              key={row.label}
              className={cn(
                'border-line flex items-center justify-between gap-3 border-b px-4 py-2.5 last:border-b-0',
                row.highlight && 'bg-brand-50',
              )}
            >
              <span className="text-muted shrink-0 text-[11.5px] font-semibold">{row.label}</span>
              <span
                className={cn(
                  'text-right text-[12.5px] font-bold',
                  row.highlight ? 'text-brand-700' : 'text-strong',
                )}
              >
                {row.value}
                {row.dday && (
                  <span className="bg-brand-700 ml-1.5 rounded px-1.5 py-0.5 text-[10.5px] font-extrabold text-white">
                    {row.dday}
                  </span>
                )}
              </span>
            </div>
          ))}
          {result.note && (
            <p className="text-muted bg-surface px-4 py-2 text-[11px]">{result.note}</p>
          )}
        </Reveal>
      )}

      {result.alternatives.length > 0 && (
        <Reveal
          index={order()}
          className="border-line mt-3 rounded-[12px] border bg-white px-4 py-3"
        >
          <p className="text-strong mb-1.5 text-[12px] font-extrabold">💡 이렇게 하면 됩니다</p>
          {result.alternatives.map((a) => (
            <p key={a} className="text-body py-0.5 text-[11.5px] leading-relaxed">
              • {a}
            </p>
          ))}

          {result.needsGeneralRoute && onSwitchToGeneralRoute && (
            <div className="mt-3">
              <Button variant="outline" size="md" onClick={onSwitchToGeneralRoute}>
                {GENERAL_ROUTE_BUTTON_LABEL}
              </Button>
              <p className="text-muted mt-1.5 text-[10.5px] leading-relaxed">
                특수 조건이 &lsquo;해당 없음&rsquo;으로 바뀌고 사전 체크로 돌아갑니다. 입력한 경력은
                지워지지 않습니다.
              </p>
            </div>
          )}
        </Reveal>
      )}

      <Reveal
        index={order()}
        className="bg-warn-light border-warn mt-3 flex items-start gap-2.5 rounded-[12px] border px-4 py-3.5"
      >
        <span aria-hidden className="text-[22px] leading-none">
          ⚠️
        </span>
        <div>
          <p className="text-warn text-[13px] font-extrabold">사전 계산 결과 · 참고용</p>
          <p className="text-warn mt-1 text-[12px] leading-relaxed">
            합격증·수료증·경력 날짜 입력 기반의 사전 계산 결과입니다. 실제 서류 확인 후
            유효기간·경력일수가 다를 수 있으니 참고용으로 활용하세요.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
