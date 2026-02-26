/**
 * Système de recommandation intelligent pour le parcours de maturité financière
 *
 * Architecture de montée en maturité:
 * Structuration → Contrôle → Automatisation → DAF stratégique
 *
 * Chaque diagnostic recommande UNE prochaine étape logique basée sur le score
 */

export type DiagnosticType =
  | 'daf'
  | 'controle-fondamentaux'
  | 'plan-action-2026'
  | 'structuration'
  | 'automatisation';

export type MaturityLevel =
  | 'fragile'        // Score faible
  | 'intermediaire'  // Score moyen
  | 'solide'         // Score élevé
  | 'avance';        // Score très élevé

export interface Recommendation {
  nextStep: DiagnosticType | 'audit-strategique';
  title: string;
  description: string;
  reason: string;
  ctaText: string;
  ctaUrl: string;
  urgency: 'immediate' | 'recommended' | 'optional';
}

/**
 * Détermine le niveau de maturité basé sur le score et le type de diagnostic
 */
export function getMaturityLevel(
  score: number,
  maxScore: number,
  diagnosticType: DiagnosticType
): MaturityLevel {
  const percentage = (score / maxScore) * 100;

  if (percentage < 35) return 'fragile';
  if (percentage < 65) return 'intermediaire';
  if (percentage < 85) return 'solide';
  return 'avance';
}

/**
 * Système de recommandation principal
 */
