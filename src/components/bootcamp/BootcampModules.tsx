"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
    {
        id: 1,
        letter: "P",
        title: "Analyse & cadrage",
        subtitle: "Planifier",
        description: "La durée dépend de la taille et de la complexité de l'entreprise",
        variants: [
            { label: "Petite structure", duration: "1 jour (8h)", detail: "½ journée immersion + ½ journée analyse" },
            { label: "Entreprise moyenne", duration: "2 jours (16h)", detail: null },
            { label: "Organisation complexe", duration: "Sur mesure", detail: null },
        ],
        highlight: "Cette phase est indissociable du bootcamp. Sans elle, il n'y a pas de formation pertinente.",
        color: "primary"
    },
    {
        id: 2,
        letter: "D",
        title: "Bootcamp opérationnel personnalisé",
        subtitle: "Déployer",
        description: "Sur base du rapport d'analyse, nous construisons votre parcours sur mesure",
        features: [
            "Planning de formation sur mesure",
            "Contenu directement lié aux recommandations",
            "Durée ajustée au nombre de personnes à former"
        ],
        note: "Former 3 personnes ou 10 personnes n'implique ni le même rythme, ni le même niveau d'accompagnement, ni le même temps nécessaire.",
        highlight: "Le planning est co-construit, jamais imposé.",
        color: "secondary"
    }
];

const IMPACTS = [
    { icon: "🎯", label: "Équipes autonomes" },
    { icon: "🔒", label: "Processus sécurisés" },
    { icon: "⚡", label: "Zéro ressaisie" },
    { icon: "📊", label: "Indicateurs exploités" },
    { icon: "🚀", label: "Décisions rapides" },
    { icon: "😌", label: "Sérénité retrouvée" },
];

const TARGETS = [
    { icon: "👔", label: "Dirigeants de PME" },
    { icon: "📈", label: "DAF / Responsables financiers" },
    { icon: "🧮", label: "Équipes comptables internes" },
    { icon: "💻", label: "Entreprises Odoo" },
];

