"use client";

import Image from "next/image";

export default function SolutionsDisclaimer() {
    return (
        <section className="relative w-full py-24 px-6 overflow-hidden">

            {/* Background Image with Overlay - Full Width */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
                    alt="Office Background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/95 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80 opacity-90" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="border-l-4 border-secondary pl-8 md:pl-12">
                    <h3 className="text-3xl md:text-5xl font-serif text-white mb-8">
                        Nous ne faisons pas votre comptabilité.
                    </h3>
                    <p className="text-white/90 text-xl md:text-2xl leading-relaxed mb-8 font-light max-w-2xl">
                        Nous vous aidons à <strong className="text-secondary font-bold">structurer, automatiser et comprendre</strong> vos chiffres.
                    </p>
                    <p className="text-white/60 text-base tracking-wide uppercase font-medium">
                        (Et si vous avez besoin d'une fiduciaire, nous vous orientons vers notre partenaire de confiance)
                    </p>
                </div>
            </div>
        </section>
    );
}
