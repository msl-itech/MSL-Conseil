"use client";

import DiagnosticGuidance from "@/components/diagnostic/DiagnosticGuidance";
import DiagnosticHero from "@/components/diagnostic/DiagnosticHero";
import DiagnosticIntro from "@/components/diagnostic/DiagnosticIntro";
import DiagnosticList from "@/components/diagnostic/DiagnosticList";
import DiagnosticWhy from "@/components/diagnostic/DiagnosticWhy";

export default function DiagnosticPage() {
  return (
    <main className="w-full" suppressHydrationWarning>
      <DiagnosticHero />
      <DiagnosticIntro />
      <DiagnosticList />
      <DiagnosticGuidance />
      <DiagnosticWhy />
    </main>
  );
}
