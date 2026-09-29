import { positions as ko } from "../positions";
import type { Position } from "../types";

const text: Record<Position["id"], Pick<Position, "tagline" | "intro" | "emphasis"> & { alt: string }> = {
  "product-manager": {
    tagline: "A PM who goes from problem → hypothesis → metrics → validation, and redesigns from the cause when it fails",
    intro: [
      "At Podo Store, the startup I founded, I led every stage from MVP development to launch and early growth. When the platform had zero transactions after launch, customer interviews showed the cause was a lack of platform trust. Trust-building actions then brought 13 transactions and KRW 1,595,000 in revenue.",
      "In an IT student club, I shipped an app with 10 developers and a designer through OKR sprints and won the grand prize at Demo Day.",
    ],
    emphasis: ["Problem definition", "Hypothesis testing", "Metric design", "Prioritization", "OKR"],
    alt: "Screens from projects I led as a Product Manager: Podo Store · Podo Ticket · Seohak Gaemi Club · Mungx5",
  },
  "service-planner": {
    tagline: "A service planner who takes apart on-site flows and designs them so users never have to guess",
    intro: [
      "Running Podo Ticket at live venues, I watched audiences get stuck choosing between advance and on-site booking. I removed the choice and let the system decide, cutting on-site confusion VOC by 80%.",
      "As the planner on a 12-person team, I wrote the PRD and screen specs and shipped the app. To introduce payments, I designed the policy end to end: comparing PG providers, handling payment edge cases, and revising the terms.",
    ],
    emphasis: ["User flow", "Screen design", "Policy design", "On-site operations", "QA"],
    alt: "App screens from my service planning work: Podo Ticket · Mungx5 · Podo Store",
  },
  "ai-product-builder": {
    tagline: "An AI Product Builder who builds with AI and validates by actually using it",
    intro: [
      "I rebuilt a 14.7k-star GitHub investment-analysis tool for the US market, connected a real brokerage account through the Toss Securities API, and validated its picks by buying them with real money: a +21.0% return.",
      "At work, I built and shipped an executive stock-report automation, a pre-appointment diagnosis simulator, and a coverage analysis program with Claude Code. On my own, I build and run DevTier, Diet Saju, Podo Wiki, and a Card News Agent.",
    ],
    emphasis: ["Real-money validation", "Multi-agent", "Work automation", "LLM services", "Self-deployed"],
    alt: "Screens from services I built as an AI Product Builder: Card News Agent · Coverage Analysis · DevTier · FA Recruit Simulator and more",
  },
};

export const positions: Position[] = ko.map((p) => {
  const t = text[p.id];
  return { ...p, tagline: t.tagline, intro: t.intro, emphasis: t.emphasis, cover: { ...p.cover, alt: t.alt } };
});
