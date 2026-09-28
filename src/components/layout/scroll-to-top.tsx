"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** 이만큼 내려오면 버튼이 나타납니다 (px) */
const SHOW_AFTER = 600;

/**
 * 맨 위로 이동 플로팅 버튼
 * - 일정 이상 스크롤했을 때만 오른쪽 아래에 나타남 (safe-area를 피함)
 * - 누르면 부드럽게 맨 위로, 동작 줄이기 설정이면 즉시 이동
 * - 이동 후 키보드 포커스를 헤더 첫 링크로 옮겨 탭 순서가 맨 위에서 다시 시작되게 함
 * - 모바일 메뉴(z-50)가 열리면 그 아래에 가려짐
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    // 새로고침 후 스크롤 위치가 복원된 경우도 한 번 반영
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.75rem))] z-40 md:right-8 md:bottom-8",
        "flex size-12 items-center justify-center rounded-pill border border-line-strong bg-surface/90 text-fg shadow-lg backdrop-blur",
        "transition-[opacity,transform,background-color,color] duration-300 hover:bg-fg hover:text-bg",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="size-5 fill-none stroke-current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
