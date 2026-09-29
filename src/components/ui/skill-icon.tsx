import {
  siClaude,
  siConfluence,
  siFigma,
  siGoogleanalytics,
  siGooglegemini,
  siJira,
  siMiro,
  siNotion,
  siPython,
} from "simple-icons";
import { cn } from "@/lib/cn";

/**
 * 스킬 이름 → 아이콘
 * 브랜드 아이콘은 simple-icons(CC0)에서 가져오고, simple-icons에 없는 것(Slack, MS Office 등 상표 문제로 빠진 것)과
 * 도구가 아닌 스킬(SQL, QA)은 일반 아이콘으로 그립니다. 검은 배경에서 모두 읽히도록 단색(currentColor)으로 씁니다.
 */
const brand: Record<string, { path: string }> = {
  Figma: siFigma,
  MIRO: siMiro,
  Jira: siJira,
  Confluence: siConfluence,
  Notion: siNotion,
  GA4: siGoogleanalytics,
  Python: siPython,
  "Claude Code": siClaude,
  "Gemini API": siGooglegemini,
};

/** 24×24 기준 선 아이콘 */
const generic: Record<string, React.ReactNode> = {
  Slack: (
    <path d="M9 3 7 21M17 3l-2 18M4 8.5h17M3 15.5h17" />
  ),
  "MS Office": (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  SQL: (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      <path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </>
  ),
  "Test Case 설계": (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1M9 12l2 2 4-4" />
    </>
  ),
  "Manual QA": (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.5-4.5" />
    </>
  ),
  "버그 리포트 문서화": (
    <>
      <rect x="7" y="7" width="10" height="13" rx="5" />
      <path d="M12 11v9M7 13H4M20 13h-3M7 17l-2.5 1.5M17 17l2.5 1.5M8.5 7 7 4.5M15.5 7 17 4.5" />
    </>
  ),
};

// 영어판 스킬 이름도 같은 아이콘을 씁니다.
generic["Test case design"] = generic["Test Case 설계"];
generic["Bug report writing"] = generic["버그 리포트 문서화"];

export default function SkillIcon({ name, className }: { name: string; className?: string }) {
  const icon = brand[name];
  if (icon) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={cn("size-5 fill-current", className)}>
        <path d={icon.path} />
      </svg>
    );
  }
  const g = generic[name];
  if (!g) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("size-5 fill-none stroke-current", className)}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {g}
    </svg>
  );
}
