import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import { plannerShowcase } from "@/content/showcases";
import { DataTable, ShowcaseBlock } from "./showcase-parts";

/** Service Planner: 유저 플로우 → IA → 와이어프레임 → 정책 (TASK-16) */
export default function PlannerShowcase() {
  const { userFlow, ia, wireframeStates, policy } = plannerShowcase;
  return (
    <Section bordered aria-labelledby="how-i-plan">
      <Heading id="how-i-plan" eyebrow="How I Plan">
        흐름부터 정책까지
      </Heading>

      <div className="mt-12 flex flex-col gap-20">
        <ShowcaseBlock title="유저 플로우" caption={userFlow.caption}>
          <ol className="flex flex-col gap-3 lg:flex-row lg:gap-0">
            {userFlow.steps.map((s, i) => (
              <li key={s.title} className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-start">
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-center gap-3 rounded-card border border-line-strong px-4 py-3">
                    <span className="font-mono text-caption text-subtle">{i + 1}</span>
                    <span className="text-small font-medium text-fg">{s.title}</span>
                  </div>
                  {s.exception && (
                    <p className="rounded-sm border border-dashed border-line-strong px-3 py-2 text-caption text-muted">
                      예외 · {s.exception}
                    </p>
                  )}
                </div>
                {i < userFlow.steps.length - 1 && (
                  <span aria-hidden className="self-center text-subtle lg:mt-3 lg:px-2">
                    <span className="lg:hidden">↓</span>
                    <span className="hidden lg:inline">→</span>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </ShowcaseBlock>

        <div className="grid gap-20 lg:grid-cols-2 lg:gap-12">
          <ShowcaseBlock title="정보 구조 (IA)" caption={ia.caption}>
            <ul className="grid grid-cols-2 gap-4">
              {ia.tree.map((node) => (
                <li key={node.label} className="rounded-card border border-line p-5">
                  <p className="text-small font-semibold text-fg">{node.label}</p>
                  <ul className="mt-3 flex flex-col gap-1.5 border-l border-line-strong pl-3">
                    {node.children.map((child) => (
                      <li key={child} className="text-small text-muted">
                        {child}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </ShowcaseBlock>

          <ShowcaseBlock title="와이어프레임: 화면 상태" caption="한 화면을 네 가지 상태로 정의합니다.">
            <ul className="grid grid-cols-2 gap-4">
              {wireframeStates.map((w) => (
                <li key={w.state} className="flex flex-col gap-3">
                  <WireframeMock state={w.state} />
                  <p className="text-small">
                    <span className="font-medium text-fg">{w.state}</span>{" "}
                    <span className="text-muted">{w.description}</span>
                  </p>
                </li>
              ))}
            </ul>
          </ShowcaseBlock>
        </div>

        <ShowcaseBlock title="정책 설계" caption={policy.caption}>
          <DataTable columns={policy.columns} rows={policy.rows} />
        </ShowcaseBlock>
      </div>
    </Section>
  );
}

/** 상태별 와이어프레임 목업 (회색 박스) */
function WireframeMock({ state }: { state: string }) {
  const box = "rounded-sm bg-surface-raised";
  return (
    <div aria-hidden className="flex aspect-[3/4] flex-col gap-2 rounded-card border border-line bg-surface p-3">
      <div className={`h-3 w-1/2 ${box}`} />
      {state === "기본" && (
        <>
          <div className={`h-16 ${box}`} />
          <div className={`h-3 w-3/4 ${box}`} />
          <div className={`h-3 w-2/3 ${box}`} />
          <div className={`mt-auto h-6 bg-line-strong ${box}`} />
        </>
      )}
      {state === "로딩" && (
        <>
          <div className={`h-16 animate-pulse ${box}`} />
          <div className={`h-3 w-3/4 animate-pulse ${box}`} />
          <div className={`h-3 w-2/3 animate-pulse ${box}`} />
        </>
      )}
      {state === "빈 값" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <div className={`size-8 rounded-pill ${box}`} />
          <div className={`h-2 w-1/2 ${box}`} />
          <div className="mt-1 h-5 w-2/5 rounded-sm border border-line-strong" />
        </div>
      )}
      {state === "오류" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-pill border border-line-strong text-caption text-muted">
            !
          </div>
          <div className={`h-2 w-3/5 ${box}`} />
          <div className="mt-1 h-5 w-2/5 rounded-sm bg-line-strong" />
        </div>
      )}
    </div>
  );
}
