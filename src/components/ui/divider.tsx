import { cn } from "@/lib/cn";

type DividerProps = React.ComponentProps<"hr"> & {
  /** 가운데 라벨이 있으면 선 두 개 사이에 표시합니다 */
  label?: React.ReactNode;
};

export default function Divider({ label, className, ...props }: DividerProps) {
  if (!label) {
    return <hr className={cn("border-0 border-t border-line", className)} {...props} />;
  }
  return (
    <div role="separator" className={cn("flex items-center gap-4", className)}>
      <span className="h-px flex-1 bg-line" />
      <span className="text-caption uppercase text-subtle">{label}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
