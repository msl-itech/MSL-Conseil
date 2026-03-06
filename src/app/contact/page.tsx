import ContactHero from "@/components/contact/ContactHero";
import ContactContent from "@/components/contact/ContactContent";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
    title: "Contact",
    description: "Contactez MSL Conseils pour un accompagnement Odoo Finances en Belgique ou au Maroc. Demandez un rendez-vous ou un audit personnalisé.",
    url: "/contact",
    keywords: [
        "Contact MSL Conseils",
        "Expert Odoo Belgique",
        "Expert Odoo Maroc",
        "Audit Odoo Finances",
        "Rendez-vous conseil",
    ],
});

export default function ContactPage() {
    return (
        <main className="w-full bg-white flex flex-col" suppressHydrationWarning>
            <ContactHero />
            <ContactContent />
        </main>
    );
}
