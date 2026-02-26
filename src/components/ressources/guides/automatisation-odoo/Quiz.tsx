"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Odoo purple color
const ODOO_PURPLE = "#714b67";

interface QuizProps {
    onComplete: (answers: Record<string, number>, totalScore: number) => void;
    onBack: () => void;
    userName: string;
}

export interface Question {
    id: string;
    text: string;
    feedbackYes: string;
    feedbackNo: string;
    chapter: number;
}

export interface QuizSection {
    id: string;
    title: string;
    icon: string;
    description: string;
    chapterRef: string;
    maxScore: number;
    questions: Question[];
    // Section summary based on score ranges
    scoreSummary: {
        low: { range: string; title: string; message: string; priority: string };
        mid: { range: string; title: string; message: string; priority: string };
        high: { range: string; title: string; message: string; priority: string };
    };
}

// 30 questions réparties en 6 sections (basées sur les chapitres 6-11)
export const QUIZ_SECTIONS: QuizSection[] = [
    {
        id: "section1",
        title: "Automatisation avec Odoo",
        icon: "⚙️",
        description: "Chapitre 6",
        chapterRef: "Ch. 6",
        maxScore: 6,
        scoreSummary: {
            low: {
                range: "0–2",
                title: "Automatisation fragile",
                message: "Vos flux restent majoritairement manuels ou partiellement intégrés. Odoo est présent, mais n'est pas encore utilisé comme un véritable moteur d'automatisation.",
                priority: "Sécuriser les flux de base (facturation, banque, stock)."
            },
            mid: {
                range: "3–4",
                title: "Automatisation en cours",
                message: "Vous avez activé plusieurs leviers d'automatisation, mais l'ensemble manque encore de cohérence. Certaines tâches critiques restent manuelles.",
                priority: "Connecter les modules clés et fiabiliser les règles existantes."
            },
            high: {
                range: "5–6",
                title: "Automatisation maîtrisée",
                message: "Vos flux sont largement automatisés et cohérents. La comptabilité reflète rapidement la réalité opérationnelle.",
                priority: "Exploiter davantage la donnée pour décider."
            }
        },
        questions: [
            {
                id: "q1",
                text: "Utilises-tu Odoo pour la facturation client et fournisseur ?",
                feedbackYes: "Tes flux de vente et d'achat sont déjà connectés à la comptabilité. C'est la première brique indispensable pour automatiser correctement. Tu peux maintenant fiabiliser et accélérer le reste de la chaîne.",
                feedbackNo: "Cela signifie que ta comptabilité repose encore sur des outils séparés. Chaque facture devient une action manuelle supplémentaire, avec un risque d'erreur ou d'oubli. Tant que la facturation n'est pas centralisée, l'automatisation reste très limitée.",
                chapter: 6
            },
            {
                id: "q2",
                text: "Ton stock est-il géré dans Odoo ?",
                feedbackYes: "Les mouvements de stock sont reliés aux ventes et aux achats. La comptabilité reflète mieux la réalité économique. C'est un levier fort pour fiabiliser les marges et les résultats.",
                feedbackNo: "Le stock est probablement suivi sur Excel ou via un autre outil. Cela empêche toute valorisation automatique et fausse la lecture des marges. Sans stock intégré, la comptabilité reste partiellement déconnectée du réel.",
                chapter: 6
            },
            {
                id: "q3",
                text: "Tes ventes en boutique sont-elles connectées via le module POS ?",
                feedbackYes: "Les ventes remontent automatiquement dans la comptabilité et le stock. Les chiffres sont fiables dès la fin de journée. Le pilotage devient possible sans attendre la clôture mensuelle.",
                feedbackNo: "Les ventes sont probablement ressaisies ou importées manuellement. Cela crée un décalage entre l'activité réelle et les chiffres comptables. Le risque principal n'est pas l'erreur… mais la perte de visibilité en temps réel.",
                chapter: 6
            },
            {
                id: "q4",
                text: "Tes comptes bancaires sont-ils synchronisés avec Odoo ?",
                feedbackYes: "Les flux bancaires sont intégrés automatiquement. Le lettrage devient plus rapide, parfois automatique. La trésorerie devient un outil de pilotage, pas un sujet d'angoisse.",
                feedbackNo: "Les relevés sont probablement importés ou encodés manuellement. Le suivi de trésorerie est plus lent et plus stressant. Cela freine fortement l'automatisation du lettrage et des paiements.",
                chapter: 6
            },
            {
                id: "q5",
                text: "Les flux comptables sont-ils générés automatiquement ?",
                feedbackYes: "Les ventes, achats, paiements génèrent automatiquement leurs écritures. La comptabilité devient fluide et cohérente. Le temps gagné peut être réinvesti dans l'analyse et la décision.",
                feedbackNo: "Même si Odoo est utilisé, les écritures restent partiellement manuelles. L'outil est alors sous-exploité. L'automatisation n'est pas encore un vrai levier de productivité.",
                chapter: 6
            },
            {
                id: "q6",
                text: "Ton équipe connaît-elle le processus automatisé ?",
                feedbackYes: "Les utilisateurs comprennent ce que fait Odoo et pourquoi. Les processus sont respectés et mieux adoptés. L'automatisation devient durable et sécurisée.",
                feedbackNo: "Les automatisations existent peut-être… mais restent mal comprises. Cela crée des contournements, des erreurs ou de la méfiance. Une automatisation non comprise est une automatisation fragile.",
                chapter: 6
            }
        ]
    },
    {
        id: "section2",
        title: "Pilotage financier",
        icon: "📊",
        description: "Chapitre 7",
        chapterRef: "Ch. 7",
        maxScore: 5,
        scoreSummary: {
            low: {
                range: "0–2",
                title: "Pilotage intuitif",
                message: "Les décisions reposent encore beaucoup sur l'instinct. Les chiffres existent, mais ils ne guident pas réellement l'action.",
                priority: "Définir quelques KPI simples et utiles."
            },
            mid: {
                range: "3–4",
                title: "Pilotage partiellement structuré",
                message: "Vous suivez certains indicateurs, mais leur usage reste irrégulier. Le tableau de bord n'est pas encore un réflexe de décision.",
                priority: "Formaliser un tableau de bord partagé."
            },
            high: {
                range: "5",
                title: "Pilotage opérationnel",
                message: "Les indicateurs sont clairs, accessibles et utilisés. Les décisions sont prises sur base de données fiables. La finance joue pleinement son rôle stratégique.",
                priority: "Affiner et anticiper."
            }
        },
        questions: [
            {
                id: "q7",
                text: "As-tu une visibilité claire sur ta marge par activité ?",
                feedbackYes: "Tu sais ce qui rapporte réellement. Les décisions deviennent plus rationnelles.",
                feedbackNo: "Tu pilotes probablement au chiffre d'affaires. Certaines activités peuvent croître… en détruisant de la rentabilité.",
                chapter: 7
            },
            {
                id: "q8",
                text: "Sais-tu quand un problème de trésorerie pourrait survenir ?",
                feedbackYes: "Tu anticipes les tensions. Tu choisis plutôt que de subir.",
                feedbackNo: "La trésorerie est subie. Les décisions sont prises sous pression.",
                chapter: 7
            },
            {
                id: "q9",
                text: "Peux-tu connaître tes résultats en moins de 5 minutes ?",
                feedbackYes: "La donnée est disponible et exploitable. Le pilotage devient fluide.",
                feedbackNo: "L'information existe peut-être, mais elle n'est pas accessible. Les décisions sont retardées.",
                chapter: 7
            },
            {
                id: "q10",
                text: "Ton tableau de bord est-il lisible et partagé ?",
                feedbackYes: "Les indicateurs sont compris. La décision devient partagée.",
                feedbackNo: "Les chiffres restent isolés ou peu compris. La finance ne joue pas son rôle collectif.",
                chapter: 7
            },
            {
                id: "q11",
                text: "Tes indicateurs t'aident-ils à décider concrètement ?",
                feedbackYes: "Les indicateurs guident réellement l'action.",
                feedbackNo: "Les chiffres servent surtout à constater. Le pilotage reste intuitif.",
                chapter: 7
            }
        ]
    },
    {
        id: "section3",
        title: "Comptabilité analytique",
        icon: "📈",
        description: "Chapitre 8",
        chapterRef: "Ch. 8",
        maxScore: 5,
        scoreSummary: {
            low: {
                range: "0–2",
                title: "Analytique absente ou inutilisable",
                message: "Vous connaissez votre résultat global, mais pas ses causes. Les décisions sont prises sans visibilité fine sur la rentabilité réelle.",
                priority: "Mettre en place 1 ou 2 axes simples."
            },
            mid: {
                range: "3–4",
                title: "Analytique en construction",
                message: "Les bases sont posées, mais l'outil n'est pas encore pleinement exploité. L'analytique existe, mais influence peu les décisions.",
                priority: "Lier analytique, budget et décisions."
            },
            high: {
                range: "5",
                title: "Analytique opérationnelle",
                message: "Vous maîtrisez la rentabilité par projet, client ou activité. L'analytique guide réellement vos choix. Votre pilotage est précis et orienté valeur.",
                priority: "Renforcer l'anticipation."
            }
        },
        questions: [
            {
                id: "q12",
                text: "Suis-tu la rentabilité par projet ou client ?",
                feedbackYes: "Tu sais où la valeur se crée.",
                feedbackNo: "Tu connais le résultat global, pas les leviers réels. Certaines pertes restent invisibles.",
                chapter: 8
            },
            {
                id: "q13",
                text: "As-tu défini 1 à 3 axes analytiques maximum ?",
                feedbackYes: "L'analytique reste simple et efficace.",
                feedbackNo: "L'analytique est absente ou trop complexe. Elle devient inutilisable.",
                chapter: 8
            },
            {
                id: "q14",
                text: "Ton équipe sait-elle affecter une opération à un axe ?",
                feedbackYes: "L'analytique est intégrée au quotidien.",
                feedbackNo: "L'analytique dépend d'une personne clé. Le système est fragile.",
                chapter: 8
            },
            {
                id: "q15",
                text: "Compares-tu les résultats aux budgets prévus ?",
                feedbackYes: "Les écarts sont visibles et exploitables.",
                feedbackNo: "Le budget existe peut-être, mais ne pilote pas.",
                chapter: 8
            },
            {
                id: "q16",
                text: "Utilises-tu les rapports analytiques pour décider ?",
                feedbackYes: "Elle devient un vrai outil de gestion.",
                feedbackNo: "L'analytique reste théorique.",
                chapter: 8
            }
        ]
    },
    {
        id: "section4",
        title: "Production comptable",
        icon: "📅",
        description: "Chapitre 9",
        chapterRef: "Ch. 9",
        maxScore: 5,
        scoreSummary: {
            low: {
                range: "0–2",
                title: "Organisation fragile",
                message: "Les tâches ne sont pas clairement réparties. Les clôtures sont sources de stress et d'erreurs. La fiabilité dépend trop des personnes.",
                priority: "Clarifier les rôles et instaurer des routines."
            },
            mid: {
                range: "3–4",
                title: "Organisation fonctionnelle",
                message: "Les tâches sont globalement maîtrisées, mais pas toujours formalisées. La production fonctionne, mais reste perfectible.",
                priority: "Formaliser checklists et alertes."
            },
            high: {
                range: "5",
                title: "Production maîtrisée",
                message: "La comptabilité est produite régulièrement, sans surcharge. Les chiffres sont fiables et disponibles rapidement. La production soutient le pilotage.",
                priority: "Automatiser les derniers points manuels."
            }
        },
        questions: [
            {
                id: "q17",
                text: "Chaque tâche comptable clé a-t-elle un responsable ?",
                feedbackYes: "L'organisation est claire et sécurisée.",
                feedbackNo: "Des zones grises existent. Les oublis sont fréquents.",
                chapter: 9
            },
            {
                id: "q18",
                text: "As-tu un planning hebdomadaire comptable ?",
                feedbackYes: "La charge est lissée.",
                feedbackNo: "Les tâches s'accumulent. La clôture devient stressante.",
                chapter: 9
            },
            {
                id: "q19",
                text: "Réalises-tu une clôture mensuelle avec checklist ?",
                feedbackYes: "Les chiffres sont fiables plus tôt.",
                feedbackNo: "Les erreurs sont détectées tardivement.",
                chapter: 9
            },
            {
                id: "q20",
                text: "Les ventes, achats et banques sont-ils traités automatiquement ?",
                feedbackYes: "La production devient fluide.",
                feedbackNo: "Trop de ressaisies subsistent.",
                chapter: 9
            },
            {
                id: "q21",
                text: "Es-tu alerté rapidement en cas d'anomalie ?",
                feedbackYes: "Le contrôle devient proactif.",
                feedbackNo: "Les problèmes sont découverts trop tard.",
                chapter: 9
            }
        ]
    },
    {
        id: "section5",
        title: "Collaboration avec le cabinet",
        icon: "🤝",
        description: "Chapitre 10",
        chapterRef: "Ch. 10",
        maxScore: 4,
        scoreSummary: {
            low: {
                range: "0–1",
                title: "Collaboration inefficace",
                message: "Les échanges sont chronophages et parfois conflictuels. Chacun travaille dans son coin. La collaboration coûte plus qu'elle ne rapporte.",
                priority: "Clarifier les rôles et formats."
            },
            mid: {
                range: "2–3",
                title: "Collaboration fonctionnelle",
                message: "Les échanges existent, mais pourraient être plus fluides. Certaines attentes restent implicites.",
                priority: "Formaliser les échanges et routines."
            },
            high: {
                range: "4",
                title: "Collaboration fluide",
                message: "Les échanges sont clairs, réguliers et efficaces. Le cabinet devient un partenaire, pas un simple prestataire. La collaboration renforce la qualité de gestion.",
                priority: "Aller vers plus de pilotage commun."
            }
        },
        questions: [
            {
                id: "q22",
                text: "Ton cabinet connaît-il ton outil (Odoo) ?",
                feedbackYes: "La collaboration est fluide.",
                feedbackNo: "Les échanges sont plus lourds.",
                chapter: 10
            },
            {
                id: "q23",
                text: "As-tu une liste claire de ce que tu dois transmettre ?",
                feedbackYes: "Les transmissions sont efficaces.",
                feedbackNo: "Chaque échange est source de friction.",
                chapter: 10
            },
            {
                id: "q24",
                text: "Utilises-tu un espace de partage structuré ?",
                feedbackYes: "Les échanges sont sécurisés.",
                feedbackNo: "Les documents se perdent.",
                chapter: 10
            },
            {
                id: "q25",
                text: "Avez-vous un point fixe régulier ?",
                feedbackYes: "La relation devient préventive.",
                feedbackNo: "Les problèmes s'accumulent avant d'être traités.",
                chapter: 10
            }
        ]
    },
    {
        id: "section6",
        title: "Évolution de l'architecture",
        icon: "🚀",
        description: "Chapitre 11",
        chapterRef: "Ch. 11",
        maxScore: 5,
        scoreSummary: {
            low: {
                range: "0–2",
                title: "Architecture rigide",
                message: "Le système actuel risque de freiner la croissance. Les évolutions sont subies. Chaque changement devient un problème.",
                priority: "Anticiper et modulariser."
            },
            mid: {
                range: "3–4",
                title: "Architecture adaptable",
                message: "L'outil peut évoluer, mais sans vision claire à moyen terme. Les ajustements sont réactifs. L'architecture suit, mais ne précède pas la croissance.",
                priority: "Planifier les évolutions."
            },
            high: {
                range: "5",
                title: "Architecture évolutive",
                message: "Votre système accompagne naturellement la croissance. Les changements sont anticipés et maîtrisés. La comptabilité devient un accélérateur.",
                priority: "Optimiser en continu."
            }
        },
        questions: [
            {
                id: "q26",
                text: "Ton plan comptable reflète-t-il l'évolution de l'activité ?",
                feedbackYes: "La comptabilité reste lisible.",
                feedbackNo: "La lecture des résultats devient floue.",
                chapter: 11
            },
            {
                id: "q27",
                text: "Ton outil est-il modulaire (ex : Odoo) ?",
                feedbackYes: "La croissance est accompagnée.",
                feedbackNo: "Chaque évolution devient coûteuse.",
                chapter: 11
            },
            {
                id: "q28",
                text: "As-tu anticipé les changements fiscaux ou juridiques ?",
                feedbackYes: "Les transitions sont maîtrisées.",
                feedbackNo: "Les ajustements sont subis.",
                chapter: 11
            },
            {
                id: "q29",
                text: "Suis-tu la rentabilité par pôle ou produit ?",
                feedbackYes: "Les arbitrages sont précis.",
                feedbackNo: "Les décisions sont globales et approximatives.",
                chapter: 11
            },
            {
                id: "q30",
                text: "As-tu un interlocuteur pour t'accompagner ?",
                feedbackYes: "Le pilotage est sécurisé.",
                feedbackNo: "Les décisions complexes reposent uniquement sur toi.",
                chapter: 11
            }
        ]
    }
];


