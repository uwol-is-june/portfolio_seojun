import type { Affiliation } from "@/content/types";
import type { Dict } from "@/i18n/ui";

/** 프로젝트 소속 구분 이름 (현재 언어) */
export function affiliationLabel(affiliation: Affiliation, t: Dict): string {
  return { company: t.affCompany, startup: t.affStartup, club: t.affClub, personal: t.affPersonal }[affiliation];
}

/**
 * 카드 배지 줄에 넣는 짧은 소속 라벨. 예: "회사 · 인카금융서비스", "동아리 · UMC 7기", "개인"
 * 개인 프로젝트는 소속 이름이 '사이드 프로젝트'라 구분만 보여줍니다.
 */
export function affiliationChip(affiliation: Affiliation, organization: string, t: Dict, omitKind = false) {
  const kind = affiliationLabel(affiliation, t);
  if (affiliation === "personal") return kind;
  const name = organization
    .split(" · ")[0]
    .replace(/^IT 연합동아리\s*/, "")
    .replace(/,\s*inter-university IT club$/, "");
  // 옆의 구분 칩과 같은 말(예: 창업)이면 이름만 보여줍니다.
  return omitKind ? name : `${kind} · ${name}`;
}
