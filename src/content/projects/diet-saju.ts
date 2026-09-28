import type { Project } from "../types";

export const dietSaju: Project = {
  slug: "diet-saju",
  title: "다이어트 사주",
  subtitle: "사주로 읽는 나의 기질과 생활 습관, Gemini 기반 분석 서비스",
  summary:
    "생년월일시로 사주 원국을 계산하고 Gemini로 해석문을 만드는 서비스입니다. 틀리면 안 되는 사주 계산은 코드가, 문장 생성만 LLM이 맡도록 경계를 나눴습니다.",
  cardPoints: [
    "생년월일시로 사주 원국을 계산하고 Gemini로 해석문 생성",
    "틀리면 안 되는 계산은 코드가, 문장 생성만 LLM이 맡도록 분리",
  ],
  category: "ai",
  deployment: "live",
  positions: ["ai-product-builder"],
  role: "기획 · 개발 (1인)",
  period: "2026.08",
  affiliation: "personal",
  organization: "사이드 프로젝트 · 다시(DASII)",
  tags: ["Next.js", "TypeScript", "Gemini API", "Vitest"],
  thumbnail: { src: "/projects/diet-saju/cover.webp", alt: "다이어트 사주 첫 화면" },
  highlights: [
    "사주 계산(간지 · 오행 · 십신)은 코드로, 해석문 생성만 LLM으로",
    "진태양시 · 서머타임 · 표준자오선 보정까지 반영한 만세력 계산",
    "계산 결과를 Vitest로 교차 검증, IP 기준 분당 요청 제한",
    "커밋 101개",
  ],
  problem: {
    statement: "LLM에게 사주 계산까지 맡기면 결과가 매번 달라지고 틀릴 수 있습니다",
  },
  actions: [
    {
      title: "계산과 해석의 경계 나누기",
      description: "만세력 계산 · 오행 강약 · 대운과 세운은 순수 함수로 만들고, LLM에는 계산 결과만 넘겨 풀이 문장을 쓰게 했습니다.",
      artifact: "lib/saju, lib/prompt.ts",
    },
    {
      title: "계산 검증",
      description: "절기 기준 만세력 계산을 테스트로 교차 검증하고, 검증 결과와 한계를 문서로 남겼습니다.",
      artifact: "saju-validation.md",
    },
    {
      title: "키 보호와 요청 제한",
      description: "Gemini 키는 서버 API에서만 쓰고, IP 기준 분당 요청 수를 제한했습니다.",
    },
  ],
  architecture: {
    stages: [
      { title: "풀이 유형 선택", items: ["유형별 풀이 페이지"], kind: "screen" },
      { title: "입력", items: ["생년월일시 · 출생지", "입력값은 메모리에만 보관"], tech: ["zod"], kind: "screen" },
      {
        title: "사주 계산",
        items: ["만세력 → 원국", "진태양시 · 서머타임 보정", "오행 강약 · 대운 · 세운"],
        tech: ["lunar-javascript"],
        kind: "system",
      },
      { title: "해석 생성", items: ["계산 결과로 프롬프트 구성", "분당 요청 제한"], tech: ["Gemini"], kind: "system" },
      { title: "결과", items: ["원국 + 풀이"], kind: "screen" },
    ],
    caption: "diet-saju 저장소 코드 기준",
  },
  outcome: { metrics: [] },
  links: [
    { label: "서비스", href: "https://diet-saju.vercel.app" },
    { label: "GitHub", href: "https://github.com/uwol-is-june/diet-saju" },
  ],
};
