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

const p = {
  cardnews: titles["cardnews-agent"],
  seohak: titles["seohak-gaemi-club"],
  devtier: titles.devtier,
  wiki: titles["podo-wiki"],
  stock: titles["incar-stock-report"],
  saju: titles["diet-saju"],
  coverage: titles["coverage-analysis"],
};

type Flow = (typeof ko.builderShowcase)["flow"];
const flowText: Omit<Flow[number], "icon" | "key">[] = [
  {
    label: "Project setup",
    points: [
      "I set up the rule docs before any code.",
      "The root CLAUDE.md holds only structure, boundaries, and commands; detailed rules live in per-folder docs.",
      "Each rule lives in one place, so docs never contradict each other.",
    ],
    sequence: {
      title: "Setup order",
      nodes: [
        { name: "CLAUDE.md", desc: "structure · boundaries · commands" },
        { name: "Folder rules", desc: "components/ · lib/ · docs/CLAUDE.md" },
        { name: "docs/TASK.md", desc: "task format · model (O)(S)(H)" },
        { name: "Gates", desc: "lint · test often, build before commit" },
        { name: "Hooks · perms", desc: "Stop hook auto-commits output" },
        { name: "Decision log", desc: "why things were rolled back, dated" },
      ],
    },
  },
  {
    label: "Infrastructure setup",
    points: [],
    choices: [
      {
        group: "Frontend",
        rows: [
          { when: "One or two screens, no server logic", pick: "Static deploy · HTML + Chart.js", examples: [p.stock] },
          { when: "Many screens: login, input, results", pick: "Dynamic deploy · Next.js", examples: [p.devtier, p.saju, p.coverage, p.wiki] },
          { when: "Needs a mobile app too", pick: "Expo (React Native)", examples: [p.wiki] },
          { when: "A tool only I use", pick: "Local Next.js dashboard", examples: [p.seohak] },
        ],
      },
      {
        group: "Backend",
        rows: [
          { when: "Call external APIs with hidden keys", pick: "Next.js API routes (Vercel functions)", examples: [p.saju, p.coverage, p.devtier] },
          { when: "Collect or compute on a schedule", pick: "GitHub Actions cron", examples: [p.stock, p.devtier] },
          { when: "No server, runs on my PC", pick: "Node.js · Python scripts", examples: [p.cardnews, p.seohak] },
          { when: "Needs generated text", pick: "Gemini API (math stays in code)", examples: [p.saju, p.stock] },
        ],
      },
      {
        group: "Data",
        rows: [
          { when: "Login + relational data", pick: "Supabase (Postgres · Auth)", examples: [p.devtier, p.wiki] },
          { when: "Just view and like counters", pick: "Upstash Redis", examples: [p.saju] },
          { when: "Only needs to keep a record", pick: "JSON · files committed to the repo", examples: [p.stock, p.seohak] },
        ],
      },
      {
        group: "Deploy · automation",
        rows: [
          { when: "Anyone can open it", pick: "Vercel", examples: [p.devtier, p.saju, p.stock, p.wiki] },
          { when: "Check every push", pick: "GitHub Actions CI", examples: [p.saju] },
          { when: "Ship to app stores", pick: "EAS Build · Submit", examples: [p.wiki] },
        ],
      },
    ],
  },
  {
    label: "Build agents",
    points: [
      "Common agents are set up first in every project.",
      "When a project needs another point of view, I add agents or skills for it.",
      "When one agent handles UI, copy, and review together, the standards blur.",
    ],
    layers: {
      common: {
        title: "Common · every project",
        items: [
          { name: "ui-builder", desc: "Screens · components" },
          { name: "content-writer", desc: "Copy (Korean · English)" },
          { name: "qa-reviewer", desc: "Build · responsive · accessibility checks" },
          { name: "seo-performance", desc: "Metadata · performance" },
        ],
      },
      extra: {
        title: "When needed · per project",
        projects: [
          {
            project: p.seohak,
            why: "Investment calls need cross-checking from several points of view",
            items: ["/investment-team", "/news-pulse", "/thesis-tracker"],
          },
          {
            project: p.cardnews,
            why: "Every episode has to follow the same rules from plan to render",
            items: ["cardnews skill"],
          },
        ],
      },
    },
  },
  {
    label: "TASK.md · parallel work",
    points: [
      "The most important step.",
      "Just opening more sessions means they overwrite the same files: conflicts, bugs, wasted tokens.",
      "So I first split tasks in TASK.md and group the ones that don't share files.",
      "Then I run one session per group, all at once.",
    ],
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
    points: [
      "The faster AI writes code, the less of it people can read, so review becomes the bottleneck.",
      "So agents check every change first, and only what passes ships.",
    ],
    sequence: {
      title: "From one change to production",
      nodes: [
        { name: "AI-written code", desc: "one task = one change" },
        { name: "Code review agent", desc: "logic errors · bugs", agent: true },
        { name: "QA agent", desc: "build · lint · responsive", agent: true },
        { name: "Ship", desc: "push to main" },
      ],
    },
    stats: [
      {
        value: "10–20%",
        label: "Faster PR completion (median) across 5,000 repos using AI code review",
        source: "Microsoft · Jul 2025",
        href: "https://devblogs.microsoft.com/engineering-at-microsoft/enhancing-code-quality-at-scale-with-ai-powered-code-reviews/",
      },
      {
        value: "84%",
        label: "Large PRs (1,000+ lines) where it found issues, 7.5 on average",
        source: "Anthropic · Mar 2026",
        href: "https://claude.com/blog/code-review",
      },
      {
        value: "<1%",
        label: "Findings that turned out to be wrong",
        source: "Anthropic · Mar 2026",
        href: "https://claude.com/blog/code-review",
      },
    ],
  },
  {
    label: "Improve · operate",
    points: [
      "After shipping, I watch the metrics, find where they drop, and run the loop again.",
      "Rolled-back decisions go into the rules doc with a date and reason.",
    ],
    sequence: {
      title: "Improvement cycle",
      nodes: [
        { name: "Ship · release", desc: "Vercel for web, stores for apps, public demos for internal tools" },
        { name: "Watch metrics", desc: "GA4 · Amplitude · request logs" },
        { name: "Find the drop", desc: "screens where acquisition or conversion breaks" },
        { name: "Log the decision", desc: "date and reason in the rules doc" },
      ],
      loopBack: "Back to 01 Project setup for the next task",
    },
  },
];

export const builderShowcase: typeof ko.builderShowcase = {
  flow: ko.builderShowcase.flow.map((step, i) => ({ icon: step.icon, key: step.key, ...flowText[i] })),
};
