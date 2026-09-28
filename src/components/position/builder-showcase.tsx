import Link from "next/link";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import { builderShowcase } from "@/content/showcases";
import { cn } from "@/lib/cn";
import { DataTable, ShowcaseBlock } from "./showcase-parts";

type Owner = "me" | "claude" | "both";

const owners: Record<Owner, { label: string; text: string; border: string }> = {
  me: { label: "내가 판단", text: "text-collab", border: "border-collab/60" },
  claude: { label: "Claude Code", text: "text-ai", border: "border-ai/60" },
  both: { label: "함께", text: "text-fg", border: "border-line-strong" },
};

/** AI Product Builder: 혼자 Claude Code로 프로덕트를 만드는 루프 → 3중 검증 */
export default function BuilderShowcase() {
  const { loop, checks } = builderShowcase;
  return (
    <Section bordered aria-labelledby="how-i-build">
      <Heading id="how-i-build" eyebrow="How I Build">
        혼자서 팀처럼 만듭니다
      </Heading>

      <div className="mt-12 flex flex-col gap-20">
        <ShowcaseBlock title="Claude Code 빌딩 루프" caption={loop.caption}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-caption" aria-label="범례">
            {(Object.keys(owners) as Owner[]).map((o) => (
              <li key={o} className="flex items-center gap-2 text-subtle">
                <span aria-hidden className={cn("size-2 rounded-pill bg-current", owners[o].text)} />
                {owners[o].label}
              </li>
            ))}
          </ul>

          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {loop.steps.map((s, i) => {
              const o = owners[s.owner];
              return (
                <li key={s.label} className={cn("relative flex flex-col gap-3 rounded-card border p-5", o.border)}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={cn("text-caption font-semibold uppercase", o.text)}>
                      {String(i + 1).padStart(2, "0")} · {s.label}
                    </span>
                    <span className="text-caption text-subtle">{o.label}</span>
                  </div>
                  <p className="text-small text-fg">{s.text}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
                    {s.evidence.map((e) => (
                      <li key={e} className="rounded-sm bg-surface-raised px-2 py-1 font-mono text-caption text-muted">
                        {e}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/projects/${s.example.slug}`}
                    className="text-caption text-subtle underline-offset-4 hover:text-fg hover:underline"
                  >
                    예시 · {s.example.title} →
                  </Link>
                </li>
              );
            })}
          </ol>

          <p className="flex items-center gap-3 rounded-card border border-dashed border-line-strong px-5 py-4 text-small text-muted">
            <span aria-hidden className="text-h3 leading-none text-fg">
              ↺
            </span>
            {loop.loopBack}
          </p>
        </ShowcaseBlock>

        <ShowcaseBlock title="3중 검증" caption={checks.caption}>
          <DataTable columns={checks.columns} rows={checks.rows} />
        </ShowcaseBlock>
      </div>
    </Section>
  );
}
