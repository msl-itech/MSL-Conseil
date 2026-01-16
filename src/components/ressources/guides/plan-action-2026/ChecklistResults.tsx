"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { UserData } from "./ChecklistForm";
import { ChecklistAnswers } from "./InteractiveChecklist";

interface ChecklistResultsProps {
    score: number;
    maxScore: number;
    answers: ChecklistAnswers;
    userInfo: UserData;
    onRestart: () => void;
}

const PHASES_SUMMARY = [
    { id: 1, name: "État des lieux", icon: "🔍", prefix: "p1_" },
    { id: 2, name: "Fondamentaux", icon: "🛠️", prefix: "p2_" },
    { id: 3, name: "Suivi & Pilotage", icon: "📊", prefix: "p3_" },
    { id: 4, name: "Automatisation", icon: "⚙️", prefix: "p4_" }
];

const getLevel = (percentage: number) => {
    if (percentage >= 80) return { label: "Leader", color: "text-purple-600", bg: "bg-purple-100", emoji: "🏆", message: "Félicitations ! Vous avez atteint un niveau d'excellence. Continuez à innover et partagez vos bonnes pratiques." };
    if (percentage >= 60) return { label: "Avancé", color: "text-blue-600", bg: "bg-blue-100", emoji: "🚀", message: "Vous êtes sur la bonne voie ! Quelques ajustements vous permettront d'atteindre l'excellence." };
    if (percentage >= 40) return { label: "Intermédiaire", color: "text-yellow-600", bg: "bg-yellow-100", emoji: "📈", message: "Vous avez posé de bonnes bases. Il est temps d'accélérer sur les fondamentaux." };
    return { label: "Débutant", color: "text-green-600", bg: "bg-green-100", emoji: "🌱", message: "Vous démarrez votre parcours. Ce diagnostic vous donne une feuille de route claire." };
};

