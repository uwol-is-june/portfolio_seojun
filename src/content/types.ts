/**
 * 포트폴리오 데이터 모델 (TASK-11)
 * 콘텐츠를 채울 때는 이 타입에 맞춰 src/content/ 아래 파일만 수정하면 됩니다.
 * 모르는 내용은 "[TODO] ..."로 남겨두세요.
 */

export type PositionId = "product-manager" | "service-planner" | "ai-product-builder";

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface LinkItem {
  label: string;
  href: string;
}

/** 포지션 페이지 1개 */
export interface Position {
  id: PositionId;
  /** 메뉴, 제목에 쓰는 이름 */
  title: string;
  /** 홈 메뉴처럼 좁은 곳에 쓰는 짧은 이름 */
  shortTitle: string;
  /** 한 줄 소개 (메타 description으로도 사용) */
  tagline: string;
  /** 포지션 소개 문단 */
  intro: string[];
  /** 핵심 역량 3~4개 */
  competencies: { title: string; description: string }[];
  /** 이 포지션에서 강조할 관점. 프로젝트 상세에서도 어떤 부분을 먼저 보여줄지 정합니다. */
  emphasis: string[];
  /** 홈 HoverImageReveal에 뜨는 이미지 */
  cover: ImageAsset;
  /** 페이지 하단 CTA */
  cta: { label: string; href: string };
}

export interface Metric {
  label: string;
  /** 예: "+18%", "3.2배", "[TODO]" */
  value: string;
  description?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  /** 산출물 종류. 예: "유저 플로우", "와이어프레임", "PRD", "프로토타입" */
  artifact?: string;
  image?: ImageAsset;
}

/** 프로젝트(케이스 스터디) 1개 */
export interface Project {
  /** URL: /projects/{slug} */
  slug: string;
  title: string;
  /** 카드와 메타 description에 쓰는 1~2문장 요약 */
  summary: string;
  /** 이 프로젝트를 근거로 보여줄 포지션. 첫 번째가 대표 포지션입니다. */
  positions: PositionId[];
  /** 포지션 페이지 상단에 먼저 보여줄 대표 프로젝트 여부 */
  featured?: boolean;

  /** 메타 정보 */
  role: string;
  period: string;
  team?: string;
  organization?: string;
  tags: string[];

  thumbnail: ImageAsset;

  /** 케이스 스터디 본문 */
  overview: string;
  problem: { statement: string; points: string[] };
  process: ProcessStep[];
  outcome: { summary: string; metrics: Metric[] };
  retrospective: string[];

  links?: LinkItem[];
}

export interface TimelineItem {
  period: string;
  organization: string;
  role: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

/** About 페이지와 홈 소개 */
export interface Profile {
  name: string;
  /** 홈과 메타 description에 쓰는 한 줄 소개 */
  headline: string;
  /** About 소개 문단 */
  bio: string[];
  timeline: TimelineItem[];
  education: TimelineItem[];
  skills: SkillGroup[];
  resume: { label: string; href: string };
  portrait?: ImageAsset;
}
