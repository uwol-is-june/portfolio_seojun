'use client';

import { useState } from 'react';

import {
  CALC_RULE_NOTE,
  HOLIDAYS_UNKNOWN_NOTE,
  calcFromDigits,
  calendarMonths,
  formatDow,
  formatKoreanDate,
  formatShortDate,
  malsoCalcBanner,
  type MalsoCalcResult,
  type MalsoCalcStatus,
} from '@/demos/fa-recruit/lib/domain/malso/calc';
import { holidaysInMonth, isWeekend } from '@/demos/fa-recruit/lib/domain/rules/kr-holidays';
import { Collapse } from '@/demos/fa-recruit/components/ui/collapse';
import { DateField } from '@/demos/fa-recruit/components/ui/date-field';
import { startOfToday } from '@/demos/fa-recruit/lib/utils/date';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';

import { Alert } from './rich';

const STATUS_TONE: Record<MalsoCalcStatus, { bg: string; text: string; bar: string }> = {
  wait: { bg: 'bg-pending-light border-pending/30', text: 'text-pending', bar: 'bg-pending' },
  ready: { bg: 'bg-ok-light border-ok/30', text: 'text-ok', bar: 'bg-ok' },
  urgent: { bg: 'bg-warn-light border-warn/35', text: 'text-warn', bar: 'bg-warn' },
  expired: { bg: 'bg-danger-light border-danger/35', text: 'text-danger', bar: 'bg-danger' },
};

const DOW = ['일', '월', '화', '수', '목', '금', '토'] as const;

