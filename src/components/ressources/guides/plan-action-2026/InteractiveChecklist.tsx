"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { UserData } from "./ChecklistForm";

interface InteractiveChecklistProps {
    userName: string;
    onComplete: (answers: ChecklistAnswers, score: number) => void;
    onBack: () => void;
}

export interface ChecklistAnswers {
    [key: string]: boolean;
}

export const PHASES = [
    {
        id: 1,
        title: "État des lieux",
        icon: "🔍",
        description: "Faites le point sur votre situation actuelle",
        items: [
            { id: "p1_q1", text: "J'ai identifié les outils actuellement utilisés (Excel, ERP, CRM…)" },
            { id: "p1_q2", text: "J'ai fait l'inventaire des indicateurs déjà suivis" },
            { id: "p1_q3", text: "J'ai évalué ma maturité de gestion (débutant, intermédiaire, avancé)" },
            { id: "p1_q4", text: "J'ai clarifié mes priorités stratégiques" },
            { id: "p1_q5", text: "J'ai mobilisé les parties prenantes clés" }
        ]
    },
    {
        id: 2,
        title: "Mise en place des fondamentaux",
        icon: "🛠️",
        description: "Posez les bases d'un pilotage efficace",
        items: [
            { id: "p2_q1", text: "J'ai formalisé un budget annuel écrit" },
            { id: "p2_q2", text: "J'ai défini mes 3 objectifs chiffrés prioritaires" },
            { id: "p2_q3", text: "J'ai mis en place une prévision de trésorerie sur 12 semaines" },
            { id: "p2_q4", text: "J'ai identifié et je suis au moins 5 KPI essentiels" },
            { id: "p2_q5", text: "J'ai mis en place un premier tableau de bord" }
        ]
    },
    {
        id: 3,
        title: "Suivi & Pilotage actif",
        icon: "📊",
        description: "Passez à l'action et suivez vos progrès",
        items: [
            { id: "p3_q1", text: "J'organise une réunion de pilotage mensuelle" },
            { id: "p3_q2", text: "J'analyse les écarts budget/réalisé chaque mois" },
            { id: "p3_q3", text: "J'ai une visibilité sur ma trésorerie à 30 jours" },
            { id: "p3_q4", text: "J'ai identifié un indicateur RSE pertinent" },
            { id: "p3_q5", text: "Je compare mes marges par produit/client" }
        ]
    },
    {
        id: 4,
        title: "Automatisation & Amélioration",
        icon: "⚙️",
        description: "Optimisez et pérennisez vos processus",
        items: [
            { id: "p4_q1", text: "J'ai automatisé au moins un flux de données" },
            { id: "p4_q2", text: "J'ai mis en place un tableau de bord dynamique" },
            { id: "p4_q3", text: "J'ai défini une procédure d'actualisation régulière" },
            { id: "p4_q4", text: "J'ai cartographié mes risques critiques" },
            { id: "p4_q5", text: "J'ai mis en place un plan de continuité" }
        ]
    }
];

export default function InteractiveChecklist({ userName, onComplete, onBack }: InteractiveChecklistProps) {
    const [currentPhase, setCurrentPhase] = useState(0);
    const [answers, setAnswers] = useState<ChecklistAnswers>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const phaseRef = useRef<HTMLDivElement>(null);

    const phase = PHASES[currentPhase];
    const totalItems = PHASES.reduce((acc, p) => acc + p.items.length, 0);
    const checkedItems = Object.values(answers).filter(Boolean).length;
    const progress = (checkedItems / totalItems) * 100;

    useGSAP(() => {
        gsap.fromTo(".checklist-item",
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power3.out" }
        );
    }, { scope: phaseRef, dependencies: [currentPhase] });

    const toggleItem = (itemId: string) => {
        setAnswers(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    const handleNext = () => {
        if (currentPhase < PHASES.length - 1) {
            setCurrentPhase(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            // Calculate score
            const score = Object.values(answers).filter(Boolean).length;
            onComplete(answers, score);
        }
    };

    const handlePrevious = () => {
        if (currentPhase > 0) {
            setCurrentPhase(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            onBack();
        }
    };

    const phaseCheckedCount = phase.items.filter(item => answers[item.id]).length;

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-gray-50">
            {/* Header */}
            <div className="w-full bg-linear-to-br from-primary to-primary/90 pt-28 pb-16 px-6">
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={handlePrevious}
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {currentPhase === 0 ? "Retour aux informations" : `Phase ${currentPhase}`}
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                            <span className="text-3xl">{phase.icon}</span>
                        </div>
                        <div>
                            <span className="text-white/60 text-sm font-medium uppercase tracking-wider">
                                Phase {phase.id}/{PHASES.length} • Étape 2/3
                            </span>
                            <h1 className="text-2xl md:text-3xl font-bold text-white">{phase.title}</h1>
                        </div>
                    </div>

                    <p className="text-white/80 text-lg mb-6">{phase.description}</p>

                    {/* Progress bar */}
                    <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full bg-secondary rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-white/60 text-sm mt-2">
                        <span>{checkedItems} / {totalItems} éléments validés</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                </div>
            </div>

            {/* Checklist */}
            <div ref={phaseRef} className="max-w-2xl mx-auto px-6 py-12">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <span>{phase.icon}</span> {phase.title}
                        </h3>
                        <span className="text-sm text-gray-500">{phaseCheckedCount}/{phase.items.length} validés</span>
                    </div>

                    <div className="space-y-3">
                        {phase.items.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={`checklist-item w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-start gap-4 ${answers[item.id]
                                    ? "border-green-400 bg-green-50"
                                    : "border-gray-200 hover:border-primary/40 bg-white"
                                    }`}
                            >
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all ${answers[item.id]
                                    ? "bg-green-500"
                                    : "border-2 border-gray-300"
                                    }`}>
                                    {answers[item.id] && (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className={`text-sm font-medium ${answers[item.id] ? "text-green-800" : "text-gray-700"}`}>
                                    {item.text}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation buttons */}
                <div className="flex gap-4 mt-8">
                    <button
                        onClick={handlePrevious}
                        className="flex-1 py-4 px-6 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all"
                    >
                        Précédent
                    </button>
                    <button
                        onClick={handleNext}
                        className="flex-1 py-4 px-6 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                    >
                        {currentPhase < PHASES.length - 1 ? "Phase suivante" : "Voir mes résultats"}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

                {/* Phase navigation dots - after buttons */}
                <div className="flex justify-center gap-2 mt-6">
                    {PHASES.map((p, i) => (
                        <button
                            key={p.id}
                            onClick={() => setCurrentPhase(i)}
                            className={`w-3 h-3 rounded-full transition-all ${i === currentPhase
                                ? "bg-primary scale-125"
                                : i < currentPhase
                                    ? "bg-green-400"
                                    : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
