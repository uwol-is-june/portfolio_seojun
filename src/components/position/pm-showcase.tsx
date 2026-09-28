import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import { pmShowcase } from "@/content/showcases";
import { DataTable, ShowcaseBlock } from "./showcase-parts";

/** Product Manager: 문제 정의 → 지표 → 우선순위 → 로드맵 (TASK-15) */
export default function PmShowcase() {
  const { process, metricTree, prioritization, roadmap } = pmShowcase;
  return (
    <Section bordered aria-labelledby="how-i-work">
      <Heading id="how-i-work" eyebrow="How I Work">
        문제에서 로드맵까지
      </Heading>

      <div className="mt-12 flex flex-col gap-20">
        <ShowcaseBlock title="의사결정 과정">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s) => (
              <li key={s.step} className="flex flex-col gap-3 rounded-card border border-line p-6">
                <span className="font-mono text-caption text-subtle">{s.step}</span>
                <span className="text-body font-semibold text-fg">{s.title}</span>
                <span className="text-small text-muted">{s.description}</span>
              </li>
            ))}
          </ol>
        </ShowcaseBlock>

        <ShowcaseBlock title="지표 설계" caption="North Star와 입력 지표, 가드레일을 나눠서 봅니다.">
          <div className="flex flex-col items-stretch gap-4">
            <div className="rounded-card bg-fg p-6 text-bg">
              <p className="text-caption uppercase opacity-60">{metricTree.northStar.label}</p>
              <p className="mt-2 text-h3 font-semibold">{metricTree.northStar.value}</p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {metricTree.inputs.map((m) => (
                <li key={m.label} className="rounded-card border border-line-strong p-5">
                  <p className="text-caption uppercase text-subtle">{m.label}</p>
                  <p className="mt-2 text-body text-fg">{m.value}</p>
                </li>
              ))}
            </ul>
            <p className="text-small text-subtle">
              가드레일: <span className="text-muted">{metricTree.guardrails.join(" · ")}</span>
            </p>
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="우선순위 결정" caption={prioritization.caption}>
          <DataTable columns={prioritization.columns} rows={prioritization.rows} highlightLast />
        </ShowcaseBlock>

        <ShowcaseBlock title="로드맵">
          <ul className="grid gap-4 md:grid-cols-3">
            {roadmap.map((col) => (
              <li key={col.horizon} className="flex flex-col gap-4 rounded-card bg-surface p-6">
                <p className="text-caption font-medium uppercase text-fg">{col.horizon}</p>
                <ul className="flex flex-col gap-2">
                  {col.items.map((item) => (
                    <li key={item} className="rounded-sm bg-surface-raised px-3 py-2 text-small text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </ShowcaseBlock>
      </div>
    </Section>
  );
}
