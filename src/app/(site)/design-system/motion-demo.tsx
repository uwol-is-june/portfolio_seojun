"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeUp, hoverLift, revealUp, spring, stagger } from "@/lib/motion";

export default function MotionDemo() {
  const [key, setKey] = useState(0);
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm" variant="secondary" onClick={() => setKey((k) => k + 1)}>
          다시 재생
        </Button>
        <span className="text-small text-subtle">
          prefers-reduced-motion: {reduced ? "reduce (transform 꺼짐)" : "no-preference"}
        </span>
      </div>

      <div key={key} className="grid gap-4 md:grid-cols-3">
        <Demo title="fadeUp + stagger">
          <motion.ul variants={stagger(0.08)} initial="hidden" animate="visible" className="flex flex-col gap-2">
            {["문제 정의", "가설", "실험"].map((t) => (
              <motion.li key={t} variants={fadeUp} className="rounded-sm bg-surface-raised px-3 py-2 text-small">
                {t}
              </motion.li>
            ))}
          </motion.ul>
        </Demo>

        <Demo title="revealUp">
          <motion.div variants={stagger(0.08)} initial="hidden" animate="visible">
            {["PRODUCT", "MANAGER"].map((t) => (
              <span key={t} className="block overflow-hidden">
                <motion.span variants={revealUp} className="block text-h2 font-semibold">
                  {t}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </Demo>

        <Demo title="hoverLift">
          <motion.div
            {...hoverLift}
            className="flex h-24 cursor-pointer items-center justify-center rounded-card border border-line-strong text-small text-muted"
          >
            마우스를 올려보세요
          </motion.div>
        </Demo>
      </div>

      <dl className="grid gap-2 font-mono text-caption text-muted sm:grid-cols-3">
        {Object.entries(spring).map(([name, t]) => (
          <div key={name} className="rounded-sm border border-line px-3 py-2">
            <dt className="text-fg">spring.{name}</dt>
            <dd>
              stiffness {t.stiffness} · damping {t.damping} · mass {t.mass}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Demo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-card border border-line bg-surface p-5">
      <p className="font-mono text-caption text-subtle">{title}</p>
      {children}
    </div>
  );
}
