import { podoStore as ko } from "../../projects/podo-store";
import type { Project } from "../../types";

const g = ko.gallery ?? [];

export const podoStore: Project = {
  ...ko,
  title: "Podo Store",
  subtitle: "Story IP marketplace",
  summary:
    "A marketplace that connects writers' story IP with theater companies. After launch it had zero transactions; I traced the cause to a lack of platform trust and fixed it, reaching 13 transactions and KRW 1,595,000 in revenue.",
  cardPoints: [
    "Marketplace linking writers' story IP to theater companies",
    "Diagnosed zero transactions as a lack of platform trust",
    "13 transactions · KRW 1,595,000 after the fix",
  ],
  status: "Live",
  organization: "Podo Store",
  team: [
    { role: "PM", count: 1 },
    { role: "Designer", count: 1 },
    { role: "FE", count: 2 },
    { role: "BE", count: 2 },
    { role: "Marketer", count: 1 },
  ],
  tags: ["Startup", "Hypothesis testing", "VOC analysis", "PG integration", "IR · MOU"],
  logo: ko.logo && { ...ko.logo, alt: "Podo Store logo" },
  thumbnail: ko.thumbnail && { ...ko.thumbnail, alt: "Podo Store script browsing screen" },
  highlights: [
    "0 → 13 transactions · KRW 1,595,000 revenue",
    "500 members · 110 listed scripts · 1,500 MAU (Mar 2026)",
    "6 startup programs · KRW 24.9M in grants",
    "Excellence Award, 2025 Youth Arts Startup Festa Demo Day",
  ],
  background: {
    title: "A story IP market built around individual creators",
    stats: ["71.9% of story writers are individual creators", "50.9% of content companies buy work directly from creators by email"],
    source: "2024 KOPIS Performing Arts Survey · 2021 Story IP Trade Survey",
  },
  research: {
    title: "Few distribution channels, so writers rely on informal ones",
    stats: [
      "57.1% of writers said they lack ways to publish their work",
      "62.1% said distribution depends on informal routes such as personal emails and referrals",
    ],
    source: "Sep 2024 in-depth interviews with 58 story writers · 2022 Story Industry Survey",
  },
  problem: {
    statement: "A market with many individual creators but no formal channel to connect them, so trade stalls",
    points: [
      "Content companies: \"hard to find new creators and story IP\" (32.3%)",
      "Story writers: \"ran into legal problems\" because of informal distribution (28.2%)",
    ],
  },
  hypothesis:
    "If we give writers and content companies a distribution platform, the inefficiency in distribution will go away and users will take early actions such as listing scripts and signing contracts",
  metrics: [
    { name: "Early acquisition and supply", definitions: ["Members", "Scripts listed"] },
    { name: "Discovery and engagement", definitions: ["Script views", "Paid purchase conversion"] },
    { name: "Early contract actions", definitions: ["Theater company MOUs"] },
  ],
  actions: [
    {
      title: "Designing and launching the platform",
      description: "Designed and launched a marketplace where writers list scripts and theater companies browse and buy them.",
      artifact: "Service planning, screen design",
    },
    {
      title: "Commercialization",
      description: "Led the business side, including IR and MOUs, and won 6 startup programs and KRW 24.9M in grants.",
      artifact: "IR deck, business plan",
    },
  ],
  outcome: {
    verdict: "Early activation worked, but zero transactions",
    metrics: [
      { label: "Members", value: "60" },
      { label: "Scripts listed", value: "10" },
      { label: "Script views", value: "3,891" },
      { label: "Paid purchases", value: "0 (0%)" },
      { label: "MOUs", value: "5" },
    ],
  },
  iterations: [
    {
      verdict: "Core hypothesis failed",
      failed: true,
      findings: [
        "Meaningful early activity on the supply side (60 members, 10 scripts)",
        "Discovery and engagement also looked positive (3,891 views, 5 theater company MOUs)",
        "But no contracts or purchases happened",
      ],
      analysis: {
        title: "User interviews on why transactions didn't happen",
        stats: [
          "In-depth interviews with the 5 theater companies under MOU about why they didn't buy",
          "The main reasons were too few successful matches and too few scripts",
        ],
      },
      insight: "The key barrier to early conversion is platform trust",
      actions: [
        {
          title: "Online workshops",
          description: "Ran online workshops for writers to grow the script catalog.",
          points: ["40 writers took part", "Every participant listed a script on the platform"],
        },
        {
          title: "Script matching project",
          description: "Created successful matches through the platform ourselves.",
          points: ["Matched 4 top workshop scripts", "46 people attended the showcase"],
        },
        {
          title: "University theater club conference",
          description: "Hosted and ran a conference for theater companies, our customers, to introduce the platform.",
          points: ["26 theater companies, 120 attendees", "Signed MOUs and grew the network"],
          image: ko.iterations?.[0]?.actions[2]?.image && { ...ko.iterations[0].actions[2].image, alt: "Group photo of the university theater club conference" },
        },
        {
          title: "PG integration",
          description: "Added payments so paid transactions were possible.",
          artifact: "Payment flow, edge-case process, terms",
          points: [
            "Compared policies and fees of major PG providers",
            "Designed the payment flow and edge-case handling",
            "Chose NICEPAY after a technical and policy fit review",
            "Revised the payment terms of service and privacy policy",
          ],
        },
      ],
      after: {
        verdict: "Core hypothesis validated and transactions converted",
        metrics: [
          { label: "Members", value: "140", description: "+133%" },
          { label: "Scripts listed", value: "29", description: "+190%" },
          { label: "Script views", value: "6,784", description: "+74%" },
          { label: "Paid purchases", value: "13", description: "KRW 1,595,000 revenue" },
          { label: "MOUs", value: "15", description: "+200%" },
        ],
        note: "As of Dec 2025. As of Mar 2026: 500 members, 110 listed scripts, 1,500 MAU",
      },
    },
  ],
  gallery: [
    { ...g[0], alt: "Online workshop for writers", caption: "Online workshop · 40 writers" },
    { ...g[1], alt: "Script matching project showcase", caption: "Script matching showcase" },
    { ...g[2], alt: "Group photo from the theater conference", caption: "Theater conference · 26 companies, 120 people" },
    { ...g[3], alt: "Presenting at the theater conference", caption: "Theater conference · Talk" },
    { ...g[4], alt: "Conference attendees discussing at tables", caption: "Theater conference · Group discussion" },
    { ...g[5], alt: "Conference registration desk", caption: "Theater conference · Registration" },
    { ...g[6], alt: "Networking at the theater conference", caption: "Theater conference · Networking" },
    { ...g[7], alt: "Group photo in front of the conference banner", caption: "Theater conference · Group photo" },
  ],
  links: [{ label: "Visit Podo Store", href: ko.links?.[0]?.href ?? "https://www.podo-store.com" }],
};
