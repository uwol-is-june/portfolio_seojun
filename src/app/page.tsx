import type { Metadata } from "next";
import ResponsiveHoverImageReveal from "@/components/home/responsive-hover-image-reveal";
import { ButtonLink } from "@/components/ui/button";
import { positions } from "@/content/positions";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// 홈 메뉴: 포지션 3개가 각 포지션 페이지로 연결됩니다. (TASK-13)
const items = positions.reduce<Record<string, unknown>>(
  (acc, p, i) => ({
    ...acc,
    [`item${i + 1}`]: { text: p.shortTitle, image: p.cover, link: `/${p.id}` },
  }),
  { itemCount: positions.length },
);

export default function Home() {
  return (
    <main className="flex h-dvh w-full flex-col">
      <h1 className="sr-only">{profile.headline}</h1>
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
          <p className="max-w-md text-small text-muted text-pretty md:text-body">{profile.headline}</p>
          <div className="flex shrink-0 gap-3">
            <ButtonLink href="/about" size="sm">
              About · 이력서
            </ButtonLink>
            <ButtonLink href="/projects/portfolio-site" size="sm" variant="secondary">
              이 사이트 제작기
            </ButtonLink>
          </div>
        </div>
      </div>
    </main>
  );
}
