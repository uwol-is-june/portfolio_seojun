'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { DocChecks, DocProgress } from '@/demos/fa-recruit/lib/domain/documents';
import type { DocGroup, DocItem, DocLink } from '@/demos/fa-recruit/lib/domain/rules/documents';
import { Checkbox } from '@/demos/fa-recruit/components/ui/checkbox';
import { Collapse } from '@/demos/fa-recruit/components/ui/collapse';
import { Modal } from '@/demos/fa-recruit/components/ui/modal';
import { revealDelay } from '@/demos/fa-recruit/components/ui/reveal';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';
import { Confidential } from '@/demos/fa-recruit/components/ui/confidential';

type SectionTone = 'docs' | 'todo';

const TONE = {
  docs: {
    title: 'text-brand-700',
    line: 'bg-brand-200',
    track: 'bg-brand-100',
    bar: 'bg-brand-700',
  },
  todo: { title: 'text-ok', line: 'bg-ok/40', track: 'bg-ok-light', bar: 'bg-ok' },
} as const;

export function ProgressHeader({
  title,
  tone,
  progress,
  showPercent = false,
  action,
}: {
  title: string;
  tone: SectionTone;
  progress: DocProgress;
  showPercent?: boolean;
  action?: React.ReactNode;
}) {
  const t = TONE[tone];
  return (
    <div className="mb-3">
      <div className="mb-2.5 flex items-center gap-2.5">
        <p className={cn('text-[14px] font-extrabold', t.title)}>{title}</p>
        {action}
        <span className={cn('h-[1.5px] flex-1', t.line)} />
        <span className={cn('text-[11px] font-bold whitespace-nowrap', t.title)}>
          {progress.done} / {progress.total}
          {showPercent && ` (${progress.percent}%)`}
        </span>
      </div>
      <div className={cn('h-1 overflow-hidden rounded-sm', t.track)}>
        <div
          className={cn('h-1 rounded-sm transition-[width] duration-400', t.bar)}
          style={{ width: `${progress.percent}%` }}
        />
      </div>
    </div>
  );
}

type DocChecklistProps = {
  groups: readonly DocGroup[];
  checks: DocChecks;
  onToggle: (name: string, checked: boolean) => void;

  keyOf: (name: string) => string;

  startIndex?: number;
};

export function DocChecklist({
  groups,
  checks,
  onToggle,
  keyOf,
  startIndex = 0,
}: DocChecklistProps) {
  return (
    <div>
      {groups.map((group, i) => (

        <section
          key={group.t}
          className="animate-rise mb-4 last:mb-0"
          style={{ animationDelay: revealDelay(startIndex + i) }}
        >
          <h3
            className={cn(
              'text-strong border-surface-alt border-b pb-1.5 text-[12.5px] font-extrabold break-keep',
              group.note ? 'mb-1.5' : 'mb-2',
            )}
          >
            {group.t}
          </h3>

          {group.note && (
            <p className="text-muted mb-2 text-[10.5px] leading-snug break-keep"><Confidential text={group.note} /></p>
          )}
          {group.i.map((item) => (
            <DocRow
              key={item.n}
              item={item}
              checked={Boolean(checks[keyOf(item.n)])}
              onToggle={(checked) => onToggle(item.n, checked)}
            />
          ))}
        </section>
      ))}
    </div>
  );
}

const FOOTER_BTN =
  'border-line text-brand-700 hover:bg-brand-50 focus-visible:outline-brand-700 rounded-md border bg-white px-2 py-1 text-[10.5px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2';

function DocRow({
  item,
  checked,
  onToggle,
}: {
  item: DocItem;
  checked: boolean;
  onToggle: (checked: boolean) => void;
}) {
  const [guideOpen, setGuideOpen] = useState(false);

  const [sample, setSample] = useState<NonNullable<DocLink['sample']> | null>(null);
  const links = item.links ?? (item.link ? [{ label: '바로가기', url: item.link }] : []);

  return (
    <div
      className={cn(
        'mb-1.5 overflow-hidden rounded-[10px] border transition-colors duration-150',
        checked ? 'border-ok bg-ok-light' : 'border-line bg-white',
      )}
    >
      <div className="flex items-start gap-2.5 px-3 py-2.5">
        <Checkbox
          checked={checked}
          onChange={onToggle}
          className="min-w-0 flex-1 items-start"
          aria-label={item.n}
        >
          <span className="block">
            <span className="text-strong block text-[12.5px] font-bold break-keep">{item.n}</span>
            {item.s && (
              <span className="text-muted mt-0.5 block text-[10.5px] leading-snug break-keep">
                {item.s}
              </span>
            )}
          </span>
        </Checkbox>

        <span
          className={cn(
            'mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-extrabold',
            item.org ? 'bg-danger-light text-danger' : 'bg-surface-alt text-body',
          )}
        >
          {item.org ? '원본' : '사본'}
        </span>
      </div>

      <Collapse open={guideOpen}>
        <div className="border-line bg-surface text-body mx-3 mb-2.5 rounded-[10px] border border-dashed p-2.5 text-[10.5px] leading-relaxed break-keep whitespace-pre-line">
          <Confidential text={item.guide} />
        </div>
      </Collapse>

      {(links.length > 0 || item.guide) && (
        <div className="border-surface-alt flex flex-wrap gap-1.5 border-t px-3 py-2">
          {links.map((link) => {
            if (link.url) {
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={FOOTER_BTN}
                >
                  ↗ {link.label}
                </a>
              );
            }
            if (link.file) {
              return (
                <a
                  key={link.label}
                  href={link.file.path}
                  download={link.file.downloadAs}
                  className={FOOTER_BTN}
                >
                  ⤓ {link.label}
                </a>
              );
            }
            if (link.sample) {
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => setSample(link.sample ?? null)}
                  className={cn(FOOTER_BTN, 'cursor-pointer')}
                >
                  🔍 {link.label}
                </button>
              );
            }
            return null;
          })}
          {item.guide && (
            <button
              type="button"
              onClick={() => setGuideOpen((v) => !v)}
              aria-expanded={guideOpen}
              className="border-line text-body hover:bg-surface focus-visible:outline-brand-700 ml-auto cursor-pointer rounded-md border bg-white px-2 py-1 text-[10.5px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {guideOpen ? '▴ 가이드' : '▾ 가이드'}
            </button>
          )}
        </div>
      )}

      <Modal
        open={sample !== null}
        onClose={() => setSample(null)}
        title={sample?.title ?? ''}
        description="작성 예시입니다. 실제 제출 시에는 본인 정보로 작성하세요."
        className="max-w-[520px]"
      >
        {sample && (
          <div className="p-4">
            <Image
              src={sample.path}
              alt={sample.title}
              width={sample.width}
              height={sample.height}
              className="border-line h-auto w-full rounded-[10px] border"
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
