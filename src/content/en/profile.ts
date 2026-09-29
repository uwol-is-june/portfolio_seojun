import { profile as ko } from "../profile";
import type { Profile } from "../types";

export const profile: Profile = {
  ...ko,
  name: "Seo Jun",
  headline: "Loves collaboration, founded a startup, now an AI PM",
  bio: [
    "Building a product with 10 developers and a designer in an IT student club, and winning the grand prize at Demo Day, showed me how much I enjoy making things together. That experience led me to form my own team and start a company.",
    "I planned products such as Podo Store and Podo Ticket and led every stage from MVP to launch and early growth. Following a problem → hypothesis → metrics → data and VOC validation process, I won KRW 24.9M in startup grants, an excellence award at the Youth Arts Startup Festa Demo Day, and real revenue of about KRW 1.6M.",
    "Now I've picked up AI to go further. I rebuilt a 14.7k-star GitHub open-source project into a service connected to a real brokerage account, validated its stock picks with real money (+21.0% return), and keep building AI products.",
  ],
  contact: { ...ko.contact, address: "9 Soha-ro, Gwangmyeong-si, Gyeonggi-do, Korea" },
  portrait: ko.portrait && { ...ko.portrait, alt: "Portrait of Seo Jun" },
  timeline: [
    {
      period: "Mar 2026 – Present",
      organization: "Incar Financial Service",
      role: "AI PM · AI Strategy Office, AI Lab · Contract",
      points: [
        "Defined company-wide AX projects: sorted about 50 requests from business teams into RPA · IT · AI and prioritized them by savings impact",
        "Planned an insurance product comparison and recommendation service (RAG): FGIs and FA interviews, PRD and requirements spec",
        "Ran four rounds of QA with an outsourced developer: 100% data accuracy, 90%+ intent recognition, moved from POC to full project",
        "Planning an AI agent for FA onboarding inquiries: moving repeated sales-center questions to AI responses (in progress)",
        "Built and deployed three DX projects myself with Claude Code: executive stock report automation (16 business days · about KRW 4.1M saved per year), coverage analysis, FA recruit simulator",
        "Planned and ran company-wide AI training: 14 online and 3 offline sessions, with training content made using AI video tools",
      ],
    },
    {
      period: "Aug 2025 – Mar 2026",
      organization: "Podo Store",
      role: "Founder & Product Manager",
      description: "Formed the team in Jan 2025 and planned and ran Podo Store · Podo Ticket from the pre-startup stage (incorporated Aug 2025)",
      points: [
        "Led product planning and operations for the story IP marketplace Podo Store and Podo Ticket",
        "Won KRW 24.9M in grants | 2025 revenue of KRW 1,595,000",
        "500 members, 110 listed scripts, 1,500 MAU as of Mar 2026",
      ],
    },
  ],
  activities: [
    { period: "Jul 2025", organization: "Hana Financial Group", role: "2025 Hana Social Venture University" },
    {
      period: "Sep 2024 – Feb 2025",
      organization: "NE(O)RDINARY",
      role: "UMC 7th, inter-university IT club",
      points: ["Planned Mungx5 · Demo Day grand prize, Best Part Member award (PLAN)"],
    },
    {
      period: "Jul 2024 – Aug 2024",
      organization: "Hyundai Motor Group",
      role: "Softeer Bootcamp 4th, service planning track",
      points: [
        "KIA SWIPY: a user-driven PBV module recommendation and swap service",
        "Road Trip with Casper EV: a launch event for a new Hyundai Motor Group car",
      ],
    },
  ],
  education: [{ period: "Mar 2018 – Feb 2025", organization: "Kwangwoon University", role: "School of Robotics, Information and Control" }],
  awards: [
    { date: "2025.11.21", title: "Excellence Award, 2025 Youth Arts Startup Festa Demo Day", issuer: "Seoul Foundation for Arts and Culture · Porsche Korea" },
    { date: "2025.09.17", title: "Excellence Award, Kwangwoon University Mock IR Competition", issuer: "Kwangwoon University Industry-Academic Cooperation Foundation" },
    { date: "2025.07.06", title: "Excellence Award, 2025 Startup Idea Camp", issuer: "Kwangwoon University Campus Town" },
    { date: "2025.02.24", title: "Grand Prize, UMC 7th Demo Day", issuer: "NE(O)RDINARY" },
    { date: "2025.02.21", title: "Best Part Member Award (PLAN), UMC 7th", issuer: "NE(O)RDINARY" },
    { date: "2019.12.20", title: "Special Award, 2019 Kwangwoon Startup Idea Competition", issuer: "Seoul Startup Didimteo" },
  ],
  certificates: [
    { date: "2026.08.21", title: "TOEIC Speaking 150 (IH)", issuer: "ETS" },
    { date: "2026.02.15", title: "Google Analytics Certification", issuer: "Google" },
    { date: "2024.07.12", title: "Engineer Big Data Analysis", issuer: "Korea Data Agency" },
    { date: "2021.12.17", title: "SQL Developer (SQLD)", issuer: "Korea Data Agency" },
    { date: "2021.12.03", title: "Advanced Data Analytics Semi-Professional (ADsP)", issuer: "Korea Data Agency" },
  ],
  skills: [
    { category: "Planning · collaboration", items: ["Figma", "MIRO", "MS Office", "Jira", "Confluence", "Notion", "Slack"] },
    { category: "QA", items: ["Test case design", "Manual QA", "Bug report writing"] },
    { category: "Data", items: ["GA4", "SQL", "Python"] },
    { category: "AI", items: ["Claude Code", "Gemini API"] },
  ],
  resume: { ...ko.resume, label: "Resume PDF" },
};
