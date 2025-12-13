"use client";

import Link from "next/link";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MethodeCTA() {
    return (
        <section className="w-full py-24 px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-br from-primary to-[#002f20] rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden group">

                    {/* Background glow effects */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/30 transition-colors duration-700" />

                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-10 relative z-10">
                        Prêt à reprendre le contrôle ?
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center relative z-10">
                        <Link href="/contact" className="px-8 py-4 bg-white text-primary rounded-full font-bold uppercase tracking-wider text-sm hover:bg-secondary hover:text-white transition-all duration-300 shadow-xl hover:scale-105 text-center">
                            👉 Demandez votre diagnostic gratuit
                        </Link>
                        <Link href="/contact" className="px-8 py-4 bg-transparent border border-white text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition-all duration-300 text-center">
                            👉 Parlez à un consultant expert
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
