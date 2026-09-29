'use client';

import { useMemo, useState } from 'react';

import { blocksPlainText } from '@/demos/fa-recruit/lib/domain/malso/rich-text';
import {
  FAQ_FOOTNOTE,
  FAQ_GROUPS,
  FAQ_NO_RESULT_PREFIX,
  FAQ_SEARCH_PLACEHOLDER,
  type FaqItem,
} from '@/demos/fa-recruit/lib/domain/rules/malso-faq';
import { Collapse } from '@/demos/fa-recruit/components/ui/collapse';

import { RichBlocks } from './rich';
import { Confidential } from '@/demos/fa-recruit/components/ui/confidential';

function FaqRow({ item, defaultOpen = false }: { item: FaqItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-line border-b last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="hover:bg-surface focus-visible:outline-brand-700 flex w-full cursor-pointer items-start justify-between gap-3 px-4 py-3.5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2"
      >
        <span className="text-strong text-[13px] font-bold break-keep"><Confidential text={item.q} /></span>
        <span
          aria-hidden
          className={`text-muted mt-1 shrink-0 text-[10px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>
      <Collapse open={open}>
        <div className="bg-surface px-4 py-3.5">
          <RichBlocks blocks={item.a} />
        </div>
      </Collapse>
    </div>
  );
}

function FaqSection({ title, items }: { title: string; items: readonly FaqItem[] }) {
  const [open, setOpen] = useState(title === '공통');
  return (
    <section className="border-line shadow-card overflow-hidden rounded-[16px] border bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="hover:bg-surface focus-visible:outline-brand-700 flex w-full cursor-pointer items-center justify-between gap-2 px-5 py-4 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2"
      >
        <span className="text-strong text-[14px] font-extrabold">
          {title}
          <span className="text-muted ml-2 text-[11.5px] font-semibold">{items.length}문항</span>
        </span>
        <span
          aria-hidden
          className={`text-muted shrink-0 text-[10px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>
      <Collapse open={open}>
        <div className="border-line border-t">
          {items.map((item) => (
            <FaqRow key={item.id} item={item} />
          ))}
        </div>
      </Collapse>
    </section>
  );
}

export function FaqTab() {
  const [query, setQuery] = useState('');
  const q = query.trim();

  const haystack = useMemo(
    () =>
      FAQ_GROUPS.flatMap((g) =>
        g.items.map((item) => ({
          item,
          group: g.title,
          text: `$<Confidential text={item.q} /> ${blocksPlainText(item.a)}`,
        })),
      ),
    [],
  );

  const matched = q ? haystack.filter((h) => h.text.includes(q)) : [];

  return (
    <div className="space-y-4">
      <div className="relative">
        <span
          aria-hidden
          className="text-muted absolute top-1/2 left-3.5 -translate-y-1/2 text-[13px]"
        >
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={FAQ_SEARCH_PLACEHOLDER}
          aria-label="FAQ 검색"
          className="border-line text-strong placeholder:text-muted focus:border-brand-700 w-full rounded-[12px] border bg-white py-3 pr-10 pl-10 text-[13px] transition-colors duration-150 focus:outline-none"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="검색어 지우기"
            className="text-muted hover:text-strong focus-visible:outline-brand-700 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded text-[13px] focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            ✕
          </button>
        )}
      </div>

      {q ? (
        matched.length === 0 ? (
          <div className="border-line text-muted rounded-[16px] border bg-white px-5 py-10 text-center text-[13px]">
            🔍 &quot;<b className="text-strong font-bold">{q}</b>&quot;{FAQ_NO_RESULT_PREFIX}
          </div>
        ) : (
          <section className="border-line shadow-card overflow-hidden rounded-[16px] border bg-white">
            <p className="border-line bg-surface text-muted border-b px-5 py-2.5 text-[11.5px] font-bold">
              검색 결과 {matched.length}건
            </p>
            {matched.map(({ item, group }) => (
              <div key={item.id}>
                <p className="text-brand-700 px-4 pt-3 text-[11px] font-bold">{group}</p>

                <FaqRow item={item} defaultOpen />
              </div>
            ))}
          </section>
        )
      ) : (
        FAQ_GROUPS.map((g) => <FaqSection key={g.id} title={g.title} items={g.items} />)
      )}

      <p className="text-muted text-[11.5px] leading-relaxed">📌 {FAQ_FOOTNOTE}</p>
    </div>
  );
}
