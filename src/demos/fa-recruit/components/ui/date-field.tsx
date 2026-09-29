'use client';

import { useState } from 'react';

import { formatDateInput, isValidDate, toDigits, toDisplay } from '@/demos/fa-recruit/lib/utils/date';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';

import { useToast } from './toast';

type DateFieldProps = {

  value: string;

  onChange: (digits: string) => void;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
};

export function DateField({
  value,
  onChange,
  id,
  placeholder = 'YYYY-MM-DD',
  disabled,
  className,
  'aria-label': ariaLabel,
}: DateFieldProps) {
  const { showToast } = useToast();
  const [text, setText] = useState(() => toDisplay(value));
  const [syncedValue, setSyncedValue] = useState(value);

  if (value !== syncedValue) {
    setSyncedValue(value);
    setText(toDisplay(value));
  }

  const commit = (raw: string) => {
    const digits = toDigits(raw);
    if (digits.length === 0) {
      onChange('');
      return;
    }
    if (digits.length !== 8) return;
    if (!isValidDate(digits)) {

      showToast('유효하지 않은 날짜입니다.');
      return;
    }
    onChange(digits);
  };

  return (
    <div className={cn('relative flex w-full items-center', className)}>
      <input
        type="text"
        id={id}
        inputMode="numeric"
        autoComplete="off"
        aria-label={ariaLabel}
        placeholder={placeholder}
        disabled={disabled}
        value={text}
        onChange={(e) => setText(formatDateInput(e.target.value))}
        onBlur={(e) => commit(e.target.value)}
        className={cn(
          'border-line text-strong w-full rounded-[10px] border bg-white p-3 pr-12 text-sm outline-none',
          'placeholder:text-muted',
          'focus:border-brand-700 focus:ring-brand-700/12 focus:ring-2',
          'disabled:bg-surface disabled:text-muted disabled:cursor-not-allowed',
        )}
      />

      <span className="absolute right-0 flex h-full w-11 items-center justify-center text-base select-none">
        📅
        <input
          type="date"
          tabIndex={-1}
          aria-hidden
          disabled={disabled}
          value={toDisplay(value)}
          onChange={(e) => {
            if (!e.target.value) return;
            commit(e.target.value);
          }}
          className="absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />
      </span>
    </div>
  );
}
