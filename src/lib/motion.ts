import type { Transition, Variants } from "framer-motion";

/**
 * 공통 모션 프리셋 (TASK-06)
 * 홈의 HoverImageReveal 값을 기준으로 맞춘 spring과 자주 쓰는 패턴입니다.
 * prefers-reduced-motion은 MotionProvider(MotionConfig reducedMotion="user")에서 일괄 처리합니다.
 */
export const spring = {
  /** 텍스트 슬라이드, 이미지 전환 (HoverImageReveal 기본값) */
  snappy: { type: "spring", stiffness: 400, damping: 40, mass: 1 },
  /** 커서를 따라오는 요소 (HoverImageReveal follow) */
  follow: { type: "spring", stiffness: 60, damping: 28, mass: 0.5 },
  /** 페이지 진입, 큰 요소의 등장 */
  gentle: { type: "spring", stiffness: 120, damping: 24, mass: 1 },
} satisfies Record<string, Transition>;

export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.5,
} as const;

/** globals.css의 --ease-out-expo와 같은 값 */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** 아래에서 떠오르며 등장 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring.gentle },
};

/** 부모에 붙여서 자식이 순서대로 등장 */
export const stagger = (step = 0.06, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: step, delayChildren: delay } },
});

/** 마스크 안에서 글자가 아래에서 올라오는 reveal. 부모에 overflow-hidden 필요 */
export const revealUp: Variants = {
  hidden: { y: "100%" },
  visible: { y: "0%", transition: spring.snappy },
};

/** 호버 시 살짝 떠오름. whileHover/whileTap에 그대로 넘깁니다. */
export const hoverLift = {
  whileHover: { y: -4 },
  whileTap: { scale: 0.98 },
  transition: spring.snappy,
} as const;

/** 스크롤로 화면에 들어올 때 한 번 재생 */
export const inView = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.3 },
} as const;
