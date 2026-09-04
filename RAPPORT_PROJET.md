# 📑 Rapport Détaillé du Projet — KarLuxe Location

---

## 1. Informations Générales & Résumé Exécutif

* **Nom du Projet** : **KarLuxe Location** (`karluxe-location`)
* **Type d'application** : Plateforme Web de Réservation & Gestion de Location de Voitures de Luxe et Supercars (B2C & Back-Office B2B)
* **Version** : `0.1.0` (Core v2.5)
* **Marché Cible** : Location de prestige en Algérie (Alger, Oran, etc.) et à l'international (Monaco, Dubaï, Paris, Zurich, Los Angeles)
* **Objectif Principal** : Offrir une expérience digitale haut de gamme, fluide et cinématique pour les clients VIP souhaitant réserver des supercars (Porsche, Ferrari, Lamborghini, Rolls-Royce, Bentley, Mercedes-Maybach), tout en fournissant une suite d'administration complète pour la gestion de la flotte, des réservations et des agents commerciaux.

---

## 2. Stack Technologique & Architecture

### 2.1. Frontend & Core Framework
* **Next.js 16 (App Router)** : Utilisation des Server Components (RSC), Client Components, Server Actions et Static Site Generation (SSG / ISR avec revalidation périodique).
* **React 19** : Gestion moderne du state et hooks asynchrones.
* **TypeScript 5** : Typage statique strict de bout en bout sans type `any`.
* **Tailwind CSS v4** : Styling moderne basé sur des variables CSS personnalisées et un moteur de styles ultra-rapide.
* **Framer Motion 12** : Micro-animations cinématiques, transitions d'entrée et effets de survol interactifs.
* **Lucide React** : Bibliothèque d'icônes vectorielles épurées.

### 2.2. Gestion d'État & Formulaires
* **Zustand 5** : Stores réactifs légers pour la gestion globale :
  * `useFilterStore` : Filtres dynamiques de la flotte (marques, catégories, transmission, recherche, tri).
  * `useBookingStore` : État du tunnel de réservation (véhicule sélectionné, dates, étapes).
  * `useCurrencyStore` : Conversion et affichage multi-devises (DZD, EUR, USD, AED) avec persistance locale.
  * `useWishlistStore` : Favoris utilisateurs.
* **React Hook Form & Zod 4** : Validation stricte des schémas de données côté client et serveur.

### 2.3. Backend, Base de Données & Cloud
* **Supabase** :
  * **PostgreSQL** : Base de données relationnelle structurée avec 23 tables.
  * **Row Level Security (RLS)** : Sécurisation granulaire des données au niveau des lignes.
  * **Supabase SSR Client (`@supabase/ssr`)** : Gestion sécurisée des cookies de session pour les Server Actions et Server Components.
  * **Supabase Storage** : Stockage public et privé des photos de véhicules, logos de marques et documents.
* **Upstash Redis (`@upstash/redis`)** : Couche de mise en cache haute performance.
* **ImageKit Next (`@imagekit/next`)** : Optimisation et transformation dynamique d'images.

### 2.4. Intégrations & Automatisations
* **Telegram Bot API** : Notification instantanée des réservations envoyée directement aux gérants et administrateurs via webhook Telegram.
* **Google Apps Script / Google Sheets** : Synchronisation automatique en temps réel des leads et réservations dans les feuilles de calcul dédiées à chaque agent commercial.

---

## 3. Design System & Charte Graphique VIP

Le design de **KarLuxe** a été conçu pour refléter les standards visuels du très haut de gamme automobile (Porsche Exclusive Manufaktur, Rolls-Royce Bespoke, Ferrari Tailor Made) :

* **Palette Chromatique** :
  * **Fond Principal** : `#050505` (Deep Onyx / Noir absolu)
  * **Cartes & Surfaces** : `#111111` & `#0A0A0A` (Obsidienne sombre)
  * **Couleur d'Accent** : `#D4AF37` (Champagne Gold / Or Métallisé)
  * **Survol d'Accent** : `#E8C65A` (Bright Gold)
  * **Typographie & Titres** : `#FFFFFF` (Blanc Pur)
  * **Textes Secondaires** : `#B6B6B6` (Gris Titane)
  * **Bordures & Séparateurs** : `rgba(212, 175, 55, 0.2)` (Doré translucide)
