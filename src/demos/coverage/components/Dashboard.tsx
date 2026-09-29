"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Loader2, Upload, ChevronRight, FileDown, UserPlus } from "lucide-react";
import { PolicyCard } from "@/demos/coverage/components/PolicyCard";
import { CoverageBar } from "@/demos/coverage/components/CoverageBar";
import { GapSummary } from "@/demos/coverage/components/GapSummary";
import { formatPremium } from "@/demos/coverage/lib/utils";
import type { AnalysisResult, TwoWayInfo } from "@/demos/coverage/lib/types";
import { mockPost } from "@/demos/coverage/lib/mock-api";

type Step =
  | "method"
  | "form"
  | "upload"
  | "loading"
  | "captcha"
  | "sms"
  | "pass"
  | "register"
  | "register-captcha"
  | "register-sms"
  | "register-pass"
  | "register-userinfo"
  | "register-email"
  | "result"
  | "error";

interface PendingAuth {
  method: string;
  twoWayInfo: TwoWayInfo;
  originalParams: Record<string, unknown>;
  captchaImage?: string | null;
}

interface RegPendingAuth {
  method: string;
  twoWayInfo: TwoWayInfo;
  originalParams: Record<string, unknown>;
  captchaImage?: string | null;
  extraInfo?: Record<string, string>;
}

const TELECOM_OPTIONS = [
  { value: "0", label: "SKT" },
  { value: "1", label: "KT" },
  { value: "2", label: "LG U+" },
  { value: "3", label: "알뜰폰(SKT)" },
  { value: "4", label: "알뜰폰(KT)" },
  { value: "5", label: "알뜰폰(LG)" },
];

const LOADING_MSGS: [number, string][] = [
  [600,  "본인 인증 확인 중..."],
  [1200, "보험 계약 목록 조회 중..."],
  [1800, "가온생명, 나래생명 외 4개사 데이터 수집 중..."],
  [2400, "보장 항목 분석 중..."],
];

