/**
 * 보장분석 프로그램 공개 데모 (/demo/coverage)
 * 실제 서비스는 '내보험다보여'(CODEF) 로그인과 실제 보험 계약이 필요해 누구나 써 볼 수 없습니다.
 * 이 데모는 원본 코드를 쓰지 않고 케이스 스터디의 흐름대로 새로 만든 것이며,
 * 보험사 · 상품 · 금액 · 권장 보장액은 모두 가상 값입니다. 입력값은 어디에도 전송하지 않습니다.
 */

export type CoverageKey = "death" | "accident" | "cancer" | "brain" | "heart" | "hospital" | "surgery";

export interface DemoPolicy {
  company: string;
  product: string;
  kind: "생명보험" | "손해보험";
  since: string;
  /** 월 보험료 (원) */
  premium: number;
  coverages: Partial<Record<CoverageKey, number>>;
}

export interface CoverageItem {
  key: CoverageKey;
  label: string;
  /** 일당처럼 단위가 다른 항목 */
  unit?: string;
  current: number;
  recommended: number;
  status: "sufficient" | "partial" | "lacking";
}

/** 권장 보장액 (데모 기준값) */
export const RECOMMENDED: Record<CoverageKey, { label: string; amount: number; unit?: string }> = {
  death: { label: "일반사망", amount: 200_000_000 },
  accident: { label: "상해사망", amount: 100_000_000 },
  cancer: { label: "암진단", amount: 50_000_000 },
  brain: { label: "뇌혈관질환", amount: 30_000_000 },
  heart: { label: "심장질환", amount: 30_000_000 },
  hospital: { label: "입원일당", amount: 50_000, unit: "일당" },
  surgery: { label: "수술비", amount: 3_000_000 },
};

/** 가상 고객의 가입 보험 (실존 보험사 · 상품과 무관) */
export const DEMO_POLICIES: DemoPolicy[] = [
  {
    company: "가온생명",
    product: "가온 든든 종합건강보험",
    kind: "생명보험",
    since: "2019.04",
    premium: 98_000,
    coverages: { death: 100_000_000, cancer: 30_000_000, brain: 10_000_000, heart: 10_000_000, surgery: 1_000_000 },
  },
  {
    company: "나래생명",
    product: "나래 암케어보험",
    kind: "생명보험",
    since: "2016.11",
    premium: 42_000,
    coverages: { cancer: 10_000_000 },
  },
  {
    company: "다솜손해보험",
    product: "다솜 상해플러스",
    kind: "손해보험",
    since: "2021.02",
    premium: 27_000,
    coverages: { accident: 100_000_000, hospital: 30_000, surgery: 1_000_000 },
  },
  {
    company: "라온화재",
    product: "라온 운전자보험",
    kind: "손해보험",
    since: "2023.07",
    premium: 15_000,
    coverages: { accident: 50_000_000 },
  },
];

/** 가입 보험을 합쳐 권장 보장액과 비교합니다. */
export function analyze(policies: DemoPolicy[] = DEMO_POLICIES) {
  const items: CoverageItem[] = (Object.keys(RECOMMENDED) as CoverageKey[]).map((key) => {
    const rec = RECOMMENDED[key];
    const current = policies.reduce((sum, p) => sum + (p.coverages[key] ?? 0), 0);
    const ratio = current / rec.amount;
    return {
      key,
      label: rec.label,
      unit: rec.unit,
      current,
      recommended: rec.amount,
      status: ratio >= 1 ? "sufficient" : ratio >= 0.5 ? "partial" : "lacking",
    };
  });
  // 항목마다 권장액을 채운 비율(최대 100%)의 평균
  const score = Math.round((items.reduce((s, i) => s + Math.min(1, i.current / i.recommended), 0) / items.length) * 100);
  const premium = policies.reduce((s, p) => s + p.premium, 0);
  return { items, score, premium, count: policies.length };
}

/** 1억 2,000만 원처럼 읽기 쉬운 금액 */
export function formatWon(n: number) {
  if (n >= 100_000_000) {
    const eok = Math.floor(n / 100_000_000);
    const man = Math.round((n % 100_000_000) / 10_000);
    return man ? `${eok}억 ${man.toLocaleString("ko-KR")}만 원` : `${eok}억 원`;
  }
  if (n >= 10_000) return `${(n / 10_000).toLocaleString("ko-KR")}만 원`;
  return `${n.toLocaleString("ko-KR")}원`;
}
