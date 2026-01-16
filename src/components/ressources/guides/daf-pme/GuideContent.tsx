"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GuideContentProps {
    onStartDiagnostic: () => void;
}

// Icons for sections
const Icons = {
    intro: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    daf: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    ),
    roles: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    ),
    growth: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    ),
    alternative: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    ),
    signals: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    action: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    conclusion: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
    ),
};

interface Section {
    id: number;
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

const SECTIONS: Section[] = [
    {
        id: 1,
        title: "Introduction — Pourquoi ce guide existe",
        icon: Icons.intro,
        content: (
            <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                    En 2026, les PME belges évoluent dans un environnement exigeant :
                    <strong> pression sur les marges, décisions plus rapides à prendre, accès au financement plus sélectif, digitalisation accélérée</strong>.
                </p>

                {/* Ce qui manque aujourd'hui */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4">Ce qui manque aujourd'hui</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            "Une scène vécue",
                            "Un choix inconfortable",
                            "Une question non résolue"
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                                <p className="text-gray-700 font-medium">{item}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-lg text-primary font-medium mt-6 text-center italic">
                        Le dirigeant doit se dire : "Je suis exactement là."
                    </p>
                </div>

                {/* Mauvaise pratique */}
                <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
                    <h4 className="text-xl font-bold text-red-800 mb-6 flex items-center gap-2">
                        ❌ Mauvaise pratique — Pilotage flou
                    </h4>

                    <div className="bg-white rounded-xl p-6 border border-red-100 mb-6">
                        <p className="text-gray-700 mb-4">
                            <strong>À Charleroi</strong>, Laurent dirige une PME industrielle de 25 personnes.
                            L'entreprise est rentable, mais tendue en trésorerie. Chaque mois, il reçoit :
                        </p>
                        <ul className="space-y-2 text-gray-600 mb-4">
                            <li>→ les chiffres du comptable avec 6 à 8 semaines de retard,</li>
                            <li>→ des tableaux Excel "reconstruits" en interne,</li>
                            <li>→ des réponses floues quand il pose des questions simples.</li>
                        </ul>
                        <div className="bg-red-50 rounded-lg p-4 mb-4">
                            <p className="text-gray-700 italic">"Est-ce qu'on peut recruter ?"</p>
                            <p className="text-gray-700 italic">"Est-ce qu'on peut investir ?"</p>
                        </div>
                        <p className="text-gray-700">
                            Laurent décide à l'intuition, en espérant que "ça passe".
                        </p>
                    </div>

                    <p className="text-primary font-medium">Il ne se sent pas en danger… mais jamais vraiment serein.</p>
                </div>

                {/* Bonne pratique */}
                <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
                    <h4 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
                        ✅ Bonne pratique — Prise de recul
                    </h4>

                    <div className="bg-white rounded-xl p-6 border border-green-100 mb-6">
                        <p className="text-gray-700 mb-4">
                            <strong>À Namur</strong>, Isabelle dirige une PME de services du même ordre de grandeur.
                            Elle ne dispose pas d'un DAF à temps plein. Mais elle a :
                        </p>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                des indicateurs clairs,
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                une vision de trésorerie à 6 mois,
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                quelqu'un qui l'aide à poser les bonnes questions avant de décider.
                            </li>
                        </ul>
                    </div>

                    <p className="text-primary font-medium">Elle ne décide pas plus lentement. Elle décide avec moins de stress et moins de surprises.</p>
                </div>

                {/* Chute éditoriale */}
                <div className="bg-primary rounded-2xl p-8 text-white">
                    <h4 className="text-xl font-bold text-secondary mb-6">
                        Chute éditoriale — Message clé
                    </h4>

                    <div className="space-y-4 mb-6">
                        <p className="text-white/90 text-lg">Le problème n'est pas l'absence de DAF.</p>
                        <p className="text-white/90 text-lg">Le problème est <strong className="text-secondary">l'absence de pilotage structuré</strong>.</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-white/80 mb-3"><span className="text-secondary font-bold">Bonne chose à faire :</span></p>
                        <p className="text-white/80">
                            Avant de se demander "qui recruter", se demander :<br />
                            <strong className="text-secondary">"Comment est réellement pilotée ma finance aujourd'hui ?"</strong>
                        </p>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Le DAF, bras droit stratégique",
        icon: Icons.daf,
        content: (
            <div className="space-y-8">
                {/* Introduction */}
                <p className="text-lg text-gray-700 leading-relaxed">
                    Le Directeur Financier (DAF) n'est pas un "super comptable". <strong>Il est le copilote du dirigeant.</strong>
                </p>

                {/* Mauvaise pratique */}
                <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
                    <h4 className="text-xl font-bold text-red-800 mb-6 flex items-center gap-2">
                        ❌ Mauvaise pratique — Rôle dilué
                    </h4>

                    <div className="bg-white rounded-xl p-6 border border-red-100 mb-6">
                        <p className="text-gray-700 mb-4">
                            <strong>À Mons</strong>, David dirige une PME commerciale. Il pense que le rôle financier est couvert parce que :
                        </p>
                        <ul className="space-y-2 text-gray-600 mb-4">
                            <li>→ le comptable produit le bilan,</li>
                            <li>→ l'assistante fait les factures,</li>
                            <li>→ lui-même "a l'œil sur la trésorerie".</li>
                        </ul>
                        <p className="text-gray-700 font-medium mb-3">En réalité :</p>
                        <ul className="space-y-2 text-gray-600">
                            <li className="text-red-600">→ personne ne consolide les informations,</li>
                            <li className="text-red-600">→ les décisions sont prises tard,</li>
                            <li className="text-red-600">→ les problèmes sont découverts après coup.</li>
                        </ul>
                    </div>

                    <p className="text-primary font-medium">Le rôle de DAF existe… mais n'est tenu par personne.</p>
                </div>

                {/* Bonne pratique */}
                <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
                    <h4 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
                        ✅ Bonne pratique — Rôle clairement assumé
                    </h4>

                    <div className="bg-white rounded-xl p-6 border border-green-100 mb-6">
                        <p className="text-gray-700 mb-4">
                            <strong>À Louvain-la-Neuve</strong>, Claire dirige une PME similaire.
                            Elle a compris une chose simple :
                        </p>
                        <p className="text-lg text-primary font-medium italic mb-4">
                            « Le rôle de DAF est une fonction, pas un titre. »
                        </p>
                        <p className="text-gray-700 mb-3">Même sans DAF interne, elle a :</p>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                une personne qui structure les budgets,
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                une vision claire de la trésorerie,
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                un regard externe pour challenger ses décisions.
                            </li>
                        </ul>
                    </div>

                    <p className="text-primary font-medium">Le rôle est clair, même si le poste ne l'est pas.</p>
                </div>

                {/* Chute éditoriale */}
                <div className="bg-primary rounded-2xl p-8 text-white">
                    <h4 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                        Chute éditoriale — Message clé
                    </h4>

                    <div className="space-y-4 mb-6">
                        <p className="text-white/90 text-lg">Le problème n'est pas de ne pas avoir de DAF.</p>
                        <p className="text-white/90 text-lg">Le problème est de <strong className="text-secondary">ne pas savoir qui joue ce rôle</strong>.</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 mb-6">
                        <p className="text-white/80 mb-3"><span className="text-secondary font-bold">Bonne chose à faire :</span></p>
                        <p className="text-white/80 mb-3">Identifier clairement :</p>
                        <div className="flex flex-wrap gap-3">
                            {["qui pilote", "qui anticipe", "qui transforme les chiffres en décisions"].map((item, i) => (
                                <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-white font-medium">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-white/20 pt-6">
                        <p className="text-lg">
                            <strong className="text-secondary">Sans cela, aucun outil et aucun recrutement ne résoudra le problème.</strong>
                        </p>
                    </div>
                </div>

                {/* Transition */}
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg text-gray-700 mb-4">
                        Si le rôle de DAF est une fonction clé, encore faut-il comprendre pourquoi il ne peut pas être assumé seul par un expert-comptable ou un contrôleur de gestion.
                    </p>
                    <p className="text-primary font-medium">C'est précisément ce que nous allons clarifier maintenant.</p>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Pourquoi un seul profil ne peut pas tout faire",
        icon: Icons.roles,
        content: (
            <div className="space-y-8">
                {/* Introduction */}
                <p className="text-lg text-gray-700 leading-relaxed">
                    Beaucoup de dirigeants pensent que l'expert-comptable suffit. D'autres comptent sur un contrôleur de gestion interne.
                    <strong> En réalité, ces rôles sont différents et complémentaires.</strong>
                </p>

                {/* Grille des 3 rôles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Expert-comptable</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li>• Garant de la conformité légale</li>
                            <li>• Regard externe</li>
                            <li>• Intervient souvent après coup</li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Contrôleur de gestion</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li>• Analyse la performance</li>
                            <li>• Suit les budgets et écarts</li>
                            <li>• Regard opérationnel</li>
                        </ul>
                    </div>

                    <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                        <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-bold text-primary mb-3">DAF</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li>• <strong>Coordonne l'ensemble</strong></li>
                            <li>• <strong>Donne une direction</strong></li>
                            <li>• <strong>Arbitre et anticipe</strong></li>
                        </ul>
                    </div>
                </div>

                {/* Mauvaise pratique 1 */}
                <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
                    <h4 className="text-xl font-bold text-red-800 mb-6 flex items-center gap-2">
                        ❌ Mauvaise pratique — "Tout repose sur le comptable"
                    </h4>

                    <div className="bg-white rounded-xl p-6 border border-red-100 mb-6">
                        <p className="text-gray-700 mb-4">
                            <strong>À Wavre</strong>, Nicolas dirige une PME de construction. Il dit souvent :
                        </p>
                        <p className="text-xl font-medium text-gray-800 italic mb-4">
                            « Mon expert-comptable s'occupe de tout. »
                        </p>
                        <p className="text-gray-700 font-medium mb-3">En pratique :</p>
                        <ul className="space-y-2 text-gray-600 mb-4">
                            <li>→ le comptable envoie le bilan une fois par an,</li>
                            <li>→ la TVA est correcte,</li>
                        </ul>
                        <p className="text-gray-700 font-medium mb-3">mais :</p>
                        <ul className="space-y-2 text-gray-600">
                            <li className="text-red-600">→ personne ne suit les marges par chantier,</li>
                            <li className="text-red-600">→ la trésorerie est tendue sans explication claire,</li>
                            <li className="text-red-600">→ les décisions sont prises après les problèmes.</li>
                        </ul>
                    </div>

                    <div className="bg-red-100 rounded-xl p-4 mb-4">
                        <p className="text-gray-700 mb-2">Quand Nicolas demande :</p>
                        <p className="text-lg font-medium text-gray-800 italic">« Pourquoi on manque de cash alors qu'on travaille beaucoup ? »</p>
                        <p className="text-gray-600 mt-2">La réponse arrive… <strong>trois mois plus tard</strong>.</p>
                    </div>

                    <div className="space-y-2 text-primary font-medium">
                        <p>Le comptable fait son travail.</p>
                        <p>Mais ce n'est pas son rôle de piloter l'entreprise au quotidien.</p>
                    </div>
                </div>

                {/* Mauvaise pratique 2 */}
                <div className="bg-orange-50 rounded-2xl p-8 border border-orange-200">
                    <h4 className="text-xl font-bold text-orange-800 mb-6 flex items-center gap-2">
                        ❌ Autre mauvaise pratique — "Un contrôleur sans vision"
                    </h4>

                    <div className="bg-white rounded-xl p-6 border border-orange-100 mb-6">
                        <p className="text-gray-700 mb-4">
                            <strong>À Hasselt</strong>, une PME industrielle recrute un contrôleur de gestion junior. Il produit :
                        </p>
                        <ul className="space-y-2 text-gray-600 mb-4">
                            <li>→ des tableaux,</li>
                            <li>→ des graphiques,</li>
                            <li>→ des indicateurs.</li>
                        </ul>
                        <p className="text-gray-700 font-medium mb-3">Mais :</p>
                        <ul className="space-y-2 text-gray-600">
                            <li className="text-orange-600">→ les chiffres ne sont pas consolidés avec la comptabilité,</li>
                            <li className="text-orange-600">→ les priorités stratégiques ne sont pas claires,</li>
                            <li className="text-orange-600">→ le dirigeant reçoit beaucoup d'informations… sans décision claire.</li>
                        </ul>
                    </div>

                    <div className="space-y-2 text-primary font-medium">
                        <p>Le contrôleur analyse.</p>
                        <p>Mais personne ne tranche, n'arbitre, ni ne pilote.</p>
                    </div>
                </div>

                {/* Bonne pratique */}
                <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
                    <h4 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
                        ✅ Bonne pratique — Rôles distincts, posture claire
                    </h4>

                    <div className="bg-white rounded-xl p-6 border border-green-100 mb-6">
                        <p className="text-gray-700 mb-4">
                            <strong>À Liège</strong>, Sophie dirige une PME B2B en croissance.
                            Elle a compris une chose simple :
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                                <p className="text-sm text-blue-600 font-medium">Expert-comptable</p>
                                <p className="text-gray-700 font-bold">sécurise le passé</p>
                            </div>
                            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                                <p className="text-sm text-green-600 font-medium">Contrôleur de gestion</p>
                                <p className="text-gray-700 font-bold">analyse le présent</p>
                            </div>
                            <div className="bg-primary/10 rounded-xl p-4 text-center border border-primary/20">
                                <p className="text-sm text-primary font-medium">DAF</p>
                                <p className="text-gray-700 font-bold">prépare l'avenir</p>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-3">Elle ne confond pas les rôles :</p>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                le comptable garantit la conformité,
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                le contrôleur éclaire la performance,
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                le pilotage stratégique est clairement assumé.
                            </li>
                        </ul>
                    </div>

                    <div className="bg-green-100 rounded-xl p-4">
                        <p className="text-green-800 font-medium mb-2">Résultat :</p>
                        <div className="flex flex-wrap gap-2">
                            {["moins de frictions", "moins de zones grises", "plus de décisions assumées"].map((item, i) => (
                                <span key={i} className="px-3 py-1 bg-white rounded-full text-green-700 text-sm font-medium">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chute éditoriale */}
                <div className="bg-primary rounded-2xl p-8 text-white">
                    <h4 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                        Chute éditoriale — La bonne chose à faire
                    </h4>

                    <p className="text-white/90 text-lg mb-6">
                        Aucun profil ne peut tout faire correctement, durablement.
                    </p>

                    <div className="bg-white/10 rounded-xl p-4 mb-6">
                        <p className="text-white/80 mb-3"><span className="text-secondary font-bold">Bonne posture à adopter :</span></p>
                        <ul className="space-y-2 text-white/80">
                            <li>→ arrêter d'attendre d'un expert-comptable ce qu'il n'est pas censé fournir,</li>
                            <li>→ arrêter de demander à un contrôleur de "faire le DAF" sans en avoir le cadre,</li>
                            <li>→ clarifier qui pilote réellement la finance.</li>
                        </ul>
                    </div>

                    <div className="border-t border-white/20 pt-6">
                        <p className="text-lg">
                            <strong className="text-secondary">Quand les rôles sont clairs, les décisions deviennent plus simples.</strong>
                        </p>
                    </div>
                </div>

                {/* Transition */}
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg text-gray-700 mb-4">
                        Si le rôle de DAF est distinct et stratégique, reste une question centrale :
                        <strong> à partir de quand devient-il réellement indispensable dans une PME ?</strong>
                    </p>
                    <p className="text-primary font-medium">C'est précisément ce que nous allons explorer maintenant.</p>
                </div>

                {/* Message clé */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
                    <p className="text-lg text-gray-700 italic">
                        Ce chapitre doit provoquer un déclic très précis chez le dirigeant :<br />
                        <strong className="text-primary">"Je confonds des rôles… et ça me coûte plus cher que je ne le pense."</strong>
                    </p>
                    <p className="text-gray-500 mt-4 text-sm">
                        Il ne s'agit pas d'opposer les métiers, mais de montrer pourquoi ils ne peuvent pas se substituer les uns aux autres.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 4,
        title: "Pourquoi un DAF devient indispensable",
        icon: Icons.growth,
        content: (
            <div className="space-y-8">
                {/* Introduction */}
                <p className="text-lg text-gray-700 leading-relaxed">
                    Un DAF devient critique quand l'entreprise doit <strong>choisir, pas seulement exécuter</strong>.
                </p>

                {/* Situations typiques */}
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <h4 className="font-bold text-gray-900 mb-4">Situations typiques</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                            "Recrutement structurant",
                            "Investissement important",
                            "Financement bancaire",
                            "Croissance rapide",
                            "Tension de trésorerie",
                            "Changement de modèle"
                        ].map((item, i) => (
                            <span key={i} className="px-3 py-2 bg-white rounded-lg text-sm text-gray-700 border border-blue-100">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Mauvaise pratique */}
                <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
                    <h4 className="text-xl font-bold text-red-800 mb-6 flex items-center gap-2">
                        ❌ Mauvaise pratique — Trop tard
                    </h4>

                    <div className="bg-white rounded-xl p-6 border border-red-100 mb-6">
                        <p className="text-gray-700 mb-4">
                            <strong>À Arlon</strong>, une PME de services passe de 12 à 30 collaborateurs en 18 mois.
                            Le chiffre d'affaires progresse, mais :
                        </p>
                        <ul className="space-y-2 text-gray-600 mb-4">
                            <li>→ les marges se dégradent,</li>
                            <li>→ la trésorerie devient imprévisible,</li>
                            <li>→ les recrutements sont faits "au feeling".</li>
                        </ul>
                        <p className="text-gray-700 italic">
                            Le dirigeant se dit : « On verra quand on sera plus gros. »
                        </p>
                    </div>

                    <div className="bg-red-100 rounded-xl p-4 mb-4">
                        <p className="font-medium text-red-800 mb-2">Résultat :</p>
                        <div className="flex flex-wrap gap-2">
                            {["tensions bancaires", "décisions subies", "énergie consommée à éteindre des incendies"].map((item, i) => (
                                <span key={i} className="px-3 py-1 bg-white/80 rounded-full text-red-700 text-sm">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <p className="text-primary font-medium">Le besoin de pilotage était là avant la crise.</p>
                </div>

                {/* Bonne pratique */}
                <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
                    <h4 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
                        ✅ Bonne pratique — Juste à temps
                    </h4>

                    <div className="bg-white rounded-xl p-6 border border-green-100 mb-6">
                        <p className="text-gray-700 mb-4">
                            <strong>À Bruges</strong>, une PME e-commerce anticipe sa croissance.
                            Avant d'embaucher massivement, le dirigeant met en place :
                        </p>
                        <ul className="space-y-2 text-gray-600 mb-4">
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                un budget structuré,
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                des scénarios de trésorerie,
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                un regard financier externe.
                            </li>
                        </ul>
                        <p className="text-gray-700">
                            <strong>Quand une opportunité se présente, la décision est rapide, chiffrée, assumée.</strong>
                        </p>
                    </div>

                    <div className="space-y-2 text-primary font-medium">
                        <p>Le DAF n'a pas "sauvé" l'entreprise.</p>
                        <p>Il a évité qu'elle se mette en danger.</p>
                    </div>
                </div>

                {/* Chute éditoriale */}
                <div className="bg-primary rounded-2xl p-8 text-white">
                    <h4 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                        Chute éditoriale — La bonne chose à faire
                    </h4>

                    <p className="text-white/90 text-lg mb-6">
                        Le DAF devient indispensable quand <strong className="text-secondary">la complexité dépasse l'intuition</strong>.
                    </p>

                    <div className="bg-white/10 rounded-xl p-4 mb-6">
                        <p className="text-white/80 mb-3"><span className="text-secondary font-bold">Signaux concrets :</span></p>
                        <div className="flex flex-wrap gap-3">
                            {["décisions engageantes", "croissance rapide", "financement externe", "marges difficiles à lire"].map((item, i) => (
                                <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-white font-medium">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-white/20 pt-6">
                        <p className="text-lg">
                            <strong className="text-secondary">Attendre trop longtemps coûte plus cher que d'anticiper.</strong>
                        </p>
                    </div>
                </div>

                {/* Transition */}
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg text-gray-700 mb-4">
                        Reste une question clé :
                        <strong> comment bénéficier de ce pilotage sans supporter le coût d'un DAF à temps plein ?</strong>
                    </p>
                    <p className="text-primary font-medium">C'est là qu'une alternative intelligente entre en jeu.</p>
                </div>
            </div>
        )
    },
    {
        id: 5,
        title: "Une alternative intelligente : DAF à temps partiel + outils digitaux",
        icon: Icons.alternative,
        content: (
            <div className="space-y-8">
                <div className="space-y-4">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Pendant longtemps, beaucoup de dirigeants de PME ont pensé que le pilotage financier était une affaire de tout ou rien :
                    </p>
                    <div className="space-y-2 text-primary font-medium">
                        <p>soit recruter un Directeur Financier à temps plein,</p>
                        <p>soit continuer à se débrouiller avec les moyens du bord.</p>
                    </div>
                    <p className="text-gray-700">
                        <strong>Dans les faits, cette opposition est trompeuse.</strong>
                    </p>
                </div>

                {/* Exemples Charleroi et Liège */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                        <h4 className="font-bold text-red-800 mb-3">À Charleroi — L'hésitation</h4>
                        <p className="text-gray-700 text-sm">
                            Alain dirige une PME industrielle de 30 personnes. Il sait que son pilotage financier n'est plus suffisant, mais le coût d'un DAF interne lui paraît disproportionné.
                            <strong> Il reporte donc la décision, mois après mois.</strong>
                        </p>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                        <h4 className="font-bold text-green-800 mb-3">À Liège — Le bon choix</h4>
                        <p className="text-gray-700 text-sm">
                            Céline, dirigeante d'une PME B2B de taille comparable, a fait un autre choix. Elle n'a pas recruté un DAF à temps plein.
                            <strong> Elle a structuré une solution hybride, plus réaliste et plus efficace.</strong>
                        </p>
                    </div>
                </div>

                <div className="space-y-2 text-primary font-medium text-lg text-center bg-primary/5 rounded-2xl p-6">
                    <p>Le pilotage financier n'est pas une question de poste.</p>
                    <p>C'est une question de <strong className="text-secondary">fonction bien remplie, au bon rythme</strong>.</p>
                </div>

                {/* Combo gagnant */}
                <div className="bg-primary rounded-2xl p-8 text-white">
                    <h4 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                        Le combo gagnant pour une PME
                    </h4>
                    <p className="text-white/80 mb-6">
                        Les PME qui réussissent leur structuration financière s'appuient généralement sur trois piliers complémentaires :
                    </p>
                    <div className="overflow-hidden rounded-xl border border-white/20">
                        <table className="w-full text-sm">
                            <thead className="bg-white/10">
                                <tr>
                                    <th className="px-4 py-3 text-left text-white font-bold">Ressource</th>
                                    <th className="px-4 py-3 text-left text-white font-bold">Rôle</th>
                                    <th className="px-4 py-3 text-left text-secondary font-bold">Bénéfice</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                <tr>
                                    <td className="px-4 py-3 text-white/90">Odoo Finance paramétré</td>
                                    <td className="px-4 py-3 text-white/70">Centralisation et automatisation</td>
                                    <td className="px-4 py-3 text-secondary">Visibilité fiable, gain de temps</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-white/90">DAF à temps partiel (2-6j/mois)</td>
                                    <td className="px-4 py-3 text-white/70">Pilotage, stratégie, coaching</td>
                                    <td className="px-4 py-3 text-secondary">Expertise senior accessible</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-white/90">Montée en compétence interne</td>
                                    <td className="px-4 py-3 text-white/70">Autonomie progressive</td>
                                    <td className="px-4 py-3 text-secondary">Organisation plus résiliente</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-white/90 mt-6">
                        Cette combinaison permet de bénéficier d'un pilotage professionnel, <strong className="text-secondary">sans rigidité ni surcoût structurel</strong>.
                    </p>
                </div>

                {/* Comparison Table */}
                <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        DAF interne vs DAF à temps partiel
                    </h4>
                    <div className="overflow-hidden rounded-2xl border border-gray-200">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Critère</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-500">DAF interne</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-primary">DAF à temps partiel</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { criteria: "Coût annuel", internal: "115 000 – 170 000 €", partial: "18 000 – 36 000 €" },
                                    { criteria: "Flexibilité", internal: "Faible", partial: "Élevée" },
                                    { criteria: "Niveau d'expertise", internal: "Senior", partial: "Senior" },
                                    { criteria: "Charge salariale", internal: "Fixe", partial: "Variable" },
                                    { criteria: "Impact perçu", internal: "Progressif", partial: "Rapide et ciblé" },
                                ].map((row, i) => (
                                    <tr key={i} className="bg-white">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.criteria}</td>
                                        <td className="px-6 py-4 text-center text-sm text-gray-500">{row.internal}</td>
                                        <td className="px-6 py-4 text-center text-sm text-primary font-medium">{row.partial}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ROI Explanation */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4">Que signifie "ROI perçu" dans ce contexte ?</h4>
                    <div className="space-y-4 text-gray-700">
                        <p>
                            Un DAF interne est un investissement lourd et permanent.
                            Les bénéfices existent, mais ils mettent du temps à être visibles et sont parfois difficiles à relier directement aux décisions prises.
                        </p>
                        <p>
                            Un DAF à temps partiel, lui, intervient sur des sujets précis : trésorerie, marges, décisions clés.
                            <strong> Les effets sont souvent immédiats et tangibles</strong> : meilleure visibilité, décisions plus sûres, stress réduit.
                        </p>
                    </div>
                    <div className="mt-4 p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                        <p className="text-gray-700">
                            <span className="text-secondary font-bold">Autrement dit :</span> chaque euro investi dans un DAF à temps partiel est plus facilement relié à un résultat concret.
                        </p>
                    </div>
                </div>

                {/* Simulation d'impact */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
                    <h4 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
                        Simulation d'impact — Cas réel de PME
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h5 className="font-bold text-gray-900 mb-3">Situation initiale</h5>
                            <ul className="space-y-2 text-gray-600 text-sm">
                                <li>→ Marge nette : 4 %</li>
                                <li>→ Trésorerie tendue</li>
                                <li>→ Décisions prises au feeling</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h5 className="font-bold text-green-700 mb-3">Après 9 mois</h5>
                            <ul className="space-y-2 text-gray-600 text-sm">
                                <li className="text-green-600 font-medium">→ Marge nette : 8,5 %</li>
                                <li className="text-green-600 font-medium">→ +78 000 € d'économies</li>
                                <li>→ Décisions structurées et anticipées</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h5 className="font-bold text-primary mb-3">Leviers activés</h5>
                            <ul className="space-y-2 text-gray-600 text-sm">
                                <li>→ Odoo Finance structuré</li>
                                <li>→ Tableau de bord simple</li>
                                <li>→ DAF : 6 jours par mois</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Témoignage */}
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                    <div className="flex items-start gap-4">
                        <span className="text-4xl">🗣️</span>
                        <div>
                            <p className="text-lg text-gray-700 italic mb-4">
                                « Grâce à notre DAF à temps partiel, on a structuré notre pilotage sans embauche.
                                Les décisions sont plus sûres, les marges meilleures, et la pression est retombée. »
                            </p>
                            <p className="text-sm text-gray-500">— Céline, dirigeante PME B2B (Liège)</p>
                        </div>
                    </div>
                </div>

                {/* Chute */}
                <div className="bg-primary rounded-2xl p-8 text-white">
                    <h4 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                        La bonne décision à prendre
                    </h4>
                    <div className="space-y-4 mb-6">
                        <p className="text-white/90">Le pilotage financier n'est pas une question de prestige ni de taille d'équipe.</p>
                        <p className="text-white/90">C'est une question de <strong className="text-secondary">clarté, de méthode et de rythme adapté</strong>.</p>
                    </div>
                    <p className="text-white/80 mb-4">
                        Pour beaucoup de PME, la solution la plus intelligente n'est ni l'inaction, ni le recrutement lourd.
                        C'est une approche pragmatique :
                    </p>
                    <div className="flex flex-wrap gap-3 mb-6">
                        {["accéder à une expertise senior", "garder de la flexibilité", "structurer sans alourdir"].map((item, i) => (
                            <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-white font-medium">
                                {item}
                            </span>
                        ))}
                    </div>
                    <div className="border-t border-white/20 pt-6">
                        <p className="text-lg">
                            Un DAF à temps partiel n'est pas une solution "par défaut".
                            <br /><strong className="text-secondary">C'est souvent la solution la plus rationnelle.</strong>
                        </p>
                    </div>
                </div>

                {/* Transition */}
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <h4 className="font-bold text-gray-900 mb-4">Du "comment" au "quand"</h4>
                    <p className="text-gray-700 mb-4">
                        Mettre en place un pilotage financier adapté est une décision structurante.
                        <strong> Mais encore faut-il savoir quand cette décision devient réellement nécessaire.</strong>
                    </p>
                    <p className="text-gray-600 mb-4">
                        Toutes les PME n'ont pas besoin d'un DAF au même moment.
                        En revanche, elles émettent presque toutes les mêmes signaux lorsque le pilotage financier n'est plus suffisant.
                    </p>
                    <div className="space-y-2 text-primary font-medium">
                        <p>Ces signaux ne sont pas des alertes rouges.</p>
                        <p>Ce sont des indicateurs de maturité.</p>
                    </div>
                    <p className="text-gray-600 mt-4">C'est précisément ce que nous allons identifier maintenant.</p>
                </div>
            </div>
        )
    },
    {
        id: 6,
        title: "5 signaux que vous avez besoin d'un DAF",
        icon: Icons.signals,
        content: (
            <div className="space-y-8">
                <div className="space-y-4">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Il est rare qu'un dirigeant se réveille un matin en se disant :
                    </p>
                    <p className="text-xl text-primary font-medium italic">
                        « Il me faut un DAF. »
                    </p>
                    <p className="text-gray-700">
                        Dans la réalité, le besoin apparaît progressivement, à travers des situations concrètes du quotidien.
                    </p>
                    <p className="text-gray-600">
                        <strong>Voici les cinq signaux les plus fréquents</strong> observés dans les PME en phase de structuration.
                    </p>
                </div>

                {/* Signal 1 */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <div className="flex items-start gap-4 mb-6">
                        <span className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-2xl shrink-0">1️⃣</span>
                        <h4 className="text-xl font-bold text-gray-900">Les décisions sont prises sans chiffres fiables</h4>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-6">
                        <p className="text-gray-700 italic">
                            À Namur, un dirigeant valide un recrutement parce que "l'activité tourne bien".
                            <strong> Quelques mois plus tard, la trésorerie se tend sans qu'il comprenne pourquoi.</strong>
                        </p>
                    </div>

                    <div className="space-y-2 text-primary font-medium mb-4">
                        <p>La décision n'était pas mauvaise.</p>
                        <p>Elle n'était simplement pas suffisamment chiffrée.</p>
                    </div>

                    <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                        <p className="text-gray-700">
                            <span className="text-secondary font-bold">Ce signal indique</span> que l'intuition a pris le dessus sur le pilotage.
                        </p>
                    </div>
                </div>

                {/* Signal 2 */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <div className="flex items-start gap-4 mb-6">
                        <span className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl shrink-0">2️⃣</span>
                        <h4 className="text-xl font-bold text-gray-900">La trésorerie est floue ou sous tension</h4>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-6">
                        <p className="text-gray-700 italic">
                            À Bruxelles, une PME rentable sur le papier vit sous pression permanente.
                            <strong> Le solde bancaire dicte les décisions à court terme.</strong>
                        </p>
                    </div>

                    <div className="space-y-2 text-primary font-medium mb-4">
                        <p>La trésorerie n'est pas pilotée.</p>
                        <p>Elle est subie.</p>
                    </div>

                    <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                        <p className="text-gray-700">
                            <span className="text-secondary font-bold">Ce signal montre</span> qu'il manque une vision prévisionnelle et des scénarios clairs.
                        </p>
                    </div>
                </div>

                {/* Signal 3 */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <div className="flex items-start gap-4 mb-6">
                        <span className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center text-2xl shrink-0">3️⃣</span>
                        <h4 className="text-xl font-bold text-gray-900">La rentabilité réelle est mal connue</h4>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-6">
                        <p className="text-gray-700 italic">
                            À Mons, l'entreprise vend de plus en plus. Mais personne ne sait précisément :
                        </p>
                        <ul className="mt-2 space-y-1 text-gray-700">
                            <li>→ quels clients sont rentables,</li>
                            <li>→ quels produits détruisent de la marge.</li>
                        </ul>
                    </div>

                    <p className="text-primary font-medium mb-4">La croissance masque parfois les vrais problèmes.</p>

                    <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                        <p className="text-gray-700">
                            <span className="text-secondary font-bold">Ce signal révèle</span> un manque d'analyse structurée de la performance.
                        </p>
                    </div>
                </div>

                {/* Signal 4 */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <div className="flex items-start gap-4 mb-6">
                        <span className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl shrink-0">4️⃣</span>
                        <h4 className="text-xl font-bold text-gray-900">L'expert-comptable est débordé… ou arrive trop tard</h4>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-6">
                        <p className="text-gray-700 italic">
                            À Tournai, le dirigeant sollicite son comptable pour des questions de gestion. La réponse est souvent :
                        </p>
                        <p className="text-xl font-medium text-gray-800 mt-2">« On verra au bilan. »</p>
                    </div>

                    <div className="space-y-2 text-primary font-medium mb-4">
                        <p>Le comptable fait son travail.</p>
                        <p>Mais le pilotage arrive après les décisions, pas avant.</p>
                    </div>

                    <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                        <p className="text-gray-700">
                            <span className="text-secondary font-bold">Ce signal indique</span> un décalage entre conformité et pilotage.
                        </p>
                    </div>
                </div>

                {/* Signal 5 */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <div className="flex items-start gap-4 mb-6">
                        <span className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl shrink-0">5️⃣</span>
                        <h4 className="text-xl font-bold text-gray-900">Le discours manque de crédibilité face aux financeurs</h4>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-6">
                        <p className="text-gray-700 italic mb-2">
                            À Liège, lors d'un rendez-vous bancaire, on demande :
                        </p>
                        <ul className="space-y-1 text-gray-700">
                            <li>→ un budget,</li>
                            <li>→ une projection de trésorerie,</li>
                            <li>→ des indicateurs clairs.</li>
                        </ul>
                        <p className="text-gray-700 mt-3"><strong>Le dirigeant improvise.</strong></p>
                    </div>

                    <p className="text-primary font-medium mb-4">La crédibilité financière se construit avant le rendez-vous.</p>

                    <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                        <p className="text-gray-700">
                            <span className="text-secondary font-bold">Ce signal montre</span> que la finance n'est pas encore structurée comme un outil de communication stratégique.
                        </p>
                    </div>
                </div>

                {/* Chute */}
                <div className="bg-primary rounded-2xl p-8 text-white">
                    <h4 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                        Ce qu'il faut comprendre
                    </h4>
                    <div className="space-y-4 mb-6">
                        <p className="text-white/90">Aucun de ces signaux n'est un échec.</p>
                        <p className="text-white/90">Ils sont tous des <strong className="text-secondary">marqueurs d'évolution naturelle</strong> d'une PME.</p>
                    </div>
                    <div className="border-t border-white/20 pt-6 mb-6">
                        <p className="text-lg">
                            Le vrai risque n'est pas de les reconnaître.
                            <br /><strong className="text-secondary">Le vrai risque est de les ignorer.</strong>
                        </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-white/80 mb-3"><span className="text-secondary font-bold">La bonne posture :</span></p>
                        <div className="flex flex-wrap gap-3">
                            {["ne pas attendre la crise", "structurer avant d'y être contraint", "activer le pilotage au bon moment"].map((item, i) => (
                                <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-white font-medium">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Transition */}
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg text-gray-700">
                        La bonne nouvelle, c'est qu'il n'est pas nécessaire de transformer toute l'organisation pour progresser.
                    </p>
                    <p className="text-primary font-medium mt-4">Il est possible de poser les bonnes bases rapidement, avec méthode et pragmatisme.</p>
                    <p className="text-gray-600 mt-2">C'est ce que nous allons voir dans le chapitre suivant.</p>
                </div>
            </div>
        )
    },
    {
        id: 7,
        title: "Démarrer concrètement en 30 jours",
        icon: Icons.action,
        content: (
            <div className="space-y-8">
                <div className="space-y-4">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Après avoir identifié les signaux, beaucoup de dirigeants se posent la même question :
                    </p>
                    <p className="text-xl text-primary font-medium italic">
                        « D'accord… mais par où commencer, concrètement ? »
                    </p>
                    <p className="text-gray-700">
                        La bonne nouvelle, c'est qu'il n'est pas nécessaire de tout révolutionner pour améliorer son pilotage financier.
                        <strong> Dans la majorité des PME, quelques décisions bien posées suffisent à créer un vrai changement.</strong>
                    </p>
                    <p className="text-gray-600">
                        Voici une approche simple, réaliste et éprouvée, sur 30 jours.
                    </p>
                </div>

                {/* Semaine 1 */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-full">Semaine 1</span>
                        <h4 className="text-xl font-bold text-gray-900">Prendre une photo honnête de la situation</h4>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-6">
                        <p className="text-gray-700 italic">
                            À Libramont, une PME familiale décide de faire une pause avant d'agir.
                            <strong> Pas pour ralentir, mais pour voir clair.</strong>
                        </p>
                    </div>

                    <p className="text-gray-700 font-medium mb-4">Les bonnes questions à se poser :</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        {[
                            "Avons-nous un budget clair ?",
                            "Connaissons-nous nos marges ?",
                            "Avons-nous une vision de trésorerie à 3 ou 6 mois ?",
                            "Les chiffres arrivent-ils à temps pour décider ?"
                        ].map((q, i) => (
                            <div key={i} className="flex items-center gap-2 text-gray-600">
                                <span className="text-secondary">→</span>
                                {q}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2 text-primary font-medium">
                        <p>L'objectif n'est pas d'avoir toutes les réponses.</p>
                        <p>L'objectif est d'identifier ce qui manque vraiment.</p>
                    </div>

                    <div className="mt-4 p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                        <p className="text-gray-700">
                            <span className="text-secondary font-bold">Bonne pratique :</span> écrire noir sur blanc les zones floues, sans chercher à les corriger tout de suite.
                        </p>
                    </div>
                </div>

                {/* Semaine 2 */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-full">Semaine 2</span>
                        <h4 className="text-xl font-bold text-gray-900">Choisir ses priorités (et renoncer au reste)</h4>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-6">
                        <p className="text-gray-700 italic">
                            À Namur, un dirigeant comprend que vouloir tout suivre est contre-productif.
                            <strong> Il décide de se concentrer sur l'essentiel.</strong>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <p className="text-gray-700 font-medium mb-3">Les règles simples :</p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-gray-600">
                                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">3</span>
                                    priorités maximum
                                </li>
                                <li className="flex items-center gap-2 text-gray-600">
                                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">5</span>
                                    indicateurs clés au plus
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-gray-700 font-medium mb-3">Exemples d'indicateurs utiles :</p>
                            <ul className="space-y-1 text-gray-600 text-sm">
                                {["trésorerie disponible", "marge par activité", "coûts fixes", "délai de paiement client (DSO)", "chiffre d'affaires mensuel"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <p className="text-primary font-medium">Mieux vaut peu d'indicateurs fiables que beaucoup de chiffres inutilisés.</p>
                </div>

                {/* Semaine 3 */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-full">Semaine 3</span>
                        <h4 className="text-xl font-bold text-gray-900">Structurer les outils sans complexifier</h4>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-6">
                        <p className="text-gray-700 italic">
                            À Tournai, une PME commence avec Excel.
                            À Bruxelles, une autre structure Odoo Finance.
                        </p>
                    </div>

                    <p className="text-primary font-medium mb-4">Le choix de l'outil importe moins que la qualité de la structure.</p>

                    <div className="mb-4">
                        <p className="text-gray-700 font-medium mb-3">Ce qui compte :</p>
                        <div className="flex flex-wrap gap-3">
                            {["des données cohérentes", "des règles claires", "des chiffres compréhensibles"].map((item, i) => (
                                <span key={i} className="px-4 py-2 bg-white rounded-full text-gray-700 font-medium shadow-sm border border-gray-200">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                        <p className="text-gray-700">
                            <span className="text-secondary font-bold">Bonne posture :</span> l'outil doit servir la décision, pas l'inverse.
                        </p>
                    </div>
                </div>

                {/* Semaine 4 */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-full">Semaine 4</span>
                        <h4 className="text-xl font-bold text-gray-900">S'appuyer sur un regard externe</h4>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-6">
                        <p className="text-gray-700 italic">
                            À Liège, un dirigeant réalise que le plus difficile n'est pas technique.
                            <strong> C'est de prendre du recul sur ses propres chiffres.</strong>
                        </p>
                    </div>

                    <div className="mb-4">
                        <p className="text-gray-700 font-medium mb-3">Un accompagnement ciblé permet :</p>
                        <ul className="space-y-2">
                            {["de valider les hypothèses", "d'éviter les angles morts", "de sécuriser les décisions"].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-gray-600">
                                    <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-primary font-medium">Quelques jours d'expertise bien utilisés valent souvent mieux qu'un poste mal calibré.</p>
                </div>

                {/* Chute */}
                <div className="bg-primary rounded-2xl p-8 text-white">
                    <h4 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                        Ce qu'il faut retenir
                    </h4>
                    <div className="space-y-4 mb-6">
                        <p className="text-white/90">Démarrer un pilotage financier efficace ne demande ni une équipe dédiée, ni un projet lourd.</p>
                        <p className="text-white/90">Cela demande surtout <strong className="text-secondary">une posture claire</strong> :</p>
                    </div>
                    <div className="flex flex-wrap gap-3 mb-6">
                        {["accepter de regarder les chiffres en face", "choisir ce qui compte vraiment", "décider avec méthode"].map((item, i) => (
                            <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-white font-medium">
                                {item}
                            </span>
                        ))}
                    </div>
                    <div className="border-t border-white/20 pt-6">
                        <p className="text-lg">
                            Le pilotage financier n'est pas une question de taille.
                            <br /><strong className="text-secondary">C'est une question de discipline et de clarté.</strong>
                        </p>
                    </div>
                </div>

                {/* Transition */}
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                    <p className="text-lg text-gray-700">
                        Une fois ces bases posées, une chose devient évidente :
                        <strong> le pilotage n'est pas une fonction ponctuelle, mais une posture durable.</strong>
                    </p>
                    <p className="text-primary font-medium mt-4">C'est ce que nous allons conclure maintenant.</p>
                </div>
            </div>
        )
    },
    {
        id: 8,
        title: "Conclusion — Le pilotage financier est avant tout une posture",
        icon: Icons.conclusion,
        content: (
            <div className="space-y-8">
                <p className="text-xl text-gray-700 leading-relaxed">
                    Les PME qui traversent les périodes complexes ne sont pas celles qui recrutent le plus vite.
                    <br /><strong className="text-primary">Ce sont celles qui voient plus clair, plus tôt.</strong>
                </p>

                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <p className="text-gray-700 mb-6">Tout au long de ce guide, une idée revient sans cesse :</p>
                    <div className="space-y-4">
                        {[
                            "le pilotage financier n'est pas une question de titre,",
                            "ni de taille d'équipe,",
                            "ni de sophistication des outils."
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-lg text-primary font-medium">
                                <span className="text-secondary">👉</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-primary rounded-2xl p-8 text-white text-center">
                    <p className="text-3xl font-serif mb-2">C'est une <span className="text-secondary italic">posture de dirigeant</span>.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-6 font-medium">Une posture qui consiste à :</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "vouloir comprendre avant d'agir,",
                            "accepter de remettre en question certaines habitudes,",
                            "s'entourer des bons rôles au bon moment,",
                            "transformer les chiffres en décisions, et non en contraintes."
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                                <svg className="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-8 border border-secondary/20">
                    <p className="text-xl text-gray-800 mb-6">
                        Vous n'avez pas nécessairement besoin d'un Directeur Financier à temps plein.
                        <br /><strong>Mais vous avez besoin :</strong>
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {["d'une vision claire", "d'indicateurs utiles", "d'un regard capable de relier stratégie, opérations et finance"].map((item, i) => (
                            <span key={i} className="px-5 py-3 bg-white rounded-full text-primary font-medium shadow-sm">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <p className="text-lg text-gray-700 italic">
                        Les entreprises qui réussissent ne cherchent pas à tout maîtriser seules.
                        <strong> Elles cherchent à structurer intelligemment leur pilotage, à leur rythme.</strong>
                    </p>
                </div>

                <div className="bg-primary rounded-2xl p-10 text-center">
                    <div className="space-y-4">
                        <p className="text-xl text-white/90 flex items-center justify-center gap-2">
                            <span className="text-secondary">👉</span>
                            Le bon pilotage, ce n'est pas plus de chiffres.
                        </p>
                        <p className="text-2xl md:text-3xl font-serif text-secondary font-bold">
                            C'est mieux utiliser les bons chiffres, au bon moment, pour décider sereinement.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
];

export default function GuideContent({ onStartDiagnostic }: GuideContentProps) {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".guide-section");
        sections.forEach((section) => {
            gsap.fromTo(section,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, { scope: container });

    return (
        <section ref={container} id="introduction" className="w-full bg-white py-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Sections */}
                {SECTIONS.map((section, index) => (
                    <div
                        key={section.id}
                        id={`section-${section.id}`}
                        className="guide-section mb-16 scroll-mt-32"
                    >
                        {/* Section Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white">
                                {section.icon}
                            </div>
                            <div>
                                <span className="text-sm text-secondary font-bold uppercase tracking-widest">
                                    Chapitre {section.id}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
                                    {section.title}
                                </h2>
                            </div>
                        </div>

                        {/* Section Content */}
                        {section.content}

                        {/* Separator */}
                        {index < SECTIONS.length - 1 && (
                            <div className="mt-16 flex justify-center">
                                <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                            </div>
                        )}
                    </div>
                ))}

                {/* CTA to Diagnostic */}
                <div id="diagnostic" className="guide-section scroll-mt-32">
                    <div className="bg-gradient-to-br from-primary to-primary/90 rounded-3xl p-10 text-center text-white relative overflow-hidden">
                        {/* Decorative */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-serif mb-4">
                                Et maintenant, faites votre <span className="text-secondary">diagnostic</span>
                            </h3>
                            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                                24 questions pour évaluer la maturité financière de votre PME
                                et découvrir si vous avez réellement besoin d'un DAF.
                            </p>
                            <button
                                onClick={onStartDiagnostic}
                                className="px-10 py-5 bg-secondary text-primary rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors duration-300 shadow-xl hover:scale-105"
                            >
                                Commencer le diagnostic
                            </button>
                            <p className="text-white/50 text-sm mt-6 flex items-center justify-center gap-4">
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    5-7 min
                                </span>
                                <span>•</span>
                                <span>Résultats personnalisés</span>
                                <span>•</span>
                                <span>Partage possible</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
