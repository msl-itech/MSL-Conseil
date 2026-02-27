"use client";

import { useState, useEffect, useRef } from "react";
import { createOdooLead, updateOdooLead, formatQuizResultsToDescription } from "@/lib/odoo-api";
import toast from "react-hot-toast";

// Types
export interface UserInfo {
    firstName: string;
    lastName: string;
    company: string;
    vatNumber: string;
    revenueLevel: string;
    sector: string;
    employees: string;
    role: string;
    email: string;
}

const REVENUE_LEVELS = [
    "Moins de 300.000 €",
    "De 300.000 € à 1M €",
    "De 1M € à 3M €",
    "Plus de 3M €"
];

const SECTORS = [
    "Commerce & Distribution",
    "Services aux entreprises",
    "Industrie & Production",
    "Construction & BTP",
    "Technologie & IT",
    "Santé & Médical",
    "Transport & Logistique",
    "Immobilier",
    "Finance & Assurance",
    "Autre"
];

const EMPLOYEE_RANGES = [
    "1-5 employés",
    "6-10 employés",
    "11-25 employés",
    "26-50 employés",
    "51-100 employés",
    "Plus de 100 employés"
];

export interface DiagnosticAnswer {
    questionId: number;
    answer: 0 | 1 | 2;
}

export interface DiagnosticResult {
    totalScore: number;
    axeScores: {
        axe1: number;
        axe2: number;
        axe3: number;
        axe4: number;
    };
    answers: DiagnosticAnswer[];
    userInfo: UserInfo;
    date: string;
    id: string;
}

interface Question {
    id: number;
    axe: 1 | 2 | 3 | 4;
    question: string;
    options: {
        value: 0 | 1 | 2;
        label: string;
        icon: string;
        interpretation: string;
    }[];
}

export const AXES = [
    { id: 1, title: "Structure & règles internes", description: "Évalue la clarté et la stabilité de vos règles financières dans Odoo." },
    { id: 2, title: "Coût invisible & tâches manuelles", description: "Mesure le temps perdu et la charge mentale liée aux processus manuels." },
    { id: 3, title: "Maturité d'automatisation", description: "Évalue votre capacité actuelle à automatiser efficacement." },
    { id: 4, title: "Pilotage & contrôle", description: "Détermine si vous pilotez ou subissez vos finances." },
];

