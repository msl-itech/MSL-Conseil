"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GuideHero from "@/components/ressources/guides/automatisation-odoo/GuideHero";
import GuideContent from "@/components/ressources/guides/automatisation-odoo/GuideContent";
import ChapterNav from "@/components/ressources/guides/automatisation-odoo/ChapterNav";
import UserForm, { UserData } from "@/components/ressources/guides/automatisation-odoo/UserForm";
import Quiz, { QUIZ_SECTIONS } from "@/components/ressources/guides/automatisation-odoo/Quiz";
import QuizResults from "@/components/ressources/guides/automatisation-odoo/QuizResults";
import SharedResults from "@/components/ressources/guides/automatisation-odoo/SharedResults";
import { createOdooLead, updateOdooLead, formatQuizResultsToDescription } from "@/lib/odoo-api";
import toast from "react-hot-toast";

export type { UserData as UserInfo } from "@/components/ressources/guides/automatisation-odoo/UserForm";

// Sections list for navigation (Chapters 6-11)
const SECTIONS = [
    { id: 6, title: "Automatiser les flux comptables avec Odoo" },
    { id: 7, title: "Définir les indicateurs clés de pilotage" },
    { id: 8, title: "Mettre en place une comptabilité analytique" },
    { id: 9, title: "Organiser la production comptable" },
    { id: 10, title: "Préparer l'interaction avec le cabinet" },
    { id: 11, title: "Faire évoluer l'architecture comptable" },
];

interface SharedData {
    score: number;
    level: string;
    fromName?: string;
}

function GuideAutomatisationOdooContent() {
    const searchParams = useSearchParams();
    const [isMounted, setIsMounted] = useState(false);
    const [step, setStep] = useState<"content" | "form" | "quiz" | "results" | "shared">("content");
    const [userInfo, setUserInfo] = useState<UserData | null>(null);
    const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
    const [score, setScore] = useState(0);
    const [isSharedVisitor, setIsSharedVisitor] = useState(false);
    const [sharedData, setSharedData] = useState<SharedData | null>(null);
    const [leadId, setLeadId] = useState<number | null>(null);
    const [isCreatingLead, setIsCreatingLead] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Check if visitor came from a shared link with score info
    useEffect(() => {
        if (!isMounted) return;

        const shared = searchParams.get('shared');
        const scoreParam = searchParams.get('score');
        const level = searchParams.get('level');
        const fromName = searchParams.get('from');

        if (shared === 'true' && scoreParam && level) {
            setSharedData({
                score: parseInt(scoreParam, 10),
                level: decodeURIComponent(level),
                fromName: fromName ? decodeURIComponent(fromName) : undefined
            });
            setStep("shared");
            setIsSharedVisitor(true);
        }
    }, [searchParams, isMounted]);

    const handleStartQuiz = () => {
        // Clear URL params when starting own diagnostic
        if (typeof window !== 'undefined') {
            window.history.replaceState({}, '', window.location.pathname);
        }
        setStep("form");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleUserSubmit = async (info: UserData) => {
        setUserInfo(info);
        setIsCreatingLead(true);
        
        const loadingToast = toast.loading("Enregistrement de vos informations...");
        
        try {
            // Créer le lead dans Odoo
            const response = await createOdooLead(info, "Guide: Automatisation avec Odoo");
            
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

    const handleQuizComplete = async (answers: Record<string, number>, totalScore: number) => {
        setQuizAnswers(answers);
        setScore(totalScore);
        
        // Mettre à jour le lead avec les résultats du quiz
        if (leadId && userInfo) {
            const updatingToast = toast.loading("Envoi de vos résultats...");
            
            try {
                const maxScore = 31; // 31 questions dans ce guide
                const percentage = Math.round((totalScore / maxScore) * 100);
                
                // Créer un mapping des questions avec leur texte
                const questionsMap: Record<string, string> = {};
                QUIZ_SECTIONS.forEach(section => {
                    section.questions.forEach(q => {
                        questionsMap[q.id] = q.text;
                    });
                });
                
                const updatedDescription = formatQuizResultsToDescription(
                    userInfo,
                    {
                        answers,
                        totalScore,
                        maxScore,
                        percentage,
                        questions: questionsMap,
                    },
                    "Guide: Automatisation avec Odoo"
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

    const handleRestartQuiz = () => {
        setQuizAnswers({});
        setScore(0);
        setStep("quiz");
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
                <div className="w-full min-h-[70vh] flex items-center justify-center pt-24" style={{ background: "linear-gradient(135deg, #714b67 0%, #8e6180 100%)" }}>
                    <div className="text-white/50 text-sm">Chargement...</div>
                </div>
            </main>
        );
    }

    return (
        <main className="w-full min-h-screen bg-white" suppressHydrationWarning>
            {/* Chapter Navigation - Only visible on content step */}
            {step === "content" && <ChapterNav sections={SECTIONS} onCtaClick={handleStartQuiz} />}

            {/* Shared results view */}
            {step === "shared" && sharedData && (
                <SharedResults
                    score={sharedData.score}
                    level={sharedData.level}
                    fromName={sharedData.fromName}
                    onStartDiagnostic={handleStartQuiz}
                    onReadGuide={handleBackToContent}
                />
            )}

            {step === "content" && (
                <div ref={contentRef}>
                    <GuideHero />
                    <GuideContent onStartQuiz={handleStartQuiz} />
                </div>
            )}

            {step === "form" && (
                <UserForm
                    onSubmit={handleUserSubmit}
                    onBack={handleBackToContent}
                />
            )}

            {step === "quiz" && userInfo && (
                <Quiz
                    userName={userInfo.firstName}
                    onComplete={handleQuizComplete}
                    onBack={handleBackToForm}
                />
            )}

            {step === "results" && userInfo && (
                <QuizResults
                    score={score}
                    answers={quizAnswers}
                    userInfo={userInfo}
                    onRestartQuiz={handleRestartQuiz}
                    isSharedVisitor={isSharedVisitor}
                />
            )}
        </main>
    );
}

export default function GuideAutomatisationOdooPage() {
    return (
        <Suspense fallback={
            <main className="w-full min-h-screen bg-white">
                <div className="w-full min-h-[70vh] flex items-center justify-center pt-24" style={{ background: "linear-gradient(135deg, #714b67 0%, #8e6180 100%)" }}>
                    <div className="text-white/50 text-sm">Chargement...</div>
                </div>
            </main>
        }>
            <GuideAutomatisationOdooContent />
        </Suspense>
    );
}
