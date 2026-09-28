import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import CategoryBadge from "@/components/ui/category-badge";
import Container from "@/components/ui/container";
import Tag from "@/components/ui/tag";
import Text from "@/components/ui/text";
import type { Evidence, Iteration, Metric, Position, ProcessStep, Project } from "@/content/types";
import { categories } from "@/lib/category";
import { cn } from "@/lib/cn";
import BackLink from "./back-link";
import FlowCompare from "./flow-compare";

type CaseStudyProps = {
  project: Project;
  positions: Position[];
  prev?: Project;
  next?: Project;
};

/**
 * 프로젝트 상세(케이스 스터디) 템플릿
 * 포트폴리오 PDF와 같은 순서: Overview → Problem & Hypothesis → Action → Result → 실패 분석 · 개선 → 재결과
 */
export default function CaseStudy({ project, positions, prev, next }: CaseStudyProps) {
  const accent = categories[project.category];
  const meta = [
    { label: "Role", value: project.role },
    { label: "Period", value: project.period },
    { label: "Organization", value: project.organization },
    { label: "Team", value: project.team?.map((t) => `${t.role} ${t.count}`).join(" · ") },
  ].filter((m): m is { label: string; value: string } => Boolean(m.value));

  let chapter = 0;
  const nextChapter = () => String(++chapter).padStart(2, "0");

  return (
    <main className="pt-header">
      <article>
        {/* Overview */}
        <Container className="flex flex-col gap-8 pt-10 pb-12 md:pt-16">
          {positions[0] && <BackLink fallbackHref={`/${positions[0].id}`} fallbackLabel={`${positions[0].title} 페이지`} />}
          <div className="flex flex-wrap items-center gap-3">
            <CategoryBadge category={project.category} status={project.status} deployment={project.deployment} />
            <ul className="flex flex-wrap gap-2" aria-label="관련 포지션">
              {positions.map((p) => (
                <li key={p.id}>
                  <Link href={`/${p.id}`}>
                    <Tag className="transition-colors hover:border-fg hover:text-fg">{p.title}</Tag>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-5">
            {project.logo && (
              <Image
                src={project.logo.src}
                alt={project.logo.alt}
                width={72}
                height={72}
                className="size-14 shrink-0 rounded-[1rem] md:size-18"
              />
            )}
            <div className="flex flex-col gap-1">
              <h1 className="text-h1 font-semibold text-fg text-balance">{project.title}</h1>
              <p className={cn("text-body-lg font-medium", accent.text)}>{project.subtitle}</p>
            </div>
          </div>
          <Text size="lg" className="max-w-3xl">
            {project.summary}
          </Text>
          {project.deployment === "local" && (
            <p className="text-small text-subtle">
              로컬에서 실행하는 프로젝트라 공개 주소가 없습니다. 코드와 문서는 GitHub에서 볼 수 있습니다.
            </p>
          )}
          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.links.map((l, i) => (
                <ButtonLink key={l.label} href={l.href} size="sm" variant={i === 0 ? "primary" : "secondary"}>
                  {l.label} ↗
                </ButtonLink>
              ))}
            </div>
          )}
          <dl className="grid grid-cols-1 gap-x-6 gap-y-5 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="flex flex-col gap-1">
                <dt className="text-caption uppercase text-subtle">{m.label}</dt>
                <dd className="text-small text-fg">{m.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2" aria-label="주요 성과">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 bg-bg p-5 text-small text-fg sm:odd:last:col-span-2 md:text-body">
                <span aria-hidden className={cn("mt-2 size-1.5 shrink-0 rounded-pill", accent.bg)} />
                {h}
              </li>
            ))}
          </ul>
        </Container>

        {project.thumbnail && (
          <Container>
            <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-surface md:aspect-[2/1]">
              <Image
                src={project.thumbnail.src}
                alt={project.thumbnail.alt}
                fill
                priority
                sizes="(min-width: 1280px) 1184px, 100vw"
                className="object-cover"
              />
            </div>
          </Container>
        )}

        <div className="flex flex-col gap-section py-section">
          {/* Problem & Hypothesis */}
          <Chapter number={nextChapter()} label="Problem & Hypothesis" title={project.problem.statement}>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="flex flex-col gap-4">
                {project.background && <EvidenceCard label="Background" evidence={project.background} />}
                {project.research && <EvidenceCard label="User Interview" evidence={project.research} />}
                {project.problem.points && project.problem.points.length > 0 && (
                  <Card label="Problem">
                    <ul className="flex flex-col gap-2">
                      {project.problem.points.map((p) => (
                        <li key={p} className="text-body text-fg">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>
              <div className="flex flex-col gap-4">
                {project.hypothesis && (
                  <Card label="Hypothesis" accent={accent.text}>
                    <p className="text-h3 font-medium text-fg text-balance">{project.hypothesis}</p>
                    {project.hypothesisNote && <p className="text-small text-subtle">{project.hypothesisNote}</p>}
                  </Card>
                )}
                {project.metrics && (
                  <Card label="Metrics">
                    <ol className="flex flex-col gap-4">
                      {project.metrics.map((m, i) => (
                        <li key={m.name} className="flex flex-col gap-1">
                          <span className="text-body font-semibold text-fg">
                            {i + 1}. {m.name}
                          </span>
                          {m.definitions.map((d, j) => (
                            <span key={d} className="text-small text-muted">
                              def{m.definitions.length > 1 ? j + 1 : ""}. {d}
                            </span>
                          ))}
                        </li>
                      ))}
                    </ol>
                  </Card>
                )}
              </div>
            </div>
          </Chapter>

          {/* Action */}
          <Chapter number={nextChapter()} label="Action" title="무엇을 했나">
            <Steps steps={project.actions} />
          </Chapter>

          {/* Result */}
          <Chapter number={nextChapter()} label="Result" title={project.outcome.verdict ?? "결과"}>
            <MetricGrid metrics={project.outcome.metrics} />
            {project.outcome.summary && <Text>{project.outcome.summary}</Text>}
          </Chapter>

          {/* 실패 분석 · 개선 */}
          {project.iterations?.map((it) => (
            <Chapter key={it.verdict} number={nextChapter()} label="Insight-Driven Action" title={it.after.verdict}>
              <IterationBlock iteration={it} accent={accent.text} />
            </Chapter>
          ))}

          {project.gallery && project.gallery.length > 0 && (
            <Chapter number={nextChapter()} label="Gallery" title="화면과 현장">
              <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                {project.gallery.map((img) => (
                  <li key={img.src} className="flex flex-col gap-2">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 768px) 33vw, 50vw"
                        className="object-contain"
                      />
                    </div>
                    {img.caption && <p className="text-caption text-subtle">{img.caption}</p>}
                  </li>
                ))}
              </ul>
            </Chapter>
          )}

          {project.retrospective && project.retrospective.length > 0 && (
            <Chapter number={nextChapter()} label="Retrospective" title="회고">
              <ul className="flex flex-col gap-4">
                {project.retrospective.map((r) => (
                  <li key={r} className="rounded-card bg-surface p-5 text-body text-muted">
                    {r}
                  </li>
                ))}
              </ul>
            </Chapter>
          )}
        </div>
      </article>

      {(prev || next) && (
        <nav aria-label="다른 프로젝트" className="border-t border-line">
          <Container className="grid md:grid-cols-2">
            {prev && <AdjacentLink project={prev} direction="prev" />}
            {next && <AdjacentLink project={next} direction="next" />}
          </Container>
        </nav>
      )}
    </main>
  );
}

function Chapter({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Reveal>
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-3 border-t border-line pt-8">
            <p className="flex gap-3 text-caption uppercase text-subtle">
              <span className="font-mono">{number}</span>
              {label}
            </p>
            <h2 className="max-w-4xl text-h2 font-semibold text-fg text-balance">{title}</h2>
          </div>
          {children}
        </section>
      </Reveal>
    </Container>
  );
}

function Card({ label, accent, children }: { label: string; accent?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-card border border-line bg-surface p-6">
      <p className={cn("text-caption font-medium uppercase", accent ?? "text-subtle")}>{label}</p>
      {children}
    </div>
  );
}

function EvidenceCard({ label, evidence }: { label: string; evidence: Evidence }) {
  return (
    <Card label={label}>
      <p className="text-body-lg font-semibold text-fg">{evidence.title}</p>
      <ul className="flex flex-col gap-2">
        {evidence.stats.map((s) => (
          <li key={s} className="flex gap-2 text-small text-muted">
            <span aria-hidden className="text-subtle">
              ·
            </span>
            {s}
          </li>
        ))}
      </ul>
      {evidence.source && <p className="text-caption text-subtle">출처 · {evidence.source}</p>}
    </Card>
  );
}

function Steps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {steps.map((step, i) => (
        <li key={step.title} className="flex flex-col gap-3 rounded-card border border-line p-6 md:odd:last:col-span-2">
          {step.image && (
            <div className="relative mb-2 aspect-[3/2] overflow-hidden rounded-sm bg-surface">
              <Image
                src={step.image.src}
                alt={step.image.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <span className="font-mono text-caption text-subtle">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="text-h3 font-semibold text-fg">{step.title}</h3>
          <Text size="sm">{step.description}</Text>
          {step.points && (
            <ul className="flex flex-col gap-1.5">
              {step.points.map((p) => (
                <li key={p} className="flex gap-2 text-small text-fg">
                  <span aria-hidden className="text-subtle">
                    —
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          )}
          {step.artifact && (
            <p className="mt-auto pt-2 text-caption text-subtle">
              산출물 · <span className="text-muted">{step.artifact}</span>
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((m) => (
        <li key={m.label} className="flex flex-col gap-2 rounded-card border border-line p-6">
          <span className="text-caption uppercase text-subtle">{m.label}</span>
          <span className="text-h2 font-semibold text-fg">{m.value}</span>
          {m.description && <span className="text-small text-muted">{m.description}</span>}
        </li>
      ))}
    </ul>
  );
}

function IterationBlock({ iteration, accent }: { iteration: Iteration; accent: string }) {
  const failed = iteration.verdict.includes("실패");
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card label="Conclusion">
          <p className={cn("text-h3 font-semibold", failed ? "text-ai" : "text-fg")}>{iteration.verdict}</p>
          <ul className="flex flex-col gap-2">
            {iteration.findings.map((f) => (
              <li key={f} className="text-small text-muted">
                {f}
              </li>
            ))}
          </ul>
        </Card>
        <div className="flex flex-col gap-4">
          <EvidenceCard label="Failure Analysis" evidence={iteration.analysis} />
          <Card label="Insight" accent={accent}>
            <p className="text-h3 font-medium text-fg text-balance">{iteration.insight}</p>
          </Card>
        </div>
      </div>

      {iteration.flow && <FlowCompare flow={iteration.flow} />}

      <div className="flex flex-col gap-4">
        <p className="text-small font-medium text-fg">개선 액션</p>
        <Steps steps={iteration.actions} />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-small font-medium text-fg">다시 측정한 결과</p>
        <MetricGrid metrics={iteration.after.metrics} />
        {iteration.after.note && <p className="text-caption text-subtle">{iteration.after.note}</p>}
      </div>
    </div>
  );
}

function AdjacentLink({ project, direction }: { project: Project; direction: "prev" | "next" }) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex flex-col gap-2 py-10 md:py-14",
        isNext ? "border-t border-line md:border-t-0 md:border-l md:pl-10 md:text-right" : "md:pr-10",
      )}
    >
      <span className="text-caption uppercase text-subtle">{isNext ? "Next Project →" : "← Previous Project"}</span>
      <span className="text-h3 font-semibold text-muted transition-colors group-hover:text-fg">{project.title}</span>
      <span className="text-small text-subtle">{project.subtitle}</span>
    </Link>
  );
}
