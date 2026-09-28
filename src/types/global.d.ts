export {};

declare global {
  interface Window {
    /** 사이트 안에서 페이지를 이동한 횟수 (SiteHeader가 기록) */
    __portfolioNavCount?: number;
  }
}
