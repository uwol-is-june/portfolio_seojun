"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useT } from "@/i18n/locale-provider";
import { cn } from "@/lib/cn";
import { easeOutExpo } from "@/lib/motion";

export type ProjectTab = { id: string; title: string; count: number; description?: string; panel: ReactNode };

/**
 * 프로젝트 묶음(예: 개인 / 회사)을 탭으로 나눠 보여줍니다.
 * 패널은 모두 서버에서 그려 두고 고른 탭만 보이게 해서, 검색 · 공유 미리보기에서도 내용이 빠지지 않습니다.
 * 고른 탭은 주소 해시(#personal 등)로 남겨 새로고침 · 링크 공유 때 유지됩니다. 키보드는 ← → Home End.
 */
export default function ProjectTabs({ tabs }: { tabs: ProjectTab[] }) {
  const t = useT();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  // 주소 해시로 첫 탭을 정하고, 뒤로 가기 등으로 해시가 바뀌면 따라갑니다.
  useEffect(() => {
    const sync = () => {
      const i = tabs.findIndex((tab) => `#${tab.id}` === window.location.hash);
      if (i >= 0) setActive(i);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [tabs]);

  const select = (i: number) => {
    setActive(i);
    // 스크롤이 튀지 않게 해시만 바꿉니다.
    history.replaceState(null, "", `#${tabs[i].id}`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const target = (next + tabs.length) % tabs.length;
    select(target);
    refs.current[target]?.focus();
  };

  return (
    <div className="mt-10">
      <div role="tablist" aria-label={t.projectGroups} className="flex gap-1 border-b border-line">
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "relative -mb-px px-4 pt-2 pb-3 text-h3 font-semibold transition-colors duration-200",
                selected ? "text-fg" : "text-subtle hover:text-muted",
              )}
            >
              {tab.title}
              <span className="ml-2 text-body font-normal text-subtle">{tab.count}</span>
              {selected && (
                <motion.span
                  layoutId="project-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-fg"
                  transition={{ duration: 0.3, ease: easeOutExpo }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 감싸는 요소를 늘 같게 두어 탭을 바꿔도 목록이 다시 마운트되지 않게 합니다 (애니메이션 값만 바뀜). */}
      {tabs.map((tab, i) => (
        <div key={tab.id} id={`panel-${tab.id}`} role="tabpanel" aria-labelledby={`tab-${tab.id}`} hidden={i !== active}>
          <motion.div
            initial={false}
            animate={i === active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
          >
            {tab.description && <p className="mt-4 text-small text-subtle">{tab.description}</p>}
            {tab.panel}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
