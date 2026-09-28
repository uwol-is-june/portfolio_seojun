import Image from "next/image";
import Link from "next/link";
import FlowCompare from "@/components/project/flow-compare";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import { plannerShowcase } from "@/content/showcases";
import { getProject } from "@/lib/content";
import { DataTable, ShowcaseBlock } from "./showcase-parts";

/** Service Planner: 유저 플로우 → 결제 · 정책 → 화면 설계 → 문서 */
export default function PlannerShowcase() {
  const { flowProject, payment, screens, documents, other } = plannerShowcase;
  const flow = getProject(flowProject.slug)?.iterations?.[0]?.flow;

  return (
    <Section bordered aria-labelledby="how-i-plan">
      <Heading id="how-i-plan" eyebrow="How I Plan">
        사용자가 판단하지 않아도 되게
      </Heading>

      <div className="mt-12 flex flex-col gap-20">
        {flow && (
          <ShowcaseBlock title="유저 플로우 개선" caption={`${flowProject.title}: 현장 혼선 VOC 80% 감소, 현장 예매 발권 22.6% 추가 단축`}>
            <FlowCompare flow={flow} />
            <Link
              href={`/projects/${flowProject.slug}`}
              className="text-small text-muted underline-offset-4 hover:text-fg hover:underline"
            >
              {flowProject.title} 케이스 스터디 보기 →
            </Link>
          </ShowcaseBlock>
        )}

        <ShowcaseBlock title="화면 설계" caption="직접 기획하고 출시한 서비스 화면">
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {screens.map((s) => (
              <li key={s.src} className="flex flex-col gap-2">
                <div className="relative aspect-[9/19] overflow-hidden rounded-card bg-surface">
                  <Image src={s.src} alt={s.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
                </div>
                <p className="text-caption text-subtle">{s.caption}</p>
              </li>
            ))}
          </ul>
        </ShowcaseBlock>

        <div className="grid gap-20 lg:grid-cols-2 lg:gap-12">
          <ShowcaseBlock title="결제 · 정책 설계" caption={payment.caption}>
            <ol className="flex flex-col gap-2">
              {payment.steps.map((s, i) => (
                <li key={s} className="flex items-start gap-3 rounded-sm bg-surface px-4 py-3">
                  <span className="font-mono text-caption text-subtle">{i + 1}</span>
                  <span className="text-small text-fg">{s}</span>
                </li>
              ))}
            </ol>
          </ShowcaseBlock>

          <ShowcaseBlock title="그 밖의 기획 경험">
            <ul className="flex flex-col gap-3">
              {other.map((o) => (
                <li key={o.title} className="flex flex-col gap-1 rounded-card border border-line p-5">
                  <span className="text-body font-semibold text-fg">{o.title}</span>
                  <span className="text-small text-muted">{o.description}</span>
                  <span className="text-caption text-subtle">{o.context}</span>
                </li>
              ))}
            </ul>
          </ShowcaseBlock>
        </div>

        <ShowcaseBlock title="문서와 산출물">
          <DataTable columns={documents.columns} rows={documents.rows} />
        </ShowcaseBlock>
      </div>
    </Section>
  );
}
