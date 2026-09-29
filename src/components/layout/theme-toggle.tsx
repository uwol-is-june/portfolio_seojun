"use client";

import { useEffect, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { useT } from "@/i18n/locale-provider";
import { THEME_STORAGE_KEY } from "@/lib/theme";

type Theme = "light" | "dark";

const MEDIA = "(prefers-color-scheme: light)";
const EVENT = "themechange";

function current(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia(MEDIA).matches ? "light" : "dark";
}

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(MEDIA);
  mql.addEventListener("change", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    mql.removeEventListener("change", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

/** 지금 적용된 테마 (고른 값이 없으면 기기 설정) */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, current, () => "dark" as Theme);
}

/**
 * 모바일 브라우저 상단 색(theme-color)을 지금 테마에 맞춥니다. 레이아웃의 theme-color는 기기 설정만 따르므로
 * 사이트에서 고른 테마와 다를 수 있습니다. 테마 버튼이 모바일 메뉴 안에 있어도 동작하도록 따로 항상 둡니다.
 */
export function ThemeColorSync() {
  const theme = useTheme();
  useEffect(() => {
    const color = getComputedStyle(document.body).backgroundColor;
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => {
      m.content = color;
    });
  }, [theme]);
  return null;
}

/** 다크 ↔ 라이트 전환 버튼. 고른 값은 저장되어 다음 방문에도 유지됩니다. */
export default function ThemeToggle({ className }: { className?: string }) {
  const t = useT();
  const theme = useTheme();
  const next: Theme = theme === "dark" ? "light" : "dark";


  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* 저장이 막힌 환경(시크릿 창 등)에서는 이번 방문에만 적용 */
    }
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={next === "light" ? t.toLight : t.toDark}
      title={next === "light" ? t.lightMode : t.darkMode}
      className={cn("flex size-9 items-center justify-center rounded-pill text-muted transition-colors hover:bg-surface-raised hover:text-fg", className)}
    >
      {theme === "dark" ? (
        // 해: 누르면 라이트로
        <svg aria-hidden viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        // 달: 누르면 다크로
        <svg aria-hidden viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  );
}
