"use client";

export default function MethodeWhy() {
    return (
        <section className="w-full py-32 px-6 bg-white overflow-hidden relative">

            {/* Background elements */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-100 rounded-full blur-[100px] opacity-60" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] opacity-60" />

            <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row gap-16 items-center">

                <div className="flex-1">
                    <span className="text-secondary font-bold uppercase tracking-[0.3em] text-sm block mb-6">Expertise</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-8 leading-tight">
                        Pourquoi <span className="text-secondary">P.I.L.O.T.E.R.</span> fonctionne ?
                    </h2>

                    <ul className="space-y-6">
                        {[
                            { label: "Clair", desc: "une méthode simple, étape par étape" },
                            { label: "Humain", desc: "accompagnement personnalisé" },
                            { label: "Mesurable", desc: "résultats concrets et chiffrés" },
                            { label: "Sécurisé", desc: "données fiables, contrôles solides" },
                            { label: "Adapté", desc: "conçu pour PME & TPE avec flexibilité totale" }
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4 group">
                                <span className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0 mt-1">✓</span>
                                <div>
                                    <strong className="text-primary text-lg block">{item.label}</strong>
                                    <span className="text-gray-500">{item.desc}</span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-12 p-6 bg-secondary/10 border border-secondary/20 rounded-2xl">
                        <p className="text-primary font-medium text-lg text-center">
                            La méthode  <span className="font-bold">P.I.L.O.T.E.R. </span>est le socle commun à tous nos accompagnements et bootcamps.Elle s’exprime concrètement à travers des formats intensifs, conçus pour produire des résultats mesurables.
                        </p>
                    </div>
                </div>

                {/* Visual Image Side */}
                <div className="flex-1 relative h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm z-10 hidden md:block" /> {/* Optional overlay */}
                    {/* Using a placeholder abstract or generic business image since user didn't specify one for here */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-[#001F15]" />
                    <div className="absolute inset-0 flex items-center justify-center text-white/10 font-serif text-[20rem] font-bold select-none leading-none">
                        M
                    </div>
                </div>

            </div>
        </section>
    );
}
