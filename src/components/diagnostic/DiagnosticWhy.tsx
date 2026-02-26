"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function DiagnosticWhy() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".why-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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
    <section id="why" ref={container} className="relative w-full bg-white py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 why-card">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Pourquoi commencer par un diagnostic ?
          </h2>
          <p className="text-gray-600 text-xl">Parce que les blocages ne viennent pas d&apos;où vous le pensez</p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Image */}
          <div className="why-card relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
              alt="Diagnostic stratégique"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/20"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-white text-lg font-light leading-relaxed">
                Un diagnostic vous permet d&apos;objectiver votre situation et d&apos;identifier vos priorités réelles
              </p>
            </div>
          </div>

          {/* Right: Comparison */}
          <div className="why-card space-y-8">
            <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 border-2 border-red-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Les blocages viennent rarement de
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Un manque d&apos;outil</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Un manque de budget</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-secondary/10 to-white rounded-2xl p-8 border-2 border-secondary/30">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Ils viennent le plus souvent de
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-900 font-medium">Un manque de méthode</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-900 font-medium">Un manque de clarté</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-900 font-medium">Une structure incomplète</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Objectiver votre situation",
              desc: "Des faits, pas des impressions",
            },
            {
              title: "Identifier votre priorité réelle",
              desc: "Ce qui compte vraiment maintenant",
            },
            {
              title: "Éviter des décisions coûteuses",
              desc: "Investir au bon moment, au bon endroit",
            },
            {
              title: "Avancer avec méthode",
              desc: "Un plan clair, étape par étape",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="why-card bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-secondary hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#diagnostics"
              className="inline-flex items-center gap-3 px-10 py-5 bg-secondary text-white rounded-2xl font-bold text-lg hover:bg-primary transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Découvrir mon niveau maintenant
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/ressources/trajectoire"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary border-2 border-primary rounded-2xl font-bold text-lg hover:bg-primary/5 transition-all duration-300"
            >
              Voir le parcours complet
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
