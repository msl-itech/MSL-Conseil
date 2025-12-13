"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FAQCTA() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo(".cta-content",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%"
                }
            }
        );
    }, { scope: container });

    return (
        <section ref={container} className="w-full py-32 px-6 bg-white flex justify-center">
            <div className="cta-content max-w-4xl w-full bg-primary rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">

                {/* Decorative Shapes */}
                <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]" />

                <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
                        Encore une interrogation ?
                    </h2>
                    <p className="text-white/70 text-lg mb-12 max-w-xl mx-auto">
                        Chaque situation est unique. Discutons de la vôtre et voyons comment nous pouvons vous aider.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <button className="px-8 py-4 bg-secondary text-primary rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105 shadow-lg shadow-secondary/20">
                            👉 Demander votre diagnostic gratuit
                        </button>
                        <button className="px-8 py-4 border border-white/20 text-white rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/10 transition-all duration-300">
                            👉 Parler à un consultant expert
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
