"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { builderShowcase } from "@/content/showcases";
import { cn } from "@/lib/cn";

type Step = (typeof builderShowcase.flow)[number];
type Owner = Step["owner"];

const owners: Record<Owner, { label: string; text: string; border: string }> = {
  me: { label: "내가 판단", text: "text-collab", border: "border-collab/60" },
  claude: { label: "Claude Code", text: "text-ai", border: "border-ai/60" },
  both: { label: "함께", text: "text-fg", border: "border-line-strong" },
};

const num = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Building Loop: 큰 흐름 7단계를 가로 한 줄로 보여주고, 단계를 누르면 세부 내용을 모달로 엽니다.
 * 모달은 브라우저 기본 <dialog>(showModal)라 Esc로 닫히고, 열린 동안 뒤 화면은 조작되지 않으며,
 * 닫으면 포커스가 누른 단계로 돌아갑니다. 좁은 화면에서는 흐름이 가로로 스크롤됩니다.
 */
export default function BuilderFlow() {
  const { flow } = builderShowcase;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);

  const open = (i: number) => {
    setActive(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = flow[active];
  const o = owners[step.owner];

  return (
    <>
      <ol className="-mx-gutter flex snap-x scroll-px-gutter gap-2 overflow-x-auto px-gutter pb-2 md:mx-0 md:px-0 md:pb-0" aria-label="Claude Code Building Loop 단계">
        {flow.map((s, i) => (
          <li key={s.label} className="flex shrink-0 snap-start items-center gap-2 md:flex-1 md:shrink">
            <button
              type="button"
              onClick={() => open(i)}
              aria-haspopup="dialog"
              className={cn(
                "group flex h-full w-36 flex-col items-start gap-2 rounded-card border bg-bg p-4 text-left transition-colors hover:bg-surface md:w-full",
                owners[s.owner].border,
              )}
            >
              <span className={cn("text-caption font-semibold", owners[s.owner].text)}>{num(i)}</span>
              <span className="text-small font-semibold text-fg text-balance break-keep">{s.label}</span>
              <span className="mt-auto text-caption text-subtle group-hover:text-muted">자세히 +</span>
            </button>
            {i < flow.length - 1 && (
              <span aria-hidden className="text-subtle">
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <dialog
        ref={dialogRef}
        aria-labelledby="loop-step-title"
        onClick={(e) => {
          // 바깥(백드롭)을 누르면 닫힘: 클릭 대상이 dialog 자신일 때만
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto w-[min(40rem,calc(100vw-2rem))] rounded-card border border-line bg-bg p-0 text-fg backdrop:bg-black/70"
      >
        <div className="flex max-h-[85dvh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-line p-5">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2 text-caption">
                <span className={cn("font-semibold", o.text)}>{num(active)}</span>
                <span className="text-subtle">{o.label}</span>
              </span>
              <h3 id="loop-step-title" className="text-h3 font-semibold text-fg">
                {step.label}
              </h3>
            </div>
            <button type="button" onClick={close} className="rounded-pill px-2 py-1 text-small text-muted hover:text-fg" aria-label="닫기">
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-5 overflow-y-auto p-5">
            <p className="text-body text-muted">{step.text}</p>

            {step.snippet && (
              <pre className="overflow-x-auto rounded-card border border-line bg-surface-raised px-4 py-3 font-mono text-small leading-relaxed text-muted">
                {step.snippet.join("\n")}
              </pre>
            )}

            {step.lanes && (
              <ul className="flex flex-col gap-2 rounded-card border border-line p-4" aria-label="동시에 도는 세션">
                {step.lanes.map((lane, j) => (
                  <li key={lane} className="grid grid-cols-[9rem_1fr] items-center gap-3">
                    <span className="font-mono text-caption text-subtle">{lane}</span>
                    <span aria-hidden className="h-1.5 overflow-hidden rounded-pill bg-surface-raised">
                      <span
                        className="block h-full rounded-pill bg-ai/70 motion-safe:animate-pulse"
                        style={{ width: `${[82, 64, 91][j % 3]}%`, animationDelay: `${j * 200}ms` }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {step.branches && (
              <div className="flex flex-col gap-2">
                <span className="text-caption text-subtle">필요할 때만 붙이는 도구</span>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {step.branches.map((b) => (
                    <li key={b.tool} className="flex flex-col gap-1 rounded-sm border border-dashed border-line-strong p-3">
                      <span className="text-caption text-subtle">{b.need}</span>
                      <span className="text-small font-medium text-fg">{b.tool}</span>
                      <span className="flex flex-wrap gap-x-2 gap-y-0.5 text-caption">
                        {b.examples.map((e) => (
                          <Link key={e.slug} href={`/projects/${e.slug}`} className="text-muted underline-offset-4 hover:text-fg hover:underline">
                            {e.title}
                          </Link>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ul className="flex flex-wrap gap-1" aria-label="쓰는 도구 · 문서">
              {step.tags.map((t) => (
                <li key={t} className="rounded-sm bg-surface-raised px-1.5 py-0.5 font-mono text-caption text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-line p-4 text-small">
            <button
              type="button"
              onClick={() => setActive((i) => i - 1)}
              disabled={active === 0}
              className="rounded-pill px-3 py-1.5 text-muted hover:text-fg disabled:opacity-30"
            >
              ← {active > 0 ? flow[active - 1].label : "이전"}
            </button>
            <button
              type="button"
              onClick={() => setActive((i) => i + 1)}
              disabled={active === flow.length - 1}
              className="rounded-pill px-3 py-1.5 text-muted hover:text-fg disabled:opacity-30"
            >
              {active < flow.length - 1 ? flow[active + 1].label : "다음"} →
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
