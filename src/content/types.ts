/**
 * 포트폴리오 데이터 모델
 * 케이스 스터디는 포트폴리오 PDF와 같은 순서로 구성됩니다:
 * Overview → Background · User Interview → Problem → Hypothesis → Metrics → Action & Result → 실패 분석 · 개선 → 재결과
 */

export type PositionId = "product-manager" | "service-planner" | "ai-product-builder";

/** live: 누구나 접속할 수 있게 배포된 서비스 / local: 내 PC에서 실행하는 도구 · 프로젝트 */
export type Deployment = "live" | "local";

/** 협업(초록) · 창업(보라) · AI(빨강). 포트폴리오 표지의 구분과 같습니다. */
export type Category = "collab" | "startup" | "ai";

/** 어디서 한 프로젝트인지: 회사 · 창업 · 동아리 · 개인 */
export type Affiliation = "company" | "startup" | "club" | "personal";

export interface ImageAsset {
  src: string;
  alt: string;
  caption?: string;
  /** 갤러리에서 가로로 긴 화면 캡처로 보여줄지 (16:10, 2열) */
  wide?: boolean;
}

export interface LinkItem {
  label: string;
  href: string;
}

/** 포지션 페이지 1개 */
export interface Position {
  id: PositionId;
  title: string;
  /** 홈 메뉴처럼 좁은 곳에 쓰는 짧은 이름 */
  shortTitle: string;
  /** 한 줄 소개 (메타 description으로도 사용) */
  tagline: string;
  intro: string[];
  /** 이 포지션에서 강조할 관점 */
  emphasis: string[];
  /** 홈 HoverImageReveal에 뜨는 이미지 (실제 프로젝트 화면이 흐르는 SVG 콜라주, scripts/position-collage.cjs) */
  cover: ImageAsset & {
    /** 첫 화면 정지 이미지. 처음 로드와 동작 줄이기 설정에서 씁니다. */
    still: string;
  };
}

/** 통계나 조사 결과 묶음 (Background, User Interview) */
export interface Evidence {
  title: string;
  stats: string[];
  /** 출처. 작게 표시합니다. */
  source?: string;
}

/** 지표 정의 (포트폴리오의 "def.") */
export interface MetricDefinition {
  name: string;
  definitions: string[];
}

/** 결과 값. label은 가능하면 MetricDefinition의 이름과 맞춥니다. */
export interface Metric {
  label: string;
  value: string;
  description?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  /** 산출물 종류. 예: "PRD", "화면설계서" */
  artifact?: string;
  /** 세부 항목 */
  points?: string[];
  image?: ImageAsset;
}

/** 플로우 노드. decision이면 branches로 갈라집니다. */
export interface FlowNode {
  label: string;
  kind?: "step" | "decision" | "system" | "end";
  /** 누가 판단하는지 등 짧은 설명 */
  note?: string;
  branches?: { condition: string; label: string }[];
}

export interface FlowDiagram {
  title: string;
  description?: string;
  nodes: FlowNode[];
}

export interface FlowComparison {
  title: string;
  before: FlowDiagram;
  after: FlowDiagram;
}

/** 코드에서 읽어낸 서비스 구조의 한 단계 */
export interface ArchitectureStage {
  title: string;
  /** 이 단계에서 하는 일 */
  items: string[];
  /** 이 단계에 쓴 기술 */
  tech?: string[];
  /** 사람이 보는 화면이면 screen, 자동으로 도는 부분이면 system, 저장 · 배포면 store */
  kind?: "screen" | "system" | "store";
}

/** 서비스 구조도: 왼쪽(위)에서 오른쪽(아래)으로 흐르는 단계 */
export interface Architecture {
  stages: ArchitectureStage[];
}

/** 인프라 구성 요소 하나 (예: Vercel · 웹과 API 라우트 배포) */
export interface InfraNode {
  name: string;
  /** 이 프로젝트에서 맡은 역할 */
  note?: string;
}

/**
 * 인프라 구조: 사용자 화면 → 실행 · 배포 → 데이터 · 외부 API 세 층.
 * 저장소 · 배포 설정에서 확인한 것만 적고, 비어 있는 층은 그리지 않습니다.
 */
export interface Infra {
  client: InfraNode[];
  runtime: InfraNode[];
  data: InfraNode[];
}

