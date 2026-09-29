import * as ko from "../showcases";

/** 영어판 강조 섹션. 구조와 이미지 · 링크는 한국어판(../showcases)을 그대로 쓰고 문구만 옮깁니다. */

const titles: Record<string, string> = {
  "podo-store": "Podo Store",
  "podo-ticket": "Podo Ticket",
  "cardnews-agent": "Card News Agent",
  "seohak-gaemi-club": "Seohak Gaemi Club",
  devtier: "DevTier",
  "podo-wiki": "Podo Wiki",
  "incar-stock-report": "Executive Stock Report",
  "diet-saju": "Diet Saju",
  "coverage-analysis": "Coverage Analysis",
  "fa-recruit-simulator": "FA Recruit Simulator",
};
const ex = (e: { title: string; slug: string }) => ({ ...e, title: titles[e.slug] ?? e.title });

export const pmShowcase: typeof ko.pmShowcase = {
  loop: {
    project: ex(ko.pmShowcase.loop.project),
    steps: [
      { label: "Hypothesis", text: "If we offer a script distribution platform, users will take early actions such as listing scripts and signing contracts" },
      { label: "First result", text: "60 members · 10 scripts · 3,891 views, but zero paid purchases", tone: "fail" as const },
      { label: "Failure analysis", text: "In-depth interviews with 5 theater companies under MOU: too few successful matches, too few scripts" },
      { label: "Insight", text: "The key barrier to early conversion is platform trust" },
      { label: "Actions", text: "Online workshops · script matching project · theater conference · PG integration" },
      { label: "Result", text: "13 paid purchases · KRW 1,595,000 revenue, 15 MOUs", tone: "success" as const },
    ],
  },
  metricTable: {
    caption: "Podo Store metrics before and after (as of Dec 2025)",
    columns: ["Metric group", "Definition", "First", "After", "Change"],
    rows: [
      ["Acquisition · supply", "Members", "60", "140", "+133%"],
      ["Acquisition · supply", "Scripts listed", "10", "29", "+190%"],
      ["Discovery · engagement", "Script views", "3,891", "6,784", "+74%"],
      ["Discovery · engagement", "Paid purchases", "0", "13", "KRW 1,595,000"],
      ["Early contract actions", "Theater company MOUs", "5", "15", "+200%"],
    ],
  },
  okr: {
    caption: "OKR-based sprints for the 12-person Mungx5 team",
    steps: ["Objectives", "KR · Initiative", "Epic", "Weekly scrum"],
  },
};

export const plannerShowcase: typeof ko.plannerShowcase = {
  flowProject: ex(ko.plannerShowcase.flowProject),
  payment: {
    caption: "PG integration to introduce paid transactions at Podo Store",
    steps: [
      "Compared policies and fees of major PG providers",
      "Designed the payment flow and edge-case handling",
      "Chose NICEPAY after a technical and policy fit review",
      "Revised the payment terms of service and privacy policy",
    ],
  },
  screens: [
    { ...ko.plannerShowcase.screens[0], alt: "Mungx5 home screen", caption: "Mungx5 · Home" },
    { ...ko.plannerShowcase.screens[1], alt: "Mungx5 monthly report screen", caption: "Mungx5 · Monthly report" },
    { ...ko.plannerShowcase.screens[2], alt: "Podo Ticket guest list screen", caption: "Podo Ticket · Guest list" },
    { ...ko.plannerShowcase.screens[3], alt: "Podo Ticket live seat map", caption: "Podo Ticket · Seat map" },
  ],
  documents: {
    columns: ["Document", "Project", "Content"],
    rows: [
      ["PRD · screen specs", "Mungx5", "Core features from user interviews, shipped on iOS · Android"],
      ["Payment flow · terms", "Podo Store", "PG integration, edge cases, privacy policy"],
    ],
  },
  other: [
    { title: "KIA SWIPY", description: "Planned a user-driven PBV module recommendation and swap service", context: "Softeer Bootcamp 4th · Hyundai Motor Group" },
    { title: "Road Trip with Casper EV", description: "Planned a launch event for a new Hyundai Motor Group car", context: "Softeer Bootcamp 4th · Hyundai Motor Group" },
  ],
};