export const QUESTIONS: Question[] = [
    // AXE 1 - Structure & règles internes (Q1-6)
    {
        id: 1, axe: 1, question: "Les règles de facturation et d'encodage sont-elles clairement définies et documentées ?",
        options: [
            { value: 0, label: "Non, elles sont implicites", icon: "❌", interpretation: "Les règles reposent principalement sur l'habitude ou la mémoire des personnes. Toute automatisation risque d'exécuter des logiques non stabilisées." },
            { value: 1, label: "Partiellement, selon les personnes", icon: "⚠️", interpretation: "Certaines règles existent, mais elles ne sont pas toujours formalisées ni partagées. L'automatisation est possible, mais uniquement de manière très ciblée." },
            { value: 2, label: "Oui, claires et partagées", icon: "✅", interpretation: "Vos règles sont suffisamment claires pour être appliquées sans interprétation. C'est un prérequis essentiel pour automatiser sereinement." },
        ]
    },
    {
        id: 2, axe: 1, question: "Les responsabilités financières sont-elles clairement réparties ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "L'absence de responsabilités claires crée des zones grises. L'automatisation ne sait pas \"compenser\" un flou organisationnel." },
            { value: 1, label: "Plus ou moins", icon: "⚠️", interpretation: "Certaines responsabilités sont définies, mais pas toujours formalisées. Cela peut freiner l'adoption des automatisations par les équipes." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Les rôles sont clairs et assumés. L'automatisation peut alors soutenir l'organisation au lieu de la perturber." },
        ]
    },
    {
        id: 3, axe: 1, question: "Les exceptions (cas particuliers) sont-elles rares et maîtrisées ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Des exceptions fréquentes rendent les règles difficiles à automatiser. Plus il y a d'exceptions, plus l'automatisation devient fragile." },
            { value: 1, label: "Assez fréquentes", icon: "⚠️", interpretation: "Certaines exceptions restent nécessaires. Elles devront être explicitement intégrées ou exclues des automatismes." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Les exceptions sont identifiées et encadrées. C'est une base saine pour automatiser sans mauvaise surprise." },
        ]
    },
    {
        id: 4, axe: 1, question: "Les règles sont-elles stables dans le temps ?",
        options: [
            { value: 0, label: "Changent souvent", icon: "❌", interpretation: "Des règles instables rendent toute automatisation risquée. L'outil exécute… mais ne devine pas les changements implicites." },
            { value: 1, label: "Dépendent du contexte", icon: "⚠️", interpretation: "Les règles varient selon les situations. L'automatisation devra rester partielle et surveillée." },
            { value: 2, label: "Stables", icon: "✅", interpretation: "La stabilité des règles permet une automatisation fiable. Odoo peut alors jouer pleinement son rôle." },
        ]
    },
    {
        id: 5, axe: 1, question: "Les données sont-elles cohérentes entre modules Odoo ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Des incohérences de données amplifient les erreurs automatisées. Automatiser sans cohérence revient à accélérer les problèmes." },
            { value: 1, label: "Parfois", icon: "⚠️", interpretation: "Certaines données sont alignées, d'autres non. Une revue des flux est nécessaire avant d'aller plus loin." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Vos données circulent de manière fluide et cohérente. Condition idéale pour automatiser efficacement." },
        ]
    },
    {
        id: 6, axe: 1, question: "Les règles sont-elles compréhensibles par quelqu'un d'autre que la personne clé ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Votre organisation dépend fortement de personnes spécifiques. L'automatisation devient alors un risque organisationnel." },
            { value: 1, label: "En partie", icon: "⚠️", interpretation: "Une partie des règles est transmissible. Cela limite le risque, sans l'éliminer totalement." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Les règles sont partagées et compréhensibles. L'automatisation renforce la sécurité organisationnelle." },
        ]
    },

    // AXE 2 - Coût invisible & tâches manuelles (Q7-12)
    {
        id: 7, axe: 2, question: "Avez-vous identifié les tâches financières les plus chronophages ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Le temps perdu reste invisible. Ce qui n'est pas mesuré est rarement optimisé." },
            { value: 1, label: "De manière informelle", icon: "⚠️", interpretation: "Vous ressentez la perte de temps sans l'avoir objectivée. C'est souvent le premier signal avant une vraie structuration." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Vous avez une vision claire des gisements de temps. L'automatisation peut alors être priorisée intelligemment." },
        ]
    },
    {
        id: 8, axe: 2, question: "Le lettrage et les rapprochements sont-ils encore majoritairement manuels ?",
        options: [
            { value: 0, label: "Oui, entièrement", icon: "❌", interpretation: "Ces tâches consomment du temps à faible valeur ajoutée. Elles sont parmi les premières candidates à l'automatisation." },
            { value: 1, label: "Partiellement", icon: "⚠️", interpretation: "Une partie du gain est déjà réalisée. Il reste un potentiel important à activer." },
            { value: 2, label: "Non", icon: "✅", interpretation: "Vous avez déjà réduit une source majeure de charge mentale. C'est un excellent levier de fiabilité." },
        ]
    },
    {
        id: 9, axe: 2, question: "Les clôtures mensuelles génèrent-elles du stress ou de la pression ?",
        options: [
            { value: 0, label: "Oui, souvent", icon: "❌", interpretation: "Le stress est souvent le symptôme d'un système trop manuel. Même si \"ça passe\", le coût humain est réel." },
            { value: 1, label: "Parfois", icon: "⚠️", interpretation: "La pression existe encore à certaines périodes. Une meilleure automatisation peut lisser la charge." },
            { value: 2, label: "Rarement", icon: "✅", interpretation: "Vos processus sont suffisamment fluides. L'automatisation devient un confort, pas une urgence." },
        ]
    },
    {
        id: 10, axe: 2, question: "Certaines tâches dépendent-elles d'une seule personne ?",
        options: [
            { value: 0, label: "Oui", icon: "❌", interpretation: "Il existe une dépendance humaine critique. L'automatisation est ici un outil de sécurisation." },
            { value: 1, label: "En partie", icon: "⚠️", interpretation: "Le risque est limité mais présent. Une formalisation supplémentaire est recommandée." },
            { value: 2, label: "Non", icon: "✅", interpretation: "Votre organisation est résiliente. L'automatisation renforce encore cette solidité." },
        ]
    },
    {
        id: 11, axe: 2, question: "Les décisions sont-elles parfois retardées faute de chiffres fiables à temps ?",
        options: [
            { value: 0, label: "Oui", icon: "❌", interpretation: "Le coût principal du manuel est la décision tardive. Ce coût est souvent sous-estimé." },
            { value: 1, label: "Parfois", icon: "⚠️", interpretation: "La visibilité n'est pas toujours immédiate. L'automatisation peut accélérer le pilotage." },
            { value: 2, label: "Non", icon: "✅", interpretation: "Vos chiffres soutiennent les décisions en temps utile. C'est un avantage stratégique clair." },
        ]
    },
    {
        id: 12, axe: 2, question: "Mesurez-vous l'impact du temps passé sur ces tâches ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Sans mesure, la perte reste abstraite. Elle est donc rarement priorisée." },
            { value: 1, label: "Approximativement", icon: "⚠️", interpretation: "Vous avez une intuition, mais peu de chiffres. Formaliser cela renforce la prise de décision." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Vous raisonnez en coût réel. L'automatisation devient un investissement, pas une dépense." },
        ]
    },

    // AXE 3 - Maturité d'automatisation (Q13-18)
    {
        id: 13, axe: 3, question: "Automatisez-vous déjà certaines tâches clés dans Odoo ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Votre organisation repose encore majoritairement sur le manuel. L'automatisation n'a pas encore été structurée comme un levier." },
            { value: 1, label: "Quelques-unes", icon: "⚠️", interpretation: "Vous avez commencé à automatiser certains flux. C'est une bonne base, mais le potentiel reste largement sous-exploité." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Vous avez déjà intégré l'automatisation dans votre fonctionnement. Cela montre une volonté claire de structurer vos processus." },
        ]
    },
    {
        id: 14, axe: 3, question: "Les automatisations existantes sont-elles fiables ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Des automatisations peu fiables finissent par être contournées ou désactivées. Le risque principal est la perte de confiance dans l'outil." },
            { value: 1, label: "Pas toujours", icon: "⚠️", interpretation: "Certaines règles fonctionnent bien, d'autres nécessitent encore des ajustements. Cela indique un manque de méthode plus qu'un problème technique." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Vos automatisations produisent les résultats attendus. C'est le signe d'un bon alignement entre règles, données et usage." },
        ]
    },
    {
        id: 15, axe: 3, question: "Testez-vous les automatisations avant généralisation ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Les règles sont souvent mises en production sans phase de validation. Cela augmente fortement le risque d'erreurs silencieuses." },
            { value: 1, label: "Parfois", icon: "⚠️", interpretation: "Certains tests sont réalisés, mais sans méthode systématique. Le risque est limité, mais toujours présent." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Les automatisations sont testées sur des cas concrets avant déploiement. C'est une pratique clé pour sécuriser la finance." },
        ]
    },
    {
        id: 16, axe: 3, question: "Les équipes comprennent-elles les règles automatisées ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Les règles sont perçues comme \"magiques\" ou opaques. Cela crée de la méfiance et des contournements." },
            { value: 1, label: "Partiellement", icon: "⚠️", interpretation: "Certaines règles sont comprises, d'autres moins. Une meilleure communication renforcerait l'adhésion." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Les équipes comprennent la logique des automatisations. Cela facilite leur adoption et leur efficacité." },
        ]
    },
    {
        id: 17, axe: 3, question: "Disposez-vous d'alertes ou d'indicateurs pour surveiller les automatismes ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Les erreurs sont souvent découvertes tardivement. L'automatisation fonctionne, mais sans filet de sécurité." },
            { value: 1, label: "Quelques-uns", icon: "⚠️", interpretation: "Certains contrôles existent, mais leur périmètre est limité. Un renforcement ciblé améliorerait la fiabilité." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Les automatismes sont surveillés par des alertes et indicateurs. Le contrôle devient proactif plutôt que réactif." },
        ]
    },
    {
        id: 18, axe: 3, question: "Ajustez-vous régulièrement les règles automatisées ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Les règles restent figées, même lorsque le contexte évolue. Cela réduit progressivement leur pertinence." },
            { value: 1, label: "Occasionnellement", icon: "⚠️", interpretation: "Des ajustements sont faits lorsque les problèmes deviennent visibles. Une approche plus anticipative serait bénéfique." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Les règles sont revues et adaptées dans le temps. L'automatisation devient un système vivant et durable." },
        ]
    },

    // AXE 4 - Pilotage & contrôle (Q19-24)
    {
        id: 19, axe: 4, question: "Disposez-vous d'indicateurs financiers fiables et à jour ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Les décisions reposent encore beaucoup sur l'intuition. Le pilotage reste réactif." },
            { value: 1, label: "Partiellement", icon: "⚠️", interpretation: "Certains indicateurs existent, mais ils ne sont pas toujours à jour. La visibilité reste incomplète." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Vous disposez d'indicateurs fiables en temps utile. Le pilotage devient factuel et structuré." },
        ]
    },
    {
        id: 20, axe: 4, question: "Contrôlez-vous encore tout ligne par ligne ?",
        options: [
            { value: 0, label: "Oui", icon: "❌", interpretation: "Le contrôle est exhaustif mais très chronophage. Il intervient souvent trop tard pour être stratégique." },
            { value: 1, label: "En partie", icon: "⚠️", interpretation: "Certains contrôles sont automatisés, d'autres non. La transition vers un contrôle plus intelligent est en cours." },
            { value: 2, label: "Non", icon: "✅", interpretation: "Le contrôle repose sur des règles et des exceptions. Le temps est consacré à l'analyse plutôt qu'à la vérification." },
        ]
    },
    {
        id: 21, axe: 4, question: "Les alertes remplacent-elles certains contrôles manuels ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Les problèmes sont détectés après coup. Le contrôle reste principalement réactif." },
            { value: 1, label: "Peu", icon: "⚠️", interpretation: "Quelques alertes existent, mais leur périmètre est limité. Elles peuvent être renforcées sans complexité." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Les alertes jouent un rôle central dans le contrôle. La finance devient plus sereine et prévisible." },
        ]
    },
    {
        id: 22, axe: 4, question: "Avez-vous une vision rapide de votre situation financière ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "Il faut du temps pour reconstituer l'information. Les décisions sont retardées." },
            { value: 1, label: "Avec délai", icon: "⚠️", interpretation: "La vision existe, mais pas en temps réel. L'automatisation peut accélérer l'accès à l'information." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Vous accédez rapidement à une vision fiable. Cela renforce votre capacité de pilotage." },
        ]
    },
    {
        id: 23, axe: 4, question: "Les chiffres servent-ils réellement à décider ?",
        options: [
            { value: 0, label: "Rarement", icon: "❌", interpretation: "Les chiffres arrivent souvent trop tard ou sont peu exploitables. Le pilotage reste intuitif." },
            { value: 1, label: "Parfois", icon: "⚠️", interpretation: "Les données soutiennent certaines décisions. Leur rôle peut encore être renforcé." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Les décisions s'appuient clairement sur les chiffres. La finance joue pleinement son rôle stratégique." },
        ]
    },
    {
        id: 24, axe: 4, question: "Vous sentez-vous en maîtrise de votre finance ?",
        options: [
            { value: 0, label: "Non", icon: "❌", interpretation: "La finance est perçue comme une contrainte. L'automatisation doit d'abord sécuriser et rassurer." },
            { value: 1, label: "En partie", icon: "⚠️", interpretation: "Le contrôle progresse, mais reste fragile. Une structuration supplémentaire apporterait de la sérénité." },
            { value: 2, label: "Oui", icon: "✅", interpretation: "Vous êtes en maîtrise de vos flux et de vos chiffres. L'automatisation peut désormais soutenir la croissance." },
        ]
    },
];