* **Effets Visuels & Glassmorphism** :
  * Panneaux en verre dépoli (`backdrop-blur-xl bg-black/60`).
  * Halos radiaux et ombres portées dorées discrètes (`shadow-[0_0_20px_rgba(212,175,55,0.15)]`).
* **Typographie** :
  * Titres et En-têtes : `Space Grotesk` (Caractère moderne, technologique et audacieux).
  * Textes de lecture : `Inter` (Clarté et lisibilité optimale).

---

## 4. Architecture des Dossiers du Projet

```
luxury-location/
├── docs/                                  # Spécifications et documentation d'architecture
│   └── superpowers/specs/                 # Spécification détaillée du design KarLuxe
├── public/                                # Fichiers statiques, images et logos
│   └── images/
├── src/
│   ├── app/                               # Next.js App Router
│   │   ├── (admin)/                       # Layout & Pages d'administration
│   │   │   └── admin/dashboard/          # Dashboard analytique
│   │   ├── (store)/                       # Espace Boutique / Client public
│   │   │   ├── booking/                   # Tunnel de réservation multi-étapes (/booking)
│   │   │   ├── fleet/                     # Catalogue & filtre de la flotte (/fleet)
│   │   │   │   └── [slug]/                # Fiche détaillée du véhicule (/fleet/[slug])
│   │   │   ├── contact/                   # Page de contact VIP
│   │   │   ├── favorites/                 # Wishlist client
│   │   │   ├── layout.tsx                 # Layout principal du store
│   │   │   └── page.tsx                   # Landing Page principale d'accueil
│   │   ├── actions/                       # Server Actions Next.js (sécurisées avec Zod)
│   │   │   ├── adminActions.ts            # CRUD véhicules, marques, catégories, agences, coupons
│   │   │   ├── bookingActions.ts          # Création réservation + notifications Telegram & Sheets
│   │   │   ├── analytics.ts               # Extraction des métriques
│   │   │   └── profile.ts                 # Gestion des profils utilisateurs
│   │   ├── admin/                         # Interface de gestion admin (/admin)
│   │   ├── admin-login/                   # Connexion sécurisée administrateur (/admin-login)
│   │   ├── globals.css                    # Variables CSS, thème sombre & tokens Tailwind
│   │   ├── layout.tsx                     # Layout racine de l'application
│   │   ├── robots.ts                      # Fichier robots.txt pour le référencement SEO
│   │   └── sitemap.ts                     # Génération dynamique du sitemap XML
│   ├── components/
│   │   ├── features/                      # Composants orientés métier
│   │   │   ├── home/                      # 11 Sections de la page d'accueil
│   │   │   │   ├── HeroSection.tsx        # Bannière héro avec vidéo/image et CTA
│   │   │   │   ├── FeaturedFleet.tsx      # Grille des véhicules vedettes
│   │   │   │   ├── CategoriesSection.tsx  # Catégories de véhicules (Sports, SUV, Luxe, etc.)
│   │   │   │   ├── ServicesSection.tsx    # Services VIP (Chauffeur, Conciergerie 24/7, etc.)
│   │   │   │   ├── BrandsSection.tsx      # Défilement dynamique des marques partenaires
│   │   │   │   ├── FaqSection.tsx         # Foire aux questions interactive
│   │   │   │   └── CtaSection.tsx         # Appel à l'action final
│   │   │   ├── fleet/                     # Composants du catalogue
│   │   │   │   ├── FleetFilters.tsx       # Barre latérale de filtres avancés
│   │   │   │   ├── FleetGrid.tsx          # Grille d'affichage réactive des voitures
│   │   │   │   ├── VehicleGallery.tsx     # Galerie photos interactive
│   │   │   │   ├── VehicleSpecs.tsx       # Fiche technique (accélération, Vmax, moteur, etc.)
│   │   │   │   ├── VehicleReviews.tsx     # Témoignages et avis clients vérifiés
│   │   │   │   └── StickyBookingCard.tsx  # Carte latérale sticky de réservation rapide
│   │   │   ├── booking/                   # Étapes du wizard de réservation
│   │   │   │   ├── StepCarSelect.tsx      # Étape 1 : Choix du véhicule
│   │   │   │   ├── StepDates.tsx          # Étape 2 : Choix des dates & calcul durée
│   │   │   │   ├── StepLocations.tsx      # Sélection du lieu de livraison
│   │   │   │   ├── StepInsurance.tsx      # Niveaux d'assurance (Standard, VIP, Zéro Franchise)
│   │   │   │   ├── StepExtras.tsx         # Options supplémentaires (Chauffeur, etc.)
│   │   │   │   └── StepPayment.tsx        # Étape 3 : Coordonnées client, Wilaya & validation
│   │   │   └── admin/                     # Composants du tableau de bord admin
│   │   │       ├── AdminSidebar.tsx       # Navigation latérale admin
│   │   │       ├── MetricsOverview.tsx    # Cartes d'indicateurs clés (Chiffre d'affaires, etc.)
│   │   │       ├── RevenueAnalyticsChart.tsx # Graphique de revenus
│   │   │       ├── FleetManagerTable.tsx  # Table de gestion de la flotte + modales
│   │   │       ├── BookingsManagerTable.tsx # Table de gestion des réservations
│   │   │       ├── CategoriesManagerTable.tsx # Gestion des catégories
│   │   │       ├── BrandsManagerTable.tsx # Gestion des marques automobiles
│   │   │       ├── AgenciesManagerTable.tsx # Gestion des agences / succursales
│   │   │       ├── AddCarModal.tsx        # Modale d'ajout d'une supercar
│   │   │       └── ConfirmDeleteModal.tsx # Modale de confirmation de suppression
│   │   ├── layout/                        # Composants structurels
│   │   │   ├── Navbar.tsx                 # Barre de navigation flottante avec effet blur
│   │   │   ├── Footer.tsx                 # Pied de page de prestige
│   │   │   └── CurrencySwitcher.tsx       # Sélecteur dynamique de devises (DZD, EUR, USD, AED)
│   │   └── ui/                            # Primitives UI réutilisables (Boutons, Badges, etc.)
│   ├── data/                              # Données géographiques locales
│   │   └── wilayaCommunes.json            # Base des 58 Wilayas et Communes d'Algérie
│   ├── lib/                               # Utilitaires et clients
│   │   ├── supabase/                      # Helpers Supabase client/serveur/middleware
│   │   └── storeSettings.ts               # Configurations globales
│   ├── store/                             # Stores Zustand
│   ├── types/                             # Types TypeScript & Database schema types
│   └── utils/                             # Fonctions utilitaires
│       ├── telegram.ts                    # Envoi d'alertes via Bot Telegram
│       └── googleSheets.ts                # Synchronisation Google Sheets via Apps Script
└── supabase/
    └── migrations/                        # Scripts SQL de migration, tables, RLS et seeds
```

