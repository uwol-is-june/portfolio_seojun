import { ButtonLink } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Text from "@/components/ui/text";

export default function NotFound() {
  return (
    <main className="pt-header">
      <Container className="flex min-h-[70dvh] flex-col items-start justify-center gap-6">
        <Heading level="h1" eyebrow="404">
          페이지를 찾을 수 없습니다
        </Heading>
        <Text>주소가 바뀌었거나 없는 페이지입니다.</Text>
        <ButtonLink href="/" variant="secondary">
          홈으로
        </ButtonLink>
      </Container>
    </main>
  );
}
