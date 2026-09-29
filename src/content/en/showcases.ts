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
const flowText: Pick<Flow[number], "label" | "text" | "tags" | "branchesTitle" | "snippet" | "lanes" | "contrast" | "pipeline" | "evidence">[] = [
  {
    label: "Plan · project setup",
    text: "I set up the rule docs before any code. The root CLAUDE.md holds only structure, boundaries, and commands; detailed rules live in per-folder docs that are read only when that folder changes. Each rule lives in one place and is never copied, so docs never contradict each other.",
    tags: ["CLAUDE.md", "AGENTS.md", "settings.json", "hooks"],
    snippet: {
      title: "Setup order (shared across repos)",
      lines: [
        "1. CLAUDE.md      structure · boundaries · commands",
        "2. Folder rules   components/ · lib/ · docs/CLAUDE.md",
        "3. docs/TASK.md   task format · model (O)(S)(H)",
        "4. Gates          lint · test often, build before commit",
        "5. Hooks · perms  Stop hook auto-commits output",
        "6. Decision log   why things were rolled back, dated",
      ],
    },
  },
  {
    label: "Infrastructure",
    text: "I add only what the plan needs. Tools I won't use never go in.",
    tags: ["Vercel", "Supabase", "GitHub Actions"],
  },
  {
    label: "Build agents",
    text: "Work with a different point of view goes to its own agent or skill. When one agent handles UI, copy, and review together, the standards blur.",
    tags: [".claude/agents", "Skills", "Subagents"],
  },
  {
    label: "TASK.md · parallel work",
    text: "The most important step. If you just open more sessions, each one sees only its own task and overwrites the same files, so conflicts are frequent and resolving them costs bugs and tokens. So I first split tasks in TASK.md and group the ones that don't touch the same files, then run one session per group.",
    tags: ["docs/TASK.md", "Parallel sessions"],
    contrast: {
      bad: { title: "Just more sessions", points: ["Sessions overwrite the same files", "Bugs and wasted tokens from conflicts"] },
      good: { title: "Group in TASK.md first", points: ["Groups that don't share files run in parallel", "e.g. Podo Wiki: web · app · shared tasks in 3 files"] },
    },
    snippet: {
      title: "docs/TASK.md",
      lines: ["### A · Web (src/)", "- [ ] [TASK-01] (O) Checkout flow @ui-builder", "### B · App (mobile/)", "- [ ] [TASK-02] (S) Notification copy @content-writer", "### C · Shared (docs/)", "- [ ] [TASK-03] (H) Swap terms link"],
    },
    lanes: ["Session A · web", "Session B · app", "Session C · shared"],
  },
  {
    label: "QA · code review",
    text: "The faster AI writes code, the less of it people can read, so review becomes the bottleneck. That's why I run a code review agent on every change.",
    tags: ["/code-review", "qa-reviewer", "build · lint"],
    pipeline: ["AI-written code", "Code review agent · logic errors · bugs", "QA agent · build · lint · responsive", "Ship"],
    evidence: {
      text: "When Anthropic added a code review agent to its own PRs, the share of PRs getting substantive review comments rose from 16% to 54%.",
      source: "Anthropic · Mar 2026",
      href: "https://claude.com/blog/code-review",
    },
  },
  {
    label: "Improve · operate",
    text: "After shipping, I watch acquisition and conversion in GA4 and Amplitude, find where they drop, and run the loop again. Decisions I roll back go into the rules doc with a date and reason, so the next task reads them first.",
    tags: ["GA4", "Amplitude", "Retro notes"],
    branchesTitle: "How I run it",
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
  "GA4 · Amplitude": { need: "Product metrics", tool: "GA4 · Amplitude" },
  "요청 로그 집계 (Vercel)": { need: "Server metrics", tool: "Request log metrics (Vercel)" },
  "App Store · Google Play 출시": { need: "For apps", tool: "App Store · Google Play release" },
  "로컬 · 사내 운영 + 공개 데모": { need: "For live accounts · internal tools", tool: "Local · internal use + public demo" },
};

const agentText: Record<string, string> = {
  "ui-builder": "Sections · components · motion",
  "content-writer": "Intro and project copy (Korean · English)",
  "seo-performance": "Metadata · OG images · performance",
  "qa-reviewer": "Build · responsive · accessibility checks",
  "/investment-team": "4 subagents analyze in parallel from Buffett · Munger · Duan Yongping · Li Lu views",
  "/news-pulse": "4 agents split up the search for why a stock moved",
  "/thesis-tracker": "Tracks whether the thesis still holds after buying",
  "cardnews 스킬": "Makes one episode: plan → draft → review → 1080×1350 render",
};

export const builderShowcase: typeof ko.builderShowcase = {
  flow: ko.builderShowcase.flow.map((step, i) => ({
    ...step,
    ...flowText[i],
    branches: step.branches?.map((b) => ({ ...b, ...(branchText[b.tool] ?? {}), examples: b.examples.map(ex) })),
    agents: step.agents?.map((a) => ({
      project: a.project.slug ? ex(a.project) : { ...a.project, title: "This portfolio" },
      items: a.items.map((it) => ({ name: it.name === "cardnews 스킬" ? "cardnews skill" : it.name, desc: agentText[it.name] ?? it.desc })),
    })),
  })),
};
