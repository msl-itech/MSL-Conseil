"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    role: string;
    employees: string;
}

interface GuideResultsProps {
    score: number;
    userInfo: UserInfo;
    onRestartQuiz: () => void;
}

interface Profile {
    id: string;
    name: string;
    emoji: string;
    color: string;
    bgColor: string;
    borderColor: string;
    description: string;
    recommendations: string[];
    nextSteps: string[];
}

const PROFILES: Record<string, Profile> = {
    debutant: {
        id: "debutant",
        name: "Débutant",
        emoji: "🔴",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        description: "Vous n'avez pas encore mis en place de contrôle de gestion. Cela signifie que vos décisions reposent essentiellement sur l'intuition.",
        recommendations: [
            "Commencez par établir un budget annuel simple",
            "Identifiez 3 à 5 indicateurs clés pour votre activité",
            "Mettez en place un suivi mensuel basique",
            "Utilisez Excel ou Google Sheets pour débuter"
        ],
        nextSteps: [
            "Un premier pas consisterait à établir un budget annuel et à suivre quelques indicateurs clés",
            "Vous pourriez bénéficier d'un accompagnement ponctuel pour structurer votre gestion"
        ]
    },
    basique: {
        id: "basique",
        name: "Basique",
        emoji: "🟠",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        description: "Vous avez commencé à suivre quelques éléments, mais cela reste informel ou ponctuel. Il est temps de poser des bases solides.",
        recommendations: [
            "Formalisez votre budget prévisionnel annuel",
            "Créez un tableau de bord avec des KPI précis",
            "Instaurez une routine de suivi mensuel",
            "Impliquez vos équipes dans le suivi des résultats"
        ],
        nextSteps: [
            "Il est temps de poser des bases solides : indicateurs, budget, tableau de bord mensuel",
            "Un outil simple ou un accompagnement personnalisé peut grandement vous aider à passer à l'étape suivante"
        ]
    },
    intermediaire: {
        id: "intermediaire",
        name: "Intermédiaire",
        emoji: "🟡",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        description: "Vous avez des éléments en place, mais ils pourraient être mieux structurés ou automatisés.",
        recommendations: [
            "Intégrez les données opérationnelles à votre pilotage",
            "Automatisez la collecte et le traitement des données",
            "Fiabilisez vos indicateurs avec des outils adaptés",
            "Envisagez un ERP comme Odoo pour centraliser vos données"
        ],
        nextSteps: [
            "L'enjeu maintenant est d'intégrer les données opérationnelles (ventes, RH, production…) à votre pilotage",
            "Des outils comme Odoo ou Agicap peuvent vous aider à fiabiliser vos indicateurs"
        ]
    },
    structure: {
        id: "structure",
        name: "Structuré",
        emoji: "🟢",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        description: "Votre entreprise est bien avancée dans sa démarche de gestion. Vous avez les outils, la méthode, et une bonne implication des équipes.",
        recommendations: [
            "Structurez le reporting stratégique pour la direction",
            "Intégrez des scénarios prévisionnels à votre analyse",
            "Développez des tableaux de bord par département",
            "Formez vos managers à l'analyse des KPI"
        ],
        nextSteps: [
            "Pour aller plus loin, vous pouvez structurer le reporting stratégique",
            "Intégrez des scénarios prévisionnels pour affiner votre prise de décision"
        ]
    },
    avance: {
        id: "avance",
        name: "Avancé",
        emoji: "🔵",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        description: "Félicitations ! Vous pilotez votre entreprise avec méthode et vision. Vous exploitez pleinement les données, vous êtes proactif dans vos décisions et vos outils sont intégrés.",
        recommendations: [
            "Explorez les analyses avancées et la Business Intelligence",
            "Intégrez l'IA pour des prédictions plus fines",
            "Optimisez en continu vos processus de pilotage",
            "Partagez vos bonnes pratiques avec votre écosystème"
        ],
        nextSteps: [
            "L'étape suivante est l'optimisation continue avec des analyses avancées",
            "Explorez l'IA et les outils de Business Intelligence pour aller encore plus loin"
        ]
    }
};

function getProfile(score: number): Profile {
    if (score <= 10) return PROFILES.debutant;
    if (score <= 20) return PROFILES.basique;
    if (score <= 30) return PROFILES.intermediaire;
    if (score <= 40) return PROFILES.structure;
    return PROFILES.avance;
}

function getScorePercentage(score: number): number {
    return (score / 50) * 100;
}

