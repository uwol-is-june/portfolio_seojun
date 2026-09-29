import { formatWon } from "@/demos/coverage/lib/utils";
import type { GapItem } from "@/demos/coverage/lib/types";

const STATUS_COLOR: Record<string, string> = {
  sufficient: "bg-emerald-500",
  partial:    "bg-amber-400",
  lacking:    "bg-red-400",
};

interface Props {
  item: GapItem;
}

export function CoverageBar({ item }: Props) {
  const pct = Math.min(Math.round((item.current / item.recommended) * 100), 100);
  const barColor = STATUS_COLOR[item.status];
  const displayCurrent = item.unit === "일당"
    ? `${item.current.toLocaleString("ko-KR")}원`
    : formatWon(item.current);
  const displayRecommended = item.unit === "일당"
    ? `${item.recommended.toLocaleString("ko-KR")}원`
    : formatWon(item.recommended);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{item.label}</span>
        <span className="text-gray-500">
          {displayCurrent} / {displayRecommended}
        </span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
