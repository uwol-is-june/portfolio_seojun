'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/demos/fa-recruit/lib/utils/cn';

const CONFIRM_TIMEOUT_MS = 3000;

type ConfirmLinkProps = {
  label: string;

  confirmLabel: string;
  onConfirm: () => void;
  className?: string;
};

export function ConfirmLink({ label, confirmLabel, onConfirm, className }: ConfirmLinkProps) {
  const [confirming, setConfirming] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      timer.current = setTimeout(() => setConfirming(false), CONFIRM_TIMEOUT_MS);
      return;
    }
    if (timer.current) clearTimeout(timer.current);
    setConfirming(false);
    onConfirm();
  };

  return (
    <div className="mt-4 text-center">
      <button
        type="button"
        onClick={handleClick}

        aria-live="polite"
        className={cn(
          'focus-visible:outline-brand-700 cursor-pointer rounded px-2 py-1 text-[11.5px] font-bold underline underline-offset-4 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2',
          confirming ? 'text-danger' : 'text-muted hover:text-brand-700',
          className,
        )}
      >
        {confirming ? confirmLabel : label}
      </button>
    </div>
  );
}
