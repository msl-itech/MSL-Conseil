"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ARTICLES = [
    {
        title: "Explications",
        readTime: "3 min",
        excerpt: "Explications courtes sur le contrôle de gestion, DAF à temps partiel."
    },
    {
        title: "Tendances et bonnes pratiques",
        readTime: "4 min",
        excerpt: "Pour PME/TPE : restez à jour avec les méthodes qui fonctionnent."
    },
    {
        title: "Conseils concrets",
        readTime: "5 min",
        excerpt: "Pour la digitalisation financière : ne ratez pas votre virage."
    }
];

export default function ResourceArticles() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo(".article-row",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%"
                }
            }
        );
    }, { scope: container });

    return (
        <section ref={container} className="w-full py-24 px-6 md:px-12 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16 border-b border-gray-100 pb-8 flex justify-between items-end">
                    <h2 className="text-3xl md:text-4xl font-serif text-primary">Articles simples </h2>
                    <Link href="/ressources#articles" className="text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">Tous les articles</Link>
                </div>

                {/* Empty state - No articles yet */}
                <div className="article-row py-16 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Pas d'article disponible pour le moment</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Nos articles sur le contrôle de gestion et la finance d'entreprise arrivent bientôt.
                        Restez connecté !
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm text-secondary font-medium">
                        <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                        Prochainement
                    </div>
                </div>

                {/* Avant / Après Block - Embedded */}
                <div className="mt-24 bg-primary rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-12">
                        <div className="flex-1 opacity-60">
                            <span className="block text-xs font-bold uppercase tracking-widest mb-2 text-white/50">Avant</span>
                            <p className="text-lg font-light leading-relaxed">
                                Concepts financiers flous ou incompris
                            </p>
                        </div>
                        <div className="hidden md:block w-px bg-white/10" />
                        <div className="flex-1">
                            <span className="block text-xs font-bold uppercase tracking-widest mb-2 text-secondary">Après</span>
                            <p className="text-2xl font-serif leading-tight">
                                Vous comprenez vos données et prenez des décisions éclairées
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