type Flow = (typeof ko.builderShowcase)["flow"];
const flowText: Pick<Flow[number], "label" | "text" | "tags" | "snippet" | "lanes">[] = [
  {
    label: "Plan · project setup",
    text: "I write the plan before any code. CLAUDE.md holds the goals, rules, and structure, and the project is set up from that document.",
    tags: ["CLAUDE.md", "AGENTS.md"],
    snippet: {
      title: "CLAUDE.md (this portfolio)",
      lines: ["# Project", "- Personal portfolio · Next.js · TypeScript · Tailwind", "- Positions: PM · Service Planner · AI Product Builder", "", "# Tasks", "- Log tasks in docs/TASK.md", "- Pick the model by difficulty: (O) · (S) · (H)"],
    },
  },
  {
    label: "Infrastructure",
    text: "I add only what the plan needs. Tools I won't use never go in.",
    tags: ["Vercel", "Supabase", "GitHub Actions"],
  },
  {
    label: "Build agents",
    text: "I create sub-agents and skills for each role in the plan, so work with different perspectives, such as UI, copy, and QA, is split up.",
    tags: [".claude/agents", "Skills"],
    snippet: {
      title: ".claude/agents (this portfolio)",
      lines: ["ui-builder       sections · components · motion", "content-writer   intro · project copy", "seo-performance  metadata · performance · deploy", "qa-reviewer      build · responsive · a11y checks"],
    },
  },
  {
    label: "Write TASK.md",
    text: "I break requests into one-line tasks and attach the right model and agent. Tasks that can run at the same time are grouped.",
    tags: ["docs/TASK.md"],
    snippet: {
      title: "docs/TASK.md",
      lines: ["- [ ] [TASK-01] (O) Design checkout flow @ui-builder", "- [ ] [TASK-02] (S) Intro copy @content-writer", "- [ ] [TASK-03] (H) Swap links"],
    },
  },
  {
    label: "Parallel sessions",
    text: "Tasks that don't touch the same files run in separate sessions at the same time.",
    tags: ["Parallel sessions"],
    lanes: ["Session A · TASK-01", "Session B · TASK-02", "Session C · TASK-03"],
  },
  {
    label: "QA · code review",
    text: "QA and code review agents check the build, lint, and responsive layout, and I sign off wherever the direction could split.",
    tags: ["qa-reviewer", "code-review", "build · lint"],
  },
  {
    label: "Improve · operate",
    text: "After shipping, I run the same loop again. Anything I rolled back goes into the rules doc with a date, so the next task reads it first.",
    tags: ["Retro notes"],
  },
];

const branchText: Record<string, { need: string; tool: string }> = {
  Vercel: { need: "Deploy", tool: "Vercel" },
  Supabase: { need: "DB · auth", tool: "Supabase" },
  "cron job (GitHub Actions)": { need: "Scheduled runs", tool: "cron job (GitHub Actions)" },
  "GitHub Actions CI": { need: "Test automation", tool: "GitHub Actions CI" },
  "Gemini · Claude API (계산은 코드로)": { need: "Text generation", tool: "Gemini · Claude API (math stays in code)" },
  "API 연동 (DART · SEC · CODEF · 토스증권)": { need: "External data", tool: "APIs (DART · SEC · CODEF · Toss Securities)" },
  "Expo EAS": { need: "App builds", tool: "Expo EAS" },
  "GPT 읽기 검사": { need: "A second pair of eyes on copy", tool: "GPT read-through" },
  "App Store · Google Play 출시": { need: "For apps", tool: "App Store · Google Play release" },
  "로컬 · 사내 운영 + 공개 데모": { need: "For live accounts · internal tools", tool: "Local · internal use + public demo" },
};

export const builderShowcase: typeof ko.builderShowcase = {
  flow: ko.builderShowcase.flow.map((step, i) => ({
    ...step,
    ...flowText[i],
    branches: step.branches?.map((b) => ({ ...b, ...(branchText[b.tool] ?? {}), examples: b.examples.map(ex) })),
  })),
};