interface DiagnosticQuizProps {
    onComplete: (result: DiagnosticResult) => void;
    onBack: () => void;
}

export default function DiagnosticQuiz({ onComplete, onBack }: DiagnosticQuizProps) {
    const isAdvancingRef = useRef(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<DiagnosticAnswer[]>([]);
    const [showInterpretation, setShowInterpretation] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showAxeTransition, setShowAxeTransition] = useState(false);
    const [step, setStep] = useState<"intro" | "form" | "quiz">("intro");
    const [userInfo, setUserInfo] = useState<UserInfo>({
        firstName: "",
        lastName: "",
        company: "",
        vatNumber: "",
        revenueLevel: "",
        sector: "",
        employees: "",
        role: "",
        email: ""
    });
    const [formErrors, setFormErrors] = useState<Partial<UserInfo>>({});
    const [leadId, setLeadId] = useState<number | null>(null);

    const question = QUESTIONS[currentQuestion];
    const currentAxe = AXES.find(a => a.id === question?.axe);
    const progress = ((currentQuestion) / QUESTIONS.length) * 100;

    const isNewAxe = currentQuestion > 0 &&
        QUESTIONS[currentQuestion - 1]?.axe !== question?.axe;

    useEffect(() => {
        if (isNewAxe && step === "quiz") {
            setShowAxeTransition(true);
            const timer = setTimeout(() => setShowAxeTransition(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [currentQuestion, isNewAxe, step]);

    const handleAnswer = (value: 0 | 1 | 2) => {
        setSelectedAnswer(value);
        setShowInterpretation(true);
    };

    const validateForm = (): boolean => {
        const errors: Partial<UserInfo> = {};
        if (!userInfo.firstName.trim()) errors.firstName = "Le prénom est requis";
        if (!userInfo.lastName.trim()) errors.lastName = "Le nom est requis";
        if (!userInfo.company.trim()) errors.company = "Le nom de l'entreprise est requis";
        if (!userInfo.vatNumber.trim()) errors.vatNumber = "Le numéro TVA / BCE est requis";
        if (!userInfo.revenueLevel) errors.revenueLevel = "Veuillez sélectionner le niveau de CA";
        if (!userInfo.sector) errors.sector = "Veuillez sélectionner le secteur";
        if (!userInfo.employees) errors.employees = "Veuillez sélectionner l'effectif";
        if (!userInfo.role.trim()) errors.role = "La fonction est requise";
        if (!userInfo.email.trim()) {
            errors.email = "L'email est requis";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
            errors.email = "Veuillez entrer un email valide";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        const loadingToast = toast.loading("Enregistrement de vos informations...");
        
        try {
            // Créer le lead dans Odoo
            const userData = {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                company: userInfo.company,
                vatNumber: userInfo.vatNumber,
                revenueLevel: userInfo.revenueLevel,
                sector: userInfo.sector,
                employees: userInfo.employees,
            };
            
            const response = await createOdooLead(userData, "Guide: Automatisation & Diagnostic");
            
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
        }
        
        setStep("quiz");
    };

    const handleNext = async () => {
        if (selectedAnswer === null || isAdvancingRef.current) return;
        isAdvancingRef.current = true;

        try {
            const newAnswers = [...answers, { questionId: question.id, answer: selectedAnswer as 0 | 1 | 2 }];
            setAnswers(newAnswers);

            if (currentQuestion < QUESTIONS.length - 1) {
                setCurrentQuestion(prev => prev + 1);
                setSelectedAnswer(null);
                setShowInterpretation(false);
            } else {
                const axe1 = newAnswers.filter(a => QUESTIONS.find(q => q.id === a.questionId)?.axe === 1).reduce((sum, a) => sum + a.answer, 0);
                const axe2 = newAnswers.filter(a => QUESTIONS.find(q => q.id === a.questionId)?.axe === 2).reduce((sum, a) => sum + a.answer, 0);
                const axe3 = newAnswers.filter(a => QUESTIONS.find(q => q.id === a.questionId)?.axe === 3).reduce((sum, a) => sum + a.answer, 0);
                const axe4 = newAnswers.filter(a => QUESTIONS.find(q => q.id === a.questionId)?.axe === 4).reduce((sum, a) => sum + a.answer, 0);

                const result: DiagnosticResult = {
                    totalScore: axe1 + axe2 + axe3 + axe4,
                    axeScores: { axe1, axe2, axe3, axe4 },
                    answers: newAnswers,
                    userInfo: userInfo,
                    date: new Date().toISOString(),
                    id: `auto_diag_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
                };

                // Mettre à jour le lead avec les résultats du quiz
                console.log("🔍 DEBUG - leadId:", leadId);
                console.log("🔍 DEBUG - userInfo:", userInfo);
            
                if (leadId) {
                    const updatingToast = toast.loading("Envoi de vos résultats...");
                
                    try {
                        const maxScore = QUESTIONS.length * 2; // 2 points max par question
                        const percentage = Math.round((result.totalScore / maxScore) * 100);
                    
                        // Convertir les réponses pour l'API
                        const answersMap: Record<string, number> = {};
                        const questionsMap: Record<string, string> = {};
                        newAnswers.forEach(a => {
                            const questionKey = `q${a.questionId}`;
                            answersMap[questionKey] = a.answer;
                        
                            // Trouver la question correspondante pour obtenir son texte
                            const question = QUESTIONS.find(q => q.id === a.questionId);
                            if (question) {
                                questionsMap[questionKey] = question.question;
                            }
                        });
                    
                        const userData = {
                            firstName: userInfo.firstName,
                            lastName: userInfo.lastName,
                            email: userInfo.email,
                            company: userInfo.company,
                            vatNumber: userInfo.vatNumber,
                            revenueLevel: userInfo.revenueLevel,
                            sector: userInfo.sector,
                            employees: userInfo.employees,
                        };
                    
                        const updatedDescription = formatQuizResultsToDescription(
                            userData,
                            {
                                answers: answersMap,
                                totalScore: result.totalScore,
                                maxScore,
                                percentage,
                                questions: questionsMap,
                            },
                            "Guide: Automatisation & Diagnostic"
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

                localStorage.setItem('auto_diagnostic_result', JSON.stringify(result));
                onComplete(result);
            }
        } finally {
            isAdvancingRef.current = false;
        }
    };

    // Intro Screen
    if (step === "intro") {
        return (
            <section className="w-full min-h-screen bg-gray-50 text-gray-900 py-32 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
                        <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif mb-6">
                        Êtes-vous prêt à <span className="text-secondary">automatiser</span> vos finances dans Odoo ?
                    </h1>

                    <p className="text-xl text-gray-600 mb-10">
                        Évaluez la maturité de votre organisation financière avant toute automatisation.
                        <br />24 questions, 5-7 minutes, résultats personnalisés.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {[
                            { icon: "⏱️", text: "5 à 7 min" },
                            { icon: "🎯", text: "24 questions" },
                            { icon: "🔒", text: "100% confidentiel" },
                            { icon: "📊", text: "Résultats détaillés" },
                        ].map((item, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                                <span className="text-2xl block mb-2">{item.icon}</span>
                                <span className="text-sm text-gray-600">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-gray-500 text-sm mb-10 italic">
                        &quot;Ce diagnostic est un outil de lucidité pour décider avec méthode.&quot;
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => setStep("form")}
                            className="px-10 py-5 bg-secondary text-primary rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors duration-300 shadow-xl hover:scale-105"
                        >
                            Commencer le diagnostic
                        </button>
                        <button
                            onClick={onBack}
                            className="px-10 py-5 border border-gray-300 text-gray-700 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-gray-100 transition-colors duration-300"
                        >
                            Retour au guide
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    // User Form Screen
    if (step === "form") {
        return (
            <section className="w-full min-h-screen bg-gray-50 text-gray-900 py-32 px-6">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-serif mb-4">Avant de commencer...</h2>
                        <p className="text-gray-600">
                            Pour personnaliser votre diagnostic, merci de renseigner quelques informations.
                        </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
                        {/* Row 1: Prénom / Nom */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Prénom <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={userInfo.firstName}
                                    onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.firstName ? 'border-red-500' : 'border-gray-200'} focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors outline-none`}
                                    placeholder="Votre prénom"
                                />
                                {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nom <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={userInfo.lastName}
                                    onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.lastName ? 'border-red-500' : 'border-gray-200'} focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors outline-none`}
                                    placeholder="Votre nom"
                                />
                                {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
                            </div>
                        </div>

                        {/* Row 2: Entreprise */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Entreprise <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={userInfo.company}
                                onChange={(e) => setUserInfo({ ...userInfo, company: e.target.value })}
                                className={`w-full px-4 py-3 rounded-xl border ${formErrors.company ? 'border-red-500' : 'border-gray-200'} focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors outline-none`}
                                placeholder="Nom de votre entreprise"
                            />
                            {formErrors.company && <p className="text-red-500 text-sm mt-1">{formErrors.company}</p>}
                        </div>

                        {/* Row 3: TVA / Niveau CA */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Numéro TVA / BCE <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={userInfo.vatNumber}
                                    onChange={(e) => setUserInfo({ ...userInfo, vatNumber: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.vatNumber ? 'border-red-500' : 'border-gray-200'} focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors outline-none`}
                                    placeholder="BE 0123.456.789"
                                />
                                {formErrors.vatNumber && <p className="text-red-500 text-sm mt-1">{formErrors.vatNumber}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Niveau de CA <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={userInfo.revenueLevel}
                                    onChange={(e) => setUserInfo({ ...userInfo, revenueLevel: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.revenueLevel ? 'border-red-500' : 'border-gray-200'} focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors outline-none bg-white`}
                                >
                                    <option value="">Sélectionnez...</option>
                                    {REVENUE_LEVELS.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                                {formErrors.revenueLevel && <p className="text-red-500 text-sm mt-1">{formErrors.revenueLevel}</p>}
                            </div>
                        </div>

                        {/* Row 4: Secteur / Effectif */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Secteur d'activité <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={userInfo.sector}
                                    onChange={(e) => setUserInfo({ ...userInfo, sector: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.sector ? 'border-red-500' : 'border-gray-200'} focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors outline-none bg-white`}
                                >
                                    <option value="">Sélectionnez...</option>
                                    {SECTORS.map(sector => (
                                        <option key={sector} value={sector}>{sector}</option>
                                    ))}
                                </select>
                                {formErrors.sector && <p className="text-red-500 text-sm mt-1">{formErrors.sector}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Effectif <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={userInfo.employees}
                                    onChange={(e) => setUserInfo({ ...userInfo, employees: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.employees ? 'border-red-500' : 'border-gray-200'} focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors outline-none bg-white`}
                                >
                                    <option value="">Sélectionnez...</option>
                                    {EMPLOYEE_RANGES.map(range => (
                                        <option key={range} value={range}>{range}</option>
                                    ))}
                                </select>
                                {formErrors.employees && <p className="text-red-500 text-sm mt-1">{formErrors.employees}</p>}
                            </div>
                        </div>

                        {/* Row 5: Fonction / Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Fonction <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={userInfo.role}
                                    onChange={(e) => setUserInfo({ ...userInfo, role: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.role ? 'border-red-500' : 'border-gray-200'} focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors outline-none`}
                                    placeholder="Ex: Dirigeant, DAF, Resp. Finance..."
                                />
                                {formErrors.role && <p className="text-red-500 text-sm mt-1">{formErrors.role}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={userInfo.email}
                                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.email ? 'border-red-500' : 'border-gray-200'} focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors outline-none`}
                                    placeholder="email@exemple.com"
                                />
                                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                className="flex-1 px-8 py-4 bg-secondary text-primary rounded-full font-bold uppercase tracking-wider text-sm hover:bg-primary hover:text-white transition-colors"
                            >
                                Démarrer le diagnostic
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep("intro")}
                                className="px-8 py-4 border border-gray-300 text-gray-700 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-gray-100 transition-colors"
                            >
                                Retour
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-gray-400 text-sm mt-6">
                        🔒 Vos données sont sécurisées et seront intégrées dans notre CRM Odoo pour un suivi personnalisé.
                    </p>
                </div>
            </section>
        );
    }

    // Axe Transition Screen
    if (showAxeTransition) {
        return (
            <section className="w-full min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center px-6">
                <div className="text-center animate-pulse">
                    <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs block mb-4">
                        AXE {currentAxe?.id}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif mb-4">{currentAxe?.title}</h2>
                    <p className="text-gray-500 max-w-md">{currentAxe?.description}</p>
                </div>
            </section>
        );
    }

    // Question Screen
    return (
        <section className="w-full min-h-screen bg-gray-50 text-gray-900 py-24 px-6">
            <div className="max-w-2xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                        <span>Question {currentQuestion + 1} / {QUESTIONS.length}</span>
                        <span>AXE {currentAxe?.id} — {currentAxe?.title}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-secondary transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-serif mb-4">
                        {question.question}
                    </h2>
                </div>

                <div className="space-y-4 mb-8">
                    {question.options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleAnswer(option.value)}
                            className={`w-full p-6 rounded-2xl border transition-all text-left ${selectedAnswer === option.value
                                ? 'bg-secondary/20 border-secondary text-primary shadow-md'
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
                                }`}
                        >
                            <span className="text-2xl mr-3">{option.icon}</span>
                            <span className="text-lg font-medium">{option.label}</span>
                        </button>
                    ))}
                </div>

                {showInterpretation && selectedAnswer !== null && (
                    <div className="mb-8 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm animate-fade-in">
                        <p className="text-gray-600">
                            <strong className="text-secondary">Ce que cela signifie :</strong>{' '}
                            {question.options.find(o => o.value === selectedAnswer)?.interpretation}
                        </p>
                    </div>
                )}

                <div className="flex justify-between">
                    <button
                        onClick={onBack}
                        className="px-6 py-3 text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        ← Retour
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={selectedAnswer === null}
                        className={`px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all ${selectedAnswer !== null
                            ? 'bg-secondary text-primary hover:bg-white'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {currentQuestion < QUESTIONS.length - 1 ? 'Question suivante' : 'Voir mes résultats'}
                    </button>
                </div>

                {/* Progress Dots */}
                <div className="flex justify-center gap-1 mt-8 flex-wrap">
                    {AXES.map((axe) => (
                        <div key={axe.id} className="flex gap-1">
                            {QUESTIONS.filter(q => q.axe === axe.id).map((q) => {
                                const isAnswered = answers.some(a => a.questionId === q.id);
                                const isCurrent = q.id === question.id;
                                return (
                                    <div
                                        key={q.id}
                                        className={`w-2 h-2 rounded-full transition-all ${isCurrent ? 'w-4 bg-secondary' :
                                            isAnswered ? 'bg-green-500' : 'bg-gray-200'
                                            }`}
                                    />
                                );
                            })}
                            {axe.id < 4 && <div className="w-1" />}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
