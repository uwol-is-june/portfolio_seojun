import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/demos/fa-recruit/lib/utils/cn';

export function Card({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      className={cn(
        'border-surface-alt shadow-card mb-4 overflow-hidden rounded-[16px] border bg-white',
        className,
      )}
      {...props}
    />
  );
}

type CardHeadProps = ComponentProps<'div'> & {

  step?: ReactNode;
  title: ReactNode;

  tone?: 'default' | 'ok' | 'warn' | 'danger' | 'pending';

  action?: ReactNode;
};

const HEAD_TONE = {
  default: { head: 'bg-[#fafbfc]', badge: 'bg-brand-700', title: 'text-brand-700' },
  ok: { head: 'bg-ok-light', badge: 'bg-ok', title: 'text-ok' },
  warn: { head: 'bg-warn-light', badge: 'bg-warn', title: 'text-warn' },
  danger: { head: 'bg-danger-light', badge: 'bg-danger', title: 'text-danger' },
  pending: { head: 'bg-pending-light', badge: 'bg-pending', title: 'text-pending' },
} as const;

export function CardHead({
  step,
  title,
  tone = 'default',
  action,
  className,
  ...props
}: CardHeadProps) {
  const t = HEAD_TONE[tone];
  return (
    <div
      className={cn(
        'border-surface-alt flex items-center gap-2.5 border-b px-[18px] py-3.5',
        t.head,
        className,
      )}
      {...props}
    >
      {step != null && (
        <span
          className={cn(
            'flex size-[22px] shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white',
            t.badge,
          )}
        >
          {step}
        </span>
      )}
      <h2 className={cn('text-sm font-bold', t.title)}>{title}</h2>
      {action && <div className="ml-auto shrink-0">{action}</div>}
    </div>
  );
}

export function CardBody({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('p-[18px]', className)} {...props} />;
}
