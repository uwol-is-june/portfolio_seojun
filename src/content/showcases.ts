/**
 * 포지션 페이지마다 다른 강조 섹션의 콘텐츠
 * 모두 이력서 · 포트폴리오 · GitHub에 있는 실제 근거입니다.
 */

/** Product Manager: 가설 검증 루프, 지표 정의, OKR */
export const pmShowcase = {
  loop: {
    project: { title: "포도상점", slug: "podo-store" },
    steps: [
      { label: "가설", text: "작품 유통 플랫폼을 제공하면 작품 등록 · 계약 같은 초기 행동을 보일 것이다" },
      { label: "1차 결과", text: "회원 60명 · 작품 10편 · 열람 3,891회, 그러나 유료 구매 0건", tone: "fail" as const },
      { label: "실패 분석", text: "MOU를 맺은 공연단체 5곳 심층 인터뷰: 매칭 성공 사례 부족, 작품 수 부족" },
      { label: "인사이트", text: "초기 거래 전환의 핵심 장벽은 '플랫폼 신뢰(Platform Trust)'" },
      { label: "액션", text: "온라인 워크숍 · 작품 매칭 프로젝트 · 공연 컨퍼런스 · PG사 연동" },
      { label: "재결과", text: "유료 구매 13건 · 매출 1,595,000원, MOU 15건", tone: "success" as const },
    ],
  },
  metricTable: {
    caption: "포도상점 지표 정의와 개선 전후 (2025.12 기준)",
    columns: ["지표 그룹", "정의 (def.)", "1차", "개선 후", "변화"],
    rows: [
      ["초기 유입 · 공급", "회원 수", "60명", "140명", "+133%"],
      ["초기 유입 · 공급", "작품 등록 수", "10편", "29편", "+190%"],
      ["탐색 · 상호작용", "작품 열람 수", "3,891회", "6,784회", "+74%"],
      ["탐색 · 상호작용", "유료 구매", "0건", "13건", "1,595,000원"],
      ["계약 초기 행동", "공연 단체 MOU 체결 수", "5건", "15건", "+200%"],
    ],
  },
  okr: {
    caption: "멍멍멍멍멍 12인 팀 OKR 기반 스프린트",
    steps: ["Objectives", "KR · Initiative", "Epic", "주간 스크럼"],
  },
};

/** Service Planner: 유저 플로우, 결제 · 정책, 화면 설계, 문서 */
export const plannerShowcase = {
  flowProject: { title: "포도티켓", slug: "podo-ticket" },
  payment: {
    caption: "포도상점 유료 거래 도입을 위한 PG사 연동",
    steps: [
      "주요 PG사 정책 · 수수료 비교 및 검토",
      "결제 플로우 및 예외 처리 프로세스 설계",
      "기술 · 정책 적합성 검토 후 '나이스페이' 최종 선정",
      "결제 관련 이용약관 · 개인정보 처리방침 개정",
    ],
  },
  screens: [
    { src: "/projects/mungx5/screen-home.webp", alt: "멍멍멍멍멍 홈 화면", caption: "멍멍멍멍멍 · 홈" },
    { src: "/projects/mungx5/screen-report.webp", alt: "멍멍멍멍멍 월간 리포트 화면", caption: "멍멍멍멍멍 · 월간 리포트" },
    { src: "/projects/podo-ticket/screen-admin.webp", alt: "포도티켓 명단 관리 화면", caption: "포도티켓 · 명단 관리" },
    { src: "/projects/podo-ticket/screen-seat.webp", alt: "포도티켓 실시간 좌석 현황 화면", caption: "포도티켓 · 좌석 현황" },
  ],
  documents: {
    columns: ["문서", "프로젝트", "내용"],
    rows: [
      ["PRD · 화면설계서", "멍멍멍멍멍", "사용자 인터뷰 기반 핵심 기능 도출, iOS · Android 출시"],
      ["결제 플로우 · 약관", "포도상점", "PG 연동, 예외 처리, 개인정보 처리방침"],
    ],
  },
  other: [
    { title: "KIA SWIPY", description: "사용자 기반 PBV 모듈 추천 및 교체 서비스 기획", context: "소프티어 부트캠프 4기 · 현대자동차그룹" },
    { title: "캐스퍼 EV와 떠나기", description: "현대자동차그룹 신차 출시 이벤트 기획", context: "소프티어 부트캠프 4기 · 현대자동차그룹" },
  ],
};

