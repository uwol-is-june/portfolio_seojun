import type { Category } from "@/content/types";
import { categories } from "@/lib/category";
import { cn } from "@/lib/cn";

/** 협업 · 창업 · AI 구분 배지. status가 있으면 옆에 함께 표시합니다. */
export default function CategoryBadge({
  category,
  status,
  className,
}: {
  category: Category;
  status?: string;
  className?: string;
}) {
  const c = categories[category];
  return (
    <span className={cn("inline-flex items-center gap-2 text-caption font-medium", className)}>
      <span className={cn("inline-flex h-6 items-center gap-1.5 rounded-pill border px-2.5", c.border, c.text)}>
        <span aria-hidden className={cn("size-1.5 rounded-pill", c.bg)} />
        {c.label}
      </span>
      {status && (
        <span className="inline-flex h-6 items-center gap-1.5 rounded-pill bg-surface-raised px-2.5 text-fg">
          <span aria-hidden className="size-1.5 animate-pulse rounded-pill bg-collab" />
          {status}
        </span>
      )}
    </span>
  );
}
