import type { Build } from "./types";

/**
 * 직접 만들어 배포한 작은 결과물 (AI Product Builder 페이지)
 * 커밋 수는 2026.09 GitHub 기준입니다.
 */
export const builds: Build[] = [
  {
    name: "다시 DASII",
    deployment: "live",
    positions: ["product-manager", "service-planner"],
    description: "다이어트 제품 성분 분석 및 후기 앱",
    category: "startup",
    status: "운영 중",
    role: "PM · 서비스 기획",
    points: [
      "iOS · Android 앱 출시 후 운영 중",
      "제조사 표시사항과 식약처 자료로 함량 · 복용법을 정리한 성분 매거진 랜딩",
      "직접 만든 카드뉴스 에이전트로 인스타그램 콘텐츠 운영",
    ],
    stack: ["App Store", "Google Play", "Vercel"],
    links: [
      { label: "App Store", href: "https://apps.apple.com/kr/app/id6754357876" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.dasii" },
      { label: "성분 매거진", href: "https://dasii-landing-page.vercel.app" },
    ],
  },
];
