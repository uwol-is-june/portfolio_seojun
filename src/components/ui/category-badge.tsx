import type { Category, Deployment } from "@/content/types";
import { categories } from "@/lib/category";
import { cn } from "@/lib/cn";

const deployments: Record<Deployment, { label: string; title: string; icon: React.ReactNode }> = {
  live: {
    label: "배포",
    title: "누구나 접속할 수 있게 배포된 서비스",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
      </>
    ),
  },
  local: {
    label: "로컬",
    title: "내 PC에서 실행하는 프로젝트 (공개 주소 없음)",
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
  className,
}: {
  category: Category;
  status?: string;
  deployment?: Deployment;
  className?: string;
}) {
  const c = categories[category];
  const d = deployment && deployments[deployment];
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-2 text-caption font-medium", className)}>
      <span className={cn("inline-flex h-6 items-center gap-1.5 rounded-pill border px-2.5", c.border, c.text)}>
        <span aria-hidden className={cn("size-1.5 rounded-pill", c.bg)} />
        {c.label}
      </span>
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
      {status && (
        <span className="inline-flex h-6 items-center gap-1.5 rounded-pill bg-surface-raised px-2.5 text-fg">
          <span aria-hidden className="size-1.5 animate-pulse rounded-pill bg-collab" />
          {status}
        </span>
      )}
    </span>
  );
}
