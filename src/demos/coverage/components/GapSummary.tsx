import { formatWon } from "@/demos/coverage/lib/utils";
import type { GapItem } from "@/demos/coverage/lib/types";

const STATUS_LABEL: Record<string, { text: string; className: string }> = {
  sufficient: { text: "충분",   className: "bg-emerald-100 text-emerald-700" },
  partial:    { text: "부족",   className: "bg-amber-100 text-amber-700" },
  lacking:    { text: "매우부족", className: "bg-red-100 text-red-700" },
};

interface Props {
  items: GapItem[];
}

export function GapSummary({ items }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="pb-3 text-left font-medium text-gray-500">보장 항목</th>
            <th className="pb-3 text-right font-medium text-gray-500">현재 보장</th>
            <th className="pb-3 text-right font-medium text-gray-500">권장 보장</th>
            <th className="pb-3 text-center font-medium text-gray-500">상태</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item) => {
            const { text, className } = STATUS_LABEL[item.status];
            const fmt = item.unit === "일당"
              ? (v: number) => `${v.toLocaleString("ko-KR")}원`
              : formatWon;
            return (
              <tr key={item.category}>
                <td className="py-3 font-medium text-gray-800">{item.label}</td>
                <td className="py-3 text-right text-gray-600">{fmt(item.current)}</td>
                <td className="py-3 text-right text-gray-600">{fmt(item.recommended)}</td>
                <td className="py-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
                    {text}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