export default function ChecklistResults({ score, maxScore, answers, userInfo, onRestart }: ChecklistResultsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showFloatingWidget, setShowFloatingWidget] = useState(true);

    const percentage = Math.round((score / maxScore) * 100);
    const level = getLevel(percentage);

    useGSAP(() => {
        gsap.fromTo(".result-element",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
        );

        // Animate score counter
        gsap.fromTo(".score-number",
            { textContent: 0 },
            {
                textContent: percentage,
                duration: 1.5,
                ease: "power2.out",
                snap: { textContent: 1 }
            }
        );
    }, { scope: containerRef });

    const getPhaseScore = (prefix: string) => {
        const phaseAnswers = Object.entries(answers).filter(([key]) => key.startsWith(prefix));
        const checked = phaseAnswers.filter(([, value]) => value).length;
        return { checked, total: 5 };
    };

    const generateShareUrl = () => {
        const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
        const fullName = `${userInfo.firstName} ${userInfo.lastName}`;
        return `${baseUrl}/ressources/guides/plan-action-2026?shared=true&score=${percentage}&level=${encodeURIComponent(level.label)}&from=${encodeURIComponent(fullName)}`;
    };

    const shareMessage = `🎯 J'ai réalisé mon auto-diagnostic de contrôle de gestion PME et obtenu ${percentage}% (niveau ${level.label}).

📊 Où en êtes-vous dans votre organisation ?

Faites le test en 3 minutes et comparez vos pratiques de pilotage financier avec d'autres dirigeants :
${generateShareUrl()}

#PME #Gestion #Finance #Pilotage`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareMessage);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleShare = async (platform: string) => {
        const url = generateShareUrl();
        const text = encodeURIComponent(shareMessage);

        switch (platform) {
            case "linkedin":
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
                break;
            case "twitter":
                window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
                break;
            case "whatsapp":
                window.open(`https://wa.me/?text=${text}`, "_blank");
                break;
            case "email":
                window.open(`mailto:?subject=Auto-diagnostic contrôle de gestion PME&body=${text}`, "_blank");
                break;
        }
        setShowShareModal(false);
    };

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-gray-50">
            {/* Header */}
            <div className="w-full bg-linear-to-br from-primary to-primary/90 pt-28 pb-20 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="result-element inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-white/80 text-sm font-medium mb-6">
                        <span>✅</span> Étape 3/3 • Résultats
                    </div>

                    <h1 className="result-element text-3xl md:text-4xl font-bold text-white mb-4">
                        Bravo {userInfo.firstName} ! {level.emoji}
                    </h1>

                    <p className="result-element text-white/80 text-lg">
                        Votre niveau de maturité en contrôle de gestion
                    </p>

                    {/* Score Circle */}
                    <div className="result-element mt-10 flex flex-col items-center">
                        <div className="relative w-40 h-40">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="12" />
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    fill="none"
                                    stroke="#EF4444"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                    strokeDasharray={`${(percentage / 100) * 440} 440`}
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="score-number text-5xl font-bold text-white">0</span>
                                <span className="text-white/60 text-sm">%</span>
                            </div>
                        </div>

                        <div className={`mt-6 px-6 py-3 rounded-full ${level.bg} ${level.color} font-bold text-lg`}>
                            Niveau {level.label}
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Content */}
            <div className="max-w-2xl mx-auto px-6 py-12">
                {/* Message */}
                <div className="result-element bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                    <p className="text-gray-700 text-lg">{level.message}</p>
                </div>

                {/* Phase breakdown */}
                <div className="result-element bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                    <h3 className="font-bold text-gray-900 mb-6">Détail par phase</h3>
                    <div className="space-y-4">
                        {PHASES_SUMMARY.map(phase => {
                            const { checked, total } = getPhaseScore(phase.prefix);
                            const phasePercent = (checked / total) * 100;
                            return (
                                <div key={phase.id}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span>{phase.icon}</span>
                                            <span className="font-medium text-gray-900">{phase.name}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">{checked}/{total}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-primary transition-all duration-500"
                                            style={{ width: `${phasePercent}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Share CTA */}
                <div className="result-element bg-linear-to-br from-secondary to-secondary/90 rounded-2xl p-8 text-white text-center mb-8">
                    <h3 className="text-xl font-bold mb-3">🎯 Invitez vos collaborateurs</h3>
                    <p className="text-white/80 mb-6">
                        Partagez ce diagnostic avec les autres décideurs de votre entreprise pour comparer vos visions et aligner vos priorités.
                    </p>
                    <button
                        onClick={() => setShowShareModal(true)}
                        className="inline-flex items-center gap-2 bg-white text-secondary font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Partager le diagnostic
                    </button>
                </div>

                {/* Next steps */}
                <div className="result-element bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                    <h3 className="font-bold text-gray-900 mb-4">📌 Prochaines étapes recommandées</h3>
                    <ul className="space-y-3">
                        {[
                            "Téléchargez le guide PDF complet avec toutes les études de cas",
                            "Planifiez un échange avec nos consultants pour un accompagnement personnalisé",
                            "Partagez vos résultats avec votre équipe de direction"
                        ].map((step, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700">
                                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm shrink-0">{i + 1}</span>
                                {step}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Actions */}
                <div className="result-element flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onRestart}
                        className="flex-1 py-4 px-6 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all"
                    >
                        Refaire le diagnostic
                    </button>
                    <a
                        href="/contact"
                        className="flex-1 py-4 px-6 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all text-center"
                    >
                        Demander un accompagnement
                    </a>
                </div>
            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowShareModal(false)}>
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Partager le diagnostic</h3>
                            <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <p className="text-gray-600 mb-6">
                            Invitez d&apos;autres décideurs à faire le diagnostic et comparer leurs pratiques de pilotage.
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <button onClick={() => handleShare("linkedin")} className="flex items-center justify-center gap-2 p-4 rounded-xl bg-[#0A66C2] text-white font-medium hover:opacity-90 transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                LinkedIn
                            </button>
                            <button onClick={() => handleShare("twitter")} className="flex items-center justify-center gap-2 p-4 rounded-xl bg-[#1DA1F2] text-white font-medium hover:opacity-90 transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                                Twitter
                            </button>
                            <button onClick={() => handleShare("whatsapp")} className="flex items-center justify-center gap-2 p-4 rounded-xl bg-[#25D366] text-white font-medium hover:opacity-90 transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                WhatsApp
                            </button>
                            <button onClick={() => handleShare("email")} className="flex items-center justify-center gap-2 p-4 rounded-xl bg-gray-700 text-white font-medium hover:opacity-90 transition-all">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                Email
                            </button>
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-sm text-gray-500 mb-2">Ou copier le lien :</p>
                            <button
                                onClick={handleCopyLink}
                                className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${copied
                                    ? "border-green-400 bg-green-50 text-green-700"
                                    : "border-gray-200 hover:border-primary text-gray-700"
                                    }`}
                            >
                                {copied ? (
                                    <>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Copié !
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        Copier le message de partage
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ======================================= */}
            {/* FLOATING SHARE WIDGET - DESKTOP */}
            {/* ======================================= */}
            {showFloatingWidget && (
                <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-40 w-72">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 relative">
                        {/* Close button */}
                        <button
                            onClick={() => setShowFloatingWidget(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h4 className="text-lg font-bold text-gray-900 mb-2">🎯 Inviter un collaborateur ?</h4>
                        <p className="text-sm text-gray-600 mb-4">
                            Comparez votre niveau avec d'autres décideurs de votre entreprise.<br /><br />
                            <span className="font-medium">Partagez votre score</span> pour aligner vos priorités de pilotage.
                        </p>

                        {/* Share buttons */}
                        <div className="space-y-2">
                            <button
                                onClick={() => handleShare("whatsapp")}
                                className="w-full p-3 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center gap-3 hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20 text-sm font-medium"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Partager sur WhatsApp
                            </button>

                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(shareMessage);
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
                                onClick={handleCopyLink}
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
            {/* FLOATING SHARE WIDGET - MOBILE */}
            {/* ======================================= */}
            {showFloatingWidget && (
                <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 safe-area-inset-bottom">
                    <div className="max-w-lg mx-auto">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="font-bold text-gray-900 text-sm">🎯 Comparer avec un collaborateur ?</p>
                                <p className="text-xs text-gray-500">Partagez ce diagnostic pour aligner vos priorités.</p>
                            </div>
                            <button
                                onClick={() => setShowFloatingWidget(false)}
                                className="text-gray-400 hover:text-gray-600 p-1"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleShare("whatsapp")}
                                className="flex-1 p-3 rounded-xl bg-[#25D366] text-white flex items-center justify-center gap-2 text-sm font-medium"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp
                            </button>
                            <button
                                onClick={() => handleShare("linkedin")}
                                className="flex-1 p-3 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center gap-2 text-sm font-medium"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn
                            </button>
                            <button
                                onClick={handleCopyLink}
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
