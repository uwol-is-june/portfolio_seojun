import { cardnewsAgent as ko } from "../../projects/cardnews-agent";
import type { Project } from "../../types";

const g = ko.gallery ?? [];
const s = ko.architecture?.stages ?? [];
const l = ko.links ?? [];

export const cardnewsAgent: Project = {
  ...ko,
  title: "Card News Agent",
  subtitle: "A Claude Code skill that makes Instagram card news",
  summary:
    "A tool that turns one cards.json file into 1080×1350 card images and a caption. All 31 DASII Instagram card news episodes were made with it as a Claude Code skill.",
  cardPoints: [
    "One cards.json → card images · caption",
    "Runs as a skill, checked by rules · GPT · a human",
    "31 DASII Instagram episodes made with it",
  ],
  status: "Live",
  role: "Planning · development (solo)",
  organization: "Side project · DASII",
  tags: ["Claude Code skill", "Node.js", "Headless Edge", "GPT review"],
  thumbnail: ko.thumbnail && { ...ko.thumbnail, alt: "Covers of DASII card news made with the Card News Agent" },
  highlights: [
    "All 31 DASII Instagram card news episodes, from the allulose issue on, made with the agent",
    "Three-step review: rule check → GPT read-through → human review",
    "Every number cites a paper or agency; observational studies never claim causation",
    "Copy lives in data (cards.json); styles and fonts in a shared template",
  ],
  problem: {
    statement: "Designing each card news post by hand took too long, and AI-written copy was easy to spot",
    points: [
      "Laying out every episode from scratch took more time than the writing",
      "AI-written copy mixed in translated-sounding and hedging endings that broke the account's voice",
      "It's health information, so one wrong or exaggerated number loses trust and can break ad rules",
    ],
  },
  actions: [
    {
      title: "Separating data from the template",
      description: "Each episode is one cards.json and a few photos; the scripts, CSS, and fonts are shared by every episode.",
      artifact: "src/render.mjs, src/styles",
    },
    {
      title: "A fixed episode skeleton",
      description:
        "An episode is 5–7 cards. The topic and a one-line takeaway are set first, then one line per card is approved before any copy is written.",
      points: [
        "Cover: states the fact without the reason",
        "Belief: what readers already think",
        "Evidence: numbers and sources",
        "Reason: why it happens",
        "Action: what to do about it",
        "Wrap-up",
      ],
    },
    {
      title: "Three-step review",
      description: "The side that holds the rules writes; a different model listens. Roles are split on purpose.",
      points: [
        "Step 1 check-text: checks countable rules before rendering, such as dashes, sentence length, line breaks, and particles after units",
        "Step 2 read-text: GPT reads it aloud and only flags where it stumbles (it doesn't rewrite and isn't told the style rules)",
        "Step 3 human review: covers seven areas the checks can't, then a pre-publish review against the nine types in Article 8 of the Food Labeling and Advertising Act",
      ],
      artifact: "src/check-text.mjs, src/read-text.mjs",
    },
    {
      title: "Evidence rules",
      description: "Every card has a source line, and conclusions go only as far as the research measured.",
      points: [
        "Every number cites a paper or agency (e.g. Am J Clin Nutr 1983, PNAS 2022, MFDS labeling standards)",
        "Converted values are sourced too, with the conditions (body weight · sample size) in the source line",
        "Observational studies are written as \"the group that did X gained more\", never \"X made them gain\"",
      ],
    },
    {
      title: "Decision log",
      description:
        "For each episode I logged the lines the user pushed back on and why they changed, and moved anything recurring into the rules doc. The next episode reads that doc first.",
      artifact: "docs/CLAUDE.md (rules) · docs/README.md (evidence) · retros",
    },
    {
      title: "Claude Code skill",
      description: "Registered as a skill so card news is made in conversation, stopping at the topic, skeleton, and copy for a human to approve before moving on.",
      artifact: ".claude/skills/cardnews",
    },
  ],
  architecture: ko.architecture && {
    stages: [
      { ...s[0], title: "Plan", items: ["Topic · one-line takeaway", "One-line skeleton per card"] },
      { ...s[1], title: "Draft", items: ["Write cards.json", "A source line on every card"], tech: ["Claude Code skill"] },
      { ...s[2], title: "Review", items: ["Rule check", "GPT read-through", "Human review · compliance"] },
      { ...s[3], title: "Photos", items: ["Search and download photos"] },
      { ...s[4], title: "Render", items: ["1080×1350 PNG", "Caption"] },
      { ...s[5], title: "Publish", items: ["Upload to Instagram"] },
    ],
  },
  outcome: {
    verdict: "31 DASII Instagram card news episodes",
    metrics: [
      { label: "Episodes", value: "31", description: "From the allulose issue (Aug 2026) to Sep 18, per repo history" },
      { label: "Cards rendered in Sep", value: "89", description: "14 episodes from 9/05 to 9/18, 5–7 cards each" },
      { label: "Commits", value: "30", description: "The rules doc is updated with every episode" },
    ],
  },
  gallery: [
    { ...g[0], alt: "No added sugar doesn't mean no sugar", caption: "01 Cover" },
    { ...g[1], alt: "Low sugar applies only to drinks with little sugar", caption: "02 Belief" },
    { ...g[2], alt: "What no added sugar really means", caption: "03 Twist" },
    { ...g[3], alt: "Even without added sugar, the ingredients' sugar stays", caption: "04 Reason" },
    { ...g[4], alt: "A glass of no-added-sugar juice has over three times the low-sugar limit", caption: "05 Evidence" },
    { ...g[5], alt: "To cut sugar, pick low sugar", caption: "06 Action" },
    { ...g[6], alt: "Closing card with the DASII logo", caption: "07 Wrap-up" },
    { ...g[7], alt: "Covers of 14 card news episodes published from Sep 5 to 18", caption: "14 covers, 9/05 – 9/18" },
  ],
  links: [{ ...l[0], label: "Web" }, l[1], l[2]],
  infra: {
    client: [
      { name: "Claude Code", note: "Planning and writing skills" },
      { name: "Instagram", note: "Where finished card news is posted" },
    ],
    runtime: [
      { name: "Local PC · Node.js", note: "Render and copy-check scripts" },
      { name: "Headless Edge", note: "Renders 1080×1350 PNGs" },
    ],
    data: [
      { name: "episodes/ files", note: "cards.json and PNGs per episode" },
      { name: "Pexels API", note: "Photo search" },
      { name: "Codex CLI (GPT)", note: "Read-through review via ChatGPT login" },
    ],
  },
};
