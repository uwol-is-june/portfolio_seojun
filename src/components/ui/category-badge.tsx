import type { Category, Deployment } from "@/content/types";
import { getT } from "@/i18n/server";
import { categories, categoryLabel } from "@/lib/category";
import { cn } from "@/lib/cn";

const deployments: Record<Deployment, { icon: React.ReactNode }> = {
  live: {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
      </>
    ),
  },
  local: {
    icon: (
      <>
        <rect x="4" y="5" width="16" height="11" rx="1.5" />
        <path d="M2 19h20" />
      </>
    ),
  },
};

/** 협업 · 창업 · AI 구분 배지. 상태(운영 중 등)와 배포 여부(배포 / 로컬)를 옆에 함께 표시합니다. */
export default function CategoryBadge({
  category,
  status,
  deployment,
  showCategory = true,
  affiliation,
  className,
}: {
  category: Category;
  status?: string;
  deployment?: Deployment;
  /** false면 협업 · 창업 · AI 구분 칩을 숨깁니다 (한 페이지의 프로젝트가 모두 같은 구분일 때) */
  showCategory?: boolean;
  /** 배포 칩 오른쪽에 붙는 소속 칩. title은 마우스를 올렸을 때 보이는 전체 소속 이름 */
  affiliation?: { label: string; title: string };
  className?: string;
}) {
  const t = getT();
  const c = categories[category];
  const d =
    deployment &&
    (deployment === "live"
      ? { ...deployments.live, label: t.deployed, title: t.deployedTitle }
      : { ...deployments.local, label: t.local, title: t.localTitle });
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-2 text-caption font-medium", className)}>
      {showCategory && (
        <span className={cn("inline-flex h-6 items-center gap-1.5 rounded-pill border px-2.5", c.border, c.text)}>
          <span aria-hidden className={cn("size-1.5 rounded-pill", c.bg)} />
          {categoryLabel(category, t)}
        </span>
      )}
      {d && (
        <span
          title={d.title}
          className={cn(
            "inline-flex h-6 items-center gap-1.5 rounded-pill px-2.5",
            deployment === "live" ? "border border-fg/70 text-fg" : "border border-dashed border-line-strong text-muted",
          )}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="size-3.5 fill-none stroke-current"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {d.icon}
          </svg>
          {d.label}
          <span className="sr-only">: {d.title}</span>
        </span>
      )}
      {affiliation && (
        <span
          title={affiliation.title}
          className="inline-flex h-6 items-center rounded-pill border border-line-strong px-2.5 text-muted"
        >
          {affiliation.label}
          <span className="sr-only">: {affiliation.title}</span>
        </span>
      )}
      {status && (
        <span className="inline-flex h-6 items-center gap-1.5 rounded-pill bg-surface-raised px-2.5 text-fg">
          <span aria-hidden className="size-1.5 animate-pulse rounded-pill bg-collab" />
          {status}
        </span>
      )}
    </span>
  );
}
