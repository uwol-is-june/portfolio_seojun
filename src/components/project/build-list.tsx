import { ButtonLink } from "@/components/ui/button";
import CategoryBadge from "@/components/ui/category-badge";
import Tag from "@/components/ui/tag";
import type { Build } from "@/content/types";

/** 직접 만든 작은 결과물 카드 목록 */
export default function BuildList({ builds }: { builds: Build[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {builds.map((b) => (
        <li key={b.name} className="flex flex-col gap-4 rounded-card border border-line bg-surface p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CategoryBadge category={b.category} status={b.status} />
            {b.stat && <span className="font-mono text-caption text-subtle">{b.stat}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-h3 font-semibold text-fg">{b.name}</h4>
            <p className="text-small text-muted">{b.description}</p>
            {b.role && <p className="text-caption text-subtle">역할 · {b.role}</p>}
          </div>
          <ul className="flex flex-col gap-1.5">
            {b.points.map((p) => (
              <li key={p} className="flex gap-2 text-small text-fg">
                <span aria-hidden className="text-subtle">
                  —
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5">
            {b.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {b.links.map((l) => (
              <ButtonLink key={l.label} href={l.href} size="sm" variant="secondary">
                {l.label} ↗
              </ButtonLink>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
