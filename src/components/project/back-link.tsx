"use client";

import Link from "@/components/ui/locale-link";
import { useRouter } from "next/navigation";
import { useT } from "@/i18n/locale-provider";

/**
 * 프로젝트 상세 상단의 뒤로가기
 * 사이트 안에서 들어왔으면 브라우저 뒤로가기(포지션 페이지나 홈의 스크롤 위치까지 복원),
 * 공유 링크처럼 바로 들어왔으면 대표 포지션 페이지로 이동합니다.
 */
export default function BackLink({ fallbackHref, fallbackLabel }: { fallbackHref: string; fallbackLabel: string }) {
  const router = useRouter();
  const t = useT();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    // 이 탭에서 사이트 안의 다른 페이지를 거쳐 왔을 때만 브라우저 뒤로가기를 씁니다.
    if ((window.__portfolioNavCount ?? 0) > 1) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <Link
      href={fallbackHref}
      onClick={onClick}
      className="group inline-flex w-fit items-center gap-2 text-small text-muted transition-colors hover:text-fg"
    >
      <span aria-hidden className="transition-transform group-hover:-translate-x-1">
        ←
      </span>
      {t.backToList}
      <span className="sr-only">({fallbackLabel})</span>
    </Link>
  );
}
