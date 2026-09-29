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
 * AI Product Builder: Claude Code Building Loop (7단계)
 * 갈래(branches)의 예시는 각 저장소 코드 · 배포 주소로 확인한 것만 적습니다:
 * Vercel(각 프로젝트 서비스 링크), Supabase(devtier · Podo-Wiki package.json),
 * GitHub Actions cron(incar_stock daily-collect · devtier batch), GitHub Actions CI(diet-saju ci.yml),
 * Expo EAS(Podo-Wiki/mobile), 공개 데모(/demo/*).
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
  fa: { title: "위촉 시뮬레이터", slug: "fa-recruit-simulator" },
};

export const builderShowcase: {
  flow: {
    label: string;
    /** 단계 3D 아이콘 (public/icons/loop, Fluent Emoji 3D · MIT) */
    icon: string;
    owner: Owner;
    text: string;
    tags: string[];
    branches?: Branch[];
    /** 단계에서 실제로 쓰는 문서 한 토막 (코드 블록으로 보여줌) */
    snippet?: { title: string; lines: string[] };
    /** 동시에 도는 세션 (레인으로 보여줌) */
    lanes?: string[];
  }[];
} = {
  flow: [
    {
      label: "기획안 · 프로젝트 세팅",
      icon: "/icons/loop/plan.webp",
      owner: "me",
      text: "코드보다 기획안을 먼저 씁니다. CLAUDE.md에 목표 · 규칙 · 구조를 적고, 그 문서를 기준으로 프로젝트를 세팅합니다.",
      tags: ["CLAUDE.md", "AGENTS.md"],
      snippet: {
        title: "CLAUDE.md (이 포트폴리오)",
        lines: ["# Project", "- 개인 포트폴리오 · Next.js · TypeScript · Tailwind", "- 포지션: PM · Service Planner · AI Product Builder", "", "# Tasks", "- 태스크는 docs/TASK.md에 기록", "- 모델은 난이도에 맞게 (O) · (S) · (H)"],
      },
    },
    {
      label: "인프라 셋업",
      icon: "/icons/loop/infra.webp",
      owner: "both",
      text: "기획안에 필요한 것만 골라 붙입니다. 쓰지 않을 도구는 처음부터 넣지 않습니다.",
      tags: ["Vercel", "Supabase", "GitHub Actions"],
      branches: [
        { need: "배포", tool: "Vercel", examples: [ex.devtier, ex.saju, ex.stock, ex.coverage] },
        { need: "DB · 로그인", tool: "Supabase", examples: [ex.devtier, ex.wiki] },
        { need: "정기 실행", tool: "cron job (GitHub Actions)", examples: [ex.stock, ex.devtier] },
        { need: "테스트 자동화", tool: "GitHub Actions CI", examples: [ex.saju] },
        { need: "문장 생성", tool: "Gemini · Claude API (계산은 코드로)", examples: [ex.saju, ex.stock] },
        { need: "외부 데이터", tool: "API 연동 (DART · SEC · CODEF · 토스증권)", examples: [ex.stock, ex.seohak, ex.coverage] },
        { need: "앱 빌드", tool: "Expo EAS", examples: [ex.wiki] },
      ],
    },
    {
      label: "에이전트 구축",
      icon: "/icons/loop/agents.webp",
      owner: "both",
      text: "기획안의 역할대로 서브에이전트와 스킬을 만듭니다. 화면 · 문구 · QA처럼 관점이 다른 일을 나눠 맡깁니다.",
      tags: [".claude/agents", "스킬"],
      snippet: {
        title: ".claude/agents (이 포트폴리오)",
        lines: ["ui-builder       섹션 · 컴포넌트 · 애니메이션", "content-writer   소개 · 프로젝트 문구", "seo-performance  메타데이터 · 성능 · 배포", "qa-reviewer      빌드 · 반응형 · 접근성 점검"],
      },
    },
    {
      label: "TASK.md 생성",
      icon: "/icons/loop/tasks.webp",
      owner: "me",
      text: "요청을 태스크 한 줄로 쪼개고 난이도에 맞는 모델과 에이전트를 붙입니다. 동시에 할 수 있는 태스크는 따로 묶습니다.",
      tags: ["docs/TASK.md"],
      snippet: {
        title: "docs/TASK.md",
        lines: ["- [ ] [TASK-01] (O) 결제 흐름 설계 @ui-builder", "- [ ] [TASK-02] (S) 소개 문구 @content-writer", "- [ ] [TASK-03] (H) 링크 교체"],
      },
    },
    {
      label: "세션 병렬 작업",
      icon: "/icons/loop/parallel.webp",
      owner: "claude",
      text: "파일이 겹치지 않는 태스크는 세션을 나눠 동시에 진행합니다.",
      tags: ["병렬 세션"],
      lanes: ["세션 A · TASK-01", "세션 B · TASK-02", "세션 C · TASK-03"],
    },
    {
      label: "QA · 코드리뷰",
      icon: "/icons/loop/qa.webp",
      owner: "both",
      text: "QA · 코드리뷰 에이전트가 빌드 · 린트 · 반응형을 점검하고, 방향이 갈리는 자리는 제가 통과시킵니다.",
      tags: ["qa-reviewer", "code-review", "build · lint"],
      branches: [{ need: "문장을 다른 눈으로 보려면", tool: "GPT 읽기 검사", examples: [ex.cardnews] }],
    },
    {
      label: "지속 개선 · 운영",
      icon: "/icons/loop/operate.webp",
      owner: "me",
      text: "배포한 뒤에도 같은 루프를 다시 돕니다. 되돌린 자리는 날짜와 함께 규칙 문서로 올려 다음 작업이 먼저 읽게 합니다.",
      tags: ["회고 문서"],
      branches: [
        { need: "앱이면", tool: "App Store · Google Play 출시", examples: [ex.wiki] },
        { need: "실계좌 · 사내용이면", tool: "로컬 · 사내 운영 + 공개 데모", examples: [ex.seohak, ex.coverage, ex.fa] },
      ],
    },
  ],
};
