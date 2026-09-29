import { incarStockReport as ko } from "../../projects/incar-stock-report";
import type { Project } from "../../types";

const g = ko.gallery ?? [];
const s = ko.architecture?.stages ?? [];

export const incarStockReport: Project = {
  ...ko,
  title: "Executive Stock Report",
  subtitle: "Automated stock, financials, and investor-flow collection with an AI analysis dashboard",
  summary:
    "Automated the stock report sent to executives every day. After the market closes on weekdays, it collects data, analyzes it with Gemini, and shows it as a dashboard and PDF, saving 16 business days of reporting a year.",
  cardPoints: [
    "Automated the daily stock report to executives",
    "After close: collect → Gemini analysis → dashboard · PDF",
    "16 business days of reporting saved per year",
  ],
  role: "Planning · development (solo)",
  organization: "Incar Financial Service · AI Lab",
  thumbnail: ko.thumbnail && { ...ko.thumbnail, alt: "Incar Financial Service stock monitor dashboard" },
  highlights: [
    "Collects, analyzes, and deploys at 16:10 every weekday with no one touching it",
    "6-tab dashboard (prices · company info · investor flows · charts · AI analysis) with PDF export",
    "16 business days of reporting, about KRW 4.1M saved per year",
    "307 commits · public GitHub repo",
  ],
  problem: {
    statement: "Someone had to gather and write up the executive stock report by hand every day",
    points: ["Prices, financials, and investor flows came from different sources and were checked separately each time"],
  },
  actions: [
    {
      title: "Automated data collection",
      description: "KRX prices, fundamentals, investor flows, and indices come from pykrx; quarterly financials (TTM net income, total equity) come from DART.",
      artifact: "collector.py",
    },
    {
      title: "AI analysis",
      description: "Gemini writes a market summary and a five-part stock analysis: price, investors, volume, market comparison, and overall view.",
      artifact: "analyzer.py",
    },
    {
      title: "Hands-off deployment",
      description:
        "GitHub Actions runs collection and analysis at 16:10 on weekdays and commits the result JSON, and Vercel redeploys the dashboard automatically.",
      artifact: "daily-collect.yml",
    },
  ],
  architecture: ko.architecture && {
    stages: [
      { ...s[0], title: "Scheduled run", items: ["Runs at 16:10 KST every weekday", "Can also run manually"] },
      { ...s[1], title: "Collect", items: ["Prices · fundamentals · investors · indices", "DART quarterly financials"] },
      { ...s[2], title: "AI analysis", items: ["Market summary", "5-part stock analysis"] },
      { ...s[3], title: "Store · deploy", items: ["Commit JSON per date + index", "Auto redeploy on commit"] },
      { ...s[4], title: "Dashboard", items: ["6 tabs · date picker", "PDF export"] },
    ],
    extras: ["Refresh the AI analysis manually from a local admin screen (FastAPI)"],
    caption: "Based on the incar_stock repo",
  },
  outcome: {
    metrics: [
      { label: "Reporting saved", value: "16 business days/yr", description: "about KRW 4.1M" },
      { label: "Auto run", value: "Every weekday", description: "16:10 KST" },
      { label: "Commits", value: "307", description: "May 2026 – Sep 2026" },
    ],
  },
  gallery: [
    { ...g[0], alt: "Prices tab: current price and last 7 trading days", caption: "Prices · AI overall view" },
    { ...g[1], alt: "Chart tab: 7-day candles · volume · 1-year trend", caption: "Price chart" },
    { ...g[2], alt: "AI analysis tab: price · investors · volume · market comparison · overall", caption: "AI analysis · 5-part stock analysis" },
  ],
  links: [{ ...(ko.links?.[0] ?? { href: "" }), label: "Dashboard" }, ...(ko.links?.slice(1) ?? [])],
  infra: {
    client: [
      { name: "Static dashboard", note: "Static HTML stock report with Chart.js" },
    ],
    runtime: [
      { name: "GitHub Actions", note: "Collects at 16:10 on weekdays and commits the report" },
      { name: "Vercel", note: "Hosts the dashboard and a function that triggers AI refresh" },
    ],
    data: [
      { name: "JSON in the repo", note: "Committed to reports/ instead of a database" },
      { name: "pykrx · DART", note: "Stock prices and disclosures" },
      { name: "Gemini", note: "Analyzes the collected data" },
    ],
    caption: "Based on the incar_stock repo",
  },
};
