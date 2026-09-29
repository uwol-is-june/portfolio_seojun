/**
 * 원본의 /api/codef/* 라우트를 브라우저 안에서 흉내 내는 목업 API.
 * 응답 모양(needsAuth · method · twoWayInfo · registered …)은 원본 라우트와 같고,
 * 입력값은 어디에도 전송하지 않는다. 인증번호 · 비밀번호는 아무 값이나 통과한다.
 */
import { buildDemoResult } from "./demo-data";

type Body = Record<string, unknown>;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function twoWay(method: string, originalParams: Body) {
  return {
    needsAuth: true,
    method,
    twoWayInfo: { jobIndex: 0, threadIndex: 0, jti: `demo-${method}`, twoWayTimestamp: Date.now() },
    originalParams,
    captchaImage: null,
  };
}

const authMethodOf = (params: Body) => (params.authMethod === "1" ? "PASS" : "SMS");

async function connect(body: Body) {
  await delay(2800);
  // 회원가입 직후 자동 연결은 방금 본인인증을 마쳤으므로 바로 결과를 돌려준다
  if (body.afterRegister) return { needsAuth: false, ...buildDemoResult() };
  return twoWay(authMethodOf(body), body);
}

async function connectVerify() {
  await delay(2800);
  return { needsAuth: false, ...buildDemoResult() };
}

async function register(body: Body) {
  await delay(1200);
  return twoWay(authMethodOf(body), body);
}

// 원본 신규 가입 순서: 본인인증(SMS/PASS) → 회원정보 입력 → 이메일 인증 → 가입 완료
async function registerVerify(body: Body) {
  await delay(1200);
  const params = (body.originalParams ?? {}) as Body;
  if (body.smsAuthNo || body.simpleAuth) return twoWay("userInfo", params);
  if (body.id) return twoWay("emailAuth", { ...params, id: body.id });
  return { registered: true, resLoginId: params.id ?? "demo" };
}

const ROUTES: Record<string, (body: Body) => Promise<unknown>> = {
  "/api/codef/connect": connect,
  "/api/codef/connect/verify": connectVerify,
  "/api/codef/register": register,
  "/api/codef/register/verify": registerVerify,
};

/** fetch(path, { method: "POST", body }) → res.json() 자리에 쓴다 (res.json()처럼 any를 돌려준다) */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function mockPost(path: string, body: Body): Promise<any> {
  const handler = ROUTES[path];
  if (!handler) throw new Error(`데모에서 지원하지 않는 요청입니다: ${path}`);
  return handler(body);
}
