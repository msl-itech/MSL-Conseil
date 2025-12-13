"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ResourcesCTA() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo(".final-res-cta",
            { scale: 0.95, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 85%"
                }
            }
        );
    }, { scope: container });

    return (
        <section ref={container} className="py-24 px-6 bg-white">
            <div className="final-res-cta max-w-5xl mx-auto rounded-[3rem] bg-[#0a0a0a] text-white p-12 md:p-20 text-center relative overflow-hidden">

                {/* Animated Background Gradients */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] mix-blend-screen translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
                        Ne partez pas les mains vides.
                    </h2>
                    <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
                        Téléchargez notre pack complet de ressources ou contactez-nous pour une mise en place sur-mesure.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="bg-secondary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all shadow-xl hover:shadow-secondary/20 hover:-translate-y-1">
                            👉 Télécharger toutes les ressources
                        </button>
                        <button className="bg-transparent border border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all">
                            👉 Parler à un expert
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
