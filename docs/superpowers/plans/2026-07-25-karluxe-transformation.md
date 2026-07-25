# KarLuxe Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the project into **KarLuxe**, a world-class luxury car rental web application with 23 database tables, cinematic Next.js 16 App Router interface, Framer Motion animations, interactive 6-step booking flow, and comprehensive admin dashboard.

**Architecture:** Feature-driven modular layout (`src/features/` & `src/components/features/`), typed `@supabase/ssr` server and browser clients, Zustand state management, Server Actions with Zod validation, Tailwind v4 styling with luxury dark/gold aesthetic tokens.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Zustand, React Hook Form, Zod, Supabase SSR.

## Global Constraints
- Color Tokens: Dark Background `#050505`, Cards `#111111`, Champagne Gold `#D4AF37`, Light Gold `#E8C65A`, Text White `#FFFFFF`, Muted `#B6B6B6`, Border `rgba(212,175,55,0.2)`.
- Headings: Space Grotesk / Clash Display, Body: Inter.
- Database: 23 tables on Supabase public schema created via Supabase MCP `execute_sql`.
- 100% TypeScript strictness with zero `any`.
- Production-ready seed data with high quality vehicle images and complete luxury vehicle attributes.

---

### Task 1: Database Migration & Supabase Initialization

**Files:**
- Create: `supabase/migrations/20260725000000_karluxe_schema.sql`

**Interfaces:**
- Consumes: Supabase database connection (`sspqegfafhdzcxaggbei`)
- Produces: 23 tables (`profiles`, `cars`, `brands`, `categories`, `vehicle_images`, `vehicle_features`, `availability`, `bookings`, `booking_status`, `payments`, `customers`, `reviews`, `favorites`, `notifications`, `maintenance`, `locations`, `drivers`, `services`, `coupons`, `promo_codes`, `media`, `settings`, `analytics`), RLS policies, indexes, triggers, storage buckets, and seed data.

- [ ] **Step 1: Write migration SQL script**
Write SQL creating all 23 tables, foreign keys, triggers for `updated_at`, RLS policies, storage bucket insertions (`vehicle-images`, `brand-logos`, `user-avatars`, `media`), and comprehensive seed data for 8 top-tier luxury vehicles (Porsche 911 GT3 RS, Rolls-Royce Phantom VIII, Ferrari SF90 Stradale, Lamborghini Revuelto, Bentley Continental GT Speed, Mercedes-Maybach S 680, Aston Martin DBS 770 Ultimate, McLaren 750S Spider).

- [ ] **Step 2: Execute migration via Supabase MCP**
Run `execute_sql` tool on project `sspqegfafhdzcxaggbei`.

- [ ] **Step 3: Verify created tables**
Run `list_tables` tool on project `sspqegfafhdzcxaggbei`.

- [ ] **Step 4: Commit SQL migration**
```bash
git add supabase/migrations/20260725000000_karluxe_schema.sql
git commit -m "feat: add complete KarLuxe database schema migration and seed data"
```

---

### Task 2: Supabase SSR Client & TypeScript Definitions

**Files:**
- Modify: `src/lib/supabase/client.ts`
- Modify: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/middleware.ts`
- Create: `src/types/database.types.ts`
- Create: `src/types/index.ts`

**Interfaces:**
- Consumes: `.env.local` Supabase credentials
- Produces: Strongly typed Supabase browser client, server client, middleware helper, and full TypeScript interfaces for Cars, Brands, Categories, Bookings, Reviews, Favorites, Profiles, Admin Stats.

- [ ] **Step 1: Create database TypeScript interfaces**
Define complete types in `src/types/database.types.ts` matching all 23 tables.

- [ ] **Step 2: Create domain application types**
Define UI types (`CarWithDetails`, `FilterState`, `BookingState`, `AdminOverviewStats`) in `src/types/index.ts`.

- [ ] **Step 3: Refactor Supabase SSR client utilities**
Implement `createBrowserClient` in `src/lib/supabase/client.ts` and `createServerClient` in `src/lib/supabase/server.ts` using `@supabase/ssr`.

- [ ] **Step 4: Commit Supabase clients and types**
```bash
git add src/lib/supabase/ src/types/
git commit -m "feat: setup Supabase SSR clients and TypeScript domain definitions"
```

---

### Task 3: Luxury Design System & UI Components

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/components/ui/LuxuryButton.tsx`
- Create: `src/components/ui/GlassCard.tsx`
- Create: `src/components/ui/GoldBadge.tsx`
- Create: `src/components/ui/AnimatedCounter.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/LuxuryModal.tsx`
- Create: `src/components/ui/BrandMarquee.tsx`

