"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function DiagnosticHero() {
  const container = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { y: 80, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.15, ease: "power3.out" }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full min-h-[90vh] flex items-center justify-center bg-[#050505] text-white overflow-hidden px-6 pt-24"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
          alt="Diagnostic financier stratégique"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-[#050505]/80 to-[#050505]" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-5xl text-center py-20">
        {/* Badge */}
        <span className="hero-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-secondary text-xs font-bold uppercase tracking-widest mb-8">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Diagnostic stratégique PME
        </span>

        <h1 className="hero-reveal text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-[1.15]">
          Identifiez votre niveau de <br />
          <span className="italic text-secondary">maturité financière</span> en 5 minutes
        </h1>

        <p className="hero-reveal text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-12">
          Votre organisation financière manque de clarté ? Vous ne savez pas exactement où agir en priorité ?
          <br />
          <strong className="text-white">Nos diagnostics vous guident avec précision.</strong>
        </p>

        <div className="hero-reveal flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#diagnostics"
            className="px-8 py-4 bg-secondary text-primary rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white transition-colors duration-300 shadow-lg"
          >
            Commencer maintenant
          </a>
          <a
            href="#why"
            className="px-8 py-4 border border-white/20 text-white rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white/10 transition-colors duration-300"
          >
            Pourquoi un diagnostic ?
          </a>
        </div>

        {/* Quick Info */}
        <div className="hero-reveal flex flex-wrap justify-center gap-8 mt-16 text-white/40 text-sm">
          <span className="flex items-center gap-2">
            <div className="w-1 h-1 bg-secondary rounded-full"></div>
            5 à 7 minutes
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1 h-1 bg-secondary rounded-full"></div>
            Confidentiel
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1 h-1 bg-secondary rounded-full"></div>
            Résultats immédiats
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1 h-1 bg-secondary rounded-full"></div>
            Recommandation personnalisée
          </span>
        </div>
      </div>
    </section>
  );
}
