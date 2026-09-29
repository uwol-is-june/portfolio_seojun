import Reveal from "@/components/motion/reveal";
import BuildList from "@/components/project/build-list";
import ProjectCard, { ProjectVisual } from "@/components/project/project-card";
import ProjectTabs from "@/components/position/project-tabs";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Link from "@/components/ui/locale-link";
import Section from "@/components/ui/section";
import Tag from "@/components/ui/tag";
import Text from "@/components/ui/text";
import type { Build, Position, Project } from "@/content/types";
import { getT } from "@/i18n/server";
import { cn } from "@/lib/cn";

/** 프로젝트를 소속별로 나눠 보여줄 때의 묶음 (예: 개인 / 회사) */
export type ProjectGroup = { id: string; title: string; description?: string; projects: Project[] };

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
/** 카드 한 칸 (같은 줄 카드끼리 높이를 맞추도록 h-full) */
function Cell({ project, index, showCategory }: { project: Project; index: number; showCategory: boolean }) {
  return (
    <li className="h-full">
      <Reveal className="h-full">
        <ProjectCard project={project} index={index} showCategory={showCategory} />
      </Reveal>
    </li>
  );
}

/**
 * 첫 카드 뒤 나머지를 cols열로 놓습니다. 마지막 줄에 남는 개수에 따라:
 * 1개 남으면 반쪽 빈칸이 생기지 않게 큰 카드로, (3열에서) 2개 남으면 그 줄만 2열로.
 */
function Rest({ projects, cols, start, showCategory }: { projects: Project[]; cols: 2 | 3; start: number; showCategory: boolean }) {
  const left = projects.length % cols;
  const full = projects.slice(0, projects.length - left);
  const tail = projects.slice(projects.length - left);
  return (
    <>
      {full.length > 0 && (
        <ul className={cn("mt-16 grid gap-12 md:grid-cols-2 md:gap-10", cols === 3 && "xl:grid-cols-3")}>
          {full.map((p, i) => (
            <Cell key={p.slug} project={p} index={start + i} showCategory={showCategory} />
          ))}
        </ul>
      )}
      {tail.length === 1 && (
        <Reveal className="mt-16">
          <ProjectCard project={tail[0]} index={start + full.length} size="large" showCategory={showCategory} />
        </Reveal>
      )}
      {tail.length === 2 && (
        <ul className="mt-16 grid gap-12 md:grid-cols-2 md:gap-10">
          {tail.map((p, i) => (
            <Cell key={p.slug} project={p} index={start + full.length + i} showCategory={showCategory} />
          ))}
        </ul>
      )}
    </>
  );
}

/**
 * 프로젝트 목록: 첫 카드는 크게, 나머지는 넓은 화면(xl)에서 3열 · 그보다 좁으면 2열.
 * 마지막 줄 처리가 열 수마다 달라 두 배치를 모두 그리고 화면 폭으로 하나만 보여줍니다.
 * start는 카드 번호가 묶음을 넘어 이어지도록 앞 묶음까지의 개수입니다.
 */
function ProjectList({ projects, showCategory, start = 0 }: { projects: Project[]; showCategory: boolean; start?: number }) {
  const [lead, ...rest] = projects;
  return (
    <>
      {lead && (
        <Reveal className="mt-10">
          <ProjectCard project={lead} index={start} size="large" showCategory={showCategory} />
        </Reveal>
      )}
      {rest.length > 0 && (
        <>
          <div className="xl:hidden">
            <Rest projects={rest} cols={2} start={start + 1} showCategory={showCategory} />
          </div>
          <div className="hidden xl:block">
            <Rest projects={rest} cols={3} start={start + 1} showCategory={showCategory} />
          </div>
        </>
      )}
    </>
  );
}

export default function PositionTemplate({ position, projects, projectGroups, builds = [], related, showcase }: PositionTemplateProps) {
  const t = getT();
  // 프로젝트가 모두 같은 구분이면(예: AI Product Builder는 전부 AI) 구분 칩이 정보가 없어 숨깁니다.
  const showCategory = new Set(projects.map((p) => p.category)).size > 1;
  const groups = projectGroups?.filter((g) => g.projects.length > 0);

  return (
    <main className="pt-header">
      {/* 소개 */}
      <Container className="flex flex-col gap-8 pt-16 pb-12 md:pt-24 md:pb-16">
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
                <ul className="mt-2 flex flex-wrap gap-2" aria-label={t.emphasis}>
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
          {t.projects}
        </Heading>
        {groups && groups.length > 1 ? (
          <ProjectTabs
            tabs={groups.map((group, g) => ({
              id: group.id,
              title: group.title,
              count: group.projects.length,
              description: group.description,
              panel: (
                <ProjectList
                  projects={group.projects}
                  showCategory={showCategory}
                  start={groups.slice(0, g).reduce((n, prev) => n + prev.projects.length, 0)}
                />
              ),
            }))}
          />
        ) : (
          <ProjectList projects={projects} showCategory={showCategory} />
        )}
        {builds.length > 0 && (
          <div className="mt-20 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-h3 font-semibold text-fg">{t.otherProjects}</h3>
              <p className="text-small text-subtle">
                {t.otherProjectsNote}
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
              {t.relatedTitle}
            </Heading>
            <ul className="flex flex-wrap gap-3">
              {related.positions.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/${p.id}`}
                    className="inline-flex h-10 items-center gap-2 rounded-pill border border-line-strong px-4 text-small font-medium text-fg transition-colors hover:border-fg"
                  >
                    {p.title} {t.viewPosition}
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
