import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Text from "@/components/ui/text";
import { cardnewsDemo } from "@/content/cardnews-demo";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "카드뉴스 에이전트 데모",
  description: "카드뉴스 한 편이 원고 → 규칙 검사 → GPT 읽기 검사 → 사람 검토 → 렌더를 거쳐 만들어지는 과정을 실제 결과물로 보여줍니다.",
  path: "/demo/cardnews",
});

type Who = "me" | "claude" | "gpt";
const who: Record<Who, { label: string; className: string }> = {
  me: { label: "사람", className: "border-collab/60 text-collab" },
  claude: { label: "Claude Code", className: "border-ai/60 text-ai" },
  gpt: { label: "GPT", className: "border-startup/60 text-startup" },
};

/** 카드뉴스 에이전트: 무가당 편 한 편이 만들어지는 과정 */
export default function CardnewsDemoPage() {
  const d = cardnewsDemo;
  return (
    <main className="pt-header break-keep">
      {/* 소개 */}
      <Container className="grid gap-10 pt-16 pb-section md:grid-cols-[1.3fr_1fr] md:items-center md:pt-24">
        <div className="flex flex-col gap-6">
          <p className="text-caption font-medium uppercase text-muted">Cardnews Agent · Demo</p>
          <h1 className="text-h1 font-semibold text-fg text-balance">카드뉴스 한 편은 이렇게 만들어집니다</h1>
          <Text size="lg">
            &lsquo;다시(DASII)&rsquo; 인스타그램에 {d.episode.date}에 발행한 무가당 편으로, 주제를 정하는 순간부터 카드 7장이
            나오기까지를 따라갑니다. 글은 사람이 쓰고, 검사와 렌더는 에이전트가 맡습니다.
          </Text>
          <dl className="flex gap-8">
            {d.episode.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dt className="text-caption uppercase text-subtle">{s.label}</dt>
                <dd className="text-h3 font-semibold text-fg">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/projects/cardnews-agent" size="sm">
              케이스 스터디
            </ButtonLink>
            <ButtonLink href="https://github.com/uwol-is-june/cardnews-agent" size="sm" variant="secondary">
              GitHub ↗
            </ButtonLink>
          </div>
        </div>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-card bg-surface">
          <Image src={d.episode.cover} alt={d.episode.title} fill priority sizes="(min-width: 768px) 384px, 100vw" className="object-cover" />
        </div>
      </Container>

      {/* 과정 */}
      <ol className="border-t border-line">
        <Step n={1} title="주제 · 야마 한 문장" who="me" note="사용자가 통과시켜야 다음으로 넘어갑니다">
          <blockquote className="rounded-card border border-line bg-surface p-6 text-body-lg text-fg">{d.plan.thesis}</blockquote>
        </Step>

        <Step n={2} title="장별 골격" who="me" note="문구를 쓰기 전에 장마다 할 말을 한 줄씩 정합니다">
          <ol className="grid gap-2 sm:grid-cols-2">
            {d.plan.skeleton.map((line, i) => (
              <li key={line} className="flex gap-3 rounded-sm bg-surface px-4 py-3 text-small text-fg">
                <span className="font-mono text-caption text-subtle">{String(i + 1).padStart(2, "0")}</span>
                {line}
              </li>
            ))}
          </ol>
        </Step>

        <Step n={3} title="원고는 cards.json 한 벌" who="claude" note="글은 데이터로, 스타일 · 폰트는 모든 편이 공유하는 템플릿으로">
          <div className="grid gap-4 md:grid-cols-[1.4fr_1fr] md:items-start">
            <pre className="overflow-x-auto rounded-card border border-line bg-surface p-5 font-mono text-caption leading-relaxed text-muted">
              <code>{d.manuscript.json}</code>
            </pre>
            <figure className="flex flex-col gap-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface">
                <Image src={d.manuscript.image} alt="위 JSON으로 렌더된 3번째 카드" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="text-caption text-subtle">↑ 왼쪽 JSON이 렌더된 03번 카드</figcaption>
            </figure>
          </div>
        </Step>

        <Step n={4} title="규칙 검사 · check-text" who="claude" note="기계로 셀 수 있는 규칙만 스크립트가 렌더 전에 막습니다">
          <ul className="grid gap-2 sm:grid-cols-2">
            {d.checkRules.map((r) => (
              <li key={r.rule} className="flex items-center gap-3 rounded-sm border border-line px-4 py-3 text-small text-fg">
                <span
                  className={cn(
                    "rounded-pill px-2 py-0.5 font-mono text-caption",
                    r.kind === "fail" ? "bg-ai/15 text-ai" : "bg-surface-raised text-muted",
                  )}
                >
                  {r.kind === "fail" ? "✗ 고침" : "△ 판단"}
                </span>
                {r.rule}
              </li>
            ))}
          </ul>
        </Step>

        <Step n={5} title="GPT 읽기 검사 · read-text" who="gpt" note="GPT는 고쳐 쓰지 않고, 소리 내어 읽다 걸리는 자리만 짚습니다">
          <BeforeAfterList items={d.readText} />
        </Step>

        <Step n={6} title="사람 검토 · 심의" who="me" note="두 검사를 통과해도 사람이 되돌린 자리는 규칙 문서로 올라갑니다">
          <BeforeAfterList items={d.review} />
          <p className="text-small text-muted">{d.reviewNote}</p>
        </Step>

        <Step n={7} title="렌더 · 발행" who="claude" note="Headless 브라우저로 1080×1350 PNG와 인스타그램 캡션을 한 번에 만듭니다">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {d.render.cards.map((c) => (
              <li key={c.src} className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface">
                <Image src={c.src} alt={c.alt} fill sizes="(min-width: 1024px) 14vw, (min-width: 640px) 25vw, 50vw" className="object-cover" />
              </li>
            ))}
          </ul>
          <pre className="whitespace-pre-wrap rounded-card border border-line bg-surface p-5 font-sans text-small leading-relaxed text-muted">
            {d.render.caption}
          </pre>
        </Step>
      </ol>

      {/* 결과 */}
      <section className="border-t border-line py-section">
        <Container className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div className="flex flex-col gap-4">
            <Heading eyebrow="Result">같은 과정으로 9월에만 14편</Heading>
            <Text>9/05부터 9/18까지 14편 89장을 이 순서로 만들었고, 8월분까지 &lsquo;다시&rsquo; 인스타그램에 20편을 운영하고 있습니다.</Text>
          </div>
          <Reveal className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-surface">
            <Image src={d.covers.src} alt={d.covers.alt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-contain" />
          </Reveal>
        </Container>
      </section>
    </main>
  );
}

function Step({
  n,
  title,
  who: w,
  note,
  children,
}: {
  n: number;
  title: string;
  who: Who;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <li className="border-b border-line py-14 md:py-20">
      <Container className="grid gap-6 md:grid-cols-[16rem_1fr] md:gap-12">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-caption text-subtle">STEP {String(n).padStart(2, "0")}</span>
          <h2 className="text-h3 font-semibold text-fg">{title}</h2>
          <span className={cn("w-fit rounded-pill border px-2.5 py-0.5 text-caption", who[w].className)}>{who[w].label}</span>
          <p className="text-small text-subtle">{note}</p>
        </div>
        <Reveal className="flex min-w-0 flex-col gap-4">{children}</Reveal>
      </Container>
    </li>
  );
}

function BeforeAfterList({ items }: { items: { before: string; after: string; why: string }[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((it) => (
        <li key={it.before} className="grid gap-3 rounded-card border border-line p-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <span className="text-caption uppercase text-subtle">Before</span>
            <span className="text-small text-muted line-through decoration-ai/60">{it.before}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-caption uppercase text-collab">After</span>
            <span className="text-small text-fg">{it.after}</span>
          </div>
          <p className="text-caption text-subtle sm:col-span-2">짚은 이유 · {it.why}</p>
        </li>
      ))}
    </ul>
  );
}