**Interfaces:**
- Consumes: Tailwind v4 custom utilities and Framer Motion
- Produces: Reusable luxury UI primitives with magnetic/glow hover effects, glassmorphic styling, and animation motion variants.

- [ ] **Step 1: Update globals.css**
Inject custom font imports, custom color variables (`--bg-primary: #050505`, `--card-bg: #111111`, `--accent-gold: #D4AF37`, `--accent-gold-hover: #E8C65A`), glassmorphism utilities (`.glass-panel`, `.gold-border-glow`), scrollbar styling, and smooth scroll behavior.

- [ ] **Step 2: Implement UI Primitives**
Build `LuxuryButton`, `GlassCard`, `GoldBadge`, `AnimatedCounter`, `SectionHeading`, `LuxuryModal`, and `BrandMarquee`.

- [ ] **Step 3: Commit UI components**
```bash
git add src/app/globals.css src/components/ui/
git commit -m "feat: add KarLuxe luxury design system and reusable UI components"
```

---

### Task 4: Layout & Header / Footer Navigation

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/(store)/layout.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: Supabase auth state, Zustand wishlist count
- Produces: Floating glassmorphic navbar with gold brand logo, navigation routes, wishlist badge, auth modal toggle, and luxury dark footer with locations & newsletter.

- [ ] **Step 1: Build Luxury Navbar**
Create `Navbar.tsx` featuring blur backdrop, logo, nav items (Fleet, Services, Wedding, About, Contact), Quick Book CTA, Wishlist counter, and User Menu.

- [ ] **Step 2: Build Luxury Footer**
Create `Footer.tsx` featuring brand statement, quick links, luxury fleet categories, newsletter signup form, social icons, locations list (Monaco, Dubai, Paris, Los Angeles, Zurich), and copyright.

- [ ] **Step 3: Update layouts**
Update `src/app/layout.tsx` and `src/app/(store)/layout.tsx` to include custom metadata, font variables, and theme provider setup.

- [ ] **Step 4: Commit Layout components**
```bash
git add src/components/layout/ src/app/layout.tsx src/app/\(store\)/layout.tsx
git commit -m "feat: implement KarLuxe luxury header navbar and footer layout"
```

---

### Task 5: Complete Home Page Redesign (11 Sections)

**Files:**
- Create: `src/components/features/home/HeroSection.tsx`
- Create: `src/components/features/home/FeaturedFleet.tsx`
- Create: `src/components/features/home/CategoriesSection.tsx`
- Create: `src/components/features/home/ServicesSection.tsx`
- Create: `src/components/features/home/WeddingSection.tsx`
- Create: `src/components/features/home/StatsSection.tsx`
- Create: `src/components/features/home/TestimonialsSection.tsx`
- Create: `src/components/features/home/BrandsSection.tsx`
- Create: `src/components/features/home/FaqSection.tsx`
- Create: `src/components/features/home/CtaSection.tsx`
- Modify: `src/app/(store)/page.tsx`

**Interfaces:**
- Consumes: Supabase database cars, brands, reviews
- Produces: 11 production-ready homepage sections with Framer Motion animations, real data fetching, and luxury interactivity.

