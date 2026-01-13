"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import GuideHero from "@/components/ressources/guides/plan-action-2026/GuideHero";
import GuideContent from "@/components/ressources/guides/plan-action-2026/GuideContent";
import GuideContentPart2 from "@/components/ressources/guides/plan-action-2026/GuideContentPart2";
import ChapterNav from "@/components/ressources/guides/plan-action-2026/ChapterNav";
import ChecklistForm, { UserData as ChecklistUserData } from "@/components/ressources/guides/plan-action-2026/ChecklistForm";
import InteractiveChecklist, { ChecklistAnswers, PHASES } from "@/components/ressources/guides/plan-action-2026/InteractiveChecklist";
import ChecklistResults from "@/components/ressources/guides/plan-action-2026/ChecklistResults";
import SharedResults from "@/components/ressources/guides/plan-action-2026/SharedResults";
import { createOdooLead, updateOdooLead, formatQuizResultsToDescription } from "@/lib/odoo-api";

const SECTIONS_PART1 = [
    { id: 1, title: "La Trésorerie" },
    { id: 2, title: "La Rentabilité réelle" },
    { id: 3, title: "Les Coûts Fixes et Variables" },
    { id: 4, title: "Le Suivi Budgétaire" },
    { id: 5, title: "Le Reporting Extra-Financier" },
];

const SECTIONS_PART2 = [
    { id: 6, title: "Méthodologie en 4 étapes" },
    { id: 7, title: "Gouvernance & Risques" },
    { id: 8, title: "Grille de maturité" },
];

type Step = "part1" | "part2" | "checklistForm" | "checklist" | "checklistResults" | "shared";

