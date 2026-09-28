import { cn } from "@/lib/cn";

const sizes = {
  lg: "text-body-lg",
  md: "text-body",
  sm: "text-small",
  caption: "text-caption",
} as const;

const tones = {
  default: "text-fg",
  muted: "text-muted",
  subtle: "text-subtle",
} as const;

type TextProps = React.ComponentProps<"p"> & {
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
  as?: "p" | "span" | "div";
};

export default function Text({
  size = "md",
  tone = "muted",
  as: Tag = "p",
  className,
  ...props
}: TextProps) {
  return <Tag className={cn(sizes[size], tones[tone], "text-pretty", className)} {...props} />;
}
