import { coverageAnalysis as ko } from "../../projects/coverage-analysis";
import type { Project } from "../../types";

const g = ko.gallery ?? [];
const s = ko.architecture?.stages ?? [];
const l = ko.links ?? [];

export const coverageAnalysis: Project = {
  ...ko,
  title: "Coverage Analysis",
  subtitle: "Brings scattered insurance policies together and shows the gaps",
  summary:
    "A service that pulls in all of a customer's insurance policies at once, visualizes their coverage, and compares it with recommended amounts to show what's missing. I designed two paths: linking the FSS-certified My Insurance at a Glance service (CODEF API) and uploading a coverage PDF.",
  cardPoints: [
    "Pulls in every policy at once and visualizes coverage",
    "Compares with recommended amounts to flag gaps",
    "My Insurance at a Glance (CODEF) link and PDF upload",
  ],
  role: "Planning · development (solo)",
  organization: "Incar Financial Service · AI Lab",
  tags: ["Next.js 16", "TypeScript", "CODEF API", "Data visualization"],
  thumbnail: ko.thumbnail && { ...ko.thumbnail, alt: "Coverage result: coverage score and policy list (demo data)" },
  highlights: [
    "My Insurance at a Glance (CODEF) link: existing login · sign-up · SMS / PASS verification",
    "Direct coverage PDF upload path",
    "Gap analysis and visualization against recommended coverage",
    "Demo mode that runs on demo data when there's no API key",
  ],
  problem: {
    statement: "Customers' policies were spread across insurers, so it was hard to see what was missing at a glance",
  },
  actions: [
    {
      title: "Designing the connection paths",
      description:
        "Made the My Insurance at a Glance link, which gathers policies from every insurer at once, the recommended path, with a coverage PDF from an insurer or the FSS as the fallback.",
      artifact: "Connection flow, screen design",
    },
    {
      title: "CODEF API integration",
      description: "Split account linking, sign-up, verification, and policy lookup into server APIs, with CAPTCHA handling and response mapping in separate modules.",
      artifact: "/api/codef/*",
    },
    {
      title: "Gap analysis dashboard",
      description: "Shows coverage with policy cards, progress bars per coverage item, and a summary table of gaps against recommended amounts.",
    },
  ],
  architecture: ko.architecture && {
    stages: [
      { ...s[0], title: "Landing · choose a path", items: ["My Insurance at a Glance (recommended)", "Coverage PDF upload"] },
      { ...s[1], title: "Verification", items: ["Existing login / new sign-up", "SMS or PASS second factor"] },
      { ...s[2], title: "Policy lookup", items: ["Server API calls CODEF", "CAPTCHA handling · response mapping", "Demo data when there's no key"] },
      { ...s[3], title: "Gap analysis", items: ["Current vs. recommended coverage"] },
      { ...s[4], title: "Dashboard", items: ["Policy cards", "Progress bar per coverage item", "Gap summary table"] },
    ],
  },
  gallery: [
    { ...g[0], alt: "Choosing how to connect coverage data", caption: "Choose a path · My Insurance at a Glance / PDF upload" },
    { ...g[1], alt: "Account link and second-factor input", caption: "Account link · SMS / PASS verification" },
    { ...g[2], alt: "Coverage score, number of policies, monthly premium, and policy list", caption: "Result · coverage score and policies (demo data)" },
    { ...g[3], alt: "Progress bars per coverage item and gap table", caption: "Coverage · gap analysis (demo data)" },
  ],
  links: [{ ...l[0], label: "Web" }],
  infra: {
    client: [
      { name: "Next.js 16 web", note: "Insurance connection and coverage dashboard" },
    ],
    runtime: [
      { name: "Vercel", note: "Hosts the web app and /api/codef routes" },
    ],
    data: [
      { name: "CODEF API", note: "Looks up policies via the national insurance registry" },
    ],
  },
};
