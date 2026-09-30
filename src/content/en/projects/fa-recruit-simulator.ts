import { faRecruitSimulator as ko } from "../../projects/fa-recruit-simulator";
import type { Project } from "../../types";

const g = ko.gallery ?? [];
const s = ko.architecture?.stages ?? [];

export const faRecruitSimulator: Project = {
  ...ko,
  title: "FA Recruit Simulator",
  subtitle: "An internal tool that pre-checks whether an insurance agent (FA) can be appointed",
  summary:
    "A tool that lets branch staff check an agent's career requirements and restrictions before applying, so they know in advance whether the appointment will go through. I rebuilt an 8,859-line single HTML file in Next.js and aligned the rules with the official manual and company policy.",
  cardPoints: [
    "Pre-checks appointment eligibility from career and restrictions",
    "Rebuilt an 8,859-line single HTML file in Next.js",
    "Aligned the rules with the official manual and policy",
  ],
  status: "Internal tool",
  role: "Planning · development (solo)",
  organization: "Incar Financial Service · AI Lab",
  tags: ["Next.js 16", "TypeScript", "Vitest", "Domain rule design", "Excel · PNG export"],
  thumbnail: ko.thumbnail && { ...ko.thumbnail, alt: "FA recruit simulator start screen" },
  highlights: [
    "Rebuilt a single-HTML tool (8,859 lines · 1.9MB) in Next.js",
    "Two modes: individual and batch (up to 50 people via Excel upload)",
    "Eligible · review · conditional · ineligible verdicts with auto-generated document and to-do checklists",
    "Rules split into pure functions and verified with 25 test files",
  ],
  problem: {
    statement: "The old eligibility tool was one huge HTML file, so the rules were hard to change and verify",
    points: [
      "Many intertwined rules: career recognition, validity periods, re-hire and restriction reasons",
      "Needed a way to confirm verdicts stay correct whenever the official manual or policy changes",
    ],
  },
  actions: [
    {
      title: "Extracting rules and checking them against the manual",
      description:
        "Pulled the rules out of the old tool into documents and compared them with the official manual and policy, writing up mismatches as a defect review and flowchart fixes.",
      artifact: "Manual defect review v1–v3, flowchart fixes",
    },
    {
      title: "Three-step diagnosis flow",
      description:
        "Split the flow into pre-check → career lookup → eligibility, and moved required documents and to-dos out of the steps into a checklist on the result screen, since they are outputs, not inputs.",
      artifact: "Diagnosis flow, screen design",
    },
    {
      title: "Separating and testing the rules",
      description: "Career calculation, restriction reasons (R · S · A · B), and verdict priority are pure functions separate from the UI, verified with Vitest.",
      artifact: "src/lib/domain, 25 test files",
    },
    {
      title: "Sharing results",
      description: "One snapshot fixed at verdict time produces four formats, text copy, PNG, Excel, and PDF, ready to use in reports.",
    },
  ],
  architecture: ko.architecture && {
    stages: [
      { ...s[0], title: "Access · mode", items: ["Shared password", "Individual / batch (Excel upload)"] },
      { ...s[1], title: "① Pre-check", items: ["Special cases (minor · foreigner · office staff · claims adjuster)", "2-question qualification self-check"] },
      { ...s[2], title: "② Career lookup", items: ["Enter dates and career", "Type and validity calculation"] },
      { ...s[3], title: "③ Eligibility", items: ["Restriction cards R · S · A · B", "Final verdict priority"] },
      { ...s[4], title: "Result · share", items: ["Eligible · review · conditional · ineligible", "Document and to-do checklist", "Text · PNG · Excel · PDF"] },
    ],
  },
  outcome: {
    metrics: [
      { label: "Modes", value: "2", description: "Individual · batch (up to 50)" },
      { label: "Share formats", value: "4", description: "Text · PNG · Excel · PDF" },
      { label: "Rule tests", value: "25 files", description: "Vitest" },
    ],
  },
  gallery: [
    { ...g[0], alt: "Pre-check step: special cases and self-check result", caption: "① Pre-check · special cases and type self-check" },
    { ...g[1], alt: "Career step: exam pass date and planned registration date", caption: "② Career lookup · dates and requirement check" },
    { ...g[2], alt: "Eligibility step: review items and result preview", caption: "③ Eligibility · restriction cards" },
    { ...g[3], alt: "Result summary: eligible", caption: "Result · verdict and summary" },
    { ...g[4], alt: "Sharing: copy, Excel, image", caption: "Share · text · Excel · image" },
    { ...g[5], alt: "Batch mode candidate list", caption: "Batch · candidate list and Excel upload" },
    { ...g[6], alt: "Deregistration self-guide case check", caption: "Deregistration self-guide" },
    { ...g[7], alt: "Mode selection screen", caption: "Mode selection · individual / batch" },
  ],
  links: [{ ...(ko.links?.[0] ?? { href: "/demo/fa-recruit" }), label: "Web" }],
  infra: {
    client: [
      { name: "Next.js 16 web", note: "Individual and batch diagnosis, password-locked" },
    ],
    runtime: [],
    data: [
      { name: "Supabase", note: "Connected in the original (removed from the public demo)" },
      { name: "Browser storage", note: "Keeps the batch candidate list" },
      { name: "Excel · PNG export", note: "xlsx-js-style and result images" },
    ],
  },
};
