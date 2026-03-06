import ResourceHero from "@/components/ressources/ResourceHero";
import ResourceGuides from "@/components/ressources/ResourceGuides";
import ResourceArticles from "@/components/ressources/ResourceArticles";
import ResourceCaseStudies from "@/components/ressources/ResourceCaseStudies";
import ResourceChecklists from "@/components/ressources/ResourceChecklists";
import ResourceCTA from "@/components/ressources/ResourceCTA";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
    title: "Ressources & Guides Odoo Finances",
    description: "Guides pratiques, articles et outils pour maîtriser Odoo Finances. Diagnostics de maturité, formations et bonnes pratiques pour piloter votre gestion financière.",
    url: "/ressources",
    keywords: [
        "Guides Odoo",
        "Ressources Odoo Finances",
        "Diagnostic maturité",
        "Formation gestion financière",
        "Bonnes pratiques Odoo",
    ],
});

export default function ResourcesPage() {
    return (
        <main className="w-full bg-white flex flex-col" suppressHydrationWarning>
            <ResourceHero />
            <ResourceGuides />
            <ResourceArticles />
            <ResourceCaseStudies />
            <ResourceChecklists />
            <ResourceCTA />
        </main>
    );
}
