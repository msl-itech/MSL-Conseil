# ✅ Checklist SEO - MSL Conseils

## 📋 Configuration de base

### ⚙️ Fichier src/lib/seo.ts
- [ ] URL du site mise à jour (remplacer `https://www.odoo-finances.pro`)
- [ ] Email de contact ajouté (`contact@mslconseils.be`)
- [ ] Numéro de téléphone ajouté
- [ ] Lien LinkedIn ajouté
- [ ] Lien Twitter/X ajouté (optionnel)
- [ ] Adresse physique complétée (si applicable)

---

## 🎨 Assets & Images

### Images obligatoires
- [ ] `/public/og-image.jpg` créée (1200x630 px)
- [ ] `/public/icon-192.png` créée (192x192 px)
- [ ] `/public/icon-512.png` créée (512x512 px)
- [ ] `/public/logo.png` créée (pour Schema.org)

### Images optionnelles
- [ ] Images pour chaque page de service
- [ ] Images pour les articles de blog
- [ ] Screenshots pour les études de cas

### Qualité des images
- [ ] Toutes les images optimisées (<200 KB)
- [ ] Format WebP utilisé quand possible
- [ ] Attributs `alt` descriptifs sur TOUTES les images
- [ ] Composant Next.js `<Image>` utilisé partout

---

## 📄 Métadonnées des pages

### Pages principales
- [✅] **Accueil** (`/`) - Métadonnées configurées
- [✅] **À Propos** (`/about`) - Métadonnées configurées
- [✅] **Méthode** (`/methode`) - Métadonnées configurées
- [✅] **Solutions** (`/solutions`) - Métadonnées configurées

### Pages à configurer
- [ ] **Contact** (`/contact`) - Métadonnées à ajouter
- [ ] **FAQ** (`/faq`) - Métadonnées à ajouter
- [ ] **Ressources** (`/ressources`) - Métadonnées à ajouter

### Qualité des métadonnées
- [ ] Tous les titres font 50-60 caractères
- [ ] Toutes les descriptions font 150-160 caractères
- [ ] Chaque page a des mots-clés uniques
- [ ] Pas de contenu dupliqué

---

## 🔗 Données structurées (JSON-LD)

