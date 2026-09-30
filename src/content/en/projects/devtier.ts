import { devtier as ko } from "../../projects/devtier";
import type { Project } from "../../types";

const g = ko.gallery ?? [];
const s = ko.architecture?.stages ?? [];
const l = ko.links ?? [];

export const devtier: Project = {
  ...ko,
  subtitle: "Log in with GitHub once to see your rank and top % among Korean developers",
  summary:
    "GitHub Actions collects GitHub activity for 2,742 Korean developers every week. Log in, and your activity is scored with the same formula to show where you rank among Korean developers, your top %, and your tier. I defined the metrics and scoring formula myself.",
  cardPoints: [
    "Weekly GitHub Actions collection of 2,742 Korean developers",
    "Log in to get your rank · top % · tier instantly",
    "Defined 9 metrics and the scoring formula",
  ],
  role: "Planning · development (solo)",
  organization: "Side project",
  thumbnail: ko.thumbnail && { ...ko.thumbnail, alt: "DevTier start screen" },
  highlights: [
    "Weekly automated collection of 2,742 Korean developers with GitHub Actions",
    "One login gives your rank and top % among Korean developers",
    "Scoring formula from 9 metrics: contributions · streak · density · peak · stars and more",
    "Top 100 are Challenger, Diamond to Bronze by percentile, README badge (SVG)",
  ],
  problem: { statement: "After Baekjoon Online Judge shut down, developers had no good way to show consistency" },
  actions: [
    {
      title: "Designing the metrics",
      description: "Weighted streaks and contribution density heavily so consistency beats short bursts, and counted stars on a log scale.",
      artifact: "lib/score.ts, lib/tier.ts",
    },
    {
      title: "Collecting the comparison pool",
      description: "Finds developers in Korea and Seoul through GitHub search, and a weekly GitHub Actions batch refreshes their activity, scores, and tiers through the GraphQL API. 2,742 developers form the pool today.",
      artifact: ".github/workflows/batch.yml",
    },
    {
      title: "Your rank right after login",
      description: "Logging in with GitHub scores your activity instantly with the same formula, compares it against the collected Korean developers to show your rank, top %, and tier, then adds you to the rankings.",
      artifact: "lib/getScoreData.ts",
    },
    { title: "Sharing and growth hooks", description: "README badges, downloadable tier cards, comparisons, and tips to raise your score give people a reason to come back." },
  ],
  architecture: ko.architecture && {
    stages: [
      { ...s[0], title: "Weekly batch", items: ["Find and collect Korean developers", "Refresh scores · tiers weekly"] },
      { ...s[1], title: "Comparison pool", items: ["2,742 Korean developers", "Scores · percentiles · history"] },
      { ...s[2], title: "GitHub login", items: ["Log in or enter a username"] },
      { ...s[3], title: "Score · rank", items: ["9 metrics → power score", "Rank · top % among Korean devs", "Bot account penalty"] },
      { ...s[4], title: "Result · share", items: ["Rank · top % · tier", "SVG badge · tier card"] },
    ],
  },
  outcome: {
    metrics: [
      { label: "Korean developers collected", value: "2,742", description: "Weekly GitHub Actions batch · live site" },
      { label: "Score metrics", value: "9" },
      { label: "Refresh cycle", value: "Weekly" },
    ],
  },
  gallery: [
    { ...g[0], alt: "DevTier start screen", caption: "Start · measure by GitHub username" },
    { ...g[1], alt: "DevTier result: tier and power score", caption: "Result · tier and power score" },
    { ...g[2], alt: "Weakness radar and score history on the result page", caption: "Result · weakness radar and score history" },
    { ...g[3], alt: "Full ranking table of Korean developers", caption: "Full ranking · 2,742 Korean developers" },
    { ...g[4], alt: "Live status: indexed users, update cycle, and tier distribution", caption: "Live status · tier distribution and score formula" },
    { ...g[5], alt: "Core features: tier system, power algorithm, README badge", caption: "Core features · tiers · power score · README badge" },
  ],
  links: [{ ...l[0], label: "Web" }, l[1]],
  infra: {
    client: [
      { name: "Next.js web", note: "Rankings, results, and comparisons" },
      { name: "SVG badge", note: "Tier image for your README" },
    ],
    runtime: [
      { name: "Vercel", note: "Hosts the web app and API routes" },
      { name: "GitHub Actions", note: "Weekly collection, scoring, and tier batch" },
    ],
    data: [
      { name: "Supabase", note: "Postgres and GitHub login (Auth)" },
      { name: "GitHub GraphQL API", note: "Contributions, stars, and PR data" },
    ],
  },
};
