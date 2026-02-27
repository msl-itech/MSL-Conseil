"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getMaturityPath, getMaturityLevel, getRecommendation } from "@/lib/diagnosticRecommendations";
import type { DiagnosticType } from "@/lib/diagnosticRecommendations";

// Helper function to load diagnostic data from localStorage
function loadDiagnosticData() {
    if (typeof window === 'undefined') return null;

    // Check for all diagnostics and return the most recent one
    const diagnostics = [
        {
            key: 'daf_diagnostic_result',
            type: 'daf' as DiagnosticType,
            maxScore: 48
        },
        {
            key: 'controle_fondamentaux_result',
            type: 'controle-fondamentaux' as DiagnosticType,
            maxScore: 50
        },
        {
            key: 'automatisation_result',
            type: 'automatisation' as DiagnosticType,
            maxScore: 48
        },
        {
            key: 'structuration_result',
            type: 'structuration' as DiagnosticType,
            maxScore: 17
        },
        {
            key: 'plan_action_2026_result',
            type: 'plan-action-2026' as DiagnosticType,
            maxScore: 20
        },
    ];

    let mostRecent = null;
    let mostRecentDate = null;

    for (const diag of diagnostics) {
        const saved = localStorage.getItem(diag.key);
        if (saved) {
            try {
                const result = JSON.parse(saved);
                const timestamp = result.timestamp ? new Date(result.timestamp) : new Date(0);

                if (!mostRecentDate || timestamp > mostRecentDate) {
                    mostRecentDate = timestamp;
                    mostRecent = {
                        diagnostic: diag.type,
                        score: result.totalScore,
                        maxScore: diag.maxScore,
                        level: getMaturityLevel(result.totalScore, diag.maxScore, diag.type)
                    };
                }
            } catch {
                // Ignore invalid data
            }
        }
    }

    return mostRecent;
}

