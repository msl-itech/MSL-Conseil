"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface GuideQuizProps {
    userName: string;
    onComplete: (answers: Record<number, number>, totalScore: number) => void;
    onBack: () => void;
}

interface Question {
    id: number;
    question: string;
    options: {
        text: string;
        points: number;
        feedback: string;
    }[];
}

export const QUESTIONS: Question[] = [
    // BLOC 1 — VISION & PILOTAGE DU DIRIGEANT
    {
        id: 1,
        question: "Avez-vous des objectifs clairs pour les 12 prochains mois ?",
        options: [
            {
                text: "Non",
                points: 0,
                feedback: "Sans objectifs clairs, il est difficile de savoir si l'entreprise progresse ou non. Le pilotage devient instinctif."
            },
            {
                text: "Partiellement",
                points: 2,
                feedback: "Vos objectifs existent, mais manquent peut-être de précision ou de formalisation. Cela peut compliquer le suivi."
            },
            {
                text: "Oui, ils sont formalisés",
                points: 5,
                feedback: "Vous avez une direction claire. C'est une base essentielle pour piloter et prioriser vos décisions."
            }
        ]
    },
    {
        id: 2,
        question: "Savez-vous précisément ce qui fait gagner ou perdre de l'argent ?",
        options: [
            {
                text: "Non",
                points: 0,
                feedback: "Sans cette visibilité, certaines décisions peuvent nuire à la rentabilité sans que vous vous en rendiez compte."
            },
            {
                text: "Partiellement",
                points: 2,
                feedback: "Vous avez une intuition, mais certains éléments clés restent flous."
            },
            {
                text: "Oui, clairement",
                points: 5,
                feedback: "Vous connaissez vos leviers de rentabilité, ce qui vous permet d'arbitrer plus sereinement."
            }
        ]
    },
    {
        id: 3,
        question: "Prenez-vous vos décisions sur base de faits chiffrés ?",
        options: [
            {
                text: "Rarement",
                points: 0,
                feedback: "Décider sans données fiables expose l'entreprise à des erreurs coûteuses à moyen terme."
            },
            {
                text: "Parfois",
                points: 2,
                feedback: "Vous combinez chiffres et ressenti, ce qui est courant mais peut créer des angles morts."
            },
            {
                text: "Oui, systématiquement",
                points: 5,
                feedback: "Vos décisions reposent sur des éléments concrets, ce qui réduit fortement les risques."
            }
        ]
    },
    {
        id: 4,
        question: "Pouvez-vous expliquer simplement la performance de votre entreprise ?",
        options: [
            {
                text: "Difficilement",
                points: 0,
                feedback: "Si c'est difficile à expliquer, c'est souvent le signe d'un pilotage trop flou."
            },
            {
                text: "Partiellement",
                points: 2,
                feedback: "Vous comprenez la situation, mais elle n'est pas encore suffisamment structurée."
            },
            {
                text: "Oui, clairement",
                points: 5,
                feedback: "Vous avez une vision claire et synthétique de votre activité."
            }
        ]
    },
    // BLOC 2 — SUIVI DE LA PERFORMANCE
    {
        id: 5,
        question: "Suivez-vous CA ET rentabilité ?",
        options: [
            {
                text: "Uniquement le CA",
                points: 0,
                feedback: "Suivre uniquement le CA peut masquer des pertes ou des marges insuffisantes."
            },
            {
                text: "Partiellement",
                points: 2,
                feedback: "Le chiffre d'affaires est suivi, mais la rentabilité reste secondaire."
            },
            {
                text: "Oui, les deux",
                points: 5,
                feedback: "Vous ne regardez pas uniquement le volume, mais aussi la qualité des résultats."
            }
        ]
    },
    {
        id: 6,
        question: "Identifiez-vous rapidement un mois \"anormal\" ?",
        options: [
            {
                text: "Non",
                points: 0,
                feedback: "Les anomalies risquent d'être découvertes trop tard pour agir efficacement."
            },
            {
                text: "Avec retard",
                points: 2,
                feedback: "Vous détectez les problèmes, mais souvent avec retard."
            },
            {
                text: "Oui, rapidement",
                points: 5,
                feedback: "Vous êtes capable de réagir vite en cas de dérive ou d'opportunité."
            }
        ]
    },
    {
        id: 7,
        question: "Comparez-vous le réel à des objectifs ?",
        options: [
            {
                text: "Non",
                points: 0,
                feedback: "Sans référence, il est difficile de savoir si la performance est bonne ou non."
            },
            {
                text: "Parfois",
                points: 2,
                feedback: "La comparaison existe, mais n'est pas systématique."
            },
            {
                text: "Oui, régulièrement",
                points: 5,
                feedback: "Vous êtes dans une logique de pilotage actif."
            }
        ]
    },
    {
        id: 8,
        question: "Analysez-vous les écarts constatés ?",
        options: [
            {
                text: "Non",
                points: 0,
                feedback: "Sans analyse, les mêmes erreurs risquent de se reproduire."
            },
            {
                text: "Parfois",
                points: 2,
                feedback: "Certains écarts sont analysés, mais pas de manière structurée."
            },
            {
                text: "Oui, systématiquement",
                points: 5,
                feedback: "Vous cherchez à comprendre, pas seulement à constater."
            }
        ]
    },
    // BLOC 3 — ORGANISATION & RESPONSABILITÉS
    {
        id: 9,
        question: "Les rôles sont-ils clairs dans le suivi de gestion ?",
        options: [
            {
                text: "Non, tout passe par moi",
                points: 0,
                feedback: "Sans responsabilités claires, le suivi dépend trop du dirigeant."
            },
            {
                text: "Partiellement définis",
                points: 2,
                feedback: "Certains rôles sont clairs, d'autres moins."
            },
            {
                text: "Oui, chacun sait quoi faire",
                points: 5,
                feedback: "La responsabilité est bien définie, ce qui fluidifie la gestion."
            }
        ]
    },
    {
        id: 10,
        question: "Les chiffres sont-ils produits à temps pour décider ?",
        options: [
            {
                text: "Non, souvent trop tard",
                points: 0,
                feedback: "Des chiffres tardifs perdent une grande partie de leur valeur."
            },
            {
                text: "Parfois en retard",
                points: 2,
                feedback: "Les chiffres arrivent parfois trop tard pour agir."
            },
            {
                text: "Oui, toujours à temps",
                points: 5,
                feedback: "Vous disposez d'informations utiles au bon moment."
            }
        ]
    },
    {
        id: 11,
        question: "L'information circule-t-elle bien entre les équipes ?",
        options: [
            {
                text: "Non, silos importants",
                points: 0,
                feedback: "Une mauvaise circulation de l'information freine le pilotage."
            },
            {
                text: "Partiellement",
                points: 2,
                feedback: "Certaines informations circulent, d'autres restent bloquées."
            },
            {
                text: "Oui, fluide",
                points: 5,
                feedback: "Les échanges sont fluides et favorisent la prise de décision."
            }
        ]
    },
    {
        id: 12,
        question: "Avez-vous un rythme de suivi clair (hebdo, mensuel...) ?",
        options: [
            {
                text: "Non, irrégulier",
                points: 0,
                feedback: "Sans rythme, le pilotage devient irrégulier et réactif."
            },
            {
                text: "Approximatif",
                points: 2,
                feedback: "Le suivi existe, mais manque de discipline."
            },
            {
                text: "Oui, défini et respecté",
                points: 5,
                feedback: "La régularité renforce la maîtrise de la gestion."
            }
        ]
    },
    // BLOC 4 — OUTILS & FIABILITÉ
    {
        id: 13,
        question: "Les données financières sont-elles fiables ?",
        options: [
            {
                text: "Non, des doutes existent",
                points: 0,
                feedback: "Des données peu fiables rendent toute analyse risquée."
            },
            {
                text: "Partiellement",
                points: 2,
                feedback: "Certaines données sont fiables, d'autres méritent d'être sécurisées."
            },
            {
                text: "Oui, totalement",
                points: 5,
                feedback: "Vous pouvez vous appuyer sur vos chiffres en toute confiance."
            }
        ]
    },
    {
        id: 14,
        question: "Les données sont-elles centralisées ?",
        options: [
            {
                text: "Non, dispersées",
                points: 0,
                feedback: "La dispersion des données fait perdre du temps et de la fiabilité."
            },
            {
                text: "Partiellement",
                points: 2,
                feedback: "Certains outils communiquent, d'autres non."
            },
            {
                text: "Oui, dans un seul outil",
                points: 5,
                feedback: "La centralisation facilite l'analyse et réduit les erreurs."
            }
        ]
    },
    {
        id: 15,
        question: "Passez-vous plus de temps à analyser qu'à collecter les données ?",
        options: [
            {
                text: "Non, la collecte prend tout",
                points: 0,
                feedback: "Un pilotage efficace nécessite de réduire la collecte manuelle."
            },
            {
                text: "C'est équilibré",
                points: 2,
                feedback: "La collecte prend encore trop de temps."
            },
            {
                text: "Oui, je me concentre sur l'analyse",
                points: 5,
                feedback: "Votre organisation est orientée valeur ajoutée."
            }
        ]
    },
    {
        id: 16,
        question: "Vos outils vous aident-ils réellement à piloter ?",
        options: [
            {
                text: "Non, ils sont inadaptés",
                points: 0,
                feedback: "Des outils inadaptés freinent la prise de décision."
            },
            {
                text: "Partiellement",
                points: 2,
                feedback: "Ils aident, mais montrent leurs limites."
            },
            {
                text: "Oui, parfaitement adaptés",
                points: 5,
                feedback: "Vos outils sont alignés avec vos besoins de dirigeant."
            }
        ]
    },
    // BLOC 5 — RÉACTION & AMÉLIORATION CONTINUE
    {
        id: 17,
        question: "Réagissez-vous rapidement aux problèmes identifiés ?",
        options: [
            {
                text: "Non, lentement",
                points: 0,
                feedback: "Un manque de réactivité accentue les difficultés."
            },
            {
                text: "Parfois",
                points: 2,
                feedback: "Les réactions existent, mais parfois tardives."
            },
            {
                text: "Oui, rapidement",
                points: 5,
                feedback: "Votre entreprise est agile et réactive."
            }
        ]
    },
    {
        id: 18,
        question: "Mettez-vous en place des actions correctives ?",
        options: [
            {
                text: "Rarement",
                points: 0,
                feedback: "Sans action corrective, l'analyse reste théorique."
            },
            {
                text: "Parfois, sans suivi",
                points: 2,
                feedback: "Certaines actions sont mises en place, pas toujours suivies."
            },
            {
                text: "Oui, avec suivi",
                points: 5,
                feedback: "Vous transformez l'analyse en action."
            }
        ]
    },
    {
        id: 19,
        question: "Suivez-vous l'impact des actions mises en place ?",
        options: [
            {
                text: "Non",
                points: 0,
                feedback: "Sans suivi, il est difficile de savoir ce qui fonctionne."
            },
            {
                text: "Occasionnellement",
                points: 2,
                feedback: "Le suivi existe, mais reste ponctuel."
            },
            {
                text: "Oui, systématiquement",
                points: 5,
                feedback: "Vous êtes dans une logique d'amélioration continue."
            }
        ]
    },
    {
        id: 20,
        question: "Avez-vous un regard externe pour vous challenger ?",
        options: [
            {
                text: "Non, je suis seul",
                points: 0,
                feedback: "Le dirigeant seul face à ses décisions manque souvent de recul."
            },
            {
                text: "De façon informelle",
                points: 2,
                feedback: "L'échange existe, mais reste informel."
            },
            {
                text: "Oui, régulièrement",
                points: 5,
                feedback: "Un regard extérieur renforce la qualité des décisions."
            }
        ]
    }
];

