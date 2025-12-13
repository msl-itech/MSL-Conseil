"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMission() {
    const container = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Infinite marquee
            gsap.to(".marquee-track", {
                xPercent: -50,
                duration: 30,
                ease: "none",
                repeat: -1,
            });

            // Parallax on images
            gsap.to(".parallax-img", {
                y: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: ".mission-grid",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            // Text reveal
            gsap.fromTo(
                ".text-reveal",
                { clipPath: "inset(100% 0 0 0)", opacity: 0 },
                {
                    clipPath: "inset(0% 0 0 0)",
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".mission-text",
                        start: "top 80%",
                    },
                }
            );

            // Counter animation for "20 ans"
            const counter = { value: 0 };
            gsap.to(counter, {
                value: 20,
                duration: 2,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: ".counter-number",
                    start: "top 80%",
                },
                onUpdate: () => {
                    const el = document.querySelector(".counter-number");
                    if (el) el.textContent = Math.floor(counter.value).toString();
                },
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="w-full bg-white overflow-hidden">

            {/* Giant Marquee */}
            {/* <div ref={marqueeRef} className="py-12 bg-gray-50 overflow-hidden border-y border-gray-100">
                <div className="marquee-track flex whitespace-nowrap">
                    {[...Array(4)].map((_, i) => (
                        <span key={i} className="text-[12vw] font-serif text-gray-200 mx-8 select-none">
                            Clarté • Fiabilité • Sérénité •
                        </span>
                    ))}
                </div>
            </div> */}

            {/* Main Mission Content */}
            <div className="mission-grid grid grid-cols-1 lg:grid-cols-2 min-h-screen">

                {/* Left: Sticky Image Stack */}
                <div className="relative h-[50vh] lg:h-auto lg:sticky lg:top-0 overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop"
                            alt="Office Collaboration"
                            fill
                            className="parallax-img object-cover scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent lg:bg-gradient-to-l" />
                    </div>

                    {/* Floating Card */}
                    <div className="absolute bottom-8 left-8 right-8 lg:bottom-16 lg:left-16 lg:right-auto lg:max-w-xs bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-100">
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="counter-number text-7xl font-bold text-secondary">0</span>
                            <span className="text-2xl font-medium text-gray-400">ans</span>
                        </div>
                        <p className="text-gray-600 text-sm">d'expertise au service des dirigeants de PME.</p>
                    </div>
                </div>

                {/* Right: Scrolling Text Content */}
                <div className="mission-text py-24 lg:py-32 px-8 lg:px-16 space-y-24">

                    <div className="space-y-8">
                        <span className="text-reveal block text-xs font-bold uppercase tracking-[0.3em] text-secondary">Notre Mission</span>
                        <h2 className="text-reveal text-4xl lg:text-6xl font-serif text-primary leading-[1.1]">
                            Simplifier, fiabiliser et automatiser vos finances.
                        </h2>
                        <p className="text-reveal text-xl text-gray-500 font-light max-w-lg">
                            Pour vous permettre de décider <span className="text-secondary font-medium">sans stress</span>.
                        </p>
                    </div>

                    {/* Evolution Steps - More Visual */}
                    <div className="space-y-12">
                        <div className="text-reveal group flex items-start gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                                📊
                            </div>
                            <div>
                                <p className="text-sm uppercase tracking-widest text-gray-400 mb-1">Avant</p>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2 line-through decoration-red-300">Données dispersées</h3>
                                <p className="text-gray-500">Excel, emails, logiciels isolés...</p>
                            </div>
                        </div>

                        <div className="w-full flex justify-center">
                            <div className="w-px h-16 bg-gradient-to-b from-red-200 to-green-300" />
                        </div>

                        <div className="text-reveal group flex items-start gap-6 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                                🎯
                            </div>
                            <div>
                                <p className="text-sm uppercase tracking-widest text-secondary mb-1">Après MSL</p>
                                <h3 className="text-2xl font-bold text-primary mb-2">Flux centralisés et maîtrisés</h3>
                                <p className="text-primary/70">Odoo configuré, processus automatisés, vision claire.</p>
                            </div>
                        </div>
                    </div>

                    {/* Quote Block */}
                    <blockquote className="text-reveal relative pl-8 border-l-4 border-secondary">
                        <p className="text-2xl lg:text-3xl font-serif text-gray-800 italic leading-relaxed">
                            "Notre but : vous donner une vision simple et immédiate de votre entreprise."
                        </p>
                    </blockquote>

                </div>
            </div>

            {/* Why We Exist - Full Width Statement */}
            <div className="py-32 px-6 bg-[#050505] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <h3 className="text-sm uppercase tracking-[0.3em] text-secondary mb-8">Pourquoi nous existons</h3>
                    <p className="text-3xl lg:text-5xl font-serif leading-relaxed mb-12">
                        Trop de PME fonctionnent avec des <span className="text-secondary">outils mal paramétrés</span>, des <span className="text-secondary">chiffres flous</span> et un manque de visibilité.
                    </p>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Nous avons créé MSL Conseils pour changer cela — durablement.<br />
                        <strong className="text-white">Finance, process et technologie, enfin alignés.</strong>
                    </p>
                </div>
            </div>
        </section>
    );
}
