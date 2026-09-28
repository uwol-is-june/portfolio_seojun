import Image from "next/image";
import Link from "next/link";
import Tag from "@/components/ui/tag";
import type { Project } from "@/content/types";
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
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface">
        <Image
          src={project.thumbnail.src}
          alt={project.thumbnail.alt}
          fill
          sizes={large ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-3">
        <p className="flex gap-3 text-caption uppercase text-subtle">
          {index !== undefined && <span>{String(index + 1).padStart(2, "0")}</span>}
          <span>{project.role}</span>
        </p>
        <h3 className={cn("font-semibold text-fg text-balance", large ? "text-h2" : "text-h3")}>
          {project.title}
          <span
            aria-hidden
            className="ml-2 inline-block text-muted transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </h3>
        <p className="text-small text-muted text-pretty md:text-body">{project.summary}</p>
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
