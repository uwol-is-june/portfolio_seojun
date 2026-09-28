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

export interface ImageAsset {
  src: string;
  alt: string;
  caption?: string;
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
  /** 홈 HoverImageReveal에 뜨는 이미지 */
  cover: ImageAsset;
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
  caption?: string;
  stages: ArchitectureStage[];
  /** 흐름 밖의 부가 기능 */
  extras?: string[];
}

/** 결과 → 실패 분석 → 인사이트 → 개선 액션 → 재결과 */
export interface Iteration {
  /** 1차 결과 요약 (예: "핵심 가설 검증 실패") */
  verdict: string;
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
  category: Category;
  /** 이 프로젝트를 근거로 보여줄 포지션. 첫 번째가 대표 포지션입니다. */
  positions: PositionId[];
  featured?: boolean;
  /** "운영 중", "진행 중" 등 현재 상태 */
  status?: string;
  deployment?: Deployment;

  role: string;
  period: string;
  organization?: string;
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
