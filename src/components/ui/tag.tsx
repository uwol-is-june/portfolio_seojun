import { cn } from "@/lib/cn";

type TagProps = React.ComponentProps<"span"> & {
  /** solid: 강조(포지션 등), outline: 기본(기술 스택, 키워드) */
  variant?: "outline" | "solid";
};

export default function Tag({ variant = "outline", className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-pill px-3 text-caption font-medium",
        variant === "outline" ? "border border-line-strong text-muted" : "bg-surface-raised text-fg",
        className,
      )}
      {...props}
    />
  );
}