### Schémas globaux
- [✅] Organization Schema (dans layout.tsx)
- [✅] WebSite Schema (page d'accueil)

### Schémas par page
- [✅] BreadcrumbList sur À Propos
- [✅] BreadcrumbList sur Méthode
- [✅] BreadcrumbList sur Solutions
- [✅] Service Schema sur Méthode
- [ ] BreadcrumbList sur Contact
- [ ] BreadcrumbList sur FAQ
- [ ] BreadcrumbList sur Ressources
- [ ] FAQPage Schema sur FAQ

### Schémas optionnels
- [ ] LocalBusiness (si bureau physique)
- [ ] Product/Service pour chaque offre
- [ ] Review/Rating (si avis clients)
- [ ] Article pour le blog
- [ ] VideoObject pour les vidéos

---

## 🤖 Fichiers techniques

### Fichiers Next.js
- [✅] `src/app/sitemap.ts` créé
- [✅] `src/app/robots.ts` créé
- [✅] `src/app/manifest.ts` créé
- [✅] `src/lib/seo.ts` créé
- [✅] `src/components/JsonLd.tsx` créé

### Vérification
- [ ] `/sitemap.xml` accessible après build
- [ ] `/robots.txt` accessible après build
- [ ] `/manifest.json` accessible après build

---

## 📝 Contenu & Structure

### Structure HTML
- [ ] Un seul H1 par page
- [ ] Hiérarchie H1 > H2 > H3 respectée
- [ ] Balises sémantiques utilisées (`<article>`, `<section>`, `<nav>`)
- [ ] Liens internes cohérents

### Qualité du contenu
- [ ] Minimum 300 mots par page principale
- [ ] Contenu unique (pas de duplication)
- [ ] Mots-clés intégrés naturellement
- [ ] Appels à l'action clairs

### URLs
- [ ] URLs courtes et descriptives
- [ ] Pas de caractères spéciaux
- [ ] Tout en minuscules
- [ ] Traits d'union (-) pour séparer les mots

---

## 🧪 Tests avant déploiement

### Validation locale
- [ ] Script `./check-seo.sh` exécuté avec succès
- [ ] Build Next.js réussi (`npm run build`)
- [ ] Pas d'erreurs TypeScript
- [ ] Lighthouse score > 90 en local

### Validation des données
- [ ] Toutes les informations à jour
- [ ] Pas de "TODO" ou placeholder
- [ ] Numéros de téléphone corrects
- [ ] Emails fonctionnels

---

## 🚀 Tests après déploiement

### Accessibilité des fichiers
- [ ] `https://votre-site.com/sitemap.xml` accessible
- [ ] `https://votre-site.com/robots.txt` accessible
- [ ] `https://votre-site.com/manifest.json` accessible
- [ ] Toutes les pages principales accessibles

### Validation SEO
- [ ] **Schema.org Validator** - https://validator.schema.org/
  - [ ] Page d'accueil validée
  - [ ] Page À Propos validée
  - [ ] Page Méthode validée
  - [ ] Page Solutions validée

- [ ] **Google Rich Results Test** - https://search.google.com/test/rich-results
  - [ ] Organisation détectée
  - [ ] Breadcrumb détecté
  - [ ] Pas d'erreurs

- [ ] **Open Graph Debugger** - https://www.opengraph.xyz/
  - [ ] Image s'affiche correctement
  - [ ] Titre correct
  - [ ] Description correcte

- [ ] **Twitter Card Validator** - https://cards-dev.twitter.com/validator
  - [ ] Card type: summary_large_image
  - [ ] Aperçu correct

### Performance
- [ ] **PageSpeed Insights** - https://pagespeed.web.dev/
  - [ ] Score mobile > 80
  - [ ] Score desktop > 90
  - [ ] Core Web Vitals OK

- [ ] **Lighthouse (Chrome DevTools)**
  - [ ] Performance > 80
  - [ ] SEO > 90
  - [ ] Accessibility > 90
  - [ ] Best Practices > 90

### Mobile
- [ ] **Mobile-Friendly Test** - https://search.google.com/test/mobile-friendly
  - [ ] Toutes les pages mobile-friendly
  - [ ] Texte lisible sans zoom
  - [ ] Boutons cliquables facilement

---

## 📤 Soumission aux moteurs de recherche

### Google Search Console
- [ ] Compte créé
- [ ] Propriété ajoutée et vérifiée
- [ ] Sitemap soumis
- [ ] Page d'accueil indexée
- [ ] Aucune erreur d'exploration

### Bing Webmaster Tools
- [ ] Compte créé
- [ ] Site ajouté et vérifié
- [ ] Sitemap soumis
- [ ] Aucune erreur d'exploration

### Autres (optionnel)
- [ ] Yandex Webmaster
- [ ] DuckDuckGo (via Bing)

---

## 📊 Analytics & Suivi

### Google Analytics (optionnel)
- [ ] Compte GA4 créé
- [ ] Tag installé sur le site
- [ ] Objectifs configurés
- [ ] Événements personnalisés créés

### Suivi SEO
- [ ] Liste de mots-clés cibles créée
- [ ] Positions de départ notées
- [ ] Tableau de bord KPIs créé
- [ ] Rappels mensuels configurés

---

## 🔄 Maintenance régulière

### Hebdomadaire
- [ ] Vérifier les erreurs Search Console
- [ ] Vérifier les nouvelles pages indexées
- [ ] Surveiller le trafic organique

### Mensuel
- [ ] Analyser les positions des mots-clés
- [ ] Vérifier les Core Web Vitals
- [ ] Mettre à jour le contenu si nécessaire
- [ ] Vérifier les liens cassés

### Trimestriel
- [ ] Audit SEO complet
- [ ] Mise à jour des métadonnées
- [ ] Optimisation des pages lentes
- [ ] Analyse de la concurrence

---

## 🎯 Objectifs SEO

### Court terme (1-3 mois)
- [ ] Toutes les pages indexées
- [ ] Score Lighthouse > 90 partout
- [ ] Top 50 sur mots-clés principaux

### Moyen terme (3-6 mois)
- [ ] Top 20 sur mots-clés principaux
- [ ] 100+ visiteurs organiques/mois
- [ ] 10+ backlinks de qualité

### Long terme (6-12 mois)
- [ ] Top 10 sur mots-clés principaux
- [ ] 500+ visiteurs organiques/mois
- [ ] 50+ backlinks de qualité
- [ ] Featured snippets obtenus

---

## ✨ Optimisations avancées (optionnel)

### Performance
- [ ] CDN configuré (Cloudflare, etc.)
- [ ] Cache HTTP optimisé
- [ ] Images en WebP + fallback
- [ ] Lazy loading implémenté
- [ ] Préchargement des ressources critiques

### Contenu
- [ ] Blog actif avec articles réguliers
- [ ] Études de cas publiées
- [ ] Témoignages clients ajoutés
- [ ] Vidéos intégrées

### Technique
- [ ] HTTPS activé avec certificat valide
- [ ] Redirections 301 configurées
- [ ] Pagination correcte (si applicable)
- [ ] Hreflang pour multilingue (si applicable)

### Marketing
- [ ] Backlinks obtenus
- [ ] Présence sur réseaux sociaux
- [ ] Newsletter configurée
- [ ] Partage social encouragé

---

## 📝 Notes & Observations

### Date de déploiement : _______________

### Problèmes rencontrés :
- 
- 
- 

### Optimisations futures :
- 
- 
- 

### Résultats obtenus :
- Trafic organique (mois 1) : _____ visiteurs
- Trafic organique (mois 3) : _____ visiteurs
- Trafic organique (mois 6) : _____ visiteurs

### Mots-clés suivis :
1. __________________ | Position : ____
2. __________________ | Position : ____
3. __________________ | Position : ____
4. __________________ | Position : ____
5. __________________ | Position : ____

---

**Date de dernière révision : _____________**  
**Prochaine révision prévue : _____________**

---

## 🎉 Félicitations !

Une fois cette checklist complétée, votre SEO sera au niveau professionnel !

📚 **Ressources utiles :**
- SEO_INDEX.md - Index de toute la documentation
- SEO_GUIDE.md - Guide complet
- SEO_TEST.md - Procédures de test détaillées

🔍 **Vérification rapide :**
```bash
./check-seo.sh
```

**Bon référencement ! 🚀**
