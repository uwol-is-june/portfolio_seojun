import Reveal from "@/components/motion/reveal";
import BuildList from "@/components/project/build-list";
import ProjectCard from "@/components/project/project-card";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import Tag from "@/components/ui/tag";
import Text from "@/components/ui/text";
import type { Build, Position, Project } from "@/content/types";

type PositionTemplateProps = {
  position: Position;
  projects: Project[];
  /** 케이스 스터디가 없는 작은 프로젝트 (예: 다시) */
  builds?: Build[];
  /** 포지션마다 다른 강조 섹션 (TASK-15~17) */
  showcase?: React.ReactNode;
};

/**
 * 포지션 페이지 공통 템플릿 (TASK-14)
 * 순서: 소개 → 포지션별 강조 섹션 → 프로젝트
 */
export default function PositionTemplate({ position, projects, builds = [], showcase }: PositionTemplateProps) {
  const [lead, ...rest] = projects;

  return (
    <main className="pt-header">
      {/* 소개 */}
      <Container className="flex flex-col gap-8 pt-16 pb-section md:pt-24">
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

      {showcase}

      {/* 프로젝트: 케이스 스터디는 큰 카드, 케이스 스터디가 없는 서비스는 작은 카드 */}
      <Section bordered aria-labelledby="projects">
        <Heading id="projects" eyebrow="Projects">
          프로젝트
        </Heading>
        {lead && (
          <Reveal className="mt-10">
            <ProjectCard project={lead} index={0} size="large" />
          </Reveal>
        )}
        {/* 나머지가 하나뿐이면 반쪽 빈칸이 생기지 않게 큰 카드로 */}
        {rest.length === 1 && (
          <Reveal className="mt-16">
            <ProjectCard project={rest[0]} index={1} size="large" />
          </Reveal>
        )}
        {rest.length > 1 && (
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
        {builds.length > 0 && (
          <div className="mt-20 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-h3 font-semibold text-fg">그 밖의 프로젝트</h3>
              <p className="text-small text-subtle">
                배포: 누구나 접속할 수 있는 서비스 · 로컬: 내 PC에서 실행하는 도구 (코드는 GitHub 공개)
              </p>
            </div>
            <BuildList builds={builds} />
          </div>
        )}
      </Section>

    </main>
  );
}
