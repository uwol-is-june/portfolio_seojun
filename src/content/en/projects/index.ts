import type { Project } from "../../types";
import { projects as ko } from "../../projects";
import { cardnewsAgent } from "./cardnews-agent";
import { coverageAnalysis } from "./coverage-analysis";
import { devtier } from "./devtier";
import { dietSaju } from "./diet-saju";
import { faRecruitSimulator } from "./fa-recruit-simulator";
import { incarStockReport } from "./incar-stock-report";
import { mungx5 } from "./mungx5";
import { podoStore } from "./podo-store";
import { podoTicket } from "./podo-ticket";
import { podoWiki } from "./podo-wiki";
import { seohakGaemiClub } from "./seohak-gaemi-club";

const bySlug = Object.fromEntries(
  [cardnewsAgent, coverageAnalysis, devtier, dietSaju, faRecruitSimulator, incarStockReport, mungx5, podoStore, podoTicket, podoWiki, seohakGaemiClub].map((p) => [p.slug, p]),
);

/** 순서는 한국어판(../../projects)과 같습니다. 영어판이 빠진 프로젝트는 한국어판을 그대로 씁니다. */
export const projects: Project[] = ko.map((p) => bySlug[p.slug] ?? p);
