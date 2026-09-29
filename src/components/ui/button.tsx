import Link from "@/components/ui/locale-link";
import { cn } from "@/lib/cn";
import { isTodo } from "@/lib/todo";

const variants = {
  primary: "bg-fg text-bg hover:bg-muted",
  secondary: "border border-line-strong text-fg hover:border-fg",
  ghost: "text-muted hover:text-fg",
} as const;

const sizes = {
  md: "h-12 px-6 text-body",
  sm: "h-10 px-4 text-small",
} as const;

type StyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-40";

export function buttonClass({ variant = "primary", size = "md" }: StyleProps = {}) {
  return cn(base, variants[variant], sizes[size]);
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: React.ComponentProps<"button"> & StyleProps) {
  return <button type={type} className={cn(buttonClass({ variant, size }), className)} {...props} />;
}

/** 버튼 모양 링크. 외부 링크(http, mailto)와 공개 데모(/demo/*)는 새 탭이나 기본 동작으로 엽니다. */
export function ButtonLink({
  variant,
  size,
  className,
  href,
  ...props
}: Omit<React.ComponentProps<"a">, "href"> & StyleProps & { href: string }) {
  const classes = cn(buttonClass({ variant, size }), className);
  // 아직 주소를 채우지 않은 링크는 비활성 상태로 보여줍니다.
  if (isTodo(href)) {
    return (
      <span aria-disabled className={cn(classes, "pointer-events-none opacity-40")} title="[TODO] 링크 준비 중">
        {props.children}
      </span>
    );
  }
  // /demo/* 는 이 사이트 안이지만 따로 루트 레이아웃을 쓰는 공개 데모라 새 탭으로 엽니다.
  const isDemo = href.startsWith("/demo/");
  const isExternal = /^(https?:|mailto:|tel:)/.test(href) || href.endsWith(".pdf") || isDemo;
  if (isExternal) {
    const newTab = href.startsWith("http") || isDemo;
    return (
      <a
        href={href}
        className={classes}
        {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      />
    );
  }
  return <Link href={href} className={classes} {...props} />;
}
