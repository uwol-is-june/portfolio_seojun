import type { Metadata } from "next";
import ResponsiveHoverImageReveal from "@/components/home/responsive-hover-image-reveal";
import { siteMetadata } from "@/components/layout/site-shell";
import Reveal from "@/components/motion/reveal";
import { ProjectVisual } from "@/components/project/project-card";
import { ButtonLink } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Link from "@/components/ui/locale-link";
import Section from "@/components/ui/section";
import type { Category } from "@/content/types";
import { localizePath, type Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/request";
import { getT } from "@/i18n/server";
import { categories, categoryLabel } from "@/lib/category";
import { cn } from "@/lib/cn";
import { getPositions, getProfile, getProjects } from "@/lib/content";
import { languageAlternates } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const locale = getLocale();
  const url = localizePath("/", locale);
  // openGraph는 통째로 덮어써지므로 레이아웃 값을 이어받고 주소만 더합니다.
  return { alternates: { canonical: url, languages: languageAlternates("/") }, openGraph: { ...siteMetadata(locale).openGraph, url } };
}

/** 홈에만 쓰는 문구 (핵심 숫자 · 구분 소개) */
const homeText: Record<Locale, { numbers: { value: string; label: string; note: string }[]; groups: { category: Category; title: string; description: string }[] }> = {
  ko: {
    numbers: [
      { value: "2,490만 원", label: "지원사업 수주", note: "포도상점 · 지원사업 6개" },
      { value: "1,595,000원", label: "창업 실매출", note: "포도상점 거래 13건" },
      { value: "6회", label: "수상", note: "데모데이 최우수상 외" },
      { value: "+21.0%", label: "실투자 수익률", note: "서학개미클럽 추천 종목" },
    ],
    groups: [
      { category: "collab", title: "협업을 좋아해서", description: "12인 팀으로 앱을 출시하고 데모데이 최우수상을 받았습니다." },
      { category: "startup", title: "창업을 해버린", description: "직접 팀을 꾸려 MVP부터 출시, 초기 그로스까지 주도했습니다." },
      { category: "ai", title: "AI PM", description: "AI 서비스를 기획하고, 직접 만들어 실제로 검증합니다." },
    ],
  },
  en: {
    numbers: [
      { value: "KRW 24.9M", label: "Startup grants won", note: "Podo Store · 6 programs" },
      { value: "KRW 1.6M", label: "Startup revenue", note: "13 Podo Store transactions" },
      { value: "6", label: "Awards", note: "Incl. Demo Day grand prize" },
      { value: "+21.0%", label: "Real-money return", note: "Seohak Gaemi Club picks" },
    ],
    groups: [
      { category: "collab", title: "Loves collaboration", description: "Shipped an app with a 12-person team and won the Demo Day grand prize." },
      { category: "startup", title: "Founded a startup", description: "Built my own team and led everything from MVP to launch and early growth." },
      { category: "ai", title: "AI PM", description: "I plan AI services, build them myself, and validate them in real use." },
    ],
  },
};

export default function Home() {
  const locale = getLocale();
  const t = getT();
  const profile = getProfile();
  const positions = getPositions();
  const projects = getProjects();
  const { numbers, groups } = homeText[locale];
  // 홈 메뉴: 포지션 3개가 각 포지션 페이지로 연결됩니다.
  const items = positions.reduce<Record<string, unknown>>(
    (acc, p, i) => ({
      ...acc,
      [`item${i + 1}`]: { text: p.shortTitle, image: p.cover, link: localizePath(`/${p.id}`, locale) },
    }),
    { itemCount: positions.length },
  );

  return (
    <main>
      {/* 첫 화면: 포지션 메뉴 + 한 줄 소개 */}
      <section className="flex h-dvh w-full flex-col">
        <nav aria-label={t.positionsNav} className="min-h-0 flex-1 pt-header">
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
              <span className="text-collab">{t.heroCollab}</span>
              {t.heroMid1}
              <span className="text-startup">{t.heroStartup}</span>
              {t.heroMid2}
              <span className="text-ai">AI</span> PM {profile.name}
            </h1>
            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink href="/about" size="sm">
                {t.aboutCareer}
              </ButtonLink>
              <ButtonLink href={profile.resume.href} size="sm" variant="secondary">
                {t.resumePdf}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 숫자 */}
      <Section bordered aria-label={t.keyNumbers}>
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
          {t.homeProjectsTitle}
        </Heading>
        <div className="mt-12 flex flex-col gap-16">
          {groups.map((g) => {
            // 홈에는 구분별 대표 프로젝트만. 전체 목록은 각 포지션 페이지에 있습니다.
            const list = projects.filter((p) => p.category === g.category && p.featured);
            const c = categories[g.category];
            return (
              <Reveal key={g.category} className="grid gap-6 lg:grid-cols-[1fr_2.5fr] lg:gap-12">
                <div className="flex flex-col gap-2">
                  <p className={cn("text-caption font-semibold uppercase", c.text)}>{categoryLabel(g.category, t)}</p>
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
                            {p.deployment === "local" && (
                              <span className="ml-2 text-caption font-normal text-subtle">{t.local}</span>
                            )}
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
