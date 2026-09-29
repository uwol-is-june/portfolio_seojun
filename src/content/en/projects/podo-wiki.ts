import { podoWiki as ko } from "../../projects/podo-wiki";
import type { Project } from "../../types";

const s = ko.architecture?.stages ?? [];
const l = ko.links ?? [];
const g = ko.gallery ?? [];

export const podoWiki: Project = {
  ...ko,
  title: "Podo Wiki",
  subtitle: "Handover wiki for theater companies (web · iOS · Android)",
  summary:
    "A wiki that gathers theater companies' handover documents in one place. I built the web editor and iOS · Android apps together, released them on the stores, and three theater companies use it today.",
  cardPoints: ["A wiki for theater companies' handover docs", "Web editor + iOS · Android apps on the stores", "Used by 3 theater companies"],
  status: "Live",
  role: "Planning · development (solo)",
  organization: "Side project",
  thumbnail: ko.thumbnail && { ...ko.thumbnail, alt: "Podo Wiki start screen" },
  highlights: ["Web wiki + iOS · Android apps on the stores", "Document history and version diff", "Used by 3 theater companies", "178 commits"],
  problem: { statement: "Theater companies' know-how and handover documents were scattered" },
  actions: [
    { title: "Web wiki", description: "Built an editor with Markdown, tables, and images, plus per-document history and version comparison.", artifact: "Next.js, Tiptap" },
    {
      title: "Mobile app",
      description: "Built an app with search, bookmarks, recently viewed, and FAQ tabs on the same data as the web, and released it on the App Store and Google Play.",
      artifact: "Expo (EAS)",
    },
  ],
  architecture: ko.architecture && {
    stages: [
      { ...s[0], title: "Web editor", items: ["Write and edit wiki docs", "Tables · images · links"] },
      { ...s[1], title: "Storage", items: ["Docs and history", "Login"] },
      { ...s[2], title: "History", items: ["Revision log", "Version diff"] },
      { ...s[3], title: "Mobile app", items: ["Home · search · bookmarks · more tabs", "Released on App Store · Google Play"] },
    ],
    caption: "Based on the Podo-Wiki repo",
  },
  gallery: [
    { ...g[0], alt: "Podo Wiki app home: theater companies, recent changes, and FAQ", caption: "Home · companies and recent changes" },
    { ...g[1], alt: "Podo Wiki app document search", caption: "Search" },
    { ...g[2], alt: "Podo Wiki app document view: Kwangwoon Theater Club page", caption: "Document view" },
    { ...g[3], alt: "Podo Wiki app table of contents", caption: "Table of contents" },
    { ...g[4], alt: "Podo Wiki app version diff between an older and newer revision", caption: "Version diff" },
  ],
  links: [{ ...l[0], label: "Service" }, ...l.slice(1)],
};
