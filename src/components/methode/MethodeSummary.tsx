"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MethodeSummary() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Stagger reveal for benefits
        gsap.fromTo(".why-item",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%"
                }
            }
        );
    }, { scope: container });

    const BENEFITS = [
        { title: "Clair", text: "Chaque étape a un objectif précis" },
        { title: "Humain", text: "Accompagnement personnalisé" },
        { title: "Mesurable", text: "Résultats concrets et chiffrés" },
        { title: "Fiable", text: "Données sécurisées et contrôlées" },
        { title: "Adapté", text: "Pour PME et TPE, flexible selon vos besoins" },
    ];

    return (
        <section ref={container} className="py-24 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">
                        Pourquoi <span className="text-secondary italic">P.I.L.O.T.E.R.</span> fonctionne ?
                    </h2>
                    <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                    {BENEFITS.map((item, i) => (
                        <div key={i} className="why-item bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-transparent hover:border-secondary/20">
                            <div className="w-3 h-3 bg-secondary rounded-full mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.text}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-2xl text-gray-600 font-light mb-12">
                        Votre entreprise gagne : <span className="text-primary font-bold">clarté, sérénité, maîtrise et croissance.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/contact" className="bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all shadow-xl hover:shadow-primary/20 text-center">
                            👉 Demandez votre diagnostic gratuit
                        </Link>
                        <Link href="/contact" className="bg-transparent border border-gray-300 text-gray-600 px-10 py-5 rounded-full font-bold text-lg hover:border-primary hover:text-primary transition-all text-center">
                            👉 Parlez à un consultant expert
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
