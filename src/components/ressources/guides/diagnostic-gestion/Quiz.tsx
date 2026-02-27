"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface QuizProps {
    onComplete: (answers: Record<string, number>) => void;
    onBack: () => void;
    userName: string;
}

type AnswerType = "yesno" | "yespartiallyno" | "yesnodk";

interface Question {
    id: string;
    text: string;
    type: AnswerType;
    feedbackYes: string;
    feedbackNo: string;
    feedbackPartial?: string;
    feedbackDk?: string;
    chapter: number;
}

const QUIZ_BLOCKS = [
    {
        id: "bloc1",
        title: "Vision et pilotage",
        icon: "🎯",
        description: "Chapitre 1",
        questions: [
            {
                id: "q1",
                text: "Avez-vous un plan comptable clair et adapté à votre activité ?",
                type: "yesno" as AnswerType,
                feedbackYes: "Votre plan comptable est déjà structuré : excellent point de départ pour automatiser et piloter.",
                feedbackNo: "Sans plan comptable adapté, difficile d'avoir des indicateurs fiables. Le Chapitre 3 vous aide à construire une structure sur mesure.",
                chapter: 3
            },
            {
                id: "q2",
                text: "Votre comptabilité vous aide-t-elle à prendre des décisions ?",
                type: "yesno" as AnswerType,
                feedbackYes: "Vous exploitez déjà votre compta comme un outil stratégique : continuez ainsi !",
                feedbackNo: "Vous utilisez votre compta uniquement pour déclarer : vous perdez du potentiel. Découvrez comment en faire un levier avec le Chapitre 1.",
                chapter: 1
            },
            {
                id: "q3",
                text: "Pouvez-vous sortir un tableau de bord financier en moins de 5 minutes ?",
                type: "yesno" as AnswerType,
                feedbackYes: "Bravo ! Vous avez une vision rapide, base essentielle du pilotage.",
                feedbackNo: "Vous n'avez pas d'indicateurs accessibles rapidement. Le Chapitre 5 vous montre comment les mettre en place avec les bons outils.",
                chapter: 5
            },
            {
                id: "q4",
                text: "Avez-vous une vue à jour de votre trésorerie ?",
                type: "yesno" as AnswerType,
                feedbackYes: "Une bonne gestion de la trésorerie est un marqueur de maturité. Vous êtes sur la bonne voie.",
                feedbackNo: "Sans visibilité sur votre trésorerie, vous risquez de mauvaises surprises. Commencez par la base avec le Chapitre 1.",
                chapter: 1
            },
            {
                id: "q5",
                text: "Vos outils sont-ils bien connectés entre eux ?",
                type: "yesno" as AnswerType,
                feedbackYes: "Vous limitez les doubles saisies et gagnez du temps : c'est un excellent point.",
                feedbackNo: "Des outils non connectés = perte de temps et erreurs. Découvrez dans le Chapitre 5 comment centraliser.",
                chapter: 5
            },
        ]
    },
    {
        id: "bloc2",
        title: "Besoins & structuration",
        icon: "📊",
        description: "Chapitres 2 & 3",
        questions: [
            {
                id: "q6",
                text: "Avez-vous formalisé vos besoins comptables ?",
                type: "yesno" as AnswerType,
                feedbackYes: "Vous avez une vision claire de votre activité : base indispensable pour un système efficace.",
                feedbackNo: "Commencez par la fiche de cadrage du Chapitre 2 pour identifier vos vrais besoins.",
                chapter: 2
            },
            {
                id: "q7",
                text: "Avez-vous personnalisé votre plan comptable ?",
                type: "yesno" as AnswerType,
                feedbackYes: "Excellent ! Cela vous permettra une analyse plus fine et une automatisation accrue.",
                feedbackNo: "Un plan standard limite votre capacité de pilotage. Inspirez-vous du Chapitre 3 pour l'adapter.",
                chapter: 3
            },
            {
                id: "q8",
                text: "Suivez-vous la rentabilité par produit / activité / canal ?",
                type: "yespartiallyno" as AnswerType,
                feedbackYes: "C'est une pratique avancée : preuve d'un pilotage efficace.",
                feedbackPartial: "Vous avez commencé, mais un plan comptable personnalisé pourrait vous aider davantage (Chapitre 3).",
                feedbackNo: "Vous manquez d'un indicateur clé. Apprenez à structurer cela avec la compta analytique simple du Chapitre 3.",
                chapter: 3
            },
            {
                id: "q9",
                text: "Vos charges sont-elles classées de manière stratégique ?",
                type: "yesno" as AnswerType,
                feedbackYes: "Cela vous permet de suivre vos coûts efficacement. Très bon point.",
                feedbackNo: "Classez vos charges selon leur nature stratégique (pubs, logiciels, sous-traitance…). Voir les exemples du Chapitre 3.",
                chapter: 3
            },
        ]
    },
    {
        id: "bloc3",
        title: "Organisation documentaire",
        icon: "📂",
        description: "Chapitre 4",
        questions: [
            {
                id: "q10",
                text: "Vos documents sont-ils numérisés et centralisés ?",
                type: "yesno" as AnswerType,
                feedbackYes: "Vous avez les bases pour automatiser la saisie et gagner du temps.",
                feedbackNo: "Cela génère des oublis et des retards. Mettez en place la méthode du Chapitre 4.",
                chapter: 4
            },
            {
                id: "q11",
                text: "Disposez-vous d'une adresse email pour les factures fournisseurs ?",
                type: "yesno" as AnswerType,
                feedbackYes: "Cela facilite la centralisation et le traitement automatique. Bon réflexe !",
                feedbackNo: "C'est simple à mettre en place et très efficace. Consultez la rubrique \"organisation documentaire\" du Chapitre 4.",
                chapter: 4
            },
            {
                id: "q12",
                text: "Vos relevés bancaires sont-ils intégrés automatiquement ?",
                type: "yesno" as AnswerType,
                feedbackYes: "L'automatisation bancaire est une vraie avancée vers le temps réel.",
                feedbackNo: "Automatisez ce flux pour éviter les erreurs manuelles. Voir la section \"Connexion bancaire\" du Chapitre 4.",
                chapter: 4
            },
            {
                id: "q13",
                text: "Avez-vous une checklist mensuelle pour le suivi comptable ?",
                type: "yesno" as AnswerType,
                feedbackYes: "Vous maîtrisez le rythme de gestion, ce qui sécurise votre comptabilité.",
                feedbackNo: "Adoptez une checklist simple. Vous pouvez utiliser notre modèle dans le Chapitre 4.",
                chapter: 4
            },
        ]
    },
    {
        id: "bloc4",
        title: "Outils & automatisation",
        icon: "⚙️",
        description: "Chapitre 5",
        questions: [
            {
                id: "q14",
                text: "Vos outils sont-ils pensés pour vous, ou pour le comptable ?",
                type: "yesnodk" as AnswerType,
                feedbackYes: "Parfait : vos outils doivent d'abord vous servir.",
                feedbackNo: "Cela vous fait perdre en efficacité. Voyez pourquoi cela pose problème dans le Chapitre 5.",
                feedbackDk: "Le Chapitre 5 vous explique comment reconnaître un outil pensé pour l'entreprise.",
                chapter: 5
            },
            {
                id: "q15",
                text: "Avez-vous centralisé vos flux dans un seul outil ou ERP ?",
                type: "yespartiallyno" as AnswerType,
                feedbackYes: "Très bon point. Cela réduit les erreurs et maximise l'automatisation.",
                feedbackPartial: "Vous êtes sur la bonne voie, mais vous pouvez encore simplifier.",
                feedbackNo: "Vous multipliez probablement les tâches inutiles. Le Chapitre 5 vous guide pour centraliser.",
                chapter: 5
            },
            {
                id: "q16",
                text: "Avez-vous automatisé certains flux ?",
                type: "yesno" as AnswerType,
                feedbackYes: "Bravo ! Continuez à identifier d'autres tâches automatisables.",
                feedbackNo: "Vous perdez un temps précieux. Commencez par automatiser la facturation ou les relevés bancaires.",
                chapter: 5
            },
            {
                id: "q17",
                text: "Avez-vous une vision en temps réel de votre activité ?",
                type: "yesno" as AnswerType,
                feedbackYes: "C'est un vrai levier de pilotage. Vous êtes dans une logique avancée.",
                feedbackNo: "Sans vision temps réel, vous risquez de mauvaises décisions. Odoo peut vous y aider (Chapitre 5).",
                chapter: 5
            },
        ]
    }
];

