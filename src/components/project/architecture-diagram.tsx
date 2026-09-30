import type { Architecture, ArchitectureStage } from "@/content/types";
import { getT } from "@/i18n/server";
import { cn } from "@/lib/cn";

const kindClass: Record<NonNullable<ArchitectureStage["kind"]>, string> = {
  screen: "border-line-strong",
  system: "border-ai/60 bg-ai/5",
  store: "border-dashed border-line-strong",
};

const colsClass: Record<number, string> = { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

function kindsFor(t: ReturnType<typeof getT>): Record<NonNullable<ArchitectureStage["kind"]>, { label: string; className: string }> {
  return {
    screen: { label: t.archScreen, className: kindClass.screen },
    system: { label: t.archSystem, className: kindClass.system },
    store: { label: t.archStore, className: kindClass.store },
  };
}

/**
 * 서비스 구조도 (코드에서 읽어낸 데이터 흐름)
 * 데스크톱: 한 줄에 최대 3단계씩 가로로 이어지고, 화살표는 칸 사이 간격에 떠 있어 카드 폭을 줄이지 않습니다.
 * 4단계까지는 한 줄, 5~6단계는 3칸씩 두 줄(줄 끝 화살표는 생략하고 번호로 순서를 잇습니다).
 * 모바일: 세로로 이어짐
 */
export default function ArchitectureDiagram({ architecture }: { architecture: Architecture }) {
  const { stages } = architecture;
  // 한 줄에 놓을 단계 수: 4단계 이하는 한 줄, 그보다 많으면 3칸씩
  const perRow = stages.length <= 4 ? stages.length : 3;
  const kinds = kindsFor(getT());
  return (
    <figure>
      <ol className={cn("flex flex-col lg:grid lg:gap-x-8 lg:gap-y-6", colsClass[perRow])}>
        {stages.map((stage, i) => {
          const kind = kinds[stage.kind ?? "screen"];
          const rowEnd = (i + 1) % perRow === 0;
          return (
            <li key={stage.title} className="relative flex min-w-0 flex-col">
              <div className={cn("flex min-w-0 flex-1 flex-col gap-3 rounded-card border p-5", kind.className)}>
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
                      <li key={t} className="max-w-full rounded-sm bg-surface-raised px-2 py-0.5 font-mono text-caption text-fg text-balance [overflow-wrap:anywhere]">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {i < stages.length - 1 && (
                <span
                  aria-hidden
                  className={cn(
                    "flex h-6 items-center justify-center text-subtle lg:absolute lg:top-1/2 lg:left-full lg:h-auto lg:w-8 lg:-translate-y-1/2",
                    rowEnd && "lg:hidden",
                  )}
                >
                  <span className="lg:hidden">↓</span>
                  <span className="hidden lg:inline">→</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
