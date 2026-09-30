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
 * 루프는 '내 작업 프로세스' 설명이라 단계마다 도식 하나로 보여주고, 프로젝트 링크는 걸지 않습니다(이름만 예시로).
 * 스택 · 에이전트 · 세팅은 각 저장소 코드와 배포 설정으로 확인한 것만 적습니다:
 * Vercel(각 프로젝트 서비스 링크), Supabase(devtier · Podo-Wiki package.json), Upstash Redis(diet-saju),
 * GitHub Actions cron(경영진 주가 보고 daily-collect · devtier batch), GitHub Actions CI(diet-saju ci.yml),
 * Expo EAS(Podo-Wiki/mobile), 정적 대시보드(경영진 주가 보고), 폴더별 CLAUDE.md(diet-saju · cardnews-agent),
 * Stop 훅(seohak-gaemi-club .claude/settings.json), 태스크 3분할(Podo-Wiki TASK_W · TASK_M · TASK_A).
 * 외부 수치: Microsoft(2025.07) · Anthropic(2026.03) 원문에서 확인한 것만 씁니다.
 */
const p = {
  cardnews: "카드뉴스 에이전트",
  seohak: "서학개미클럽",
  devtier: "DevTier",
  wiki: "포도위키",
  stock: "경영진 주가 보고",
  saju: "다이어트 사주",
  coverage: "보장분석",
};

/** 순서대로 이어지는 흐름 노드. agent면 에이전트가 맡는 칸으로 강조합니다. */
type SequenceNode = { name: string; desc: string; agent?: boolean };

