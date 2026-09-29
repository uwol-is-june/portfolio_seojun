import type { ReactNode } from 'react';

import { parseRich, type RichBlock } from '@/demos/fa-recruit/lib/domain/malso/rich-text';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';
import { Confidential, isConfidential } from '@/demos/fa-recruit/components/ui/confidential';

export function RichText({ text, className }: { text: string; className?: string }) {
  if (isConfidential(text)) return <span className={className}><Confidential text={text} /></span>;
  return (
    <span className={className}>
      {parseRich(text).map((seg, i) => {
        if (seg.kind === 'bold') {
          return (
            <strong key={i} className="text-strong font-bold">
              {seg.text}
            </strong>
          );
        }
        if (seg.kind === 'link') {
          return (
            <a
              key={i}
              href={seg.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-700 focus-visible:outline-brand-700 font-semibold underline underline-offset-2 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {seg.text}
            </a>
          );
        }
        return <span key={i}>{seg.text}</span>;
      })}
    </span>
  );
}

export function RichBlocks({
  blocks,
  className,
}: {
  blocks: readonly RichBlock[];
  className?: string;
}) {
  return (
    <div className={cn('text-body space-y-2.5 text-[13px] leading-[1.75]', className)}>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'text':
            return (
              <p key={i}>
                <RichText text={b.text} />
              </p>
            );
          case 'lead':
            return (
              <p key={i}>
                <strong className="text-brand-700 font-bold">{b.label}</strong> —{' '}
                <RichText text={b.text} />
              </p>
            );
          case 'list':
            return (
              <ul key={i} className="space-y-1.5">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-muted shrink-0 select-none" aria-hidden>
                      ·
                    </span>
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case 'note':
            return (
              <p key={i} className="bg-surface text-body rounded-[8px] px-3 py-2 text-[12.5px]">
                <RichText text={b.text} />
              </p>
            );
          case 'table':
            return (
              <div key={i} className="border-line overflow-x-auto rounded-[8px] border">
                <table className="w-full min-w-[380px] border-collapse text-[12.5px]">
                  <thead>
                    <tr className="bg-surface-alt">
                      {b.head.map((h, j) => (
                        <th
                          key={j}
                          scope="col"
                          className="border-line text-strong border-b px-3 py-2 text-left font-bold"
                        >
                          <RichText text={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, j) => (
                      <tr key={j} className="border-line border-b last:border-b-0">
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={cn(
                              'px-3 py-2 align-top',
                              k === 0 && 'text-muted font-semibold whitespace-nowrap',
                            )}
                          >
                            <RichText text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}

export function StepList({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="space-y-2">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-2.5">
          <span className="bg-brand-50 text-brand-700 mt-[1px] flex size-[18px] shrink-0 items-center justify-center rounded-full text-[10.5px] font-extrabold">
            {i + 1}
          </span>
          <span className="text-body text-[12.5px] leading-[1.7]">
            <RichText text={s} />
          </span>
        </li>
      ))}
    </ol>
  );
}

export function SupplyList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((s, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-ok mt-[1px] shrink-0 text-[11px]" aria-hidden>
            ☑
          </span>
          <span className="text-body text-[12.5px] leading-[1.7]">
            <RichText text={s} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function HotNote({ text, tone = 'warn' }: { text: string; tone?: 'warn' | 'ok' }) {
  return (
    <p
      className={cn(
        'rounded-[8px] border-l-[3px] px-3 py-2 text-[12px] leading-[1.65]',
        tone === 'warn' ? 'bg-warn-light border-warn text-body' : 'bg-ok-light border-ok text-body',
      )}
    >
      <RichText text={text} />
    </p>
  );
}

export function Alert({
  tone = 'info',
  children,
  className,
}: {
  tone?: 'info' | 'warn' | 'danger';
  children: ReactNode;
  className?: string;
}) {
  const TONE = {
    info: 'bg-brand-50 border-brand-200 text-body',
    warn: 'bg-warn-light border-warn/35 text-body',
    danger: 'bg-danger-light border-danger/35 text-body',
  } as const;
  return (
    <div
      className={cn(
        'rounded-[10px] border px-3.5 py-2.5 text-[12.5px] leading-[1.7]',
        TONE[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}

export function LinkRow({ links }: { links: readonly { label: string; url: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.url + l.label}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className="border-brand-700 text-brand-700 hover:bg-brand-50 focus-visible:outline-brand-700 rounded-[7px] border px-2.5 py-1 text-[11.5px] font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
