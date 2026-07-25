# KarLuxe — Luxury Car Rental Platform Architecture & Design Spec

## 1. Executive Summary
**KarLuxe** is a world-class luxury car rental platform built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Zustand, and Supabase. Inspired by leading luxury automotive design standards (Porsche, Ferrari, Rolls-Royce, Bentley, Mercedes-Maybach), KarLuxe delivers a cinematic, highly interactive, and performant user experience across desktop and mobile devices.

---

## 2. Design System & Aesthetics

### Color Palette
- **Background**: `#050505` (Deep Onyx / Near Black)
- **Cards & Surfaces**: `#111111` (Obsidian Dark)
- **Primary Accent**: `#D4AF37` (Champagne Gold)
- **Accent Hover**: `#E8C65A` (Bright Gold)
- **Foreground Text**: `#FFFFFF` (Pure White)
- **Muted Text**: `#B6B6B6` (Metallic Gray)
- **Borders & Dividers**: `rgba(212, 175, 55, 0.2)` (Subtle Metallic Gold Tint)

### Glassmorphism & UI Accents
- `backdrop-blur-xl bg-black/60 border border-[rgba(212,175,55,0.2)]`
- Soft radial gradient glow halos around gold CTAs and active states.
- Rounded corners (`rounded-2xl`, `rounded-3xl`).
- High-contrast typography hierarchy.

### Typography
- **Headings**: `Space Grotesk` / `Clash Display`
- **Body**: `Inter`

### Micro-Animations (Framer Motion)
- **Page Transitions**: Smooth fade and slide route transitions.
- **Scroll Reveals**: Intersection observer staggered fade-in + slide-up animations.
- **Interactive UI**: Magnetic buttons, card tilt effects on hover, smooth counter increments, brand logo marquee slider, video modal, and progressive image lazy loading with blur placeholders.

---

## 3. Architecture & Project Structure

```
src/
├── app/
│   ├── (store)/
│   │   ├── page.tsx                    # Luxury Home Page (11 sections)
│   │   ├── fleet/
│   │   │   ├── page.tsx                # Vehicles Listing & Live Filtering
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Vehicle Detail Page (360, Gallery, Specs)
│   │   ├── booking/
│   │   │   └── page.tsx                # 6-Step Multi-Step Booking Wizard
│   │   └── account/
│   │       └── page.tsx                # Customer Account & Reservations Dashboard
│   ├── (admin)/
│   │   └── admin/
│   │       └── dashboard/
│   │           └── page.tsx            # Luxury Admin Analytics & Management Dashboard
│   ├── actions/                        # Server Actions (Bookings, Auth, Admin, Wishlist)
│   ├── api/                            # Edge API Routes (Webhooks, Signed URLs)
│   └── globals.css                     # Tailwind v4 Custom Properties & Styles
├── components/
│   ├── ui/                             # Reusable Primitives (Button, GlassCard, Modal, Badge, etc.)
│   ├── layout/                         # Header/Navbar, Footer, MobileNav, AdminSidebar
│   └── features/
│       ├── home/                       # 11 Home Page Sections
│       ├── fleet/                      # Fleet Filters, Fleet Grid, Fleet Card, 360 View
│       ├── booking/                    # Booking Steps (Dates, Location, Insurance, Extras, Payment)
│       ├── account/                    # User Reservations, Wishlist, Profile Editor
│       └── admin/                      # Admin Charts, Fleet Table, Bookings Manager, Coupons
├── lib/
│   ├── supabase/
│   │   ├── client.ts                   # createBrowserClient helper
│   │   ├── server.ts                   # createServerClient helper (with cookies)
│   │   └── middleware.ts               # Auth & Session Refresher Middleware
│   └── utils.ts                        # Currency, Date, Classnames helpers
├── store/                              # Zustand Stores (Filter Store, Booking Store, UI Store)
└── types/                              # TypeScript Definitions & Supabase Database Types
```

---

## 4. Database Schema (23 Supabase Tables)

1. `profiles`: Extended user metadata (full_name, phone, role, avatar_url, driver_license).
2. `brands`: Luxury car brands (Porsche, Ferrari, Rolls-Royce, Lamborghini, Bentley, Mercedes-Benz, McLaren).
3. `categories`: Vehicle types (SUV, Sports, Luxury, Electric, Wedding, Convertible, Premium Vans).
4. `cars`: Vehicle core details (title, slug, brand_id, category_id, daily_rate, year, transmission, fuel_type, seats, acceleration, top_speed, horsepower, engine, location, description, is_available, is_featured).
5. `vehicle_images`: High-res gallery images with display order.
6. `vehicle_features`: Key amenities (GPS, Massage Seats, Carbon Ceramic Brakes, HUD, Night Vision, Premium Sound).
7. `availability`: Specific blackout or booked date ranges per vehicle.
8. `bookings`: Rental reservations (car_id, user_id, pickup_date, dropoff_date, pickup_location, dropoff_location, insurance_tier, extras, total_price, status, payment_status).
9. `booking_status`: History log of booking status transitions.
10. `payments`: Payment records (booking_id, amount, provider, status, transaction_id).
11. `customers`: CRM records for admin tracking.
12. `reviews`: Rating (1-5), review text, verified booking status, user_id, car_id.
13. `favorites`: User wishlist items (user_id, car_id).
14. `notifications`: System & user alerts (unread status, type, message).
15. `maintenance`: Vehicle service logs (car_id, type, cost, service_date, status).
16. `locations`: Pickup/dropoff locations (Airports, VIP Terminals, City Hubs).
17. `drivers`: Chauffeur profiles (name, experience, language, photo, status).
18. `services`: Add-on services (Airport Delivery, Chauffeur, VIP Concierge, Full Coverage Insurance).
19. `coupons`: Promo codes (code, discount_percent, valid_until, max_uses).
20. `promo_codes`: Usage log for promotional discounts.
21. `media`: Media library for hero videos, logos, banners.
22. `settings`: Global site configuration (currency, tax_rate, deposit_amount, contact_email).
23. `analytics`: Daily revenue, page views, booking conversions metrics.

---

## 5. Security & Data Protection
- **Row Level Security (RLS)**: Enabled on all 23 tables. Public read for active cars/brands/categories/reviews. User-restricted read/write for bookings, favorites, profile, notifications. Admin role bypass for all tables.
- **Server Actions**: Strictly typed with Zod schema validation before mutating database records.
- **Storage Buckets**: Public buckets for vehicle photos & brand logos; Private restricted buckets for user driver licenses and payment receipts with signed URLs.

---

## 6. Verification & Quality Standards
- No placeholder data or broken links.
- Production-ready database seed script containing real specs, descriptions, and high-quality Unsplash luxury supercar media URLs.
- 100% TypeScript compliance without `any` types.
- Next.js 16 build passing with zero errors.
