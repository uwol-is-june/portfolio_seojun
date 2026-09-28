import { positions } from "./positions";

/** 사이트 공통 정보 */
export const site = {
  name: "SEO JUN",
  /** 프로덕션 도메인. 메타데이터, sitemap, OG 이미지의 절대 주소에 씁니다. */
  url: "https://portfolio-seojun.vercel.app",
  /** 홈 제목과 공유 미리보기에 쓰는 포지션 요약 */
  roles: "Product Manager · Service Planner · AI Product Builder",
  email: "std06158@naver.com",
  links: [
    { label: "GitHub", href: "https://github.com/uwol-is-june" },
    { label: "이력서 PDF", href: "/resume.pdf" },
  ],
  /** 헤더와 푸터 메뉴. 포지션 목록(positions.ts)에서 만듭니다. */
  nav: [
    ...positions.map((p) => ({ label: p.title, href: `/${p.id}` })),
    { label: "About", href: "/about" },
  ],
};
