import { cn } from "@/lib/cn";

type ContainerProps = React.ComponentProps<"div"> & {
  /** page: 최대 1280px, prose: 본문 읽기 폭 672px */
  size?: "page" | "prose";
};

export default function Container({ size = "page", className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-gutter",
        size === "page" ? "max-w-page" : "max-w-prose",
        className,
      )}
      {...props}
    />
  );
}
