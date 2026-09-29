import { devtier as ko } from "../../projects/devtier";
import type { Project } from "../../types";

const g = ko.gallery ?? [];
const s = ko.architecture?.stages ?? [];
const l = ko.links ?? [];

export const devtier: Project = {
  ...ko,
  subtitle: "Developer power score and tier from your GitHub contributions",
  summary:
    "A service that gathers public GitHub activity and gives developers a power score and tier. I defined the metrics and scoring formula myself and built a README tier badge, rankings, and comparisons.",
  cardPoints: ["Scores developers and assigns tiers from GitHub activity", "Defined the metrics and scoring formula", "README tier badge · rankings · user comparison"],
  role: "Planning · development (solo)",
  organization: "Side project",
  thumbnail: ko.thumbnail && { ...ko.thumbnail, alt: "DevTier start screen" },
  highlights: [
    "Scoring formula from contributions · streak · density · peak · stars",
    "Challenger to Bronze tiers by Korean developer percentile, README badge (SVG)",
    "User comparison · rankings by language · bot detection · weakness radar chart",
    "Ran through v0.4.37, 69 commits",
  ],
  problem: { statement: "After Baekjoon Online Judge shut down, developers had no good way to show consistency" },
  actions: [
    {
      title: "Designing the metrics",
      description: "Weighted streaks and contribution density heavily so consistency beats short bursts, and counted stars on a log scale.",
      artifact: "lib/score.ts, lib/tier.ts",
    },
    { title: "Automated collection", description: "Gathers activity through the GitHub GraphQL API and refreshes scores with a GitHub Actions batch.", artifact: ".github/workflows/batch.yml" },
    { title: "Sharing and growth hooks", description: "README badges, downloadable tier cards, comparisons, and tips to raise your score give people a reason to come back." },
  ],
  architecture: ko.architecture && {
    stages: [
      { ...s[0], title: "Search · login", items: ["Enter a GitHub username", "GitHub login"] },
      { ...s[1], title: "Collect data", items: ["Last year of contributions · streak · stars"] },
      { ...s[2], title: "Score · tier", items: ["Power formula", "Percentile → tier", "Bot account penalty"] },
      { ...s[3], title: "Store · batch", items: ["Save scores and history", "Scheduled batch refresh"] },
      { ...s[4], title: "Result · share", items: ["Result · compare · rankings", "SVG badge · tier card"] },
    ],
    extras: ["Achievements", "Korean · English"],
    caption: "Based on the devtier repo",
  },
  gallery: [
    { ...g[0], alt: "DevTier start screen", caption: "Start · measure by GitHub username" },
    { ...g[1], alt: "DevTier result: tier and power score", caption: "Result · tier and power score" },
  ],
  links: [{ ...l[0], label: "Service" }, l[1]],
};
