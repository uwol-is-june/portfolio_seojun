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
 * AI Product Builder: 혼자 Claude Code로 만드는 흐름도
 * 데스크톱은 왼쪽 → 오른쪽 6단계, 필요할 때 붙는 도구(갈래)는 해당 단계 아래에 매답니다.
 * 모바일은 위 → 아래로 흐르고 갈래는 들여 씁니다.
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

        <ol className="grid gap-0 lg:grid-cols-6 lg:gap-4">
          {flow.map((step, i) => {
            const o = owners[step.owner];
            const last = i === flow.length - 1;
            return (
              <li key={step.label} className="relative flex flex-col">
                {/* 단계 */}
                <div className={cn("relative flex flex-col gap-2 rounded-card border bg-bg p-4 lg:min-h-62", o.border)}>
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
                  {/* 데스크톱: 다음 단계로 가는 화살표 */}
                  {!last && (
                    <span aria-hidden className="absolute top-1/2 -right-4 z-10 hidden w-4 -translate-y-1/2 text-center text-subtle lg:block">
                      →
                    </span>
                  )}
                </div>

                {/* 갈래: 필요할 때만 붙이는 도구 */}
                {step.branches && (
                  <div className="ml-5 flex flex-col border-l border-dashed border-line-strong pt-2 pl-4 lg:ml-0 lg:items-stretch lg:border-l-0 lg:pl-0">
                    <span aria-hidden className="hidden h-4 self-center border-l border-dashed border-line-strong lg:block" />
                    <ul className="flex flex-col gap-2">
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
                  </div>
                )}

                {/* 모바일: 다음 단계로 가는 화살표 */}
                {!last && (
                  <span aria-hidden className="py-2 pl-5 text-subtle lg:hidden">
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