function CalendarMonth({ month, result }: { month: Date; result: MalsoCalcResult }) {
  const y = month.getFullYear();
  const m = month.getMonth();
  const firstDow = new Date(y, m, 1).getDay();
  const lastDate = new Date(y, m + 1, 0).getDate();
  const holidays = holidaysInMonth(y, m);

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDow }, () => null),
    ...Array.from({ length: lastDate }, (_, i) => i + 1),
  ];

  return (
    <div className="border-line min-w-0 rounded-[12px] border p-3">
      <p className="text-strong mb-2 text-center text-[12.5px] font-bold">
        {y}년 {m + 1}월
      </p>
      <div className="grid grid-cols-7 gap-0.5">
        {DOW.map((d, i) => (
          <div
            key={d}
            className={cn(
              'py-1 text-center text-[10.5px] font-bold',
              i === 0 ? 'text-danger' : i === 6 ? 'text-pending' : 'text-muted',
            )}
          >
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`e${i}`} />;
          const date = new Date(y, m, day);
          const isSend = date.getTime() === result.sendDate.getTime();
          const isApply = date.getTime() === result.applyDate.getTime();
          const inRange = date > result.sendDate && date < result.applyDate;
          const holiday = holidays[day];
          return (
            <div
              key={day}
              className={cn(
                'flex min-h-[30px] flex-col items-center justify-center rounded-[6px] py-1 text-[11.5px] leading-tight',
                isSend && 'bg-brand-700 font-extrabold text-white',
                isApply && 'bg-ok font-extrabold text-white',
                !isSend && !isApply && inRange && 'bg-warn-light text-body',
                !isSend &&
                  !isApply &&
                  !inRange &&
                  (holiday || date.getDay() === 0
                    ? 'text-danger'
                    : isWeekend(date)
                      ? 'text-pending'
                      : 'text-body'),
              )}
              title={holiday}
            >
              <span>{day}</span>
              {holiday && !isSend && !isApply && (
                <span className="text-danger mt-[1px] max-w-full truncate px-[2px] text-[8.5px] font-semibold">
                  {holiday.replace(/^대체공휴일\((.+)\)$/, '$1대체')}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StampHint() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2.5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="text-brand-700 focus-visible:outline-brand-700 cursor-pointer rounded text-[12px] font-bold focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        📌 소인 날짜 확인 방법 <span aria-hidden>{open ? '▲' : '▼'}</span>
      </button>
      <Collapse open={open}>
        <div className="bg-surface text-body mt-2 rounded-[10px] p-3.5 text-[12px] leading-[1.8]">
          <p>
            <b className="text-strong font-bold">날짜가 표시된 주황색 스티커</b>가 소인입니다.
          </p>
          <p className="mt-2">
            발송 후 우체국이 서류 <b className="text-strong font-bold">하단</b>에 붙여주는 스티커로,{' '}
            <b className="text-strong font-bold">&quot;이 우편물은 ○○○○-○○-○○&quot;</b> 형식으로
            날짜가 적혀 있습니다.
          </p>
          <p className="text-danger mt-2 font-semibold">
            ※ 등기 영수증의 접수일자도 동일한 날짜입니다.
          </p>
        </div>
      </Collapse>
    </div>
  );
}

export function CalcTab() {
  const [digits, setDigits] = useState('');
  const [result, setResult] = useState<MalsoCalcResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = () => {
    const r = calcFromDigits(digits, startOfToday());
    if (r.ok) {
      setResult(r.result);
      setError(null);
    } else {
      setResult(null);
      setError(r.message);
    }
  };

  const banner = result ? malsoCalcBanner(result) : null;
  const tone = result ? STATUS_TONE[result.status] : null;

  return (
    <div className="space-y-4">
      <section className="border-line shadow-card rounded-[16px] border bg-white p-5">
        <label className="text-strong block text-[12.5px] font-bold">
          📮 내용증명 발송일 <span className="text-muted font-semibold">(우체국 소인 날짜)</span>
        </label>
        <div className="mt-2 max-w-[280px]">
          <DateField
            value={digits}
            onChange={(next) => {
              setDigits(next);
              setError(null);
            }}
            aria-label="내용증명 발송일"
          />
        </div>
        <StampHint />

        {error && <p className="text-danger mt-3 text-[12.5px] font-semibold">{error}</p>}

        <button
          type="button"
          onClick={run}
          className="bg-brand-700 hover:bg-brand-600 active:bg-brand-800 shadow-card focus-visible:outline-brand-700 mt-4 cursor-pointer rounded-[10px] px-5 py-2.5 text-[13px] font-bold text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          계산하기
        </button>
      </section>

      {result && banner && tone && (
        <>
          <section className={cn('rounded-[16px] border px-5 py-4', tone.bg)}>
            <div className="flex items-start gap-3">
              <span className="shrink-0 text-[24px] leading-none" aria-hidden>
                {banner.icon}
              </span>
              <div className="min-w-0">
                <p className={cn('text-[14px] font-extrabold break-keep', tone.text)}>
                  {banner.title}
                </p>
                <p className="text-body mt-1 text-[12.5px] leading-relaxed break-keep">
                  {banner.subtitle}
                  {banner.emphasis && <b className="text-danger font-bold">{banner.emphasis}</b>}
                </p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="border-line rounded-[14px] border bg-white p-4">
              <p className="text-muted text-[11.5px] font-bold">📮 내용증명 발송일</p>
              <p className="text-strong mt-1 text-[16px] font-extrabold">
                {formatKoreanDate(result.sendDate)}
              </p>
              <p className="text-muted mt-0.5 text-[11.5px]">
                {formatDow(result.sendDate)} · 발송 기준일
              </p>
            </div>
            <div className="border-ok bg-ok-light rounded-[14px] border p-4">
              <p className="text-ok text-[11.5px] font-bold">✅ 말소신청 가능일</p>
              <p className="text-strong mt-1 text-[16px] font-extrabold">
                {formatKoreanDate(result.applyDate)}
              </p>
              <p className="text-muted mt-0.5 text-[11.5px]">
                {formatDow(result.applyDate)}
                {result.shifted && ` (원래 ${formatShortDate(result.rawApplyDate)} → 영업일 조정)`}
              </p>
            </div>
          </div>

          <section className="border-line rounded-[14px] border bg-white p-4">
            <div className="text-muted mb-1.5 flex justify-between text-[11px] font-semibold">
              <span>발송일 D+0</span>
              <span>만료 D+90 ({formatKoreanDate(result.expireDate)})</span>
            </div>
            <div className="bg-surface-alt h-[8px] overflow-hidden rounded-full">
              <div
                className={cn('h-full rounded-full transition-[width] duration-500', tone.bar)}
                style={{ width: `${result.progressPercent}%` }}
              />
            </div>
          </section>

          <div
            className={cn(
              'grid gap-3',
              calendarMonths(result).length > 1 ? 'sm:grid-cols-2' : 'sm:max-w-[340px]',
            )}
          >
            {calendarMonths(result).map((m) => (
              <CalendarMonth key={`${m.getFullYear()}-${m.getMonth()}`} month={m} result={result} />
            ))}
          </div>

          <div className="text-muted flex flex-wrap gap-x-4 gap-y-1.5 text-[11.5px]">
            <span className="flex items-center gap-1.5">
              <span className="bg-brand-700 inline-block size-[10px] rounded-full" />
              내용증명 발송일
            </span>
            <span className="flex items-center gap-1.5">
              <span className="bg-ok inline-block size-[10px] rounded-full" />
              말소신청 가능일
            </span>
            <span className="flex items-center gap-1.5">
              <span className="bg-warn-light border-warn/50 inline-block size-[10px] rounded-full border" />
              신청 가능일 전 대기일
            </span>
          </div>

          {!result.holidaysKnown && <Alert tone="warn">⚠ {HOLIDAYS_UNKNOWN_NOTE}</Alert>}

          <Alert>
            <b className="font-bold">계산 규칙</b> — {CALC_RULE_NOTE}
          </Alert>
        </>
      )}
    </div>
  );
}
