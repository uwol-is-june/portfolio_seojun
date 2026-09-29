'use client';

import type { ReactNode } from 'react';

import { cn } from '@/demos/fa-recruit/lib/utils/cn';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
};

export function Checkbox({
  checked,
  onChange,
  children,
  disabled,
  className,
  'aria-label': ariaLabel,
}: CheckboxProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-2.5',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        aria-hidden
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-[5px] border-2 text-xs font-black transition-all duration-150',
          'peer-focus-visible:outline-brand-700 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
          checked
            ? 'border-brand-700 bg-brand-700 text-white'
            : 'border-line bg-white text-transparent',
        )}
      >
        ✓
      </span>
      {children != null && <span className="min-w-0 flex-1">{children}</span>}
    </label>
  );
}
