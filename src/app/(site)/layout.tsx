import SiteShell, { siteMetadata, siteViewport } from "@/components/layout/site-shell";
import "./globals.css";

export const metadata = siteMetadata("ko");
export const viewport = siteViewport;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <SiteShell locale="ko">{children}</SiteShell>;
}
