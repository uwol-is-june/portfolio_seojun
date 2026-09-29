'use client';

import type { ReactNode } from 'react';

import { cn } from '@/demos/fa-recruit/lib/utils/cn';

import { RichText } from './rich';

export type QuestionOption<V extends string> = {
  value: V;
  label: string;

  desc?: string;
};

type QuestionCardProps<V extends string> = {

  number: { index: number; total: number } | null;
  title: string;
  hint?: string;
  options: readonly QuestionOption<V>[];
  value: V | null;
  onChange: (next: V) => void;

  children?: ReactNode;
  onPrev?: () => void;
  onNext: () => void;
  nextLabel: string;
};

export function QuestionCard<V extends string>({
  number,
  title,
  hint,
  options,
  value,
  onChange,
  children,
  onPrev,
  onNext,
  nextLabel,
}: QuestionCardProps<V>) {
  return (
    <section className="border-line shadow-card rounded-[16px] border bg-white p-5 sm:p-7">
      {number && (
        <p className="text-brand-700 text-[11px] font-extrabold tracking-[0.12em]">
          QUESTION {number.index} / {number.total}
        </p>
      )}
      <h2 className="text-strong mt-2 text-[17px] leading-snug font-extrabold sm:text-[19px]">
        {title}
      </h2>
      {hint && (
        <p className="text-muted mt-2 text-[12.5px] leading-relaxed">
          <RichText text={hint} />
        </p>
      )}

      <div className="mt-4 space-y-2" role="radiogroup" aria-label={title}>
        {options.map((opt) => {
          const on = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(opt.value)}
              className={cn(
                'focus-visible:outline-brand-700 flex w-full cursor-pointer items-start gap-3 rounded-[12px] border p-3.5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2',
                on
                  ? 'border-brand-700 bg-brand-50'
                  : 'border-line hover:border-brand-300 hover:bg-surface bg-white',
              )}
            >
              <span
                aria-hidden
                className={cn(
                  'mt-[2px] flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-150',
                  on ? 'border-brand-700' : 'border-line',
                )}
              >
                {on && <span className="bg-brand-700 size-[9px] rounded-full" />}
              </span>
              <span className="min-w-0">
                <span
                  className={cn(
                    'block text-[13.5px] font-bold break-keep',
                    on ? 'text-brand-700' : 'text-strong',
                  )}
                >
                  {opt.label}
                </span>
                {opt.desc && (
                  <span className="text-muted mt-0.5 block text-[12px] leading-relaxed break-keep">
                    {opt.desc}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {children}

      <div className="mt-6 flex gap-2">
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="border-line text-body hover:bg-surface focus-visible:outline-brand-700 cursor-pointer rounded-[10px] border bg-white px-4 py-2.5 text-[13px] font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            ← 이전
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={value === null}
          className={cn(
            'bg-brand-700 hover:bg-brand-600 active:bg-brand-800 shadow-card focus-visible:outline-brand-700 ml-auto cursor-pointer rounded-[10px] px-5 py-2.5 text-[13px] font-bold text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2',
            'disabled:bg-line disabled:text-muted disabled:hover:bg-line disabled:cursor-not-allowed disabled:shadow-none',
          )}
        >
          {nextLabel}
        </button>
      </div>
    </section>
  );
}

export function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="mb-5 flex items-center justify-center gap-1.5" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            'h-[6px] rounded-full transition-all duration-300',
            i === current
              ? 'bg-brand-700 w-6'
              : i < current
                ? 'bg-brand-300 w-[6px]'
                : 'bg-line w-[6px]',
          )}
        />
      ))}
    </div>
  );
}
