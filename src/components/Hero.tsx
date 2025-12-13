"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline();

            // Animation d'entrée sophistiquée
            tl.from(titleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                delay: 0.2,
            })
                .from(
                    subtitleRef.current,
                    {
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "-=1"
                )
                .from(
                    ".hero-btn",
                    {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                        stagger: 0.1,
                    },
                    "-=0.5"
                );

            // Effet Parallax au scroll
            gsap.to(container.current, {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                y: 200, // Déplace le fond plus lentement que le scroll
                scale: 0.95, // Léger effet de recul
                opacity: 0.5,
            });
        },
        { scope: container }
    );

    return (
        <section
            ref={container}
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-primary px-4 text-center text-white"
        >
            {/* Abstract Background Element */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute -left-1/4 -top-1/4 h-[150vh] w-[150vw] bg-[radial-gradient(circle_at_center,rgba(254,152,26,0.15),transparent_50%)] blur-3xl" />
                <div className="absolute bottom-0 right-0 h-[80vh] w-[80vw] bg-[radial-gradient(circle_at_center,rgba(254,152,26,0.1),transparent_50%)] blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl">
                <h1
                    ref={titleRef}
                    className="mb-6 font-sans text-6xl font-bold tracking-tight md:text-8xl lg:text-9xl"
                >
                    MSL <span className="text-secondary">CONSEIL</span>
                </h1>

                <p
                    ref={subtitleRef}
                    className="mx-auto mb-12 max-w-2xl text-xl font-light leading-relaxed text-gray-200 md:text-2xl"
                >
                    L'expertise comptable réinventée pour les créateurs d'avenir.
                    <br className="hidden md:block" />
                    Une vision premium de votre réussite financière.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <button className="hero-btn group relative overflow-hidden rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 active:scale-95">
                        <span className="relative z-10">Découvrir nos services</span>
                        <div className="absolute inset-0 -z-0 translate-y-full rounded-full bg-white transition-transform duration-300 group-hover:translate-y-0" />
                        <span className="absolute inset-0 z-10 flex items-center justify-center text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Découvrir nos services
                        </span>
                    </button>

                    <button className="hero-btn group rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10">
                        Nous contacter
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-70">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M7 13l5 5 5-5" />
                    <path d="M7 6l5 5 5-5" />
                </svg>
            </div>
        </section>
    );
}
