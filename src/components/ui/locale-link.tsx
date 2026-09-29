"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { localizePath } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";

/** next/link와 같지만, 영어 페이지에서는 내부 주소에 /en을 붙입니다. */
export default function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const locale = useLocale();
  const localized = typeof href === "string" ? localizePath(href, locale) : href;
  return <Link href={localized} {...props} />;
}
