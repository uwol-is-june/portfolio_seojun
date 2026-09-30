"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Fragment, useRef, useState, type KeyboardEvent } from "react";
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

      {/* 세부 내용 패널: 고른 단계로 부드럽게 바뀝니다. 본문 불릿이 없는 단계는 도식을 패널 전체 폭으로 펼칩니다. */}
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
            className={cn(
              "grid grid-cols-1 gap-8 p-6 md:p-8",
              step.points.length > 0 && "md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10",
            )}
          >
            {/* 왼쪽(또는 위): 단계 설명 */}
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
              {step.points.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {step.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-body leading-relaxed text-fg/85 break-keep">
                      <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-subtle" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 오른쪽(또는 아래): 단계 도식 */}
            <div className="flex min-w-0 flex-col gap-3">
              {step.contrast && <Contrast contrast={step.contrast} />}
              {step.sequence && <Sequence sequence={step.sequence} />}
              {step.choices && <Choices choices={step.choices} />}
              {step.layers && <Layers layers={step.layers} />}
              {step.stats && <Stats stats={step.stats} />}
              {step.snippet && (
                <>
                  <span className="text-caption font-semibold text-subtle">{step.snippet.title}</span>
                  <SnippetBlock lines={step.snippet.lines} />
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
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const caption = "text-caption font-semibold text-subtle";

/** 나쁜 방식 ✕ / 내 방식 ✓ 비교 */
function Contrast({ contrast }: { contrast: NonNullable<Step["contrast"]> }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {[
        { ...contrast.bad, mark: "✕", tone: "text-ai" },
        { ...contrast.good, mark: "✓", tone: "text-startup" },
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
  );
}

/** 순서 흐름도: 번호 칸이 ↓로 이어지고, loopBack이 있으면 마지막에 처음으로 돌아가는 칸을 둡니다. */
function Sequence({ sequence }: { sequence: NonNullable<Step["sequence"]> }) {
  return (
    <>
      <span className={caption}>{sequence.title}</span>
      <ol className="flex flex-col rounded-card border border-line bg-bg p-4 sm:p-5">
        {sequence.nodes.map((node, j) => (
          <li key={node.name} className="flex flex-col">
            <div
              className={cn(
                "grid grid-cols-[1.75rem_1fr] items-baseline gap-x-2 rounded-sm border px-3 py-2.5 sm:grid-cols-[1.75rem_auto_1fr] sm:gap-x-4",
                node.agent ? "border-ai/60 bg-ai/5" : "border-line-strong",
              )}
            >
              <span className="font-mono text-caption text-subtle">{num(j)}</span>
              <span className="text-small font-semibold text-fg break-keep">{node.name}</span>
              <span className="col-start-2 text-small text-muted break-keep sm:col-start-3">{node.desc}</span>
            </div>
            {(j < sequence.nodes.length - 1 || sequence.loopBack) && (
              <span aria-hidden className="py-0.5 pl-4 text-subtle">
                ↓
              </span>
            )}
          </li>
        ))}
        {sequence.loopBack && (
          <li className="flex items-center gap-2 rounded-sm border border-dashed border-line-strong px-3 py-2.5 text-small text-muted break-keep">
            <span aria-hidden className="text-ai">
              ↻
            </span>
            {sequence.loopBack}
          </li>
        )}
      </ol>
    </>
  );
}

/** 상황 → 선택 분기도: 영역마다 '이런 상황이면 → 이 스택'을 한 줄씩 */
function Choices({ choices }: { choices: NonNullable<Step["choices"]> }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {choices.map((g) => (
        <section key={g.group} className="flex flex-col rounded-card border border-line bg-bg p-4 sm:p-5">
          <h4 className={cn(caption, "uppercase")}>{g.group}</h4>
          <ul className="mt-2 flex flex-col">
            {g.rows.map((r) => (
              <li
                key={r.pick}
                className="grid gap-x-3 gap-y-0.5 border-t border-line py-2.5 first:border-t-0 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)] sm:items-baseline"
              >
                <span className="text-small text-muted break-keep">{r.when}</span>
                <span aria-hidden className="hidden text-subtle sm:inline">
                  →
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-small font-semibold text-fg break-keep">
                    <span aria-hidden className="text-subtle sm:hidden">
                      →{" "}
                    </span>
                    {r.pick}
                  </span>
                  <span className="text-caption text-subtle break-keep">{r.examples.join(" · ")}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

/** 에이전트 층 구조: 공통 에이전트 위에 프로젝트별 에이전트 · 스킬을 얹습니다. */
function Layers({ layers }: { layers: NonNullable<Step["layers"]> }) {
  return (
    <div className="flex flex-col">
      <section className="flex flex-col gap-3 rounded-card border border-fg/40 bg-bg p-4 sm:p-5">
        <h4 className={caption}>{layers.common.title}</h4>
        <dl className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
          {layers.common.items.map((it) => (
            <div key={it.name} className="flex flex-col">
              <dt className="font-mono text-small text-fg">{it.name}</dt>
              <dd className="text-caption text-muted break-keep">{it.desc}</dd>
            </div>
          ))}
        </dl>
      </section>
      <span aria-hidden className="py-1 pl-5 text-subtle">
        +
      </span>
      <section className="flex flex-col gap-3 rounded-card border border-dashed border-ai/60 bg-ai/5 p-4 sm:p-5">
        <h4 className={caption}>{layers.extra.title}</h4>
        <ul className="flex flex-col gap-3">
          {layers.extra.projects.map((pr) => (
            <li key={pr.project} className="flex flex-col gap-1.5">
              <span className="text-small font-semibold text-fg">{pr.project}</span>
              <span className="text-caption text-muted break-keep">{pr.why}</span>
              <span className="flex flex-wrap gap-1.5">
                {pr.items.map((it) => (
                  <span key={it} className="rounded-sm border border-line bg-bg px-2 py-0.5 font-mono text-caption text-fg">
                    {it}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/** 결론을 받치는 외부 지표 카드 */
function Stats({ stats }: { stats: NonNullable<Step["stats"]> }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-3">
      {stats.map((s) => (
        <li key={s.label} className="flex flex-col gap-1.5 rounded-sm border border-line bg-bg p-4">
          <span className="text-h3 font-semibold text-ai tabular-nums">{s.value}</span>
          <span className="text-caption text-muted break-keep">{s.label}</span>
          <a
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="mt-auto pt-1 text-caption text-subtle underline decoration-line-strong underline-offset-4 hover:text-fg"
          >
            {s.source} ↗
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * 문서 한 토막. "1. CLAUDE.md     구조 · 경계"처럼 공백 두 칸 이상으로 나뉜 줄은 2열 그리드로 맞춥니다.
 * 고정폭 폰트에서도 한글은 영문 두 칸 폭이 아니라서, 공백으로 줄을 맞추면 둘째 열이 어긋나기 때문입니다.
 */
function SnippetBlock({ lines }: { lines: string[] }) {
  const rows = lines.map((line) => line.split(/\s{2,}/));
  const columns = rows.every((r) => r.length === 2);
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-card border border-line bg-bg px-5 py-4 font-mono text-small leading-loose text-fg/85",
        columns && "grid gap-x-6 sm:grid-cols-[auto_1fr]",
      )}
    >
      {columns
        ? rows.map(([key, value]) => (
            <Fragment key={key}>
              <span className="whitespace-nowrap">{key}</span>
              <span className="min-w-0 font-sans break-keep text-muted max-sm:mb-2 max-sm:pl-[3ch] sm:text-fg/85">{value}</span>
            </Fragment>
          ))
        : lines.map((line) => (
            <span key={line} className="block whitespace-pre">
              {line}
            </span>
          ))}
    </div>
  );
}
