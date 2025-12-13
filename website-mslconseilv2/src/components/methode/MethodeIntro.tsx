"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MethodeIntro() {
    const container = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".intro-content",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 75%",
                    }
                }
            );
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="w-full py-24 md:py-32 px-6 bg-gray-50 border-b border-gray-100">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">

                {/* Left Column: The Big Bold Statement */}
                <div className="flex-1 intro-content relative pl-8 md:pl-12 border-l-4 border-secondary">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary leading-[1.1] mb-8">
                        Nous ne faisons pas votre comptabilité.
                    </h2>
                </div>

                {/* Right Column: Explanation & Action */}
                <div className="flex-1 intro-content pt-2">

                    <p className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed mb-8">
                        Nous <strong className="text-secondary font-medium">structurons, automatisons, formons et pilotons.</strong>
                    </p>

                    <p className="text-gray-500 text-lg leading-relaxed mb-12">
                        Votre fiduciaire reste en place. Vos équipes deviennent plus efficaces. <br />
                        Vous reprenez simplement le contrôle de la direction.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* <Link href="/solutions" className="px-8 py-4 bg-primary text-white rounded-full font-bold uppercase tracking-wider text-xs hover:bg-secondary hover:text-white transition-all duration-300 shadow-lg hover:shadow-secondary/30 text-center">
                            👉 Découvrir la méthode P.I.L.O.T.E.R.
                        </Link> */}
                        <Link href="/contact" className="px-8 py-4 bg-transparent border border-gray-300 text-gray-600 rounded-full font-bold uppercase tracking-wider text-xs hover:border-primary hover:text-primary transition-colors duration-300 text-center">
                            Réserver un audit
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
