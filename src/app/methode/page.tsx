import MethodeHero from "@/components/methode/MethodeHero";
import MethodeIntro from "@/components/methode/MethodeIntro";
import MethodeSteps from "@/components/methode/MethodeSteps";
import MethodeSummary from "@/components/methode/MethodeSummary";

export default function MethodePage() {
    return (
        <main className="min-h-screen bg-white">
            <MethodeHero />
            <MethodeIntro />
            <MethodeSteps />
            <MethodeSummary />
        </main>
    );
}
