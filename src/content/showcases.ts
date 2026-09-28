/**
 * 포지션 페이지마다 다른 강조 섹션의 콘텐츠
 * 모두 이력서 · 포트폴리오 · GitHub에 있는 실제 근거입니다.
 */

/** Product Manager: 가설 검증 루프, 지표 정의, 우선순위, OKR */
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
  prioritization: {
    caption: "인카금융서비스 전사 AX 과제 정의",
    input: "현업 부서 요건 약 50건",
    buckets: [
      { label: "RPA", description: "반복 작업 자동화로 풀 요건" },
      { label: "전산", description: "시스템 개발로 풀 요건" },
      { label: "AI", description: "AI 서비스로 풀 요건" },
    ],
    rule: "절감 임팩트순으로 우선순위화",
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
      ["PRD · 요구사항 정의서", "인카 RAG 서비스", "FGI · FA 인터뷰 기반 보험상품 비교 · 추천"],
      ["Test Case · 버그 리포트", "인카 RAG 서비스", "외주 개발사 대상 4차 QA, 정합성 100%"],
      ["결제 플로우 · 약관", "포도상점", "PG 연동, 예외 처리, 개인정보 처리방침"],
    ],
  },
  other: [
    { title: "KIA SWIPY", description: "사용자 기반 PBV 모듈 추천 및 교체 서비스 기획", context: "소프티어 부트캠프 4기 · 현대자동차그룹" },
    { title: "캐스퍼 EV와 떠나기", description: "현대자동차그룹 신차 출시 이벤트 기획", context: "소프티어 부트캠프 4기 · 현대자동차그룹" },
  ],
};

/** AI Product Builder: 실투자 검증, 만든 것들, AI 활용 원칙, 기술 */
export const aiShowcase = {
  validation: {
    project: { title: "서학개미클럽", slug: "seohak-gaemi-club" },
    metrics: [
      { label: "실투자 수익률", value: "+21.0%", description: "추천 종목 실계좌 매수, 약 2주 보유" },
      { label: "지수 대비 초과수익", value: "약 20%", description: "같은 기간 S&P500 · 나스닥100 대비" },
      { label: "감정 매매 대비 개선", value: "45%", description: "−24.1% → +21.0%" },
    ],
  },
  principles: [
    {
      title: "계산은 코드, 해석은 LLM",
      description: "사주 계산과 밸류에이션처럼 틀리면 안 되는 부분은 코드(Python Decimal, 만세력 라이브러리)가 하고, LLM은 해석과 문장만 맡깁니다.",
      source: "다이어트 사주 · 서학개미클럽",
    },
    {
      title: "판단을 기록하고 채점한다",
      description: "AI가 낸 판단을 수정할 수 없는 원장에 남기고, 실제 주가로 자동 채점해 맞았는지를 데이터로 확인합니다.",
      source: "서학개미클럽",
    },
    {
      title: "규칙은 코드로 검사한다",
      description: "줄표 금지, 문장 길이 같은 'AI 티' 문안 규칙을 스크립트로 검사해 사람이 매번 고치지 않게 합니다.",
      source: "카드뉴스 에이전트",
    },
    {
      title: "태스크와 에이전트로 나눈다",
      description: "작업을 태스크 문서로 쪼개고 역할별 에이전트와 모델을 배정해, 혼자서도 기획부터 QA까지 진행합니다.",
      source: "이 포트폴리오 사이트",
    },
  ],
  stack: [
    { category: "AI", items: ["Claude Code", "Gemini API", "멀티 에이전트", "RAG"] },
    { category: "만들기", items: ["Next.js", "TypeScript", "Python", "Supabase"] },
    { category: "데이터 · 자동화", items: ["GitHub Actions", "토스증권 Open API", "SEC XBRL", "pykrx · DART"] },
    { category: "배포", items: ["Vercel", "App Store", "Google Play"] },
  ],
};
