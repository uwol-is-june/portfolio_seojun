import Link from "next/link";
import Reveal from "@/components/motion/reveal";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import { builderShowcase } from "@/content/showcases";
import { cn } from "@/lib/cn";

type Owner = (typeof builderShowcase.flow)[number]["owner"];

const owners: Record<Owner, { label: string; text: string; border: string }> = {
  me: { label: "내가 판단", text: "text-collab", border: "border-collab/60" },
  claude: { label: "Claude Code", text: "text-ai", border: "border-ai/60" },
  both: { label: "함께", text: "text-fg", border: "border-line-strong" },
};

/**
 * AI Product Builder: 혼자 Claude Code로 만드는 7단계 흐름도
 * 단계는 위 → 아래로 흐르고, 넓은 화면에서는 단계 카드 오른쪽에 그 단계의 예시를 펼칩니다:
 * TASK.md 한 줄 예시(코드 블록), 동시에 도는 세션 레인, 필요할 때만 붙이는 도구(갈래).
 * 좁은 화면에서는 예시가 카드 아래로 들여 쓰입니다.
 */
export default function BuilderShowcase() {
  const { flow } = builderShowcase;
  return (
    <Section bordered aria-labelledby="how-i-build">
      <Heading id="how-i-build" eyebrow="How I Build">
        Claude Code Building Loop
      </Heading>

      <Reveal className="mt-10 flex flex-col gap-6">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-caption" aria-label="범례">
          {(Object.keys(owners) as Owner[]).map((o) => (
            <li key={o} className="flex items-center gap-2 text-subtle">
              <span aria-hidden className={cn("size-2 rounded-pill bg-current", owners[o].text)} />
              {owners[o].label}
            </li>
          ))}
          <li className="flex items-center gap-2 text-subtle">
            <span aria-hidden className="h-3 w-4 rounded-[3px] border border-dashed border-line-strong" />
            필요할 때만 붙이는 도구
          </li>
        </ul>

        <ol className="flex flex-col">
          {flow.map((step, i) => {
            const o = owners[step.owner];
            const last = i === flow.length - 1;
            const hasExtra = Boolean(step.snippet || step.lanes || step.branches);
            return (
              <li key={step.label} className="flex flex-col">
                <div className="grid gap-3 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:items-start md:gap-6">
                  {/* 단계 */}
                  <div className={cn("flex flex-col gap-2 rounded-card border bg-bg p-4", o.border)}>
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn("text-caption font-semibold", o.text)}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-caption text-subtle">{o.label}</span>
                    </div>
                    <h3 className="text-body font-semibold text-fg">{step.label}</h3>
                    <p className="text-small text-muted">{step.text}</p>
                    <ul className="mt-auto flex flex-wrap gap-1 pt-1">
                      {step.tags.map((t) => (
                        <li key={t} className="rounded-sm bg-surface-raised px-1.5 py-0.5 font-mono text-caption text-muted">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 예시: 코드 블록 · 세션 레인 · 갈래 */}
                  {hasExtra && (
                    <div className="ml-5 flex flex-col justify-center gap-3 border-l border-dashed border-line-strong pl-4 md:ml-0 md:border-l-0 md:pl-0">
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
                        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                          {step.branches.map((b) => (
                            <li key={b.tool} className="flex flex-col gap-1 rounded-sm border border-dashed border-line-strong p-3">
                              <span className="text-caption text-subtle">{b.need}</span>
                              <span className="text-small font-medium text-fg">{b.tool}</span>
                              <span className="flex flex-wrap gap-x-2 gap-y-0.5 text-caption">
                                {b.examples.map((e) => (
                                  <Link
                                    key={e.slug}
                                    href={`/projects/${e.slug}`}
                                    className="text-muted underline-offset-4 hover:text-fg hover:underline"
                                  >
                                    {e.title}
                                  </Link>
                                ))}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                {/* 다음 단계로 가는 화살표 */}
                {!last && (
                  <span aria-hidden className="py-2 pl-5 text-subtle md:w-80 md:pl-0 md:text-center">
                    ↓
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </Reveal>
    </Section>
  );
}
