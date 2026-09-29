import Container from "@/components/ui/container";
import Link from "@/components/ui/locale-link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/ui";
import { getSite } from "@/lib/content";
import { isTodo } from "@/lib/todo";

export default function SiteFooter({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const t = getDictionary(locale);
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line pb-safe px-safe">
      <Container className="flex flex-col gap-12 py-16 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-4">
          <p className="text-caption uppercase text-subtle">Contact</p>
          <a
            href={`mailto:${site.email}`}
            className="text-h3 font-medium text-fg underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.links.map((link) => (
              <li key={link.label}>
                {isTodo(link.href) ? (
                  <span className="text-small text-subtle" title={t.linkPending}>
                    {link.label}
                  </span>
                ) : (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-small text-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <nav aria-label={t.footerNav}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-small text-muted transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-caption text-subtle">
            © {year} {site.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