/**
 * AI Product Builder: 혼자 Claude Code로 만드는 흐름 (처음 → 배포)
 * 갈래(branches)의 예시는 각 저장소 코드로 확인한 것만 적습니다:
 * Supabase(devtier · Podo-Wiki package.json), GitHub Actions cron(incar_stock daily-collect · devtier batch),
 * GitHub Actions CI(diet-saju ci.yml), Expo EAS(Podo-Wiki/mobile).
 */
type Owner = "me" | "claude" | "both";
type Example = { title: string; slug: string };
type Branch = { need: string; tool: string; examples: Example[] };

const ex = {
  cardnews: { title: "카드뉴스 에이전트", slug: "cardnews-agent" },
  seohak: { title: "서학개미클럽", slug: "seohak-gaemi-club" },
  devtier: { title: "DevTier", slug: "devtier" },
  wiki: { title: "포도위키", slug: "podo-wiki" },
  stock: { title: "경영진 주가 보고", slug: "incar-stock-report" },
  saju: { title: "다이어트 사주", slug: "diet-saju" },
  coverage: { title: "보장분석", slug: "coverage-analysis" },
};

export const builderShowcase: {
  flow: { label: string; owner: Owner; text: string; tags: string[]; branches?: Branch[] }[];
} = {
  flow: [
    {
      label: "규칙 문서",
      owner: "me",
      text: "코드보다 규칙을 먼저 씁니다. CLAUDE.md 하나를 규칙의 단일 소스로 둡니다.",
      tags: ["CLAUDE.md"],
    },
    {
      label: "태스크 쪼개기",
      owner: "me",
      text: "요청을 TASK-NN으로 나누고 난이도에 맞춰 Opus · Sonnet · Haiku를 붙입니다.",
      tags: ["docs/TASK.md"],
    },
    {
      label: "에이전트로 개발",
      owner: "claude",
      text: "반복 절차는 스킬로, 관점이 다른 일은 서브에이전트로 나눠 동시에 돌립니다.",
      tags: ["스킬", "서브에이전트"],
      branches: [
        { need: "DB가 필요하면", tool: "Supabase", examples: [ex.devtier, ex.wiki] },
        { need: "정기 실행이 필요하면", tool: "GitHub Actions cron", examples: [ex.stock, ex.devtier] },
        { need: "외부 데이터가 필요하면", tool: "API 연동 (DART · SEC · CODEF · 토스증권)", examples: [ex.stock, ex.seohak, ex.coverage] },
        { need: "문장 생성이 필요하면", tool: "Gemini · Claude (계산은 코드로)", examples: [ex.saju, ex.stock] },
      ],
    },
    {
      label: "멈춤 · 검증",
      owner: "both",
      text: "방향이 갈리는 자리는 제가 통과시키고, 셀 수 있는 것은 스크립트 · 테스트가 봅니다.",
      tags: ["build · lint", "Vitest"],
      branches: [
        { need: "테스트를 매번 돌리려면", tool: "GitHub Actions CI", examples: [ex.saju] },
        { need: "문장을 다른 눈으로 보려면", tool: "GPT 읽기 검사", examples: [ex.cardnews] },
      ],
    },
    {
      label: "배포",
      owner: "claude",
      text: "웹은 Vercel에, 앱은 스토어에 올립니다. 키가 필요한 도구는 로컬에서 돌립니다.",
      tags: ["Vercel"],
      branches: [
        { need: "앱이면", tool: "Expo EAS → App Store · Google Play", examples: [ex.wiki] },
        { need: "실계좌 · 로컬 전용이면", tool: "로컬 실행 + 공개 데모", examples: [ex.seohak] },
      ],
    },
    {
      label: "운영 · 회고",
      owner: "me",
      text: "되돌린 자리를 날짜와 함께 규칙 문서로 올려, 다음 작업이 먼저 읽게 합니다.",
      tags: ["회고 문서"],
    },
  ],
};
