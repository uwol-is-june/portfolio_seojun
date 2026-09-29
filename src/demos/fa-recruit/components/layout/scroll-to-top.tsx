'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/demos/fa-recruit/lib/utils/cn';

const SHOW_AFTER_PX = 400;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    update();

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <button
      type="button"

      inert={!visible}
      aria-hidden={!visible}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(

        'fixed right-4 bottom-5 z-40 sm:right-6 sm:bottom-7',
        'border-brand-700 text-brand-700 flex size-11 cursor-pointer items-center justify-center',
        'rounded-full border bg-white/95 shadow-[0_6px_20px_rgb(0_0_0_/_0.18)] backdrop-blur-sm',
        'hover:bg-brand-50 transition-[opacity,transform,background-color] duration-200',
        'focus-visible:outline-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2',
        'motion-reduce:transition-none',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <span aria-hidden className="text-[15px] leading-none font-black">
        ↑
      </span>
      <span className="sr-only">맨 위로</span>
    </button>
  );
}
