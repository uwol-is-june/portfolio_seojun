import type { ComponentProps } from 'react';

import { cn } from '@/demos/fa-recruit/lib/utils/cn';

type Tone = 'org' | 'copy' | 'req' | 'ok' | 'warn' | 'danger' | 'pending' | 'neutral';

const TONE: Record<Tone, string> = {
  org: 'bg-[#fee2e2] text-[#991b1b]',
  copy: 'bg-[#e0f2fe] text-[#0369a1]',
  req: 'bg-[#e0f2fe] text-[#0369a1]',
  ok: 'bg-ok-light text-ok',
  warn: 'bg-warn-light text-warn',
  danger: 'bg-danger-light text-danger',
  pending: 'bg-pending-light text-pending',
  neutral: 'bg-surface-alt text-body border border-line',
};

type BadgeProps = ComponentProps<'span'> & { tone?: Tone };

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block shrink-0 rounded-[5px] px-[7px] py-0.5 text-[10px] font-extrabold whitespace-nowrap',
        TONE[tone],
        className,
      )}
      {...props}
    />
  );
}
