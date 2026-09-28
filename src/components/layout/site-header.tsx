"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { duration, revealUp, stagger } from "@/lib/motion";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
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
      <div className="relative z-10 mx-auto flex h-header w-full max-w-page items-center justify-between px-gutter">
        <Link href="/" className="text-small font-semibold tracking-[0.2em] text-fg">
          {site.name}
        </Link>

        <nav aria-label="주요 메뉴" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} active={pathname === item.href}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
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
              aria-label="모바일 메뉴"
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
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={cn(
                          "block text-h1 font-medium",
                          pathname === item.href ? "text-fg" : "text-subtle hover:text-fg",
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
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
