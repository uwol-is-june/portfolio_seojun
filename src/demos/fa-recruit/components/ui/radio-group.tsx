'use client';

import type { ReactNode } from 'react';

import { cn } from '@/demos/fa-recruit/lib/utils/cn';

export type RadioTone = 'primary' | 'ok' | 'warn' | 'danger';

const SELECTED: Record<RadioTone, string> = {
  primary: 'bg-brand-50 border-brand-700 text-brand-700',
  ok: 'bg-ok-light border-ok text-ok',
  warn: 'bg-warn-light border-warn text-warn',
  danger: 'bg-danger-light border-danger text-danger',
};

export type RadioOption<T extends string> = {
  value: T;
  label: ReactNode;

  tone?: RadioTone;
};

type RadioGroupProps<T extends string> = {
  name: string;
  options: readonly RadioOption<T>[];
  value: T | '';
  onChange: (value: T | '') => void;

  deselectable?: boolean;
  tone?: RadioTone;

  vertical?: boolean;
  className?: string;
  'aria-label'?: string;
};

export function RadioGroup<T extends string>({
  name,
  options,
  value,
  onChange,
  deselectable = false,
  tone = 'primary',
  vertical = false,
  className,
  'aria-label': ariaLabel,
}: RadioGroupProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn('flex gap-2', vertical ? 'flex-col' : 'flex-row', className)}
    >
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            name={name}
            onClick={() => onChange(deselectable && selected ? '' : opt.value)}
            className={cn(
              'flex-1 cursor-pointer rounded-lg border p-2.5 text-[12.5px] font-semibold transition-[background-color,border-color,color] duration-150',
              'focus-visible:outline-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2',
              vertical ? 'px-3.5 text-left' : 'text-center',
              selected
                ? SELECTED[opt.tone ?? tone]
                : 'border-line text-strong hover:bg-surface bg-white',
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