- [ ] **Step 1: Build HeroSection**
Dark cinematic background video/bento grid overlay, gold badge ("THE APEX OF LUXURY MOBILITY"), large headline ("DRIVE THE EXTRAORDINARY"), floating quick booking widget, key stats badges.

- [ ] **Step 2: Build FeaturedFleet & FleetCard**
Grid of top luxury supercars with image hover zoom, specs pills (0-100 km/h, HP, Top Speed), daily price, availability badge, and quick book button.

- [ ] **Step 3: Build CategoriesSection, ServicesSection, WeddingSection**
Interactive category selector, 6 service cards (Airport Delivery, Chauffeur, VIP Concierge, Full Coverage Insurance, 24/7 Support, Door Delivery), and dedicated high-impact Wedding Experience banner.

- [ ] **Step 4: Build StatsSection, TestimonialsSection, BrandsSection, FaqSection, CtaSection**
Animated counters ($50M+ Fleet, 100% Satisfied VIP Clients, 24/7 Concierge), verified client review cards, luxury brand logo marquee, animated expandable FAQ accordion, and VIP Booking CTA section.

- [ ] **Step 5: Assemble Home Page in page.tsx**
Fetch cars, brands, and categories from Supabase in `src/app/(store)/page.tsx` and render all 11 sections.

- [ ] **Step 6: Commit Home page redesign**
```bash
git add src/components/features/home/ src/app/\(store\)/page.tsx
git commit -m "feat: complete KarLuxe luxury home page with 11 dynamic sections"
```

---

### Task 6: Vehicles Fleet Listing & Advanced Live Filtering

**Files:**
- Create: `src/store/useFilterStore.ts`
- Create: `src/components/features/fleet/FleetFilters.tsx`
- Create: `src/components/features/fleet/FleetGrid.tsx`
- Create: `src/components/features/fleet/FleetCard.tsx`
- Create: `src/app/(store)/fleet/page.tsx`

**Interfaces:**
- Consumes: Supabase cars database query
- Produces: Fleet page with real-time multi-facet filtering (Brand, Category, Price Range, Transmission, Fuel, Seats, Location, Sort order, Search input).

- [ ] **Step 1: Create Zustand Filter Store**
Define filter state (search, brandId, categoryId, minPrice, maxPrice, transmission, fuel, seats, sort, viewMode) and reset actions in `useFilterStore.ts`.

- [ ] **Step 2: Build FleetFilters sidebar & search bar**
Create interactive filter drawer/sidebar with slider inputs, checkboxes, active filter tags, and clear buttons.

- [ ] **Step 3: Build FleetGrid and FleetCard**
Create animated vehicle grid supporting view toggles (grid vs list), price badges, key technical metrics, and instant wishlist favorite toggles.

- [ ] **Step 4: Rebuild Fleet Page**
Fetch full vehicle fleet with brand and category relations from Supabase in `src/app/(store)/fleet/page.tsx`.

- [ ] **Step 5: Commit Fleet listing page**
```bash
git add src/store/useFilterStore.ts src/components/features/fleet/ src/app/\(store\)/fleet/
git commit -m "feat: add KarLuxe fleet page with real-time multi-facet filtering and search"
```

---

### Task 7: Vehicle Details Page (360 View, Gallery, Specs, Sticky Booking)

**Files:**
- Create: `src/components/features/fleet/VehicleGallery.tsx`
- Create: `src/components/features/fleet/Vehicle360.tsx`
- Create: `src/components/features/fleet/VehicleSpecs.tsx`
- Create: `src/components/features/fleet/StickyBookingCard.tsx`
- Create: `src/components/features/fleet/VehicleReviews.tsx`
- Create: `src/app/(store)/fleet/[slug]/page.tsx`

**Interfaces:**
- Consumes: `slug` param, fetches vehicle details with images, features, and reviews
- Produces: Comprehensive supercar detail view with image gallery zoom modal, interactive 360 rotation slider, complete technical spec breakdown, customer review submissions, and sticky daily rate calculator card.

