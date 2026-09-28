import type { Project } from "../types";
import { adminPermissionPolicy } from "./admin-permission-policy";
import { aiPrototype } from "./ai-prototype";
import { bookingFlowRedesign } from "./booking-flow-redesign";
import { onboardingConversion } from "./onboarding-conversion";
import { portfolioSite } from "./portfolio-site";
import { roadmapPrioritization } from "./roadmap-prioritization";

/** 배열 순서 = 목록 노출 순서, 이전/다음 프로젝트 순서 */
export const projects: Project[] = [
  onboardingConversion,
  roadmapPrioritization,
  bookingFlowRedesign,
  adminPermissionPolicy,
  portfolioSite,
  aiPrototype,
];
