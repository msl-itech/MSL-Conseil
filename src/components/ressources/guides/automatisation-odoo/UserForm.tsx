"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Odoo purple color
const ODOO_PURPLE = "#714b67";

interface UserFormProps {
    onSubmit: (data: UserData) => void;
    onBack: () => void;
}

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    vatNumber: string;
    revenueLevel: string;
    sector: string;
    employees: string;
}

const SECTORS = ["Services", "Commerce", "Industrie", "Construction", "Tech/Digital", "Santé", "Autre"];
const EMPLOYEES = ["1-10", "11-50", "51-100", "101-250", "250+"];
const REVENUE_LEVELS = [
    "Moins de 300.000 €",
    "De 300.000 € à 1M €",
    "De 1M € à 3M €",
    "Plus de 3M €"
];

export default function UserForm({ onSubmit, onBack }: UserFormProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<UserData>({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        vatNumber: "",
        revenueLevel: "",
        sector: "",
        employees: ""
    });
    const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({});

    useGSAP(() => {
        gsap.fromTo(".form-element", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" });
    }, { scope: containerRef });

    const validate = () => {
        const e: Partial<Record<keyof UserData, string>> = {};
        if (!formData.firstName?.trim()) e.firstName = "Requis";
        if (!formData.lastName?.trim()) e.lastName = "Requis";
        if (!formData.email?.trim()) e.email = "Requis";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Email invalide";
        if (!formData.company?.trim()) e.company = "Requis";
        if (!formData.vatNumber?.trim()) e.vatNumber = "Requis";
        if (!formData.revenueLevel) e.revenueLevel = "Requis";
        if (!formData.sector) e.sector = "Requis";
        if (!formData.employees) e.employees = "Requis";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) onSubmit(formData);
    };

    const handleChange = (field: keyof UserData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-gray-50">
            {/* Header */}
            <div className="pt-24 pb-12 px-6" style={{ background: `linear-gradient(135deg, ${ODOO_PURPLE} 0%, #8e6180 100%)` }}>
                <div className="max-w-3xl mx-auto">
                    <button onClick={onBack} className="form-element flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Retour au guide
                    </button>
                    <div className="form-element text-center">
                        <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                            🧪 Test Interactif – Étape 1/2
                        </span>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Avant de commencer le diagnostic
                        </h1>
                        <p className="text-white/70">
                            Quelques informations pour personnaliser vos résultats et recommandations
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-2xl mx-auto px-6 py-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name fields */}
                    <div className="form-element grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Prénom <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => handleChange("firstName", e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border-2 ${errors.firstName ? "border-red-400" : "border-gray-200 focus:border-purple-500"} transition-colors focus:outline-none`}
                                placeholder="Votre prénom"
                            />
                            {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nom <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => handleChange("lastName", e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border-2 ${errors.lastName ? "border-red-400" : "border-gray-200 focus:border-purple-500"} transition-colors focus:outline-none`}
                                placeholder="Votre nom"
                            />
                            {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="form-element">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email professionnel <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border-2 ${errors.email ? "border-red-400" : "border-gray-200 focus:border-purple-500"} transition-colors focus:outline-none`}
                            placeholder="votre@email.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    {/* Company */}
                    <div className="form-element">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Entreprise <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => handleChange("company", e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border-2 ${errors.company ? "border-red-400" : "border-gray-200 focus:border-purple-500"} transition-colors focus:outline-none`}
                            placeholder="Nom de votre entreprise"
                        />
                        {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
                    </div>

                    {/* VAT Number and Revenue Level */}
                    <div className="form-element grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Numéro TVA / BCE <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.vatNumber}
                                onChange={(e) => handleChange("vatNumber", e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border-2 ${errors.vatNumber ? "border-red-400" : "border-gray-200 focus:border-purple-500"} transition-colors focus:outline-none`}
                                placeholder="BE 0123.456.789"
                            />
                            {errors.vatNumber && <p className="mt-1 text-sm text-red-500">{errors.vatNumber}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Niveau de CA <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.revenueLevel}
                                onChange={(e) => handleChange("revenueLevel", e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border-2 ${errors.revenueLevel ? "border-red-400" : "border-gray-200 focus:border-purple-500"} transition-colors focus:outline-none bg-white`}
                            >
                                <option value="">Sélectionner...</option>
                                {REVENUE_LEVELS.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                            {errors.revenueLevel && <p className="mt-1 text-sm text-red-500">{errors.revenueLevel}</p>}
                        </div>
                    </div>

                    {/* Sector and Employees */}
                    <div className="form-element grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Secteur d'activité <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.sector}
                                onChange={(e) => handleChange("sector", e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border-2 ${errors.sector ? "border-red-400" : "border-gray-200 focus:border-purple-500"} transition-colors focus:outline-none bg-white`}
                            >
                                <option value="">Sélectionner...</option>
                                {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {errors.sector && <p className="mt-1 text-sm text-red-500">{errors.sector}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre d'employés <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.employees}
                                onChange={(e) => handleChange("employees", e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border-2 ${errors.employees ? "border-red-400" : "border-gray-200 focus:border-purple-500"} transition-colors focus:outline-none bg-white`}
                            >
                                <option value="">Sélectionner...</option>
                                {EMPLOYEES.map(e => <option key={e} value={e}>{e}</option>)}
                            </select>
                            {errors.employees && <p className="mt-1 text-sm text-red-500">{errors.employees}</p>}
                        </div>
                    </div>

                    {/* Info box */}
                    <div className="form-element bg-purple-50 rounded-xl p-4 border border-purple-100">
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-purple-700">🔒 Confidentialité :</span> Vos données sont utilisées uniquement pour personnaliser vos résultats et seront envoyées à notre équipe pour un suivi personnalisé.
                        </p>
                    </div>

                    {/* Submit */}
                    <div className="form-element pt-4">
                        <button
                            type="submit"
                            className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-3"
                            style={{ background: ODOO_PURPLE }}
                        >
                            Commencer le diagnostic
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