/** 결과 → 실패 분석 → 인사이트 → 개선 액션 → 재결과 */
export interface Iteration {
  /** 1차 결과 요약 (예: "핵심 가설 검증 실패") */
  verdict: string;
  /** 1차 결과가 가설 검증 실패인가. true면 결론을 강조색(빨강)으로 보여줍니다. 문구가 아닌 이 값으로 판단합니다. */
  failed?: boolean;
  findings: string[];
  analysis: Evidence;
  insight: string;
  actions: ProcessStep[];
  flow?: FlowComparison;
  after: { verdict: string; metrics: Metric[]; note?: string };
}

/** 프로젝트(케이스 스터디) 1개 */
export interface Project {
  /** URL: /projects/{slug} */
  slug: string;
  title: string;
  /** 한 줄 설명. 예: "스토리 IP 거래 플랫폼" */
  subtitle: string;
  /** 카드와 메타 description에 쓰는 1~2문장 요약 */
  summary: string;
  /** 포지션 페이지 프로젝트 카드에 보여줄 불릿 2~3개. 없으면 summary 문단을 보여줍니다. */
  cardPoints?: string[];
  category: Category;
  /** 이 프로젝트를 근거로 보여줄 포지션. 첫 번째가 대표 포지션입니다. */
  positions: PositionId[];
  featured?: boolean;
  /** "운영 중", "진행 중" 등 현재 상태 */
  status?: string;
  deployment?: Deployment;

  role: string;
  period: string;
  affiliation: Affiliation;
  /** 소속 이름. 예: "인카금융서비스 · AI Lab" */
  organization: string;
  /** 직군별 인원. 예: [{ role: "PM", count: 1 }] */
  team?: { role: string; count: number }[];
  tags: string[];

  logo?: ImageAsset;
  /** 없으면 카드에 구분 색 텍스트 카드를 대신 보여줍니다. */
  thumbnail?: ImageAsset;
  /** Overview 성과 3~4줄 */
  highlights: string[];

  background?: Evidence;
  research?: Evidence;
  problem: { statement: string; points?: string[] };
  hypothesis?: string;
  hypothesisNote?: string;
  metrics?: MetricDefinition[];

  actions: ProcessStep[];
  architecture?: Architecture;
  /** 로컬 프로젝트 안내 문구를 프로젝트에 맞게 바꿀 때 (없으면 공통 문구) */
  localNote?: string;
  infra?: Infra;
  /** metrics가 비어 있으면 결과 장을 생략합니다. */
  outcome: { verdict?: string; summary?: string; metrics: Metric[] };
  iterations?: Iteration[];

  gallery?: ImageAsset[];
  /** wide: 웹 화면 캡처처럼 가로로 긴 이미지 (2열, 16:10) */
  galleryLayout?: "wide";
  retrospective?: string[];
  links?: LinkItem[];
}

/** 케이스 스터디까지는 아닌, 직접 만든 작은 결과물 */
export interface Build {
  name: string;
  /** 이 결과물을 보여줄 포지션 페이지 */
  positions: PositionId[];
  description: string;
  category: Category;
  affiliation: Affiliation;
  organization: string;
  status?: string;
  deployment: Deployment;
  /** 맡은 역할 (직접 만든 경우 생략) */
  role?: string;
  /** 무엇을 어떻게 만들었는지 한두 줄 */
  points: string[];
  stack: string[];
  links: LinkItem[];
  /** GitHub 커밋 수 등 짧은 수치 */
  stat?: string;
}

export interface TimelineItem {
  period: string;
  organization: string;
  role: string;
  description?: string;
  points?: string[];
}

export interface DatedItem {
  date: string;
  title: string;
  issuer: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

/** About 페이지와 홈 소개 */
export interface Profile {
  name: string;
  nameEn: string;
  /** 홈과 메타 description에 쓰는 한 줄 소개 */
  headline: string;
  bio: string[];
  /** AI Product Builder 페이지 프로필 블록에 쓰는 AI 관련 소개 */
  aiBio: string[];
  contact: { birth: string; address: string; email: string; phone: string };
  portrait?: ImageAsset;
  timeline: TimelineItem[];
  activities: TimelineItem[];
  education: TimelineItem[];
  awards: DatedItem[];
  certificates: DatedItem[];
  skills: SkillGroup[];
  resume: { label: string; href: string };
}
