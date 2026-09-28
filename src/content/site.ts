import { positions } from "./positions";

/** 사이트 공통 정보. [TODO] 값은 직접 채워주세요. */
export const site = {
  name: "SEOJUN",
  /** 프로덕션 도메인. 메타데이터, sitemap, OG 이미지의 절대 주소에 씁니다. */
  url: "https://portfolio-seojun.vercel.app",
  /** 홈 제목과 공유 미리보기에 쓰는 포지션 요약 */
  roles: "Product Manager · Service Planner · AI Product Builder",
  email: "[TODO]@example.com",
  links: [
    { label: "GitHub", href: "https://github.com/uwol-is-june" },
    { label: "LinkedIn", href: "[TODO]" },
    { label: "Resume", href: "[TODO]" },
  ],
  /** 헤더와 푸터 메뉴. 포지션 목록(positions.ts)에서 만듭니다. */
  nav: [
    ...positions.map((p) => ({ label: p.title, href: `/${p.id}` })),
    { label: "About", href: "/about" },
  ],
};
