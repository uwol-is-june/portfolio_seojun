'use client';

import { Fragment } from 'react';

import { STEPS, type StepKey } from '@/demos/fa-recruit/lib/steps';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';

type StepFlowProps = {

  active: StepKey;

  maxReachedIndex: number;

  completed: Partial<Record<StepKey, boolean>>;
  onNavigate: (key: StepKey) => void;
};

export function StepFlow({ active, maxReachedIndex, completed, onNavigate }: StepFlowProps) {
  const activeIndex = STEPS.findIndex((s) => s.key === active);

  return (
    <nav
      aria-label="진단 진행 단계"
      className="border-line sticky top-0 z-40 border-b bg-white/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-[820px] items-center gap-0.5 px-2 py-2.5 sm:gap-1 sm:px-4">
        {STEPS.map((step, i) => {
          const isActive = i === activeIndex;

          const isDone = completed[step.key] ?? i < activeIndex;
          const isReachable = i <= maxReachedIndex;

          return (
            <Fragment key={step.key}>
              {i > 0 && (
                <span aria-hidden className="text-line shrink-0 text-[11px] sm:text-xs">
                  ›
                </span>
              )}
              <button
                type="button"
                disabled={!isReachable}
                aria-current={isActive ? 'step' : undefined}
                onClick={() => onNavigate(step.key)}
                className={cn(
                  'flex min-w-0 flex-1 items-center justify-center gap-1 rounded-lg px-1 py-1.5 text-[10.5px] font-bold break-keep transition-colors duration-200 sm:gap-1.5 sm:px-2 sm:text-[12px]',
                  'focus-visible:outline-brand-700 focus-visible:outline-2 focus-visible:outline-offset-1',
                  isActive && 'bg-brand-700 text-white',
                  !isActive && isDone && 'text-ok hover:bg-ok-light cursor-pointer',
                  !isActive &&
                    !isDone &&
                    isReachable &&
                    'text-body hover:bg-surface cursor-pointer',
                  !isReachable && 'text-muted/60 cursor-not-allowed',
                )}
              >
                <span
                  className={cn(
                    'inline-flex size-[18px] shrink-0 items-center justify-center rounded-full text-[9.5px] font-extrabold sm:size-5 sm:text-[10.5px]',
                    isActive && 'text-brand-700 bg-white',
                    !isActive && isDone && 'bg-ok text-white',
                    !isActive && !isDone && 'bg-surface-alt text-muted',
                  )}
                >
                  {isDone ? '✓' : i + 1}
                </span>
                <span className="truncate">{step.name}</span>
              </button>
            </Fragment>
          );
        })}
      </div>
    </nav>
  );
}