export const builderShowcase: {
  flow: {
    label: string;
    /** 단계 3D 아이콘 (public/icons/loop, Fluent Emoji 3D · MIT) */
    icon: string;
    /** 가장 중요한 단계면 true (강조 표시) */
    key?: boolean;
    /** 단계 설명 불릿 (한 줄에 한 가지). 비어 있으면 도식을 패널 전체 폭으로 보여줍니다. */
    points: string[];
    /** 순서 흐름도. loopBack이 있으면 마지막에서 처음 단계로 돌아가는 순환으로 그립니다. */
    sequence?: { title: string; nodes: SequenceNode[]; loopBack?: string };
    /** 상황 → 선택 분기도 (영역별) */
    choices?: { group: string; rows: { when: string; pick: string; examples: string[] }[] }[];
    /** 공통 에이전트 위에 프로젝트별 에이전트를 얹는 층 구조 */
    layers?: {
      common: { title: string; items: { name: string; desc: string }[] };
      extra: { title: string; projects: { project: string; why: string; items: string[] }[] };
    };
    /** 결론을 받치는 외부 지표 */
    stats?: { value: string; label: string; source: string; href: string }[];
    /** 단계에서 실제로 쓰는 문서 한 토막 (코드 블록으로 보여줌) */
    snippet?: { title: string; lines: string[] };
    /** 동시에 도는 세션 (레인으로 보여줌) */
    lanes?: string[];
    /** 나쁜 방식 → 내 방식 비교 */
    contrast?: { bad: { title: string; points: string[] }; good: { title: string; points: string[] } };
  }[];
} = {
  flow: [
    {
      label: "프로젝트 세팅",
      icon: "/icons/loop/plan.webp",
      points: [
        "코드보다 규칙 문서를 먼저 세웁니다.",
        "루트 CLAUDE.md엔 구조 · 경계 · 명령어만 두고, 세부 규칙은 폴더별 문서로 나눕니다.",
        "규칙은 한 곳에만 적어 문서끼리 어긋나지 않게 합니다.",
      ],
      sequence: {
        title: "세팅 순서",
        nodes: [
          { name: "CLAUDE.md", desc: "구조 · 경계 · 명령어만" },
          { name: "폴더별 규칙", desc: "components/ · lib/ · docs/CLAUDE.md" },
          { name: "docs/TASK.md", desc: "태스크 형식 · 모델 (O)(S)(H)" },
          { name: "검증 게이트", desc: "lint · test 수시, build는 커밋 직전" },
          { name: "훅 · 권한", desc: "Stop 훅으로 결과물 자동 커밋" },
          { name: "결정 기록", desc: "되돌린 이유를 날짜와 함께" },
        ],
      },
    },
    {
      label: "인프라 세팅",
      icon: "/icons/loop/infra.webp",
      points: [],
      choices: [
        {
          group: "프론트엔드",
          rows: [
            { when: "화면 한두 장 · 서버 로직 없음", pick: "정적 배포 · HTML + Chart.js", examples: [p.stock] },
            { when: "로그인 · 입력 · 결과처럼 화면이 여러 개", pick: "동적 배포 · Next.js", examples: [p.devtier, p.saju, p.coverage, p.wiki] },
            { when: "모바일 앱도 필요", pick: "Expo (React Native)", examples: [p.wiki] },
            { when: "나만 쓰는 도구", pick: "로컬 Next.js 대시보드", examples: [p.seohak] },
          ],
        },
        {
          group: "백엔드",
          rows: [
            { when: "API 키를 숨기고 외부 API 호출", pick: "Next.js API 라우트 (Vercel 함수)", examples: [p.saju, p.coverage, p.devtier] },
            { when: "정해진 시간에 수집 · 계산", pick: "GitHub Actions cron", examples: [p.stock, p.devtier] },
            { when: "서버 없이 내 PC에서", pick: "Node.js · Python 스크립트", examples: [p.cardnews, p.seohak] },
            { when: "문장 생성이 필요", pick: "Gemini API (계산은 코드로)", examples: [p.saju, p.stock] },
          ],
        },
        {
          group: "데이터",
          rows: [
            { when: "로그인 + 관계형 데이터", pick: "Supabase (Postgres · Auth)", examples: [p.devtier, p.wiki] },
            { when: "조회수 · 좋아요 카운터만", pick: "Upstash Redis", examples: [p.saju] },
            { when: "기록만 쌓이면 됨", pick: "저장소에 JSON · 파일 커밋", examples: [p.stock, p.seohak] },
          ],
        },
        {
          group: "배포 · 자동화",
          rows: [
            { when: "누구나 접속", pick: "Vercel", examples: [p.devtier, p.saju, p.stock, p.wiki] },
            { when: "push마다 검사", pick: "GitHub Actions CI", examples: [p.saju] },
            { when: "앱 스토어 출시", pick: "EAS Build · Submit", examples: [p.wiki] },
          ],
        },
      ],
    },
    {
      label: "에이전트 구축",
      icon: "/icons/loop/agents.webp",
      points: [
        "공통 에이전트는 어느 프로젝트에서나 먼저 세팅합니다.",
        "프로젝트 성격상 다른 관점이 필요하면 에이전트 · 스킬을 더 만듭니다.",
        "한 에이전트가 화면 · 문구 · 검수를 다 하면 기준이 섞이기 때문입니다.",
      ],
      layers: {
        common: {
          title: "공통 · 모든 프로젝트",
          items: [
            { name: "ui-builder", desc: "화면 · 컴포넌트 구현" },
            { name: "content-writer", desc: "문구 (한국어 · 영어)" },
            { name: "qa-reviewer", desc: "빌드 · 반응형 · 접근성 점검" },
            { name: "seo-performance", desc: "메타데이터 · 성능" },
          ],
        },
        extra: {
          title: "필요하면 · 프로젝트별 추가",
          projects: [
            {
              project: p.seohak,
              why: "투자 판단을 여러 관점으로 교차 검증해야 해서",
              items: ["/investment-team", "/news-pulse", "/thesis-tracker"],
            },
            {
              project: p.cardnews,
              why: "한 편을 매번 같은 규칙으로 기획부터 렌더까지 만들어야 해서",
              items: ["cardnews 스킬"],
            },
          ],
        },
      },
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
        "그래서 변경마다 에이전트가 먼저 점검하고, 통과한 것만 배포합니다.",
      ],
      sequence: {
        title: "변경 하나가 배포되기까지",
        nodes: [
          { name: "AI가 쓴 코드", desc: "태스크 하나 = 변경 하나" },
          { name: "코드리뷰 에이전트", desc: "논리 오류 · 버그", agent: true },
          { name: "QA 에이전트", desc: "빌드 · 린트 · 반응형", agent: true },
          { name: "배포", desc: "main에 푸시" },
        ],
      },
      stats: [
        {
          value: "10~20%",
          label: "AI 코드리뷰를 붙인 저장소 5,000곳의 PR 완료 시간 단축 (중앙값)",
          source: "Microsoft · 2025.07",
          href: "https://devblogs.microsoft.com/engineering-at-microsoft/enhancing-code-quality-at-scale-with-ai-powered-code-reviews/",
        },
        {
          value: "84%",
          label: "1,000줄 넘는 큰 PR에서 문제를 찾아낸 비율 (평균 7.5건)",
          source: "Anthropic · 2026.03",
          href: "https://claude.com/blog/code-review",
        },
        {
          value: "1% 미만",
          label: "에이전트가 지적한 문제 가운데 틀린 것",
          source: "Anthropic · 2026.03",
          href: "https://claude.com/blog/code-review",
        },
      ],
    },
    {
      label: "지속 개선 · 운영",
      icon: "/icons/loop/operate.webp",
      points: [
        "배포한 뒤 지표를 보고, 떨어지는 구간을 찾아 다시 루프를 돕니다.",
        "되돌린 결정은 날짜와 근거를 붙여 규칙 문서에 남깁니다.",
      ],
      sequence: {
        title: "개선 순환",
        nodes: [
          { name: "배포 · 출시", desc: "웹은 Vercel, 앱은 스토어, 사내용은 공개 데모" },
          { name: "지표 보기", desc: "GA4 · Amplitude · 요청 로그" },
          { name: "떨어지는 구간 찾기", desc: "유입 · 전환이 끊기는 화면" },
          { name: "결정 기록", desc: "날짜 · 근거를 규칙 문서에" },
        ],
        loopBack: "01 프로젝트 세팅으로 돌아가 다음 태스크",
      },
    },
  ],
};
