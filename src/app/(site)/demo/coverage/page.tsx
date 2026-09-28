import type { Metadata } from "next";
import CoverageDemo from "@/components/demo/coverage-demo";
import { ButtonLink } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Text from "@/components/ui/text";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "보장분석 프로그램 데모",
  description: "가입한 보험을 모아 권장 보장액과 비교하는 보장분석 프로그램을 가상 고객 데이터로 체험하는 데모입니다.",
  path: "/demo/coverage",
});

/** 보장분석 프로그램: 개인정보 없이 흐름만 체험하는 가상 데이터 데모 */
export default function CoverageDemoPage() {
  return (
    <main className="pt-header break-keep">
      <Container className="flex flex-col gap-6 pt-16 pb-10 md:pt-24">
        <p className="text-caption font-medium uppercase text-muted">Coverage Analysis · Demo</p>
        <h1 className="text-h1 font-semibold text-fg text-balance">내 보험 보장, 한눈에 확인하기</h1>
        <Text size="lg" className="max-w-3xl">
          실제 서비스는 &lsquo;내보험다보여&rsquo; 계정과 실제 보험 계약이 필요해 누구나 써 볼 수 없습니다. 이 데모는 같은
          흐름을 가상 고객 데이터로 다시 만든 것이라, 입력값은 어디에도 전송되지 않습니다.
        </Text>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/projects/coverage-analysis" size="sm" variant="secondary">
            케이스 스터디
          </ButtonLink>
        </div>
      </Container>
      <Container className="pb-section">
        <CoverageDemo />
      </Container>
    </main>
  );
}