- [ ] **Step 1: Build VehicleGallery & Vehicle360**
Multi-image showcase with thumbnail selector, lightbox fullscreen preview, and 360-degree interactive image sequence slider.

- [ ] **Step 2: Build VehicleSpecs & Features list**
Grid showing Engine, HP, Acceleration 0-100, Top Speed, Drivetrain, Transmission, Fuel Capacity, and luxury feature badges (Massage Seats, HUD, Carbon Brakes, Night Vision).

- [ ] **Step 3: Build StickyBookingCard & VehicleReviews**
Sticky floating card calculating total price based on selected date range, deposit info, pick-up location, and immediate "Reserve Now" action button. Verified customer review list with rating summary.

- [ ] **Step 4: Rebuild Vehicle Detail page.tsx**
Fetch vehicle by slug from Supabase in `src/app/(store)/fleet/[slug]/page.tsx` with fallback dynamic metadata for SEO.

- [ ] **Step 5: Commit Vehicle Details page**
```bash
git add src/components/features/fleet/ src/app/\(store\)/fleet/\[slug\]/
git commit -m "feat: implement KarLuxe vehicle details page with 360 view, gallery, and specs"
```

---

### Task 8: Interactive Multi-Step Booking Flow

**Files:**
- Create: `src/store/useBookingStore.ts`
- Create: `src/components/features/booking/StepDates.tsx`
- Create: `src/components/features/booking/StepLocations.tsx`
- Create: `src/components/features/booking/StepInsurance.tsx`
- Create: `src/components/features/booking/StepExtras.tsx`
- Create: `src/components/features/booking/StepPayment.tsx`
- Create: `src/components/features/booking/BookingSummary.tsx`
- Create: `src/app/actions/bookingActions.ts`
- Create: `src/app/(store)/booking/page.tsx`

**Interfaces:**
- Consumes: Zustand booking store, selected car details, user session
- Produces: 6-step guided luxury booking flow with instant pricing recalculation, insurance protection tier selection, VIP extras (Chauffeur, Airport Delivery, Child Seat), payment input, and Server Action booking creation in Supabase.

- [ ] **Step 1: Create Zustand Booking Store**
State for currentStep (1-6), selectedCarId, pickupDate, dropoffDate, pickupLocation, dropoffLocation, insuranceTier (Standard/Premium/VIP Zero Excess), selectedExtras, paymentMethod, customerInfo, totalAmount.

- [ ] **Step 2: Build Step Components 1 to 5**
Date range picker calendar, Location selector (Airports, Private Jet Terminals, Hotels), Protection plan cards comparison, and VIP extra add-on toggles.

- [ ] **Step 3: Build Step 6 Payment & BookingSummary**
Payment details card input, promo code input validator, itemized breakdown breakdown card, and Server Action trigger.

- [ ] **Step 4: Implement createBookingAction Server Action**
Validate payload with Zod in `src/app/actions/bookingActions.ts`, insert row into `bookings` table, update vehicle availability, insert status log in `booking_status`, and return reservation code.

- [ ] **Step 5: Rebuild Booking page.tsx**
Assemble 6-step wizard with step progress indicator bar in `src/app/(store)/booking/page.tsx`.

- [ ] **Step 6: Commit Multi-Step Booking flow**
```bash
git add src/store/useBookingStore.ts src/components/features/booking/ src/app/actions/bookingActions.ts src/app/\(store\)/booking/
git commit -m "feat: build 6-step interactive booking flow with Server Action database creation"
```

---

### Task 9: User Account & Reservations Dashboard

**Files:**
- Create: `src/components/features/account/UserReservations.tsx`
- Create: `src/components/features/account/UserWishlist.tsx`
- Create: `src/components/features/account/UserProfileEditor.tsx`
- Create: `src/app/actions/accountActions.ts`
- Create: `src/app/(store)/account/page.tsx`

