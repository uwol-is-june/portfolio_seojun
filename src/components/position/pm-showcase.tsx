import Link from "next/link";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import { pmShowcase } from "@/content/showcases";
import { cn } from "@/lib/cn";
import { DataTable, ShowcaseBlock } from "./showcase-parts";

/** Product Manager: 가설 검증 루프 → 지표 정의 → 우선순위 → OKR */
export default function PmShowcase() {
  const { loop, metricTable, prioritization, okr } = pmShowcase;
  return (
    <Section bordered aria-labelledby="how-i-work">
      <Heading id="how-i-work" eyebrow="How I Work">
        실패에서 다시 설계합니다
      </Heading>

      <div className="mt-12 flex flex-col gap-20">
        <ShowcaseBlock title="가설 검증 루프" caption={`${loop.project.title}: 거래 0건에서 13건까지`}>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {loop.steps.map((s, i) => (
              <li
                key={s.label}
                className={cn(
                  "flex flex-col gap-2 rounded-card border p-5",
                  s.tone === "fail" && "border-ai/60",
                  s.tone === "success" && "border-collab/60",
                  !s.tone && "border-line",
                )}
              >
                <span
                  className={cn(
                    "text-caption font-semibold uppercase",
                    s.tone === "fail" ? "text-ai" : s.tone === "success" ? "text-collab" : "text-subtle",
                  )}
                >
                  {String(i + 1).padStart(2, "0")} · {s.label}
                </span>
                <span className="text-small text-fg">{s.text}</span>
              </li>
            ))}
          </ol>
          <Link href={`/projects/${loop.project.slug}`} className="text-small text-muted underline-offset-4 hover:text-fg hover:underline">
            {loop.project.title} 케이스 스터디 보기 →
          </Link>
        </ShowcaseBlock>

        <ShowcaseBlock title="지표 정의" caption={metricTable.caption}>
          <DataTable columns={metricTable.columns} rows={metricTable.rows} highlightLast />
        </ShowcaseBlock>

        <div className="grid gap-20 lg:grid-cols-2 lg:gap-12">
          <ShowcaseBlock title="우선순위" caption={prioritization.caption}>
            <div className="flex flex-col gap-3">
              <div className="rounded-card bg-fg p-5 text-bg">
                <p className="text-caption uppercase opacity-60">Input</p>
                <p className="mt-1 text-body font-semibold">{prioritization.input}</p>
              </div>
              <ul className="grid grid-cols-3 gap-3">
                {prioritization.buckets.map((b) => (
                  <li key={b.label} className="flex flex-col gap-1 rounded-card border border-line-strong p-4">
                    <span className="text-body font-semibold text-fg">{b.label}</span>
                    <span className="text-caption text-muted">{b.description}</span>
                  </li>
                ))}
              </ul>
              <p className="text-small text-subtle">
                → <span className="text-fg">{prioritization.rule}</span>
              </p>
            </div>
          </ShowcaseBlock>

          <ShowcaseBlock title="OKR 스프린트" caption={okr.caption}>
            <ol className="flex flex-col gap-2">
              {okr.steps.map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-pill border border-line-strong font-mono text-caption text-subtle">
                    {i + 1}
                  </span>
                  <span className="flex-1 rounded-sm bg-surface px-4 py-3 text-small font-medium text-fg">{s}</span>
                </li>
              ))}
            </ol>
          </ShowcaseBlock>
        </div>
      </div>
    </Section>
  );
}