export default function TrajectoirePage() {
    // Lazy initialization - only runs once on mount
    const [diagnosticData] = useState(() => loadDiagnosticData());

    const hasResults = diagnosticData !== null;
    const diagnostic = diagnosticData?.diagnostic || 'structuration';
    const level = diagnosticData?.level || 'fragile';
    const score = diagnosticData?.score || 0;
    const maxScore = diagnosticData?.maxScore || 48;

    const path = hasResults ? getMaturityPath(diagnostic, level) : null;
    const recommendation = hasResults ? getRecommendation(diagnostic, level) : null;

    return (
        <main className="w-full bg-white" suppressHydrationWarning>
            {/* Hero */}
            <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 text-white px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                        alt="Trajectoire de maturité"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                        Votre parcours de progression
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif mb-6">
                        Trajectoire de maturité financière
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Visualisez votre niveau actuel et les étapes logiques pour structurer progressivement votre pilotage financier
                    </p>
                </div>
            </section>

            {hasResults && path && recommendation ? (
                <>
                    {/* Current Position */}
                    <section className="py-24 px-6">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                                    Votre position actuelle
                                </h2>
                                <p className="text-gray-600">Diagnostic complété : {path.current.title}</p>
                            </div>

                            <div className="bg-gradient-to-br from-secondary/10 to-white rounded-3xl p-10 border-2 border-secondary/30 shadow-xl">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                                        {score}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-serif text-gray-900 mb-2">
                                            Niveau : {path.current.level.charAt(0).toUpperCase() + path.current.level.slice(1)}
                                        </h3>
                                        <p className="text-gray-600">Score obtenu : {score}/{maxScore}</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 border border-secondary/20">
                                    <h4 className="font-bold text-gray-900 mb-3">Vision à 12 mois</h4>
                                    <p className="text-gray-700">{path.vision12Months}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Path Visualization */}
                    <section className="py-24 px-6 bg-gray-50">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-12 text-center">
                                Votre parcours de progression
                            </h2>

                            <div className="grid gap-6">
                                {/* Step 1 - Current */}
                                <div className="flex items-start gap-4">
                                    <div className="flex flex-col items-center flex-shrink-0">
                                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="w-1 h-20 bg-secondary/30"></div>
                                    </div>
                                    <div className="flex-1 bg-white rounded-2xl p-6 border-2 border-secondary shadow-sm">
                                        <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary text-xs font-bold rounded-full mb-3">
                                            ÉTAPE ACTUELLE
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{path.current.title}</h3>
                                        <p className="text-gray-600">Diagnostic complété avec succès</p>
                                    </div>
                                </div>

                                {/* Step 2 - Next */}
                                <div className="flex items-start gap-4">
                                    <div className="flex flex-col items-center flex-shrink-0">
                                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                                            2
                                        </div>
                                        <div className="w-1 h-20 bg-gray-200"></div>
                                    </div>
                                    <div className="flex-1 bg-gradient-to-br from-primary/5 to-white rounded-2xl p-6 border-2 border-primary/30 shadow-sm">
                                        <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full mb-3">
                                            PROCHAINE ÉTAPE
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{path.next.title}</h3>
                                        <p className="text-gray-600 mb-4">{path.next.description}</p>
                                        {recommendation.nextStep === 'audit-strategique' ? (
                                            <a
                                                href={recommendation.ctaUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors"
                                            >
                                                {recommendation.ctaText}
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </a>
                                        ) : (
                                            <Link
                                                href={recommendation.ctaUrl}
                                                className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors"
                                            >
                                                Commencer cette étape
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                {/* Step 3 - Future */}
                                <div className="flex items-start gap-4">
                                    <div className="flex flex-col items-center flex-shrink-0">
                                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                                            3
                                        </div>
                                    </div>
                                    <div className="flex-1 bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
                                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full mb-3">
                                            ÉTAPE FUTURE
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{path.future.title}</h3>
                                        <p className="text-gray-600">{path.future.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA to continue journey */}
                    <section className="py-24 px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-serif text-gray-900 mb-6">
                                Prêt à passer à l&apos;étape suivante ?
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Chaque étape vous rapproche d&apos;un pilotage financier structuré et d&apos;une croissance maîtrisée.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {recommendation.nextStep === 'audit-strategique' ? (
                                    <a
                                        href={recommendation.ctaUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 bg-primary text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-secondary transition-colors shadow-xl"
                                    >
                                        {recommendation.ctaText}
                                    </a>
                                ) : (
                                    <Link
                                        href={recommendation.ctaUrl}
                                        className="px-8 py-4 bg-primary text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-secondary transition-colors shadow-xl"
                                    >
                                        Continuer le parcours
                                    </Link>
                                )}
                                <Link
                                    href="/diagnostic"
                                    className="px-8 py-4 border border-gray-300 text-gray-700 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-gray-100 transition-colors"
                                >
                                    Voir tous les diagnostics
                                </Link>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    {/* Generic view - No results yet */}
                    <section className="py-24 px-6">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                                    Découvrez votre parcours de maturité
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    Complétez un diagnostic pour visualiser votre trajectoire personnalisée
                                </p>
                            </div>

                            {/* Maturity Path Overview */}
                            <div className="grid gap-6 mb-16">
                                {[
                                    {
                                        step: 1,
                                        title: 'Structuration des bases',
                                        description: 'Plan comptable clair, processus documentés, organisation solide',
                                        icon: '🏗️'
                                    },
                                    {
                                        step: 2,
                                        title: 'Contrôle de gestion',
                                        description: 'Comprendre vos marges, suivre vos indicateurs, piloter vos décisions',
                                        icon: '📊'
                                    },
                                    {
                                        step: 3,
                                        title: 'Automatisation',
                                        description: 'Gagner du temps, fiabiliser les processus, se concentrer sur l\'essentiel',
                                        icon: '⚙️'
                                    },
                                    {
                                        step: 4,
                                        title: 'Direction Financière',
                                        description: 'Vision stratégique, anticipation, pilotage de la croissance',
                                        icon: '🎯'
                                    }
                                ].map((item) => (
                                    <div key={item.step} className="flex items-start gap-4">
                                        <div className="flex flex-col items-center flex-shrink-0">
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                                                {item.icon}
                                            </div>
                                            {item.step < 4 && <div className="w-1 h-20 bg-gray-200"></div>}
                                        </div>
                                        <div className="flex-1 bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded">
                                                    ÉTAPE {item.step}
                                                </span>
                                                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                                            </div>
                                            <p className="text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA to start */}
                            <div className="text-center bg-gradient-to-br from-primary/5 to-white rounded-3xl p-10 border-2 border-primary/20">
                                <h3 className="text-2xl font-serif text-gray-900 mb-4">
                                    Où vous situez-vous dans ce parcours ?
                                </h3>
                                <p className="text-gray-600 mb-8">
                                    Faites un diagnostic pour obtenir une trajectoire personnalisée et des recommandations adaptées à votre situation.
                                </p>
                                <Link
                                    href="/diagnostic"
                                    className="inline-block px-8 py-4 bg-primary text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-secondary transition-colors shadow-xl"
                                >
                                    Commencer un diagnostic
                                </Link>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </main>
    );
}