---

## 5. Modèle de Données Supabase (23 Tables)

La base PostgreSQL comprend 23 tables interconnectées avec intégrité référentielle, politiques RLS et triggers de mise à jour :

| # | Nom de la Table | Description & Rôle |
|---|---|---|
| 1 | `profiles` | Informations étendues des utilisateurs (nom, email, téléphone, rôle admin/client, permis). |
| 2 | `brands` | Marques prestigieuses (Porsche, Ferrari, Rolls-Royce, Lamborghini, Bentley, Maybach). |
| 3 | `categories` | Catégories de véhicules (Sports, Luxury, SUV, Electric, Wedding, Convertible). |
| 4 | `cars` | Véhicules de la flotte (titre, slug, tarif journalier, caution, transmission, moteur, agent assigné, disponibilité). |
| 5 | `vehicle_images` | Galerie d'images haute résolution par véhicule avec ordre d'affichage. |
| 6 | `vehicle_features` | Équipements et options premium (Freins carbone céramique, Ciel étoilé, etc.). |
| 7 | `availability` | Périodes d'indisponibilité ou dates bloquées par véhicule. |
| 8 | `locations` | Agences de livraison, aéroports, terminaux VIP et hubs urbains. |
| 9 | `services` | Prestations additionnelles (Livraison aéroport, Chauffeur privé, Conciergerie 24/7). |
| 10 | `bookings` | Enregistrement complet des réservations (code de réservation, dates, client, montants, statut). |
| 11 | `booking_status` | Historique et journal des changements de statut d'une réservation. |
| 12 | `payments` | Historique des transactions et paiements. |
| 13 | `customers` | Fiches CRM clients avec niveaux de fidélité VIP (Silver, Gold, Platinum, Black Card). |
| 14 | `reviews` | Avis clients vérifiés avec note sur 5 étoiles et commentaires. |
| 15 | `favorites` | Véhicules mis en favoris par les utilisateurs. |
| 16 | `notifications` | Alertes système et notifications destinées aux utilisateurs. |
| 17 | `maintenance` | Carnet d'entretien et suivi technique des supercars. |
| 18 | `drivers` | Profils des chauffeurs professionnels et de sécurité. |
| 19 | `coupons` | Codes promotionnels avec pourcentages ou montants de réduction. |
| 20 | `promo_codes` | Suivi d'utilisation des codes promo par les utilisateurs. |
| 21 | `media` | Bibliothèque multimédia pour vidéos héro et bannières. |
| 22 | `settings` | Paramètres généraux du site (devise par défaut, taxes, coordonnées de contact). |
| 23 | `analytics` | Métriques journalières (visites, chiffre d'affaires, taux de conversion). |

---

## 6. Fonctionnalités Clés & Parcours Utilisateur

### 6.1. Expérience Client (Front-Office)
1. **Landing Page Immersive (11 Sections)** :
   * **Hero Section** : Titre fort, badge VIP, visuel cinématique et accès direct à la réservation.
   * **Flotte Vedette** : Sélection instantanée des supercars les plus demandées.
   * **Catégories & Expériences** : Navigation par type de véhicule (Sport, Luxe, Mariage, SUV).
   * **Services Conciergerie** : Présentation des prestations exclusives (Chauffeur, livraison tarmac).
   * **Marques Automobiles** : Ruban dynamique des constructeurs de légende.
   * **FAQ & Témoignages** : Questions fréquentes interactives et retours de clients vérifiés.
   * **CTA Final** : Incitation à l'action pour une réservation sur-mesure.

2. **Catalogue Flotte avec Filtres en Temps Réel (`/fleet`)** :
   * Filtrage multi-critères instantané sans rechargement de page (par marque, catégorie, transmission automatique/manuelle, fourchette de prix).
   * Tri par popularité, prix croissant ou décroissant.
   * Recherche textuelle rapide.

3. **Page Détail du Véhicule (`/fleet/[slug]`)** :
   * Galerie photos dynamique avec affichage grand format.
   * Fiche technique détaillée (0 à 100 km/h, Vitesse maximale, Puissance en chevaux, Moteur).
   * Liste des équipements de confort et de sécurité.
   * Carte latérale fixe (Sticky Booking Card) permettant d'initier la réservation directement avec calcul en direct du tarif.

4. **Tunnel de Réservation VIP en 3 Étapes (`/booking`)** :
   * **Étape 1** : Sélection / confirmation du véhicule.
   * **Étape 2** : Choix des dates de prise en charge et de restitution avec calcul automatique du nombre de jours.
   * **Étape 3** : Coordonnées du client (Nom, Téléphone, Email), sélection géographique locale (Wilaya & Commune en Algérie) et validation instantanée.

5. **Convertisseur Multi-Devises Réactif** :
   * Prise en charge du **Dinar Algérien (DA / DZD)**, de l'**Euro (€ / EUR)**, du **Dollar ($ / USD)** et du **Dirham des EAU (AED)**.
   * Mise à jour instantanée de tous les prix du site en un clic.

### 6.2. Automatisations & Notifications en Temps Réel
Lorsqu'un client finalise une réservation :
* **Enregistrement Supabase** : Création d'une entrée avec un code unique de réservation (ex: `KLX-84920`).
* **Alerte Telegram Immédiate** : Envoi d'un message HTML riche sur le canal de l'équipe (nom du client, numéro de téléphone, véhicule, dates, lieu, montant en DA et agent assigné).
* **Synchronisation Google Sheets** : Si le véhicule est rattaché à un agent commercial spécifique, une ligne est automatiquement ajoutée dans son tableur Google Sheets via Google Apps Script pour un suivi commercial instantané.

### 6.3. Espace Administration & Back-Office (`/admin`)
* **Authentification Administrateur (`/admin-login`)** : Accès protégé par vérification de session et jetons sécurisés.
* **Tableau de Bord Exécutif & KPI** :
  * Chiffre d'affaires total généré.
  * Nombre total de réservations.
  * Taille et disponibilité de la flotte active.
  * Taux d'occupation en pourcentage.
  * Graphique d'évolution des revenus.
* **Gestion de la Flotte (Cars Management)** :
  * Ajout de nouveaux véhicules avec téléversement d'images multiples, assignation d'agent commercial, caractéristiques techniques.
  * Bascule en un clic de la disponibilité (Actif / En location / Indisponible).
  * Suppression sécurisée avec confirmation modale.
* **Gestion des Réservations (Bookings Management)** :
  * Visualisation de toutes les réservations, filtrage par statut (En attente, Confirmée, Active, Terminée, Annulée).
* **Gestion des Marques, Catégories, Agences & Codes Promo** :
  * Modales d'ajout, modification et suppression pour une administration 100% autonome.

---

## 7. Sécurité, Performance & Bonnes Pratiques

* **Sécurité des Données** :
  * Activation de **Row Level Security (RLS)** sur les 23 tables PostgreSQL.
  * Validation stricte de toutes les requêtes mutantes via des Server Actions typées avec **Zod**.
* **Performance Web** :
  * Rendu hybride avec **Static Site Generation (SSG)** et revalidation périodique (`revalidate = 60`).
  * Optimisation automatique des images via `next/image` et WebP.
  * Scroll et écouteurs d'événements passifs (`passive: true`) pour un défilement à 60 FPS.
* **SEO & Référencement Naturel** :
  * Balises `Metadata` dynamiques générées pour chaque véhicule (`generateMetadata`).
  * Balises OpenGraph et Twitter Cards pour un partage optimal sur les réseaux sociaux.
  * Fichiers `sitemap.ts` et `robots.ts` natifs.

---

## 8. Guide d'Installation & Déploiement

### 8.1. Prérequis
* Node.js version 18+ (idéalement Node 20+)
* Un projet Supabase configuré
* Un Bot Telegram (optionnel, pour les alertes)
* Une URL Google Apps Script (optionnel, pour l'export Sheets)

### 8.2. Variables d'Environnement (`.env.local`)
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-publique-anon
SUPABASE_SERVICE_ROLE_KEY=votre-cle-privee-service-role

# Telegram Notifications
TELEGRAM_BOT_TOKEN=votre-token-bot-telegram
TELEGRAM_CHAT_ID=votre-chat-id-telegram

# Google Sheets Webhook
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
```

### 8.3. Commandes d'Exécution
```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Construction pour la production
npm run build

# Démarrage du serveur de production
npm run start
```

---

## 9. Conclusion & Perspectives d'Évolution

Le projet **KarLuxe Location** constitue une solution logicielle moderne, esthétique et robuste, parfaitement adaptée aux exigences du marché de la location de véhicules de prestige.

### Axes d'évolution recommandés :
1. **Passerelle de Paiement Direct** : Intégration de Stripe ou de passerelles de paiement locales algériennes (CIB / EDAHABIA / Satim).
2. **Signature Électronique de Contrat** : Génération automatique de contrats PDF avec signature numérique lors de la livraison.
3. **Application Mobile Compagnon** : Déclinaison en PWA ou application mobile native React Native pour les chauffeurs et clients VIP.
4. **Géolocalisation GPS en Direct** : Suivi télématique de la flotte en temps réel dans le tableau de bord administrateur.