export default function GuideQuiz({ userName, onComplete, onBack }: GuideQuizProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const question = QUESTIONS[currentQuestion];
    const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
    const answeredCount = Object.keys(answers).length;

    useGSAP(() => {
        gsap.fromTo(".quiz-header",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
    }, { scope: containerRef });

    useEffect(() => {
        // Reset selected option and feedback when question changes
        const existingAnswer = answers[question.id];
        if (existingAnswer !== undefined) {
            const optionIndex = question.options.findIndex(o => o.points === existingAnswer);
            setSelectedOption(optionIndex);
            setShowFeedback(true);
        } else {
            setSelectedOption(null);
            setShowFeedback(false);
        }
    }, [currentQuestion, answers, question]);

    const animateQuestionChange = (direction: "next" | "prev", callback: () => void) => {
        setIsAnimating(true);
        const questionCard = document.querySelector(".question-card");

        gsap.to(questionCard, {
            x: direction === "next" ? -100 : 100,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                callback();
                gsap.fromTo(questionCard,
                    { x: direction === "next" ? 100 : -100, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out",
                        onComplete: () => setIsAnimating(false)
                    }
                );
            }
        });
    };

    const handleOptionSelect = (optionIndex: number) => {
        if (isAnimating) return;

        setSelectedOption(optionIndex);
        const points = question.options[optionIndex].points;
        setAnswers(prev => ({ ...prev, [question.id]: points }));
        setShowFeedback(true);
    };

    const handlePrevious = () => {
        if (currentQuestion > 0 && !isAnimating) {
            animateQuestionChange("prev", () => {
                setCurrentQuestion(prev => prev - 1);
            });
        }
    };

    const handleNext = () => {
        if (currentQuestion < QUESTIONS.length - 1 && selectedOption !== null && !isAnimating) {
            animateQuestionChange("next", () => {
                setCurrentQuestion(prev => prev + 1);
            });
        }
    };

    const handleSubmit = () => {
        if (selectedOption === null || isSubmitting) return;
        setIsSubmitting(true);

        try {
            // Include current answer in the final calculation
            const currentPoints = question.options[selectedOption].points;
            const updatedAnswers = { ...answers, [question.id]: currentPoints };
            const totalScore = Object.values(updatedAnswers).reduce((sum, points) => sum + points, 0);
            onComplete(updatedAnswers, totalScore);
        } catch {
            setIsSubmitting(false);
        }
    };

    const isLastQuestion = currentQuestion === QUESTIONS.length - 1;
    const allAnswered = answeredCount === QUESTIONS.length;

    // Get current feedback
    const currentFeedback = selectedOption !== null ? question.options[selectedOption]?.feedback : null;
    const currentPoints = selectedOption !== null ? question.options[selectedOption]?.points : null;

    // Determine feedback style based on points
    const getFeedbackStyle = (points: number | null) => {
        if (points === null) return {};
        if (points === 0) return { bg: "bg-red-50", border: "border-red-200", icon: "❌", iconColor: "text-red-500" };
        if (points === 2) return { bg: "bg-amber-50", border: "border-amber-200", icon: "⚠️", iconColor: "text-amber-500" };
        return { bg: "bg-green-50", border: "border-green-200", icon: "✅", iconColor: "text-green-500" };
    };

    const feedbackStyle = getFeedbackStyle(currentPoints);

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-gray-50">
            {/* Header */}
            <div className="quiz-header bg-gradient-to-br from-primary via-primary to-primary/90 pt-24 pb-12 px-6">
                <div className="max-w-3xl mx-auto">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Modifier mes informations
                    </button>

                    <div className="text-center">
                        <span className="inline-block bg-secondary/20 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                            Étape 3 sur 3
                        </span>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            C'est parti, {userName} ! 🎯
                        </h1>
                        <p className="text-white/70">
                            Répondez à 20 questions pour évaluer votre maturité en contrôle de gestion
                        </p>
                    </div>
                </div>
            </div>

            {/* Progress Section */}
            <div className="sticky top-20 z-40 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-3xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">
                            Question {currentQuestion + 1} sur {QUESTIONS.length}
                        </span>
                        <span className="text-sm text-gray-500">
                            {answeredCount} réponse{answeredCount > 1 ? "s" : ""}
                        </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Question Card */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="question-card bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Question Header */}
                    <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0">
                                {question.id}
                            </div>
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
                                {question.question}
                            </h2>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="p-8">
                        <div className="space-y-4">
                            {question.options.map((option, index) => {
                                const isSelected = selectedOption === index;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(index)}
                                        disabled={isAnimating}
                                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 group
                                            ${isSelected
                                                ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                                                : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                                            }
                                            ${isAnimating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Radio circle */}
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300
                                                ${isSelected
                                                    ? "border-primary bg-primary"
                                                    : "border-gray-300 group-hover:border-gray-400"
                                                }`}>
                                                {isSelected && (
                                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>

                                            {/* Option text */}
                                            <span className={`text-base transition-colors flex-1
                                                ${isSelected ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                                                {option.text}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Feedback Display */}
                        {showFeedback && currentFeedback && (
                            <div className={`mt-6 p-5 rounded-2xl border ${feedbackStyle.bg} ${feedbackStyle.border} animate-fade-in`}>
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">{feedbackStyle.icon}</span>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 mb-1">Ce que cela signifie :</p>
                                        <p className="text-gray-600">{currentFeedback}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestion === 0 || isAnimating}
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all
                                    ${currentQuestion === 0 || isAnimating
                                        ? "text-gray-300 cursor-not-allowed"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Précédent
                            </button>

                            {isLastQuestion ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={selectedOption === null || isAnimating || isSubmitting}
                                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all
                                        ${selectedOption !== null && !isAnimating && !isSubmitting
                                            ? "bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/25"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    Voir mes résultats
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    disabled={selectedOption === null || isAnimating}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                                        ${selectedOption !== null && !isAnimating
                                            ? "bg-primary text-white hover:bg-primary/90"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    Suivant
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Progress dots - after navigation */}
                        <div className="flex justify-center gap-2 mt-6 flex-wrap">
                            {QUESTIONS.map((q, i) => (
                                <button
                                    key={q.id}
                                    onClick={() => {
                                        if (!isAnimating) {
                                            animateQuestionChange(i > currentQuestion ? "next" : "prev", () => {
                                                setCurrentQuestion(i);
                                            });
                                        }
                                    }}
                                    className={`w-3 h-3 rounded-full transition-all duration-300
                                        ${i === currentQuestion
                                            ? "bg-primary scale-125"
                                            : answers[q.id] !== undefined
                                                ? "bg-secondary"
                                                : "bg-gray-200 hover:bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Progress indicator */}
                {answeredCount > 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-gray-500">
                            {answeredCount === QUESTIONS.length
                                ? "✓ Toutes les questions ont été répondues"
                                : `${QUESTIONS.length - answeredCount} question${QUESTIONS.length - answeredCount > 1 ? "s" : ""} restante${QUESTIONS.length - answeredCount > 1 ? "s" : ""}`
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
