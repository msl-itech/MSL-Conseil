import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

const title = "Diagnostic de maturité financière PME | Odoo Finan";
const description =
  "Évaluez la maturité financière de votre PME en quelques minutes. Diagnostics gratuits et recommandations personnalisées pour structurer, piloter et automatiser avec Odoo.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}/diagnostic`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function DiagnosticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
