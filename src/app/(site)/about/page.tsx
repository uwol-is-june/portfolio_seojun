import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import SkillIcon from "@/components/ui/skill-icon";
import Text from "@/components/ui/text";
import type { DatedItem, TimelineItem } from "@/content/types";
import { getT } from "@/i18n/server";
import { getProfile, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const profile = getProfile();
  return pageMetadata({ title: "About", description: getT().aboutDescription(profile.headline, profile.name), path: "/about" });
}

/** About: 소개 · 연락처 → 경력 → 활동 · 학력 → 수상 · 자격증 → 스킬 */
export default function AboutPage() {
  const t = getT();
  const profile = getProfile();
  const site = getSite();
  const { contact } = profile;
  const contactRows = [
    { label: t.email, value: contact.email, href: `mailto:${contact.email}` },
    { label: t.phone, value: contact.phone, href: `tel:${contact.phone.replace(/-/g, "")}` },
    { label: t.birth, value: contact.birth },
    { label: t.address, value: contact.address },
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
            <p className="text-caption uppercase text-subtle">About</p>
            <h1 className="text-h1 font-semibold text-fg">
              {profile.name}{" "}
              {/* 영어판은 이름이 곧 영문 이름이라 한 번만 */}
              {profile.name.toUpperCase() !== profile.nameEn && <span className="text-h3 font-medium text-subtle">{profile.nameEn}</span>}
            </h1>
            <p className="text-h3 font-medium text-fg text-balance">
              <span className="text-collab">{t.heroCollab}</span>
              {t.aboutComma}
              <span className="text-startup">{t.heroStartup}</span>
              {t.heroMid2}
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
        <TwoColumn id="experience" eyebrow="Work Experience" title={t.experience}>
          <Timeline items={profile.timeline} />
        </TwoColumn>
      </Section>

      <Section bordered aria-labelledby="activities">
        <TwoColumn id="activities" eyebrow="Activities · Education" title={t.activities}>
          <div className="flex flex-col gap-16">
            <Timeline items={profile.activities} />
            <Timeline items={profile.education} />
          </div>
        </TwoColumn>
      </Section>

      <Section bordered aria-labelledby="awards">
        <TwoColumn id="awards" eyebrow="Awards · Certificates" title={t.awardsCerts}>
          <div className="flex flex-col gap-12">
            <DatedList title={t.awardsCount(profile.awards.length)} items={profile.awards} />
            <DatedList title={t.certsCount(profile.certificates.length)} items={profile.certificates} />
          </div>
        </TwoColumn>
      </Section>

      <Section bordered aria-labelledby="skills">
        <TwoColumn id="skills" eyebrow="Skills" title={t.skills}>
          <dl className="flex flex-col divide-y divide-line border-y border-line">
            {profile.skills.map((group) => (
              <div key={group.category} className="grid gap-3 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="text-small font-medium text-fg">{group.category}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="inline-flex h-10 items-center gap-2 rounded-sm border border-line bg-surface px-3 text-small text-fg"
                      >
                        <SkillIcon name={item} className="text-muted" />
                        {item}
                      </li>
                    ))}
                  </ul>
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
