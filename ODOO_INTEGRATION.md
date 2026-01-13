# Intégration Odoo pour les Guides de Ressources

## 📋 Vue d'ensemble

Tous les formulaires de diagnostic des guides sont maintenant connectés à votre CRM Odoo. Chaque fois qu'un utilisateur remplit un diagnostic :

1. **Un lead est créé** dès que l'utilisateur soumet ses informations personnelles
2. **Le lead est mis à jour** avec les résultats du quiz une fois le diagnostic terminé

## 🎯 Guides Intégrés

Les guides suivants ont été intégrés avec Odoo :

### 1. Guide: Automatisation avec Odoo
- **Chemin**: `/ressources/guides/automatisation-odoo`
- **Fichier**: `src/app/ressources/guides/automatisation-odoo/page.tsx`
- **Questions**: 31 questions (6 sections thématiques)
- **Score max**: 31 points

### 2. Guide: Diagnostic de Gestion
- **Chemin**: `/ressources/guides/diagnostic-gestion`
- **Fichier**: `src/app/ressources/guides/diagnostic-gestion/page.tsx`
- **Questions**: Variable selon les réponses
- **Score**: Calculé dynamiquement

### 3. Guide: Contrôle de Gestion
- **Chemin**: `/ressources/guides/controle-gestion`
- **Fichier**: `src/app/ressources/guides/controle-gestion/page.tsx`
- **Questions**: Variable
- **Score**: Calculé dynamiquement

### 4. Guide: DAF pour PME
- **Chemin**: `/ressources/guides/daf-pme`
- **Fichier**: `src/components/ressources/guides/daf-pme/DiagnosticQuiz.tsx`
- **Questions**: 24 questions (4 axes)
- **Score max**: 48 points

### 5. Guide: Automatisation & Diagnostic
- **Chemin**: `/ressources/guides/automatisation-diagnostic`
- **Fichier**: `src/components/ressources/guides/automatisation-diagnostic/AutoDiagnosticQuiz.tsx`
- **Questions**: 24 questions (4 axes)
- **Score max**: 48 points

## 🔧 Architecture Technique

### Fichier Utilitaire: `src/lib/odoo-api.ts`

Ce fichier contient toutes les fonctions nécessaires pour interagir avec l'API Odoo :

#### Fonctions principales

- **`createOdooLead(leadData)`** - Crée un nouveau lead dans Odoo
- **`updateOdooLead(leadId, updateData)`** - Met à jour un lead existant
- **`formatUserDataToLead(userData, guideName)`** - Formate les données utilisateur pour créer un lead
- **`formatQuizResultsToDescription(userData, quizData, guideName)`** - Formate les résultats du quiz pour mettre à jour le lead

### Configuration API

```typescript
const ODOO_CONFIG = {
    apiUrl: 'https://api-connect-odoo.vercel.app/api',
    xSignature: 'f48fc94a838ab87d65de288bfcb037d109d1141fd981f70f378be51c91c764bd',
    xClientId: 'client_mslconseils',
    xCompanyId: '7',
};
```

## 📊 Données Capturées

### Informations Utilisateur (Création du Lead)

- Prénom et nom
- Email professionnel
- Entreprise
- Numéro TVA / BCE (si applicable)
- Niveau de CA / Chiffre d'affaires
- Secteur d'activité
- Nombre d'employés
- Rôle (pour certains guides)

### Résultats du Quiz (Mise à jour du Lead)

- Score total / Score maximum
- Pourcentage de réussite
- Niveau évalué (Excellent, Bon, Moyen, Faible)
- Détail des réponses
- Date de complétion

## 🎨 Format des Leads dans Odoo

### Nom du Lead
```
Lead Web: [Prénom] [Nom] - [Nom du Guide]
```

### Description (après complétion du quiz)
```html
<h3>Lead Web - [Nom du Guide]</h3>
<p><strong>Nom complet:</strong> [Prénom] [Nom]</p>
<p><strong>Entreprise:</strong> [Entreprise]</p>
<p><strong>N° TVA/BCE:</strong> [Numéro TVA]</p>
<p><strong>Niveau CA:</strong> [Niveau CA]</p>
<p><strong>Secteur:</strong> [Secteur]</p>
<p><strong>Employés:</strong> [Nombre]</p>
<hr/>
<h4>📊 Résultats du Diagnostic</h4>
<p><strong>Score:</strong> [Score]/[Max] ([Pourcentage]%)</p>
<p><strong>Nombre de réponses:</strong> [Nombre]</p>
<p><strong>Niveau:</strong> [🟢/🟡/🟠/🔴] [Évaluation]</p>
<hr/>
<p><em>✅ Diagnostic complété - Contact à relancer pour accompagnement personnalisé</em></p>
```

## 🔄 Flux de Données

```
1. Utilisateur visite le guide
   ↓
2. Clique sur "Commencer le diagnostic"
   ↓
3. Remplit le formulaire avec ses informations
   ↓
4. Soumission → Création du Lead dans Odoo (avec ID stocké)
   ↓
5. Répond aux questions du quiz
   ↓
6. Fin du quiz → Mise à jour du Lead avec les résultats
   ↓
7. Affichage des résultats à l'utilisateur
```

## 🛡️ Gestion des Erreurs

- Les appels API sont encapsulés dans des `try/catch`
- En cas d'échec de création du lead, l'utilisateur peut quand même continuer le quiz
- En cas d'échec de mise à jour, les résultats sont quand même affichés
- Les erreurs sont loguées dans la console pour le débogage

## 📝 Exemples de Niveaux Évalués

- **🟢 Excellent** - Score ≥ 80% - "Système mature"
- **🟡 Bon** - Score ≥ 60% - "En cours de structuration"
- **🟠 Moyen** - Score ≥ 40% - "Bases à consolider"
- **🔴 Faible** - Score < 40% - "Nécessite un accompagnement"

## 🔍 Vérification

Pour vérifier que l'intégration fonctionne :

1. Ouvrez la console du navigateur (F12)
2. Remplissez un formulaire de diagnostic
3. Vous devriez voir les messages suivants :
   - "Lead créé avec succès: [ID]"
   - "Lead mis à jour avec les résultats du quiz"

## 📞 Route API pour Modification

Pour modifier un lead existant :
```
PUT https://api-connect-odoo.vercel.app/api/leads/:id
```

Headers requis :
- `Content-Type: application/json`
- `x-signature: [Signature]`
- `x-client-id: [Client ID]`
- `x-company-id: [Company ID]`

## 🚀 Prochaines Étapes Potentielles

- Ajouter des tags automatiques selon le score
- Créer des activités de suivi automatiques
- Intégrer avec le système de mailing
- Ajouter des notifications Slack/Email pour les nouveaux leads
- Tableau de bord analytics des diagnostics

---

**Date de mise en œuvre**: Janvier 2026  
**Développeur**: Assistant IA
