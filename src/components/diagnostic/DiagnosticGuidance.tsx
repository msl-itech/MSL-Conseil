"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GUIDANCE_ITEMS = [
  {
    situation: "Besoin de structurer votre pilotage financier",
    recommendation: "Diagnostic DAF",
    href: "#daf",
  },
  {
    situation: "Comprendre vos marges",
    recommendation: "Contrôle – Fondamentaux",
    href: "#controle",
  },
  {
    situation: "Structurer votre pilotage",
    recommendation: "Plan d'action 2026",
    href: "#controle",
  },
  {
    situation: "Organisation fragile",
    recommendation: "Structuration des bases",
    href: "#comptabilite",
  },
  {
    situation: "Automatiser intelligemment",
    recommendation: "Automatisation Odoo",
    href: "#automatisation",
  },
];

export default function DiagnosticGuidance() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".guidance-item",
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative w-full bg-primary py-24 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 md:p-12 border border-white/20">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Vous hésitez ?</h2>
            <p className="text-white/70 text-lg">Voici un repère simple pour vous guider</p>
          </div>

          {/* Guidance List */}
          <div className="space-y-4 mb-10">
            {GUIDANCE_ITEMS.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="guidance-item flex items-center gap-4 bg-white/5 rounded-xl p-6 border border-white/10 hover:border-secondary hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-white/80 group-hover:text-white transition-colors">{item.situation}</span>
                  <span className="hidden sm:inline text-white/30">→</span>
                  <span className="font-bold text-secondary">{item.recommendation}</span>
                </div>
                <svg
                  className="w-5 h-5 text-white/30 group-hover:text-secondary transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center pt-6 border-t border-white/20">
            <p className="text-white/60 mb-6">Choisissez le sujet le plus proche de votre difficulté actuelle</p>
            <a
              href="#diagnostics"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white hover:text-primary border border-white/20 hover:border-white transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Retour aux diagnostics
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
