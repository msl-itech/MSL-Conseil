import MethodeHero from "@/components/methode/MethodeHero";
import MethodeIntro from "@/components/methode/MethodeIntro";
import MethodeSteps from "@/components/methode/MethodeSteps";
import MethodeExamples from "@/components/methode/MethodeExamples";
import MethodeWhy from "@/components/methode/MethodeWhy";
import MethodeCTA from "@/components/methode/MethodeCTA";
import SolutionsHero from "@/components/solutions/SolutionsHero";
import SolutionsList from "@/components/solutions/SolutionsList";
import SolutionsDisclaimer from "@/components/solutions/SolutionsDisclaimer";
import SolutionsCTA from "@/components/solutions/SolutionsCTA";
import SolutionsDetailedList from "@/components/solutions/SolutionsDetailedList";

export default function SolutionsPage() {
    return (
        <main className="w-full bg-white flex flex-col">
            <SolutionsHero />
            <SolutionsList />
            {/* <SolutionsDetailedList /> */}
            <SolutionsDisclaimer />
            <SolutionsCTA />

        </main>
    );
}
