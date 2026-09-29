'use client';

import type { ComponentProps } from 'react';

import { cn } from '@/demos/fa-recruit/lib/utils/cn';

const STEP_MS = 70;

export const REVEAL_MAX_DELAY_MS = 420;

export function revealDelay(index: number): string {
  const delay = Math.min(Math.max(index, 0) * STEP_MS, REVEAL_MAX_DELAY_MS);
  return `${delay}ms`;
}

export function createRevealOrder(start = 0): () => number {
  let n = start;
  return () => n++;
}

type RevealProps = ComponentProps<'div'> & {

  index?: number;
};

export function Reveal({ index = 0, className, style, ...props }: RevealProps) {
  return (
    <div
      className={cn('animate-rise', className)}
      style={{ animationDelay: revealDelay(index), ...style }}
      {...props}
    />
  );
}
