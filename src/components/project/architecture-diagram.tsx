import type { Architecture, ArchitectureStage } from "@/content/types";
import { getT } from "@/i18n/server";
import { cn } from "@/lib/cn";

const kindClass: Record<NonNullable<ArchitectureStage["kind"]>, string> = {
  screen: "border-line-strong",
  system: "border-ai/60 bg-ai/5",
  store: "border-dashed border-line-strong",
};

function kindsFor(t: ReturnType<typeof getT>): Record<NonNullable<ArchitectureStage["kind"]>, { label: string; className: string }> {
  return {
    screen: { label: t.archScreen, className: kindClass.screen },
    system: { label: t.archSystem, className: kindClass.system },
    store: { label: t.archStore, className: kindClass.store },
  };
}

/**
 * 서비스 구조도 (코드에서 읽어낸 데이터 흐름)
 * 데스크톱: 단계가 가로로 이어지고 화살표로 연결 / 모바일: 세로로 이어짐
 */
export default function ArchitectureDiagram({ architecture }: { architecture: Architecture }) {
  const { stages, extras, caption } = architecture;
  const kinds = kindsFor(getT());
  return (
    <figure className="flex flex-col gap-5">
      <ol className="flex flex-col lg:flex-row lg:items-stretch">
        {stages.map((stage, i) => {
          const kind = kinds[stage.kind ?? "screen"];
          return (
            <li key={stage.title} className="flex flex-col lg:min-w-0 lg:flex-1 lg:flex-row">
              <div className={cn("flex flex-1 flex-col gap-3 rounded-card border p-5", kind.className)}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-caption text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-caption text-subtle">{kind.label}</span>
                </div>
                <p className="text-body font-semibold text-fg text-balance">{stage.title}</p>
                <ul className="flex flex-col gap-1.5">
                  {stage.items.map((item) => (
                    <li key={item} className="text-small text-muted text-balance">
                      {item}
                    </li>
                  ))}
                </ul>
                {stage.tech && (
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
                    {stage.tech.map((t) => (
                      <li key={t} className="rounded-sm bg-surface-raised px-2 py-0.5 font-mono text-caption text-fg text-balance">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {i < stages.length - 1 && (
                <span
                  aria-hidden
                  className="flex h-6 items-center justify-center text-subtle lg:h-auto lg:w-6 lg:shrink-0"
                >
                  <span className="lg:hidden">↓</span>
                  <span className="hidden lg:inline">→</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {(extras || caption) && (
        <figcaption className="flex flex-col gap-2">
          {extras && (
            <ul className="flex flex-wrap gap-2">
              {extras.map((e) => (
                <li key={e} className="rounded-pill border border-line px-3 py-1 text-caption text-muted">
                  + {e}
                </li>
              ))}
            </ul>
          )}
          {caption && <p className="text-caption text-subtle">{caption}</p>}
        </figcaption>
      )}
    </figure>
  );
}