export default function Quiz({ onComplete, onBack, userName }: QuizProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isAdvancingRef = useRef(false);
    const [currentSection, setCurrentSection] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const section = QUIZ_SECTIONS[currentSection];
    const question = section?.questions?.[currentQuestion];
    const totalQuestions = QUIZ_SECTIONS.reduce((acc, s) => acc + s.questions.length, 0);
    const answeredCount = Object.keys(answers).length;
    const progress = Math.round((answeredCount / totalQuestions) * 100);
    const currentQuestionNumber =
        QUIZ_SECTIONS.slice(0, currentSection).reduce((acc, s) => acc + s.questions.length, 0) + currentQuestion + 1;

    // Calculate current section score
    const getSectionScore = (sectionId: string) => {
        const sec = QUIZ_SECTIONS.find(s => s.id === sectionId);
        if (!sec) return 0;
        return sec.questions.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
    };

    useGSAP(() => {
        if (question && !showFeedback) {
            gsap.fromTo(".quiz-question", { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
        }
    }, { scope: containerRef, dependencies: [currentSection, currentQuestion, showFeedback] });

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
            currentSection === QUIZ_SECTIONS.length - 1 &&
            currentQuestion === section.questions.length - 1;

        setShowFeedback(false);
        setSelectedAnswer(null);

        if (currentQuestion < section.questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else if (currentSection < QUIZ_SECTIONS.length - 1) {
            setCurrentSection(prev => prev + 1);
            setCurrentQuestion(0);
        } else if (isOnLastQuestion && hasAnsweredAllQuestions) {
            // Calculate total score with ALL answers including current one
            const totalScore = Object.values(updatedAnswers).reduce((acc, val) => acc + val, 0);
            onComplete(updatedAnswers, totalScore);
        }

        // Prevent accidental double-click that can skip state transitions.
        setTimeout(() => {
            isAdvancingRef.current = false;
        }, 0);
    };

    // Safety check
    if (!section || !question) {
        return (
            <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Chargement du quiz...</p>
                    <button onClick={onBack} className="mt-4 text-purple-600 hover:underline">
                        Retour
                    </button>
                </div>
            </div>
        );
    }

    // Get current feedback based on answer
    const currentFeedback = selectedAnswer === 1 ? question.feedbackYes : question.feedbackNo;
    const isLastQuestion = currentSection === QUIZ_SECTIONS.length - 1 && currentQuestion === section.questions.length - 1;

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-gray-50 pt-20">
            {/* Header */}
            <div className="sticky top-20 z-40 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-3xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Retour
                        </button>
                        <span className="text-sm font-bold" style={{ color: ODOO_PURPLE }}>{answeredCount}/{totalQuestions}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full transition-all duration-500 rounded-full" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${ODOO_PURPLE} 0%, #8e6180 100%)` }} />
                    </div>
                </div>
            </div>

            {/* Section info */}
            <div className="py-6 px-6" style={{ background: `linear-gradient(135deg, ${ODOO_PURPLE} 0%, #8e6180 100%)` }}>
                <div className="max-w-3xl mx-auto flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">{section.icon}</div>
                    <div>
                        <span className="text-white/60 text-sm">{section.description}</span>
                        <h2 className="text-lg font-bold text-white">{section.title}</h2>
                    </div>
                </div>
            </div>

            {/* Question */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="quiz-question bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="text-center mb-8">
                        <span className="inline-block text-white text-sm font-medium px-3 py-1 rounded-full mb-4" style={{ backgroundColor: ODOO_PURPLE }}>
                            Question {currentQuestionNumber}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{question.text}</h3>
                    </div>

                    {/* Options - always visible */}
                    <div className="space-y-3">
                        {[
                            { label: "Oui ✓", value: 1 },
                            { label: "Non ✗", value: 0 }
                        ].map((opt) => (
                            <button
                                key={opt.label}
                                onClick={() => handleAnswer(opt.value)}
                                className={`w-full p-5 rounded-xl border-2 text-left font-medium transition-all hover:border-purple-500 hover:bg-purple-50 ${selectedAnswer === opt.value ? "border-purple-500 bg-purple-100" : "border-gray-200"}`}
                            >
                                <span className="text-lg">{opt.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Feedback - shown after selection */}
                    {showFeedback && selectedAnswer !== null && (
                        <div className="mt-6 space-y-6">
                            {/* Feedback */}
                            <div className={`p-5 rounded-xl border ${selectedAnswer === 1 ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl shrink-0">{selectedAnswer === 1 ? '✅' : '❌'}</span>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 mb-1">
                                            {selectedAnswer === 1 ? 'Ce que cela signifie :' : 'Point d\'attention :'}
                                        </p>
                                        <p className="text-gray-600">{currentFeedback}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Next button */}
                            <button
                                onClick={handleNext}
                                className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2"
                                style={{ backgroundColor: ODOO_PURPLE }}
                            >
                                {isLastQuestion ? 'Voir mes résultats' : 'Question suivante'}
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 mt-8 flex-wrap">
                    {QUIZ_SECTIONS.map((s, si) => (
                        <div key={s.id} className="flex gap-1">
                            {s.questions.map((q, qi) => {
                                const isAnswered = answers[q.id] !== undefined;
                                const isCurrent = si === currentSection && qi === currentQuestion;
                                return (
                                    <div
                                        key={q.id}
                                        className={`w-2 h-2 rounded-full transition-all ${isCurrent ? "w-4" : ""}`}
                                        style={{ backgroundColor: isCurrent ? ODOO_PURPLE : isAnswered ? "#10b981" : "#e5e7eb" }}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Section indicators */}
                <div className="flex justify-center gap-4 mt-6 text-xs text-gray-500">
                    {QUIZ_SECTIONS.map((s, i) => (
                        <span key={s.id} className={`flex items-center gap-1 ${i === currentSection ? "font-bold" : ""}`} style={{ color: i === currentSection ? ODOO_PURPLE : undefined }}>
                            {s.icon} {s.chapterRef}
                        </span>
                    ))}
                </div>

                {/* UX Message */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-400 italic max-w-md mx-auto">
                        « Ce diagnostic ne mesure pas votre niveau technique. Il révèle le degré de maîtrise entre vos outils, vos règles et vos décisions. »
                    </p>
                </div>
            </div>
        </div>
    );
}
