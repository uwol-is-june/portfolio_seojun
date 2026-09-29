'use client';

import { useMemo, useState } from 'react';

import {
  INSURANCE_LABEL,
  MAX_DESIGNATED_DAYS,
  PLANNER_DISCLAIMER,
  SENGBO_REG_NOTE,
  SONBO_CUTOFF_HOUR,
  SONBO_REG_NOTE,
  formatPlannerDate,
  isSonboAcceptDay,
  parseDesignatedDays,
  planRegistration,
  type InsuranceKind,
} from '@/demos/fa-recruit/lib/domain/registration-calendar';
import { loadDesignatedDays, monthKey, saveDesignatedDays } from '@/demos/fa-recruit/lib/storage/registration-days';
import { ddayLabel, startOfToday } from '@/demos/fa-recruit/lib/utils/date';
import { Button } from '@/demos/fa-recruit/components/ui/button';
import { Modal } from '@/demos/fa-recruit/components/ui/modal';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';

const DOW_LABELS = ['일', '월', '화', '수', '목', '금', '토'] as const;

const KINDS: readonly { kind: InsuranceKind; hint: string }[] = [
  { kind: 'sonbo', hint: '화·목만 접수 · 접수일 + 7일' },
  { kind: 'sengbo', hint: '접수일 이후 다음 지정일' },
];

function monthGrid(year: number, month: number): (number | null)[] {
  const firstDow = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  return [
    ...Array<null>(firstDow).fill(null),
    ...Array.from({ length: lastDate }, (_, i) => i + 1),
  ];
}

