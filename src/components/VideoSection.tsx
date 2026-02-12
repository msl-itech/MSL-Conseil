"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function VideoSection() {
    const container = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 70%",
                end: "bottom center",
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(textRef.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
        )
            .fromTo(videoWrapperRef.current,
                { opacity: 0, x: 50, scale: 0.95 },
                { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out" },
                "-=0.6"
            );

    }, { scope: container });

    return (
        <section ref={container} className="relative w-full py-24 md:py-32 overflow-hidden bg-gradient-to-br from-[#011c14] to-[#001a11]">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#013524]/20 to-transparent opacity-50 pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Text Content */}
                <div ref={textRef} className="flex flex-col gap-6 text-center lg:text-left z-10">
                    <div>
                        <span className="text-secondary font-bold tracking-widest uppercase text-xs md:text-sm mb-3 block">
                            Expertise & Vision
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6">
                            Pourquoi vos chiffres ne servent <span className="italic text-secondary">(encore)</span> à rien ?
                        </h2>
                        <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                            L'implémentation d'un ERP ne suffit pas. Sans vision stratégique, vos données restent muettes.
                            Découvrez notre approche pour transformer votre comptabilité en véritable outil de pilotage.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-4">
                        <Link
                            href="/contact"
                            className="bg-white text-[#013524] px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-secondary hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(254,152,26,0.4)]"
                        >
                            Parlons de votre projet
                        </Link>
                    </div>
                </div>

                {/* Video Column */}
                <div className="flex justify-center lg:justify-end items-center relative perspective-1000">
                    <div ref={videoWrapperRef} className="relative group cursor-pointer z-10 w-full max-w-[320px] mx-auto">

                        {/* Glowing Background behind video */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-[#013524] rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

                        {/* Video Container */}
                        <div
                            className="relative w-full aspect-9/16 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-black"
                            onClick={() => setIsPlaying(true)}
                        >
                            {!isPlaying ? (
                                <>
                                    {/* Thumbnail */}
                                    <div className="absolute inset-0 bg-black">
                                        <img
                                            src="https://img.youtube.com/vi/_VBuYFmT-hg/maxresdefault.jpg"
                                            alt="Video Thumbnail"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                        />
                                    </div>

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                                    {/* Play Button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative flex items-center justify-center">
                                            <div className="absolute w-20 h-20 bg-secondary/30 rounded-full animate-ping-slow" />
                                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                                                <svg className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Info on Thumbnail */}
                                    <div className="absolute bottom-6 left-6 right-6 text-white">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                            <span className="text-[10px] font-bold tracking-widest uppercase text-white/80">Vidéo Short</span>
                                        </div>
                                        <p className="text-sm font-medium line-clamp-2 text-white/90">
                                            Odoo : pourquoi vos chiffres ne servent (encore) à rien ?
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/_VBuYFmT-hg?autoplay=1"
                                    title="Odoo : pourquoi vos chiffres ne servent (encore) à rien ?"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                ></iframe>
                            )}
                        </div>

                        {/* Floating decorative shapes */}
                        <div className="absolute -top-6 -right-6 w-12 h-12 border border-secondary/30 rounded-full animate-float" />
                        <div className="absolute top-1/2 -left-8 w-4 h-4 bg-white/20 rounded-full blur-[1px] animate-float-delayed" />
                    </div>
                </div>

            </div>
        </section>
    );
}
