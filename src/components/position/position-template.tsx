import Link from "next/link";
import Reveal from "@/components/motion/reveal";
import BuildList from "@/components/project/build-list";
import ProjectCard, { ProjectVisual } from "@/components/project/project-card";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import Tag from "@/components/ui/tag";
import Text from "@/components/ui/text";
import type { Build, Position, Project } from "@/content/types";

/** 프로젝트를 소속별로 나눠 보여줄 때의 묶음 (예: 개인 / 회사) */
export type ProjectGroup = { title: string; description?: string; projects: Project[] };

type PositionTemplateProps = {
  position: Position;
  projects: Project[];
  /** 있으면 프로젝트를 이 묶음대로 나눠 소제목과 함께 보여줍니다 */
  projectGroups?: ProjectGroup[];
  /** 케이스 스터디가 없는 작은 프로젝트 (예: 다시) */
  builds?: Build[];
  /** 다른 포지션의 대표 프로젝트로 넘어가는 블록 */
  related?: { positions: Position[]; projects: Project[] };
  /** 포지션마다 다른 강조 섹션 */
  showcase?: React.ReactNode;
};

/**
 * 포지션 페이지 공통 템플릿
 * 순서: 소개 → 포지션별 강조 섹션 → 프로젝트 → (그 밖의 프로젝트 또는 다른 포지션 둘러보기)
 */
/**
 * 프로젝트 목록: 첫 카드는 크게, 나머지는 2열. 홀수 개면 마지막 하나는 반쪽 빈칸이 생기지 않게 큰 카드로
 * start는 카드 번호가 묶음을 넘어 이어지도록 앞 묶음까지의 개수입니다.
 */
function ProjectList({ projects, showCategory, start = 0 }: { projects: Project[]; showCategory: boolean; start?: number }) {
  const [lead, ...rest] = projects;
  const odd = rest.length % 2 === 1;
  const grid = odd ? rest.slice(0, -1) : rest;
  const tail = odd ? rest[rest.length - 1] : undefined;
  return (
    <>
      {lead && (
        <Reveal className="mt-10">
          <ProjectCard project={lead} index={start} size="large" showCategory={showCategory} />
        </Reveal>
      )}
      {grid.length > 0 && (
        <ul className="mt-16 grid gap-12 md:grid-cols-2 md:gap-10">
          {grid.map((project, i) => (
            <li key={project.slug}>
              <Reveal>
                <ProjectCard project={project} index={start + i + 1} showCategory={showCategory} />
              </Reveal>
            </li>
          ))}
        </ul>
      )}
      {tail && (
        <Reveal className="mt-16">
          <ProjectCard project={tail} index={start + rest.length} size="large" showCategory={showCategory} />
        </Reveal>
      )}
    </>
  );
}

export default function PositionTemplate({ position, projects, projectGroups, builds = [], related, showcase }: PositionTemplateProps) {
  // 프로젝트가 모두 같은 구분이면(예: AI Product Builder는 전부 AI) 구분 칩이 정보가 없어 숨깁니다.
  const showCategory = new Set(projects.map((p) => p.category)).size > 1;
  const groups = projectGroups?.filter((g) => g.projects.length > 0);

  return (
    <main className="pt-header">
      {/* 소개 */}
      <Container className="flex flex-col gap-8 pt-16 pb-section md:pt-24">
        <h1 className="text-display uppercase text-fg">{position.title}</h1>
        {/* 소개 문단 · 강조 태그가 없는 포지션은 한 줄 소개만 넓게 보여줍니다. */}
        {position.intro.length > 0 || position.emphasis.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:gap-16">
            <p className="text-h3 font-medium text-fg text-balance">{position.tagline}</p>
            <div className="flex flex-col gap-4">
              {position.intro.map((paragraph) => (
                <Text key={paragraph} size="lg">
                  {paragraph}
                </Text>
              ))}
              {position.emphasis.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-2" aria-label="강조 역량">
                  {position.emphasis.map((item) => (
                    <li key={item}>
                      <Tag variant="solid">{item}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <p className="max-w-3xl text-h3 font-medium text-fg text-balance">{position.tagline}</p>
        )}
      </Container>

      {showcase}

      {/* 프로젝트: 케이스 스터디는 카드, 케이스 스터디가 없는 서비스는 작은 카드 */}
      <Section bordered aria-labelledby="projects">
        <Heading id="projects" eyebrow="Projects">
          프로젝트
        </Heading>
        {groups && groups.length > 0 ? (
          groups.map((group, g) => (
            <div key={group.title} className={g === 0 ? "mt-10" : "mt-24"}>
              <div className="flex flex-col gap-1 border-b border-line pb-4">
                <h3 className="text-h3 font-semibold text-fg">
                  {group.title}
                  <span className="ml-2 text-body font-normal text-subtle">{group.projects.length}</span>
                </h3>
                {group.description && <p className="text-small text-subtle">{group.description}</p>}
              </div>
              <ProjectList
                projects={group.projects}
                showCategory={showCategory}
                start={groups.slice(0, g).reduce((n, prev) => n + prev.projects.length, 0)}
              />
            </div>
          ))
        ) : (
          <ProjectList projects={projects} showCategory={showCategory} />
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

      {related && related.projects.length > 0 && (
        <Section bordered aria-labelledby="related">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Heading id="related" eyebrow="More">
              다른 포지션의 대표 프로젝트
            </Heading>
            <ul className="flex flex-wrap gap-3">
              {related.positions.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/${p.id}`}
                    className="inline-flex h-10 items-center gap-2 rounded-pill border border-line-strong px-4 text-small font-medium text-fg transition-colors hover:border-fg"
                  >
                    {p.title} 보기 →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="group flex flex-col gap-3">
                  <ProjectVisual project={p} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
                  <span className="flex flex-col gap-0.5">
                    <span className="text-body font-semibold text-fg group-hover:underline">{p.title}</span>
                    <span className="text-small text-muted">{p.subtitle}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </main>
  );
}
