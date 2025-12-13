"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PILOTER_DATA = [
  {
    letter: "P",
    title: "Processus clairs",
    description: "Organisation structurée.",
  },
  {
    letter: "I",
    title: "Information sécurisée",
    description: "Flux fiables et auditables.",
  },
  {
    letter: "L",
    title: "Livraison rapide",
    description: "Résultats visibles rapidement.",
  },
  {
    letter: "O",
    title: "Optimisation continue",
    description: "Amélioration permanente.",
  },
  {
    letter: "T",
    title: "Tableaux de bord lisibles",
    description: "Décisions immédiates.",
  },
  {
    letter: "E",
    title: "Expérience utilisateur",
    description: "Adoption fluide par vos équipes.",
  },
  {
    letter: "R",
    title: "Résultats mesurables",
    description: "Moins de tâches, plus de performance.",
  },
];

export default function PiloterMethod() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const container = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play animation
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % PILOTER_DATA.length);
      }, 3000); // Change every 3 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Pause auto-play on user interaction
  const handleUserInteraction = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);

    // Resume auto-play after 5 seconds of no interaction
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  // Animate content when activeIndex changes with smooth transition
  useGSAP(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, { dependencies: [activeIndex], scope: container });

  const activeData = PILOTER_DATA[activeIndex];

  return (
    <section ref={container} className="relative w-full bg-white text-primary py-24 px-6 md:px-12 lg:px-24 overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[500px]">

        {/* Left Side - PILOTER Letters */}
        <div className="flex flex-col">
          {/* Counter */}
          <div className="mb-8 flex items-center gap-2 text-gray-400 text-sm font-mono">
            <span className="text-secondary font-bold text-lg">0{activeIndex + 1}</span>
            <span>/</span>
            <span>07</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-12">
            <span className="text-primary">Méthode MSL</span>
            <br />
            <span className="text-secondary italic">"PILOTER"</span>
          </h2>

          {/* Interactive Letters */}
          <div className="flex gap-2 md:gap-4">
            {PILOTER_DATA.map((item, index) => (
              <button
                key={item.letter}
                onMouseEnter={() => handleUserInteraction(index)}
                onClick={() => handleUserInteraction(index)}
                className={`
                  relative text-5xl md:text-7xl lg:text-8xl font-bold transition-all duration-500 ease-out cursor-pointer
                  ${activeIndex === index
                    ? 'text-secondary scale-110'
                    : 'text-gray-200 hover:text-gray-400 hover:scale-105'
                  }
                `}
              >
                {item.letter}

                {/* Underline for active */}
                {activeIndex === index && (
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-secondary rounded-full transition-all duration-300" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Content Card */}
        <div className="flex flex-col gap-6">

          {/* Main Content Box */}
          <div className="relative bg-gray-50 border border-gray-200 rounded-xl p-8 md:p-10 shadow-lg">
            <div ref={contentRef} className="min-h-[200px] flex flex-col justify-center">

              {/* Letter Badge */}
              <div className="absolute -top-6 left-8 bg-secondary text-white text-3xl font-bold w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
                {activeData.letter}
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-serif text-primary mb-4 mt-4">
                {activeData.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed">
                {activeData.description}
              </p>
            </div>

            {/* Decorative corner lines */}
            <div className="absolute top-0 right-0 w-16 h-[1px] bg-gradient-to-l from-secondary to-transparent" />
            <div className="absolute top-0 right-0 w-[1px] h-16 bg-gradient-to-b from-secondary to-transparent" />
          </div>

          {/* Secondary Box - "The Method" */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <h4 className="text-xl font-medium text-primary mb-2">Notre promesse</h4>
            <p className="text-gray-500 text-sm">
              Automatiser, sécuriser et visualiser. Chaque lettre de PILOTER représente un pilier de notre méthode éprouvée.
            </p>
          </div>

        </div>
      </div>

      {/* Navigation Dots */}
      <div className="mt-12 flex justify-center gap-3">
        {PILOTER_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => handleUserInteraction(index)}
            className={`rounded-full transition-all duration-500 ease-out cursor-pointer ${activeIndex === index ? 'bg-secondary w-8 h-2' : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
              }`}
            aria-label={`Go to letter ${PILOTER_DATA[index].letter}`}
          />
        ))}
      </div>
    </section >
  );
}