function sameDay(a: Date | null, b: Date): boolean {
  return (
    a !== null &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function RegistrationPlannerModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const today = useMemo(() => startOfToday(), []);
  const [kind, setKind] = useState<InsuranceKind>('sonbo');
  const [cursor, setCursor] = useState(() => ({
    year: today.getFullYear(),
    month: today.getMonth(),
  }));
  const [picked, setPicked] = useState<Date | null>(null);

  const [dayInputs, setDayInputs] = useState<string[]>(() => {
    const stored = loadDesignatedDays();
    const filled = (stored?.days ?? []).map(String);
    return Array.from({ length: MAX_DESIGNATED_DAYS }, (_, i) => filled[i] ?? '');
  });

  const staleMonth = useMemo(() => {
    const stored = loadDesignatedDays();
    return stored !== null && stored.days.length > 0 && stored.month !== monthKey(today);
  }, [today]);

  const designatedDays = useMemo(() => parseDesignatedDays(dayInputs), [dayInputs]);

  const setDayInput = (index: number, value: string) => {
    const next = dayInputs.map((v, i) => (i === index ? value.replace(/\D/g, '').slice(0, 2) : v));
    setDayInputs(next);
    saveDesignatedDays(parseDesignatedDays(next), monthKey(today));
  };

  const changeKind = (next: InsuranceKind) => {
    setKind(next);

    setPicked(null);
  };

  const moveMonth = (delta: number) => {
    setCursor(({ year, month }) => {
      const next = month + delta;
      if (next < 0) return { year: year - 1, month: 11 };
      if (next > 11) return { year: year + 1, month: 0 };
      return { year, month: next };
    });
  };

  const grid = useMemo(() => monthGrid(cursor.year, cursor.month), [cursor]);
  const plan = picked ? planRegistration(kind, picked, designatedDays) : null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="협회등록 예상 캘린더"
      description="서류 접수일을 고르면 협회등록일이 언제인지 알려줍니다."
      className="max-w-[460px]"
    >
      <div className="px-5 py-4">

        <div className="mb-4 grid grid-cols-2 gap-2">
          {KINDS.map((item) => (
            <button
              key={item.kind}
              type="button"
              onClick={() => changeKind(item.kind)}
              aria-pressed={kind === item.kind}
              className={cn(
                'cursor-pointer rounded-[10px] border px-3 py-2.5 text-left transition-colors',
                kind === item.kind
                  ? 'border-brand-700 bg-brand-50'
                  : 'border-line hover:bg-surface-alt bg-white',
              )}
            >
              <span
                className={cn(
                  'block text-[12.5px] font-extrabold',
                  kind === item.kind ? 'text-brand-700' : 'text-body',
                )}
              >
                {INSURANCE_LABEL[item.kind]}
              </span>
              <span className="text-muted mt-0.5 block text-[10.5px] break-keep">{item.hint}</span>
            </button>
          ))}
        </div>

        {kind === 'sengbo' && (
          <div className="border-line mb-4 rounded-[10px] border px-3.5 py-3">
            <p className="text-strong text-[12px] font-bold">협회등록 지정일 (매월 변경)</p>
            <p className="text-muted mt-0.5 text-[10.5px] break-keep">
              협회가 매월 정하는 날짜라 코드에 넣어 둘 수 없습니다. 아는 날짜만 넣으세요.
            </p>
            <div className="mt-2 flex items-center gap-2">
              {dayInputs.map((value, i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  value={value}
                  onChange={(e) => setDayInput(i, e.target.value)}
                  placeholder="일"
                  aria-label={`협회등록 지정일 ${i + 1}`}
                  className="border-line focus:border-brand-700 w-full rounded-[8px] border px-2 py-1.5 text-center text-[13px] font-bold focus:outline-none"
                />
              ))}
            </div>
            {staleMonth && (
              <p className="text-warn mt-2 text-[11px] font-semibold break-keep">
                ⚠️ 지난달에 넣은 지정일입니다. 이번 달 날짜가 맞는지 확인하세요.
              </p>
            )}
          </div>
        )}

        <div className="border-line rounded-[10px] border p-3">
          <div className="mb-2 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => moveMonth(-1)} aria-label="이전 달">
              ‹
            </Button>
            <span className="text-strong text-[13px] font-extrabold">
              {cursor.year}년 {cursor.month + 1}월
            </span>
            <Button variant="ghost" size="sm" onClick={() => moveMonth(1)} aria-label="다음 달">
              ›
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {DOW_LABELS.map((label) => (
              <span key={label} className="text-muted py-1 text-center text-[10.5px] font-bold">
                {label}
              </span>
            ))}
            {grid.map((day, i) => {
              if (day === null) return <span key={`empty-${i}`} />;
              const date = new Date(cursor.year, cursor.month, day);

              const blocked = kind === 'sonbo' && !isSonboAcceptDay(date);
              const highlighted =
                kind === 'sonbo' ? isSonboAcceptDay(date) : designatedDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  disabled={blocked}
                  onClick={() => setPicked(date)}
                  className={cn(
                    'rounded-[7px] py-1.5 text-[12px] font-bold transition-colors',
                    blocked && 'text-muted/40 cursor-not-allowed',
                    !blocked && 'hover:bg-brand-50 cursor-pointer',
                    highlighted && !sameDay(picked, date) && 'bg-brand-50 text-brand-700',
                    sameDay(picked, date) && 'bg-brand-700 text-white',
                    sameDay(today, date) && !sameDay(picked, date) && 'ring-brand-700 ring-1',
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <p className="text-muted mt-2 text-center text-[10.5px] break-keep">
            {kind === 'sonbo'
              ? '연한 칸이 접수 가능일(화·목)입니다.'
              : designatedDays.length > 0
                ? '연한 칸이 협회등록 지정일입니다.'
                : '지정일을 넣으면 달력에 표시됩니다.'}
          </p>
        </div>

        <div className="border-line bg-surface mt-3 rounded-[10px] border px-3.5 py-3">
          {!plan && (
            <p className="text-muted text-center text-[11.5px] font-semibold">
              달력에서 서류 접수일을 선택하세요.
            </p>
          )}
          {plan && !plan.ok && (
            <p className="text-warn text-center text-[11.5px] font-semibold break-keep">
              {plan.message}
            </p>
          )}
          {plan?.ok && (
            <>
              <dl className="grid gap-2">
                <div className="border-surface-alt flex items-start justify-between gap-3 border-b pb-2">
                  <dt className="text-muted shrink-0 text-[11.5px] font-bold">
                    📋 서류 접수일
                    {kind === 'sonbo' && (
                      <span className="text-muted mt-0.5 block text-[10px] font-semibold">
                        오전 {SONBO_CUTOFF_HOUR}시 마감
                      </span>
                    )}
                  </dt>
                  <dd className="text-strong text-right text-[12.5px] font-extrabold">
                    {formatPlannerDate(plan.acceptDate)}
                    <span className="text-muted ml-1.5 text-[10.5px] font-bold">
                      {ddayLabel(today, plan.acceptDate)}
                    </span>
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-brand-700 shrink-0 text-[11.5px] font-bold">
                    🏢 {INSURANCE_LABEL[kind]} 협회등록일
                    <span className="text-muted mt-0.5 block text-[10px] font-semibold">
                      {kind === 'sonbo' ? SONBO_REG_NOTE : SENGBO_REG_NOTE}
                    </span>
                  </dt>
                  <dd className="text-brand-700 text-right text-[13px] font-extrabold">
                    {formatPlannerDate(plan.registrationDate)}
                    <span className="text-muted ml-1.5 text-[10.5px] font-bold">
                      {ddayLabel(today, plan.registrationDate)}
                    </span>
                  </dd>
                </div>
              </dl>
              <p className="text-warn bg-warn-light mt-2.5 rounded-[8px] px-2.5 py-2 text-[11px] font-semibold break-keep">
                {plan.note}
              </p>
            </>
          )}
        </div>

        <p className="text-muted mt-3 text-center text-[11px] font-semibold break-keep">
          {PLANNER_DISCLAIMER} 계산된 날짜는 등록예정일 칸에 직접 입력하세요.
        </p>
      </div>
    </Modal>
  );
}