**Interfaces:**
- Consumes: User session, Supabase queries for bookings & favorites
- Produces: Customer portal to view upcoming/past car rentals, download PDF-style invoice summary, manage saved wishlist vehicles, update contact details and driver license info.

- [ ] **Step 1: Build UserReservations**
Interactive reservation cards with status badge (Confirmed, Active, Completed, Cancelled), vehicle photo, date ranges, total price, and action buttons (Cancel, View Details).

- [ ] **Step 2: Build UserWishlist & UserProfileEditor**
Grid of saved favorite vehicles with quick remove button. Profile edit form (name, email, phone, driver license number) handled via `updateProfileAction` Server Action.

- [ ] **Step 3: Rebuild Account page.tsx**
Auth-protected user dashboard page in `src/app/(store)/account/page.tsx` with tabbed navigation (Reservations, Wishlist, Profile Settings).

- [ ] **Step 4: Commit User Account dashboard**
```bash
git add src/components/features/account/ src/app/actions/accountActions.ts src/app/\(store\)/account/
git commit -m "feat: implement customer account portal for reservations, wishlist, and profile"
```

---

### Task 10: Luxury Admin Dashboard & Fleet Management

**Files:**
- Create: `src/components/features/admin/AdminSidebar.tsx`
- Create: `src/components/features/admin/AdminHeader.tsx`
- Create: `src/components/features/admin/MetricsOverview.tsx`
- Create: `src/components/features/admin/RevenueChart.tsx`
- Create: `src/components/features/admin/FleetManagerTable.tsx`
- Create: `src/components/features/admin/BookingsManagerTable.tsx`
- Create: `src/app/actions/adminActions.ts`
- Create: `src/app/(admin)/admin/dashboard/page.tsx`

**Interfaces:**
- Consumes: Admin session check, full Supabase database queries
- Produces: Executive dashboard showing key financial metrics ($ Total Revenue, Active Reservations, Total Vehicles, Occupancy Rate), revenue trend chart, vehicle availability toggle, booking status updater, and maintenance logger.

- [ ] **Step 1: Build Admin Navigation & Layout**
Create `AdminSidebar.tsx` and `AdminHeader.tsx` with gold luxury theme, quick notifications indicator, and active section switcher.

- [ ] **Step 2: Build MetricsOverview & RevenueChart**
Metric cards displaying total revenue, total bookings, fleet utilization rate, and active customers. Visual bar/line chart displaying monthly revenue growth.

- [ ] **Step 3: Build FleetManagerTable & BookingsManagerTable**
Data tables with status badges, search input, availability toggle button (Available / Maintenance / Rented), and booking status updater dropdown.

- [ ] **Step 4: Implement Admin Server Actions**
Create `updateCarStatusAction` and `updateBookingStatusAction` in `src/app/actions/adminActions.ts`.

- [ ] **Step 5: Rebuild Admin Dashboard page.tsx**
Assemble executive analytics & control dashboard in `src/app/(admin)/admin/dashboard/page.tsx`.

- [ ] **Step 6: Commit Admin Dashboard**
```bash
git add src/components/features/admin/ src/app/actions/adminActions.ts src/app/\(admin\)/admin/dashboard/
git commit -m "feat: build KarLuxe admin dashboard with revenue analytics and fleet management"
```

---

### Task 11: Build Verification & Final Polish

**Files:**
- Inspect: Entire project

- [ ] **Step 1: Run TypeScript & ESLint validation**
Run `npx tsc --noEmit` and `npm run lint` to verify zero type errors.

- [ ] **Step 2: Run Production Build**
Run `npm run build` to verify clean build generation without compilation issues.

- [ ] **Step 3: Verify execution**
Confirm all 11 homepage sections, fleet filters, details page, 6-step booking flow, user account dashboard, and admin panel render cleanly.

- [ ] **Step 4: Final Git Commit**
```bash
git add .
git commit -m "chore: final KarLuxe transformation build verification and release"
```
