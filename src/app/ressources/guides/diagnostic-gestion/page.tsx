"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GuideHero from "@/components/ressources/guides/diagnostic-gestion/GuideHero";
import GuideEducatif from "@/components/ressources/guides/diagnostic-gestion/GuideEducatif";
import ChapterNav from "@/components/ressources/guides/diagnostic-gestion/ChapterNav";
import UserForm, { UserData } from "@/components/ressources/guides/diagnostic-gestion/UserForm";
import Quiz, { QUIZ_BLOCKS } from "@/components/ressources/guides/diagnostic-gestion/Quiz";
import QuizResults from "@/components/ressources/guides/diagnostic-gestion/QuizResults";
import SharedResults from "@/components/ressources/guides/diagnostic-gestion/SharedResults";
import { createOdooLead, updateOdooLead, formatQuizResultsToDescription } from "@/lib/odoo-api";
import toast from "react-hot-toast";

type Step = "content" | "form" | "quiz" | "results" | "shared";

const CHAPTERS = [
    { id: 1, title: "Pourquoi structurer sa comptabilité" },
    { id: 2, title: "Définir les besoins comptables" },
    { id: 3, title: "Construire un plan comptable (PCMN)" },
    { id: 4, title: "Organiser les documents et flux" },
    { id: 5, title: "Choisir les bons outils" },
];

interface SharedData {
    score: number;
    level: string;
    fromName?: string;
}

function DiagnosticGestionContent() {
    const searchParams = useSearchParams();
    const [isMounted, setIsMounted] = useState(false);
    const [step, setStep] = useState<Step>("content");
    const [userData, setUserData] = useState<UserData | null>(null);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isSharedVisitor, setIsSharedVisitor] = useState(false);
    const [sharedData, setSharedData] = useState<SharedData | null>(null);
    const [leadId, setLeadId] = useState<number | null>(null);
    const [isCreatingLead, setIsCreatingLead] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Check if visitor came from a shared link with score info
    useEffect(() => {
        if (!isMounted) return;

        const shared = searchParams.get('shared');
        const score = searchParams.get('score');
        const level = searchParams.get('level');
        const fromName = searchParams.get('from');

        if (shared === 'true' && score && level) {
            setSharedData({
                score: parseInt(score, 10),
                level: decodeURIComponent(level),
                fromName: fromName ? decodeURIComponent(fromName) : undefined
            });
            setStep("shared");
            setIsSharedVisitor(true);
        }
    }, [searchParams, isMounted]);

    const handleStartDiagnostic = () => {
        // Clear URL params when starting own diagnostic
        if (typeof window !== 'undefined') {
            window.history.replaceState({}, '', window.location.pathname);
        }
        setStep("form");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleFormSubmit = async (data: UserData) => {
        setUserData(data);
        setIsCreatingLead(true);
        
        const loadingToast = toast.loading("Enregistrement de vos informations...");
        
        try {
            // Créer le lead dans Odoo
            const response = await createOdooLead(data, "Guide: Diagnostic de Gestion");
            
            // Stocker l'ID du lead pour mise à jour ultérieure
            if (response.id) {
                setLeadId(response.id);
                console.log("Lead créé avec succès:", response.id);
            } else {
                console.warn("Lead créé mais ID non disponible dans la réponse");
            }
            
            toast.success("Vos informations ont été enregistrées !", {
                id: loadingToast,
            });
        } catch (error) {
            console.error("Erreur lors de la création du lead:", error);
            toast.error("Une erreur est survenue, mais vous pouvez continuer le diagnostic", {
                id: loadingToast,
            });
            // On continue quand même vers le quiz même si la création échoue
        } finally {
            setIsCreatingLead(false);
        }
        
        setStep("quiz");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleQuizComplete = async (quizAnswers: Record<string, number>) => {
        setAnswers(quizAnswers);
        
        // Mettre à jour le lead avec les résultats du quiz
        if (leadId && userData) {
            const updatingToast = toast.loading("Envoi de vos résultats...");
            
            try {
                // Calculer le score total
                const totalScore = Object.values(quizAnswers).reduce((acc, val) => acc + val, 0);
                const maxScore = Object.keys(quizAnswers).length; // Nombre de questions
                const percentage = Math.round((totalScore / maxScore) * 100);
                
                // Créer un mapping des questions avec leur texte
                const questionsMap: Record<string, string> = {};
                QUIZ_BLOCKS.forEach(block => {
                    block.questions.forEach(q => {
                        questionsMap[q.id] = q.text;
                    });
                });
                
                const updatedDescription = formatQuizResultsToDescription(
                    userData,
                    {
                        answers: quizAnswers,
                        totalScore,
                        maxScore,
                        percentage,
                        questions: questionsMap,
                    },
                    "Guide: Diagnostic de Gestion"
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
        
        setStep("results");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBackToContent = () => {
        // Clear URL params
        if (typeof window !== 'undefined') {
            window.history.replaceState({}, '', window.location.pathname);
        }
        setStep("content");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBackToForm = () => {
        setStep("form");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Show loading during SSR
    if (!isMounted) {
        return (
            <main className="w-full min-h-screen bg-white" suppressHydrationWarning>
                <div className="w-full min-h-[70vh] flex items-center justify-center pt-24" style={{ background: "linear-gradient(135deg, #012a1e 0%, #014730 50%, #016742 100%)" }}>
                    <div className="text-white/50 text-sm">Chargement...</div>
                </div>
            </main>
        );
    }

    return (
        <main className="w-full min-h-screen bg-white" suppressHydrationWarning>
            {/* Chapter Navigation - Only visible on content step */}
            {step === "content" && <ChapterNav chapters={CHAPTERS} />}

            {/* Shared results view */}
            {step === "shared" && sharedData && (
                <SharedResults
                    score={sharedData.score}
                    level={sharedData.level}
                    fromName={sharedData.fromName}
                    onStartDiagnostic={handleStartDiagnostic}
                    onReadGuide={handleBackToContent}
                />
            )}

            {step === "content" && (
                <>
                    <GuideHero />
                    <GuideEducatif onStartDiagnostic={handleStartDiagnostic} />
                </>
            )}

            {step === "form" && (
                <UserForm onSubmit={handleFormSubmit} onBack={handleBackToContent} />
            )}

            {step === "quiz" && userData && (
                <Quiz onComplete={handleQuizComplete} onBack={handleBackToForm} userName={userData.firstName} />
            )}

            {step === "results" && userData && (
                <QuizResults userData={userData} answers={answers} isSharedVisitor={isSharedVisitor} />
            )}
        </main>
    );
}

export default function DiagnosticGestionPage() {
    return (
        <Suspense fallback={
            <main className="w-full min-h-screen bg-white">
                <div className="w-full min-h-[70vh] flex items-center justify-center pt-24" style={{ background: "linear-gradient(135deg, #012a1e 0%, #014730 50%, #016742 100%)" }}>
                    <div className="text-white/50 text-sm">Chargement...</div>
                </div>
            </main>
        }>
            <DiagnosticGestionContent />
        </Suspense>
    );
}
