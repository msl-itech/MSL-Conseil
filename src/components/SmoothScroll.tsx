"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Initialisation de Lenis pour le smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing exponentiel pour un effet premium
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });

        // Synchronisation de Lenis avec ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Ajouter Lenis à la boucle d'animation de GSAP (raf)
        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);

        // Désactiver le lag smoothing pour éviter les sauts lors du scroll
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(update);
        };
    }, []);

    return <>{children}</>;
}