export default function Dashboard() {
  const [step, setStep] = useState<Step>("method");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<PendingAuth | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // 기존 계정 로그인 상태
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [telecom, setTelecom] = useState("0");
  const [authMethod, setAuthMethod] = useState<"0" | "1">("0");
  const [smsCode, setSmsCode] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaMsg, setCaptchaMsg] = useState<string | null>(null);

  // 신규 가입 상태
  const [regPending, setRegPending] = useState<RegPendingAuth | null>(null);
  const [regUserName, setRegUserName] = useState("");
  const [regIdentityFront, setRegIdentityFront] = useState("");
  const [regIdentityBack, setRegIdentityBack] = useState("");
  const [regTelecom, setRegTelecom] = useState("0");
  const [regPhoneNo, setRegPhoneNo] = useState("");
  const [regAuthMethod, setRegAuthMethod] = useState<"0" | "1">("0");
  const [regId, setRegId] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regCaptchaCode, setRegCaptchaCode] = useState("");
  const [regSmsCode, setRegSmsCode] = useState("");
  const [regEmailCode, setRegEmailCode] = useState("");

  const [loadingMsg, setLoadingMsg] = useState("접속 중...");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfNote, setPdfNote] = useState<string | null>(null);
  const loadingTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (step !== "loading") {
      loadingTimers.current.forEach(clearTimeout);
      loadingTimers.current = [];
      return;
    }
    setLoadingMsg("내보험다보여 접속 중...");
    loadingTimers.current = LOADING_MSGS.map(([delay, msg]) =>
      setTimeout(() => setLoadingMsg(msg), delay)
    );
    return () => loadingTimers.current.forEach(clearTimeout);
  }, [step]);

  // ─── 기존 계정 connect 핸들러 ───────────────────────────────────────

  async function callConnect(body: Record<string, unknown>) {
    setStep("loading");
    setError(null);
    try {
      const json = await mockPost("/api/codef/connect", body);
      if (json.error) throw new Error(json.error);
      if (json.needsAuth) {
        setPending({
          method: json.method,
          twoWayInfo: json.twoWayInfo,
          originalParams: json.originalParams,
          captchaImage: json.captchaImage,
        });
        if (json.method === "secureNo") setStep("captcha");
        else if (json.method === "PASS") setStep("pass");
        else setStep("sms");
      } else {
        setResult(json);
        setStep("result");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "연결 실패");
      setStep("error");
    }
  }

  function handleConnect(e: React.FormEvent) {
    e.preventDefault();
    callConnect({ id, password, userName, phoneNo, telecom, authMethod });
  }

  async function handleVerify(authValues: { smsAuthNo?: string; simpleAuth?: "1"; secureNo?: string; secureNoRefresh?: string }) {
    setStep("loading");
    setError(null);
    try {
      const json = await mockPost("/api/codef/connect/verify", {
        originalParams: pending!.originalParams,
        twoWayInfo: pending!.twoWayInfo,
        ...authValues,
      });
      if (json.error) throw new Error(json.error);
      if (json.needsAuth) {
        const wasCapcha = pending?.method === "secureNo";
        setPending({
          method: json.method,
          twoWayInfo: json.twoWayInfo,
          originalParams: json.originalParams,
          captchaImage: json.captchaImage,
        });
        if (json.method === "secureNo") {
          if (wasCapcha) {
            const jtiChanged = pending?.twoWayInfo.jti !== json.twoWayInfo.jti;
            setCaptchaMsg(jtiChanged ? "추가 보안문자 입력이 필요합니다." : "보안문자가 올바르지 않습니다. 다시 입력해주세요.");
          } else {
            setCaptchaMsg(null);
          }
          setCaptchaCode("");
          setStep("captcha");
        } else if (json.method === "PASS") setStep("pass");
        else setStep("sms");
      } else {
        setResult(json);
        setStep("result");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "인증 실패");
      setStep("error");
    }
  }

  // ─── 신규 가입 핸들러 ────────────────────────────────────────────────

  async function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("loading");
    setError(null);
    try {
      const json = await mockPost("/api/codef/register", {
        userName: regUserName,
        identity: regIdentityFront + regIdentityBack,
        telecom: regTelecom,
        phoneNo: regPhoneNo,
        authMethod: regAuthMethod,
      });
      if (json.error) throw new Error(json.error);
      if (json.registered) {
        // 가입 완료 → 해당 계정으로 자동 connect
        await callConnect({
          id: json.resLoginId,
          password: regPassword,
          userName: regUserName,
          phoneNo: regPhoneNo,
          telecom: regTelecom,
          authMethod: regAuthMethod,
          afterRegister: true,
        });
      } else if (json.needsAuth) {
        setRegPending({
          method: json.method,
          twoWayInfo: json.twoWayInfo,
          originalParams: json.originalParams,
          captchaImage: json.captchaImage,
          extraInfo: json.extraInfo,
        });
        routeRegisterStep(json.method);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "회원가입 시작 실패");
      setStep("error");
    }
  }

  async function handleRegisterVerify(authValues: Record<string, string>) {
    setStep("loading");
    setError(null);
    try {
      const json = await mockPost("/api/codef/register/verify", {
        originalParams: regPending!.originalParams,
        twoWayInfo: regPending!.twoWayInfo,
        ...authValues,
      });
      if (json.error) throw new Error(json.error);
      if (json.registered) {
        await callConnect({
          id: json.resLoginId,
          password: regPassword,
          userName: regUserName,
          phoneNo: regPhoneNo,
          telecom: regTelecom,
          authMethod: regAuthMethod,
          afterRegister: true,
        });
      } else if (json.needsAuth) {
        setRegPending({
          method: json.method,
          twoWayInfo: json.twoWayInfo,
          originalParams: json.originalParams,
          captchaImage: json.captchaImage,
          extraInfo: json.extraInfo,
        });
        routeRegisterStep(json.method);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "인증 실패");
      setStep("error");
    }
  }

  function routeRegisterStep(method: string) {
    if (method === "userInfo" || method === "etc") setStep("register-userinfo");
    else if (method === "emailAuth") setStep("register-email");
    else if (method === "PASS" || method === "commSimpleAuth") setStep("register-pass");
    else if (method === "SMS" || method === "smsAuthNo") setStep("register-sms");
    else setStep("register-captcha");
  }

  // ─── 렌더링 ─────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 no-print">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-4">
          {step === "method" ? (
            <Link href="/demo/coverage" className="text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          ) : (
            <button
              onClick={() => setStep("method")}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-gray-900">보장분석</span>
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-6 py-12">

        {/* 연동 방식 선택 */}
        {step === "method" && (
          <div className="space-y-4">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">보장분석 시작하기</h1>
              <p className="text-sm text-gray-500">보험 정보를 가져올 연동 방식을 선택해주세요.</p>
            </div>

            {/* 내보험다보여 카드 */}
            <div className="bg-white rounded-2xl border-2 border-blue-500 p-6 shadow-sm relative">
              <span className="absolute top-4 right-4 text-xs font-semibold bg-blue-600 text-white px-2.5 py-1 rounded-full">추천</span>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-blue-600 font-medium">금융감독원 공인</p>
                  <h2 className="text-base font-bold text-gray-900">내보험다보여 연동</h2>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                내보험다보여 계정으로 가입된 모든 보험을 한번에 조회합니다.
              </p>
              <ul className="space-y-1.5 mb-5">
                {["전 보험사 계약 자동 수집", "SMS 또는 PASS 앱 2차 인증"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setStep("form")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  기존 계정으로 시작하기
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setStep("register")}
                  className="w-full bg-white hover:bg-blue-50 text-blue-600 font-medium py-3 rounded-xl transition-colors border border-blue-300 flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  계정이 없어요, 지금 가입하기
                </button>
              </div>
            </div>

            {/* PDF 업로드 카드 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Upload className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">직접 업로드</p>
                  <h2 className="text-base font-bold text-gray-900">보장분석 PDF 업로드</h2>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                보험사 또는 금융감독원에서 받은 보장분석 PDF를 직접 업로드합니다.
              </p>
              <button
                onClick={() => { setSelectedFile(null); setPdfNote(null); setStep("upload"); }}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition-colors border border-gray-300 flex items-center justify-center gap-2"
              >
                PDF 업로드하기
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 기존 계정 로그인 폼 */}
        {step === "form" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h1 className="text-xl font-bold text-gray-900 mb-2">내보험다보여 연동</h1>
            <p className="text-sm text-gray-500 mb-6">
              내보험다보여 계정으로 로그인하면 가입된 모든 보험을 한번에 조회합니다.
            </p>

            <form onSubmit={handleConnect} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="내보험다보여 아이디"
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="홍길동"
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                <input
                  type="tel"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  placeholder="01012345678"
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">통신사</label>
                <select
                  value={telecom}
                  onChange={(e) => setTelecom(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {TELECOM_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">인증 방식</label>
                <div className="flex gap-3">
                  {[{ value: "0", label: "SMS" }, { value: "1", label: "PASS 앱" }].map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => setAuthMethod(o.value as "0" | "1")}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        authMethod === o.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 border-gray-300"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors mt-2"
              >
                보험 조회 시작
              </button>
            </form>
          </div>
        )}

        {/* 신규 회원가입 폼 */}
        {step === "register" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <UserPlus className="w-5 h-5 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">내보험다보여 회원가입</h1>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              본인 인증 후 계정을 생성하고 바로 보장분석을 시작합니다.
            </p>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <input
                  type="text"
                  value={regUserName}
                  onChange={(e) => setRegUserName(e.target.value)}
                  placeholder="홍길동"
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">주민등록번호</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={regIdentityFront}
                    onChange={(e) => setRegIdentityFront(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="앞 6자리"
                    maxLength={6}
                    required
                    className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-400 font-bold">-</span>
                  <input
                    type="password"
                    value={regIdentityBack}
                    onChange={(e) => setRegIdentityBack(e.target.value.replace(/\D/g, "").slice(0, 7))}
                    placeholder="뒤 7자리"
                    maxLength={7}
                    required
                    className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                <input
                  type="tel"
                  value={regPhoneNo}
                  onChange={(e) => setRegPhoneNo(e.target.value)}
                  placeholder="01012345678"
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">통신사</label>
                <select
                  value={regTelecom}
                  onChange={(e) => setRegTelecom(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {TELECOM_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">인증 방식</label>
                <div className="flex gap-3">
                  {[{ value: "0", label: "SMS" }, { value: "1", label: "PASS 앱" }].map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => setRegAuthMethod(o.value as "0" | "1")}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        regAuthMethod === o.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 border-gray-300"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={regIdentityFront.length < 6 || regIdentityBack.length < 7}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors mt-2"
              >
                본인인증 시작
              </button>
            </form>
          </div>
        )}

        {/* PDF 업로드 */}
        {step === "upload" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">보장분석 PDF 업로드</h2>
            <p className="text-sm text-gray-500 mb-6">
              보험사 또는 금융감독원에서 발급받은 보장분석 PDF 파일을 업로드해주세요.
            </p>

            <label className="block w-full cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => { setSelectedFile(e.target.files?.[0] ?? null); setPdfNote(null); }}
              />
              <div className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center gap-3 transition-colors ${
                selectedFile ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-gray-300 bg-gray-50"
              }`}>
                <Upload className={`w-8 h-8 ${selectedFile ? "text-blue-500" : "text-gray-300"}`} />
                {selectedFile ? (
                  <div className="text-center">
                    <p className="text-sm font-medium text-blue-700">{selectedFile.name}</p>
                    <p className="text-xs text-gray-400 mt-1">클릭하여 파일 변경</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500">클릭하여 PDF 파일 선택</p>
                    <p className="text-xs text-gray-400 mt-1">또는 파일을 이곳으로 드래그하세요</p>
                  </div>
                )}
              </div>
            </label>

            {pdfNote && (
              <p className="text-sm text-blue-600 mt-3 text-center">{pdfNote}</p>
            )}

            <button
              onClick={() => setPdfNote("PDF 분석 기능은 현재 준비 중입니다. 곧 지원할 예정입니다.")}
              disabled={!selectedFile}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors"
            >
              분석 시작
            </button>
          </div>
        )}

        {/* 로딩 */}
        {step === "loading" && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-sm font-medium">{loadingMsg}</p>
            <p className="text-xs text-gray-400">내보험다보여에서 보험 정보를 가져오는 중입니다</p>
          </div>
        )}

        {/* 기존 계정 - 보안캡차 */}
        {step === "captcha" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2">보안문자 입력</h2>
            {captchaMsg && <p className="text-sm text-red-500 mb-2">{captchaMsg}</p>}
            <p className="text-sm text-gray-500 mb-4">아래 이미지의 숫자를 입력해주세요.</p>
            {pending?.captchaImage && (
              <img src={pending.captchaImage} alt="보안문자" className="mb-4 border border-gray-200 rounded-lg" />
            )}
            <input
              type="text"
              value={captchaCode}
              onChange={(e) => setCaptchaCode(e.target.value)}
              placeholder="보안문자 입력"
              maxLength={10}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => { const v = captchaCode; setCaptchaCode(""); handleVerify({ secureNo: v, secureNoRefresh: "0" }); }}
              disabled={captchaCode.length < 1}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-xl transition-colors"
            >
              확인
            </button>
          </div>
        )}

        {/* 기존 계정 - SMS 인증 */}
        {step === "sms" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2">SMS 인증</h2>
            <p className="text-sm text-gray-500 mb-6">
              {phoneNo}으로 발송된 인증번호를 입력해주세요.
            </p>
            <input
              type="text"
              value={smsCode}
              onChange={(e) => setSmsCode(e.target.value)}
              placeholder="인증번호 6자리"
              maxLength={6}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleVerify({ smsAuthNo: smsCode })}
              disabled={smsCode.length < 4}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-xl transition-colors"
            >
              확인
            </button>
          </div>
        )}

        {/* 기존 계정 - PASS 인증 */}
        {step === "pass" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">PASS 앱 인증</h2>
            <p className="text-sm text-gray-500 mb-6">
              PASS 앱에서 인증 요청을 승인한 후<br />아래 버튼을 눌러주세요.
            </p>
            <button
              onClick={() => handleVerify({ simpleAuth: "1" })}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors"
            >
              승인 완료
            </button>
          </div>
        )}

        {/* 신규 가입 - 보안캡차 */}
        {step === "register-captcha" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2">보안문자 입력</h2>
            <p className="text-sm text-gray-500 mb-4">아래 이미지의 숫자를 입력해주세요.</p>
            {regPending?.captchaImage ? (
              <img src={regPending.captchaImage} alt="보안문자" className="mb-4 border border-gray-200 rounded-lg" />
            ) : (
              <div className="mb-4 flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-sm text-gray-400">보안문자 이미지를 불러오지 못했습니다.</p>
                <button
                  onClick={() => handleRegisterVerify({ secureNoRefresh: "1" })}
                  className="text-sm text-blue-600 underline"
                >
                  새 보안문자 받기
                </button>
              </div>
            )}
            <input
              type="text"
              value={regCaptchaCode}
              onChange={(e) => setRegCaptchaCode(e.target.value)}
              placeholder="보안문자 입력"
              maxLength={10}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => { const v = regCaptchaCode; setRegCaptchaCode(""); handleRegisterVerify({ secureNo: v, secureNoRefresh: "0" }); }}
              disabled={regCaptchaCode.length < 1}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-xl transition-colors"
            >
              확인
            </button>
          </div>
        )}

        {/* 신규 가입 - SMS 인증 */}
        {step === "register-sms" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2">SMS 인증</h2>
            <p className="text-sm text-gray-500 mb-6">
              {regPhoneNo}으로 발송된 인증번호를 입력해주세요.
            </p>
            <input
              type="text"
              value={regSmsCode}
              onChange={(e) => setRegSmsCode(e.target.value)}
              placeholder="인증번호 6자리"
              maxLength={6}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleRegisterVerify({ smsAuthNo: regSmsCode })}
              disabled={regSmsCode.length < 4}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-xl transition-colors"
            >
              확인
            </button>
          </div>
        )}

        {/* 신규 가입 - PASS 인증 */}
        {step === "register-pass" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">PASS 앱 인증</h2>
            <p className="text-sm text-gray-500 mb-6">
              PASS 앱에서 인증 요청을 승인한 후<br />아래 버튼을 눌러주세요.
            </p>
            <button
              onClick={() => handleRegisterVerify({ simpleAuth: "1" })}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors"
            >
              승인 완료
            </button>
          </div>
        )}

        {/* 신규 가입 - 회원정보 입력 */}
        {step === "register-userinfo" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2">회원가입 정보 입력</h2>
            <p className="text-sm text-gray-500 mb-6">
              내보험다보여 계정에서 사용할 아이디, 비밀번호, 이메일을 입력해주세요.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
                <input
                  type="text"
                  value={regId}
                  onChange={(e) => setRegId(e.target.value)}
                  placeholder="영문+숫자 6~12자 (첫 글자 영문)"
                  maxLength={12}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">영문 + 숫자 조합 6~12자, 첫 글자는 영문</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="9~20자, 영문+숫자+특수문자 조합"
                  maxLength={20}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">9~20자, 영문·숫자·특수문자(!@#$%^&*?_~) 모두 포함</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="example@naver.com"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">naver.com, daum.net, kakao.com 등 국내 이메일만 가능</p>
              </div>

              <button
                onClick={() => handleRegisterVerify({ id: regId, password: regPassword, email: regEmail })}
                disabled={!regId || !regPassword || !regEmail}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors"
              >
                다음
              </button>
            </div>
          </div>
        )}

        {/* 신규 가입 - 이메일 인증 */}
        {step === "register-email" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2">이메일 인증</h2>
            <p className="text-sm text-gray-500 mb-6">
              {regEmail}으로 발송된 인증번호를 입력해주세요.
            </p>
            <input
              type="text"
              value={regEmailCode}
              onChange={(e) => setRegEmailCode(e.target.value)}
              placeholder="인증번호 입력"
              maxLength={10}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleRegisterVerify({ emailAuthNo: regEmailCode })}
              disabled={regEmailCode.length < 4}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-xl transition-colors"
            >
              가입 완료
            </button>
          </div>
        )}

        {/* 에러 */}
        {step === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 text-center">
            <p className="font-medium mb-1">오류가 발생했습니다</p>
            <p className="text-sm mb-4">{error}</p>
            <button
              onClick={() => { setStep("method"); setError(null); }}
              className="text-sm text-red-600 underline"
            >
              처음으로 돌아가기
            </button>
          </div>
        )}
      </div>

      {/* 결과 */}
      {step === "result" && result && (
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          <div className="flex justify-end no-print">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FileDown className="w-4 h-4" />
              PDF 저장
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print-break-inside-avoid">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">보장 점수</p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold text-blue-600">{result.score}</span>
                <span className="text-gray-400 mb-1">/ 100</span>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">가입 보험 수</p>
              <span className="text-4xl font-bold text-gray-900">{result.policies.length}</span>
              <span className="text-gray-400 ml-1">건</span>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">월 보험료 합계</p>
              <span className="text-4xl font-bold text-gray-900">{formatPremium(result.totalPremium)}</span>
            </div>
          </div>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">가입 보험 목록</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.policies.map((p, i) => (
                <PolicyCard key={p.policyNo || i} policy={p} />
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">보장 현황</h2>
            <div className="space-y-5">
              {result.gapItems.map((item) => (
                <CoverageBar key={item.category} item={item} />
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-gray-500 border-t border-gray-100 pt-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" /> 충분 (100% 이상)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400" /> 부족 (50~99%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" /> 매우 부족 (50% 미만)
              </span>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">갭 분석</h2>
            <GapSummary items={result.gapItems} />
          </section>
        </div>
      )}
    </div>
  );
}
