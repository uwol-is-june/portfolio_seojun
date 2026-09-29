import type { Category } from "@/content/types";
import type { Dict } from "@/i18n/ui";

/** 프로젝트 구분별 이름과 색 클래스 (색은 globals.css의 --color-collab / startup / ai) */
export const categories: Record<Category, { label: string; text: string; bg: string; border: string }> = {
  collab: { label: "협업", text: "text-collab", bg: "bg-collab", border: "border-collab" },
  startup: { label: "창업", text: "text-startup", bg: "bg-startup", border: "border-startup" },
  ai: { label: "AI", text: "text-ai", bg: "bg-ai", border: "border-ai" },
};

/** OG 이미지처럼 CSS 변수를 못 쓰는 곳에서 쓰는 색 값 */
export const categoryHex: Record<Category, string> = {
  collab: "#12d18e",
  startup: "#b18cff",
  ai: "#ff4d6d",
};

/** 구분 이름을 현재 언어로 (협업 · 창업 · AI) */
export function categoryLabel(category: Category, t: Dict): string {
  return category === "collab" ? t.catCollab : category === "startup" ? t.catStartup : "AI";
}
