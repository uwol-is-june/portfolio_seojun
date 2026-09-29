'use client';

import { useState } from 'react';

import type { MethodBlock, MethodSection } from '@/demos/fa-recruit/lib/domain/rules/malso-procedure';
import { Collapse } from '@/demos/fa-recruit/components/ui/collapse';

import { HotNote, LinkRow, RichText, StepList, SupplyList } from './rich';

function MethodBlockCard({ block, defaultOpen }: { block: MethodBlock; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-line overflow-hidden rounded-[12px] border bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="hover:bg-surface focus-visible:outline-brand-700 flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-3 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2"
      >
        <span className="text-strong text-[13.5px] font-bold break-keep">
          <span aria-hidden>{block.icon}</span> {block.title}
        </span>
        <span
          aria-hidden
          className={`text-muted shrink-0 text-[10px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>
      <Collapse open={open}>
        <div className="border-line space-y-3.5 border-t px-4 py-4">
          <StepList steps={block.steps} />

          <div>
            <p className="text-brand-700 mb-2 text-[12px] font-bold">📋 준비물</p>
            <SupplyList items={block.supplies} />
          </div>

          {block.hot && <HotNote text={block.hot} />}
          {block.links && <LinkRow links={block.links} />}
          {block.note && (
            <p className="text-muted text-[12px] leading-[1.7]">
              <RichText text={block.note} />
            </p>
          )}
        </div>
      </Collapse>
    </div>
  );
}

export function MethodSections({ sections }: { sections: readonly MethodSection[] }) {
  const showTitles = sections.length > 1;
  return (
    <div className="space-y-5">
      {sections.map((section) => (
        <div key={section.assoc}>
          {showTitles && (
            <p className="text-brand-700 border-brand-200 mb-2.5 border-b pb-1.5 text-[13px] font-extrabold">
              {section.title}
            </p>
          )}
          <div className="space-y-2.5">
            {section.blocks.map((b, i) => (
              <MethodBlockCard key={b.id} block={b} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ResultSection({
  no,
  title,
  suffix,
  defaultOpen = true,
  children,
}: {
  no: string;
  title: string;
  suffix?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="border-line shadow-card overflow-hidden rounded-[16px] border bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="hover:bg-surface focus-visible:outline-brand-700 flex w-full cursor-pointer items-center justify-between gap-2 px-5 py-4 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2"
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="bg-brand-700 flex size-[22px] shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white">
            {no}
          </span>
          <span className="text-strong text-[14px] font-bold break-keep">
            {title}
            {suffix && (
              <span className="text-muted ml-1.5 text-[11.5px] font-normal">{suffix}</span>
            )}
          </span>
        </span>
        <span
          aria-hidden
          className={`text-muted shrink-0 text-[10px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>
      <Collapse open={open}>
        <div className="border-line border-t px-5 py-4">{children}</div>
      </Collapse>
    </section>
  );
}
