"use client";

import {
  createOdooLead,
  formatQuizResultsToDescription,
  updateOdooLead,
} from "@/lib/odoo-api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Types
export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  vatNumber: string;
  revenueLevel: string;
  sector: string;
  employees: string;
}

const SECTORS = [
  "Services",
  "Commerce",
  "Industrie",
  "Construction",
  "Tech/Digital",
  "Santé",
  "Autre",
];
const EMPLOYEES = ["1-10", "11-50", "51-100", "101-250", "250+"];
const REVENUE_LEVELS = [
  "Moins de 300.000 €",
  "De 300.000 € à 1M €",
  "De 1M € à 3M €",
  "Plus de 3M €",
];

export interface DiagnosticAnswer {
  questionId: number;
  answer: 0 | 1 | 2; // 0 = ❌, 1 = ⚠️, 2 = ✅
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

const AXES = [
  {
    id: 1,
    title: "Clarté & structure financière",
    description:
      "Évalue les fondations de votre pilotage financier : budget, règles, indicateurs, lisibilité.",
  },
  {
    id: 2,
    title: "Coût invisible & charge mentale",
    description:
      "Évalue ce que votre organisation vous coûte sans forcément apparaître dans les comptes.",
  },
  {
    id: 3,
    title: "Maturité du pilotage",
    description:
      "Mesure votre capacité à transformer les chiffres en décisions.",
  },
  {
    id: 4,
    title: "Le bon moment",
    description: "Détermine si votre entreprise est prête pour un DAF.",
  },
];

const QUESTIONS: Question[] = [
  // AXE 1 - Clarté & structure financière (Q1-6)
  {
    id: 1,
    axe: 1,
    question: "Disposez-vous d'un budget annuel formalisé ?",
    options: [
      {
        value: 0,
        label: "Non",
        icon: "❌",
        interpretation:
          "Vos décisions reposent principalement sur l'intuition.",
      },
      {
        value: 1,
        label: "Oui, mais peu utilisé",
        icon: "⚠️",
        interpretation:
          "Le budget existe, mais il ne pilote pas réellement l'action.",
      },
      {
        value: 2,
        label: "Oui, suivi régulièrement",
        icon: "✅",
        interpretation: "Vous disposez d'un véritable outil de pilotage.",
      },
    ],
  },
  {
    id: 2,
    axe: 1,
    question: "Vos marges sont-elles connues par activité, produit ou client ?",
    options: [
      {
        value: 0,
        label: "Non",
        icon: "❌",
        interpretation: "La rentabilité réelle est partiellement invisible.",
      },
      {
        value: 1,
        label: "Approximativement",
        icon: "⚠️",
        interpretation:
          "Certaines décisions restent prises avec un angle mort.",
      },
      {
        value: 2,
        label: "Oui, clairement",
        icon: "✅",
        interpretation:
          "Vous savez précisément où vous gagnez (ou perdez) de l'argent.",
      },
    ],
  },
  {
    id: 3,
    axe: 1,
    question: "Les règles financières sont-elles claires et partagées ?",
    options: [
      {
        value: 0,
        label: "Non",
        icon: "❌",
        interpretation:
          "Le fonctionnement repose sur des habitudes individuelles.",
      },
      {
        value: 1,
        label: "Partiellement",
        icon: "⚠️",
        interpretation: "La structure existe mais reste fragile.",
      },
      {
        value: 2,
        label: "Oui",
        icon: "✅",
        interpretation: "L'organisation est transmissible et sécurisée.",
      },
    ],
  },
  {
    id: 4,
    axe: 1,
    question: "Les chiffres sont-ils disponibles à temps pour décider ?",
    options: [
      {
        value: 0,
        label: "Non",
        icon: "❌",
        interpretation: "Les décisions arrivent souvent trop tard.",
      },
      {
        value: 1,
        label: "Avec délai",
        icon: "⚠️",
        interpretation: "La visibilité existe, mais elle reste réactive.",
      },
      {
        value: 2,
        label: "Oui",
        icon: "✅",
        interpretation: "Les chiffres soutiennent réellement la stratégie.",
      },
    ],
  },
  {
    id: 5,
    axe: 1,
    question: "La finance est-elle dépendante d'une seule personne ?",
    options: [
      {
        value: 0,
        label: "Oui",
        icon: "❌",
        interpretation: "Risque organisationnel élevé.",
      },
      {
        value: 1,
        label: "En partie",
        icon: "⚠️",
        interpretation: "Le risque est identifié mais pas totalement maîtrisé.",
      },
      {
        value: 2,
        label: "Non",
        icon: "✅",
        interpretation: "L'organisation est résiliente.",
      },
    ],
  },
  {
    id: 6,
    axe: 1,
    question: "Les indicateurs clés sont-ils compris par la direction ?",
    options: [
      {
        value: 0,
        label: "Non",
        icon: "❌",
        interpretation: "Les chiffres ne jouent pas leur rôle décisionnel.",
      },
      {
        value: 1,
        label: "Partiellement",
        icon: "⚠️",
        interpretation: "L'analyse reste incomplète.",
      },
      {
        value: 2,
        label: "Oui",
        icon: "✅",
        interpretation: "La finance parle un langage utile au dirigeant.",
      },
    ],
  },

  // AXE 2 - Coût invisible & charge mentale (Q7-12)
  {
    id: 7,
    axe: 2,
    question:
      "Identifiez-vous clairement les tâches financières chronophages ?",
    options: [
      {
        value: 0,
        label: "Non",
        icon: "❌",
        interpretation: "Le temps perdu reste invisible.",
      },
      {
        value: 1,
        label: "Intuitivement",
        icon: "⚠️",
        interpretation: "Vous ressentez la charge sans l'objectiver.",
      },
      {
        value: 2,
        label: "Oui",
        icon: "✅",
        interpretation: "Vous savez où agir en priorité.",
      },
    ],
  },
  {
    id: 8,
    axe: 2,
    question: "Le suivi de trésorerie est-il anticipé ?",
    options: [
      {
        value: 0,
        label: "Non",
        icon: "❌",
        interpretation: "La trésorerie est subie.",
      },
      {
        value: 1,
        label: "Partiellement",
        icon: "⚠️",
        interpretation: "Vous avez une vision courte.",
      },
      {
        value: 2,
        label: "Oui",
        icon: "✅",
        interpretation: "Vous pilotez vos flux à moyen terme.",
      },
    ],
  },
  {
    id: 9,
    axe: 2,
    question: "Les clôtures génèrent-elles du stress ?",
    options: [
      {
        value: 0,
        label: "Souvent",
        icon: "❌",
        interpretation: "Système trop manuel ou mal structuré.",
      },
      {
        value: 1,
        label: "Parfois",
        icon: "⚠️",
        interpretation: "Des frictions subsistent.",
      },
      {
        value: 2,
        label: "Rarement",
        icon: "✅",
        interpretation: "Les processus sont maîtrisés.",
      },
    ],
  },
  {
    id: 10,
    axe: 2,
    question: "Les décisions sont-elles parfois retardées faute de chiffres ?",
    options: [
      {
        value: 0,
        label: "Oui",
        icon: "❌",
        interpretation: "Le coût caché est stratégique.",
      },
      {
        value: 1,
        label: "Parfois",
        icon: "⚠️",
        interpretation: "Le pilotage peut être amélioré.",
      },
      {
        value: 2,
        label: "Non",
        icon: "✅",
        interpretation: "Les chiffres arrivent au bon moment.",
      },
    ],
  },
  {
    id: 11,
    axe: 2,
    question: 'Utilisez-vous encore beaucoup d\'Excel "maison" ?',
    options: [
      {
        value: 0,
        label: "Oui",
        icon: "❌",
        interpretation: "Dépendance et risque élevés.",
      },
      {
        value: 1,
        label: "Un peu",
        icon: "⚠️",
        interpretation: "Transition en cours.",
      },
      {
        value: 2,
        label: "Non",
        icon: "✅",
        interpretation: "Les outils sont structurés.",
      },
    ],
  },
  {
    id: 12,
    axe: 2,
    question: "Le dirigeant porte-t-il seul la charge financière ?",
    options: [
      {
        value: 0,
        label: "Oui",
        icon: "❌",
        interpretation: "Risque de surcharge et de décisions isolées.",
      },
      {
        value: 1,
        label: "En partie",
        icon: "⚠️",
        interpretation: "Le partage progresse.",
      },
      {
        value: 2,
        label: "Non",
        icon: "✅",
        interpretation: "Le pilotage est collectif.",
      },
    ],
  },

  // AXE 3 - Maturité du pilotage (Q13-18)
  {
    id: 13,
    axe: 3,
    question: "Disposez-vous de tableaux de bord réguliers ?",
    options: [
      { value: 0, label: "Non", icon: "❌", interpretation: "Pilotage à vue." },
      {
        value: 1,
        label: "Occasionnels",
        icon: "⚠️",
        interpretation: "Vision irrégulière.",
      },
      {
        value: 2,
        label: "Oui",
        icon: "✅",
        interpretation: "Vision structurée.",
      },
    ],
  },
  {
    id: 14,
    axe: 3,
    question: "Les chiffres servent-ils réellement à décider ?",
    options: [
      {
        value: 0,
        label: "Rarement",
        icon: "❌",
        interpretation: "La finance est subie.",
      },
      {
        value: 1,
        label: "Parfois",
        icon: "⚠️",
        interpretation: "Usage partiel.",
      },
      {
        value: 2,
        label: "Oui",
        icon: "✅",
        interpretation: "La finance soutient la stratégie.",
      },
    ],
  },
  {
    id: 15,
    axe: 3,
    question: "Les investissements sont-ils chiffrés avant décision ?",
    options: [
      { value: 0, label: "Non", icon: "❌", interpretation: "Risque élevé." },
      {
        value: 1,
        label: "Approximativement",
        icon: "⚠️",
        interpretation: "Améliorable.",
      },
      {
        value: 2,
        label: "Oui",
        icon: "✅",
        interpretation: "Décisions rationnelles.",
      },
    ],
  },
  {
    id: 16,
    axe: 3,
    question: "Le dialogue avec les banques est-il fluide ?",
    options: [
      {
        value: 0,
        label: "Non",
        icon: "❌",
        interpretation: "Crédibilité limitée.",
      },
      {
        value: 1,
        label: "Variable",
        icon: "⚠️",
        interpretation: "Dépend du contexte.",
      },
      {
        value: 2,
        label: "Oui",
        icon: "✅",
        interpretation: "Position solide.",
      },
    ],
  },
  {
    id: 17,
    axe: 3,
    question: "La direction comprend-elle les enjeux financiers ?",
    options: [
      {
        value: 0,
        label: "Non",
        icon: "❌",
        interpretation: "Décalage stratégique.",
      },
      {
        value: 1,
        label: "Partiellement",
        icon: "⚠️",
        interpretation: "Clarification nécessaire.",
      },
      {
        value: 2,
        label: "Oui",
        icon: "✅",
        interpretation: "Alignement fort.",
      },
    ],
  },
  {
    id: 18,
    axe: 3,
    question: "Le pilotage est-il anticipatif ?",
    options: [
      {
        value: 0,
        label: "Non",
        icon: "❌",
        interpretation: "Gestion réactive.",
      },
      {
        value: 1,
        label: "Par moments",
        icon: "⚠️",
        interpretation: "Pilotage fragile.",
      },
      {
        value: 2,
        label: "Oui",
        icon: "✅",
        interpretation: "Vision long terme.",
      },
    ],
  },

  // AXE 4 - Besoin réel de DAF (Q19-24)
  {
    id: 19,
    axe: 4,
    question: "La complexité de l'entreprise augmente-t-elle ?",
    options: [
      {
        value: 0,
        label: "Non",
        icon: "❌",
        interpretation: "Stabilité actuelle.",
      },
      {
        value: 1,
        label: "Lentement",
        icon: "⚠️",
        interpretation: "Évolution progressive.",
      },
      {
        value: 2,
        label: "Oui",
        icon: "✅",
        interpretation: "Croissance en complexité.",
      },
    ],
  },
  {
    id: 20,
    axe: 4,
    question: "Le dirigeant manque-t-il de temps pour la finance ?",
    options: [
      {
        value: 0,
        label: "Non",
        icon: "❌",
        interpretation: "Temps disponible.",
      },
      {
        value: 1,
        label: "Parfois",
        icon: "⚠️",
        interpretation: "Contraintes ponctuelles.",
      },
      {
        value: 2,
        label: "Oui",
        icon: "✅",
        interpretation: "Besoin de délégation.",
      },
    ],
  },
  {
    id: 21,
    axe: 4,
    question: "Les enjeux financiers influencent-ils la stratégie ?",
    options: [
      {
        value: 0,
        label: "Peu",
        icon: "❌",
        interpretation: "Finance secondaire.",
      },
      {
        value: 1,
        label: "De plus en plus",
        icon: "⚠️",
        interpretation: "Importance croissante.",
      },
      {
        value: 2,
        label: "Fortement",
        icon: "✅",
        interpretation: "Finance stratégique.",
      },
    ],
  },
  {
    id: 22,
    axe: 4,
    question: "Les décisions financières engagent-elles l'avenir ?",
    options: [
      {
        value: 0,
        label: "Rarement",
        icon: "❌",
        interpretation: "Impact limité.",
      },
      {
        value: 1,
        label: "Régulièrement",
        icon: "⚠️",
        interpretation: "Enjeux récurrents.",
      },
      {
        value: 2,
        label: "Souvent",
        icon: "✅",
        interpretation: "Décisions structurantes.",
      },
    ],
  },
  {
    id: 23,
    axe: 4,
    question: "Ressentez-vous le besoin d'un regard externe structurant ?",
    options: [
      {
        value: 0,
        label: "Non",
        icon: "❌",
        interpretation: "Autonomie suffisante.",
      },
      {
        value: 1,
        label: "Parfois",
        icon: "⚠️",
        interpretation: "Questionnement naissant.",
      },
      {
        value: 2,
        label: "Oui",
        icon: "✅",
        interpretation: "Besoin identifié.",
      },
    ],
  },
  {
    id: 24,
    axe: 4,
    question: "Aujourd'hui, diriez-vous que le pilotage est suffisant ?",
    options: [
      {
        value: 2,
        label: "Oui",
        icon: "✅",
        interpretation: "Satisfaction actuelle.",
      },
      {
        value: 1,
        label: "En partie",
        icon: "⚠️",
        interpretation: "Marge de progression.",
      },
      {
        value: 0,
        label: "Non",
        icon: "❌",
        interpretation: "Besoin d'amélioration.",
      },
    ],
  },
];

interface DiagnosticQuizProps {
  onComplete: (result: DiagnosticResult) => void;
  onBack: () => void;
}

export default function DiagnosticQuiz({
  onComplete,
  onBack,
}: DiagnosticQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswer[]>([]);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAxeTransition, setShowAxeTransition] = useState(false);
  const [step, setStep] = useState<"intro" | "form" | "quiz">("intro");
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    vatNumber: "",
    revenueLevel: "",
    sector: "",
    employees: "",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof UserInfo, string>>
  >({});
  const [leadId, setLeadId] = useState<number | null>(null);

