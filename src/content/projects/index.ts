import type { Project } from "../types";
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

/** 배열 순서 = 목록 노출 순서, 이전/다음 프로젝트 순서 */
export const projects: Project[] = [
  podoStore,
  podoTicket,
  mungx5,
  seohakGaemiClub,
  incarStockReport,
  faRecruitSimulator,
  coverageAnalysis,
  devtier,
  dietSaju,
  podoWiki,
  cardnewsAgent,
];
