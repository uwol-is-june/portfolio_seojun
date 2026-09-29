"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import Link from "@/components/ui/locale-link";
import type { builderShowcase } from "@/content/showcases";
import { useT } from "@/i18n/locale-provider";
import { cn } from "@/lib/cn";
import { easeOutExpo } from "@/lib/motion";

type Step = (typeof builderShowcase.flow)[number];

const num = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Building Loop: 큰 흐름 6단계를 가로 한 줄로 보여주고, 고른 단계의 세부 내용을 흐름도 아래 패널에 펼칩니다.
 * 단계는 마우스를 올리거나(데스크톱) 탭하거나(모바일) 포커스를 옮기면(키보드 ← →) 바뀝니다.
 * 처음엔 1단계를 펼쳐 두고 패널 최소 높이를 잡아 둬서, 단계를 옮길 때 아래 내용이 들썩이지 않습니다.
 * 탭(tablist) 구조라 스크린리더에서도 단계와 패널이 이어져 읽힙니다. 동작 줄이기 설정은 MotionProvider가 처리합니다.
 */
/** 데이터는 서버(builder-showcase)가 현재 언어로 골라 넘깁니다. */
export default function BuilderFlow({ flow }: { flow: Step[] }) {
  const t = useT();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? flow.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const target = (next + flow.length) % flow.length;
    setActive(target);
    tabs.current[target]?.focus();
  };

  const step = flow[active];

  return (
    <div className="flex flex-col gap-6">
      <div
        role="tablist"
        aria-label={t.loopSteps}
        className="-mx-gutter flex snap-x scroll-px-gutter gap-2 overflow-x-auto px-gutter pt-1 pb-2 md:mx-0 md:overflow-visible md:px-0 md:pb-0"
      >
        {flow.map((s, i) => {
          const selected = i === active;
          return (
            <div key={s.label} className="flex shrink-0 snap-start items-center gap-2 md:flex-1 md:shrink">
              <button
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`loop-tab-${i}`}
                aria-selected={selected}
                aria-controls="loop-panel"
                tabIndex={selected ? 0 : -1}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "flex h-full w-36 flex-col items-start gap-2 rounded-card border p-4 text-left transition-[background-color,border-color,transform] duration-300 ease-out-expo md:w-full",
                  selected ? "-translate-y-1 border-fg bg-surface-raised" : "border-line-strong bg-bg hover:bg-surface",
                )}
              >
                <Image
                  src={s.icon}
                  alt=""
                  width={44}
                  height={44}
                  className={cn("size-11 transition-transform duration-300 ease-out-expo", selected && "scale-110")}
                />
                <span className="flex items-center gap-1.5">
                  <span className={cn("text-caption font-semibold", selected ? "text-fg" : "text-subtle")}>{num(i)}</span>
                  {s.key && <span className="rounded-pill bg-ai/15 px-1.5 text-caption font-semibold text-ai">{t.loopKey}</span>}
                </span>
                <span className="text-small font-semibold text-fg text-balance break-keep">{s.label}</span>
              </button>
              {i < flow.length - 1 && (
                <span aria-hidden className="text-subtle">
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* 세부 내용 패널: 고른 단계로 부드럽게 바뀝니다 */}
      <div
        id="loop-panel"
        role="tabpanel"
        aria-labelledby={`loop-tab-${active}`}
        className="relative overflow-hidden rounded-card border border-line bg-surface md:min-h-[22rem]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: easeOutExpo }}
            className="grid grid-cols-1 gap-8 p-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10 md:p-8"
          >
            {/* 왼쪽: 단계 설명 */}
            <div className="flex min-w-0 flex-col gap-4">
              <div className="flex items-center gap-4">
                <Image src={step.icon} alt="" width={64} height={64} className="size-16" />
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-2 text-caption font-semibold text-subtle">
                    STEP {num(active)}
                    {step.key && <span className="rounded-pill bg-ai/15 px-2 text-ai">{t.loopKey}</span>}
                  </span>
                  <h3 className="text-h3 font-semibold text-fg break-keep">{step.label}</h3>
                </div>
              </div>
              <p className="text-body leading-relaxed text-fg/85 break-keep">{step.text}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5" aria-label={t.loopTools}>
                {step.tags.map((t) => (
                  <li key={t} className="rounded-sm border border-line bg-bg px-2 py-1 font-mono text-caption text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* 오른쪽: 예시 (TASK.md 한 줄 · 세션 레인 · 붙이는 도구) */}
            <div className="flex min-w-0 flex-col gap-3">
              {step.contrast && (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {[
                    { ...step.contrast.bad, mark: "✕", tone: "text-ai" },
                    { ...step.contrast.good, mark: "✓", tone: "text-startup" },
                  ].map((c) => (
                    <li key={c.title} className="flex flex-col gap-2 rounded-sm border border-line bg-bg p-4">
                      <span className={cn("text-small font-semibold break-keep", c.tone)}>
                        {c.mark} {c.title}
                      </span>
                      <ul className="flex flex-col gap-1">
                        {c.points.map((p) => (
                          <li key={p} className="text-small text-muted break-keep">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
              {step.agents && (
                <ul className="flex flex-col gap-2">
                  {step.agents.map((a) => (
                    <li key={a.project.title} className="flex flex-col gap-2 rounded-sm border border-line bg-bg p-4">
                      {a.project.slug ? (
                        <Link href={`/projects/${a.project.slug}`} className="text-caption font-semibold text-subtle underline decoration-line-strong underline-offset-4 hover:text-fg">
                          {a.project.title}
                        </Link>
                      ) : (
                        <span className="text-caption font-semibold text-subtle">{a.project.title}</span>
                      )}
                      <dl className="flex flex-col gap-1.5">
                        {a.items.map((it) => (
                          <div key={it.name} className="grid gap-0.5 sm:grid-cols-[9.5rem_1fr] sm:gap-3">
                            <dt className="font-mono text-small text-fg">{it.name}</dt>
                            <dd className="text-small text-muted break-keep">{it.desc}</dd>
                          </div>
                        ))}
                      </dl>
                    </li>
                  ))}
                </ul>
              )}
              {step.pipeline && (
                <ol className="flex flex-col gap-2 rounded-card border border-line bg-bg p-5" aria-label={step.label}>
                  {step.pipeline.map((node, j) => {
                    const [head, ...rest] = node.split(/\s·\s/);
                    const agent = j > 0 && j < step.pipeline!.length - 1;
                    return (
                      <li key={node} className="flex flex-col items-start gap-2">
                        <span
                          className={cn(
                            "flex flex-col rounded-sm border px-3 py-2",
                            agent ? "border-ai/60 bg-ai/5" : "border-line-strong",
                          )}
                        >
                          <span className="text-small font-semibold text-fg break-keep">{head}</span>
                          {rest.length > 0 && <span className="text-caption text-muted break-keep">{rest.join(" · ")}</span>}
                        </span>
                        {j < step.pipeline!.length - 1 && (
                          <span aria-hidden className="pl-4 text-subtle">
                            ↓
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              )}
              {step.evidence && (
                <p className="text-small text-muted break-keep">
                  {step.evidence.text}{" "}
                  <a href={step.evidence.href} target="_blank" rel="noreferrer" className="text-subtle underline decoration-line-strong underline-offset-4 hover:text-fg">
                    {step.evidence.source} ↗
                  </a>
                </p>
              )}
              {step.snippet && (
                <>
                  <span className="font-mono text-caption font-semibold text-subtle">{step.snippet.title}</span>
                  <pre className="overflow-x-auto rounded-card border border-line bg-bg px-5 py-4 font-mono text-small leading-loose text-fg/85">
                    {step.snippet.lines.join("\n")}
                  </pre>
                </>
              )}
              {step.lanes && (
                <>
                  <span className="text-caption font-semibold text-subtle uppercase">{t.loopLanes}</span>
                  <ul className="flex flex-col gap-3 rounded-card border border-line bg-bg p-5">
                    {step.lanes.map((lane, j) => (
                      <li key={lane} className="grid grid-cols-[9.5rem_1fr] items-center gap-4">
                        <span className="font-mono text-small text-fg/85">{lane}</span>
                        <span aria-hidden className="h-2 overflow-hidden rounded-pill bg-surface-raised">
                          <span
                            className="block h-full rounded-pill bg-ai/80 motion-safe:animate-pulse"
                            style={{ width: `${[82, 64, 91][j % 3]}%`, animationDelay: `${j * 200}ms` }}
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {step.branches && (
                <>
                  <span className="text-caption font-semibold text-subtle uppercase">{step.branchesTitle ?? t.loopBranches}</span>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {step.branches.map((b) => (
                      <li key={b.tool} className="flex flex-col gap-1.5 rounded-sm border border-line bg-bg p-4">
                        <span className="text-caption text-subtle">{b.need}</span>
                        <span className="text-body font-semibold text-fg break-keep">{b.tool}</span>
                        <span className="flex flex-wrap gap-x-3 gap-y-1 text-small">
                          {b.examples.map((e) => (
                            <Link key={e.slug} href={`/projects/${e.slug}`} className="text-muted underline decoration-line-strong underline-offset-4 hover:text-fg">
                              {e.title}
                            </Link>
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {!step.snippet && !step.lanes && !step.branches && !step.agents && !step.pipeline && (
                <p className="text-small text-subtle">{t.loopHint}</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
