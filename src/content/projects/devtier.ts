import type { Project } from "../types";

export const devtier: Project = {
  slug: "devtier",
  title: "DevTier",
  subtitle: "GitHub 로그인 한 번으로 보는 한국 개발자 중 내 순위 · 상위 %",
  summary:
    "GitHub Actions가 매주 한국 개발자 2,742명의 GitHub 활동 데이터를 모아 둡니다. 로그인만 하면 내 활동을 같은 공식으로 계산해, 한국 개발자 중 몇 등인지 · 상위 몇 %인지와 티어를 바로 보여줍니다. 평가 지표와 점수 공식은 직접 정의했습니다.",
  cardPoints: [
    "한국 개발자 2,742명 데이터를 GitHub Actions로 매주 수집",
    "로그인만 하면 내 순위 · 상위 % · 티어를 바로 산출",
    "평가 지표 9종과 점수 공식을 직접 정의",
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
    "한국 개발자 2,742명 데이터를 GitHub Actions로 매주 자동 수집",
    "로그인 한 번으로 한국 개발자 중 순위 · 상위 % 산출",
    "잔디 · 스트릭 · 밀도 · 피크 · 스타 등 지표 9종으로 점수 공식 직접 정의",
    "상위 100명 챌린저 · 백분위 기준 다이아 ~ 브론즈 티어, README 뱃지(SVG)",
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
      title: "비교 기준 데이터 수집",
      description: "GitHub 검색으로 한국 · 서울 지역 개발자를 찾아 모으고, GitHub Actions 주간 배치가 GraphQL API로 활동 데이터와 점수 · 티어를 갱신합니다. 현재 2,742명이 비교 기준입니다.",
      artifact: ".github/workflows/batch.yml",
    },
    {
      title: "로그인하면 바로 내 순위",
      description: "GitHub로 로그인하면 내 활동을 같은 공식으로 즉시 계산하고, 수집된 한국 개발자와 비교해 순위 · 상위 % · 티어를 보여준 뒤 랭킹에 합류시킵니다.",
      artifact: "lib/getScoreData.ts",
    },
    {
      title: "공유와 성장 장치",
      description: "README 뱃지, 티어 카드 다운로드, 유저 비교, 점수 개선 조언으로 다시 찾아올 이유를 만들었습니다.",
    },
  ],
  architecture: {
    stages: [
      { title: "주간 배치 수집", items: ["한국 개발자 검색 · 수집", "매주 점수 · 티어 갱신"], tech: ["GitHub Actions", "GitHub GraphQL"], kind: "system" },
      { title: "비교 기준 저장", items: ["한국 개발자 2,742명", "점수 · 백분위 · 기록"], tech: ["Supabase"], kind: "store" },
      { title: "GitHub 로그인", items: ["로그인 또는 아이디 입력"], kind: "screen" },
      { title: "점수 · 순위 계산", items: ["지표 9종 → 전투력", "한국 개발자 중 순위 · 상위 %", "봇 계정 패널티"], kind: "system" },
      { title: "결과 · 공유", items: ["순위 · 상위 % · 티어", "SVG 뱃지 · 티어 카드"], kind: "screen" },
    ],
  },
  infra: {
    client: [
      { name: "Next.js 웹", note: "랭킹 · 결과 · 비교 화면" },
      { name: "SVG 뱃지", note: "README에 붙는 티어 이미지" },
    ],
    runtime: [
      { name: "Vercel", note: "웹 · API 라우트 배포" },
      { name: "GitHub Actions", note: "주 1회 수집 · 점수 · 티어 배치" },
    ],
    data: [
      { name: "Supabase", note: "Postgres · GitHub 로그인(Auth)" },
      { name: "GitHub GraphQL API", note: "잔디 · 스타 · PR 데이터" },
    ],
  },
  outcome: {
    metrics: [
      { label: "수집한 한국 개발자", value: "2,742명", description: "GitHub Actions 주간 배치 · 배포 사이트 기준" },
      { label: "점수 지표", value: "9종" },
      { label: "갱신 주기", value: "주 1회" },
    ],
  },
  galleryLayout: "wide",
  gallery: [
    { src: "/projects/devtier/cover.webp", alt: "DevTier 첫 화면", caption: "첫 화면 · GitHub 아이디로 측정" },
    { src: "/projects/devtier/screen-result.webp", alt: "DevTier 결과 화면: 티어와 전투력 점수", caption: "결과 · 티어와 전투력" },
    { src: "/projects/devtier/screen-radar.webp", alt: "결과 화면의 약점 분석 레이더와 점수 추이", caption: "결과 · 약점 분석과 점수 추이" },
    { src: "/projects/devtier/screen-ranking.webp", alt: "한국 개발자 전체 랭킹 표", caption: "전체 랭킹 · 한국 개발자 2,742명" },
    { src: "/projects/devtier/screen-status.webp", alt: "운영 현황: 수집 인원 · 갱신 주기와 티어 분포", caption: "운영 현황 · 티어 분포와 점수 공식" },
    { src: "/projects/devtier/screen-features.webp", alt: "핵심 기능: 티어 시스템 · 전투력 알고리즘 · README 뱃지", caption: "핵심 기능 · 티어 · 전투력 · README 뱃지" },
  ],
  links: [
    { label: "Web", href: "https://devtier-brown.vercel.app" },
    { label: "GitHub", href: "https://github.com/uwol-is-june/devtier" },
  ],
};
