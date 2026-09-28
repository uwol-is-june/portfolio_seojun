"use client";

import { MotionConfig } from "framer-motion";
import { spring } from "@/lib/motion";

/** OS의 "동작 줄이기" 설정을 켠 사용자에게는 transform 애니메이션을 끄고 opacity만 남깁니다. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={spring.snappy}>
      {children}
    </MotionConfig>
  );
}
