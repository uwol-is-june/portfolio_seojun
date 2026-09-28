import type { Project } from "../types";

export const mungx5: Project = {
  slug: "mungx5",
  title: "멍멍멍멍멍",
  subtitle: "게이미피케이션 기반 음주 습관 관리 서비스",
  summary:
    "IT 연합동아리 UMC 7기에서 개발자 10명 · 디자이너 1명과 만든 음주 기록 앱입니다. iOS · Android로 정식 출시해 지금도 운영 중이고, 69개 팀 중 데모데이 최우수상을 받았습니다.",
  category: "collab",
  deployment: "live",
  positions: ["service-planner", "product-manager"],
  featured: true,
  status: "운영 중",
  role: "서비스 기획 (PM)",
  period: "2025.01 – 현재",
  organization: "협업 · IT 연합동아리 UMC 7기",
  team: [
    { role: "PM", count: 1 },
    { role: "디자이너", count: 1 },
    { role: "FE", count: 4 },
    { role: "BE", count: 6 },
  ],
  tags: ["게이미피케이션", "PRD", "화면설계서", "OKR 스프린트", "iOS · Android"],
  logo: { src: "/projects/mungx5/logo.webp", alt: "멍멍멍멍멍 앱 아이콘" },
  thumbnail: { src: "/projects/mungx5/cover.webp", alt: "멍멍멍멍멍 앱 화면 목업" },
  highlights: [
    "개발자 10명 · 디자이너 1명과 iOS · Android 정식 출시, 현재 운영 중",
    "데모데이 약 300명 시연 · 만족도 4.83 · NPS 74",
    "69개 팀 중 데모데이 최우수상 · 베스트 파트원상(PLAN)",
  ],
  background: {
    title: "습관화되는 고위험 음주",
    stats: ["성인 월간음주율 58.0%", "연간 음주자의 고위험음주율 17.3% (5년 연속 증가세)"],
    source: "2023 경상북도 정신건강통계 · 국내 음주 현황",
  },
  research: {
    title: "절주 의지는 있지만, 행동으로 이어지지 않음",
    stats: [
      "'술을 줄여야 한다'고 생각하는 비율은 81%, 그러나 절주 시도 비율은 27%",
      "응답자의 72%가 '자신의 음주 빈도를 정확히 모른다'고 응답",
    ],
    source: "2025.01 고위험음주자 86명 대상 설문조사",
  },
  problem: {
    statement: "스스로 마신다고 믿는 양과 실제 음주량 사이의 괴리가 절주 동기를 가로막습니다",
    points: ["음주 빈도에 대한 자기 인식 부족 → 절주 동기 약화"],
  },
  hypothesis:
    "사용자가 음주 패턴을 직접 기록하고 시각적으로 인식하면, 음주 빈도에 대한 '자기 인식(Self-awareness)'이 강화되어 절주 및 금주 시도율이 오를 것이다",
  hypothesisNote: "꾸준한 음주 기록의 동기를 만들기 위해 게이미피케이션 방식을 선택했습니다.",
  metrics: [
    {
      name: "리텐션",
      definitions: ["D1 / D3 / D7 리텐션 → 음주 기록을 통한 절주 시도 여부", "W1 / W2 / W4 리텐션 → 앱 사용 습관 형성 여부"],
    },
    { name: "절주 시도율", definitions: ["음주 기록 후 3~5일 동안 추가 음주 없이 절주를 유지한 사용자 비율"] },
    { name: "절주 목표 달성률", definitions: ["사용자가 설정한 월간 음주 목표 달성률"] },
  ],
  actions: [
    {
      title: "설계",
      description: "사용자 인터뷰로 핵심 기능(음주 기록 · 캘린더 · 월간 리포트)을 도출하고 PRD와 화면설계서를 작성했습니다.",
      artifact: "PRD, 화면설계서",
    },
    {
      title: "운영",
      description: "OKR 기반으로 스프린트를 운영했습니다.",
      points: ["Objectives → KR · Initiative → Epic → 주간 스크럼"],
    },
    {
      title: "협업",
      description: "개발자 10명 · 디자이너 1명, 총 12인 팀의 서비스 기획자로 iOS · Android 정식 출시까지 이끌었습니다.",
    },
  ],
  outcome: {
    verdict: "iOS · Android 정식 출시부터 데모데이 최우수상까지",
    summary: "데모데이에서 약 300명에게 서비스를 시연하고 피드백 설문을 받았습니다.",
    metrics: [
      { label: "사용자 만족도", value: "4.83", description: "데모데이 시연 설문" },
      { label: "NPS", value: "74" },
      { label: "데모데이", value: "최우수상", description: "총 69팀 · 너디너리 주최" },
      { label: "파트원상", value: "베스트 PLAN" },
    ],
  },
  gallery: [
    { src: "/projects/mungx5/screen-home.webp", alt: "멍멍멍멍멍 홈 화면", caption: "홈 · 오늘의 기록" },
    { src: "/projects/mungx5/screen-calendar.webp", alt: "멍멍멍멍멍 음주 캘린더 화면", caption: "음주 캘린더" },
    { src: "/projects/mungx5/screen-report.webp", alt: "멍멍멍멍멍 월간 음주 리포트 화면", caption: "월간 리포트" },
    { src: "/projects/mungx5/photo-demoday-booth.webp", alt: "UMC 7기 데모데이 부스 단체 사진", caption: "UMC 7기 데모데이" },
    { src: "/projects/mungx5/award-grand-prize.webp", alt: "UMC 7기 데모데이 최우수상 상장", caption: "데모데이 최우수상" },
    { src: "/projects/mungx5/award-best-part.webp", alt: "UMC 7기 베스트 파트원상 상장", caption: "베스트 파트원상 (PLAN)" },
  ],
  links: [
    { label: "App Store", href: "https://apps.apple.com/kr/app/id6758366885" },
    { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.anonymous.puppymode" },
  ],
};
