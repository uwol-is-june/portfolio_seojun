import type { ComponentProps } from 'react';

import { cn } from '@/demos/fa-recruit/lib/utils/cn';

export function Select({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <select
      className={cn(
        'border-line text-strong w-full appearance-none rounded-[10px] border bg-white p-3 pr-9 text-sm outline-none',
        "bg-[url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath fill='%239aa3b2' d='M1 1.5 6 6.5l5-5'/%3E%3C/svg%3E\")] bg-[length:12px_8px] bg-[position:right_14px_center] bg-no-repeat",
        'focus:border-brand-700 focus:ring-brand-700/12 focus:ring-2',
        'disabled:bg-surface disabled:text-muted disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function TextInput({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      type="text"
      className={cn(
        'border-line text-strong w-full rounded-[10px] border bg-white p-3 text-sm outline-none',
        'placeholder:text-muted',
        'focus:border-brand-700 focus:ring-brand-700/12 focus:ring-2',
        'disabled:bg-surface disabled:text-muted disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  );
}

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-3.5 last:mb-0', className)}>
      {label != null && (
        <label className="text-strong mb-1.5 block text-[11.5px] font-extrabold">
          {label}
          {hint != null && <span className="text-muted ml-1.5 font-semibold">{hint}</span>}
        </label>
      )}
      {children}
    </div>
  );
}
