"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import type { ImageAsset } from "@/content/types";
import { useT } from "@/i18n/locale-provider";
import { cn } from "@/lib/cn";

/**
 * 프로젝트 상세 Screen 갤러리: 이미지를 누르면 모달로 크게 봅니다.
 * 모달은 네이티브 <dialog>(showModal)라 포커스 가두기 · 배경 비활성 · Esc 닫기를 브라우저가 처리합니다.
 * 이전 · 다음은 버튼과 ← → 키로, 바깥(배경) 클릭으로도 닫힙니다. 닫으면 누른 썸네일로 포커스가 돌아갑니다.
 */
export default function Gallery({ images, layout }: { images: ImageAsset[]; layout?: "wide" }) {
  const t = useT();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  // 모든 이미지가 wide면 한 묶음, 아니면 가로 캡처(wide) → 세로 화면 순으로 두 묶음. 모달은 이 순서대로 넘깁니다.
  const groups = layout === "wide" ? [{ wide: true, items: images }] : [
    { wide: true, items: images.filter((img) => img.wide) },
    { wide: false, items: images.filter((img) => !img.wide) },
  ];
  const ordered = groups.flatMap((g) => g.items);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open !== null && !el.open) el.showModal();
    if (open === null && el.open) el.close();
  }, [open]);

  const move = (step: number) => setOpen((i) => (i === null ? i : (i + step + ordered.length) % ordered.length));

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") move(1);
    else if (e.key === "ArrowLeft") move(-1);
    else return;
    e.preventDefault();
  };

  // 이미지 · 버튼 · 캡션이 아닌 빈 배경(data-backdrop)을 눌렀을 때만 닫습니다.
  const onBackdrop = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target instanceof HTMLElement && "backdrop" in e.target.dataset) setOpen(null);
  };

  const current = open === null ? null : ordered[open];
  const many = ordered.length > 1;

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {groups.map(
        (g) =>
          g.items.length > 0 && (
            <ul key={String(g.wide)} className={cn("grid gap-3 md:gap-4", g.wide ? "sm:grid-cols-2" : "grid-cols-2 md:grid-cols-3")}>
              {g.items.map((img) => (
                <li key={img.src} className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(ordered.indexOf(img))}
                    aria-label={t.galleryOpen(img.caption ?? img.alt)}
                    aria-haspopup="dialog"
                    className={cn(
                      "group relative cursor-zoom-in overflow-hidden rounded-card bg-surface",
                      g.wide ? "aspect-[16/10] border border-line" : "aspect-[4/5]",
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes={g.wide ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                      className={cn(
                        "transition-transform duration-500 ease-out-expo group-hover:scale-[1.02]",
                        g.wide ? "object-cover object-top" : "object-contain",
                      )}
                    />
                  </button>
                  {img.caption && <p className="text-caption text-subtle">{img.caption}</p>}
                </li>
              ))}
            </ul>
          ),
      )}

      <dialog
        ref={dialog}
        aria-label={current?.caption ?? current?.alt}
        onClose={() => setOpen(null)}
        data-backdrop
        onClick={onBackdrop}
        onKeyDown={onKeyDown}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-fg backdrop:bg-black/90"
      >
        {current && (
          <div data-backdrop className="flex h-full w-full flex-col items-center justify-center gap-3 px-4 py-14 md:px-20">
            {/* 그림 상자를 실제 그림 크기로만 그려, 옆 빈 곳을 누르면 배경 클릭으로 닫히게 합니다. */}
            <div data-backdrop className="flex min-h-0 w-full flex-1 items-center justify-center">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={0}
                height={0}
                sizes="100vw"
                loading="eager"
                className="h-auto max-h-full w-auto max-w-full"
              />
            </div>
            <p className="flex max-w-3xl items-baseline gap-3 text-center text-small text-white/85">
              {many && (
                <span className="font-mono text-caption text-white/60">
                  {open! + 1} / {ordered.length}
                </span>
              )}
              {current.caption}
            </p>

            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label={t.galleryClose}
              className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-pill bg-white/10 text-h3 text-white transition-colors hover:bg-white/20"
            >
              <span aria-hidden>×</span>
            </button>
            {many && (
              <>
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label={t.galleryPrev}
                  className="absolute bottom-3 left-3 flex size-11 items-center justify-center rounded-pill bg-white/10 text-white transition-colors hover:bg-white/20 md:top-1/2 md:bottom-auto md:-translate-y-1/2"
                >
                  <span aria-hidden>←</span>
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label={t.galleryNext}
                  className="absolute right-3 bottom-3 flex size-11 items-center justify-center rounded-pill bg-white/10 text-white transition-colors hover:bg-white/20 md:top-1/2 md:bottom-auto md:-translate-y-1/2"
                >
                  <span aria-hidden>→</span>
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
