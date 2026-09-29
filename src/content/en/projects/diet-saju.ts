import { dietSaju as ko } from "../../projects/diet-saju";
import type { Project } from "../../types";

const s = ko.architecture?.stages ?? [];
const l = ko.links ?? [];

export const dietSaju: Project = {
  ...ko,
  title: "Diet Saju",
  subtitle: "Your temperament and habits read through Saju (Korean four pillars), analyzed with Gemini",
  summary:
    "A service that calculates a Saju chart from the birth date and time and writes the reading with Gemini. The calculation, which must never be wrong, stays in code; the LLM only writes the sentences.",
  cardPoints: ["Calculates Saju from birth date and time, Gemini writes the reading", "Code does the math, the LLM only writes text"],
  role: "Planning · development (solo)",
  organization: "Side project · DASII",
  thumbnail: ko.thumbnail && { ...ko.thumbnail, alt: "Diet Saju start screen" },
  highlights: [
    "Saju math (stems and branches · five elements · ten gods) in code; only the reading uses an LLM",
    "Calendar math with true solar time, daylight saving, and standard meridian corrections",
    "Results cross-checked with Vitest, per-IP rate limit",
    "101 commits",
  ],
  problem: { statement: "If an LLM also does the Saju math, results change every time and can be wrong" },
  actions: [
    {
      title: "Drawing the line between math and interpretation",
      description: "Calendar conversion, element balance, and luck cycles are pure functions; the LLM only receives the results and writes the reading.",
      artifact: "lib/saju, lib/prompt.ts",
    },
    { title: "Verifying the math", description: "Cross-checked the solar-term calendar math with tests and documented the results and limits.", artifact: "saju-validation.md" },
    { title: "Key protection and rate limits", description: "The Gemini key is used only in the server API, with a per-IP limit on requests per minute." },
  ],
  architecture: ko.architecture && {
    stages: [
      { ...s[0], title: "Choose a reading", items: ["A page per reading type"] },
      { ...s[1], title: "Input", items: ["Birth date, time, place", "Inputs kept in memory only"] },
      { ...s[2], title: "Saju math", items: ["Calendar → chart", "True solar time · DST correction", "Element balance · luck cycles"] },
      { ...s[3], title: "Write the reading", items: ["Prompt built from the results", "Per-minute rate limit"] },
      { ...s[4], title: "Result", items: ["Chart + reading"] },
    ],
    caption: "Based on the diet-saju repo",
  },
  links: [{ ...l[0], label: "Web" }, l[1]],
  infra: {
    client: [
      { name: "Next.js web", note: "Input and reading screens" },
    ],
    runtime: [
      { name: "Vercel", note: "Hosts the web app and API routes; the Gemini key stays on the server" },
      { name: "GitHub Actions", note: "Lint, typecheck, tests, and build on every push" },
    ],
    data: [
      { name: "Gemini API", note: "Writes the reading" },
      { name: "Upstash Redis", note: "View and like counters per reading type" },
      { name: "No input storage", note: "Birth data is handled in memory only" },
    ],
    caption: "Based on the diet-saju repo and live site",
  },
};
