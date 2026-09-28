import path from "node:path";

// 데이터 루트 (server-only)
// 공개 데모: 원본 저장소 루트 대신 포트폴리오 저장소의 demos/seohak/ 에 복사한
// reports/ · data/ 를 읽는다 (demos/seohak/README.md).
export function repoRoot(): string {
  return path.join(process.cwd(), "demos", "seohak");
}

export function repoPath(...segments: string[]): string {
  return path.join(repoRoot(), ...segments);
}
