// 포트폴리오 공개 데모 설정 (portfolio_seojun/demos/seohak-dashboard)
// 원본 seohak-gaemi-club 대시보드는 로컬 전용이다. 이 사본은 공개 데모라서
// 로그인 없이 열람하고, 토스증권 잔고는 목 데이터로, 쓰기(삭제·저장)는 막는다.
export const DEMO_MODE = true;

export const DEMO_READ_ONLY_MESSAGE = "공개 데모에서는 변경할 수 없습니다.";

export function demoReadOnly(): Response {
  return Response.json({ error: DEMO_READ_ONLY_MESSAGE }, { status: 403 });
}
