import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "@/components/ui/category-badge";
import Tag from "@/components/ui/tag";
import type { Project } from "@/content/types";
import { categories } from "@/lib/category";
import { cn } from "@/lib/cn";

type ProjectCardProps = {
  project: Project;
  /** 목록 번호 (01, 02 ...) */
  index?: number;
  /** large: 대표 프로젝트, 이미지를 크게 */
  size?: "large" | "default";
};

export default function ProjectCard({ project, index, size = "default" }: ProjectCardProps) {
  const large = size === "large";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex flex-col gap-5",
        large && "md:grid md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10",
      )}
    >
      <ProjectVisual project={project} sizes={large ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 768px) 45vw, 100vw"} />
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {index !== undefined && (
            <span className="font-mono text-caption text-subtle">{String(index + 1).padStart(2, "0")}</span>
          )}
          <CategoryBadge category={project.category} status={project.status} deployment={project.deployment} />
        </div>
        <h3 className={cn("font-semibold text-fg text-balance", large ? "text-h2" : "text-h3")}>
          {project.title}
          <span
            aria-hidden
            className="ml-2 inline-block text-muted transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </h3>
        <p className="text-small font-medium text-fg">{project.subtitle}</p>
        <p className="text-small text-muted text-pretty md:text-body">{project.summary}</p>
        <p className="text-caption text-subtle">
          {project.role} · {project.period}
        </p>
        <ul className="mt-1 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </Link>
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
