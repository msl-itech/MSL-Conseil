"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GuideHero from "@/components/ressources/guides/controle-gestion/GuideHero";
import GuideUserForm from "@/components/ressources/guides/controle-gestion/GuideUserForm";
import GuideContent from "@/components/ressources/guides/controle-gestion/GuideContent";
import GuideQuiz, { QUESTIONS } from "@/components/ressources/guides/controle-gestion/GuideQuiz";
import GuideResults from "@/components/ressources/guides/controle-gestion/GuideResults";
import ChapterNav from "@/components/ressources/guides/controle-gestion/ChapterNav";
import SharedResults from "@/components/ressources/guides/controle-gestion/SharedResults";
import { createOdooLead, updateOdooLead, formatQuizResultsToDescription } from "@/lib/odoo-api";
import toast from "react-hot-toast";

export interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    role: string;
    employees: string;
}

// Sections list for navigation
const SECTIONS = [
    { id: 1, title: "Qu'est-ce que le contrôle de gestion ?" },
    { id: 2, title: "Pourquoi est-il important ?" },
    { id: 3, title: "Différence entre contrôle de gestion et comptabilité" },
    { id: 4, title: "Les différentes formes de contrôle" },
    { id: 5, title: "Le rôle du contrôleur de gestion" },
    { id: 6, title: "Les outils clés du contrôle de gestion" },
    { id: 7, title: "Les étapes pour mettre en place un contrôle de gestion" },
    { id: 8, title: "Contrôleur de gestion vs Expert-comptable" },
    { id: 9, title: "Quels outils informatiques ?" },
    { id: 10, title: "Avantages et limites" },
    { id: 11, title: "Travailler avec un cabinet comptable" },
];

interface SharedData {
    score: number;
    level: string;
    fromName?: string;
}

function GuideControleGestionContent() {
    const searchParams = useSearchParams();
    const [isMounted, setIsMounted] = useState(false);
    const [step, setStep] = useState<"content" | "form" | "quiz" | "results" | "shared">("content");
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
    const [score, setScore] = useState(0);
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

    const handleUserSubmit = async (info: UserInfo) => {
        setUserInfo(info);
        setIsCreatingLead(true);
        
        const loadingToast = toast.loading("Enregistrement de vos informations...");
        
        try {
            // Adapter UserInfo au format attendu par formatUserDataToLead
            const userData = {
                firstName: info.firstName,
                lastName: info.lastName,
                email: info.email,
                company: info.company,
                employees: info.employees,
            };
            
            // Créer le lead dans Odoo
            const response = await createOdooLead(userData, "Guide: Contrôle de Gestion");
            
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

    const handleQuizComplete = async (answers: Record<number, number>, totalScore: number) => {
        setQuizAnswers(answers);
        setScore(totalScore);
        
        // Mettre à jour le lead avec les résultats du quiz
        console.log("🔍 DEBUG - leadId:", leadId);
        console.log("🔍 DEBUG - userInfo:", userInfo);
        
        if (leadId && userInfo) {
            const updatingToast = toast.loading("Envoi de vos résultats...");
            
            try {
                const maxScore = Object.keys(answers).length; // Nombre de questions
                const percentage = Math.round((totalScore / maxScore) * 100);
                
                // Adapter UserInfo au format attendu
                const userData = {
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                    company: userInfo.company,
                    employees: userInfo.employees,
                };
                
                // Convertir les clés numériques en chaînes pour le format attendu
                const stringAnswers: Record<string, number> = {};
                const questionsMap: Record<string, string> = {};
                Object.entries(answers).forEach(([key, value]) => {
                    const questionKey = `q${key}`;
                    stringAnswers[questionKey] = value;
                    
                    // Trouver la question correspondante pour obtenir son texte
                    const question = QUESTIONS.find(q => q.id === parseInt(key));
                    if (question) {
                        questionsMap[questionKey] = question.question;
                    }
                });
                
                const updatedDescription = formatQuizResultsToDescription(
                    userData,
                    {
                        answers: stringAnswers,
                        totalScore,
                        maxScore,
                        percentage,
                        questions: questionsMap,
                    },
                    "Guide: Contrôle de Gestion"
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
                <div className="w-full min-h-[70vh] flex items-center justify-center pt-24" style={{ background: "linear-gradient(135deg, #012a1e 0%, #014730 50%, #016742 100%)" }}>
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
                <GuideUserForm
                    onSubmit={handleUserSubmit}
                    onBack={handleBackToContent}
                />
            )}

            {step === "quiz" && userInfo && (
                <GuideQuiz
                    userName={userInfo.firstName}
                    onComplete={handleQuizComplete}
                    onBack={handleBackToForm}
                />
            )}

            {step === "results" && userInfo && (
                <GuideResults
                    score={score}
                    userInfo={userInfo}
                    onRestartQuiz={handleRestartQuiz}
                />
            )}
        </main>
    );
}

export default function GuideControleGestionPage() {
    return (
        <Suspense fallback={
            <main className="w-full min-h-screen bg-white">
                <div className="w-full min-h-[70vh] flex items-center justify-center pt-24" style={{ background: "linear-gradient(135deg, #012a1e 0%, #014730 50%, #016742 100%)" }}>
                    <div className="text-white/50 text-sm">Chargement...</div>
                </div>
            </main>
        }>
            <GuideControleGestionContent />
        </Suspense>
    );
}
