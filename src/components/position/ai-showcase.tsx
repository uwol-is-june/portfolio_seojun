import Link from "next/link";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import Tag from "@/components/ui/tag";
import { aiShowcase } from "@/content/showcases";
import { ShowcaseBlock } from "./showcase-parts";

/** AI Product Builder: 실투자 검증 → 사용 기술 */
export default function AiShowcase() {
  const { validation, stack } = aiShowcase;

  return (
    <Section bordered aria-labelledby="what-i-build">
      <Heading id="what-i-build" eyebrow="What I Build">
        직접 만들고, 실제로 써서 검증합니다
      </Heading>

      <div className="mt-12 flex flex-col gap-20">
        <ShowcaseBlock title="실투자 검증" caption={`${validation.project.title}: 추천 종목을 실계좌로 매수해 확인`}>
          <ul className="grid gap-3 sm:grid-cols-3">
            {validation.metrics.map((m) => (
              <li key={m.label} className="flex flex-col gap-2 rounded-card border border-ai/50 p-6">
                <span className="text-caption uppercase text-subtle">{m.label}</span>
                <span className="text-h1 font-semibold text-ai">{m.value}</span>
                <span className="text-small text-muted">{m.description}</span>
              </li>
            ))}
          </ul>
          <Link
            href={`/projects/${validation.project.slug}`}
            className="text-small text-muted underline-offset-4 hover:text-fg hover:underline"
          >
            {validation.project.title} 케이스 스터디 보기 →
          </Link>
        </ShowcaseBlock>

        <ShowcaseBlock title="사용 기술">
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </Section>
  );
}
