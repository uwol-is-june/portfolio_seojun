import type { Affiliation } from "@/content/types";

/** 프로젝트 소속 구분 이름 */
export const affiliations: Record<Affiliation, string> = {
  company: "회사",
  startup: "창업",
  club: "동아리",
  personal: "개인",
};
