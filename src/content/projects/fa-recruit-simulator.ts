import type { Project } from "../types";

export const faRecruitSimulator: Project = {
  slug: "fa-recruit-simulator",
  title: "위촉 사전 진단 시뮬레이터",
  subtitle: "보험설계사(FA) 위촉 가능 여부를 미리 판정하는 사내 도구",
  summary:
    "지점 담당자가 설계사 위촉 신청 전에 경력 요건과 제한 사유를 계산해 위촉 가능 여부를 미리 판정하는 도구입니다. 8,859줄짜리 단일 HTML 파일을 Next.js로 다시 만들고, 업무 매뉴얼 · 사규와 대조해 판정 규칙을 정리했습니다.",
  cardPoints: [
    "경력 요건 · 제한 사유로 위촉 가능 여부 사전 판정",
    "8,859줄 단일 HTML을 Next.js로 재구축",
    "업무 매뉴얼 · 사규와 대조해 판정 규칙 정리",
  ],
  category: "ai",
  deployment: "live",
  status: "사내용 · 비밀번호 필요",
  positions: ["ai-product-builder"],
  featured: true,
  role: "기획 · 개발 (1인)",
  period: "2026.08 – 2026.09",
  affiliation: "company",
  organization: "인카금융서비스 · AI Lab",
  tags: ["Next.js 16", "TypeScript", "Vitest", "도메인 규칙 설계", "엑셀 · PNG 내보내기"],
  thumbnail: { src: "/projects/fa-recruit-simulator/cover.webp", alt: "위촉 사전 진단 시뮬레이션 첫 화면" },
  highlights: [
    "단일 HTML(8,859줄 · 1.9MB) 도구를 Next.js로 재구축",
    "개인 진단 · 단체 진단(엑셀 일괄 등록 최대 50명) 두 가지 모드",
    "적격 · 심사 대상 · 조건부 · 불가 판정과 제출 서류 · 필수 이행 체크리스트 자동 생성",
    "판정 규칙을 순수 함수로 분리하고 테스트 파일 25개로 검증",
  ],
  problem: {
    statement: "위촉 가능 여부를 판정하는 기존 도구가 거대한 HTML 파일 하나라 규칙을 고치고 검증하기 어려웠습니다",
    points: [
      "경력 인정 기준, 유효기간, 재입사 · 제한 사유 등 규칙이 많고 서로 얽혀 있음",
      "공식 업무 매뉴얼 · 사규가 바뀔 때마다 판정 결과가 맞는지 확인할 방법이 필요",
    ],
  },
  actions: [
    {
      title: "업무 규칙 추출과 매뉴얼 대조",
      description:
        "기존 도구에서 판정 규칙을 뽑아 문서로 정리하고, 공식 업무 매뉴얼 · 사규와 대조해 어긋나는 부분을 결함 검토서와 플로우차트 수정안으로 정리했습니다.",
      artifact: "매뉴얼 결함 검토 v1~v3, 플로우차트 수정 지시",
    },
    {
      title: "3단계 진단 흐름 설계",
      description:
        "사전 체크 → 경력 조회 → 자격 진단 3단계로 나누고, 제출 서류와 필수 이행 항목은 단계가 아닌 결과 화면의 체크리스트로 옮겼습니다. 입력이 아니라 결과물이기 때문입니다.",
      artifact: "진단 플로우, 화면 설계",
    },
    {
      title: "판정 로직 분리와 테스트",
      description: "경력 계산, 제한 사유(R · S · A · B), 최종 판정 우선순위를 화면과 분리된 순수 함수로 만들고 Vitest로 검증합니다.",
      artifact: "src/lib/domain, 테스트 파일 25개",
    },
    {
      title: "결과 공유",
      description: "판정 시점을 고정한 스냅샷 하나로 텍스트 복사 · PNG 이미지 · 엑셀 · PDF 네 가지 형식을 만들어 보고에 바로 쓸 수 있게 했습니다.",
    },
  ],
  architecture: {
    stages: [
      {
        title: "접근 · 모드 선택",
        items: ["공용 비밀번호", "개인 진단 / 단체 진단(엑셀 일괄 등록)"],
        kind: "screen",
      },
      {
        title: "① 사전 체크",
        items: ["특수 조건 (미성년자 · 외국인 · 내근직 · 손해사정사)", "자격 · 유형 자가진단 2문항"],
        kind: "screen",
      },
      {
        title: "② 경력 조회",
        items: ["날짜 · 경력 입력", "유형 판정 · 유효기간 계산"],
        tech: ["career.ts"],
        kind: "system",
      },
      {
        title: "③ 자격 진단",
        items: ["제한 사유 R · S · A · B 카드", "최종 판정 우선순위"],
        tech: ["final-diagnosis.ts"],
        kind: "system",
      },
      {
        title: "결과 · 공유",
        items: ["적격 · 심사 대상 · 조건부 · 불가", "서류 · 필수 이행 체크리스트", "텍스트 · PNG · 엑셀 · PDF"],
        tech: ["xlsx-js-style"],
        kind: "screen",
      },
    ],
  },
  infra: {
    client: [
      { name: "Next.js 16 웹", note: "개인 · 단체 진단 화면, 비밀번호 잠금" },
    ],
    runtime: [],
    data: [
      { name: "Supabase", note: "원본에서 연결 (공개 데모에서는 제외)" },
      { name: "브라우저 저장소", note: "단체 진단 명단 보관" },
      { name: "엑셀 · PNG 내보내기", note: "xlsx-js-style · 결과 이미지" },
    ],
  },
  outcome: {
    metrics: [
      { label: "진단 모드", value: "2가지", description: "개인 · 단체(최대 50명)" },
      { label: "결과 공유 형식", value: "4가지", description: "텍스트 · PNG · 엑셀 · PDF" },
      { label: "판정 로직 테스트", value: "25개 파일", description: "Vitest" },
    ],
  },
  galleryLayout: "wide",
  gallery: [
    { src: "/projects/fa-recruit-simulator/screen-precheck.webp", alt: "사전 체크 단계: 특수 조건과 자가진단 결과", caption: "① 사전 체크 · 특수 조건과 유형 자가진단" },
    { src: "/projects/fa-recruit-simulator/screen-career.webp", alt: "경력 조회 단계: 시험 합격일과 등록예정일 입력", caption: "② 경력 조회 · 날짜 입력과 경력 요건 계산" },
    { src: "/projects/fa-recruit-simulator/screen-qualify.webp", alt: "자격 진단 단계: 심사 대상 항목과 결과 미리 보기", caption: "③ 자격 진단 · 제한 사유 카드" },
    { src: "/projects/fa-recruit-simulator/screen-result.webp", alt: "진단 결과 요약: 최종 적격", caption: "결과 · 판정과 진단 요약" },
    { src: "/projects/fa-recruit-simulator/screen-share.webp", alt: "결과 공유: 진단 복사, 엑셀 저장, 이미지 저장", caption: "결과 공유 · 텍스트 · 엑셀 · 이미지" },
    { src: "/projects/fa-recruit-simulator/screen-batch.webp", alt: "단체 진단 대상자 명단 화면", caption: "단체 진단 · 명단 등록과 엑셀 업로드" },
    { src: "/projects/fa-recruit-simulator/screen-malso.webp", alt: "말소 셀프 가이드 케이스 진단 화면", caption: "말소 셀프 가이드" },
    { src: "/projects/fa-recruit-simulator/cover.webp", alt: "모드 선택 화면", caption: "모드 선택 · 개인 진단 / 단체 진단" },
  ],
  links: [
    { label: "Web", href: "/demo/fa-recruit" },
  ],
};
