"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MethodeExamples() {
    const container = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".example-card",
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.2,
                    scrollTrigger: { trigger: container.current, start: "top 70%" }
                }
            );
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="w-full py-32 px-6 bg-[#050505] text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif mb-6">💬 Exemples concrets</h2>
                    <p className="text-white/60">Des résultats réels chez nos clients.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Ex 1 */}
                    <div className="example-card bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-6 text-2xl">🏭</div>
                        <h3 className="text-xl font-bold mb-4">Une PME industrielle</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-red-400 text-sm">12 fichiers Excel</span>
                                <span className="text-white/40">→</span>
                                <span className="text-green-400 font-bold text-sm">1 seul tableau de bord</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-red-400 text-sm">3 jours de clôture</span>
                                <span className="text-white/40">→</span>
                                <span className="text-green-400 font-bold text-sm">4 heures</span>
                            </div>
                        </div>
                    </div>

                    {/* Ex 2 */}
                    <div className="example-card bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300">
                        <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mb-6 text-2xl">💼</div>
                        <h3 className="text-xl font-bold mb-4">Cabinet de services</h3>
                        <p className="text-white/80 leading-relaxed">
                            <span className="block text-red-400 mb-2">40% de tâches manuelles</span>
                            <span className="block text-white/40 mb-2">↓ supprimées</span>
                            <span className="block text-green-400 font-bold text-xl">+2 jours par mois gagnés</span>
                        </p>
                    </div>

                    {/* Ex 3 */}
                    <div className="example-card bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300">
                        <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mb-6 text-2xl">📦</div>
                        <h3 className="text-xl font-bold mb-4">Entreprise e-commerce</h3>
                        <p className="text-white/80 leading-relaxed">
                            <span className="block text-red-400 mb-2">Flux dispersés</span>
                            <span className="block text-white/40 mb-2">↓ transformés en</span>
                            <span className="block text-green-400 font-bold">Vision temps réel et marges par produit</span>
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
