import { builds as ko } from "../builds";
import type { Build } from "../types";

export const builds: Build[] = [
  {
    ...ko[0],
    name: "DASII",
    description: "An app that analyzes diet product ingredients and collects reviews",
    organization: "DASII",
    status: "Live",
    role: "PM · Service planning",
    points: [
      "iOS · Android app launched and in operation",
      "Ingredient magazine landing page built from manufacturer labels and MFDS data on dosage and content",
      "31 Instagram card news episodes produced with my own Card News Agent",
    ],
    links: ko[0].links?.map((l) => (l.label === "성분 매거진" ? { ...l, label: "Ingredient magazine" } : l)),
  },
];
