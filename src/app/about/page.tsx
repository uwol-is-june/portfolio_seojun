import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import Tag from "@/components/ui/tag";
import Text from "@/components/ui/text";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import type { DatedItem, TimelineItem } from "@/content/types";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `${profile.headline} ${profile.name}의 경력, 활동, 수상, 자격증`,
  path: "/about",
});

/** About: 소개 · 연락처 → 경력 → 활동 · 학력 → 수상 · 자격증 → 스킬 */
export default function AboutPage() {
  const { contact } = profile;
  const contactRows = [
    { label: "이메일", value: contact.email, href: `mailto:${contact.email}` },
    { label: "연락처", value: contact.phone, href: `tel:${contact.phone.replace(/-/g, "")}` },
    { label: "생년월일", value: contact.birth },
    { label: "주소", value: contact.address },
  ];

  return (
    <main className="pt-header">
      {/* 소개 */}
      <Container className="grid gap-10 pt-16 pb-section md:grid-cols-[minmax(0,16rem)_1fr] md:gap-16 md:pt-24">
        {profile.portrait && (
          <div className="relative aspect-[7/9] w-40 overflow-hidden rounded-card bg-surface md:w-full">
            <Image src={profile.portrait.src} alt={profile.portrait.alt} fill priority sizes="256px" className="object-cover" />
          </div>
        )}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-caption uppercase text-subtle">About · 지원 포지션 {profile.target}</p>
            <h1 className="text-h1 font-semibold text-fg">
              {profile.name} <span className="text-h3 font-medium text-subtle">{profile.nameEn}</span>
            </h1>
            <p className="text-h3 font-medium text-fg text-balance">
              <span className="text-collab">협업</span>을 좋아해서, <span className="text-startup">창업</span>을 해버린{" "}
              <span className="text-ai">AI</span> PM
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {profile.bio.map((paragraph) => (
              <Text key={paragraph} size="lg">
                {paragraph}
              </Text>
            ))}
          </div>
          <dl id="contact" className="grid scroll-mt-header gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-2">
            {contactRows.map((c) => (
              <div key={c.label} className="flex flex-col gap-1">
                <dt className="text-caption uppercase text-subtle">{c.label}</dt>
                <dd className="text-body text-fg">
                  {c.href ? (
                    <a href={c.href} className="underline-offset-4 hover:underline">
                      {c.value}
                    </a>
                  ) : (
                    c.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={profile.resume.href}>{profile.resume.label} ↗</ButtonLink>
            {site.links
              .filter((l) => l.href !== profile.resume.href)
              .map((l) => (
                <ButtonLink key={l.label} href={l.href} variant="secondary">
                  {l.label} ↗
                </ButtonLink>
              ))}
          </div>
        </div>
      </Container>

      <Section bordered aria-labelledby="experience">
        <TwoColumn id="experience" eyebrow="Work Experience" title="경력">
          <Timeline items={profile.timeline} />
        </TwoColumn>
      </Section>

      <Section bordered aria-labelledby="activities">
        <TwoColumn id="activities" eyebrow="Activities · Education" title="활동과 학력">
          <div className="flex flex-col gap-16">
            <Timeline items={profile.activities} />
            <Timeline items={profile.education} />
          </div>
        </TwoColumn>
      </Section>

      <Section bordered aria-labelledby="awards">
        <TwoColumn id="awards" eyebrow="Awards · Certificates" title="수상과 자격증">
          <div className="flex flex-col gap-12">
            <DatedList title={`수상 ${profile.awards.length}회`} items={profile.awards} />
            <DatedList title={`자격증 ${profile.certificates.length}개`} items={profile.certificates} />
          </div>
        </TwoColumn>
      </Section>

      <Section bordered aria-labelledby="skills">
        <TwoColumn id="skills" eyebrow="Skills" title="스킬">
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
        </TwoColumn>
      </Section>
    </main>
  );
}

function TwoColumn({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
      <Heading id={id} eyebrow={eyebrow}>
        {title}
      </Heading>
      <div>{children}</div>
    </div>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="flex flex-col gap-10 border-l border-line pl-6">
      {items.map((item) => (
        <li key={`${item.period}-${item.organization}`} className="relative flex flex-col gap-2">
          <span aria-hidden className="absolute top-1.5 -left-[1.8125rem] size-2.5 rounded-pill border border-fg bg-bg" />
          <p className="font-mono text-caption text-subtle">{item.period}</p>
          <h3 className="text-h3 font-semibold text-fg">{item.organization}</h3>
          <p className="text-body text-muted">{item.role}</p>
          {item.description && <Text size="sm">{item.description}</Text>}
          {item.points && (
            <ul className="mt-1 flex flex-col gap-1.5">
              {item.points.map((p) => (
                <li key={p} className="flex gap-2 text-small text-fg">
                  <span aria-hidden className="text-subtle">
                    —
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}

function DatedList({ title, items }: { title: string; items: DatedItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-caption uppercase text-subtle">{title}</p>
      <ul className="flex flex-col divide-y divide-line border-y border-line">
        {items.map((a) => (
          <li key={a.title} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
            <span className="font-mono text-caption text-subtle sm:pt-1">{a.date}</span>
            <span className="flex flex-col gap-0.5">
              <span className="text-body font-medium text-fg">{a.title}</span>
              <span className="text-small text-muted">{a.issuer}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
