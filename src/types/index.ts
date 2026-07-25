import { Database } from './database.types';

export type Car = Database['public']['Tables']['cars']['Row'];
export type Brand = Database['public']['Tables']['brands']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type VehicleImage = Database['public']['Tables']['vehicle_images']['Row'];
export type VehicleFeature = Database['public']['Tables']['vehicle_features']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type Booking = Database['public']['Tables']['bookings']['Row'];
export type Location = Database['public']['Tables']['locations']['Row'];
export type Service = Database['public']['Tables']['services']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Faq = Database['public']['Tables']['faqs']['Row'];
export type SiteStat = Database['public']['Tables']['site_stats']['Row'];
export type MarketingSection = Database['public']['Tables']['marketing_sections']['Row'];
export interface CarWithDetails extends Car {
  brands?: Brand | null;
  categories?: Category | null;
  vehicle_images?: VehicleImage[];
  vehicle_features?: VehicleFeature[];
  reviews?: Review[];
}

export interface FilterState {
  searchQuery: string;
  brandId: string | null;
  categoryId: string | null;
  minPrice: number;
  maxPrice: number;
  transmission: string | null;
  fuelType: string | null;
  seats: number | null;
  location: string | null;
  sortBy: 'price-asc' | 'price-desc' | 'popular' | 'newest';
}

export interface BookingFormState {
  currentStep: number;
  carId: string | null;
  selectedCar: CarWithDetails | null;
  pickupDate: string;
  dropoffDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  insuranceTier: 'Standard' | 'Premium VIP' | 'Zero Excess Platinum';
  selectedExtras: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: string;
}

export interface AdminOverviewStats {
  totalRevenue: number;
  totalBookings: number;
  activeRentals: number;
  totalFleet: number;
  occupancyRate: number;
}