export default function GuideResults({ score, userInfo, onRestartQuiz }: GuideResultsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scoreRef = useRef<HTMLSpanElement>(null);
    const [animatedScore, setAnimatedScore] = useState(0);
    const [showShareWidget, setShowShareWidget] = useState(true);
    const [copied, setCopied] = useState(false);

    const profile = getProfile(score);
    const percentage = getScorePercentage(score);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(".result-header",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
            .fromTo(".score-circle",
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
                "-=0.3"
            )
            .fromTo(".profile-card",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.2"
            )
            .fromTo(".result-section",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" },
                "-=0.3"
            );
    }, { scope: containerRef });

    // Animate score counter
    useEffect(() => {
        let startTime: number;
        const duration = 1500; // 1.5 seconds

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setAnimatedScore(Math.round(score * easeOutQuart));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [score]);

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-gray-50">
            {/* Header */}
            <div className="result-header bg-gradient-to-br from-primary via-primary to-primary/90 pt-24 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-white/10 text-white/90 text-sm px-4 py-1.5 rounded-full mb-6">
                        Résultats du questionnaire
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Voici votre profil, {userInfo.firstName} !
                    </h1>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto">
                        Basé sur vos réponses, nous avons analysé votre niveau de maturité en contrôle de gestion.
                    </p>

                    {/* Score Circle */}
                    <div className="score-circle mt-10 relative inline-flex items-center justify-center">
                        <svg className="w-48 h-48 transform -rotate-90">
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="12"
                                fill="none"
                            />
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="url(#scoreGradient)"
                                strokeWidth="12"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={2 * Math.PI * 88}
                                strokeDashoffset={2 * Math.PI * 88 * (1 - percentage / 100)}
                                className="transition-all duration-1000"
                            />
                            <defs>
                                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#fe981a" />
                                    <stop offset="100%" stopColor="#ffc107" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span ref={scoreRef} className="text-5xl font-bold text-white">
                                {animatedScore}
                            </span>
                            <span className="text-white/60 text-sm">sur 50 points</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Card */}
            <div className="max-w-4xl mx-auto px-6 -mt-8">
                <div className={`profile-card ${profile.bgColor} rounded-3xl p-8 border-2 ${profile.borderColor} shadow-xl`}>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-4xl">{profile.emoji}</span>
                        <div>
                            <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Votre profil</p>
                            <h2 className={`text-3xl font-bold ${profile.color}`}>{profile.name}</h2>
                        </div>
                        <div className="ml-auto">
                            <span className={`text-sm font-semibold px-4 py-2 rounded-full ${profile.bgColor} ${profile.color} border ${profile.borderColor}`}>
                                {score} / 50 points
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {profile.description}
                    </p>
                </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
                {/* Scale Visualization */}
                <div className="result-section bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Où vous situez-vous ?</h3>
                    <div className="relative">
                        {/* Scale Bar */}
                        <div className="h-4 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 to-blue-400 rounded-full mb-4" />

                        {/* Marker */}
                        <div
                            className="absolute top-0 w-6 h-6 bg-white border-4 border-primary rounded-full shadow-lg transform -translate-x-1/2"
                            style={{ left: `${percentage}%` }}
                        />

                        {/* Labels */}
                        <div className="flex justify-between text-xs text-gray-500 mt-6">
                            <span>Débutant<br />0-10</span>
                            <span>Basique<br />11-20</span>
                            <span>Intermédiaire<br />21-30</span>
                            <span>Structuré<br />31-40</span>
                            <span>Avancé<br />41-50</span>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="result-section bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <span className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </span>
                        Nos recommandations pour vous
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {profile.recommendations.map((rec, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <span className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                    {i + 1}
                                </span>
                                <span className="text-gray-700">{rec}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Steps */}
                <div className="result-section bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                        Prochaines étapes
                    </h3>
                    <div className="space-y-4">
                        {profile.nextSteps.map((step, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                                <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-white/90">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Company Info Summary */}
                <div className="result-section bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Récapitulatif de votre profil</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Entreprise</p>
                                <p className="text-lg font-semibold text-gray-900">{userInfo.company}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Votre rôle</p>
                                <p className="text-lg font-semibold text-gray-900">{userInfo.role}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Taille</p>
                                <p className="text-lg font-semibold text-gray-900">{userInfo.employees}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Score obtenu</p>
                                <p className="text-lg font-semibold text-gray-900">{score} points sur 50</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="result-section bg-primary rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    {/* Decorative */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Besoin d'un accompagnement personnalisé ?
                        </h2>
                        <p className="text-white/80 max-w-xl mx-auto mb-8">
                            Nos experts peuvent vous aider à structurer votre contrôle de gestion
                            et à mettre en place les outils adaptés à votre entreprise.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-secondary/25"
                            >
                                Prendre rendez-vous
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <button
                                onClick={onRestartQuiz}
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-4 rounded-xl transition-all border border-white/20"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refaire le questionnaire
                            </button>
                        </div>
                    </div>
                </div>

                {/* Share Section */}
                <div className="result-section bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Partagez vos résultats</h3>
                    <p className="text-gray-500 text-center mb-6">Invitez d'autres dirigeants à découvrir leur profil</p>

                    <div className="grid md:grid-cols-3 gap-4">
                        {/* WhatsApp */}
                        <button
                            onClick={() => {
                                const shareUrl = `${window.location.origin}/ressources/guides/controle-gestion?shared=true&score=${score}&level=${encodeURIComponent(profile.name)}&from=${encodeURIComponent(userInfo.firstName + ' ' + userInfo.lastName)}`;
                                const message = `Salut 👋\n\nJe viens de faire un diagnostic sur le contrôle de gestion pour dirigeants de PME.\n\nJ'ai obtenu ${score}/50 (Profil ${profile.name}).\n\nCurieux d'avoir ton avis et de comparer ton profil au mien.\nTu peux voir mon score et faire le tien ici :\n\n👉 ${shareUrl}`;
                                window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
                            }}
                            className="flex items-center gap-3 p-4 bg-[#25D366]/10 rounded-xl border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors group"
                        >
                            <span className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </span>
                            <div className="text-left">
                                <p className="font-semibold text-gray-900">WhatsApp</p>
                                <p className="text-xs text-gray-500">Message naturel</p>
                            </div>
                        </button>

                        {/* LinkedIn */}
                        <button
                            onClick={() => {
                                const shareUrl = `${window.location.origin}/ressources/guides/controle-gestion?shared=true&score=${score}&level=${encodeURIComponent(profile.name)}&from=${encodeURIComponent(userInfo.firstName + ' ' + userInfo.lastName)}`;
                                const message = `Bonjour,\n\nJe viens de faire un diagnostic sur le contrôle de gestion pour dirigeants de PME.\n\nJ'ai obtenu ${score}/50 (Profil ${profile.name}).\n\nCurieux d'avoir ton regard de dirigeant. Tu peux voir mon score et faire le tien ici :\n\n👉 ${shareUrl}`;
                                navigator.clipboard.writeText(message);
                                alert('Message LinkedIn copié ! Collez-le dans votre conversation LinkedIn.');
                            }}
                            className="flex items-center gap-3 p-4 bg-[#0077B5]/10 rounded-xl border border-[#0077B5]/20 hover:bg-[#0077B5]/20 transition-colors group"
                        >
                            <span className="w-12 h-12 bg-[#0077B5] text-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </span>
                            <div className="text-left">
                                <p className="font-semibold text-gray-900">LinkedIn</p>
                                <p className="text-xs text-gray-500">Message pro</p>
                            </div>
                        </button>

                        {/* Copy Link */}
                        <button
                            onClick={() => {
                                const shareUrl = `${window.location.origin}/ressources/guides/controle-gestion?shared=true&score=${score}&level=${encodeURIComponent(profile.name)}&from=${encodeURIComponent(userInfo.firstName + ' ' + userInfo.lastName)}`;
                                const message = `Diagnostic contrôle de gestion - J'ai obtenu ${score}/50 (Profil ${profile.name}).\n\nCurieux d'avoir ton avis.\n👉 ${shareUrl}`;
                                navigator.clipboard.writeText(message);
                                alert('Message copié dans le presse-papiers !');
                            }}
                            className="flex items-center gap-3 p-4 bg-gray-100 rounded-xl border border-gray-200 hover:bg-gray-200 transition-colors group"
                        >
                            <span className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <div className="text-left">
                                <p className="font-semibold text-gray-900">Copier</p>
                                <p className="text-xs text-gray-500">Message court</p>
                            </div>
                        </button>
                    </div>

                    <p className="text-center text-gray-400 text-sm mt-6 italic">
                        "Les diagnostics les plus utiles sont ceux qui déclenchent une discussion."
                    </p>
                </div>

                {/* Back to Resources */}
                <div className="text-center pb-8">
                    <Link
                        href="/ressources"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Retour aux ressources
                    </Link>
                </div>
            </div>

            {/* ======================================= */}
            {/* SHARE WIDGET - DESKTOP */}
            {/* ======================================= */}
            {showShareWidget && (
                <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-40 w-72">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 relative">
                        {/* Close button */}
                        <button
                            onClick={() => setShowShareWidget(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h4 className="text-lg font-bold text-gray-900 mb-2">🔎 Comparer votre niveau ?</h4>
                        <p className="text-sm text-gray-600 mb-4">
                            Les dirigeants confrontent souvent leur profil de contrôle de gestion.<br /><br />
                            <span className="font-medium">Partage ton diagnostic</span> pour avoir un retour ou inviter un autre dirigeant à se situer.
                        </p>

                        {/* Share buttons */}
                        <div className="space-y-2">
                            <button
                                onClick={() => {
                                    const shareUrl = `${window.location.origin}/ressources/guides/controle-gestion?shared=true&score=${score}&level=${encodeURIComponent(profile.name)}&from=${encodeURIComponent(userInfo.firstName + ' ' + userInfo.lastName)}`;
                                    const message = `Salut 👋\n\nJe viens de faire un diagnostic sur le contrôle de gestion pour dirigeants de PME.\n\nJ'ai obtenu ${score}/50 (Profil ${profile.name}).\n\nCurieux d'avoir ton avis et de comparer.\n\n👉 ${shareUrl}`;
                                    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
                                }}
                                className="w-full p-3 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center gap-3 hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20 text-sm font-medium"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Partager sur WhatsApp
                            </button>

                            <button
                                onClick={() => {
                                    const shareUrl = `${window.location.origin}/ressources/guides/controle-gestion?shared=true&score=${score}&level=${encodeURIComponent(profile.name)}&from=${encodeURIComponent(userInfo.firstName + ' ' + userInfo.lastName)}`;
                                    const message = `Bonjour,\n\nJe viens de faire un diagnostic sur le contrôle de gestion.\n\nJ'ai obtenu ${score}/50 (Profil ${profile.name}).\n\nCurieux d'avoir ton regard.\n\n👉 ${shareUrl}`;
                                    navigator.clipboard.writeText(message);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 3000);
                                }}
                                className="w-full p-3 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center gap-3 hover:bg-[#0A66C2]/20 transition-colors border border-[#0A66C2]/20 text-sm font-medium"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                Envoyer sur LinkedIn
                            </button>

                            <button
                                onClick={() => {
                                    const shareUrl = `${window.location.origin}/ressources/guides/controle-gestion?shared=true&score=${score}&level=${encodeURIComponent(profile.name)}&from=${encodeURIComponent(userInfo.firstName + ' ' + userInfo.lastName)}`;
                                    const message = `Diagnostic contrôle de gestion - ${score}/50 (Profil ${profile.name}).\n👉 ${shareUrl}`;
                                    navigator.clipboard.writeText(message);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 3000);
                                }}
                                className="w-full p-3 rounded-xl bg-gray-100 text-gray-700 flex items-center gap-3 hover:bg-gray-200 transition-colors border border-gray-200 text-sm font-medium"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                {copied ? "✅ Lien copié !" : "Copier le lien"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ======================================= */}
            {/* SHARE WIDGET - MOBILE */}
            {/* ======================================= */}
            {showShareWidget && (
                <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 safe-area-inset-bottom">
                    <div className="max-w-lg mx-auto">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="font-bold text-gray-900 text-sm">🔎 Comparer votre profil ?</p>
                                <p className="text-xs text-gray-500">Partage ce diagnostic à un autre dirigeant.</p>
                            </div>
                            <button
                                onClick={() => setShowShareWidget(false)}
                                className="text-gray-400 hover:text-gray-600 p-1"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    const shareUrl = `${window.location.origin}/ressources/guides/controle-gestion?shared=true&score=${score}&level=${encodeURIComponent(profile.name)}&from=${encodeURIComponent(userInfo.firstName + ' ' + userInfo.lastName)}`;
                                    const message = `J'ai obtenu ${score}/50 au diagnostic contrôle de gestion.\n${shareUrl}`;
                                    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
                                }}
                                className="flex-1 p-3 rounded-xl bg-[#25D366] text-white flex items-center justify-center gap-2 text-sm font-medium"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp
                            </button>
                            <button
                                onClick={() => {
                                    const shareUrl = `${window.location.origin}/ressources/guides/controle-gestion?shared=true&score=${score}&level=${encodeURIComponent(profile.name)}&from=${encodeURIComponent(userInfo.firstName + ' ' + userInfo.lastName)}`;
                                    const message = `J'ai obtenu ${score}/50 au diagnostic contrôle de gestion.\n${shareUrl}`;
                                    navigator.clipboard.writeText(message);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 3000);
                                }}
                                className="flex-1 p-3 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center gap-2 text-sm font-medium"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn
                            </button>
                            <button
                                onClick={() => {
                                    const shareUrl = `${window.location.origin}/ressources/guides/controle-gestion?shared=true&score=${score}&level=${encodeURIComponent(profile.name)}&from=${encodeURIComponent(userInfo.firstName + ' ' + userInfo.lastName)}`;
                                    navigator.clipboard.writeText(shareUrl);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 3000);
                                }}
                                className="p-3 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center"
                            >
                                {copied ? (
                                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
