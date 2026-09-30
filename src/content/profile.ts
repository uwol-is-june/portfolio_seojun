import type { Profile } from "./types";

export const profile: Profile = {
  name: "서준",
  nameEn: "SEO JUN",
  headline: "협업을 좋아해서, 창업을 해버린 AI PM",
  bio: [
    "IT 연합 동아리에서 개발자 10명 · 디자이너와 프로덕트를 만들어 데모데이 최우수상을 받으며, 함께 만드는 즐거움을 확인했습니다. 이 경험을 계기로 직접 팀을 꾸려 창업에 뛰어들었습니다.",
    "포도상점 · 포도티켓 등 다양한 프로덕트를 기획해 MVP 개발 → 출시 → 초기 그로스까지 전 단계를 주도했고, 문제 정의 → 가설 수립 → 지표 정의 → 데이터 · VOC 검증의 프로세스로 총 2,490만 원 지원사업 수주, 청년 예술창업 페스타 데모데이 우수상, 실매출(약 160만 원)까지 만들어냈습니다.",
    "지금은 더 나아가기 위해 AI를 잡았습니다. GitHub 14.7k★ 오픈소스를 실계좌 서비스로 재구축하고, 추천 종목을 실투자로 검증(수익률 +21.0%)하며 AI 프로덕트를 만들어가고 있습니다.",
  ],
  aiBio: [
    "협업을 좋아해 창업까지 했고, 지금은 더 나아가기 위해 AI를 잡았습니다.",
    "(주)인카금융서비스 AI Lab에서 AI PM으로 일하며, 기획한 서비스를 Claude Code로 직접 만들어 배포하고 실제로 써서 검증합니다.",
  ],
  contact: {
    birth: "1999.12.09",
    address: "경기도 광명시 소하로 9",
    email: "std06158@naver.com",
    phone: "010-5251-5830",
  },
  portrait: { src: "/profile/portrait.webp", alt: "서준 프로필 사진" },
  timeline: [
    {
      period: "2026.03 – 재직중",
      organization: "(주)인카금융서비스",
      role: "AI PM · AI전략총괄 AI Lab · 사원(계약직)",
      points: [
        "전사 AX 과제 정의: 현업 부서 요건 약 50건을 RPA · 전산 · AI로 분류, 절감 임팩트순 우선순위화",
        "보험상품 비교 · 추천 서비스(RAG) 기획: FGI · FA 인터뷰, PRD · 요구사항 정의서 작성",
        "외주 개발사 대상 4차 QA 운영: 정합성 100% · 인텐트 파악률 90%+, POC 후 본사업 전환",
        "FA 위촉 문의 응대 AI 에이전트 기획: 영업센터 반복 문의를 AI 응대로 전환 (진행 중)",
        "DX 과제 3종 Claude Code로 직접 개발 · 배포: 경영진 주가 보고 자동화(연 16 영업일 · 약 410만 원 절감), 보장분석 프로그램, FA 위촉 시뮬레이터",
        "전사 AI 교육 기획 · 운영: 온라인 14회차 · 오프라인 3회, AI 영상 툴로 교육 콘텐츠 제작",
      ],
    },
    {
      period: "2025.08 – 2026.03",
      organization: "포도상점",
      role: "Founder & Product Manager",
      description: "2025.01 팀 결성, 예비창업 단계부터 포도상점 · 포도티켓 기획 · 운영 (사업자 등록 2025.08)",
      points: [
        "스토리 IP 거래 플랫폼 [포도상점] · [포도티켓] 프로덕트 기획 · 운영 총괄",
        "지원사업 수주 2,490만 원 | 2025 매출 1,595,000원 달성",
        "2026.03 기준 가입자 500명, 등록 작품 110편, MAU 1,500",
      ],
    },
  ],
  activities: [
    {
      period: "2025.07",
      organization: "하나금융그룹",
      role: "2025 하나 소셜벤처 유니버시티",
    },
    {
      period: "2024.09 – 2025.02",
      organization: "너디너리(NE(O)RDINARY)",
      role: "대학생 IT 연합동아리 UMC 7기",
      points: ["[멍멍멍멍멍] 서비스 기획 · 데모데이 최우수상, 베스트 파트원상(PLAN)"],
    },
    {
      period: "2024.07 – 2024.08",
      organization: "현대자동차그룹",
      role: "현대자동차그룹 소프티어 부트캠프 4기 서비스 기획 파트",
      points: [
        "[KIA SWIPY] 서비스 기획: 사용자 기반 PBV 모듈 추천 및 교체 서비스",
        "[캐스퍼 EV와 떠나기] 서비스 기획: 현대자동차그룹 신차 출시 이벤트",
      ],
    },
  ],
  education: [
    {
      period: "2018.03 – 2025.02",
      organization: "광운대학교",
      role: "로봇학부 정보제어 전공",
    },
  ],
  awards: [
    { date: "2025.11.21", title: "2025 청년 예술창업 페스타 데모데이 우수상", issuer: "서울문화재단 · 포르쉐 코리아" },
    { date: "2025.09.17", title: "광운대학교 모의 IR 경진대회 산학협력단장상(우수상)", issuer: "광운대학교 산학협력단" },
    { date: "2025.07.06", title: "2025 창업 아이디어 캠프 우수상", issuer: "광운대학교 캠퍼스타운" },
    { date: "2025.02.24", title: "UMC 7기 데모데이 최우수상", issuer: "너디너리(NE(O)RDINARY)" },
    { date: "2025.02.21", title: "UMC 7기 베스트 파트원상 (PLAN)", issuer: "너디너리(NE(O)RDINARY)" },
    { date: "2019.12.20", title: "2019 광운 창업아이디어 경진대회 특별상", issuer: "서울창업디딤터" },
  ],
  certificates: [
    { date: "2026.08.21", title: "TOEIC Speaking 150 (IH)", issuer: "ETS" },
    { date: "2026.02.15", title: "Google Analytics Certification", issuer: "Google" },
    { date: "2024.07.12", title: "빅데이터 분석기사", issuer: "한국데이터산업진흥원" },
    { date: "2021.12.17", title: "SQL 개발자 (SQLD)", issuer: "한국데이터산업진흥원" },
    { date: "2021.12.03", title: "데이터분석 준전문가 (ADsP)", issuer: "한국데이터산업진흥원" },
  ],
  skills: [
    { category: "기획 · 협업", items: ["Figma", "MIRO", "MS Office", "Jira", "Confluence", "Notion", "Slack"] },
    { category: "QA", items: ["Test Case 설계", "Manual QA", "버그 리포트 문서화"] },
    { category: "데이터", items: ["GA4", "SQL", "Python"] },
    { category: "AI", items: ["Claude Code", "Gemini API"] },
  ],
  resume: { label: "이력서 PDF", href: "/resume.pdf" },
};
