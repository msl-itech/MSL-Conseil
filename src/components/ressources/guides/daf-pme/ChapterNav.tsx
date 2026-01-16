"use client";

import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Primary green color
const MAIN_COLOR = "#014730";

const CHAPTERS = [
    { id: 1, title: "Introduction : Pourquoi ce guide ?" },
    { id: 2, title: "Le DAF, bras droit stratégique" },
    { id: 3, title: "Pourquoi un seul profil ne peut pas tout faire" },
    { id: 4, title: "Pourquoi un DAF devient indispensable" },
    { id: 5, title: "Une alternative intelligente : DAF partiel" },
    { id: 6, title: "5 signaux que vous avez besoin d'un DAF" },
    { id: 7, title: "Démarrer concrètement en 30 jours" },
    { id: 8, title: "Conclusion – Le pilotage est une posture" },
];

interface ChapterNavProps {
    sections?: { id: number; title: string }[];
    onCtaClick?: () => void;
}

export default function ChapterNav({ sections, onCtaClick }: ChapterNavProps) {
    const chapters = sections || CHAPTERS;
    const [activeChapter, setActiveChapter] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isOpen) {
            gsap.fromTo(".nav-item", { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power3.out" });
        }
    }, { scope: containerRef, dependencies: [isOpen] });

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;

            for (let i = chapters.length - 1; i >= 0; i--) {
                const element = document.getElementById(`section-${chapters[i].id}`);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveChapter(chapters[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [chapters]);

    const scrollToChapter = (id: number) => {
        const element = document.getElementById(`section-${id}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Mobile trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 lg:hidden w-14 h-14 rounded-full shadow-lg text-white flex items-center justify-center hover:shadow-xl transition-all"
                style={{ backgroundColor: MAIN_COLOR }}
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Navigation panel */}
            <div
                ref={containerRef}
                className={`fixed z-50 transition-transform duration-300 lg:translate-x-0
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    left-0 bottom-0 top-0 w-80 bg-white shadow-xl lg:shadow-md
                    lg:left-4 lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:w-72 lg:rounded-2xl lg:max-h-[85vh] overflow-hidden`}
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between" style={{ backgroundColor: `${MAIN_COLOR}10` }}>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" style={{ color: MAIN_COLOR }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span className="font-bold text-sm text-gray-900">Guide DAF PME</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden p-1 hover:bg-gray-100 rounded">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Chapters list */}
                <div className="p-3 overflow-y-auto max-h-[calc(85vh-180px)]">
                    <div className="space-y-1">
                        {chapters.map((chapter) => (
                            <button
                                key={chapter.id}
                                onClick={() => scrollToChapter(chapter.id)}
                                className={`nav-item w-full text-left p-3 rounded-xl transition-all text-sm ${activeChapter === chapter.id
                                    ? "text-white shadow-md"
                                    : "text-gray-700 hover:bg-gray-50"
                                    }`}
                                style={activeChapter === chapter.id ? { backgroundColor: MAIN_COLOR } : {}}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${activeChapter === chapter.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                                        }`}>
                                        {chapter.id}
                                    </span>
                                    <span className="line-clamp-2 leading-tight">{chapter.title}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Diagnostic CTA */}
                <div className="p-3 border-t border-gray-100">
                    <button
                        onClick={() => {
                            if (onCtaClick) {
                                onCtaClick();
                            } else {
                                const el = document.getElementById('diagnostic-cta');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }
                            setIsOpen(false);
                        }}
                        className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: '#fe981a' }}
                    >
                        🧭 Faire le diagnostic
                    </button>
                </div>

                {/* Progress indicator */}
                <div className="p-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>Progression</span>
                        <span className="font-medium">{Math.round(((chapters.findIndex(s => s.id === activeChapter) + 1) / chapters.length) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                                width: `${((chapters.findIndex(s => s.id === activeChapter) + 1) / chapters.length) * 100}%`,
                                backgroundColor: MAIN_COLOR
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
