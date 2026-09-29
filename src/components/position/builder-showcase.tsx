import BuilderFlow from "@/components/position/builder-flow";
import Reveal from "@/components/motion/reveal";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";

/**
 * AI Product Builder: 혼자 Claude Code로 만드는 7단계 흐름
 * 큰 흐름만 가로로 보여주고, 단계별 세부 내용(TASK.md 예시 · 세션 레인 · 붙이는 도구)은 단계를 누르면 모달로 엽니다.
 */
export default function BuilderShowcase() {
  return (
    <Section bordered aria-labelledby="how-i-build">
      <Heading id="how-i-build" eyebrow="How I Build">
        Claude Code Building Loop
      </Heading>
      <Reveal className="mt-10">
        <BuilderFlow />
      </Reveal>
    </Section>
  );
}