export function getRecommendation(
  diagnosticType: DiagnosticType,
  maturityLevel: MaturityLevel
): Recommendation {

  // ============================================
  // A - DIAGNOSTIC STRUCTURATION DES BASES
  // ============================================
  if (diagnosticType === 'structuration') {
    if (maturityLevel === 'fragile') {
      return {
        nextStep: 'structuration',
        title: 'Approfondir votre structuration',
        description: 'Avant d\'aller plus loin, consolidons les bases comptables et organisationnelles.',
        reason: 'Votre score indique que les fondations méritent d\'être renforcées. C\'est le moment de clarifier vos processus avant toute automatisation ou pilotage avancé.',
        ctaText: 'Accéder au guide de structuration approfondie',
        ctaUrl: '/ressources/guides/mise-en-place-comptabilite',
        urgency: 'immediate'
      };
    }

    if (maturityLevel === 'intermediaire') {
      return {
        nextStep: 'controle-fondamentaux',
        title: 'Maîtriser les fondamentaux du contrôle de gestion',
        description: 'Vos bases sont en place. L\'étape suivante est de comprendre vos marges et vos indicateurs clés.',
        reason: 'Avec une structure correcte, vous pouvez maintenant passer au pilotage opérationnel et comprendre ce qui génère réellement de la valeur.',
        ctaText: 'Faire le diagnostic Contrôle Fondamentaux',
        ctaUrl: '/ressources/guides/controle-gestion#diagnostic',
        urgency: 'recommended'
      };
    }

    // solide ou avance
    return {
      nextStep: 'automatisation',
      title: 'Automatiser intelligemment avec Odoo',
      description: 'Vos bases sont solides. Il est temps de gagner du temps grâce à l\'automatisation.',
      reason: 'Une organisation bien structurée est le terrain idéal pour automatiser sans risque. Vous êtes prêt.',
      ctaText: 'Faire le diagnostic Automatisation Odoo',
      ctaUrl: '/ressources/guides/automatisation-diagnostic#diagnostic',
      urgency: 'recommended'
    };
  }

  // ============================================
  // B - DIAGNOSTIC CONTRÔLE FONDAMENTAUX
  // ============================================
  if (diagnosticType === 'controle-fondamentaux') {
    if (maturityLevel === 'fragile') {
      return {
        nextStep: 'structuration',
        title: 'Revenir à la structuration des bases',
        description: 'Le contrôle de gestion nécessite des fondations solides. Commençons par là.',
        reason: 'Sans structure claire, les indicateurs restent fragiles. Revenons à l\'essentiel pour bâtir sur du solide.',
        ctaText: 'Faire le diagnostic Structuration',
        ctaUrl: '/ressources/guides/diagnostic-gestion#diagnostic',
        urgency: 'immediate'
      };
    }

    if (maturityLevel === 'intermediaire') {
      return {
        nextStep: 'plan-action-2026',
        title: 'Construire votre plan d\'action 2026',
        description: 'Vous comprenez les fondamentaux. Passons à la mise en pratique avec un plan concret.',
        reason: 'La compréhension théorique est présente. L\'enjeu est maintenant de mettre en place un suivi régulier et structuré.',
        ctaText: 'Faire le diagnostic Plan d\'action 2026',
        ctaUrl: '/ressources/guides/controle-gestion-formation#diagnostic',
        urgency: 'recommended'
      };
    }

    // solide ou avance
    return {
      nextStep: 'daf',
      title: 'Évaluer votre besoin de DAF',
      description: 'Vous maîtrisez le contrôle de gestion. La question devient : avez-vous besoin d\'un rôle stratégique ?',
      reason: 'Avec un pilotage solide, la fonction financière peut devenir un levier de croissance stratégique.',
      ctaText: 'Faire le diagnostic DAF',
      ctaUrl: '/ressources/guides/daf-pme#diagnostic',
      urgency: 'recommended'
    };
  }

  // ============================================
  // C - DIAGNOSTIC PLAN D'ACTION 2026
  // ============================================
  if (diagnosticType === 'plan-action-2026') {
    if (maturityLevel === 'fragile') {
      return {
        nextStep: 'controle-fondamentaux',
        title: 'Revenir aux fondamentaux du contrôle',
        description: 'Avant de bâtir un plan, assurons-nous de bien maîtriser les bases du pilotage.',
        reason: 'Un plan d\'action efficace nécessite une compréhension claire des marges, coûts et indicateurs.',
        ctaText: 'Faire le diagnostic Contrôle Fondamentaux',
        ctaUrl: '/ressources/guides/controle-gestion#diagnostic',
        urgency: 'immediate'
      };
    }

    if (maturityLevel === 'intermediaire') {
      return {
        nextStep: 'automatisation',
        title: 'Automatiser pour gagner du temps',
        description: 'Votre pilotage est en place. L\'automatisation vous permettra de scaler sans ajouter de charge.',
        reason: 'Un pilotage structuré peut être accéléré par l\'automatisation. C\'est le moment de structurer vos flux.',
        ctaText: 'Faire le diagnostic Automatisation Odoo',
        ctaUrl: '/ressources/guides/automatisation-diagnostic#diagnostic',
        urgency: 'recommended'
      };
    }

    // solide ou avance
    return {
      nextStep: 'daf',
      title: 'Structurer un rôle de DAF',
      description: 'Votre pilotage est mature. Un DAF pourrait transformer ce pilotage en levier stratégique.',
      reason: 'Avec un plan structuré et exécuté, la fonction finance mérite un leadership clair pour aller plus loin.',
      ctaText: 'Faire le diagnostic DAF',
      ctaUrl: '/ressources/guides/daf-pme#diagnostic',
      urgency: 'recommended'
    };
  }

  // ============================================
  // D - DIAGNOSTIC AUTOMATISATION ODOO
  // ============================================
  if (diagnosticType === 'automatisation') {
    if (maturityLevel === 'fragile') {
      return {
        nextStep: 'structuration',
        title: 'Structurer avant d\'automatiser',
        description: 'L\'automatisation sans structure créé du chaos organisé. Commençons par clarifier les bases.',
        reason: 'Automatiser un processus fragile, c\'est automatiser un problème. Clarifions d\'abord les règles et les flux.',
        ctaText: 'Faire le diagnostic Structuration',
        ctaUrl: '/ressources/guides/diagnostic-gestion#diagnostic',
        urgency: 'immediate'
      };
    }

    if (maturityLevel === 'intermediaire') {
      return {
        nextStep: 'controle-fondamentaux',
        title: 'Renforcer votre pilotage',
        description: 'Avant d\'automatiser massivement, assurons-nous que vous pilotez efficacement.',
        reason: 'L\'automatisation amplifie le pilotage. Si le pilotage est faible, l\'automatisation n\'apportera pas les résultats espérés.',
        ctaText: 'Faire le diagnostic Contrôle Fondamentaux',
        ctaUrl: '/ressources/guides/controle-gestion#diagnostic',
        urgency: 'recommended'
      };
    }

    // solide ou avance
    return {
      nextStep: 'daf',
      title: 'Structurer un rôle de DAF',
      description: 'Automatisation maîtrisée + pilotage structuré = besoin d\'un leadership financier stratégique.',
      reason: 'Vous avez atteint un niveau de maturité où la fonction finance mérite une vision stratégique claire.',
      ctaText: 'Faire le diagnostic DAF',
      ctaUrl: '/ressources/guides/daf-pme#diagnostic',
      urgency: 'recommended'
    };
  }

  // ============================================
  // E - DIAGNOSTIC DAF
  // ============================================
  if (diagnosticType === 'daf') {
    if (maturityLevel === 'fragile') {
      return {
        nextStep: 'structuration',
        title: 'Structurer vos bases avant de recruter',
        description: 'Un DAF a besoin de fondations solides pour être efficace. Commençons par là.',
        reason: 'Recruter un DAF maintenant serait prématuré. Clarifions d\'abord l\'organisation comptable et les processus.',
        ctaText: 'Faire le diagnostic Structuration',
        ctaUrl: '/ressources/guides/diagnostic-gestion#diagnostic',
        urgency: 'immediate'
      };
    }

    if (maturityLevel === 'intermediaire') {
      return {
        nextStep: 'plan-action-2026',
        title: 'Construire un plan d\'action structuré',
        description: 'Avant de structurer un rôle de DAF, assurons-nous que le pilotage est régulier et fiable.',
        reason: 'Un DAF ne pourra être pleinement efficace que si le pilotage opérationnel est en place. C\'est la prochaine étape logique.',
        ctaText: 'Faire le diagnostic Plan d\'action 2026',
        ctaUrl: '/ressources/guides/controle-gestion-formation#diagnostic',
        urgency: 'recommended'
      };
    }

    // solide ou avance
    return {
      nextStep: 'audit-strategique',
      title: 'Planifier un audit stratégique',
      description: 'Votre maturité financière est avancée. Un audit stratégique vous aidera à identifier les leviers de croissance.',
      reason: 'Vous êtes prêt pour un accompagnement de haut niveau. Un audit stratégique personnalisé peut transformer votre pilotage en avantage compétitif.',
      ctaText: 'Réserver un audit stratégique gratuit',
      ctaUrl: 'https://odoo.mslconseils.be/appointment/15',
      urgency: 'recommended'
    };
  }

  // Fallback (ne devrait jamais arriver)
  return {
    nextStep: 'structuration',
    title: 'Commencer par les fondations',
    description: 'Toute montée en maturité commence par des bases solides.',
    reason: 'Structurons ensemble votre organisation financière.',
    ctaText: 'Faire le diagnostic Structuration',
    ctaUrl: '/ressources/guides/diagnostic-gestion#diagnostic',
    urgency: 'recommended'
  };
}

