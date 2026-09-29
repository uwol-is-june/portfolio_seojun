'use client';

import type { ReactNode } from 'react';

import { cn } from '@/demos/fa-recruit/lib/utils/cn';

type CollapseProps = {
  open: boolean;
  children: ReactNode;
  className?: string;

  spacing?: string;
};

export function Collapse({ open, children, className, spacing }: CollapseProps) {
  return (
    <div
      inert={!open}
      aria-hidden={!open}
      className={cn(
        'grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none',
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        className,
      )}
    >

      <div className="-m-1 overflow-hidden p-1">
        <div className={cn(spacing)}>{children}</div>
      </div>
    </div>
  );
}
