import type { Metadata } from "next";
import Link from "next/link";
import ResponsiveHoverImageReveal from "@/components/home/responsive-hover-image-reveal";
import Reveal from "@/components/motion/reveal";
import { ProjectVisual } from "@/components/project/project-card";
import { ButtonLink } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import { positions } from "@/content/positions";
import { profile } from "@/content/profile";
import type { Category } from "@/content/types";
import { categories } from "@/lib/category";
import { cn } from "@/lib/cn";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// 홈 메뉴: 포지션 3개가 각 포지션 페이지로 연결됩니다.
const items = positions.reduce<Record<string, unknown>>(
  (acc, p, i) => ({
    ...acc,
    [`item${i + 1}`]: { text: p.shortTitle, image: p.cover, link: `/${p.id}` },
  }),
  { itemCount: positions.length },
);

const numbers = [
  { value: "2,490만 원", label: "지원사업 수주", note: "포도상점 · 지원사업 6개" },
  { value: "1,595,000원", label: "창업 실매출", note: "포도상점 거래 13건" },
  { value: "6회", label: "수상", note: "데모데이 최우수상 외" },
  { value: "+21.0%", label: "실투자 수익률", note: "서학개미클럽 추천 종목" },
];

const groups: { category: Category; title: string; description: string }[] = [
  { category: "collab", title: "협업을 좋아해서", description: "12인 팀으로 앱을 출시하고 데모데이 최우수상을 받았습니다." },
  { category: "startup", title: "창업을 해버린", description: "직접 팀을 꾸려 MVP부터 출시, 초기 그로스까지 주도했습니다." },
  { category: "ai", title: "AI PM", description: "AI 서비스를 기획하고, 직접 만들어 실제로 검증합니다." },
];

export default function Home() {
  const projects = getProjects();

  return (
    <main>
      {/* 첫 화면: 포지션 메뉴 + 한 줄 소개 */}
      <section className="flex h-dvh w-full flex-col">
        <nav aria-label="지원 포지션" className="min-h-0 flex-1 pt-header">
          <ResponsiveHoverImageReveal
            items={items}
            maxFontSize={96}
            textColor="var(--color-fg)"
            dimColor="var(--color-dim)"
            backgroundColor="var(--color-bg)"
          />
        </nav>
        <div className="px-safe pb-safe">
          <div className="mx-auto flex w-full max-w-page flex-col gap-5 border-t border-line px-gutter py-6 md:flex-row md:items-center md:justify-between md:py-8">
            <h1 className="text-h3 font-semibold text-fg text-balance">
              <span className="text-collab">협업</span>을 좋아해서 <span className="text-startup">창업</span>을 해버린{" "}
              <span className="text-ai">AI</span> PM {profile.name}
            </h1>
            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink href="/about" size="sm">
                About · 경력
              </ButtonLink>
              <ButtonLink href={profile.resume.href} size="sm" variant="secondary">
                이력서 PDF
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 숫자 */}
      <Section bordered aria-label="핵심 성과">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {numbers.map((n) => (
            <li key={n.label} className="flex flex-col gap-2">
              <span className="text-caption uppercase text-subtle">{n.label}</span>
              <span className="text-h1 font-semibold text-fg">{n.value}</span>
              <span className="text-small text-muted">{n.note}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 협업 · 창업 · AI */}
      <Section bordered aria-labelledby="projects-heading">
        <Heading id="projects-heading" eyebrow="Projects">
          협업 · 창업 · AI
        </Heading>
        <div className="mt-12 flex flex-col gap-16">
          {groups.map((g) => {
            const list = projects.filter((p) => p.category === g.category);
            const c = categories[g.category];
            return (
              <Reveal key={g.category} className="grid gap-6 lg:grid-cols-[1fr_2.5fr] lg:gap-12">
                <div className="flex flex-col gap-2">
                  <p className={cn("text-caption font-semibold uppercase", c.text)}>{c.label}</p>
                  <h3 className="text-h2 font-semibold text-fg">{g.title}</h3>
                  <p className="text-small text-muted">{g.description}</p>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {list.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/projects/${p.slug}`} className="group flex flex-col gap-3">
                        <ProjectVisual project={p} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
                        <span className="flex flex-col gap-0.5">
                          <span className="text-body font-semibold text-fg group-hover:underline">
                            {p.title}
                            {p.status && <span className="ml-2 text-caption font-normal text-collab">{p.status}</span>}
                          </span>
                          <span className="text-small text-muted">{p.subtitle}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </main>
  );
}
