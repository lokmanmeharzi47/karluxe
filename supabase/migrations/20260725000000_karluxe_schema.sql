-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'vip')),
    driver_license_number TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. BRANDS
CREATE TABLE IF NOT EXISTS public.brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    country TEXT,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. CARS
CREATE TABLE IF NOT EXISTS public.cars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    brand_id UUID REFERENCES public.brands(id) ON DELETE SET NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    year INTEGER NOT NULL,
    daily_rate NUMERIC(10, 2) NOT NULL,
    weekly_rate NUMERIC(10, 2),
    security_deposit NUMERIC(10, 2) NOT NULL DEFAULT 5000.00,
    transmission TEXT NOT NULL DEFAULT 'Automatic' CHECK (transmission IN ('Automatic', 'Dual-Clutch', 'Manual')),
    fuel_type TEXT NOT NULL DEFAULT 'Gasoline' CHECK (fuel_type IN ('Gasoline', 'Hybrid', 'Electric', 'Twin-Turbo V8', 'V12')),
    seats INTEGER NOT NULL DEFAULT 2,
    acceleration TEXT NOT NULL,
    top_speed TEXT NOT NULL,
    horsepower INTEGER NOT NULL,
    engine TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT 'Monaco',
    description TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    featured_image TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. VEHICLE IMAGES
CREATE TABLE IF NOT EXISTS public.vehicle_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. VEHICLE FEATURES
CREATE TABLE IF NOT EXISTS public.vehicle_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
    feature_name TEXT NOT NULL,
    category TEXT DEFAULT 'Luxury',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. AVAILABILITY
CREATE TABLE IF NOT EXISTS public.availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT DEFAULT 'Booked',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. LOCATIONS
CREATE TABLE IF NOT EXISTS public.locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    address TEXT NOT NULL,
    is_airport BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. SERVICES
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon TEXT,
    price_per_day NUMERIC(10,2) DEFAULT 0.00,
    is_included BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. BOOKINGS
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_code TEXT NOT NULL UNIQUE,
    car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE RESTRICT,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    pickup_date DATE NOT NULL,
    dropoff_date DATE NOT NULL,
    pickup_location TEXT NOT NULL,
    dropoff_location TEXT NOT NULL,
    insurance_tier TEXT NOT NULL DEFAULT 'Standard' CHECK (insurance_tier IN ('Standard', 'Premium VIP', 'Zero Excess Platinum')),
    extras JSONB DEFAULT '[]'::jsonb,
    subtotal NUMERIC(10,2) NOT NULL,
    tax_amount NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    discount_amount NUMERIC(10,2) DEFAULT 0.00,
    total_price NUMERIC(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'active', 'completed', 'cancelled')),
    payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'authorized', 'paid', 'refunded')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. BOOKING STATUS
CREATE TABLE IF NOT EXISTS public.booking_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. PAYMENTS
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'EUR',
    provider TEXT NOT NULL DEFAULT 'Stripe',
    status TEXT NOT NULL DEFAULT 'succeeded',
    transaction_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. CUSTOMERS
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    vip_tier TEXT DEFAULT 'Gold' CHECK (vip_tier IN ('Silver', 'Gold', 'Platinum', 'Black Card')),
    total_rentals INTEGER DEFAULT 0,
    total_spent NUMERIC(10,2) DEFAULT 0.00,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    author_avatar TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. FAVORITES
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, car_id)
);

-- 16. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. MAINTENANCE
CREATE TABLE IF NOT EXISTS public.maintenance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
    service_type TEXT NOT NULL,
    cost NUMERIC(10,2) DEFAULT 0.00,
    scheduled_date DATE NOT NULL,
    completion_date DATE,
    status TEXT DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'In Progress', 'Completed')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 18. DRIVERS
