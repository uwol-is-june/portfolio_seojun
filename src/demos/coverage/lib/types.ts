export type CoverageCategory =
  | "death"
  | "cancer"
  | "brain"
  | "heart"
  | "accident"
  | "hospital"
  | "surgery";

export type GapStatus = "sufficient" | "partial" | "lacking";

export interface Coverage {
  category: CoverageCategory;
  label: string;
  amount: number;
  unit?: "원" | "일당";
}

export interface InsurancePolicy {
  policyNo: string;
  companyName: string;
  productName: string;
  productType: string;
  contractDate: string;
  expiryDate: string;
  contractStatus?: string;
  premium: number;
  coverages: Coverage[];
}

export interface GapItem {
  category: CoverageCategory;
  label: string;
  current: number;
  recommended: number;
  unit?: "원" | "일당";
  status: GapStatus;
}

export interface AnalysisResult {
  policies: InsurancePolicy[];
  totalPremium: number;
  score: number;
  gapItems: GapItem[];
}

// 원본 lib/codef/types.ts의 2차 인증 세션 정보 (데모에서는 목업 값)
export interface TwoWayInfo {
  jobIndex: number;
  threadIndex: number;
  jti: string;
  twoWayTimestamp: number;
}
