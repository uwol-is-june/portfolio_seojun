import Reveal from "@/components/motion/reveal";
import ProjectCard from "@/components/project/project-card";
import { ButtonLink } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import Tag from "@/components/ui/tag";
import Text from "@/components/ui/text";
import type { Position, Project } from "@/content/types";

type PositionTemplateProps = {
  position: Position;
  /** 목록 기준 순번 (Position 01, 02 ...) */
  index: number;
  projects: Project[];
  /** 포지션마다 다른 강조 섹션 (TASK-15~17) */
  showcase?: React.ReactNode;
};

/**
 * 포지션 페이지 공통 템플릿 (TASK-14)
 * 순서: 소개 → 핵심 역량 → 포지션별 강조 섹션 → 대표 프로젝트 → CTA
 */
export default function PositionTemplate({ position, index, projects, showcase }: PositionTemplateProps) {
  const [lead, ...rest] = projects;

  return (
    <main className="pt-header">
      {/* 소개 */}
      <Container className="flex flex-col gap-8 pt-16 pb-section md:pt-24">
        <p className="text-caption uppercase text-subtle">Position {String(index + 1).padStart(2, "0")}</p>
        <h1 className="text-display uppercase text-fg">{position.title}</h1>
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:gap-16">
          <p className="text-h3 font-medium text-fg text-balance">{position.tagline}</p>
          <div className="flex flex-col gap-4">
            {position.intro.map((paragraph) => (
              <Text key={paragraph} size="lg">
                {paragraph}
              </Text>
            ))}
            <ul className="mt-2 flex flex-wrap gap-2" aria-label="강조 역량">
              {position.emphasis.map((item) => (
                <li key={item}>
                  <Tag variant="solid">{item}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* 핵심 역량 */}
      <Section bordered aria-labelledby="competencies">
        <Heading id="competencies" eyebrow="Core Competencies">
          핵심 역량
        </Heading>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
          {position.competencies.map((c, i) => (
            <li key={c.title} className="flex flex-col gap-3 bg-bg p-6 sm:odd:last:col-span-2 md:p-8">
              <span className="font-mono text-caption text-subtle">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-h3 font-semibold text-fg">{c.title}</h3>
              <Text size="sm">{c.description}</Text>
            </li>
          ))}
        </ul>
      </Section>

      {showcase}

      {/* 대표 프로젝트 */}
      <Section bordered aria-labelledby="projects">
        <Heading id="projects" eyebrow="Selected Projects">
          대표 프로젝트
        </Heading>
        {lead && (
          <Reveal className="mt-10">
            <ProjectCard project={lead} index={0} size="large" />
          </Reveal>
        )}
        {rest.length > 0 && (
          <ul className="mt-16 grid gap-12 md:grid-cols-2 md:gap-10">
            {rest.map((project, i) => (
              <li key={project.slug}>
                <Reveal>
                  <ProjectCard project={project} index={i + 1} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* CTA */}
      <Section bordered>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Heading level="h2" eyebrow="Next">
            {position.title}로 함께 일하고 싶다면
          </Heading>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={position.cta.href}>{position.cta.label}</ButtonLink>
            <ButtonLink href="/" variant="secondary">
              다른 포지션 보기
            </ButtonLink>
          </div>
        </div>
      </Section>
    </main>
  );
}
