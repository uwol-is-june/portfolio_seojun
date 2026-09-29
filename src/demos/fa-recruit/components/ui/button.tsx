import type { ComponentProps } from 'react';

import { cn } from '@/demos/fa-recruit/lib/utils/cn';

type Variant = 'primary' | 'ok' | 'outline' | 'subtle' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const VARIANT: Record<Variant, string> = {

  primary: 'bg-brand-700 text-white shadow-card hover:bg-brand-600 active:bg-brand-800',

  ok: 'bg-ok text-white shadow-card hover:brightness-110',
  outline: 'border border-brand-700 bg-white text-brand-700 hover:bg-brand-50',
  subtle: 'border border-brand-700 bg-brand-50 text-brand-700 hover:bg-brand-100',
  ghost: 'text-body hover:bg-surface-alt',
};

const SIZE: Record<Size, string> = {
  sm: 'px-2.5 py-1 text-[11px] rounded-[7px] font-bold',
  md: 'px-4 py-2.5 text-[13px] rounded-[10px] font-bold',
  lg: 'w-full p-4 text-[15px] rounded-[12px] font-extrabold',
};

type ButtonProps = ComponentProps<'button'> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'cursor-pointer font-sans transition-[background-color,filter,border-color] duration-150',
        'focus-visible:outline-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2',

        'disabled:border-line disabled:bg-line disabled:text-muted disabled:hover:border-line disabled:hover:bg-line disabled:cursor-not-allowed disabled:shadow-none',
        VARIANT[variant],
        SIZE[size],
        className,
      )}
      {...props}
    />
  );
}
