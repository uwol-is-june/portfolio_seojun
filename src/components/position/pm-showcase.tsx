import Heading from "@/components/ui/heading";
import Link from "@/components/ui/locale-link";
import Section from "@/components/ui/section";
import { getT } from "@/i18n/server";
import { getShowcases } from "@/lib/content";
import { cn } from "@/lib/cn";
import { DataTable, ShowcaseBlock } from "./showcase-parts";

/** Product Manager: 가설 검증 루프 → 지표 정의 → OKR */
export default function PmShowcase() {
  const t = getT();
  const { loop, metricTable, okr } = getShowcases().pmShowcase;
  return (
    <Section bordered aria-labelledby="how-i-work">
      <Heading id="how-i-work" eyebrow="How I Work">
        {t.pmHeading}
      </Heading>

      <div className="mt-12 flex flex-col gap-20">
        <ShowcaseBlock title={t.pmLoop} caption={`${loop.project.title}: ${t.pmLoopCaption}`}>
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
            {t.viewDetail(loop.project.title)}
          </Link>
        </ShowcaseBlock>

        <ShowcaseBlock title={t.pmMetrics} caption={metricTable.caption}>
          <DataTable columns={metricTable.columns} rows={metricTable.rows} highlightLast />
        </ShowcaseBlock>

        <ShowcaseBlock title={t.pmOkr} caption={okr.caption}>
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
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
    </Section>
  );
}
