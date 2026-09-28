"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type MouseEvent,
  type PointerEvent,
} from "react";
import HoverImageReveal from "@/components/originkit/ui/hover-image-reveal";

type Props = Omit<
  ComponentProps<typeof HoverImageReveal>,
  "rowGap" | "imageWidth" | "imageHeight" | "offsetX" | "offsetY"
> & {
  maxFontSize?: number;
  minFontSize?: number;
};

const TOUCH_QUERY = "(hover: none) and (pointer: coarse)";
const EDGE = 12; // 이미지가 화면 가장자리에서 떨어지는 최소 거리
const FINGER_GAP = 24; // 터치 시 손가락과 이미지 사이 간격

function subscribeTouch(onChange: () => void) {
  const mql = window.matchMedia(TOUCH_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function useIsTouch() {
  return useSyncExternalStore(
    subscribeTouch,
    () => window.matchMedia(TOUCH_QUERY).matches,
    () => false,
  );
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/**
 * Originkit HoverImageReveal을 화면 크기와 입력 방식에 맞춰 감싸는 래퍼입니다.
 * - 가장 긴 줄이 화면 너비에 맞도록 폰트 크기를 측정해서 조절합니다.
 * - 이미지 크기, 줄 간격, 이미지 위치를 화면 너비에 비례해서 정합니다.
 * - 터치 기기에서는 탭한 위치 위(공간이 없으면 아래)에 이미지를 화면 안쪽으로 띄우고,
 *   링크가 있는 항목은 첫 탭에 미리보기, 두 번째 탭에 이동합니다.
 */
export default function ResponsiveHoverImageReveal({
  maxFontSize = 61,
  minFontSize = 20,
  font,
  style,
  ...rest
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const armedLinkRef = useRef<HTMLAnchorElement | null>(null);
  const isTouch = useIsTouch();
  const [width, setWidth] = useState(0);
  const [fontSize, setFontSize] = useState<number | null>(null);
  const [tapOffset, setTapOffset] = useState({ x: 0, y: 0 });

  const imageWidth = width ? clamp(Math.round(width * 0.38), 140, 300) : 300;
  const imageHeight = Math.round((imageWidth * 4) / 3);
  const rowGap = fontSize ? clamp(Math.round(fontSize * 0.45), 10, 30) : 30;

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 가장 긴 줄이 좌우 여백 안에 들어오도록 폰트 크기를 맞춥니다.
  useLayoutEffect(() => {
    const root = wrapperRef.current?.firstElementChild as HTMLElement | null;
    if (!root || !width) return;
    const fit = () => {
      const spans = root.querySelectorAll<HTMLElement>("span:not([aria-hidden])");
      if (!spans.length) return;
      const cs = getComputedStyle(root);
      const available =
        root.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const current = parseFloat(getComputedStyle(spans[0]).fontSize);
      const widest = Math.max(...Array.from(spans, (s) => s.scrollWidth));
      if (!widest || !current) return;
      const next = clamp(
        Math.floor(current * (available / widest) * 0.98),
        minFontSize,
        maxFontSize,
      );
      setFontSize((prev) => (prev === next ? prev : next));
    };
    fit();
    document.fonts?.ready.then(fit);
  }, [width, fontSize, minFontSize, maxFontSize]);

  // 터치: 탭 위치 기준으로 이미지가 화면 밖으로 나가지 않도록 오프셋을 계산합니다.
  const onPointerDownCapture = (e: PointerEvent<HTMLDivElement>) => {
    if (!armedLinkRef.current?.contains(e.target as Node)) {
      armedLinkRef.current = null;
    }
    if (e.pointerType === "mouse") return;
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const halfW = imageWidth / 2;
    const halfH = imageHeight / 2;
    const cx = clamp(px, halfW + EDGE, rect.width - halfW - EDGE);
    const above = py - FINGER_GAP - imageHeight >= EDGE;
    const cy = clamp(
      above ? py - FINGER_GAP - halfH : py + FINGER_GAP + halfH,
      halfH + EDGE,
      rect.height - halfH - EDGE,
    );
    setTapOffset({ x: Math.round(cx - px), y: Math.round(cy - py) });
  };

  // 터치: 링크 항목은 첫 탭에서 미리보기만 보여주고 두 번째 탭에서 이동합니다.
  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (!isTouch) return;
    const link = (e.target as HTMLElement).closest("a");
    if (!link || !wrapperRef.current?.contains(link)) return;
    if (armedLinkRef.current !== link) {
      e.preventDefault();
      armedLinkRef.current = link;
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="h-full w-full"
      onPointerDownCapture={onPointerDownCapture}
      onClickCapture={onClickCapture}
    >
      <HoverImageReveal
        {...rest}
        font={{
          fontFamily: "var(--font-sans), sans-serif",
          fontWeight: 400,
          lineHeight: "0.9em",
          letterSpacing: "-0.05em",
          ...font,
          fontSize: fontSize ?? `min(${maxFontSize}px, 8vw)`,
        }}
        rowGap={rowGap}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        offsetX={isTouch ? tapOffset.x : Math.round(imageWidth * (2 / 3))}
        offsetY={isTouch ? tapOffset.y : 0}
        style={{
          paddingTop: "max(24px, env(safe-area-inset-top))",
          paddingRight: "max(24px, env(safe-area-inset-right))",
          paddingBottom: "max(24px, env(safe-area-inset-bottom))",
          paddingLeft: "max(24px, env(safe-area-inset-left))",
          ...style,
        }}
      />
    </div>
  );
}
