# Circuit de Saône-et-Loire - Site Web Officiel

Site web officiel pour la course cycliste Circuit de Saône-et-Loire, inspiré du design professionnel de Paris-Roubaix.

## 🎨 Caractéristiques du Design

### Design Premium
- **Palette de couleurs** : Rouge Bourgogne (#d4282e), Or (#d4af37), et tons sombres élégants
- **Typographie moderne** : 
  - Inter pour le texte (Google Fonts)
  - Bebas Neue pour les titres (Google Fonts)
- **Effets visuels** :
  - Animations fluides et micro-interactions
  - Effets de glassmorphisme
  - Dégradés dynamiques
  - Ombres élégantes

### Sections Principales

1. **Hero Section**
   - Compte à rebours dynamique jusqu'à la course
   - Informations clés (date, départ, arrivée, distance)
   - Appels à l'action proéminents
   - Animation de fond avec dégradé

2. **Section Highlights**
   - 4 points forts de la course
   - Cartes animées au survol
   - Design moderne et épuré

3. **Section Parcours**
   - Carte interactive du parcours
   - Statistiques de la course (distance, dénivelé, altitude)
   - Points clés du parcours avec détails
   - Design en deux colonnes

4. **Section Inscription**
   - Formulaire d'inscription complet
   - Tarification avec 3 niveaux (Early Bird, Normal, Tardif)
   - Liste des avantages inclus
   - Design sombre élégant

5. **Section Actualités**
   - Grille d'articles
   - Carte featured pour l'actualité principale
   - Design responsive

6. **Section Galerie**
   - Onglets Photos/Vidéos
   - Grille responsive
   - Placeholders pour lightbox

7. **Section Partenaires**
   - Grille de logos partenaires
   - Appel à devenir partenaire

8. **Section Contact**
   - Formulaire de contact
   - Informations de contact
   - Liens réseaux sociaux

## 🚀 Fonctionnalités JavaScript

- **Navigation sticky** avec effet de scroll
- **Menu mobile** responsive
- **Compte à rebours** en temps réel
- **Smooth scrolling** pour les ancres
- **Animations au scroll** (Intersection Observer)
- **Gestion des formulaires** avec validation
- **Onglets de galerie** interactifs
- **Effet parallaxe** sur le hero

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints à :
- **Desktop** : > 1024px
- **Tablet** : 768px - 1024px
- **Mobile** : < 768px

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : 
  - Variables CSS personnalisées
  - Flexbox et Grid
  - Animations et transitions
  - Media queries
- **JavaScript Vanilla** : 
  - Pas de dépendances
  - Code moderne (ES6+)
  - Performance optimisée

## 📂 Structure des Fichiers

```
Site Circuit de Soane et loire/
├── index.html          # Page principale
├── style.css           # Styles CSS
├── script.js           # JavaScript
└── README.md          # Documentation
```

## 🎯 Améliorations Futures Possibles

### Intégrations Recommandées

1. **Carte Interactive**
   - Google Maps API
   - Leaflet.js
   - Mapbox

2. **Galerie Photos**
   - Lightbox2
   - PhotoSwipe
   - GLightbox

3. **Vidéos**
   - YouTube API
   - Vimeo Player

4. **Formulaires**
   - EmailJS pour l'envoi d'emails
   - Validation avancée
   - reCAPTCHA

5. **Analytics**
   - Google Analytics
   - Hotjar

6. **SEO**
   - Meta tags Open Graph
   - Schema.org markup
   - Sitemap XML

### Fonctionnalités Additionnelles

- [ ] Système de blog complet
- [ ] Espace membre / Dashboard coureur
- [ ] Résultats en direct
- [ ] Tracking GPS des coureurs
- [ ] Boutique en ligne (merchandising)
- [ ] Multi-langue (FR/EN)
- [ ] Mode sombre/clair
- [ ] Newsletter
- [ ] Partage sur réseaux sociaux

## 🎨 Personnalisation

### Modifier les Couleurs

Dans `style.css`, modifiez les variables CSS :

```css
:root {
    --primary-color: #d4282e;      /* Couleur principale */
    --accent-gold: #d4af37;        /* Couleur accent */
    --secondary-color: #1a1a2e;    /* Couleur secondaire */
}
```

### Modifier la Date de la Course

Dans `script.js`, ligne 35 :

```javascript
const raceDate = new Date('2026-06-15T09:00:00').getTime();
```

### Modifier les Informations de Contact

Dans `index.html`, section contact (ligne ~450).

## 📧 Contact

Pour toute question concernant le site :
- Email : contact@circuit-saoneetloire.fr
- Téléphone : +33 3 85 XX XX XX

## 📄 Licence

© 2026 Circuit de Saône-et-Loire. Tous droits réservés.

---

**Développé avec ❤️ pour les passionnés de cyclisme**
