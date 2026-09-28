import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import Tag from "@/components/ui/tag";
import { aiShowcase } from "@/content/showcases";
import { getProjectsByPosition } from "@/lib/content";
import { ShowcaseBlock } from "./showcase-parts";

/** AI Product Builder: 직접 만든 프로토타입과 데모 → 사용 기술 → AI 활용 방식 (TASK-17) */
export default function AiShowcase() {
  const { stack, workflow, agents } = aiShowcase;
  const builds = getProjectsByPosition("ai-product-builder");

  return (
    <Section bordered aria-labelledby="what-i-build">
      <Heading id="what-i-build" eyebrow="What I Build">
        직접 만들고 검증합니다
      </Heading>

      <div className="mt-12 flex flex-col gap-20">
        <ShowcaseBlock title="프로토타입과 데모" caption="동작하는 결과물로 바로 확인할 수 있습니다.">
          <ul className="grid gap-4 md:grid-cols-2">
            {builds.map((p) => (
              <li key={p.slug} className="flex flex-col gap-4 rounded-card border border-line bg-surface p-6">
                <div className="flex flex-col gap-2">
                  <Link href={`/projects/${p.slug}`} className="text-h3 font-semibold text-fg hover:underline">
                    {p.title}
                  </Link>
                  <p className="text-small text-muted">{p.summary}</p>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {p.links?.map((l) => (
                    <ButtonLink key={l.label} href={l.href} size="sm" variant="secondary">
                      {l.label}
                    </ButtonLink>
                  ))}
                  <ButtonLink href={`/projects/${p.slug}`} size="sm" variant="ghost">
                    만든 과정 →
                  </ButtonLink>
                </div>
              </li>
            ))}
          </ul>
        </ShowcaseBlock>

        <ShowcaseBlock title="사용 기술">
          <dl className="grid gap-6 md:grid-cols-3">
            {stack.map((g) => (
              <div key={g.category} className="flex flex-col gap-3">
                <dt className="text-caption uppercase text-subtle">{g.category}</dt>
                <dd className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </ShowcaseBlock>

        <ShowcaseBlock title="AI 활용 방식" caption="이 포트폴리오 사이트를 만든 실제 방식입니다.">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <ol className="flex flex-col divide-y divide-line border-y border-line">
              {workflow.map((w, i) => (
                <li key={w.title} className="grid grid-cols-[2.5rem_1fr] gap-2 py-5">
                  <span className="font-mono text-caption text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-body font-semibold text-fg">{w.title}</span>
                    <span className="text-small text-muted">{w.description}</span>
                  </div>
                </li>
              ))}
            </ol>
            <div className="flex flex-col gap-3 rounded-card bg-surface p-6">
              <p className="font-mono text-caption text-subtle">.claude/agents/</p>
              <ul className="flex flex-col gap-3">
                {agents.map((a) => (
                  <li key={a.name} className="flex flex-col gap-0.5">
                    <span className="font-mono text-small text-fg">@{a.name}</span>
                    <span className="text-small text-muted">{a.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ShowcaseBlock>
      </div>
    </Section>
  );
}
