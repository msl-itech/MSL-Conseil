/**
 * Configuration et fonctions pour interagir avec l'API Odoo
 */

const ODOO_CONFIG = {
    apiUrl: 'https://api-connect-odoo.vercel.app/api',
    xSignature: 'f48fc94a838ab87d65de288bfcb037d109d1141fd981f70f378be51c91c764bd',
    xClientId: 'client_mslconseils',
    xCompanyId: '7',
};

export interface OdooLeadData {
    name: string;
    phone?: string;
    email_from: string;
    description: string;
}

export interface OdooLeadResponse {
    success?: boolean;
    message?: string;
    lead_id?: number;
    id?: number;
    name?: string;
    email_from?: string;
    [key: string]: any;
}

/**
 * Crée un nouveau lead dans Odoo
 */
export async function createOdooLead(
    userData: {
        firstName: string;
        lastName: string;
        email: string;
        company: string;
        vatNumber?: string;
        revenueLevel?: string;
        sector?: string;
        employees?: string;
        phone?: string;
    },
    guideName: string
): Promise<OdooLeadResponse> {
    const leadData = formatUserDataToLead(userData, guideName);
    
    console.log("🚀 Création du lead dans Odoo...");
    console.log("📦 Données envoyées:", leadData);
    
    const response = await fetch(`${ODOO_CONFIG.apiUrl}/leads`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-signature': ODOO_CONFIG.xSignature,
            'x-client-id': ODOO_CONFIG.xClientId,
            'x-company-id': ODOO_CONFIG.xCompanyId,
        },
        body: JSON.stringify(leadData)
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Erreur API:", errorText);
        throw new Error(`Erreur lors de la création du lead: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Réponse de l'API:", result);
    
    // L'API peut retourner { success: true, message: "...", lead_id: 12919 }
    // ou directement { id: 12919, name: "...", ... }
    return {
        ...result,
        id: result.lead_id || result.id,
    };
}

/**
 * Met à jour un lead existant dans Odoo
 */
export async function updateOdooLead(leadId: number, updateData: Partial<OdooLeadData>): Promise<OdooLeadResponse> {
    const response = await fetch(`${ODOO_CONFIG.apiUrl}/leads/${leadId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-signature': ODOO_CONFIG.xSignature,
            'x-client-id': ODOO_CONFIG.xClientId,
            'x-company-id': ODOO_CONFIG.xCompanyId,
        },
        body: JSON.stringify(updateData)
    });

    if (!response.ok) {
        throw new Error(`Erreur lors de la mise à jour du lead: ${response.status}`);
    }

    return await response.json();
}

/**
 * Formate les données utilisateur pour créer un lead
 */
export function formatUserDataToLead(
    userData: {
        firstName: string;
        lastName: string;
        email: string;
        company: string;
        vatNumber?: string;
        revenueLevel?: string;
        sector?: string;
        employees?: string;
        phone?: string;
    },
    guideName: string
): OdooLeadData {
    const descriptionParts = [
        `<h3>Nouveau Lead Web - ${guideName}</h3>`,
        `<p><strong>Nom complet:</strong> ${userData.firstName} ${userData.lastName}</p>`,
        `<p><strong>Entreprise:</strong> ${userData.company}</p>`,
    ];

    if (userData.vatNumber) {
        descriptionParts.push(`<p><strong>N° TVA/BCE:</strong> ${userData.vatNumber}</p>`);
    }

    if (userData.revenueLevel) {
        descriptionParts.push(`<p><strong>Niveau CA:</strong> ${userData.revenueLevel}</p>`);
    }

    if (userData.sector) {
        descriptionParts.push(`<p><strong>Secteur:</strong> ${userData.sector}</p>`);
    }

    if (userData.employees) {
        descriptionParts.push(`<p><strong>Employés:</strong> ${userData.employees}</p>`);
    }

    descriptionParts.push(`<hr/><p><em>📝 Diagnostic en cours...</em></p>`);

    return {
        name: `Lead Web: ${userData.firstName} ${userData.lastName} - ${guideName}`,
        phone: userData.phone || '',
        email_from: userData.email,
        description: descriptionParts.join('\n'),
    };
}

/**
 * Formate les résultats du quiz pour mettre à jour le lead
 */
