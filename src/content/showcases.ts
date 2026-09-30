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
 * AI Product Builder: Claude Code Building Loop (6단계)
 * 예시 · 에이전트 · 세팅은 각 저장소 코드와 배포 주소로 확인한 것만 적습니다:
 * Vercel(각 프로젝트 서비스 링크), Supabase(devtier · Podo-Wiki package.json),
 * GitHub Actions cron(경영진 주가 보고 daily-collect · devtier batch), GitHub Actions CI(diet-saju ci.yml),
 * Expo EAS(Podo-Wiki/mobile), 공개 데모(/demo/*), 폴더별 CLAUDE.md(diet-saju · cardnews-agent),
 * Stop 훅(seohak-gaemi-club .claude/settings.json), 태스크 3분할(Podo-Wiki TASK_W · TASK_M · TASK_A).
 */
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
    /** 가장 중요한 단계면 true (강조 표시) */
    key?: boolean;
    /** 단계 설명 불릿 (한 줄에 한 가지) */
    points: string[];
    /** 갈래 카드 묶음의 제목. 없으면 Infra spec */
    branchesTitle?: string;
    branches?: Branch[];
    /** 단계에서 실제로 쓰는 문서 한 토막 (코드 블록으로 보여줌) */
    snippet?: { title: string; lines: string[] };
    /** 동시에 도는 세션 (레인으로 보여줌) */
    lanes?: string[];
    /** 나쁜 방식 → 내 방식 비교 */
    contrast?: { bad: { title: string; points: string[] }; good: { title: string; points: string[] } };
    /** 프로젝트별로 직접 만든 에이전트 · 스킬 */
    agents?: { project: Example; items: { name: string; desc: string }[] }[];
    /** 전후 비교 막대 (value는 100건 기준) */
    compare?: { title: string; bars: { label: string; value: number }[]; unit: string };
    /** 결론을 받치는 외부 근거 한 줄 */
    evidence?: { text: string; source: string; href: string };
  }[];
} = {
  flow: [
    {
      label: "프로젝트 세팅",
      icon: "/icons/loop/plan.webp",
      points: [
        "코드보다 규칙 문서를 먼저 세웁니다.",
        "루트 CLAUDE.md에는 구조 · 경계 · 명령어만 둡니다.",
        "세부 규칙은 폴더별 문서로 나눠, 그 폴더를 고칠 때만 읽게 합니다.",
        "규칙은 한 곳에만 적고 베끼지 않아 문서끼리 어긋나지 않습니다.",
      ],
      snippet: {
        title: "세팅 순서",
        lines: [
          "1. CLAUDE.md     구조 · 경계 · 명령어만",
          "2. 폴더별 규칙   components/ · lib/ · docs/CLAUDE.md",
          "3. docs/TASK.md  태스크 형식 · 모델 (O)(S)(H)",
          "4. 검증 게이트   lint · test 수시, build는 커밋 직전",
          "5. 훅 · 권한     Stop 훅으로 결과물 자동 커밋",
          "6. 결정 기록     되돌린 이유를 날짜와 함께",
        ],
      },
    },
    {
      label: "인프라 셋업",
      icon: "/icons/loop/infra.webp",
      points: ["기획안에 필요한 것만 골라 붙입니다.", "쓰지 않을 도구는 처음부터 넣지 않습니다."],
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
      points: [
        "관점이 다른 일은 에이전트와 스킬로 나눠 맡깁니다.",
        "한 에이전트가 화면 · 문구 · 검수를 다 하면 기준이 섞이기 때문입니다.",
      ],
      agents: [
        {
          project: { title: "이 포트폴리오", slug: "" },
          items: [
            { name: "ui-builder", desc: "섹션 · 컴포넌트 · 애니메이션 구현" },
            { name: "content-writer", desc: "소개 · 프로젝트 문구 (한국어 · 영어)" },
            { name: "seo-performance", desc: "메타데이터 · OG 이미지 · 성능" },
            { name: "qa-reviewer", desc: "빌드 · 반응형 · 접근성 점검" },
          ],
        },
        {
          project: ex.seohak,
          items: [
            { name: "/investment-team", desc: "버핏 · 멍거 · 단융핑 · 리루 관점 서브에이전트 4개가 병렬 분석" },
            { name: "/news-pulse", desc: "주가 급변동 원인을 4개 에이전트가 나눠 탐색" },
            { name: "/thesis-tracker", desc: "매수 뒤 투자 논제가 유효한지 추적" },
          ],
        },
        {
          project: ex.cardnews,
          items: [{ name: "cardnews 스킬", desc: "기획 → 원고 → 검수 → 1080×1350 렌더까지 한 편 제작" }],
        },
      ],
    },
    {
      label: "TASK.md · 병렬 작업",
      icon: "/icons/loop/parallel.webp",
      key: true,
      points: [
        "가장 중요한 단계입니다.",
        "세션만 나눠 돌리면 같은 파일을 덮어써 충돌 · 버그 · 토큰 낭비가 생깁니다.",
        "그래서 TASK.md에서 태스크를 쪼개 파일이 겹치지 않는 것끼리 묶습니다.",
        "묶음마다 세션을 나눠 동시에 돌립니다.",
      ],
      contrast: {
        bad: { title: "세션만 나누면", points: ["같은 파일을 서로 덮어씀", "충돌을 푸느라 버그 · 토큰 낭비"] },
        good: { title: "TASK.md로 먼저 묶으면", points: ["파일이 겹치지 않는 묶음끼리 병렬", "예) 포도위키: 웹 · 앱 · 공통 태스크를 파일 3개로 분리"] },
      },
      snippet: {
        title: "docs/TASK.md",
        lines: ["### A · 웹 (src/)", "- [ ] [TASK-01] (O) 결제 흐름 @ui-builder", "### B · 앱 (mobile/)", "- [ ] [TASK-02] (S) 알림 문구 @content-writer", "### C · 공통 (docs/)", "- [ ] [TASK-03] (H) 약관 링크 교체"],
      },
      lanes: ["세션 A · 웹", "세션 B · 앱", "세션 C · 공통"],
    },
    {
      label: "QA · 코드리뷰",
      icon: "/icons/loop/qa.webp",
      points: [
        "AI가 코드를 빠르게 쏟아낼수록 사람이 다 읽을 수 없어 리뷰가 병목이 됩니다.",
        "변경마다 코드리뷰 에이전트 → QA 에이전트 순으로 점검한 뒤 배포합니다.",
      ],
      compare: {
        title: "PR 100건 중 실제 문제를 지적받은 PR",
        bars: [
          { label: "사람만 리뷰할 때", value: 16 },
          { label: "코드리뷰 에이전트를 붙인 뒤", value: 54 },
        ],
        unit: "건",
      },
      evidence: {
        text: "코드가 너무 많아지자 사람 리뷰는 대부분 훑고 지나갔습니다. Anthropic은 코드리뷰 에이전트를 붙인 뒤, 실제 문제를 지적받는 코드 변경이 100건 중 16건에서 54건으로 늘었습니다.",
        source: "Anthropic · 2026.03",
        href: "https://claude.com/blog/code-review",
      },
    },
    {
      label: "지속 개선 · 운영",
      icon: "/icons/loop/operate.webp",
      points: [
        "배포한 뒤에는 GA4 · Amplitude로 유입 · 전환 지표를 봅니다.",
        "떨어지는 구간을 찾아 다시 루프를 돕니다.",
        "되돌린 결정은 날짜와 근거를 붙여 규칙 문서에 남겨, 다음 작업이 먼저 읽게 합니다.",
      ],
      branchesTitle: "운영 방식",
      branches: [
        { need: "지표 분석", tool: "GA4 · Amplitude", examples: [] },
        { need: "서버 지표", tool: "요청 로그 집계 (Vercel)", examples: [ex.saju] },
        { need: "앱이면", tool: "App Store · Google Play 출시", examples: [ex.wiki] },
        { need: "실계좌 · 사내용이면", tool: "로컬 · 사내 운영 + 공개 데모", examples: [ex.seohak, ex.coverage, ex.fa] },
      ],
    },
  ],
};
