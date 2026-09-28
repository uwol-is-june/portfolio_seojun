import type { Metadata } from "next";
import { Button, ButtonLink } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Divider from "@/components/ui/divider";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import Tag from "@/components/ui/tag";
import Text from "@/components/ui/text";
import MotionDemo from "./motion-demo";

// 내부용 페이지: 검색엔진에 노출하지 않습니다.
export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "bg", value: "#000000", use: "페이지 배경" },
  { name: "surface", value: "#0e0f10", use: "카드 배경" },
  { name: "surface-raised", value: "#17191b", use: "카드 안 요소, solid 태그" },
  { name: "fg", value: "#ffffff", use: "제목, 강조 텍스트" },
  { name: "muted", value: "#a3a8ad", use: "본문, 보조 텍스트" },
  { name: "subtle", value: "#80868c", use: "캡션, 라벨 (대비 5.7:1)" },
  { name: "dim", value: "#51565a", use: "홈 메뉴 비활성 항목 (장식용)" },
  { name: "line", value: "#232629", use: "구분선, 카드 테두리" },
  { name: "line-strong", value: "#3a3e42", use: "버튼, 태그 테두리" },
  { name: "collab", value: "#12d18e", use: "구분 · 협업 (10.5:1)" },
  { name: "startup", value: "#b18cff", use: "구분 · 창업 (8.1:1)" },
  { name: "ai", value: "#ff4d6d", use: "구분 · AI (6.5:1)" },
];

const typeScale = [
  { token: "text-display", size: "32 → 61px", sample: "PRODUCT MANAGER", className: "text-display uppercase" },
  { token: "text-h1", size: "32 → 48px", sample: "문제를 정의하는 사람", className: "text-h1 font-semibold" },
  { token: "text-h2", size: "24 → 36px", sample: "프로젝트 케이스 스터디", className: "text-h2 font-semibold" },
  { token: "text-h3", size: "18 → 24px", sample: "결과와 회고", className: "text-h3 font-semibold" },
  { token: "text-body-lg", size: "18px", sample: "사용자 문제에서 출발해 지표로 검증합니다.", className: "text-body-lg" },
  { token: "text-body", size: "16px", sample: "사용자 문제에서 출발해 지표로 검증합니다.", className: "text-body" },
  { token: "text-small", size: "14px", sample: "2024.03 – 2024.09 · 6개월", className: "text-small" },
  { token: "text-caption", size: "12px", sample: "CASE STUDY 01", className: "text-caption uppercase" },
];

const spacing = [
  { token: "gutter", value: "24 → 48px", note: "페이지 좌우 여백 (px-gutter)" },
  { token: "section", value: "64 → 128px", note: "섹션 위아래 (py-section)" },
  { token: "header", value: "64px", note: "고정 헤더 높이 (pt-header)" },
];

const radius = [
  { token: "rounded-sm", value: "8px", className: "rounded-sm" },
  { token: "rounded-card", value: "16px", className: "rounded-card" },
  { token: "rounded-pill", value: "9999px", className: "rounded-pill" },
];

const breakpoints = [
  { token: "기본", value: "0 ~ 639px", note: "모바일 (375px 기준으로 작성)" },
  { token: "sm", value: "640px", note: "큰 모바일" },
  { token: "md", value: "768px", note: "태블릿" },
  { token: "lg", value: "1024px", note: "작은 노트북, 헤더 메뉴 펼침" },
  { token: "xl", value: "1280px", note: "컨테이너 최대 폭" },
  { token: "2xl", value: "1440px", note: "데스크톱" },
];

