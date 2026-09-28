import type { FlowComparison, FlowDiagram, FlowNode } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * AS-IS / TO-BE 플로우 비교 (이미지 대신 컴포넌트로 그려서 글자가 읽히고 반응형으로 보입니다)
 * 모바일: 세로 흐름 · 두 플로우 위아래 / 데스크톱: 두 플로우 좌우
 */
export default function FlowCompare({ flow }: { flow: FlowComparison }) {
  return (
    <figure className="flex flex-col gap-4">
      <figcaption className="text-small font-medium text-fg">{flow.title}</figcaption>
      <div className="grid gap-4 lg:grid-cols-2">
        <Diagram diagram={flow.before} tone="before" />
        <Diagram diagram={flow.after} tone="after" />
      </div>
    </figure>
  );
}

function Diagram({ diagram, tone }: { diagram: FlowDiagram; tone: "before" | "after" }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-card border p-5 md:p-6",
        tone === "after" ? "border-startup/50 bg-surface" : "border-line bg-bg",
      )}
    >
      <div className="flex flex-col gap-1">
        <p className={cn("text-caption font-semibold uppercase", tone === "after" ? "text-startup" : "text-subtle")}>
          {diagram.title}
        </p>
        {diagram.description && <p className="text-small text-muted">{diagram.description}</p>}
      </div>
      <ol className="flex flex-col">
        {diagram.nodes.map((node, i) => (
          <li key={node.label} className="flex flex-col items-stretch">
            <Node node={node} />
            {i < diagram.nodes.length - 1 && (
              <span aria-hidden className="mx-auto h-5 w-px bg-line-strong" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Node({ node }: { node: FlowNode }) {
  const kind = node.kind ?? "step";
  const box = cn(
    "flex items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-center text-small font-medium",
    kind === "step" && "border border-line-strong text-fg",
    kind === "end" && "bg-fg text-bg",
    kind === "decision" && "border border-dashed border-ai/70 text-fg",
    kind === "system" && "border border-startup bg-startup/10 text-fg",
  );

  if (!node.branches) {
    return <div className={box}>{node.label}</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className={box}>
        {node.label}
        {node.note && (
          <span className={cn("text-caption font-normal", kind === "system" ? "text-startup" : "text-ai")}>
            · {node.note}
          </span>
        )}
      </div>
      <ul className="grid grid-cols-2 gap-2">
        {node.branches.map((b) => (
          <li key={b.condition} className="flex flex-col gap-1 rounded-sm bg-surface-raised px-3 py-2">
            <span className="text-caption text-subtle">{b.condition}</span>
            <span className="text-small text-fg">{b.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
