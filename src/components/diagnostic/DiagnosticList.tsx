"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DiagnosticList() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray(".diagnostic-section").forEach((section: any) => {
        gsap.fromTo(
          section.querySelectorAll(".animate-in"),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative w-full">
      {/* 1. DAF Diagnostic - Green Background */}
      <div id="daf" className="diagnostic-section scroll-mt-20 bg-primary py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="animate-in order-2 lg:order-1">
              <span className="inline-block px-4 py-2 bg-white/20 text-white text-xs font-bold rounded-full mb-6">
                DIAGNOSTIC #1
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                Avez-vous besoin d&apos;un Directeur Financier ?
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Beaucoup de dirigeants de PME attendent trop longtemps avant de structurer la fonction finance. Le
                pilotage reste artisanal.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
                <h3 className="text-white font-bold mb-6">Ce diagnostic vous permet de :</h3>
                <div className="space-y-4">
                  {[
                    "Situer la maturité de votre fonction finance",
                    "Mesurer votre capacité d'anticipation",
                    "Identifier les signaux indiquant un besoin de DAF",
                    "Comprendre quand structurer un rôle stratégique",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/ressources/guides/daf-pme#diagnostic"
                  className="flex-1 px-8 py-4 bg-secondary text-primary rounded-xl font-bold text-center hover:bg-white hover:text-primary transition-colors shadow-xl"
                >
                  Faire le diagnostic DAF
                </Link>
                <Link
                  href="/ressources/guides/daf-pme"
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primary transition-colors text-center"
                >
                  Lire le guide
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div className="animate-in order-1 lg:order-2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1553484771-371a605b060b?q=80&w=2070&auto=format&fit=crop"
                alt="Directeur Financier"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Contrôle de gestion - White Background */}
      <div id="controle" className="diagnostic-section scroll-mt-20 bg-white py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-in">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Contrôle de gestion</h2>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto">
              Vos chiffres servent-ils réellement à décider ?
            </p>
            <p className="text-gray-600 mt-4">
              Avoir des chiffres ne suffit pas. Encore faut-il qu&apos;ils éclairent les décisions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Niveau 1 */}
            <div className="animate-in bg-gradient-to-br from-purple-50 to-white rounded-3xl p-10 border-2 border-purple-200 shadow-xl">
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 text-xs font-bold rounded-full mb-6">
                NIVEAU 1
              </span>
              <h3 className="text-3xl font-serif text-gray-900 mb-4">Maîtriser les fondamentaux</h3>
              <p className="text-gray-600 mb-8">Pour les dirigeants qui veulent comprendre clairement</p>

              <div className="relative h-[250px] rounded-2xl overflow-hidden mb-8">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                  alt="Contrôle de gestion fondamentaux"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-purple-50 rounded-xl p-6 mb-6">
                <ul className="space-y-3 text-sm text-gray-700">
                  {["Marges, coûts, budgets", "Écarts et indicateurs essentiels", "Capacité à lire vos marges"].map(
                    (item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <Link
                href="/ressources/guides/controle-gestion#diagnostic"
                className="block w-full px-6 py-4 bg-purple-600 text-white rounded-xl font-bold text-center hover:bg-purple-500 transition-colors shadow-lg"
              >
                Diagnostic Fondamentaux
              </Link>
            </div>

            {/* Niveau 2 */}
            <div className="animate-in bg-gradient-to-br from-indigo-50 to-white rounded-3xl p-10 border-2 border-indigo-200 shadow-xl">
              <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full mb-6">
                NIVEAU 2
              </span>
              <h3 className="text-3xl font-serif text-gray-900 mb-4">Plan d&apos;action 2026</h3>
              <p className="text-gray-600 mb-8">Pour les dirigeants prêts à passer à l&apos;action</p>

              <div className="relative h-[250px] rounded-2xl overflow-hidden mb-8">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                  alt="Plan d'action 2026"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-indigo-50 rounded-xl p-6 mb-6">
                <ul className="space-y-3 text-sm text-gray-700">
                  {["Mise en place des indicateurs", "Régularité du suivi", "Qualité du reporting"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/ressources/guides/controle-gestion-formation#diagnostic"
                className="block w-full px-6 py-4 bg-indigo-600 text-white rounded-xl font-bold text-center hover:bg-indigo-500 transition-colors shadow-lg"
              >
                Diagnostic Plan 2026
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Automatisation - Green Background */}
      <div id="automatisation" className="diagnostic-section scroll-mt-20 bg-primary py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="animate-in relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2074&auto=format&fit=crop"
                alt="Automatisation Odoo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
            </div>

            {/* Right: Content */}
            <div className="animate-in">
              <span className="inline-block px-4 py-2 bg-white/20 text-white text-xs font-bold rounded-full mb-6">
                DIAGNOSTIC #3
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                Êtes-vous prêt à automatiser vos finances dans Odoo ?
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Automatiser n&apos;est pas cliquer sur un bouton. C&apos;est structurer avant d&apos;accélérer.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
                <h3 className="text-white font-bold mb-6">Ce diagnostic identifie si :</h3>
                <div className="space-y-4">
                  {[
                    "Vos règles internes sont suffisamment claires",
                    "Votre organisation peut supporter l'automatisation",
                    "Vos flux sont cohérents",
                    "Votre équipe maîtrise les processus",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/ressources/guides/automatisation-diagnostic#diagnostic"
                className="block w-full sm:w-auto px-8 py-4 bg-secondary text-primary rounded-xl font-bold text-center hover:bg-white hover:text-primary transition-colors shadow-xl"
              >
                Faire le diagnostic Automatisation Odoo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Comptabilité - White Background */}
      <div id="comptabilite" className="diagnostic-section scroll-mt-20 bg-white py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-in">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Structurer votre base comptable</h2>
            <p className="text-gray-600">Le diagnostic comptable comprend deux niveaux distincts</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Niveau 1 */}
            <div className="animate-in bg-gradient-to-br from-orange-50 to-white rounded-3xl p-10 border-2 border-orange-200 shadow-xl">
              <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 text-xs font-bold rounded-full mb-6">
                NIVEAU 1
              </span>
              <h3 className="text-3xl font-serif text-gray-900 mb-4">Structurer votre comptabilité</h3>
              <p className="text-gray-600 mb-8">Pour les entreprises où l&apos;organisation est floue</p>

              <div className="relative h-[250px] rounded-2xl overflow-hidden mb-8">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop"
                  alt="Structuration comptable"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-orange-50 rounded-xl p-6 mb-6">
                <ul className="space-y-3 text-sm text-gray-700">
                  {["Plan comptable flou", "Flux mal organisés", "Responsabilités imprécises"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/ressources/guides/diagnostic-gestion#diagnostic"
                className="block w-full px-6 py-4 bg-orange-600 text-white rounded-xl font-bold text-center hover:bg-orange-500 transition-colors shadow-lg"
              >
                Diagnostic Structuration
              </Link>
            </div>

            {/* Niveau 2 */}
            <div className="animate-in bg-gradient-to-br from-amber-50 to-white rounded-3xl p-10 border-2 border-amber-200 shadow-xl">
              <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 text-xs font-bold rounded-full mb-6">
                NIVEAU 2
              </span>
              <h3 className="text-3xl font-serif text-gray-900 mb-4">Automatisation opérationnelle</h3>
              <p className="text-gray-600 mb-8">Pour automatiser progressivement</p>

              <div className="relative h-[250px] rounded-2xl overflow-hidden mb-8">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                  alt="Automatisation opérationnelle"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-amber-50 rounded-xl p-6 mb-6">
                <ul className="space-y-3 text-sm text-gray-700">
                  {["Intégration des modules", "Flux automatisés", "Cohérence organisation/tech"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/ressources/guides/automatisation-odoo#diagnostic"
                className="block w-full px-6 py-4 bg-amber-600 text-white rounded-xl font-bold text-center hover:bg-amber-500 transition-colors shadow-lg"
              >
                Diagnostic Automatisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
