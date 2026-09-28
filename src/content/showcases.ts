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

/** AI Product Builder: 혼자 Claude Code로 만드는 6단계 루프 (세 저장소의 CLAUDE.md · TASK.md · 스킬 · 훅 기준) */
export const builderShowcase = {
  loop: {
    caption: "포트폴리오 · 카드뉴스 에이전트 · 서학개미클럽 저장소에서 공통으로 쓰는 순서",
    steps: [
      {
        label: "규칙 문서",
        owner: "me" as const,
        text: "코드보다 규칙을 먼저 씁니다. CLAUDE.md 하나를 규칙의 단일 소스로 두고, 근거와 사례는 따로 적어 사본이 두 벌 생기지 않게 합니다.",
        evidence: ["CLAUDE.md", "docs/README.md"],
        example: { title: "카드뉴스 에이전트", slug: "cardnews-agent" },
      },
      {
        label: "태스크 쪼개기",
        owner: "me" as const,
        text: "요청을 TASK-NN 단위로 나누고, 난이도에 맞춰 모델을 붙입니다. 설계는 Opus, 일반 구현은 Sonnet, 단순 수정은 Haiku.",
        evidence: ["docs/TASK.md", "(O) · (S) · (H)"],
        example: { title: "서학개미클럽", slug: "seohak-gaemi-club" },
      },
      {
        label: "스킬 · 에이전트",
        owner: "claude" as const,
        text: "반복되는 절차는 스킬로, 관점이 다른 일은 서브에이전트로 나눠 동시에 돌립니다.",
        evidence: ["스킬 12개", "4대 거장 병렬 에이전트", "ui-builder · qa-reviewer"],
        example: { title: "서학개미클럽", slug: "seohak-gaemi-club" },
      },
      {
        label: "멈춤 지점",
        owner: "me" as const,
        text: "방향이 갈리는 자리에서는 AI가 멈추고 제가 통과시킵니다. 통과 전에는 다음 단계로 넘어가지 않습니다.",
        evidence: ["주제 → 골격 → 문안 ⛳"],
        example: { title: "카드뉴스 에이전트", slug: "cardnews-agent" },
      },
      {
        label: "3중 검증",
        owner: "both" as const,
        text: "셀 수 있는 것은 스크립트가, 읽히는지는 다른 모델이, 마지막은 사람이 봅니다. 계산은 LLM 대신 코드로 합니다.",
        evidence: ["check-text → read-text(GPT)", "Python Decimal", "build · lint"],
        example: { title: "카드뉴스 에이전트", slug: "cardnews-agent" },
      },
      {
        label: "기록 → 규칙",
        owner: "claude" as const,
        text: "훅이 결과를 자동 커밋하고, 판단은 수정할 수 없는 원장에 남깁니다. 되돌린 자리는 날짜와 함께 규칙 문서로 올려 다음 작업이 먼저 읽게 합니다.",
        evidence: ["Stop 훅 자동 커밋", "calls.jsonl 원장", "회고 문서"],
        example: { title: "서학개미클럽", slug: "seohak-gaemi-club" },
      },
    ],
  },
};
