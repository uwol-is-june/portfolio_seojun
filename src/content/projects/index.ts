import type { Project } from "../types";
import { incarAiLab } from "./incar-ai-lab";
import { mungx5 } from "./mungx5";
import { podoStore } from "./podo-store";
import { podoTicket } from "./podo-ticket";
import { seohakGaemiClub } from "./seohak-gaemi-club";

/** 배열 순서 = 목록 노출 순서, 이전/다음 프로젝트 순서 */
export const projects: Project[] = [
  podoStore,
  podoTicket,
  mungx5,
  seohakGaemiClub,
  incarAiLab,
];
