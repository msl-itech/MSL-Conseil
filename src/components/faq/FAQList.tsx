"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
    {
        question: "En quoi MSL Conseils est différent d’un expert-comptable ou d’un intégrateur ?",
        answer: (
            <div className="space-y-6 pt-2">
                <p>Parce que nous intervenons là où personne n’intervient vraiment : <strong className="text-secondary/90">entre la production comptable et le pilotage stratégique.</strong></p>

                <div className="pl-6 border-l-2 border-gray-100 space-y-2">
                    <p className="text-gray-500">Votre fiduciaire produit les chiffres.</p>
                    <p className="text-gray-500">Vos outils collectent les données.</p>
                    <p className="text-primary font-medium mt-2">Mais personne ne structure, ne clarifie, ne sécurise, ne lit et n’explique vraiment les flux.</p>
                </div>

                <div className="bg-gray-50/80 p-6 rounded-2xl">
                    <p className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Ce que fait MSL :</p>
                    <div className="grid gap-3">
                        <div className="flex gap-4 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0"></span>
                            <span>Nous organisons, interprétons et rendons vos données pilotables.</span>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0"></span>
                            <span>Nous créons de la clarté, pas de la confusion.</span>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0"></span>
                            <span>Nous renforçons vos équipes, pas la complexité.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        question: "Est-ce que MSL remplace ma comptabilité ou mon équipe interne ?",
        answer: (
            <div className="space-y-6 pt-2">
                <p className="text-2xl font-serif text-primary">Jamais.</p>
                <p className="text-gray-600">Nous ne faisons PAS la comptabilité. Nous ne remplaçons PAS vos équipes.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {["Clarifions vos flux", "Automatisons ce qui doit l’être", "Structurons vos processus", "Formons votre équipe à l'autonomie", "Créons de la visibilité", "Interprétons vos chiffres"].map((item, i) => (
                        <div key={i} className="flex gap-3 items-center text-gray-700">
                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            {item}
                        </div>
                    ))}
                </div>
                <p className="text-xs uppercase tracking-widest font-bold text-gray-400 border-t border-gray-100 pt-4 mt-2">Nous sommes un soutien, pas un substitut.</p>
            </div>
        )
    },
    {
        question: "Nos chiffres sont flous, contradictoires ou difficiles à lire. Pouvez-vous vraiment corriger ça ?",
        answer: (
            <div className="space-y-6 pt-2">
                <p className="font-medium text-gray-900">Oui — c’est ce que nous faisons le plus souvent.</p>
                <p className="text-gray-500">Nous intervenons sur la cohérence, la fiabilité, et la centralisation pour construire des tableaux de bord lisibles.</p>

                <div className="p-6 border border-primary/5 bg-primary/5 rounded-2xl">
                    <p className="font-serif text-primary text-xl mb-4">Le Résultat</p>
                    <div className="space-y-3">
                        <p className="text-gray-800">Vous comprenez vos chiffres.</p>
                        <p className="text-gray-800">Vous prenez des décisions rapides.</p>
                        <p className="text-gray-800">La confusion disparaît et la sérénité revient.</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        question: "Nous avons des outils… mais ils ne nous aident pas à piloter. Est-ce que MSL peut intervenir ?",
        answer: (
            <div className="space-y-6 pt-2">
                <p>Oui, et c’est un problème très répandu. Nous transformons des outils sous-utilisés en systèmes de pilotage fiables.</p>

                <div className="flex flex-col gap-4 pl-6 border-l-2 border-secondary">
                    <p className="text-lg font-medium text-gray-900">
                        Vous n’avez pas besoin de plus d’outils.
                    </p>
                    <p className="text-lg font-medium text-gray-900">
                        Vous avez besoin d’un système clair, cohérent et utile.
                    </p>
                </div>
            </div>
        )
    },
    {
        question: "Et si nos équipes manquent de temps ou sont peu à l’aise avec les outils ?",
        answer: (
            <div className="space-y-6 pt-2">
                <p>C’est justement pour cela que MSL existe.</p>
                <p className="text-gray-500">Nous accompagnons vos équipes sans les brusquer : formation concrète, méthode progressive, et coaching jusqu’à l’autonomie.</p>

                <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl">
                    <p className="font-bold text-gray-900 mb-1">Notre objectif</p>
                    <p className="text-gray-500 text-sm">Rendre vos collaborateurs confiants et éliminer la dépendance aux consultants.</p>
                </div>
            </div>
        )
    },
    {
        question: "Combien de temps faut-il avant de voir une vraie différence ?",
        answer: (
            <div className="space-y-6 pt-2">
                <p className="text-xl font-bold text-secondary">Très vite.</p>
                <div className="space-y-4">
                    <div className="flex gap-4 items-baseline">
                        <span className="w-24 shrink-0 font-mono text-xs text-gray-400 uppercase tracking-wider">2-4 semaines</span>
                        <span className="text-gray-900">Clarté des flux et des processus</span>
                    </div>
                    <div className="flex gap-4 items-baseline">
                        <span className="w-24 shrink-0 font-mono text-xs text-gray-400 uppercase tracking-wider">4-8 semaines</span>
                        <span className="text-gray-900">Automatisation + tableaux de bord</span>
                    </div>
                    <div className="flex gap-4 items-baseline">
                        <span className="w-24 shrink-0 font-mono text-xs text-secondary uppercase tracking-wider">Immédiat</span>
                        <span className="font-medium text-primary">Baisse de la charge mentale du dirigeant</span>
                    </div>
                </div>
                <p className="text-sm text-gray-400 italic pt-2">Les premiers effets visibles apparaissent dès les premiers ateliers.</p>
            </div>
        )
    },
    {
        question: "Comment garantissez-vous la sécurité et la fiabilité de nos données financières ?",
        answer: (
            <div className="space-y-6 pt-2">
                <p>Nous ne touchons jamais aux chiffres « à la légère ». Nous sécurisons tout : accès, droits, flux, contrôles internes et traçabilité.</p>
                <div className="bg-[#050505] text-white p-8 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <p className="relative z-10 font-medium text-lg text-center">L’objectif : une gestion robuste, sans complexité inutile, et sans dépendance à un seul intervenant.</p>
                </div>
            </div>
        )
    },
    {
        question: "Que se passe-t-il si mon entreprise évolue ou grandit ?",
        answer: (
            <div className="space-y-4 pt-2">
                <p>Votre système financier doit évoluer avec vous.</p>
                <p className="text-gray-500">Nous assurons suivi, ajustements, nouvelles automatisations et accompagnement DAF à temps partiel si nécessaire.</p>
                <p className="font-bold text-primary pt-2">Vous ne restez jamais bloqué ou dépassé par votre propre croissance.</p>
            </div>
        )
    },
    {
        question: "Je ne comprends pas certains chiffres, rapports ou indicateurs. Est-ce que vous pouvez m’aider ?",
        answer: (
            <div className="space-y-6 pt-2">
                <p className="text-lg font-serif italic text-primary">Oui — c’est même notre spécificité.</p>
                <p className="text-gray-600">Nous vous aidons à lire vos chiffres, comprendre ce qu’ils racontent et décider avec confiance.</p>
                <p className="border-t border-gray-100 pt-6 mt-2 text-xl font-light text-gray-900">
                    Nous ne produisons pas uniquement les chiffres.<br />
                    <strong className="text-secondary font-medium">Nous vous les rendons intelligibles et utiles.</strong>
                </p>
            </div>
        )
    }
];

export default function FAQList() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo(".faq-item",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%"
                }
            }
        );
    }, { scope: container });

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section ref={container} className="w-full py-24 px-6 md:px-12 bg-white min-h-screen">
            <div className="max-w-3xl mx-auto space-y-6">
                {FAQS.map((faq, i) => (
                    <div
                        key={i}
                        className={`faq-item group border-b border-gray-100 pb-6 transition-all duration-500 ${openIndex === i ? 'bg-gray-50/50 rounded-2xl border-none p-6' : 'hover:pl-4'}`}
                        onClick={() => toggleFAQ(i)}
                    >
                        <button className="w-full flex items-start justify-between text-left focus:outline-none">
                            <span className={`text-xl md:text-2xl font-medium transition-colors duration-300 ${openIndex === i ? 'text-primary font-serif' : 'text-gray-900 group-hover:text-primary'}`}>
                                {faq.question}
                            </span>
                            <div className={`mt-1 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center shrink-0 transition-all duration-300 ${openIndex === i ? 'bg-primary border-primary rotate-45' : 'bg-white group-hover:border-primary'}`}>
                                <svg className={`w-4 h-4 transition-colors ${openIndex === i ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </button>

                        <div
                            className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${openIndex === i ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}
                        >
                            <div className="overflow-hidden">
                                <div className="text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
