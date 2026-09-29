import { mungx5 as ko } from "../../projects/mungx5";
import type { Project } from "../../types";

const g = ko.gallery ?? [];

export const mungx5: Project = {
  ...ko,
  title: "Mungx5",
  subtitle: "Gamified drinking habit tracker",
  summary:
    "A drinking log app built with 10 developers and a designer in UMC 7th, an inter-university IT club. It launched on iOS and Android, is still running, and won the Demo Day grand prize among 69 teams.",
  cardPoints: [
    "Drinking log app built with 10 devs and a designer",
    "Launched on iOS · Android, still running",
    "Demo Day grand prize among 69 teams",
  ],
  status: "Live",
  role: "Service planning (PM)",
  period: "2025.01 – Present",
  organization: "UMC 7th, inter-university IT club",
  team: [
    { role: "PM", count: 1 },
    { role: "Designer", count: 1 },
    { role: "FE", count: 4 },
    { role: "BE", count: 6 },
  ],
  tags: ["Gamification", "PRD", "Screen specs", "OKR sprints", "iOS · Android"],
  logo: ko.logo && { ...ko.logo, alt: "Mungx5 app icon" },
  thumbnail: ko.thumbnail && { ...ko.thumbnail, alt: "Mungx5 app screen mockup" },
  highlights: [
    "Launched on iOS · Android with 10 developers and a designer, still running",
    "Demoed to about 300 people · satisfaction 4.83 · NPS 74",
    "Demo Day grand prize among 69 teams · Best Part Member award (PLAN)",
  ],
  background: {
    title: "High-risk drinking becoming a habit",
    stats: ["Monthly drinking rate among adults: 58.0%", "High-risk drinking among annual drinkers: 17.3% (rising 5 years in a row)"],
    source: "2023 Gyeongsangbuk-do Mental Health Statistics · national drinking data",
  },
  research: {
    title: "People want to cut down but don't act on it",
    stats: [
      "81% think they should drink less, but only 27% have tried",
      "72% said they don't know exactly how often they drink",
    ],
    source: "Jan 2025 survey of 86 high-risk drinkers",
  },
  problem: {
    statement: "The gap between how much people think they drink and how much they actually drink blocks the motivation to cut down",
    points: ["Low self-awareness of drinking frequency → weak motivation to cut down"],
  },
  hypothesis:
    "If users log their own drinking and see the pattern visually, their self-awareness of drinking frequency will grow and more of them will try to cut down or quit",
  hypothesisNote: "I chose gamification to give people a reason to keep logging.",
  metrics: [
    {
      name: "Retention",
      definitions: ["D1 / D3 / D7 retention → whether logging led to cutting down", "W1 / W2 / W4 retention → whether the app became a habit"],
    },
    { name: "Cut-down attempt rate", definitions: ["Share of users who stayed dry for 3–5 days after logging a drink"] },
    { name: "Goal achievement rate", definitions: ["Share of users who hit their monthly drinking goal"] },
  ],
  actions: [
    {
      title: "Design",
      description: "Found the core features (drink log · calendar · monthly report) through user interviews and wrote the PRD and screen specs.",
      artifact: "PRD, screen specs",
    },
    {
      title: "Operations",
      description: "Ran sprints based on OKRs.",
      points: ["Objectives → KR · Initiative → Epic → weekly scrum"],
    },
    {
      title: "Collaboration",
      description: "As the service planner of a 12-person team with 10 developers and a designer, led the app to its iOS · Android launch.",
    },
  ],
  outcome: {
    verdict: "From an iOS · Android launch to the Demo Day grand prize",
    summary: "Demoed the service to about 300 people at Demo Day and collected feedback surveys.",
    metrics: [
      { label: "Satisfaction", value: "4.83", description: "Demo Day survey" },
      { label: "NPS", value: "74" },
      { label: "Demo Day", value: "Grand prize", description: "69 teams · hosted by NE(O)RDINARY" },
      { label: "Part award", value: "Best PLAN" },
    ],
  },
  gallery: [
    { ...g[0], alt: "Mungx5 home screen", caption: "Home · today's log" },
    { ...g[1], alt: "Mungx5 drinking calendar", caption: "Drinking calendar" },
    { ...g[2], alt: "Mungx5 monthly drinking report", caption: "Monthly report" },
    { ...g[3], alt: "Group photo at the UMC 7th Demo Day booth", caption: "UMC 7th Demo Day" },
    { ...g[4], alt: "UMC 7th Demo Day grand prize certificate", caption: "Demo Day grand prize" },
    { ...g[5], alt: "UMC 7th Best Part Member certificate", caption: "Best Part Member (PLAN)" },
  ],
};
