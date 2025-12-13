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

                <div className="space-y-12">
                    {ARTICLES.map((article, i) => (
                        <div key={i} className="article-row group cursor-pointer block">
                            <div className="flex flex-col md:flex-row gap-4 md:items-baseline justify-between mb-2">
                                <h3 className="text-2xl font-medium text-gray-900 group-hover:text-secondary transition-colors">{article.title}</h3>
                                <span className="text-xs text-gray-400 font-mono uppercase tracking-wider whitespace-nowrap">{article.readTime} de lecture</span>
                            </div>
                            <p className="text-gray-500 leading-relaxed max-w-2xl">{article.excerpt}</p>
                            <div className="h-px w-full bg-gray-100 mt-8 group-hover:bg-gray-200 transition-colors" />
                        </div>
                    ))}
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
