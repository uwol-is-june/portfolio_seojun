import { cn } from "@/lib/cn";
import Container from "./container";

type SectionProps = React.ComponentProps<"section"> & {
  size?: "page" | "prose";
  /** 섹션 위쪽 구분선 */
  bordered?: boolean;
};

export default function Section({
  size,
  bordered = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-section", bordered && "border-t border-line", className)}
      {...props}
    >
      <Container size={size}>{children}</Container>
    </section>
  );
}