CREATE TABLE IF NOT EXISTS public.drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    photo_url TEXT,
    languages TEXT[] DEFAULT ARRAY['English', 'French'],
    experience_years INTEGER DEFAULT 5,
    status TEXT DEFAULT 'Available' CHECK (status IN ('Available', 'On Assignment', 'Off Duty')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 19. COUPONS
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    discount_percent NUMERIC(5,2) CHECK (discount_percent > 0 AND discount_percent <= 100),
    discount_flat NUMERIC(10,2),
    valid_until TIMESTAMPTZ NOT NULL,
    max_uses INTEGER DEFAULT 100,
    used_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 20. PROMO CODES
CREATE TABLE IF NOT EXISTS public.promo_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    coupon_id UUID REFERENCES public.coupons(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    used_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. MEDIA
CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video', 'document')),
    file_size_bytes BIGINT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 22. SETTINGS
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 23. ANALYTICS
CREATE TABLE IF NOT EXISTS public.analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_date DATE NOT NULL UNIQUE,
    daily_revenue NUMERIC(10,2) DEFAULT 0.00,
    total_bookings INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- UPDATED AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_cars_updated_at ON public.cars;
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON public.cars FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON public.bookings;
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
DROP POLICY IF EXISTS "Public brands readable" ON public.brands;
CREATE POLICY "Public brands readable" ON public.brands FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public categories readable" ON public.categories;
CREATE POLICY "Public categories readable" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public cars readable" ON public.cars;
CREATE POLICY "Public cars readable" ON public.cars FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public vehicle images readable" ON public.vehicle_images;
CREATE POLICY "Public vehicle images readable" ON public.vehicle_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public vehicle features readable" ON public.vehicle_features;
CREATE POLICY "Public vehicle features readable" ON public.vehicle_features FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public availability readable" ON public.availability;
CREATE POLICY "Public availability readable" ON public.availability FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public reviews readable" ON public.reviews;
CREATE POLICY "Public reviews readable" ON public.reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public locations readable" ON public.locations;
CREATE POLICY "Public locations readable" ON public.locations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public services readable" ON public.services;
CREATE POLICY "Public services readable" ON public.services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public settings readable" ON public.settings;
CREATE POLICY "Public settings readable" ON public.settings FOR SELECT USING (true);

-- USER RESTRICTED POLICIES
DROP POLICY IF EXISTS "Users view own profile" ON public.profiles;
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users view own bookings" ON public.bookings;
CREATE POLICY "Users view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "Users insert bookings" ON public.bookings;
CREATE POLICY "Users insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users manage own favorites" ON public.favorites;
CREATE POLICY "Users manage own favorites" ON public.favorites FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own notifications" ON public.notifications;
CREATE POLICY "Users view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);

-- STORAGE BUCKETS SETUP
INSERT INTO storage.buckets (id, name, public) VALUES ('vehicle-images', 'vehicle-images', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('brand-logos', 'brand-logos', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('user-avatars', 'user-avatars', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT (id) DO NOTHING;

-- SEED DATA: BRANDS
INSERT INTO public.brands (id, name, slug, country, description, logo_url) VALUES
('11111111-1111-1111-1111-111111111111', 'Porsche', 'porsche', 'Germany', 'Driven by dreams. Stuttgart engineering perfected.', 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=400&q=80'),
('22222222-2222-2222-2222-222222222222', 'Ferrari', 'ferrari', 'Italy', 'Pure Italian passion and racing pedigree from Maranello.', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=400&q=80'),
('33333333-3333-3333-3333-333333333333', 'Rolls-Royce', 'rolls-royce', 'United Kingdom', 'The pinnacle of luxury automobile craftsmanship.', 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=400&q=80'),
('44444444-4444-4444-4444-444444444444', 'Lamborghini', 'lamborghini', 'Italy', 'Uncompromising supercar performance and sharp design.', 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=400&q=80'),
('55555555-5555-5555-5555-555555555555', 'Bentley', 'bentley', 'United Kingdom', 'Luxurious grand touring refined over a century.', 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=400&q=80'),
('66666666-6666-6666-6666-666666666666', 'Mercedes-Maybach', 'mercedes-maybach', 'Germany', 'Unrivaled comfort and state-of-the-art luxury.', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=400&q=80')
ON CONFLICT (id) DO NOTHING;

-- SEED DATA: CATEGORIES
INSERT INTO public.categories (id, name, slug, description, image_url) VALUES
('a1111111-1111-1111-1111-111111111111', 'Sports', 'sports', 'High-speed aerodynamics and precision track engineering.', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'),
('b2222222-2222-2222-2222-222222222222', 'Luxury', 'luxury', 'Ultra-refined executive sedans and limousines.', 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80'),
('c3333333-3333-3333-3333-333333333333', 'SUV', 'suv', 'Commanding presence, all-terrain luxury performance.', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'),
('d4444444-4444-4444-4444-444444444444', 'Electric', 'electric', 'Silent instantaneous electric hypercar acceleration.', 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80'),
('e5555555-5555-5555-5555-555555555555', 'Wedding', 'wedding', 'Timeless elegance and glamour for special occasions.', 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80'),
('f6666666-6666-6666-6666-666666666666', 'Convertible', 'convertible', 'Open-top exhilaration under the sun.', 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80')
ON CONFLICT (id) DO NOTHING;

-- SEED DATA: LOCATIONS
INSERT INTO public.locations (name, city, country, address, is_airport) VALUES
('Monaco VIP Heliport Hub', 'Monaco', 'Monaco', 'Avenue des Ligures, 98000 Monaco', false),
('Dubai International Airport (DXB VIP Terminal)', 'Dubai', 'UAE', 'Al Maktoum Airport St, Dubai', true),
('Paris Charles de Gaulle VIP Lounge', 'Paris', 'France', '95700 Roissy-en-France', true),
('Los Angeles Int Private Jet Center', 'Los Angeles', 'USA', 'World Way, Los Angeles, CA 90045', true),
('Zurich Luxury Hub & Airport', 'Zurich', 'Switzerland', '8058 Zürich-Flughafen', true)
ON CONFLICT (name) DO NOTHING;

-- SEED DATA: SERVICES
INSERT INTO public.services (title, slug, description, price_per_day, is_included) VALUES
('Airport VIP Chauffeur Delivery', 'airport-delivery', 'Direct tarmac or terminal delivery upon private jet landing.', 250.00, false),
('Personal Executive Chauffeur', 'chauffeur-service', 'Multilingual licensed chauffeur trained in executive security.', 600.00, false),
('24/7 VIP Concierge Access', 'vip-concierge', 'Dedicated luxury lifestyle manager for hotel & dining bookings.', 0.00, true),
('Full Zero-Excess Protection', 'zero-excess-insurance', 'Comprehensive coverage with zero security deposit liability.', 350.00, false)
ON CONFLICT (title) DO NOTHING;

-- SEED DATA: CARS
INSERT INTO public.cars (id, title, slug, brand_id, category_id, year, daily_rate, security_deposit, transmission, fuel_type, seats, acceleration, top_speed, horsepower, engine, location, description, is_featured, is_available, featured_image) VALUES
('c0000001-0000-0000-0000-000000000001', 'Porsche 911 GT3 RS', 'porsche-911-gt3-rs', '11111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 2024, 2400.00, 5000.00, 'Dual-Clutch', 'Gasoline', 2, '3.2s 0-100 km/h', '296 km/h', 525, '4.0L Naturally Aspirated Boxer-6', 'Monaco', 'The ultimate road-legal track weapon. Lightweight carbon fiber construction with active drag reduction aerodynamic wing.', true, true, 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=80'),
('c0000002-0000-0000-0000-000000000002', 'Ferrari SF90 Stradale', 'ferrari-sf90-stradale', '22222222-2222-2222-2222-222222222222', 'a1111111-1111-1111-1111-111111111111', 2024, 3800.00, 8000.00, 'Dual-Clutch', 'Hybrid', 2, '2.5s 0-100 km/h', '340 km/h', 1000, '4.0L Twin-Turbo V8 + 3 Electric Motors', 'Dubai', 'Ferrari''s flagship plug-in hybrid hypercar delivering 1,000 horsepower of relentless all-wheel drive acceleration.', true, true, 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1600&q=80'),
('c0000003-0000-0000-0000-000000000003', 'Rolls-Royce Phantom VIII', 'rolls-royce-phantom-viii', '33333333-3333-3333-3333-333333333333', 'b2222222-2222-2222-2222-222222222222', 2024, 4500.00, 10000.00, 'Automatic', 'V12', 4, '5.1s 0-100 km/h', '250 km/h', 563, '6.75L Twin-Turbo V12', 'Paris', 'The quietest automobile in the world. Starlight headliner, hand-finished lambswool carpets, and bespoke Gallery dashboard.', true, true, 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=80'),
('c0000004-0000-0000-0000-000000000004', 'Lamborghini Revuelto', 'lamborghini-revuelto', '44444444-4444-4444-4444-444444444444', 'a1111111-1111-1111-1111-111111111111', 2025, 4200.00, 9000.00, 'Dual-Clutch', 'Hybrid', 2, '2.5s 0-100 km/h', '350 km/h', 1015, '6.5L Naturally Aspirated V12 + Hybrid', 'Monaco', 'Lamborghini''s inaugural V12 HPEV hybrid supercar. Y-shaped signature lighting with futuristic aeronautical cockpit.', true, true, 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=80'),
('c0000005-0000-0000-0000-000000000005', 'Bentley Continental GT Speed', 'bentley-continental-gt-speed', '55555555-5555-5555-5555-555555555555', 'b2222222-2222-2222-2222-222222222222', 2024, 2800.00, 6000.00, 'Automatic', 'Twin-Turbo V8', 4, '3.5s 0-100 km/h', '335 km/h', 650, '6.0L Twin-Turbo W12 Engine', 'Zurich', 'Peerless luxury grand touring. Rotating display, diamond-in-diamond leather quilting, and electronic all-wheel steering.', true, true, 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1600&q=80'),
('c0000006-0000-0000-0000-000000000006', 'Mercedes-Maybach S 680', 'mercedes-maybach-s-680', '66666666-6666-6666-6666-666666666666', 'b2222222-2222-2222-2222-222222222222', 2024, 3200.00, 7000.00, 'Automatic', 'V12', 4, '4.5s 0-100 km/h', '250 km/h', 621, '6.0L Biturbo V12', 'Los Angeles', 'First-Class rear suite with calf massage, champagne cooler with silver flutes, and Burmester 4D Surround Sound.', true, true, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=80')
ON CONFLICT (id) DO NOTHING;

-- SEED DATA: VEHICLE IMAGES
INSERT INTO public.vehicle_images (car_id, url, display_order, is_primary) VALUES
('c0000001-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=80', 1, true),
('c0000001-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80', 2, false),
('c0000002-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1600&q=80', 1, true),
('c0000003-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=80', 1, true)
ON CONFLICT (id) DO NOTHING;

-- SEED DATA: VEHICLE FEATURES
INSERT INTO public.vehicle_features (car_id, feature_name, category) VALUES
('c0000001-0000-0000-0000-000000000001', 'Active Drag Reduction System (DRS)', 'Performance'),
('c0000001-0000-0000-0000-000000000001', 'PCCB Carbon Ceramic Brakes', 'Safety'),
('c0000001-0000-0000-0000-000000000001', 'Weissach Package Lightweight Bucket Seats', 'Interior'),
('c0000003-0000-0000-0000-000000000003', 'Starlight Headliner with Shooting Stars', 'Luxury'),
('c0000003-0000-0000-0000-000000000003', 'Refrigerated Champagne Cooler', 'Comfort'),
('c0000003-0000-0000-0000-000000000003', 'Bespoke Audio System (1300W)', 'Entertainment')
ON CONFLICT (id) DO NOTHING;

-- SEED DATA: REVIEWS
INSERT INTO public.reviews (car_id, author_name, rating, comment, is_verified) VALUES
('c0000001-0000-0000-0000-000000000001', 'Lord Alistair Sterling', 5, 'Exceptional vehicle delivery in Monaco. The 911 GT3 RS arrived immaculately prepped. The handling on Col de Turini was unforgettable.', true),
('c0000003-0000-0000-0000-000000000003', 'H.E. Sheikh Mansoor', 5, 'Unmatched Rolls-Royce VIP service. The tarmac airport transfer in Paris was completely seamless. Highly recommended.', true),
('c0000002-0000-0000-0000-000000000002', 'Elena Rostova', 5, 'The SF90 Stradale is pure adrenaline. KarLuxe handles luxury rentals at an elite standard.', true)
ON CONFLICT (id) DO NOTHING;

-- SEED DATA: SETTINGS
INSERT INTO public.settings (key, value, description) VALUES
('site_config', '{"site_name": "KarLuxe", "currency": "EUR", "currency_symbol": "€", "contact_phone": "+377 98 00 11 22", "support_email": "concierge@karluxe.com"}'::jsonb, 'Global site configuration')
ON CONFLICT (key) DO NOTHING;
