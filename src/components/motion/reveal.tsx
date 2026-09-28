"use client";

import { motion } from "framer-motion";
import { fadeUp, inView } from "@/lib/motion";

/** 스크롤로 화면에 들어오면 아래에서 떠오르며 한 번 등장합니다. */
export default function Reveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={fadeUp} {...inView} className={className}>
      {children}
    </motion.div>
  );
}