  const question = QUESTIONS[currentQuestion];
  const currentAxe = AXES.find((a) => a.id === question?.axe);
  const progress = (currentQuestion / QUESTIONS.length) * 100;

  // Clear transition when it times out
  useEffect(() => {
    if (showAxeTransition) {
      const timer = setTimeout(() => setShowAxeTransition(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showAxeTransition]);

  const handleAnswer = (value: 0 | 1 | 2) => {
    setSelectedAnswer(value);
    setShowInterpretation(true);
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof UserInfo, string>> = {};
    if (!userInfo.firstName?.trim()) errors.firstName = "Requis";
    if (!userInfo.lastName?.trim()) errors.lastName = "Requis";
    if (!userInfo.email?.trim()) errors.email = "Requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email))
      errors.email = "Email invalide";
    if (!userInfo.company?.trim()) errors.company = "Requis";
    if (!userInfo.vatNumber?.trim()) errors.vatNumber = "Requis";
    if (!userInfo.revenueLevel) errors.revenueLevel = "Requis";
    if (!userInfo.sector) errors.sector = "Requis";
    if (!userInfo.employees) errors.employees = "Requis";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const loadingToast = toast.loading("Enregistrement de vos informations...");

    try {
      // Créer le lead dans Odoo
      const response = await createOdooLead(userInfo, "Guide: DAF pour PME");

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
      toast.error(
        "Une erreur est survenue, mais vous pouvez continuer le diagnostic",
        {
          id: loadingToast,
        }
      );
      // On continue quand même vers le quiz même si la création échoue
    }

    setStep("quiz");
  };

  const handleNext = async () => {
    if (selectedAnswer === null) return;

    const newAnswers = [
      ...answers,
      { questionId: question.id, answer: selectedAnswer as 0 | 1 | 2 },
    ];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      const nextQuestion = QUESTIONS[currentQuestion + 1];
      const currentQuestionObj = QUESTIONS[currentQuestion];

      // Check if we're moving to a new axe
      if (
        nextQuestion &&
        currentQuestionObj &&
        nextQuestion.axe !== currentQuestionObj.axe
      ) {
        setShowAxeTransition(true);
      }

      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowInterpretation(false);
    } else {
      // Calculate results
      const axe1 = newAnswers
        .filter((a) => QUESTIONS.find((q) => q.id === a.questionId)?.axe === 1)
        .reduce((sum, a) => sum + a.answer, 0);
      const axe2 = newAnswers
        .filter((a) => QUESTIONS.find((q) => q.id === a.questionId)?.axe === 2)
        .reduce((sum, a) => sum + a.answer, 0);
      const axe3 = newAnswers
        .filter((a) => QUESTIONS.find((q) => q.id === a.questionId)?.axe === 3)
        .reduce((sum, a) => sum + a.answer, 0);
      const axe4 = newAnswers
        .filter((a) => QUESTIONS.find((q) => q.id === a.questionId)?.axe === 4)
        .reduce((sum, a) => sum + a.answer, 0);

      const result: DiagnosticResult = {
        totalScore: axe1 + axe2 + axe3 + axe4,
        axeScores: { axe1, axe2, axe3, axe4 },
        answers: newAnswers,
        userInfo: userInfo,
        date: new Date().toISOString(),
        id: `diag_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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
          newAnswers.forEach((a) => {
            const questionKey = `q${a.questionId}`;
            answersMap[questionKey] = a.answer;

            // Trouver la question correspondante pour obtenir son texte
            const question = QUESTIONS.find((q) => q.id === a.questionId);
            if (question) {
              questionsMap[questionKey] = question.question;
            }
          });

          const updatedDescription = formatQuizResultsToDescription(
            userInfo,
            {
              answers: answersMap,
              totalScore: result.totalScore,
              maxScore,
              percentage,
              questions: questionsMap,
            },
            "Guide: DAF pour PME"
          );

          console.log(
            "📝 DEBUG - Description (premiers 200 chars):",
            updatedDescription.substring(0, 200)
          );
          console.log("📊 DEBUG - Envoi à Odoo - leadId:", leadId);

          const updateResponse = await updateOdooLead(leadId, {
            description: updatedDescription,
          });

          console.log("✅ Lead mis à jour avec succès:", updateResponse);
          toast.success("Vos résultats ont été enregistrés avec succès ! 🎉", {
            id: updatingToast,
          });
        } catch (error) {
          console.error("Erreur lors de la mise à jour du lead:", error);
          toast.error(
            "Erreur lors de l'envoi, mais vos résultats s'affichent",
            {
              id: updatingToast,
            }
          );
          // On continue vers les résultats même si la mise à jour échoue
        }
      } else {
        console.warn(
          "⚠️ Aucun leadId trouvé - la mise à jour du lead n'a pas été effectuée"
        );
        toast.error("Impossible d'envoyer vos résultats (pas de leadId)", {
          duration: 2000,
        });
      }

      // Save to localStorage
      localStorage.setItem("daf_diagnostic_result", JSON.stringify(result));

      onComplete(result);
    }
  };

  // Intro Screen
  if (step === "intro") {
    return (
      <section className="w-full min-h-screen bg-gray-50 text-gray-900 py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif mb-6">
            Votre entreprise a-t-elle réellement besoin d&apos;un{" "}
            <span className="text-secondary">Directeur Financier</span> ?
          </h1>

          <p className="text-xl text-gray-600 mb-10">
            Un diagnostic de maturité financière pour dirigeants de PME.
            <br />
            Clair, confidentiel, sans engagement.
          </p>

          {/* Reassurance points */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: "⏱️", text: "5 à 7 min" },
              { icon: "🧠", text: 'Aucune "bonne" réponse' },
              { icon: "🔒", text: "100% confidentiel" },
              { icon: "🎯", text: "Résultat personnalisé" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm"
              >
                <span className="text-2xl block mb-2">{item.icon}</span>
                <span className="text-sm text-gray-600">{item.text}</span>
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-sm mb-10 italic">
            &ldquo;Ce diagnostic ne vous dira pas quoi faire. Il vous aidera à
            comprendre ce que vos réponses révèlent.&rdquo;
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
      <section className="w-full min-h-screen bg-gray-50">
        {/* Header with gradient */}
        <div className="pt-24 pb-12 px-6 bg-primary">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setStep("intro")}
              className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Retour
            </button>
            <div className="text-center">
              <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Diagnostic DAF – Étape 1/2
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Avant de commencer le diagnostic
              </h2>
              <p className="text-white/70">
                Quelques informations pour personnaliser vos résultats et
                recommandations
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto px-6 py-12">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Name fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={userInfo.firstName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, firstName: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    formErrors.firstName
                      ? "border-red-400"
                      : "border-gray-200 focus:border-primary"
                  } transition-colors focus:outline-none`}
                  placeholder="Votre prénom"
                />
                {formErrors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={userInfo.lastName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, lastName: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    formErrors.lastName
                      ? "border-red-400"
                      : "border-gray-200 focus:border-primary"
                  } transition-colors focus:outline-none`}
                  placeholder="Votre nom"
                />
                {formErrors.lastName && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email professionnel <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  formErrors.email
                    ? "border-red-400"
                    : "border-gray-200 focus:border-primary"
                } transition-colors focus:outline-none`}
                placeholder="votre@email.com"
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entreprise <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={userInfo.company}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, company: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  formErrors.company
                    ? "border-red-400"
                    : "border-gray-200 focus:border-primary"
                } transition-colors focus:outline-none`}
                placeholder="Nom de votre entreprise"
              />
              {formErrors.company && (
                <p className="mt-1 text-sm text-red-500">
                  {formErrors.company}
                </p>
              )}
            </div>

            {/* VAT and Revenue */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro TVA / BCE <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={userInfo.vatNumber}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, vatNumber: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    formErrors.vatNumber
                      ? "border-red-400"
                      : "border-gray-200 focus:border-primary"
                  } transition-colors focus:outline-none`}
                  placeholder="BE 0123.456.789"
                />
                {formErrors.vatNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.vatNumber}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau de CA <span className="text-red-500">*</span>
                </label>
                <select
                  value={userInfo.revenueLevel}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, revenueLevel: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    formErrors.revenueLevel
                      ? "border-red-400"
                      : "border-gray-200 focus:border-primary"
                  } transition-colors focus:outline-none bg-white`}
                >
                  <option value="">Sélectionner...</option>
                  {REVENUE_LEVELS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {formErrors.revenueLevel && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.revenueLevel}
                  </p>
                )}
              </div>
            </div>

            {/* Sector and Employees */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secteur d&apos;activité{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  value={userInfo.sector}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, sector: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    formErrors.sector
                      ? "border-red-400"
                      : "border-gray-200 focus:border-primary"
                  } transition-colors focus:outline-none bg-white`}
                >
                  <option value="">Sélectionner...</option>
                  {SECTORS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {formErrors.sector && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.sector}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre d&apos;employés <span className="text-red-500">*</span>
                </label>
                <select
                  value={userInfo.employees}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, employees: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    formErrors.employees
                      ? "border-red-400"
                      : "border-gray-200 focus:border-primary"
                  } transition-colors focus:outline-none bg-white`}
                >
                  <option value="">Sélectionner...</option>
                  {EMPLOYEES.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
                {formErrors.employees && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.employees}
                  </p>
                )}
              </div>
            </div>

            {/* Info box */}
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-primary">
                  🔒 Confidentialité :
                </span>{" "}
                Vos données sont utilisées uniquement pour personnaliser vos
                résultats et seront envoyées à notre équipe pour un suivi
                personnalisé.
              </p>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-primary hover:bg-primary/90 transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-3"
              >
                Commencer le diagnostic
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </form>
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
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            {currentAxe?.title}
          </h2>
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
            <span>
              Question {currentQuestion + 1} / {QUESTIONS.length}
            </span>
            <span>
              AXE {currentAxe?.id} — {currentAxe?.title}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-serif mb-4">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className={`w-full p-6 rounded-2xl border transition-all text-left ${
                selectedAnswer === option.value
                  ? "bg-secondary/20 border-secondary text-primary shadow-md"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
              }`}
            >
              <span className="text-2xl mr-3">{option.icon}</span>
              <span className="text-lg font-medium">{option.label}</span>
            </button>
          ))}
        </div>

        {/* Interpretation (shown after answer) */}
        {showInterpretation && selectedAnswer !== null && (
          <div className="mb-8 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm animate-fade-in">
            <p className="text-gray-600">
              <strong className="text-secondary">Ce que cela signifie :</strong>{" "}
              {
                question.options.find((o) => o.value === selectedAnswer)
                  ?.interpretation
              }
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
            className={`px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all ${
              selectedAnswer !== null
                ? "bg-secondary text-primary hover:bg-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {currentQuestion < QUESTIONS.length - 1
              ? "Question suivante"
              : "Voir mes résultats"}
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-1 mt-8 flex-wrap">
          {AXES.map((axe) => (
            <div key={axe.id} className="flex gap-1">
              {QUESTIONS.filter((q) => q.axe === axe.id).map((q) => {
                const isAnswered = answers.some((a) => a.questionId === q.id);
                const isCurrent = q.id === question.id;
                return (
                  <div
                    key={q.id}
                    className={`w-2 h-2 rounded-full transition-all ${
                      isCurrent
                        ? "w-4 bg-secondary"
                        : isAnswered
                        ? "bg-green-500"
                        : "bg-gray-200"
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

export { AXES, QUESTIONS };
