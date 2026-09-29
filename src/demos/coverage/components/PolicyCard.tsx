import { formatPremium } from "@/demos/coverage/lib/utils";
import type { InsurancePolicy } from "@/demos/coverage/lib/types";

interface Props {
  policy: InsurancePolicy;
}

export function PolicyCard({ policy }: Props) {
  const contractYear = policy.contractDate.slice(0, 4);
  const expiryYear = policy.expiryDate.slice(0, 4);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {policy.productType}
          </span>
          <h3 className="mt-1.5 text-base font-semibold text-gray-900">
            {policy.companyName}
          </h3>
          <p className="text-sm text-gray-500">{policy.productName}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">
            {formatPremium(policy.premium)}
          </p>
          <p className="text-xs text-gray-400">월 보험료</p>
        </div>
      </div>
      <div className="text-xs text-gray-400 border-t border-gray-100 pt-3">
        계약 {contractYear} · 만기 {expiryYear} · 증권 {policy.policyNo}
      </div>
    </div>
  );
}
