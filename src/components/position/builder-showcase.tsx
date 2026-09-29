import BuilderFlow from "@/components/position/builder-flow";
import Reveal from "@/components/motion/reveal";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import { getShowcases } from "@/lib/content";

/**
 * AI Product Builder: 혼자 Claude Code로 만드는 7단계 흐름
 * 큰 흐름만 가로로 보여주고, 고른 단계의 세부 내용(예시 문서 · 세션 레인 · 붙이는 도구)을 흐름도 아래 패널에 펼칩니다.
 */
export default function BuilderShowcase() {
  return (
    <Section bordered aria-labelledby="how-i-build" className="pt-12 md:pt-16">
      <Heading id="how-i-build" eyebrow="How I Build">
        Claude Code Building Loop
      </Heading>
      <Reveal className="mt-10">
        <BuilderFlow flow={getShowcases().builderShowcase.flow} />
      </Reveal>
    </Section>
  );
}
