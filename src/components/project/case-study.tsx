import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Tag from "@/components/ui/tag";
import Text from "@/components/ui/text";
import type { Position, Project } from "@/content/types";

type CaseStudyProps = {
  project: Project;
  positions: Position[];
  prev?: Project;
  next?: Project;
};

/**
 * 프로젝트 상세(케이스 스터디) 템플릿 (TASK-18)
 * 순서: 제목 · 메타 → 대표 이미지 → 개요 → 문제 → 과정 → 결과 → 회고 → 이전/다음
 */
export default function CaseStudy({ project, positions, prev, next }: CaseStudyProps) {
  const meta = [
    { label: "Role", value: project.role },
    { label: "Period", value: project.period },
    { label: "Team", value: project.team },
    { label: "Organization", value: project.organization },
  ].filter((m): m is { label: string; value: string } => Boolean(m.value));

  return (
    <main className="pt-header">
      <article>
        {/* 제목과 메타 */}
        <Container className="flex flex-col gap-8 pt-16 pb-12 md:pt-24">
          <ul className="flex flex-wrap gap-2" aria-label="관련 포지션">
            {positions.map((p) => (
              <li key={p.id}>
                <Link href={`/${p.id}`}>
                  <Tag variant="solid" className="transition-colors hover:bg-line-strong">
                    {p.title}
                  </Tag>
                </Link>
              </li>
            ))}
          </ul>
          <h1 className="max-w-4xl text-h1 font-semibold text-fg text-balance">{project.title}</h1>
          <Text size="lg" className="max-w-prose">
            {project.summary}
          </Text>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-8 md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="flex flex-col gap-1">
                <dt className="text-caption uppercase text-subtle">{m.label}</dt>
                <dd className="text-small text-fg">{m.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="flex flex-wrap gap-2" aria-label="키워드">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        </Container>

        {/* 대표 이미지 */}
        <Container>
          <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-surface md:aspect-[21/9]">
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

        <Container size="prose" className="flex flex-col gap-section py-section">
          <Chapter label="Overview" title="개요">
            <Text size="lg">{project.overview}</Text>
          </Chapter>

          <Chapter label="Problem" title="문제">
            <p className="border-l-2 border-fg pl-5 text-h3 font-medium text-fg text-balance">
              {project.problem.statement}
            </p>
            <ul className="flex flex-col gap-3">
              {project.problem.points.map((point) => (
                <li key={point} className="flex gap-3 text-body text-muted">
                  <span aria-hidden className="text-subtle">
                    —
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Chapter>

          <Chapter label="Process" title="과정">
            <ol className="flex flex-col gap-10">
              {project.process.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-x-2">
                  <span className="font-mono text-small text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-h3 font-semibold text-fg">{step.title}</h3>
                    <Text>{step.description}</Text>
                    {step.artifact && (
                      <p className="text-small text-subtle">
                        산출물 · <span className="text-muted">{step.artifact}</span>
                      </p>
                    )}
                    {step.image && (
                      <div className="relative mt-2 aspect-[4/3] overflow-hidden rounded-card bg-surface">
                        <Image
                          src={step.image.src}
                          alt={step.image.alt}
                          fill
                          sizes="(min-width: 768px) 640px, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Chapter>

          <Chapter label="Outcome" title="결과">
            <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
              {project.outcome.metrics.map((m) => (
                <li key={m.label} className="flex flex-col gap-2 bg-bg p-6 sm:odd:last:col-span-2">
                  <span className="text-caption uppercase text-subtle">{m.label}</span>
                  <span className="text-h2 font-semibold text-fg">{m.value}</span>
                  {m.description && <span className="text-small text-muted">{m.description}</span>}
                </li>
              ))}
            </ul>
            <Text size="lg">{project.outcome.summary}</Text>
          </Chapter>

          <Chapter label="Retrospective" title="회고">
            <ul className="flex flex-col gap-4">
              {project.retrospective.map((r) => (
                <li key={r} className="rounded-card bg-surface p-5 text-body text-muted">
                  {r}
                </li>
              ))}
            </ul>
          </Chapter>

          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.links.map((l) => (
                <ButtonLink key={l.label} href={l.href} variant="secondary">
                  {l.label}
                </ButtonLink>
              ))}
            </div>
          )}
        </Container>
      </article>

      {/* 이전 / 다음 프로젝트 */}
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

function Chapter({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-caption uppercase text-subtle">{label}</p>
          <h2 className="text-h2 font-semibold text-fg">{title}</h2>
        </div>
        {children}
      </section>
    </Reveal>
  );
}

function AdjacentLink({ project, direction }: { project: Project; direction: "prev" | "next" }) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={
        "group flex flex-col gap-2 py-10 md:py-14 " +
        (isNext ? "border-t border-line md:border-t-0 md:border-l md:pl-10 md:text-right" : "md:pr-10")
      }
    >
      <span className="text-caption uppercase text-subtle">{isNext ? "Next Project →" : "← Previous Project"}</span>
      <span className="text-h3 font-semibold text-muted transition-colors group-hover:text-fg">{project.title}</span>
    </Link>
  );
}
