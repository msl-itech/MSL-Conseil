"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const TEXT_CONTENT = "Vos chiffres sous contrôle. En temps réel. Belgique & Maroc.";

export default function Marquee() {
    const container = useRef<HTMLDivElement>(null);
    const slider = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Duplicate content logic is handled via map, 
            // but we need enough copies to fill screen + scroll.
            // GSAP 'horizontalLoop' helper principle simplified:

            const ctx = gsap.context(() => {
                const totalWidth = slider.current?.scrollWidth || 0;

                // If content is wide enough
                if (totalWidth > 0) {
                    gsap.to(slider.current, {
                        x: "-50%", // Move half the width (since we have 2 sets of content essentially)
                        duration: 40, // Slower duration (was implied faster before)
                        ease: "linear",
                        repeat: -1,
                    });
                }
            }, container);

            return () => ctx.revert();
        },
        { scope: container }
    );

    return (
        <div
            ref={container}
            className="relative flex w-full overflow-hidden bg-primary py-3 text-sm font-medium uppercase tracking-widest text-[#d8d8d8] sm:text-base border-b border-white/10 z-50"
        >
            <div ref={slider} className="flex whitespace-nowrap will-change-transform">
                {/* Render enough copies to ensuring smooth infinite scroll */}
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex items-center shrink-0 pl-16">
                        <span className="text-white">{TEXT_CONTENT}</span>
                        <span className="ml-16 text-secondary">•</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