export default function DesignSystemPage() {
  return (
    <main className="pt-header">
      <Container className="pt-16 pb-8">
        <Heading level="h1" eyebrow="Internal">
          Design System
        </Heading>
        <Text size="lg" className="mt-4 max-w-prose">
          포트폴리오 전체에서 쓰는 토큰과 컴포넌트입니다. 값은 <code className="font-mono text-fg">src/app/globals.css</code>의{" "}
          <code className="font-mono text-fg">@theme</code>와 <code className="font-mono text-fg">src/lib/motion.ts</code>에
          있습니다.
        </Text>
      </Container>

      <Section bordered>
        <Heading eyebrow="Tokens">Color</Heading>
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {colors.map((c) => (
            <li key={c.name} className="flex flex-col gap-3">
              <span
                className="aspect-[4/3] rounded-card border border-line"
                style={{ backgroundColor: `var(--color-${c.name})` }}
              />
              <span>
                <span className="block font-mono text-small text-fg">{c.name}</span>
                <span className="block font-mono text-caption text-subtle">{c.value}</span>
                <span className="block text-caption text-muted">{c.use}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section bordered>
        <Heading eyebrow="Tokens">Typography</Heading>
        <Text className="mt-4">영문은 Inter, 한글은 Pretendard로 표시됩니다.</Text>
        <ul className="mt-10 flex flex-col divide-y divide-line">
          {typeScale.map((t) => (
            <li key={t.token} className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-8">
              <span className="w-40 shrink-0 font-mono text-caption text-subtle">
                {t.token}
                <br />
                {t.size}
              </span>
              <span className={`${t.className} min-w-0 break-keep text-fg`}>{t.sample}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section bordered>
        <Heading eyebrow="Tokens">Spacing · Radius · Breakpoint</Heading>
        <div className="mt-10 grid gap-12 lg:grid-cols-3">
          <TokenTable title="Spacing" rows={spacing.map((s) => [s.token, s.value, s.note])} />
          <div className="flex flex-col gap-4">
            <p className="text-caption uppercase text-subtle">Radius</p>
            <ul className="flex gap-4">
              {radius.map((r) => (
                <li key={r.token} className="flex flex-col items-center gap-2">
                  <span className={`size-16 border border-line-strong bg-surface-raised ${r.className}`} />
                  <span className="font-mono text-caption text-muted">{r.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <TokenTable title="Breakpoint" rows={breakpoints.map((b) => [b.token, b.value, b.note])} />
        </div>
      </Section>

      <Section bordered>
        <Heading eyebrow="Tokens">Motion</Heading>
        <div className="mt-10">
          <MotionDemo />
        </div>
      </Section>

      <Section bordered>
        <Heading eyebrow="Components">UI</Heading>
        <div className="mt-10 grid gap-12">
          <Showcase name="Button / ButtonLink">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button size="sm">Small</Button>
              <Button disabled>Disabled</Button>
              <ButtonLink href="/about" variant="secondary">
                About 보기 →
              </ButtonLink>
            </div>
          </Showcase>

          <Showcase name="Tag">
            <div className="flex flex-wrap gap-2">
              <Tag variant="solid">Product Manager</Tag>
              <Tag>Figma</Tag>
              <Tag>SQL</Tag>
              <Tag>A/B Test</Tag>
              <Tag>Next.js</Tag>
            </div>
          </Showcase>

          <Showcase name="Heading / Text">
            <div className="flex flex-col gap-6">
              <Heading level="h2" eyebrow="Case Study 01">
                가입 전환율 18% 개선
              </Heading>
              <Text>
                온보딩 단계에서 이탈이 가장 큰 구간을 찾고, 필수 입력을 줄이는 실험으로 전환율을 개선했습니다.
              </Text>
              <Text size="sm" tone="subtle">
                2024.03 – 2024.09 · PM · 3인 팀
              </Text>
            </div>
          </Showcase>

          <Showcase name="Divider">
            <div className="flex flex-col gap-8">
              <Divider />
              <Divider label="Projects" />
            </div>
          </Showcase>

          <Showcase name="Container / Section">
            <Text size="sm">
              <code className="font-mono text-fg">Container</code>는 최대 1280px(prose는 672px)에 좌우 gutter 여백을,{" "}
              <code className="font-mono text-fg">Section</code>은 Container에 위아래 section 여백과 선택적 상단 구분선을
              더합니다. 이 페이지의 모든 블록이 Section입니다.
            </Text>
          </Showcase>
        </div>
      </Section>
    </main>
  );
}

function TokenTable({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-caption uppercase text-subtle">{title}</p>
      <ul className="flex flex-col divide-y divide-line border-y border-line">
        {rows.map(([token, value, note]) => (
          <li key={token} className="grid grid-cols-[5rem_1fr] gap-x-4 py-3 text-small">
            <span className="font-mono text-fg">{token}</span>
            <span className="text-muted">
              {value}
              <span className="block text-caption text-subtle">{note}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Showcase({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-mono text-caption text-subtle">{name}</p>
      <div className="rounded-card border border-line bg-surface p-6">{children}</div>
    </div>
  );
}