function GuidePlanAction2026Content() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState<Step>("part1");
    const [checklistUserData, setChecklistUserData] = useState<ChecklistUserData | null>(null);
    const [checklistAnswers, setChecklistAnswers] = useState<ChecklistAnswers>({});
    const [checklistScore, setChecklistScore] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const [leadId, setLeadId] = useState<number | null>(null);

    // Shared results data
    const [sharedScore, setSharedScore] = useState(0);
    const [sharedLevel, setSharedLevel] = useState("");
    const [sharedFrom, setSharedFrom] = useState("");

    // Check for shared results on mount
    useEffect(() => {
        const isShared = searchParams.get("shared") === "true";
        const scoreParam = searchParams.get("score");
        const levelParam = searchParams.get("level");
        const fromParam = searchParams.get("from");

        if (isShared && scoreParam) {
            setSharedScore(parseInt(scoreParam, 10) || 0);
            setSharedLevel(levelParam || "Débutant");
            setSharedFrom(fromParam || "");
            setStep("shared");
        }
    }, [searchParams]);

    const clearUrlParams = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete("shared");
        url.searchParams.delete("score");
        url.searchParams.delete("level");
        url.searchParams.delete("from");
        window.history.replaceState({}, "", url.toString());
    };

    const handleContinueToPart2 = () => {
        setStep("part2");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBackToPart1 = () => {
        setStep("part1");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBackToGuide = () => {
        setStep("part2");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Checklist flow handlers
    const handleStartChecklist = () => {
        clearUrlParams();
        setStep("checklistForm");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleChecklistFormSubmit = async (data: ChecklistUserData) => {
        setChecklistUserData(data);
        
        // Créer le lead dans Odoo avec les informations de l'utilisateur
        const creatingToast = toast.loading("Création de votre espace...");
        
        try {
            const userData = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                company: data.company,
                employees: data.employees,
            };
            
            const response = await createOdooLead(userData, "Guide: Plan d'Action 2026");
            
            if (response.id) {
                setLeadId(response.id);
                console.log("✅ Lead créé avec succès, ID:", response.id);
                toast.success("Informations enregistrées ! 🎉", {
                    id: creatingToast,
                });
            }
        } catch (error) {
            console.error("Erreur lors de la création du lead:", error);
            toast.error("Erreur lors de l'enregistrement, mais vous pouvez continuer", {
                id: creatingToast,
            });
            // On continue même si l'envoi échoue
        }
        
        setStep("checklist");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBackToChecklistForm = () => {
        setStep("checklistForm");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleChecklistComplete = async (answers: ChecklistAnswers, score: number) => {
        setChecklistAnswers(answers);
        setChecklistScore(score);
        
        // Mettre à jour le lead avec les résultats de la checklist
        console.log("🔍 DEBUG - leadId:", leadId);
        console.log("🔍 DEBUG - checklistUserData:", checklistUserData);
        
        if (leadId && checklistUserData) {
            const updatingToast = toast.loading("Envoi de vos résultats...");
            
            try {
                const userData = {
                    firstName: checklistUserData.firstName,
                    lastName: checklistUserData.lastName,
                    email: checklistUserData.email,
                    company: checklistUserData.company,
                    employees: checklistUserData.employees,
                };
                
                // Convertir les réponses de la checklist au format attendu
                const formattedAnswers: Record<string, number> = {};
                const questionsMap: Record<string, string> = {};
                
                // Créer un mapping complet de tous les items de la checklist
                PHASES.forEach(phase => {
                    phase.items.forEach(item => {
                        questionsMap[item.id] = item.text;
                    });
                });
                
                Object.entries(answers).forEach(([key, value]) => {
                    formattedAnswers[key] = value ? 1 : 0;
                });
                
                const maxScore = Object.keys(answers).length;
                const percentage = Math.round((score / maxScore) * 100);
                
                const updatedDescription = formatQuizResultsToDescription(
                    userData,
                    {
                        answers: formattedAnswers,
                        totalScore: score,
                        maxScore,
                        percentage,
                        questions: questionsMap,
                    },
                    "Guide: Plan d'Action 2026 - Checklist"
                );
                
                console.log("📝 DEBUG - Description (premiers 200 chars):", updatedDescription.substring(0, 200));
                console.log("📊 DEBUG - Envoi à Odoo - leadId:", leadId);
                
                const updateResponse = await updateOdooLead(leadId, {
                    description: updatedDescription
                });
                
                console.log("✅ Lead mis à jour avec succès:", updateResponse);
                toast.success("Vos résultats ont été enregistrés avec succès ! 🎉", {
                    id: updatingToast,
                });
            } catch (error) {
                console.error("Erreur lors de la mise à jour du lead:", error);
                toast.error("Erreur lors de l'envoi, mais vos résultats s'affichent", {
                    id: updatingToast,
                });
                // On continue vers les résultats même si la mise à jour échoue
            }
        } else {
            console.warn("⚠️ Aucun leadId trouvé - la mise à jour du lead n'a pas été effectuée");
            toast.error("Impossible d'envoyer vos résultats (pas de leadId)", {
                duration: 2000,
            });
        }
        
        setStep("checklistResults");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleRestartChecklist = () => {
        setChecklistAnswers({});
        setChecklistScore(0);
        setStep("checklist");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSharedReadGuide = () => {
        clearUrlParams();
        setStep("part1");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Show shared results
    if (step === "shared") {
        return (
            <main className="w-full min-h-screen bg-white" suppressHydrationWarning>
                <SharedResults
                    score={sharedScore}
                    level={sharedLevel}
                    from={sharedFrom}
                    onStartDiagnostic={handleStartChecklist}
                    onReadGuide={handleSharedReadGuide}
                />
            </main>
        );
    }

    return (
        <main className="w-full min-h-screen bg-white" suppressHydrationWarning>
            {step === "part1" && <ChapterNav sections={SECTIONS_PART1} onCtaClick={handleStartChecklist} />}
            {step === "part2" && <ChapterNav sections={SECTIONS_PART2} onCtaClick={handleStartChecklist} />}

            {step === "part1" && (
                <div ref={contentRef}>
                    <GuideHero />
                    <GuideContent onStartQuiz={handleContinueToPart2} />
                </div>
            )}

            {step === "part2" && (
                <GuideContentPart2
                    onBack={handleBackToPart1}
                    onStartChecklist={handleStartChecklist}
                />
            )}

            {/* Checklist Flow */}
            {step === "checklistForm" && (
                <ChecklistForm onSubmit={handleChecklistFormSubmit} onBack={handleBackToGuide} />
            )}

            {step === "checklist" && checklistUserData && (
                <InteractiveChecklist
                    userName={checklistUserData.firstName}
                    onComplete={handleChecklistComplete}
                    onBack={handleBackToChecklistForm}
                />
            )}

            {step === "checklistResults" && checklistUserData && (
                <ChecklistResults
                    score={checklistScore}
                    maxScore={20}
                    answers={checklistAnswers}
                    userInfo={checklistUserData}
                    onRestart={handleRestartChecklist}
                />
            )}
        </main>
    );
}

export default function GuidePlanAction2026Page() {
    return (
        <Suspense fallback={
            <main className="w-full min-h-screen bg-white flex items-center justify-center" suppressHydrationWarning>
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">Chargement...</p>
                </div>
            </main>
        }>
            <GuidePlanAction2026Content />
        </Suspense>
    );
}
