import { cn } from "@/lib/cn";

const levels = {
  display: "text-display font-normal uppercase",
  h1: "text-h1 font-semibold",
  h2: "text-h2 font-semibold",
  h3: "text-h3 font-semibold",
} as const;

type HeadingProps = React.ComponentProps<"h2"> & {
  /** 보이는 크기 */
  level?: keyof typeof levels;
  /** 실제 태그. 생략하면 level에 맞춰 정합니다 (display는 h1) */
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  /** 제목 위 작은 라벨 */
  eyebrow?: React.ReactNode;
};

export default function Heading({
  level = "h2",
  as,
  eyebrow,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = as ?? (level === "display" ? "h1" : level);
  const heading = (
    <Tag className={cn("text-fg text-balance", levels[level], className)} {...props}>
      {children}
    </Tag>
  );
  if (!eyebrow) return heading;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-caption font-medium uppercase text-muted">{eyebrow}</p>
      {heading}
    </div>
  );
}
