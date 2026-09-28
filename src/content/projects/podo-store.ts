import type { Project } from "../types";

export const podoStore: Project = {
  slug: "podo-store",
  title: "포도상점",
  subtitle: "스토리 IP 거래 플랫폼",
  summary:
    "작가의 스토리 IP와 공연 단체를 잇는 거래 플랫폼입니다. 출시 후 거래 0건의 원인을 '플랫폼 신뢰 부족'으로 찾아내고 개선해 거래 13건, 매출 1,595,000원을 만들었습니다.",
  cardPoints: [
    "작가의 스토리 IP와 공연 단체를 잇는 거래 플랫폼",
    "출시 후 거래 0건의 원인을 '플랫폼 신뢰 부족'으로 진단",
    "개선 후 거래 13건 · 매출 1,595,000원",
  ],
  category: "startup",
  deployment: "live",
  positions: ["product-manager", "service-planner"],
  featured: true,
  status: "운영 중",
  role: "Founder & Product Manager",
  period: "2025.01 – 2026.03",
  affiliation: "startup",
  organization: "포도상점",
  team: [
    { role: "PM", count: 1 },
    { role: "디자이너", count: 1 },
    { role: "FE", count: 2 },
    { role: "BE", count: 2 },
    { role: "마케터", count: 1 },
  ],
  tags: ["창업", "가설 검증", "VOC 분석", "PG 연동", "IR · MOU"],
  logo: { src: "/projects/podo-store/logo.webp", alt: "포도상점 로고" },
  thumbnail: { src: "/projects/podo-store/cover.webp", alt: "포도상점 작품 둘러보기 화면" },
  highlights: [
    "거래 0건 → 13건 · 매출 1,595,000원 달성",
    "가입자 500명 · 등록 작품 110편 · MAU 1,500 (2026.03)",
    "지원사업 6개 · 사업화 지원금 총 2,490만 원 수주",
    "2025 청년 예술창업 페스타 데모데이 우수상",
  ],
  background: {
    title: "개인 창작자 중심 구조로 형성된 스토리 IP 시장",
    stats: ["스토리 작가의 71.9%가 개인 창작자(1인)", "콘텐츠 사업체의 50.9%는 개인 창작자에게 직접 이메일로 작품 구입"],
    source: "2024 KOPIS 공연예술조사 · 2021 이야기 IP 거래 실태조사 보고서",
  },
  research: {
    title: "작품 유통 경로 부족, 작가들은 비공식 채널에 의존",
    stats: [
      "작가 57.1%가 '작품을 공개할 방법이 부족하다'고 응답",
      "62.1%는 작품 유통이 개별 이메일 · 지인 추천 등 비공식 경로에 의존한다고 답변",
    ],
    source: "2024.09 스토리 작가 58명 대상 심층 인터뷰 · 2022 이야기산업 실태조사 보고서",
  },
  problem: {
    statement: "개인 창작자는 많지만, 이들을 연결할 공식 유통 경로가 없어 거래가 정체된 시장",
    points: [
      "콘텐츠 사업체: '신규 창작자 및 이야기 IP 확보의 어려움' (32.3%)",
      "스토리 작가: 비공식 유통 방식으로 인해 '법적 문제를 경험' (28.2%)",
    ],
  },
  hypothesis:
    "작가와 콘텐츠 사업체 사이에 작품 유통 플랫폼을 제공하면, 유통 과정의 비효율이 해소되어 작품 등록 · 계약 체결 같은 초기 행동을 보일 것이다",
  metrics: [
    { name: "초기 유입 및 공급 활성도", definitions: ["회원 수", "작품 등록 수"] },
    { name: "작품 탐색 및 상호작용", definitions: ["작품 열람 수", "유료 구매 전환"] },
    { name: "계약 관련 초기 행동", definitions: ["공연 단체의 MOU 체결 수"] },
  ],
  actions: [
    {
      title: "플랫폼 설계와 출시",
      description: "작가가 작품을 등록하고 공연 단체가 탐색 · 구매할 수 있는 거래 플랫폼을 설계하고 출시했습니다.",
      artifact: "서비스 기획, 화면 설계",
    },
    {
      title: "사업화",
      description: "IR과 MOU 등 사업을 총괄하며 지원사업 6개, 사업화 지원금 총 2,490만 원을 수주했습니다.",
      artifact: "IR 자료, 사업계획서",
    },
  ],
  outcome: {
    verdict: "초기 활성화에는 성공했지만 거래는 0건",
    metrics: [
      { label: "회원 수", value: "60명" },
      { label: "작품 등록 수", value: "10편" },
      { label: "작품 열람 수", value: "3,891회" },
      { label: "유료 구매", value: "0건 (0%)" },
      { label: "MOU 체결 수", value: "5건" },
    ],
  },
  iterations: [
    {
      verdict: "핵심 가설 검증 실패",
      findings: [
        "작품 공급 측면에서 의미 있는 초기 활성 조짐 관찰 (회원 60명, 작품 10편)",
        "작품 탐색과 상호작용 지표도 긍정적 (작품 열람 3,891회, 공연 단체 MOU 5건)",
        "그러나 작품 계약 체결과 구매 전환이 일어나지 않음",
      ],
      analysis: {
        title: "유저 인터뷰로 거래 전환 실패 요인 분석",
        stats: [
          "MOU를 맺은 공연 단체 5곳을 대상으로 미거래 사유 심층 인터뷰",
          "거래가 일어나지 않은 핵심 요인은 '매칭 성공 사례 부족'과 '작품 수 부족'",
        ],
      },
      insight: "초기 거래 전환의 핵심 장벽은 '플랫폼 신뢰(Platform Trust)'",
      actions: [
        {
          title: "온라인 워크숍",
          description: "작품 수를 확보하기 위해 작가 대상 온라인 워크숍을 열었습니다.",
          points: ["작가 총 40명 참여", "참여 작가 전원 플랫폼에 작품 등록"],
        },
        {
          title: "작품 매칭 프로젝트",
          description: "플랫폼을 통한 매칭 성공 사례를 직접 만들었습니다.",
          points: ["워크숍 우수작 4편 매칭", "쇼케이스 참석 관객 총 46명"],
        },
        {
          title: "대학 극회 연합 무대 컨퍼런스",
          description: "고객인 공연 단체를 대상으로 컨퍼런스를 주최 · 운영하며 플랫폼을 알렸습니다.",
          points: ["26개 공연단체, 120명 참여", "MOU 체결과 네트워크 확장"],
          image: { src: "/projects/podo-store/conference/group-1.webp", alt: "대학 극회 연합 무대 컨퍼런스 참가자 단체 사진" },
        },
        {
          title: "PG사 연동",
          description: "유료 거래가 가능하도록 결제를 붙였습니다.",
          artifact: "결제 플로우, 예외 처리 프로세스, 약관",
          points: [
            "주요 PG사 정책 · 수수료 비교 검토",
            "결제 플로우와 예외 처리 프로세스 설계",
            "기술 · 정책 적합성 검토 후 나이스페이 최종 선정",
            "결제 관련 이용약관 · 개인정보 처리방침 개정",
          ],
        },
      ],
      after: {
        verdict: "핵심 가설 검증과 거래 전환 모두 성공",
        metrics: [
          { label: "회원 수", value: "140명", description: "+133%" },
          { label: "작품 등록 수", value: "29편", description: "+190%" },
          { label: "작품 열람 수", value: "6,784회", description: "+74%" },
          { label: "유료 구매", value: "13건", description: "매출 1,595,000원" },
          { label: "MOU 체결 수", value: "15건", description: "+200%" },
        ],
        note: "2025.12 기준. 2026.03 기준 가입자 500명, 등록 작품 110편, MAU 1,500",
      },
    },
  ],
  gallery: [
    { src: "/projects/podo-store/photo-workshop.webp", alt: "작가 대상 온라인 워크숍 화면", caption: "온라인 워크숍 · 작가 40명 참여" },
    { src: "/projects/podo-store/photo-matching.webp", alt: "작품 매칭 프로젝트 쇼케이스 현장", caption: "작품 매칭 프로젝트 쇼케이스" },
    { src: "/projects/podo-store/photo-conference.webp", alt: "공연 컨퍼런스 단체 사진", caption: "무대 컨퍼런스 · 26개 단체 120명" },
    { src: "/projects/podo-store/conference/talk.webp", alt: "무대 컨퍼런스에서 발표하는 모습", caption: "무대 컨퍼런스 · 발표" },
    { src: "/projects/podo-store/conference/discussion.webp", alt: "무대 컨퍼런스 참가자들이 테이블에서 토론하는 모습", caption: "무대 컨퍼런스 · 그룹 토론" },
    { src: "/projects/podo-store/conference/registration.webp", alt: "무대 컨퍼런스 접수 데스크", caption: "무대 컨퍼런스 · 현장 접수" },
    { src: "/projects/podo-store/conference/networking.webp", alt: "무대 컨퍼런스 네트워킹 현장", caption: "무대 컨퍼런스 · 네트워킹" },
    { src: "/projects/podo-store/conference/group-intermission.webp", alt: "무대 컨퍼런스 현수막 앞 단체 사진", caption: "무대 컨퍼런스 · 단체 사진" },
  ],
  links: [{ label: "포도상점 바로가기", href: "https://www.podo-store.com" }],
};
