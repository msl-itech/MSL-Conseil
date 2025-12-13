# Liens à Corriger - Page d'Accueil

## Pages Disponibles
Voici les routes/pages existantes dans votre application :
- `/` - Page d'accueil
- `/about` - À propos
- `/contact` - Contact  
- `/faq` - FAQ
- `/methode` - La méthode P.I.L.O.T.E.R
- `/ressources` - Ressources
- `/solutions` - Solutions (actuellement utilisée pour la méthode)

---

## Composants de la Page d'Accueil et Leurs Liens

### 1. **HeroSlider** (`src/components/HeroSlider.tsx`)
**Lignes 152-158** - Boutons CTAs non fonctionnels

**Liens actuels** : Les boutons sont des `<button>` sans action
```tsx
<button className="group relative overflow-hidden rounded-full bg-primary px-8 py-4 text-white...">
    <span className="relative z-10">Demander un diagnostic Odoo Finance</span>
</button>

<button className="group rounded-full border border-gray-800 px-8 py-4...">
    <span className="font-medium">Parler à un consultant MSL</span>
</button>
```

**Action recommandée** :
- Premier bouton → `/contact` (Demander un diagnostic)
- Deuxième bouton → `/contact` (Parler à un consultant)

---

### 2. **BenefitsGrid** (`src/components/BenefitsGrid.tsx`)
**Ligne 123** - Bouton CTA non fonctionnel

**Lien actuel** : `<button className="inline-flex items-center...">` sans action
```tsx
<button>Découvrez comment Odoo Finance peut transformer votre gestion</button>
```

**Action recommandée** :
→ `/methode` (Découvrir la méthode P.I.L.O.T.E.R)

---

### 3. **AboutServices** (`src/components/AboutServices.tsx`)
**Lignes 126-131** - Boutons CTAs non fonctionnels

**Liens actuels** : `<button>` sans action
```tsx
<button>Obtenez votre plan personnalisé</button>
<button>Réservez votre audit gratuit</button>
```

**Action recommandée** :
- "Obtenez votre plan personnalisé" → `/contact`
- "Réservez votre audit gratuit" → `/contact`

**Lignes 150-209** - Cartes de services non cliquables

**Action recommandée** :
- Cards 1-5 (Services) → `/methode` ou créer des anchors/sections spécifiques
- Card 6 ("Ce que nous NE faisons pas") → `/about` (section explicative)

---

### 4. **PiloterMethod** (`src/components/PiloterMethod.tsx`)
Pas de liens cassés détectés, composant interactif mais pas de navigation externe.

**Action potentielle** : Ajouter un CTA en bas pour rediriger vers `/methode`

---

### 5. **SixReasons** (`src/components/SixReasons.tsx`)
Pas de boutons CTA visibles dans les 80 premières lignes.

**À vérifier** : Lignes 80-143

---

### 6. **ComplementaryServices** (`src/components/ComplementaryServices.tsx`)
**Ligne 169** - Lien "Parler à un expert"

**Lien actuel** : `href="#"`
```tsx
<a href="#">Parler à un expert Odoo Finance</a>
```

**Action recommandée** :
→ `/contact`

---

### 7. **Footer** (`src/components/Footer.tsx`)
**Ligne 33** - Liens sociaux non fonctionnels
```tsx
<a href="#">LinkedIn</a>
<a href="#">YouTube</a>
```

**Action recommandée** :
- Ajouter les vraies URLs des réseaux sociaux MSL Conseils

**Lignes 95-96** - Liens légaux
```tsx
<Link href="#">Politique de confidentialité</Link>
<Link href="#">Mentions légales</Link>
```

**Action recommandée** :
- Créer `/legal/privacy` pour la politique de confidentialité
- Créer `/legal/terms` pour les mentions légales
OU rediriger temporairement vers `/contact`

---

## Autres Composants à Vérifier

### **ResourceArticles** (`src/components/ressources/ResourceArticles.tsx`)
**Ligne 52** - "Tous les articles"
```tsx
<a href="#">Tous les articles</a>
```

**Action recommandée** :
→ `/ressources` (si pas déjà sur cette page, sinon créer anchor vers section articles)

---

## Actions Prioritaires

### Urgence 1 - CTAs Homepage
1. **HeroSlider** - Convertir les boutons en Links vers `/contact`
2. **BenefitsGrid** - Bouton CTA → `/methode`
3. **AboutServices** - 2 boutons → `/contact`

### Urgence 2 - Navigation Secondaire
4. **ComplementaryServices** - Lien expert → `/contact`
5. **Footer** - Liens sociaux (ajouter vraies URLs)

### Urgence 3 - Légal
6. **Footer** - Créer pages légales ou redirection temporaire

---

## Prochaines Étapes Suggérées

1. ✅ Remplacer tous les `<button>` CTA par des `<Link>` Next.js
2. ✅ Ajouter les vrais liens sociaux dans le Footer
3. ⏳ Créer les pages `/legal/privacy` et `/legal/terms` (ou rediriger vers Contact)
4. ⏳ Ajouter des anchors/IDs pour navigation interne (ex: sections spécifiques de la méthode)
5. ⏳ Considérer l'ajout d'un CTA au bas de `PiloterMethod` pour aller vers `/methode`
