import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // 루트 레이아웃이 사이트 · 서학개미클럽 데모 둘이라 없는 주소의 404는 app/global-not-found.tsx 가 그린다.
    globalNotFound: true,
  },
  // 서학개미클럽 데모 API는 demos/seohak/ 의 보고서 · 데이터를 파일로 읽으므로 서버 번들에 포함한다.
  outputFileTracingIncludes: {
    "/api/seohak/**/*": ["./demos/seohak/reports/**/*", "./demos/seohak/data/**/*"],
  },
};

export default nextConfig;
