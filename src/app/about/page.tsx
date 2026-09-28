import type { Metadata } from "next";
import Reveal from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import Tag from "@/components/ui/tag";
import Text from "@/components/ui/text";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import type { TimelineItem } from "@/content/types";
import { pageMetadata } from "@/lib/metadata";
import { isTodo } from "@/lib/todo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: "경력, 스킬, 이력서와 연락처",
  path: "/about",
});

/** About: 소개 → 경력 타임라인 → 스킬 → 연락처 · 이력서 (TASK-19) */
export default function AboutPage() {
  return (
    <main className="pt-header">
      {/* 소개 */}
      <Container className="grid gap-10 pt-16 pb-section md:grid-cols-[1fr_1.2fr] md:gap-16 md:pt-24">
        <div className="flex flex-col gap-6">
          <p className="text-caption uppercase text-subtle">About</p>
          <h1 className="text-h1 font-semibold text-fg">{profile.name}</h1>
          <p className="text-h3 font-medium text-fg text-balance">{profile.headline}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={profile.resume.href} download>
              {profile.resume.label}
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              연락하기
            </ButtonLink>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {profile.bio.map((paragraph) => (
            <Text key={paragraph} size="lg">
              {paragraph}
            </Text>
          ))}
        </div>
      </Container>

      {/* 경력 */}
      <Section bordered aria-labelledby="experience">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <Heading id="experience" eyebrow="Experience">
            경력
          </Heading>
          <div className="flex flex-col gap-16">
            <Timeline items={profile.timeline} />
            <div className="flex flex-col gap-6">
              <p className="text-caption uppercase text-subtle">Education</p>
              <Timeline items={profile.education} />
            </div>
          </div>
        </div>
      </Section>

      {/* 스킬 */}
      <Section bordered aria-labelledby="skills">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <Heading id="skills" eyebrow="Skills">
            스킬
          </Heading>
          <dl className="flex flex-col divide-y divide-line border-y border-line">
            {profile.skills.map((group) => (
              <div key={group.category} className="grid gap-3 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="text-small font-medium text-fg">{group.category}</dt>
                <dd className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* 연락처 */}
      <Section bordered id="contact" aria-labelledby="contact-heading" className="scroll-mt-header">
        <Reveal className="flex flex-col gap-8">
          <Heading id="contact-heading" eyebrow="Contact">
            함께 일하고 싶다면 연락 주세요
          </Heading>
          {isTodo(site.email) ? (
            <p className="text-h2 font-semibold text-subtle">{site.email}</p>
          ) : (
            <a
              href={`mailto:${site.email}`}
              className="text-h2 font-semibold break-all text-fg underline-offset-8 hover:underline"
            >
              {site.email}
            </a>
          )}
          <div className="flex flex-wrap gap-3">
            {site.links.map((link) => (
              <ButtonLink key={link.label} href={link.href} variant="secondary" size="sm">
                {link.label}
              </ButtonLink>
            ))}
          </div>
        </Reveal>
      </Section>
    </main>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="flex flex-col gap-10 border-l border-line pl-6">
      {items.map((item) => (
        <li key={`${item.period}-${item.organization}`} className="relative flex flex-col gap-2">
          <span aria-hidden className="absolute top-1.5 -left-[1.8125rem] size-2.5 rounded-pill border border-fg bg-bg" />
          <p className="font-mono text-caption text-subtle">{item.period}</p>
          <p className="text-h3 font-semibold text-fg">
            {item.organization}
            <span className="ml-2 text-body font-normal text-muted">{item.role}</span>
          </p>
          {item.description && <Text size="sm">{item.description}</Text>}
        </li>
      ))}
    </ol>
  );
}
