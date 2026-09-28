"use client";

import { useEffect, useState } from "react";
import { DEMO_POLICIES, analyze, formatWon, type CoverageItem } from "@/content/coverage-demo";
import { cn } from "@/lib/cn";

type Step = "method" | "connect" | "auth" | "upload" | "loading" | "result";
type Account = "login" | "register";
type AuthWay = "sms" | "pass";

const STEPS: { key: Step[]; label: string }[] = [
  { key: ["method"], label: "연동 방식" },
  { key: ["connect", "upload"], label: "계정 연동" },
  { key: ["auth"], label: "2차 인증" },
  { key: ["loading", "result"], label: "보장 분석" },
];

const statusStyle: Record<CoverageItem["status"], { label: string; text: string; bar: string }> = {
  sufficient: { label: "충분", text: "text-collab", bar: "bg-collab" },
  partial: { label: "보완 필요", text: "text-amber-300", bar: "bg-amber-300" },
  lacking: { label: "부족", text: "text-ai", bar: "bg-ai" },
};

/** 보장분석 프로그램 데모: 입력값은 어디에도 보내지 않고, 결과는 항상 가상 고객 데이터입니다. */
export default function CoverageDemo() {
  const [step, setStep] = useState<Step>("method");
  const [account, setAccount] = useState<Account>("login");
  const [authWay, setAuthWay] = useState<AuthWay>("sms");
  const [code, setCode] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  // 조회 중 화면은 잠깐 보여준 뒤 결과로 넘어갑니다.
  useEffect(() => {
    if (step !== "loading") return;
    const t = setTimeout(() => setStep("result"), 1400);
    return () => clearTimeout(t);
  }, [step]);

  const restart = () => {
    setStep("method");
    setCode("");
    setFileName(null);
  };
  const activeIndex = STEPS.findIndex((s) => s.key.includes(step));

  return (
    <div className="flex flex-col gap-8">
      {/* 진행 단계 */}
      <ol className="grid grid-cols-4 gap-2" aria-label="진행 단계">
        {STEPS.map((s, i) => (
          <li key={s.label} className="flex flex-col gap-2">
            <span className={cn("h-1 rounded-pill", i <= activeIndex ? "bg-fg" : "bg-line-strong")} />
            <span className={cn("text-caption", i === activeIndex ? "text-fg" : "text-subtle")}>
              {String(i + 1).padStart(2, "0")} {s.label}
            </span>
          </li>
        ))}
      </ol>

      {step === "method" && (
        <Panel title="보험 정보를 어떻게 불러올까요?" desc="가입한 보험을 모아 권장 보장액과 비교합니다.">
          <div className="grid gap-3 md:grid-cols-2">
            <ChoiceCard
              badge="추천"
              title="내보험다보여 연동"
              desc="금융감독원 '내보험다보여' 계정으로 전 보험사 계약을 한 번에 불러옵니다."
              onClick={() => setStep("connect")}
            />
            <ChoiceCard
              title="보장분석 PDF 업로드"
              desc="보험사나 금융감독원에서 받은 보장분석 PDF를 직접 올립니다."
              onClick={() => setStep("upload")}
            />
          </div>
        </Panel>
      )}

      {step === "connect" && (
        <Panel title="내보험다보여 계정 연동" desc="데모에서는 아무 값이나 넣어도 되고, 입력값은 전송되지 않습니다." onBack={() => setStep("method")}>
          <Segmented
            value={account}
            onChange={setAccount}
            options={[
              { value: "login", label: "기존 계정 로그인" },
              { value: "register", label: "신규 가입" },
            ]}
          />
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setStep("auth");
            }}
          >
            {account === "login" ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="아이디" defaultValue="demo_user" autoComplete="off" />
                <Field label="비밀번호" type="password" defaultValue="demo1234" autoComplete="off" />
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="이름" defaultValue="김데모" autoComplete="off" />
                <Field label="생년월일" defaultValue="19900101" inputMode="numeric" autoComplete="off" />
                <Field label="휴대폰 번호" defaultValue="01000000000" inputMode="numeric" autoComplete="off" />
              </div>
            )}
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-small text-muted">2차 인증 방식</legend>
              <Segmented
                value={authWay}
                onChange={setAuthWay}
                options={[
                  { value: "sms", label: "SMS 인증" },
                  { value: "pass", label: "PASS 인증" },
                ]}
              />
            </fieldset>
            <PrimaryButton type="submit">{account === "login" ? "연동하기" : "가입하고 연동하기"}</PrimaryButton>
          </form>
        </Panel>
      )}

      {step === "auth" && (
        <Panel
          title={authWay === "sms" ? "인증번호를 입력해 주세요" : "PASS 앱에서 인증을 완료해 주세요"}
          desc={
            authWay === "sms"
              ? "데모에서는 실제 문자가 가지 않습니다. 숫자 6자리를 아무거나 넣어 주세요."
              : "데모에서는 PASS 앱 알림이 가지 않습니다. 아래 버튼으로 인증 완료를 흉내 냅니다."
          }
          onBack={() => setStep("connect")}
        >
          {authWay === "sms" ? (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (code.length === 6) setStep("loading");
              }}
            >
              <Field
                label="인증번호 6자리"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="123456"
              />
              <PrimaryButton type="submit" disabled={code.length !== 6}>
                인증 확인
              </PrimaryButton>
            </form>
          ) : (
            <PrimaryButton onClick={() => setStep("loading")}>PASS 인증 완료</PrimaryButton>
          )}
        </Panel>
      )}

      {step === "upload" && (
        <Panel
          title="보장분석 PDF 업로드"
          desc="데모에서는 파일을 읽거나 올리지 않고, 가상 고객의 예시 결과를 보여줍니다."
          onBack={() => setStep("method")}
        >
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-card border border-dashed border-line-strong px-6 py-12 text-center transition-colors hover:border-fg">
            <span className="text-body text-fg">{fileName ?? "클릭해서 PDF 파일 선택"}</span>
            <span className="text-caption text-subtle">파일은 브라우저 밖으로 나가지 않습니다</span>
            <input
              type="file"
              accept=".pdf"
              className="sr-only"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
          </label>
          <PrimaryButton onClick={() => setStep("loading")}>{fileName ? "분석하기" : "예시 PDF로 분석하기"}</PrimaryButton>
        </Panel>
      )}

      {step === "loading" && (
        <Panel title="보험 계약을 불러오는 중" desc="보험사별 계약을 모아 보장 항목별로 합산하고 있습니다.">
          <div className="h-1 overflow-hidden rounded-pill bg-line-strong">
            <div className="h-full w-1/3 animate-pulse rounded-pill bg-fg" />
          </div>
        </Panel>
      )}

      {step === "result" && <Result onRestart={restart} />}
    </div>
  );
}

