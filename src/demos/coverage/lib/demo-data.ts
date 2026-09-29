/**
 * 보장분석 공개 데모의 목업 데이터.
 * 원본(incar_ca_test)의 lib/codef/demo-data.ts와 같은 구조지만, 보험사 · 상품 · 증권번호를
 * 모두 가상 값으로 바꿨다 (실존 보험사 · 상품과 무관). 권장 보장액과 분석 로직은 원본 그대로.
 */
import type { InsurancePolicy, GapItem, AnalysisResult, CoverageCategory } from "./types";
import { isActiveExpiryDate } from "./utils";

export const DEMO_POLICIES: InsurancePolicy[] = [
  {
    policyNo: "GA2019041127",
    companyName: "가온생명",
    productName: "가온 든든 종합건강보험",
    productType: "생명보험",
    contractDate: "20190411",
    expiryDate: "20690411",
    premium: 98000,
    coverages: [
      { category: "death",    label: "일반사망",   amount: 100000000 },
      { category: "cancer",   label: "암진단",     amount: 30000000 },
      { category: "brain",    label: "뇌혈관질환", amount: 10000000 },
      { category: "heart",    label: "심장질환",   amount: 10000000 },
      { category: "hospital", label: "입원일당",   amount: 20000, unit: "일당" },
      { category: "surgery",  label: "수술비",     amount: 1000000 },
    ],
  },
  {
    policyNo: "NR2016112034",
    companyName: "나래생명",
    productName: "나래 암케어보험",
    productType: "생명보험",
    contractDate: "20161120",
    expiryDate: "20861120",
    premium: 42000,
    coverages: [
      { category: "cancer", label: "암진단(소액)", amount: 10000000 },
      { category: "brain",  label: "뇌혈관질환",  amount: 10000000 },
    ],
  },
  {
    policyNo: "BD2020060215",
    companyName: "바다생명",
    productName: "바다 평생종신보험",
    productType: "생명보험",
    contractDate: "20200602",
    expiryDate: "20900602",
    premium: 156000,
    coverages: [
      { category: "death",   label: "일반사망", amount: 100000000 },
      { category: "surgery", label: "수술비",   amount: 1000000 },
    ],
  },
  {
    policyNo: "DS2021020318",
    companyName: "다솜손해보험",
    productName: "다솜 상해플러스",
    productType: "손해보험",
    contractDate: "20210203",
    expiryDate: "20810203",
    premium: 27000,
    coverages: [
      { category: "hospital", label: "입원일당", amount: 30000, unit: "일당" },
      { category: "surgery",  label: "수술비",   amount: 500000 },
      { category: "accident", label: "상해사망", amount: 50000000 },
    ],
  },
  {
    // 만기가 지난 계약: 원본처럼 분석에서 빠진다
    policyNo: "SR2022010144",
    companyName: "새론손해보험",
    productName: "새론 다이렉트실손의료비",
    productType: "실손보험",
    contractDate: "20220101",
    expiryDate: "20230101",
    premium: 38000,
    coverages: [
      { category: "hospital", label: "입원일당", amount: 20000, unit: "일당" },
      { category: "surgery",  label: "수술비",   amount: 1000000 },
    ],
  },
  {
    policyNo: "RO2023071509",
    companyName: "라온화재",
    productName: "라온 운전자보험",
    productType: "손해보험",
    contractDate: "20230715",
    expiryDate: "20330715",
    premium: 15000,
    coverages: [
      { category: "accident", label: "상해사망", amount: 50000000 },
    ],
  },
];

export const RECOMMENDED: Record<string, { label: string; amount: number; unit?: "원" | "일당" }> = {
  death:    { label: "일반사망",   amount: 300000000 },
  cancer:   { label: "암진단",     amount: 50000000 },
  brain:    { label: "뇌혈관질환", amount: 30000000 },
  heart:    { label: "심장질환",   amount: 30000000 },
  accident: { label: "상해사망",   amount: 100000000 },
  hospital: { label: "입원일당",   amount: 50000, unit: "일당" },
  surgery:  { label: "수술비",     amount: 2000000 },
};

export function buildDemoResult(): AnalysisResult {
  const activePolicies = DEMO_POLICIES.filter((p) => isActiveExpiryDate(p.expiryDate));

  const totals: Record<string, number> = {};
  for (const policy of activePolicies) {
    for (const c of policy.coverages) {
      totals[c.category] = (totals[c.category] ?? 0) + c.amount;
    }
  }

  const gapItems: GapItem[] = Object.entries(RECOMMENDED).map(([cat, rec]) => {
    const current = totals[cat] ?? 0;
    const ratio = current / rec.amount;
    return {
      category: cat as CoverageCategory,
      label: rec.label,
      current,
      recommended: rec.amount,
      unit: rec.unit,
      status: ratio >= 1 ? "sufficient" : ratio >= 0.5 ? "partial" : "lacking",
    };
  });

  const sufficient = gapItems.filter((g) => g.status === "sufficient").length;
  const score = Math.round((sufficient / gapItems.length) * 100);
  const totalPremium = activePolicies.reduce((s, p) => s + p.premium, 0);

  return { policies: activePolicies, totalPremium, score, gapItems };
}