export default function BootcampModules() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Hero title reveal with split effect
        gsap.fromTo(".hero-title span",
            { y: 120, opacity: 0, rotateX: -90 },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1.4,
                stagger: 0.08,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: ".hero-title",
                    start: "top 80%",
                },
            }
        );

        // Floating cards parallax
        gsap.to(".float-card", {
            y: -30,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

        // Phase cards entrance
        gsap.fromTo(".phase-card",
            { scale: 0.9, opacity: 0, y: 60 },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".phases-container",
                    start: "top 70%",
                },
            }
        );

        // Impact items stagger
        gsap.fromTo(".impact-item",
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".impacts-grid",
                    start: "top 75%",
                },
            }
        );

        // Pricing reveal
        gsap.fromTo(".pricing-number",
            { scale: 0.5, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1.2,
                ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                    trigger: ".pricing-section",
                    start: "top 70%",
                },
            }
        );

        // Stats counter animation
        const counters = document.querySelectorAll('.counter-value');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target') || '0');
            gsap.fromTo(counter,
                { innerText: 0 },
                {
                    innerText: target,
                    duration: 2,
                    ease: "power2.out",
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 80%",
                    },
                }
            );
        });

    }, { scope: container });

    return (
        <section id="modules" ref={container} className="relative w-full bg-[#fafafa] overflow-hidden">

            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-secondary/5 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#014730 1px, transparent 1px), linear-gradient(90deg, #014730 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            {/* ====================================== */}
            {/* HERO SECTION */}
            {/* ====================================== */}
            <div className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
                        <div className="lg:max-w-3xl">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-primary text-sm font-medium mb-8">
                                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                                Méthodologie exclusive
                            </span>

                            <h2 className="hero-title text-5xl md:text-7xl lg:text-8xl font-serif text-primary leading-[0.9] tracking-tight overflow-hidden">
                                <span className="inline-block">Comment</span>{" "}
                                <span className="inline-block">sont</span>{" "}
                                <span className="inline-block">construits</span>
                                <br />
                                <span className="inline-block italic text-secondary">nos</span>{" "}
                                <span className="inline-block italic text-secondary">bootcamps</span>
                            </h2>
                        </div>

                        {/* Floating Stats Card */}
                        <div className="float-card relative bg-white rounded-3xl p-8 shadow-2xl shadow-primary/10 border border-gray-100 lg:min-w-[280px]">
                            <div className="absolute -top-3 -right-3 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
                            <div className="relative">
                                <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Durée max</p>
                                <p className="text-6xl font-serif text-primary">10<span className="text-2xl text-secondary ml-1">jours</span></p>
                                <p className="text-gray-400 mt-2">Par parcours bootcamp</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ====================================== */}
            {/* PHASES SECTION - Cards */}
            {/* ====================================== */}
            <div className="phases-container relative py-20 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">

                    {/* Phase Cards - Show both */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {PHASES.map((phase) => (
                            <div
                                key={phase.id}
                                className="phase-card group relative bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 hover:shadow-3xl transition-all duration-500"
                            >
                                {/* Gradient Header */}
                                <div className={`relative h-48 bg-gradient-to-br ${phase.color === 'primary'
                                    ? 'from-primary via-primary/90 to-[#016b45]'
                                    : 'from-secondary via-secondary/90 to-[#d4870f]'
                                    } p-8 overflow-hidden`}>

                                    {/* Decorative circles */}
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-xl" />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-3xl ${phase.color === 'primary' ? 'bg-secondary text-primary' : 'bg-primary text-white'
                                                }`}>
                                                {phase.letter}
                                            </span>
                                            <div>
                                                <p className="text-white/60 text-xs uppercase tracking-widest">{phase.subtitle}</p>
                                                <h3 className="text-2xl md:text-3xl font-serif text-white">{phase.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <p className="text-gray-600 text-lg mb-8">{phase.description}</p>

                                    {/* Phase 1: Variants grid */}
                                    {phase.variants && (
                                        <div className="grid grid-cols-1 gap-4 mb-8">
                                            {phase.variants.map((variant, i) => (
                                                <div key={i} className="group/item flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-primary/5 transition-colors cursor-default">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                                                        <span className="text-white font-bold">{i + 1}</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-primary">{variant.label}</p>
                                                        {variant.detail && <p className="text-sm text-gray-400">{variant.detail}</p>}
                                                    </div>
                                                    <span className="text-xl font-serif text-secondary">{variant.duration}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Phase 2: Features list */}
                                    {phase.features && (
                                        <div className="space-y-4 mb-6">
                                            {phase.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-4">
                                                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Phase 2: Additional note */}
                                    {'note' in phase && phase.note && (
                                        <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-100">
                                            <p className="text-sm text-gray-600 italic">{phase.note}</p>
                                        </div>
                                    )}

                                    {/* Highlight callout */}
                                    <div className={`p-5 rounded-2xl ${phase.color === 'primary' ? 'bg-primary/5 border border-primary/10' : 'bg-secondary/5 border border-secondary/10'
                                        }`}>
                                        <p className={`font-medium ${phase.color === 'primary' ? 'text-primary' : 'text-primary'}`}>
                                            👉 {phase.highlight}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ====================================== */}
            {/* PRICING SECTION - Premium Design */}
            {/* ====================================== */}
            <div className="pricing-section relative py-32 px-6 md:px-12 lg:px-24 bg-primary overflow-hidden">

                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle,_rgba(254,152,26,0.1)_0%,_transparent_70%)]" />
                    <div className="absolute top-20 left-20 w-4 h-4 bg-secondary/50 rounded-full animate-ping" />
                    <div className="absolute bottom-40 right-32 w-3 h-3 bg-secondary/30 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">

                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-secondary text-sm font-medium mb-6">
                            Transparence totale
                        </span>
                        <h3 className="text-4xl md:text-6xl font-serif text-white mb-4">
                            Logique de <span className="text-secondary italic">tarification</span>
                        </h3>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            Nous ne vendons pas des packs. Nous facturons du temps d'intervention à forte valeur ajoutée.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {/* Main pricing card */}
                        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 overflow-hidden group hover:bg-white/15 transition-colors">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                            <div className="relative">
                                <p className="text-white/50 uppercase tracking-widest text-sm mb-4">Taux horaire</p>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="pricing-number text-7xl md:text-8xl font-serif text-secondary">150</span>
                                    <span className="text-2xl text-white/70">€ HTVA</span>
                                </div>
                                <p className="text-white/60">par heure d'intervention</p>
                            </div>
                        </div>

                        {/* Secondary pricing card */}
                        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 overflow-hidden">
                            <p className="text-white/50 uppercase tracking-widest text-sm mb-4">Déplacement</p>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-5xl font-serif text-white">50</span>
                                <span className="text-xl text-white/50">%</span>
                            </div>
                            <p className="text-white/60">du temps de trajet facturé<br />(coût matériel et temps non productif)</p>
                        </div>
                    </div>

                    {/* Guarantee badges */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {["Transparence", "Équité", "Alignement effort/valeur"].map((item, i) => (
                            <span key={i} className="px-6 py-3 bg-secondary/20 text-secondary rounded-full font-medium backdrop-blur-sm border border-secondary/30">
                                {item}
                            </span>
                        ))}
                    </div>

                    <p className="text-center text-2xl md:text-3xl font-serif text-white/80 italic mt-16 max-w-3xl mx-auto">
                        "Vous ne payez pas un nombre de jours. Vous investissez dans de la <span className="text-secondary">clarté</span>, de l'<span className="text-secondary">autonomie</span> et de la <span className="text-secondary">maîtrise</span>."
                    </p>

                    {/* Ordres de grandeur */}
                    <div className="mt-16 bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20">
                        <h4 className="text-2xl font-serif text-white mb-6 text-center">Ordres de grandeur <span className="text-white/50 text-lg">(repères, pas promesses)</span></h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <p className="text-white/50 uppercase tracking-widest text-xs mb-2">Phase d'analyse</p>
                                <p className="text-3xl font-serif text-secondary">1 à 2 <span className="text-lg text-white/70">jours</span></p>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <p className="text-white/50 uppercase tracking-widest text-xs mb-2">Bootcamp</p>
                                <p className="text-3xl font-serif text-secondary">2 à 10 <span className="text-lg text-white/70">jours max</span></p>
                                <p className="text-white/50 text-sm mt-2">selon périmètre, maturité, nb participants</p>
                            </div>
                        </div>
                        <p className="text-center text-white/70 mt-6">👉 Le périmètre exact est défini après l'analyse, jamais avant.</p>
                    </div>
                </div>
            </div>

            {/* ====================================== */}
            {/* IMPACT SECTION - Visual Grid */}
            {/* ====================================== */}
            <div className="relative py-32 px-6 md:px-12 lg:px-24">
                <div className="max-w-6xl mx-auto">

                    <div className="text-center mb-16">
                        <h3 className="text-4xl md:text-6xl font-serif text-primary mb-4">
                            Impact & <span className="text-secondary italic">ROI</span> observés
                        </h3>
                    </div>

                    {/* Impacts Grid */}
                    <div className="impacts-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
                        {IMPACTS.map((impact, i) => (
                            <div key={i} className="impact-item group relative bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 hover:border-secondary/30 cursor-default">
                                <span className="text-4xl block mb-3 group-hover:scale-125 transition-transform duration-300">{impact.icon}</span>
                                <span className="text-sm font-medium text-gray-700">{impact.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Case Study Card */}
                    <div className="relative bg-gradient-to-br from-secondary/5 via-white to-primary/5 rounded-[2rem] p-10 md:p-16 border border-gray-200 shadow-xl overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

                        <div className="relative">
                            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-bold uppercase tracking-widest mb-8">
                                Cas réel
                            </span>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                <div className="text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                        <span className="text-4xl md:text-5xl font-serif text-gray-400">4%</span>
                                        <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                        <span className="text-4xl md:text-5xl font-serif text-primary counter-value" data-target="8">0</span>
                                        <span className="text-2xl text-secondary">,5%</span>
                                    </div>
                                    <p className="text-gray-500">marge augmentée</p>
                                </div>

                                <div className="text-center">
                                    <p className="text-5xl md:text-6xl font-serif text-secondary mb-2">
                                        +<span className="counter-value" data-target="78">0</span> 000 €
                                    </p>
                                    <p className="text-gray-500">économisés en 9 mois</p>
                                </div>

                                <div className="text-center md:text-right flex flex-col justify-center">
                                    <p className="text-xl font-medium text-primary">
                                        Sans embauche d'un DAF<br />à temps plein
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ====================================== */}
            {/* TARGET AUDIENCE */}
            {/* ====================================== */}
            <div className="relative py-20 px-6 md:px-12 lg:px-24 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-12">
                        <div className="lg:w-1/3">
                            <h3 className="text-3xl md:text-4xl font-serif text-primary">
                                À qui s'adressent <br /><span className="text-secondary italic">nos bootcamps ?</span>
                            </h3>
                        </div>
                        <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {TARGETS.map((target, i) => (
                                <div key={i} className="group bg-white rounded-2xl p-6 text-center hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl cursor-default">
                                    <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform">{target.icon}</span>
                                    <span className="text-sm font-medium">{target.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ====================================== */}
            {/* FINAL CTA - Premium */}
            {/* ====================================== */}
            <div className="relative py-32 px-6 md:px-12 lg:px-24 bg-primary overflow-hidden">

                {/* Animated background */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full animate-spin-slow" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                </div>

                <div className="max-w-4xl mx-auto relative z-10 text-center">

                    <span className="inline-block text-secondary text-7xl mb-8">👉</span>

                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight">
                        Et après le bootcamp ?<br />
                        <span className="text-secondary italic">Nous devenons inutiles.</span>
                    </h3>

                    <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                        Vous repartez avec des équipes formées, des processus maîtrisés et une logique de pilotage totalement autonome.
                    </p>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
                        <Link
                            href="/ressources"
                            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-sm border border-white/20"
                        >
                            <span>🔍</span>
                            <span>Réaliser un diagnostic</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-secondary hover:text-primary transition-all duration-300 backdrop-blur-sm border border-white/20"
                        >
                            <span>🧭</span>
                            <span>Construire un bootcamp sur mesure</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-primary rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl shadow-secondary/25"
                        >
                            <span>💬</span>
                            <span>Parler à un consultant MSL</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    );
}
