import Image from "next/image";
import Reveal from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import CategoryBadge from "@/components/ui/category-badge";
import Container from "@/components/ui/container";
import Link from "@/components/ui/locale-link";
import Tag from "@/components/ui/tag";
import Text from "@/components/ui/text";
import type { Evidence, ImageAsset, Iteration, Metric, Position, ProcessStep, Project } from "@/content/types";
import { getT } from "@/i18n/server";
import { categories } from "@/lib/category";
import { cn } from "@/lib/cn";
import ArchitectureDiagram from "./architecture-diagram";
import BackLink from "./back-link";
import InfraDiagram from "./infra-diagram";
import FlowCompare from "./flow-compare";

type CaseStudyProps = {
  project: Project;
  positions: Position[];
};

/**
 * 프로젝트 상세 템플릿
 * 포트폴리오 PDF와 같은 순서: Overview → Problem & Hypothesis → Action → Result → 실패 분석 · 개선 → 재결과
 */
export default function CaseStudy({ project, positions }: CaseStudyProps) {
  const t = getT();
  const accent = categories[project.category];
  // 상단 메타는 팀 구성만 (역할 · 기간 · 소속 · 하이라이트는 카드와 본문에서 드러나 뺐습니다)
  const team = project.team?.map((m) => `${m.role} ${m.count}`).join(" · ");

  // 가설 · 지표가 없는 프로젝트는 문제 카드만 한 줄로
  const hasHypothesis = Boolean(project.hypothesis || project.metrics);

  let chapter = 0;
  const nextChapter = () => String(++chapter).padStart(2, "0");

  return (
    <main className="pt-header">
      <article>
        {/* Overview */}
        <Container className="flex flex-col gap-8 pt-10 pb-12 md:pt-16">
          {positions[0] && <BackLink fallbackHref={`/${positions[0].id}`} fallbackLabel={`${positions[0].title} ${t.pageSuffix}`} />}
          <div className="flex flex-wrap items-center gap-3">
            <CategoryBadge category={project.category} status={project.status} deployment={project.deployment} />
            <ul className="flex flex-wrap gap-2" aria-label={t.relatedPositions}>
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
              {project.links?.some((l) => l.href.startsWith("/demo/"))
                ? t.localWithDemo
                : t.localNoDemo}
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
          {team && (
            <dl className="flex flex-col gap-1 border-t border-line pt-8">
              <dt className="text-caption uppercase text-subtle">Team</dt>
              <dd className="text-small text-fg">{team}</dd>
            </dl>
          )}
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
          <Chapter
            number={nextChapter()}
            label={hasHypothesis ? "Problem & Hypothesis" : "Problem"}
            title={project.problem.statement}
          >
            <div className={cn("grid gap-4", hasHypothesis && "lg:grid-cols-2")}>
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
          <Chapter number={nextChapter()} label="Action" title={t.chAction}>
            <Steps steps={project.actions} />
          </Chapter>

          {/* Architecture: 코드에서 읽어낸 서비스 구조 */}
          {project.architecture && (
            <Chapter number={nextChapter()} label="Architecture" title={t.chArchitecture}>
              <ArchitectureDiagram architecture={project.architecture} />
            </Chapter>
          )}

          {/* Infrastructure: 배포 · DB · 외부 API */}
          {project.infra && (
            <Chapter number={nextChapter()} label="Infrastructure" title={t.chInfra}>
              <InfraDiagram infra={project.infra} />
            </Chapter>
          )}

          {/* Result */}
          {project.outcome.metrics.length > 0 && (
            <Chapter number={nextChapter()} label="Result" title={project.outcome.verdict ?? t.chResult}>
              <MetricGrid metrics={project.outcome.metrics} />
              {project.outcome.summary && <Text>{project.outcome.summary}</Text>}
            </Chapter>
          )}

          {/* 실패 분석 · 개선 */}
          {project.iterations?.map((it) => (
            <Chapter key={it.verdict} number={nextChapter()} label="Insight-Driven Action" title={it.after.verdict}>
              <IterationBlock iteration={it} accent={accent.text} />
            </Chapter>
          ))}

          {project.gallery && project.gallery.length > 0 && (
            <Chapter number={nextChapter()} label="Gallery" title={t.chGallery}>
              <div className="flex flex-col gap-3 md:gap-4">
                {project.galleryLayout === "wide" ? (
                  <Gallery images={project.gallery} wide />
                ) : (
                  <>
                    <Gallery images={project.gallery.filter((img) => img.wide)} wide />
                    <Gallery images={project.gallery.filter((img) => !img.wide)} />
                  </>
                )}
              </div>
            </Chapter>
          )}

          {project.retrospective && project.retrospective.length > 0 && (
            <Chapter number={nextChapter()} label="Retrospective" title={t.chRetro}>
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
    </main>
  );
}

function Gallery({ images, wide = false }: { images: ImageAsset[]; wide?: boolean }) {
  if (images.length === 0) return null;
  return (
    <ul className={cn("grid gap-3 md:gap-4", wide ? "sm:grid-cols-2" : "grid-cols-2 md:grid-cols-3")}>
      {images.map((img) => (
        <li key={img.src} className="flex flex-col gap-2">
          <div
            className={cn(
              "relative overflow-hidden rounded-card bg-surface",
              wide ? "aspect-[16/10] border border-line" : "aspect-[4/5]",
            )}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={wide ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
              className={wide ? "object-cover object-top" : "object-contain"}
            />
          </div>
          {img.caption && <p className="text-caption text-subtle">{img.caption}</p>}
        </li>
      ))}
    </ul>
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
      {evidence.source && <p className="text-caption text-subtle">{getT().source} · {evidence.source}</p>}
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
          <h3 className="text-h3 font-semibold text-fg text-balance">{step.title}</h3>
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
              {getT().artifact} · <span className="text-muted">{step.artifact}</span>
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
  const failed = Boolean(iteration.failed);
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card label="Conclusion">
          <p className={cn("text-h3 font-semibold text-balance", failed ? "text-ai" : "text-fg")}>{iteration.verdict}</p>
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
        <p className="text-small font-medium text-fg">{getT().improveAction}</p>
        <Steps steps={iteration.actions} />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-small font-medium text-fg">{getT().remeasured}</p>
        <MetricGrid metrics={iteration.after.metrics} />
        {iteration.after.note && <p className="text-caption text-subtle">{iteration.after.note}</p>}
      </div>
    </div>
  );
}