/**
 * Retourne le parcours complet de maturité pour la page Trajectoire
 */
export function getMaturityPath(
  currentDiagnostic: DiagnosticType,
  currentLevel: MaturityLevel
): {
  current: { title: string; level: string };
  next: { title: string; description: string };
  future: { title: string; description: string };
  vision12Months: string;
} {
  const recommendation = getRecommendation(currentDiagnostic, currentLevel);

  // Mapping des diagnostics
  const diagnosticTitles: Record<DiagnosticType | 'audit-strategique', string> = {
    'structuration': 'Structuration des bases',
    'controle-fondamentaux': 'Contrôle de gestion - Fondamentaux',
    'plan-action-2026': 'Plan d\'action 2026',
    'automatisation': 'Automatisation Odoo',
    'daf': 'Direction Financière',
    'audit-strategique': 'Audit stratégique'
  };

  // Vision à 12 mois selon le diagnostic actuel
  const visions: Record<DiagnosticType, string> = {
    'structuration': 'Dans 12 mois, votre organisation comptable sera claire, vos processus documentés, et votre pilotage opérationnel fiable.',
    'controle-fondamentaux': 'Dans 12 mois, vous maîtriserez vos marges, vos indicateurs seront suivis régulièrement, et vos décisions s\'appuieront sur des données fiables.',
    'plan-action-2026': 'Dans 12 mois, votre pilotage sera automatisé, votre reporting régulier, et votre capacité d\'anticipation significativement renforcée.',
    'automatisation': 'Dans 12 mois, vos processus financiers seront largement automatisés, vous gagnerez des heures chaque semaine, et votre équipe se concentrera sur l\'analyse plutôt que la saisie.',
    'daf': 'Dans 12 mois, votre fonction finance sera structurée avec un leadership clair, capable de piloter la croissance et d\'anticiper les besoins futurs.'
  };

  return {
    current: {
      title: diagnosticTitles[currentDiagnostic],
      level: currentLevel
    },
    next: {
      title: diagnosticTitles[recommendation.nextStep],
      description: recommendation.description
    },
    future: {
      title: 'Excellence opérationnelle',
      description: 'Pilotage maîtrisé, automatisation complète, et fonction finance stratégique'
    },
    vision12Months: visions[currentDiagnostic]
  };
}
