import type { Project } from "../types";

export const devtier: Project = {
  slug: "devtier",
  title: "DevTier",
  subtitle: "GitHub 잔디로 측정하는 개발자 전투력 · 티어",
  summary:
    "GitHub 공개 활동 데이터를 모아 개발자 전투력 점수와 티어를 매기는 서비스입니다. 평가 지표와 점수 공식을 직접 정의하고, README에 붙이는 티어 뱃지와 랭킹 · 비교 기능까지 만들었습니다.",
  cardPoints: [
    "GitHub 공개 활동으로 개발자 점수와 티어를 매기는 서비스",
    "평가 지표와 점수 공식을 직접 정의",
    "README 티어 뱃지 · 랭킹 · 유저 비교 기능 제공",
  ],
  category: "ai",
  deployment: "live",
  positions: ["ai-product-builder"],
  role: "기획 · 개발 (1인)",
  period: "2026.04 – 2026.07",
  affiliation: "personal",
  organization: "사이드 프로젝트",
  tags: ["Next.js", "Supabase", "GitHub GraphQL API", "GitHub Actions"],
  thumbnail: { src: "/projects/devtier/cover.webp", alt: "DevTier 첫 화면" },
  highlights: [
    "잔디 수 · 스트릭 · 밀도 · 피크 · 스타로 점수 공식 직접 정의",
    "한국 개발자 백분위 기준 챌린저 ~ 브론즈 티어, README 뱃지(SVG)",
    "유저 비교 · 언어별 랭킹 · 봇 계정 탐지 · 약점 레이더 차트",
    "v0.4.37까지 운영, 커밋 69개",
  ],
  problem: {
    statement: "백준 온라인 저지 종료 이후, 개발자가 꾸준함을 보여줄 지표가 마땅치 않았습니다",
  },
  actions: [
    {
      title: "평가 지표 설계",
      description: "단기 몰아치기보다 꾸준함이 유리하도록 스트릭과 잔디 밀도에 높은 가중치를 두고, 스타 수는 로그 스케일로 반영했습니다.",
      artifact: "lib/score.ts, lib/tier.ts",
    },
    {
      title: "수집 자동화",
      description: "GitHub GraphQL API로 활동 데이터를 모으고, GitHub Actions 배치로 유저 점수를 갱신합니다.",
      artifact: ".github/workflows/batch.yml",
    },
    {
      title: "공유와 성장 장치",
      description: "README 뱃지, 티어 카드 다운로드, 유저 비교, 점수 개선 조언으로 다시 찾아올 이유를 만들었습니다.",
    },
  ],
  architecture: {
    stages: [
      { title: "검색 · 로그인", items: ["GitHub 아이디 입력", "GitHub 로그인"], kind: "screen" },
      { title: "데이터 수집", items: ["최근 1년 잔디 · 스트릭 · 스타"], tech: ["GitHub GraphQL"], kind: "system" },
      { title: "점수 · 티어 계산", items: ["전투력 공식", "백분위 → 티어", "봇 계정 패널티"], kind: "system" },
      { title: "저장 · 배치", items: ["유저 점수 · 기록 저장", "정기 배치 갱신"], tech: ["Supabase", "GitHub Actions"], kind: "store" },
      { title: "결과 · 공유", items: ["결과 · 비교 · 랭킹", "SVG 뱃지 · 티어 카드"], kind: "screen" },
    ],
    extras: ["업적 시스템", "한국어 · 영어"],
    caption: "devtier 저장소 코드 기준",
  },
  outcome: { metrics: [] },
  galleryLayout: "wide",
  gallery: [
    { src: "/projects/devtier/cover.webp", alt: "DevTier 첫 화면", caption: "첫 화면 · GitHub 아이디로 측정" },
    { src: "/projects/devtier/screen-result.webp", alt: "DevTier 결과 화면: 티어와 전투력 점수", caption: "결과 · 티어와 전투력" },
  ],
  links: [
    { label: "서비스", href: "https://devtier-brown.vercel.app" },
    { label: "GitHub", href: "https://github.com/uwol-is-june/devtier" },
  ],
};
