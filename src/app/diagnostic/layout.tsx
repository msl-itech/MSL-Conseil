import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagnostic de maturité financière PME | Odoo Finances",
};

export default function DiagnosticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
