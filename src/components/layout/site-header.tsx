"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/components/ui/locale-link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import LanguageSwitch from "@/components/layout/language-switch";
import ThemeToggle, { ThemeColorSync } from "@/components/layout/theme-toggle";
import { localizePath } from "@/i18n/config";
import { useLocale, useT } from "@/i18n/locale-provider";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { duration, revealUp, stagger } from "@/lib/motion";

/** 이만큼 내려오면 헤더 배경을 깝니다 (px) */
const SOLID_AFTER = 16;

export default function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useT();
  // 메뉴 주소는 한국어 기준이라, 현재 언어의 주소로 바꿔 비교합니다.
  const isActive = (href: string) => pathname === localizePath(href, locale);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 사이트 안에서 이동한 횟수. 프로젝트 상세의 뒤로가기(BackLink)가 브라우저 뒤로가기를 써도 되는지 판단합니다.
  useEffect(() => {
    window.__portfolioNavCount = (window.__portfolioNavCount ?? 0) + 1;
  }, [pathname]);

  // 다른 페이지로 이동하면 메뉴를 닫습니다.
  if (open && openedAt !== pathname) {
    setOpen(false);
    setOpenedAt(pathname);
  }

  // 스크롤하면 로고 · 메뉴가 본문 위에 겹치지 않도록 배경을 깝니다. 맨 위에서는 투명하게 둡니다.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SOLID_AFTER);
    // 새로고침 후 스크롤 위치가 복원된 경우도 한 번 반영
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // 메뉴가 열려 있는 동안 배경 스크롤을 막고, 첫 링크로 포커스를 옮기고, Esc로 닫습니다.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => {
    setOpenedAt(pathname);
    setOpen((v) => !v);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-safe px-safe">
      {/* 배경은 별도 레이어에 둡니다. header에 backdrop-filter를 걸면 fixed인 모바일 메뉴의 기준이 header로 바뀝니다. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled && !open ? "border-line bg-bg/70 backdrop-blur-md" : "border-transparent",
        )}
      />
      <div className="relative z-10 mx-auto flex h-header w-full max-w-page items-center justify-between px-gutter">
        <Link href="/" className="text-small font-semibold tracking-[0.2em] text-fg">
          {site.name}
        </Link>

        <div className="flex items-center gap-2 lg:gap-6">
        <nav aria-label={t.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} active={isActive(item.href)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* 화면 설정: 언어 · 테마. 모바일에서는 헤더 바가 붐비지 않게 메뉴 안으로 옮깁니다. */}
        <ThemeColorSync />
        <div className="hidden items-center gap-1 lg:flex lg:border-l lg:border-line lg:pl-4">
          <LanguageSwitch />
          <ThemeToggle />
        </div>

        <button
          ref={buttonRef}
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.menuClose : t.menuOpen}
          className="-mr-2 flex size-11 items-center justify-center lg:hidden"
        >
          <span className="relative block h-3 w-6" aria-hidden>
            <span
              className={cn(
                "absolute left-0 h-px w-full bg-fg transition-transform duration-300",
                open ? "top-1/2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-px w-full bg-fg transition-transform duration-300",
                open ? "top-1/2 -rotate-45" : "top-full",
              )}
            />
          </span>
        </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            className="fixed inset-0 bg-bg pt-safe px-safe lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base }}
          >
            <motion.nav
              aria-label={t.mobileNav}
              className="flex h-full flex-col justify-center px-gutter pb-safe"
              variants={stagger(0.05, 0.05)}
              initial="hidden"
              animate="visible"
            >
              <ul className="flex flex-col gap-4">
                {site.nav.map((item) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div variants={revealUp}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "block text-h1 font-medium",
                          isActive(item.href) ? "text-fg" : "text-subtle hover:text-fg",
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div variants={revealUp} className="mt-12 flex items-center gap-2 border-t border-line pt-6">
                <LanguageSwitch />
                <ThemeToggle />
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn("text-small transition-colors", active ? "text-fg" : "text-muted hover:text-fg")}
    >
      {children}
    </Link>
  );
}
