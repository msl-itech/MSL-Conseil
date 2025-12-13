"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

export default function ContactHero() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo(".contact-hero-text",
            { y: 50, opacity: 0, filter: "blur(10px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.2, ease: "power3.out" }
        );
    }, { scope: container });

    return (
        <section ref={container} className="relative w-full pt-48 pb-32 px-6 flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden min-h-[70vh]">

            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
                    alt="Contact Background"
                    fill
                    className="object-cover opacity-30 select-none"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/90 to-[#050505] z-10" />
            </div>

            <div className="relative z-20 text-center max-w-4xl mx-auto">
                <span className="contact-hero-text block text-secondary font-bold uppercase tracking-[0.2em] text-xs mb-8">Contact & Echange</span>
                <h1 className="contact-hero-text text-5xl md:text-7xl font-serif mb-8 leading-[1.1]">
                    Un expert en clarté financière <br />
                    <span className="italic text-white/40">à votre écoute.</span>
                </h1>
                <p className="contact-hero-text text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
                    Posez vos questions, demandez un diagnostic ou planifiez un échange.
                    <span className="block mt-2 text-white font-medium">Simple. Direct. Utile.</span>
                </p>
            </div>
        </section>
    );
}
