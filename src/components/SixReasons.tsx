"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
    {
        id: 1,
        title: "Expertise Odoo Finance + 20 ans en fiduciaire",
        description: "Des conseils réalistes, applicables, conformes.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Aucun risque pour votre équipe",
        description: "Nous renforçons vos compétences, jamais votre charge de travail.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Méthode PILOTER",
        description: "Sécurité, automatisation, visibilité.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "DAF / Contrôle de gestion à temps partiel",
        description: "Une expertise stratégique, sans les coûts d’un DAF interne.",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Formation adaptée à votre réalité",
        description: "Pratique, opérationnelle, directement applicable.",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 6,
        title: "Vision stratégique orientée résultats",
        description: "Des décisions plus rapides et plus solides.",
        image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function SixReasons() {
    const container = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section ref={container} className="relative w-full bg-white text-primary py-32 px-6 md:px-12 lg:px-24 overflow-hidden">

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">

                {/* Left: Dynamic Image Display */}
                <div className="flex-1 w-full relative h-[600px] flex items-center justify-center">

                    {/* Background Circle Decoration */}
                    <div className="absolute w-[500px] h-[500px] bg-gray-100 rounded-full -z-10 blur-3xl" />

                    {/* Image Container with Phone/Device Mockup Feel */}
                    <div className="relative w-full max-w-[400px] aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white bg-gray-200">
                        {REASONS.map((item, index) => (
                            <Image
                                key={item.id}
                                src={item.image}
                                alt={item.title}
                                fill
                                className={`object-cover transition-opacity duration-700 ease-in-out ${activeIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                                    }`}
                                priority={index === 0}
                            />
                        ))}

                        {/* Overlay Gradient for Text Readability if we added text over image (optional) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>
                </div>

                {/* Right: Interactive List */}
                <div className="flex-1 w-full pl-0 lg:pl-10">
                    <div className="mb-12">
                        <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Pourquoi nous choisir ?</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
                            6 Raisons de choisir <br />
                            <span className="italic text-secondary">MSL Conseils</span>
                        </h2>
                        <p className="mt-6 text-gray-500 text-lg">
                            Pour piloter vos finances dans Odoo avec clarté et sérénité.
                        </p>
                    </div>

                    {/* List Items */}
                    <div className="relative flex flex-col">

                        {/* Vertical Line Indicator */}
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-200">
                            <div
                                className="absolute w-[2px] bg-secondary transition-all duration-500 ease-in-out"
                                style={{
                                    height: `${100 / REASONS.length}%`,
                                    top: `${(activeIndex * 100) / REASONS.length}%`
                                }}
                            />
                        </div>

                        {REASONS.map((item, index) => (
                            <div
                                key={item.id}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={`
                            relative pl-10 py-6 cursor-pointer transition-all duration-500
                            ${activeIndex === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'}
                        `}
                            >
                                <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${activeIndex === index ? 'text-primary' : 'text-gray-400'}`}>
                                    {item.title}
                                </h3>

                                <div
                                    className={`
                                overflow-hidden transition-all duration-500 ease-in-out
                                ${activeIndex === index ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'}
                            `}
                                >
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