export function formatQuizResultsToDescription(
    userData: {
        firstName: string;
        lastName: string;
        email: string;
        company: string;
        vatNumber?: string;
        revenueLevel?: string;
        sector?: string;
        employees?: string;
        phone?: string;
    },
    quizData: {
        answers: Record<string, number>;
        totalScore: number;
        maxScore: number;
        percentage: number;
        questions?: Record<string, string>; // Map de questionKey => texte de la question
    },
    guideName: string
): string {
    // Déterminer le niveau et la recommandation
    let niveau = '';
    let recommendation = '';
    let scoreColor = '#dc3545'; // Rouge par défaut
    
    if (quizData.percentage >= 80) {
        niveau = '🟢 Excellent - Système mature';
        recommendation = 'Accompagnement sur des optimisations avancées et formations spécialisées.';
        scoreColor = '#28a745';
    } else if (quizData.percentage >= 60) {
        niveau = '🟡 Bon - En cours de structuration';
        recommendation = 'Accompagnement pour consolider les bases et automatiser davantage.';
        scoreColor = '#ffc107';
    } else if (quizData.percentage >= 40) {
        niveau = '🟠 Moyen - Bases à consolider';
        recommendation = 'Accompagnement prioritaire pour structurer les fondamentaux.';
        scoreColor = '#fd7e14';
    } else {
        niveau = '🔴 Faible - Nécessite un accompagnement';
        recommendation = 'Accompagnement urgent recommandé pour mettre en place les bases essentielles.';
        scoreColor = '#dc3545';
    }

    const descriptionParts = [
        `<h2>📊 Résultats du Diagnostic Web</h2>`,
        `<hr/>`,
        
        `<h3>🏆 Score Obtenu</h3>`,
        `<p><strong style="color: ${scoreColor}; font-size: 1.4em;">${quizData.totalScore}/${quizData.maxScore}</strong> <em>(${quizData.percentage}%)</em></p>`,
        `<p><strong>Niveau :</strong> ${niveau}</p>`,
        
        `<h3>💡 Recommandation</h3>`,
        `<p>${recommendation}</p>`,
        
        `<h3>📈 Détails des Réponses</h3>`,
        `<p><strong>Nombre de questions répondues :</strong> ${Object.keys(quizData.answers).length}</p>`,
        `<ul>`,
    ];

    // Ajouter le détail de chaque réponse
    Object.entries(quizData.answers).forEach(([questionKey, value]) => {
        let emoji = '';
        let label = '';
        
        // Interpréter la valeur (0, 1, 2 ou 0, 1 selon le type de quiz)
        if (typeof value === 'boolean' || value === 0 || value === 1) {
            // Checklist (true/false)
            emoji = value ? '✅' : '❌';
            label = value ? 'Oui' : 'Non';
        } else {
            // Quiz avec notation (0, 1, 2)
            if (value === 2) {
                emoji = '✅';
                label = 'Oui (2 pts)';
            } else if (value === 1) {
                emoji = '🟡';
                label = 'Partiellement (1 pt)';
            } else {
                emoji = '❌';
                label = 'Non (0 pt)';
            }
        }
        
        // Récupérer le texte de la question si disponible, sinon utiliser la clé
        const questionText = quizData.questions?.[questionKey] || questionKey;
        
        descriptionParts.push(`<li>${emoji} <strong>${questionText}:</strong> ${label}</li>`);
    });

    descriptionParts.push(
        `</ul>`,
        `<hr/>`,
        
        `<h3>👤 Informations de Contact</h3>`,
        `<p><strong>Nom :</strong> ${userData.firstName} ${userData.lastName}</p>`,
        `<p><strong>Email :</strong> <a href="mailto:${userData.email}">${userData.email}</a></p>`,
    );

    if (userData.phone) {
        descriptionParts.push(`<p><strong>Téléphone :</strong> <a href="tel:${userData.phone}">${userData.phone}</a></p>`);
    }

    descriptionParts.push(`<p><strong>Entreprise :</strong> ${userData.company}</p>`);

    if (userData.vatNumber) {
        descriptionParts.push(`<p><strong>N° TVA/BCE :</strong> ${userData.vatNumber}</p>`);
    }

    if (userData.employees) {
        descriptionParts.push(`<p><strong>Nombre d&apos;employés :</strong> ${userData.employees}</p>`);
    }

    if (userData.revenueLevel) {
        descriptionParts.push(`<p><strong>Niveau CA :</strong> ${userData.revenueLevel}</p>`);
    }

    if (userData.sector) {
        descriptionParts.push(`<p><strong>Secteur :</strong> ${userData.sector}</p>`);
    }

    descriptionParts.push(
        `<hr/>`,
        `<h3>📌 Guide Complété</h3>`,
        `<p><strong>${guideName}</strong></p>`,
        `<p><em>✅ Diagnostic complété le ${new Date().toLocaleDateString('fr-BE', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}</em></p>`,
        `<p><strong>🎯 Action recommandée :</strong> Contacter le prospect pour présenter une offre d&apos;accompagnement personnalisée.</p>`
    );

    return descriptionParts.filter(part => part).join('\n');
}
