import type { Infra, InfraNode } from "@/content/types";
import { getT } from "@/i18n/server";
import { cn } from "@/lib/cn";

/**
 * 인프라 구조도: 사용자 화면 → 실행 · 배포 → 데이터 · 외부 API
 * 층마다 한 줄씩 쌓고 아래로 화살표를 잇습니다. 넓은 화면에서는 층 이름이 왼쪽, 구성 요소가 오른쪽.
 */
export default function InfraDiagram({ infra }: { infra: Infra }) {
  const t = getT();
  const tiers = [
    { id: "client", label: t.infraClient, nodes: infra.client, className: "border-line-strong" },
    { id: "runtime", label: t.infraRuntime, nodes: infra.runtime, className: "border-ai/60 bg-ai/5" },
    { id: "data", label: t.infraData, nodes: infra.data, className: "border-dashed border-line-strong" },
  ].filter((tier) => tier.nodes.length > 0);

  return (
    <figure>
      <ol className="flex flex-col">
        {tiers.map((tier, i) => (
          <li key={tier.id} className="flex flex-col">
            <div className="grid gap-3 md:grid-cols-[10rem_1fr] md:items-center md:gap-6">
              <p className="text-caption uppercase text-subtle">{tier.label}</p>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {tier.nodes.map((node) => (
                  <Node key={node.name} node={node} className={tier.className} />
                ))}
              </ul>
            </div>
            {i < tiers.length - 1 && (
              <span aria-hidden className="flex h-8 items-center text-subtle md:ml-[11.5rem]">
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}

function Node({ node, className }: { node: InfraNode; className: string }) {
  return (
    <li className={cn("flex flex-col gap-1 rounded-card border px-4 py-3", className)}>
      <span className="text-small font-semibold text-fg">{node.name}</span>
      {node.note && <span className="text-small text-muted text-balance">{node.note}</span>}
    </li>
  );
}
