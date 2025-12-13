"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
    const container = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useGSAP(() => {
        gsap.fromTo(videoRef.current,
            { scale: 0.9, opacity: 0, y: 50 },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                    end: "bottom center",
                    scrub: 1
                }
            }
        );
    }, { scope: container });

    return (
        <section ref={container} className="w-full bg-[#f4f4f4] py-20 px-6 md:px-20 flex justify-center items-center">
            <div
                ref={videoRef}
                className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                onClick={() => setIsPlaying(true)}
            >
                {!isPlaying ? (
                    <>
                        {/* Thumbnail Cover */}
                        <img
                            src="https://img.youtube.com/vi/Euj3FjTcx_M/maxresdefault.jpg"
                            alt="Video Thumbnail"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-xl transition-transform duration-300 group-hover:scale-110">
                                <svg className="w-8 h-8 text-white fill-current ml-1" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </>
                ) : (
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/Euj3FjTcx_M?autoplay=1"
                        title="Video Player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    ></iframe>
                )}

                {/* Optional: border/frame effect */}
                <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none z-10" />
            </div>
        </section>
    );
}
