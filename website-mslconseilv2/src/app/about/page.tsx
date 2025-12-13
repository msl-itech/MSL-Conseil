import Link from "next/link";
import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import AboutMethod from "@/components/about/AboutMethod";
import AboutValues from "@/components/about/AboutValues";

export default function AboutPage() {
    return (
        <main className="w-full bg-white flex flex-col">
            <AboutHero />
            <AboutMission />
            <AboutMethod />
            <AboutValues />

            {/* Final CTA */}
            <section className="py-24 px-6 bg-white flex flex-col items-center justify-center gap-6">
                <h2 className="text-3xl font-serif text-primary mb-4 text-center">Prêt à piloter votre croissance ?</h2>
                <div className="flex flex-col sm:flex-row gap-6">
                    <Link href="/methode" className="px-8 py-4 bg-primary text-white rounded-full font-bold uppercase tracking-wider text-xs hover:bg-secondary transition-colors duration-300 shadow-xl hover:scale-105 text-center">
                        Découvrir la méthode P.I.L.O.T.E.R.
                    </Link>
                    <Link href="/contact" className="px-8 py-4 bg-white text-primary border border-primary rounded-full font-bold uppercase tracking-wider text-xs hover:bg-primary/5 transition-colors duration-300 shadow-sm hover:scale-105 text-center">
                        Demander votre diagnostic gratuit
                    </Link>
                </div>
            </section>
        </main>
    );
}
