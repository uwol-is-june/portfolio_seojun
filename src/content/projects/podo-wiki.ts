import type { Project } from "../types";

export const podoWiki: Project = {
  slug: "podo-wiki",
  title: "포도위키",
  subtitle: "공연단체 인수인계 위키 (웹 · iOS · Android)",
  summary:
    "공연단체의 인수인계 문서를 위키로 모으는 서비스입니다. 웹 편집기와 iOS · Android 앱을 함께 만들어 스토어에 출시했고, 현재 3개 공연단체가 쓰고 있습니다.",
  cardPoints: [
    "공연단체의 인수인계 문서를 모으는 위키 서비스",
    "웹 편집기 + iOS · Android 앱 스토어 출시",
    "현재 3개 공연단체 사용 중",
  ],
  category: "ai",
  deployment: "live",
  status: "운영 중",
  positions: ["ai-product-builder"],
  role: "기획 · 개발 (1인)",
  period: "2026.05 – 2026.08",
  affiliation: "personal",
  organization: "사이드 프로젝트",
  tags: ["Next.js", "Supabase", "Expo", "Tiptap"],
  thumbnail: { src: "/projects/podo-wiki/cover.webp", alt: "포도위키 첫 화면" },
  highlights: [
    "웹 위키 + iOS · Android 앱 스토어 출시",
    "문서 변경 이력과 버전 비교(diff)",
    "현재 3개 공연단체 사용 중",
    "커밋 178개",
  ],
  problem: {
    statement: "공연단체의 운영 노하우와 인수인계 문서가 한곳에 모이지 않았습니다",
  },
  actions: [
    {
      title: "웹 위키",
      description: "마크다운 · 표 · 이미지를 지원하는 편집기와 문서별 변경 이력 · 버전 비교를 만들었습니다.",
      artifact: "Next.js, Tiptap",
    },
    {
      title: "모바일 앱",
      description: "검색 · 북마크 · 최근 본 문서 · FAQ 탭을 가진 앱을 만들어 웹과 같은 데이터로 보여주고, App Store · Google Play에 출시했습니다.",
      artifact: "Expo (EAS)",
    },
  ],
  architecture: {
    stages: [
      { title: "웹 편집", items: ["위키 문서 작성 · 수정", "표 · 이미지 · 링크"], tech: ["Next.js", "Tiptap"], kind: "screen" },
      { title: "저장", items: ["문서 · 변경 이력 저장", "로그인"], tech: ["Supabase"], kind: "store" },
      { title: "변경 이력", items: ["리비전 기록", "버전 비교(diff)"], kind: "system" },
      { title: "모바일 앱", items: ["홈 · 검색 · 북마크 · 더보기 탭", "App Store · Google Play 출시"], tech: ["Expo (EAS)"], kind: "screen" },
    ],
    caption: "Podo-Wiki 저장소 코드 기준",
  },
  outcome: { metrics: [] },
  links: [
    { label: "서비스", href: "https://wiki.podo-store.com" },
    { label: "App Store", href: "https://apps.apple.com/kr/app/id6790099095" },
    { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.podowiki.app" },
    { label: "GitHub", href: "https://github.com/uwol-is-june/Podo-Wiki" },
  ],
};
