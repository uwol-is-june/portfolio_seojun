"use client";

import { ButtonLink } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Text from "@/components/ui/text";
import { useT } from "@/i18n/locale-provider";

/** 404. 레이아웃의 언어를 따라 한국어 · 영어로 보여줍니다 (/en 아래는 영어). */
export default function NotFound() {
  const t = useT();
  return (
    <main className="pt-header">
      <Container className="flex min-h-[70dvh] flex-col items-start justify-center gap-6">
        <Heading level="h1" eyebrow="404">
          {t.notFoundTitle}
        </Heading>
        <Text>{t.notFoundBody}</Text>
        <ButtonLink href="/" variant="secondary">
          {t.goHome}
        </ButtonLink>
      </Container>
    </main>
  );
}
