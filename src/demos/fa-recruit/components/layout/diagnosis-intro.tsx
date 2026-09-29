'use client';

import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';

import { STEPS } from '@/demos/fa-recruit/lib/steps';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';

import type { DiagnosisScope } from './mode-landing';

const GREETING_DELAY = 0;
const FLOW_LINE_DELAY = 700;
const STEPS_START_DELAY = 1400;
const STEP_INTERVAL = 350;

const BUTTON_DELAY = 750;

type DiagnosisIntroProps = {
  scope: DiagnosisScope;
  onDone: () => void;
};

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function DiagnosisIntro({ scope, onDone }: DiagnosisIntroProps) {
  const label = scope === 'single' ? '개인' : '단체';
  const [reduceMotion] = useState(prefersReducedMotion);

  const [phase, setPhase] = useState(reduceMotion ? 2 + STEPS.length : 0);

  const [showButton, setShowButton] = useState(reduceMotion);

  useEffect(() => {

    if (reduceMotion) return;

    const lastStepAt = STEPS_START_DELAY + (STEPS.length - 1) * STEP_INTERVAL;
    const timers: ReturnType<typeof setTimeout>[] = [
      setTimeout(() => setPhase(1), GREETING_DELAY),
      setTimeout(() => setPhase(2), FLOW_LINE_DELAY),
      ...STEPS.map((_, i) =>
        setTimeout(() => setPhase(3 + i), STEPS_START_DELAY + i * STEP_INTERVAL),
      ),
      setTimeout(() => setShowButton(true), lastStepAt + BUTTON_DELAY),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduceMotion]);

  const shown = (at: number) => phase >= at;

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-16">
      <Image src="/demos/fa-recruit/brand/intro.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="bg-brand-950/80 absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />

      <div className="relative z-10 flex w-full max-w-[860px] flex-col items-center text-center">
        <p
          className={cn(
            'text-[19px] leading-snug font-extrabold text-white transition-all duration-500 sm:text-[28px]',
            shown(1) ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
          )}
        >
          안녕하세요, 지금부터 {label} 진단을 시작합니다.
        </p>

        <p
          className={cn(
            'mt-4 text-[13px] leading-relaxed text-white/70 transition-all duration-500 sm:mt-5 sm:text-[15px]',
            shown(2) ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
          )}
        >
          {label} 진단은 다음과 같은 순서로 진행됩니다.
        </p>

        <div className="mt-9 flex w-full flex-wrap items-stretch justify-center gap-2 sm:mt-12 sm:gap-3">
          {STEPS.map((step, i) => (
            <Fragment key={step.key}>
              {i > 0 && (
                <span
                  className={cn(
                    'self-center text-base text-white/40 transition-opacity duration-300 sm:text-lg',
                    shown(3 + i) ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  →
                </span>
              )}
              <div
                className={cn(
                  'flex min-w-[74px] flex-1 flex-col items-center gap-1.5 rounded-2xl border border-white/20 bg-white/10 px-3 py-4 backdrop-blur-md transition-all duration-500 sm:min-w-[128px] sm:px-5 sm:py-5',
                  shown(3 + i)
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'translate-y-4 scale-95 opacity-0',
                )}
              >
                <span className="text-[20px] sm:text-[24px]">{step.icon}</span>
                <span className="text-[12.5px] font-extrabold break-keep text-white sm:text-[14px]">
                  {step.name}
                </span>
                <span className="hidden text-[11px] leading-relaxed break-keep text-white/55 sm:block">
                  {step.desc}
                </span>
              </div>
            </Fragment>
          ))}
        </div>

        <button
          type="button"
          onClick={onDone}
          className={cn(
            'text-brand-700 mt-12 cursor-pointer rounded-full bg-white px-8 py-3 text-[13px] font-bold shadow-[0_10px_30px_rgb(0_0_0_/_0.35)] sm:mt-14 sm:text-[14px]',
            'transition-[opacity,transform] duration-500 hover:bg-white/90',
            'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white',
            showButton ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0',
          )}
        >
          다음으로 →
        </button>
      </div>
    </div>
  );
}