export default function Quiz({ onComplete, onBack, userName }: QuizProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isAdvancingRef = useRef(false);
    const [currentBlock, setCurrentBlock] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const block = QUIZ_BLOCKS[currentBlock];
    const question = block?.questions[currentQuestion];
    const totalQuestions = QUIZ_BLOCKS.reduce((acc, b) => acc + b.questions.length, 0);
    const answeredCount = Object.keys(answers).length;
    const progress = Math.round((answeredCount / totalQuestions) * 100);
    const currentQuestionNumber =
        QUIZ_BLOCKS.slice(0, currentBlock).reduce((acc, b) => acc + b.questions.length, 0) + currentQuestion + 1;

    useGSAP(() => {
        if (question && !showFeedback) {
            gsap.fromTo(".quiz-question", { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
        }
    }, { scope: containerRef, dependencies: [currentBlock, currentQuestion, showFeedback] });

    const handleAnswer = (value: number) => {
        if (!question) return;

        setSelectedAnswer(value);
        setAnswers(prev => ({ ...prev, [question.id]: value }));
        setShowFeedback(true);
    };

    const handleNext = () => {
        if (selectedAnswer === null || !question) return;
        if (isAdvancingRef.current) return;
        isAdvancingRef.current = true;

        // Include current answer in the final answers object
        const updatedAnswers = { ...answers, [question.id]: selectedAnswer };
        const hasAnsweredAllQuestions = Object.keys(updatedAnswers).length >= totalQuestions;
        const isOnLastQuestion =
            currentBlock === QUIZ_BLOCKS.length - 1 &&
            currentQuestion === block.questions.length - 1;

        setShowFeedback(false);
        setSelectedAnswer(null);

        if (currentQuestion < block.questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else if (currentBlock < QUIZ_BLOCKS.length - 1) {
            setCurrentBlock(prev => prev + 1);
            setCurrentQuestion(0);
        } else if (isOnLastQuestion && hasAnsweredAllQuestions) {
            onComplete(updatedAnswers);
        }

        // Unlock on next tick to prevent accidental double-click skips.
        setTimeout(() => {
            isAdvancingRef.current = false;
        }, 0);
    };

    const getOptions = (type: AnswerType) => {
        if (type === "yesno") return [
            { label: "Oui ✓", value: 1 },
            { label: "Non ✗", value: 0 }
        ];
        if (type === "yespartiallyno") return [
            { label: "Oui ✓", value: 1 },
            { label: "Partiellement", value: 0.5 },
            { label: "Non ✗", value: 0 }
        ];
        return [
            { label: "Pour moi ✓", value: 1 },
            { label: "Plutôt pour le comptable ✗", value: 0 },
            { label: "Je ne sais pas", value: 0 }
        ];
    };

    // Get feedback based on answer
    const getFeedback = () => {
        if (selectedAnswer === null || !question) return null;

        if (selectedAnswer === 1) return { text: question.feedbackYes, type: "success" };
        if (selectedAnswer === 0.5 && question.feedbackPartial) return { text: question.feedbackPartial, type: "partial" };
        if (selectedAnswer === 0 && question.type === "yesnodk" && question.feedbackDk) return { text: question.feedbackDk, type: "info" };
        return { text: question.feedbackNo, type: "warning" };
    };

    // Safety check
    if (!block || !question) {
        return (
            <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Chargement du quiz...</p>
            </div>
        );
    }

    const feedback = getFeedback();
    const isLastQuestion = currentBlock === QUIZ_BLOCKS.length - 1 && currentQuestion === block.questions.length - 1;

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-gray-50 pt-20">
            {/* Header */}
            <div className="sticky top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-3xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            Retour
                        </button>
                        <span className="text-sm font-bold text-primary">{answeredCount}/{totalQuestions}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </div>

            {/* Block info */}
            <div className="bg-gradient-to-r from-primary to-primary/90 py-6 px-6">
                <div className="max-w-3xl mx-auto flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">{block.icon}</div>
                    <div>
                        <span className="text-white/60 text-sm">{block.description}</span>
                        <h2 className="text-lg font-bold text-white">{block.title}</h2>
                    </div>
                </div>
            </div>

            {/* Question */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="quiz-question bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="text-center mb-8">
                        <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">Question {currentQuestionNumber}</span>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{question.text}</h3>
                    </div>

                    {/* Options - always visible */}
                    <div className="space-y-3">
                        {getOptions(question.type).map((opt) => (
                            <button
                                key={opt.label}
                                onClick={() => handleAnswer(opt.value)}
                                className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all hover:border-primary hover:bg-primary/5 ${selectedAnswer === opt.value ? "border-primary bg-primary/10" : "border-gray-200"}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    {/* Feedback - shown after selection */}
                    {showFeedback && feedback && (
                        <div className="mt-6 space-y-6">
                            {/* Feedback box */}
                            <div className={`p-5 rounded-xl border ${feedback.type === "success" ? "bg-green-50 border-green-200" :
                                    feedback.type === "partial" ? "bg-amber-50 border-amber-200" :
                                        feedback.type === "info" ? "bg-blue-50 border-blue-200" :
                                            "bg-red-50 border-red-200"
                                }`}>
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl shrink-0">
                                        {feedback.type === "success" ? "✅" :
                                            feedback.type === "partial" ? "🟡" :
                                                feedback.type === "info" ? "💡" : "❌"}
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 mb-1">
                                            {feedback.type === "success" ? "Ce que cela signifie :" :
                                                feedback.type === "partial" ? "Point intermédiaire :" :
                                                    feedback.type === "info" ? "Pour information :" :
                                                        "Point d'attention :"}
                                        </p>
                                        <p className="text-gray-600">{feedback.text}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Next button */}
                            <button
                                onClick={handleNext}
                                className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-primary hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                            >
                                {isLastQuestion ? "Voir mes résultats" : "Question suivante"}
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {QUIZ_BLOCKS.map((b, bi) => (
                        <div key={b.id} className="flex gap-1">
                            {b.questions.map((q, qi) => {
                                const isAnswered = answers[q.id] !== undefined;
                                const isCurrent = bi === currentBlock && qi === currentQuestion;
                                return (
                                    <div
                                        key={q.id}
                                        className={`w-2 h-2 rounded-full transition-all ${isCurrent ? "w-4 bg-primary" : isAnswered ? "bg-green-500" : "bg-gray-200"}`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* UX Message */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-400 italic max-w-md mx-auto">
                        « Ce diagnostic révèle votre niveau de maîtrise comptable — pas un jugement, mais un point de départ. »
                    </p>
                </div>
            </div>
        </div>
    );
}

export { QUIZ_BLOCKS };
export type { Question };
