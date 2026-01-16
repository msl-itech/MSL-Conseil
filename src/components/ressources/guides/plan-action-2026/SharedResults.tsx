"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface SharedResultsProps {
    score: number;
    level: string;
    from?: string;
    onStartDiagnostic: () => void;
    onReadGuide: () => void;
}

const getLevelInfo = (level: string) => {
    const levels: Record<string, { emoji: string; color: string; bg: string }> = {
        "Leader": { emoji: "🏆", color: "text-purple-600", bg: "bg-purple-100" },
        "Avancé": { emoji: "🚀", color: "text-blue-600", bg: "bg-blue-100" },
        "Intermédiaire": { emoji: "📈", color: "text-yellow-600", bg: "bg-yellow-100" },
        "Débutant": { emoji: "🌱", color: "text-green-600", bg: "bg-green-100" }
    };
    return levels[level] || levels["Débutant"];
};

export default function SharedResults({
    score,
    level,
    from,
    onStartDiagnostic,
    onReadGuide
}: SharedResultsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const levelInfo = getLevelInfo(level);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(".shared-element",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-linear-to-br from-primary via-primary to-primary/90">
            {/* Header decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-2xl mx-auto px-6 pt-32 pb-20">
                {/* Badge */}
                <div className="shared-element flex justify-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 text-white border border-white/20">
                        <span className="text-lg">📊</span>
                        <span className="font-medium">Résultat partagé</span>
                    </div>
                </div>

                {/* Message */}
                <div className="shared-element text-center mb-10">
                    {from ? (
                        <>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                {from} vous invite à comparer votre niveau de pilotage !
                            </h1>
                            <p className="text-white/80 text-lg">
                                Voici son score au diagnostic "Plan d'Action Gestion 2025"
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Un collaborateur vous invite à comparer !
                            </h1>
                            <p className="text-white/80 text-lg">
                                Découvrez son score et comparez votre niveau de maturité
                            </p>
                        </>
                    )}
                </div>

                {/* Score card */}
                <div className="shared-element bg-white rounded-3xl p-8 shadow-2xl mb-8">
                    <div className="text-center">
                        <p className="text-gray-500 mb-2">Score obtenu</p>

                        {/* Score circle */}
                        <div className="relative w-36 h-36 mx-auto mb-6">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="72" cy="72" r="62" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                                <circle
                                    cx="72"
                                    cy="72"
                                    r="62"
                                    fill="none"
                                    stroke="#EF4444"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    strokeDasharray={`${(score / 100) * 390} 390`}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-gray-900">{score}</span>
                                <span className="text-gray-500 text-sm">%</span>
                            </div>
                        </div>

                        {/* Level badge */}
                        <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${levelInfo.bg} ${levelInfo.color} font-bold text-lg`}>
                            <span>{levelInfo.emoji}</span>
                            Niveau {level}
                        </div>

                        {from && (
                            <p className="mt-6 text-gray-600">
                                Résultat de <span className="font-semibold">{from}</span>
                            </p>
                        )}
                    </div>
                </div>

                {/* Challenge message */}
                <div className="shared-element bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8 text-center">
                    <p className="text-white text-lg">
                        💡 <span className="font-medium">La question :</span> Êtes-vous au même niveau de maturité en pilotage de gestion ?
                    </p>
                </div>

                {/* CTAs */}
                <div className="shared-element flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onStartDiagnostic}
                        className="flex-1 bg-secondary text-white font-semibold py-4 px-8 rounded-xl hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/25 flex items-center justify-center gap-2"
                    >
                        <span>🎯</span>
                        Faire mon diagnostic
                    </button>
                    <button
                        onClick={onReadGuide}
                        className="flex-1 bg-white/10 backdrop-blur-sm text-white font-medium py-4 px-8 rounded-xl hover:bg-white/20 transition-all border border-white/30 flex items-center justify-center gap-2"
                    >
                        <span>📖</span>
                        Lire le guide d'abord
                    </button>
                </div>

                {/* Additional info */}
                <div className="shared-element mt-12 text-center">
                    <p className="text-white/60 text-sm">
                        Ce diagnostic évalue votre niveau de maturité en contrôle de gestion à travers 20 critères répartis en 4 phases.<br />
                        Durée estimée : 3-4 minutes.
                    </p>
                </div>
            </div>
        </div>
    );
}
