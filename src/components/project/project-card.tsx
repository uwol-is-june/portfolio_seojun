import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import CategoryBadge from "@/components/ui/category-badge";
import Link from "@/components/ui/locale-link";
import Tag from "@/components/ui/tag";
import type { Project } from "@/content/types";
import { getT } from "@/i18n/server";
import { affiliationChip, affiliationLabel } from "@/lib/affiliation";
import { categories } from "@/lib/category";
import { cn } from "@/lib/cn";

type ProjectCardProps = {
  project: Project;
  /** 목록 번호 (01, 02 ...) */
  index?: number;
  /** large: 대표 프로젝트, 이미지를 크게 */
  size?: "large" | "default";
  /** 구분 칩(협업 · 창업 · AI) 표시. 페이지의 프로젝트가 모두 같은 구분이면 끕니다. */
  showCategory?: boolean;
};

export default function ProjectCard({ project, index, size = "default", showCategory = true }: ProjectCardProps) {
  const large = size === "large";
  const t = getT();
  // 카드 전체는 제목 링크를 늘려 덮고(stretched link), 바로가기 버튼은 그 위에 따로 둡니다.
  // 링크는 모두 보여주고(예: 포도위키 서비스 · App Store · Google Play · GitHub), 많으면 버튼 단위로 줄바꿈합니다.
  const links = project.links ?? [];
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-5",
        large && "md:grid md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10",
      )}
    >
      <ProjectVisual project={project} sizes={large ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"} />
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {index !== undefined && (
            <span className="font-mono text-caption text-subtle">{String(index + 1).padStart(2, "0")}</span>
          )}
          <CategoryBadge
            category={project.category}
            deployment={project.deployment}
            showCategory={showCategory}
            affiliation={{
              label: affiliationChip(
                project.affiliation,
                project.organization,
                t,
                // 구분 칩과 같은 말(창업 · 창업)이면 소속은 이름만
                showCategory && project.category === "startup" && project.affiliation === "startup",
              ),
              title: `${affiliationLabel(project.affiliation, t)} · ${project.organization}`,
            }}
          />
        </div>
        <h3 className={cn("font-semibold text-fg text-balance", large ? "text-h2" : "text-h3")}>
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none after:rounded-card focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-fg"
          >
            {project.title}
            <span
              aria-hidden
              className="ml-2 inline-block text-muted transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </h3>
        <p className="text-small font-medium text-fg">{project.subtitle}</p>
        {project.cardPoints?.length ? (
          <ul className="flex flex-col gap-1.5">
            {project.cardPoints.map((point) => (
              <li key={point} className={cn("flex gap-2 text-small text-muted text-pretty md:text-body", !large && "xl:text-small")}>
                <span aria-hidden className="text-subtle">
                  ·
                </span>
                {point}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-small text-muted text-pretty md:text-body">{project.summary}</p>
        )}
        <ul className="mt-1 flex flex-wrap gap-2">
          {/* 카드에는 3개까지, 나머지는 상세 페이지에서 */}
          {project.tags.slice(0, 3).map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        {links.length > 0 && (
          // 같은 줄 카드끼리 버튼 줄이 맞도록 카드 아래쪽에 붙입니다.
          <div className={cn("relative z-10 flex flex-wrap gap-2", large ? "mt-2" : "mt-auto pt-2")}>
            {links.map((l) => (
              <ButtonLink key={l.href} href={l.href} size="sm" variant="secondary" aria-label={`${project.title} ${l.label} (${t.newTab})`}>
                {l.label} ↗
              </ButtonLink>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/** 썸네일. 없으면 구분 색 배경에 로고나 제목을 보여줍니다. */
export function ProjectVisual({ project, sizes }: { project: Project; sizes: string }) {
  const c = categories[project.category];
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface">
      {project.thumbnail ? (
        <Image
          src={project.thumbnail.src}
          alt={project.thumbnail.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full flex-col justify-between border border-line p-6 md:p-8" aria-hidden>
          <span className={cn("text-caption font-semibold uppercase", c.text)}>{project.organization}</span>
          <span className="text-h2 font-semibold text-fg text-balance">{project.subtitle}</span>
          <span className={cn("h-1 w-16 rounded-pill", c.bg)} />
        </div>
      )}
      {project.logo && (
        <Image
          src={project.logo.src}
          alt=""
          width={56}
          height={56}
          className="absolute top-4 left-4 size-12 rounded-[0.75rem] shadow-lg md:size-14"
        />
      )}
    </div>
  );
}
