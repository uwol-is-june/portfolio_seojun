import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // 서학개미클럽 공개 데모: 원본 저장소에서 스냅샷으로 복사한 코드라 원본 그대로 둔다 (demos/seohak/README.md)
    "demos/**",
    "src/demos/**",
    "src/app/api/seohak/**",
    // 에셋 · 데모 생성용 Node 스크립트 (CommonJS, 앱 번들에 들어가지 않음)
    "scripts/**",
  ]),
]);

export default eslintConfig;