function Result({ onRestart }: { onRestart: () => void }) {
  const { items, score, premium, count } = analyze();
  const lacking = items.filter((i) => i.status !== "sufficient");
  return (
    <div className="flex flex-col gap-10">
      <p className="rounded-sm bg-surface-raised px-4 py-2 text-caption text-muted">
        가상 고객 &lsquo;김데모&rsquo;님의 예시 결과입니다. 보험사 · 상품 · 금액은 실제와 무관합니다.
      </p>

      <dl className="grid grid-cols-3 gap-3">
        {[
          { label: "보장 점수", value: `${score}`, unit: "/ 100" },
          { label: "가입 보험", value: `${count}`, unit: "건" },
          { label: "월 보험료", value: premium.toLocaleString("ko-KR"), unit: "원" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col gap-1 rounded-card border border-line p-4 md:p-6">
            <dt className="text-caption text-subtle">{s.label}</dt>
            <dd className="text-h2 font-semibold text-fg">
              {s.value}
              <span className="ml-1 text-small font-normal text-muted">{s.unit}</span>
            </dd>
          </div>
        ))}
      </dl>

      <section className="flex flex-col gap-4" aria-labelledby="policies">
        <h3 id="policies" className="text-h3 font-semibold text-fg">
          가입 보험 목록
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {DEMO_POLICIES.map((p) => (
            <li key={p.product} className="flex flex-col gap-2 rounded-card border border-line p-5">
              <div className="flex items-center justify-between gap-2 text-caption text-subtle">
                <span>
                  {p.company} · {p.kind}
                </span>
                <span>{p.since} 가입</span>
              </div>
              <p className="text-body font-medium text-fg">{p.product}</p>
              <p className="text-small text-muted">월 {p.premium.toLocaleString("ko-KR")}원</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="coverage">
        <h3 id="coverage" className="text-h3 font-semibold text-fg">
          보장 항목별 현황
        </h3>
        <ul className="flex flex-col gap-4">
          {items.map((i) => {
            const s = statusStyle[i.status];
            const pct = Math.min(100, Math.round((i.current / i.recommended) * 100));
            return (
              <li key={i.key} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-3 text-small">
                  <span className="font-medium text-fg">{i.label}</span>
                  <span className="text-muted">
                    {i.unit && `${i.unit} `}
                    {formatWon(i.current)} / 권장 {formatWon(i.recommended)}
                    <span className={cn("ml-2 font-medium", s.text)}>{s.label}</span>
                  </span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-pill bg-line-strong"
                  role="progressbar"
                  aria-label={`${i.label} 권장 대비 ${pct}%`}
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className={cn("h-full rounded-pill", s.bar)} style={{ width: `${pct}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="gap">
        <h3 id="gap" className="text-h3 font-semibold text-fg">
          부족한 보장 {lacking.length}개
        </h3>
        <div className="-mx-gutter overflow-x-auto px-gutter md:mx-0 md:px-0">
          <table className="w-full min-w-[32rem] border-collapse text-left text-small">
            <thead>
              <tr className="border-b border-line-strong text-subtle">
                <th scope="col" className="py-3 pr-4 font-medium">항목</th>
                <th scope="col" className="py-3 pr-4 font-medium">현재</th>
                <th scope="col" className="py-3 pr-4 font-medium">권장</th>
                <th scope="col" className="py-3 pr-4 font-medium">부족분</th>
                <th scope="col" className="py-3 font-medium">판정</th>
              </tr>
            </thead>
            <tbody>
              {lacking.map((i) => (
                <tr key={i.key} className="border-b border-line">
                  <th scope="row" className="py-3 pr-4 font-medium text-fg">{i.label}</th>
                  <td className="py-3 pr-4 text-muted">{formatWon(i.current)}</td>
                  <td className="py-3 pr-4 text-muted">{formatWon(i.recommended)}</td>
                  <td className="py-3 pr-4 text-fg">{formatWon(i.recommended - i.current)}</td>
                  <td className={cn("py-3 font-medium", statusStyle[i.status].text)}>{statusStyle[i.status].label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex h-10 items-center rounded-pill border border-line-strong px-4 text-small font-medium text-fg transition-colors hover:border-fg"
        >
          처음부터 다시
        </button>
      </div>
    </div>
  );
}

function Panel({
  title,
  desc,
  onBack,
  children,
}: {
  title: string;
  desc: string;
  onBack?: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6 rounded-card border border-line bg-surface p-6 md:p-10">
      <div className="flex flex-col gap-2">
        {onBack && (
          <button type="button" onClick={onBack} className="w-fit text-small text-subtle hover:text-fg">
            ← 이전
          </button>
        )}
        <h2 className="text-h3 font-semibold text-fg">{title}</h2>
        <p className="text-small text-muted">{desc}</p>
      </div>
      {children}
    </section>
  );
}

function ChoiceCard({ badge, title, desc, onClick }: { badge?: string; title: string; desc: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-start gap-2 rounded-card border border-line-strong p-6 text-left transition-colors hover:border-fg"
    >
      {badge && <span className="rounded-pill bg-fg px-2 py-0.5 text-caption font-medium text-bg">{badge}</span>}
      <span className="text-body-lg font-semibold text-fg">
        {title} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </span>
      <span className="text-small text-muted">{desc}</span>
    </button>
  );
}

function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="inline-flex w-fit rounded-pill border border-line-strong p-1" role="radiogroup">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "h-9 rounded-pill px-4 text-small font-medium transition-colors",
            value === o.value ? "bg-fg text-bg" : "text-muted hover:text-fg",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.ComponentProps<"input">) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-caption text-subtle">{label}</span>
      <input
        {...props}
        className="h-11 rounded-sm border border-line-strong bg-bg px-3 text-body text-fg outline-none placeholder:text-dim focus:border-fg"
      />
    </label>
  );
}

function PrimaryButton(props: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      {...props}
      className="inline-flex h-12 w-full items-center justify-center rounded-pill bg-fg px-6 text-body font-medium text-bg transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40 sm:w-fit"
    />
  );
}
