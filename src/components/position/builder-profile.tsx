import Image from "next/image";
import Text from "@/components/ui/text";
import { getT } from "@/i18n/server";
import { getProfile } from "@/lib/content";

/** AI Product Builder 소개 아래 프로필: 사진 · 이름 · AI 관련 소개 · 연락처 */
export default function BuilderProfile() {
  const t = getT();
  const profile = getProfile();
  const { contact } = profile;
  const contactRows = [
    { label: t.email, value: contact.email, href: `mailto:${contact.email}` },
    { label: t.phone, value: contact.phone, href: `tel:${contact.phone.replace(/-/g, "")}` },
    { label: t.birth, value: contact.birth },
    { label: t.address, value: contact.address },
  ];

  return (
    <section
      aria-label="Profile"
      className="mt-4 grid gap-6 rounded-card border border-line p-5 sm:grid-cols-[7rem_1fr] sm:gap-8 md:grid-cols-[10rem_1fr] md:p-8"
    >
      {profile.portrait && (
        <div className="relative aspect-[7/9] w-28 overflow-hidden rounded-card bg-surface sm:w-full">
          <Image src={profile.portrait.src} alt={profile.portrait.alt} fill sizes="160px" className="object-cover" />
        </div>
      )}
      <div className="flex min-w-0 flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-h3 font-semibold text-fg">
            {profile.name}{" "}
            {profile.name.toUpperCase() !== profile.nameEn && <span className="text-body font-medium text-subtle">{profile.nameEn}</span>}
          </p>
          {profile.aiBio.map((paragraph) => (
            <Text key={paragraph}>{paragraph}</Text>
          ))}
        </div>
        <dl className="grid gap-x-6 gap-y-3 border-t border-line pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactRows.map((c) => (
            <div key={c.label} className="flex min-w-0 flex-col gap-1">
              <dt className="text-caption uppercase text-subtle">{c.label}</dt>
              <dd className="text-small break-words text-fg">
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
      </div>
    </section>
  );
}
