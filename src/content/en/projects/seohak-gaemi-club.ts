import { seohakGaemiClub as ko } from "../../projects/seohak-gaemi-club";
import type { Project } from "../../types";

const g = ko.gallery ?? [];
const l = ko.links ?? [];

export const seohakGaemiClub: Project = {
  ...ko,
  title: "Seohak Gaemi Club",
  subtitle: "AI US stock research built on four legendary investors' strategies",
  localNote:
    "This project runs locally, so I attached a public demo. Only the Toss Securities API that loads the real account uses mock data; the stock reports and their content in the demo are real output from agents I ran myself. Code and docs are on GitHub.",
  summary:
    "I rebuilt a 14.7k-star GitHub open-source tool for Chinese stocks into a US-market version and connected a real brokerage account through the Toss Securities API. Buying its picks with real money returned +21.0% in two weeks.",
  cardPoints: [
    "Rebuilt a 14.7k★ China-market tool for US stocks",
    "Real brokerage account via the Toss Securities API",
    "Real-money picks: +21.0% in two weeks",
  ],
  status: "In progress",
  role: "Planning · development (solo)",
  period: "2026.06 – Present",
  organization: "Side project",
  tags: ["Claude Code", "Multi-agent", "Toss Securities API", "SEC XBRL", "Next.js"],
  logo: ko.logo && { ...ko.logo, alt: "Seohak Gaemi Club logo" },
  thumbnail: ko.thumbnail && { ...ko.thumbnail, alt: "Seohak Gaemi Club dashboard portfolio screen (mock data)" },
  highlights: [
    "Rebuilt a 14.7k★ China-market open-source tool for US stocks",
    "Systematized the strategies of Buffett · Munger · Li Lu · Duan Yongping",
    "Real brokerage account via Toss Securities API · decide → log → review loop",
    "Picks validated with real money · +21.0% return",
  ],
  background: {
    title: "Korean retail investors crowd into US stocks and lost 16.5% in two months",
    stats: [
      "Korean retail holdings of US stocks lost about 16.5% in Jun–Jul 2026",
      "Far worse than the S&P 500 (−1.9%) and Nasdaq (−6.9%) over the same period",
    ],
    source: "Aug 2026 Korea Securities Depository SEIBro · Aju Business Daily",
  },
  research: {
    title: "Trading without criteria, and on emotion",
    stats: [
      "76.2% said they have no clear criteria for picking stocks; 85.7% have bought or sold on emotion",
      "An analysis of 170,000 retail investors found they sell 9.67 days after buying on average (half within 3 days)",
    ],
    source: "Jul 2026 in-depth interviews with 21 retail investors · 2025 Korea Capital Market Institute trading analysis",
  },
  problem: {
    statement: "Without decision criteria, investors chased hype and traded on emotion",
    points: ["No decision criteria → chasing hype · emotional trades → losses"],
  },
  hypothesis:
    "If investors analyze stocks with the four masters' strategies and log and review their own decisions, hype-chasing and emotional trades will drop and returns will improve",
  metrics: [
    { name: "Real-money return", definitions: ["Return on system picks bought in a real account and held"] },
    { name: "Excess return vs. benchmark", definitions: ["Picks' return over the S&P 500 · Nasdaq-100 in the same period"] },
    { name: "Improvement over emotional trading", definitions: ["Gap between past gut-feel returns and system-based returns"] },
  ],
  actions: [
    {
      title: "Rebuilding the open source for US stocks",
      description:
        "Rewrote xbtlin/ai-berkshire (MIT), an open-source tool for Chinese A-shares and Hong Kong, for US stocks. Cut the skills from 20 to 12 and made it read SEC XBRL financial data directly.",
      artifact: "12 Claude Code skills",
    },
    {
      title: "Four masters as parallel agents",
      description: "Turned four value-investing masters' criteria into separate agents that analyze at the same time and challenge each other.",
      points: [
        "Duan Yongping: business model (is it a good business at all?)",
        "Buffett: financials · valuation (what price is cheap?)",
        "Munger: industry · competition (how does this company die?)",
        "Li Lu: risk (will it still exist in 10 years?)",
      ],
    },
    {
      title: "Decide → log → review loop",
      description:
        "Forces a conclusion (buy · avoid · watch), writes each call to a ledger that can't be edited, and scores it automatically against actual Yahoo prices. Every piece of evidence gets a confidence grade, and math runs in Python Decimal instead of the LLM.",
      artifact: "Call ledger, auto scoring",
    },
    {
      title: "Real-account dashboard",
      description: "Connected the real-account portfolio to a Next.js dashboard through the Toss Securities Open API, alongside reports, track record, and an earnings calendar.",
    },
  ],
  architecture: ko.architecture && {
    stages: [
      { ...ko.architecture.stages[0], title: "Command", items: ["Call one of 12 skills", "e.g. /investment-team AAPL"], tech: ["Claude Code skills"] },
      { ...ko.architecture.stages[1], title: "Data collection", items: ["Pull financials straight from SEC XBRL", "Prices · news · filings", "Confidence grade per source"] },
      {
        ...ko.architecture.stages[2],
        title: "Four masters in parallel",
        items: ["Duan · Buffett · Munger · Li Lu agents run together", "Challenge each other → combined report", "Math in Python Decimal"],
        tech: ["4 sub-agents", "financial_rigor.py"],
      },
      { ...ko.architecture.stages[3], title: "Record", items: ["Save reports as Markdown · a hook commits to local git", "Append buy · watch · avoid calls to the ledger (immutable)"], tech: ["reports/*.md", "calls.jsonl", "Stop hook"] },
      { ...ko.architecture.stages[4], title: "Scoring", items: ["Compare price at call time with actual Yahoo prices", "Direction hit · target reached · error"] },
      { ...ko.architecture.stages[5], title: "Dashboard", items: ["Portfolio · track record · per-stock reports", "Articles · earnings checks · bottleneck signals"], tech: ["Next.js", "Toss Securities Open API"] },
    ],
    extras: ["Financial data only behind a password login", "Runs locally because the Toss API requires an IP allowlist"],
    caption: "Based on the seohak-gaemi-club repo · 12 skills · Python tools · Next.js dashboard",
  },
  outcome: {
    verdict: "Real-money picks returned +21.0% in two weeks",
    metrics: [
      { label: "Real-money return", value: "+21.0%", description: "Picks bought in a real account (held about 2 weeks)" },
      { label: "Excess return vs. benchmark", value: "About 20%", description: "vs. S&P 500 · Nasdaq-100 in the same period" },
      { label: "Improvement over emotional trading", value: "45%", description: "Emotional trading −24.1% → system +21.0%" },
    ],
  },
  gallery: [
    { ...g[0], alt: "Dashboard portfolio tab: holding cards and daily change table", caption: "Dashboard · Portfolio (mock data instead of the real Toss account)" },
    { ...g[1], alt: "Dashboard track record tab: calls per stock and distance to entry price", caption: "Dashboard · Track record (call ledger · Yahoo prices, holdings are mock data)" },
    { ...g[2], alt: "Dashboard per-stock reports tab: an AI infrastructure industry report", caption: "Dashboard · Per-stock reports (field → sector → stock)" },
    { ...g[3], alt: "Dashboard articles tab: publishing status and a SpaceX price move article", caption: "Dashboard · Articles" },
    { ...g[4], alt: "Dashboard earnings tab: next earnings date per holding", caption: "Dashboard · Earnings calendar (holdings are mock data)" },
    { ...g[5], alt: "Real-account return on the picks", caption: "Metrics 1 · Real-money return" },
    { ...g[6], alt: "S&P 500 return over the same period", caption: "Metrics 2 · vs. S&P 500" },
    { ...g[7], alt: "Nasdaq-100 return over the same period", caption: "Metrics 2 · vs. Nasdaq-100" },
    { ...g[8], alt: "Past emotional trading return", caption: "Metrics 3 · Past emotional trading" },
  ],
  links: [
    { ...l[0], label: "Open demo" },
    l[1],
    { ...l[2], label: "Original open source" },
  ],
  infra: {
    client: [
      { name: "Claude Code", note: "Analysis skills and 4 subagents" },
      { name: "Next.js dashboard", note: "Local dashboard for reports and holdings" },
    ],
    runtime: [
      { name: "Local PC", note: "npm run dev and Python tools" },
    ],
    data: [
      { name: "reports · data files", note: "Report markdown and calls.jsonl pick log" },
      { name: "SEC EDGAR · Yahoo Finance", note: "Financials and prices" },
      { name: "Toss Securities Open API", note: "Real-account holdings and FX" },
    ],
    caption: "Based on the seohak-gaemi-club repo · runs locally with no external server",
  },
};
