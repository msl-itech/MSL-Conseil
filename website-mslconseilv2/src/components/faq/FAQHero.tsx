"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

export default function FAQHero() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo(".hero-text",
            { y: 50, opacity: 0, filter: "blur(10px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.2, ease: "power3.out" }
        );
    }, { scope: container });

    return (
        <section ref={container} className="relative w-full pt-48 pb-24 px-6 flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden">

            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0 select-none">
                <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                    alt="FAQ Background"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505] z-10" />
            </div>

            <div className="relative z-20 text-center max-w-4xl px-4">
                <span className="hero-text block text-secondary font-bold uppercase tracking-[0.2em] text-xs mb-6">Support & Information</span>
                <h1 className="hero-text text-5xl md:text-7xl font-serif mb-8 leading-[1.1]">
                    Une question ? <br />
                    <span className="text-white/40 italic">Nous avons les réponses.</span>
                </h1>
                <p className="hero-text text-lg text-white/60 font-light leading-relaxed max-w-xl mx-auto">
                    Comprendre notre approche, nos méthodes et comment nous transformons votre gestion financière.
                </p>
            </div>
        </section>
    );
}
