export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          role: 'customer' | 'admin' | 'vip'
          driver_license_number: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: 'customer' | 'admin' | 'vip'
          driver_license_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: 'customer' | 'admin' | 'vip'
          driver_license_number?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          country: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo_url?: string | null
          country?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          country?: string | null
          description?: string | null
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          image_url?: string | null
          created_at?: string
        }
      }
      cars: {
        Row: {
          id: string
          title: string
          slug: string
          brand_id: string | null
          category_id: string | null
          year: number
          daily_rate: number
          weekly_rate: number | null
          security_deposit: number
          transmission: 'Automatic' | 'Dual-Clutch' | 'Manual'
          fuel_type: 'Gasoline' | 'Hybrid' | 'Electric' | 'Twin-Turbo V8' | 'V12'
          seats: number
          acceleration: string
          top_speed: string
          horsepower: number
          engine: string
          location: string
          description: string
          is_featured: boolean
          is_available: boolean
          featured_image: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          brand_id?: string | null
          category_id?: string | null
          year: number
          daily_rate: number
          weekly_rate?: number | null
          security_deposit?: number
          transmission?: 'Automatic' | 'Dual-Clutch' | 'Manual'
          fuel_type?: 'Gasoline' | 'Hybrid' | 'Electric' | 'Twin-Turbo V8' | 'V12'
          seats?: number
          acceleration: string
          top_speed: string
          horsepower: number
          engine: string
          location?: string
          description: string
          is_featured?: boolean
          is_available?: boolean
          featured_image: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          brand_id?: string | null
          category_id?: string | null
          year?: number
          daily_rate?: number
          weekly_rate?: number | null
          security_deposit?: number
          transmission?: 'Automatic' | 'Dual-Clutch' | 'Manual'
          fuel_type?: 'Gasoline' | 'Hybrid' | 'Electric' | 'Twin-Turbo V8' | 'V12'
          seats?: number
          acceleration?: string
          top_speed?: string
          horsepower?: number
          engine?: string
          location?: string
          description?: string
          is_featured?: boolean
          is_available?: boolean
          featured_image?: string
          created_at?: string
          updated_at?: string
        }
      }
      vehicle_images: {
        Row: {
          id: string
          car_id: string
          url: string
          display_order: number
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          car_id: string
          url: string
          display_order?: number
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          car_id?: string
          url?: string
          display_order?: number
          is_primary?: boolean
          created_at?: string
        }
      }
      vehicle_features: {
        Row: {
          id: string
          car_id: string
          feature_name: string
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          car_id: string
          feature_name: string
          category?: string
          created_at?: string
        }
        Update: {
          id?: string
          car_id?: string
          feature_name?: string
          category?: string
          created_at?: string
        }
      }
      availability: {
        Row: {
          id: string
          car_id: string
          start_date: string
          end_date: string
          reason: string
          created_at: string
        }
        Insert: {
          id?: string
          car_id: string
          start_date: string
          end_date: string
          reason?: string
          created_at?: string
        }
        Update: {
          id?: string
          car_id?: string
          start_date?: string
          end_date?: string
          reason?: string
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          booking_code: string
          car_id: string
          user_id: string | null
          customer_name: string
          customer_email: string
          customer_phone: string
          pickup_date: string
          dropoff_date: string
          pickup_location: string
          dropoff_location: string
          insurance_tier: 'Standard' | 'Premium VIP' | 'Zero Excess Platinum'
          extras: Json
          subtotal: number
          tax_amount: number
          discount_amount: number
          total_price: number
          status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
          payment_status: 'unpaid' | 'authorized' | 'paid' | 'refunded'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_code: string
          car_id: string
          user_id?: string | null
          customer_name: string
          customer_email: string
          customer_phone: string
          pickup_date: string
          dropoff_date: string
          pickup_location: string
          dropoff_location: string
          insurance_tier?: 'Standard' | 'Premium VIP' | 'Zero Excess Platinum'
          extras?: Json
          subtotal: number
          tax_amount?: number
          discount_amount?: number
          total_price: number
          status?: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
          payment_status?: 'unpaid' | 'authorized' | 'paid' | 'refunded'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_code?: string
          car_id?: string
          user_id?: string | null
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          pickup_date?: string
          dropoff_date?: string
          pickup_location?: string
          dropoff_location?: string
          insurance_tier?: 'Standard' | 'Premium VIP' | 'Zero Excess Platinum'
          extras?: Json
          subtotal?: number
          tax_amount?: number
          discount_amount?: number
          total_price?: number
          status?: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
          payment_status?: 'unpaid' | 'authorized' | 'paid' | 'refunded'
          created_at?: string
          updated_at?: string
        }
      }
      booking_status: {
        Row: {
          id: string
          booking_id: string
          status: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          status: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          status?: string
          notes?: string | null
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          booking_id: string
          amount: number
          currency: string
          provider: string
          status: string
          transaction_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          amount: number
          currency?: string
          provider?: string
          status?: string
          transaction_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          amount?: number
          currency?: string
          provider?: string
          status?: string
          transaction_id?: string | null
          created_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          user_id: string | null
          vip_tier: 'Silver' | 'Gold' | 'Platinum' | 'Black Card'
          total_rentals: number
          total_spent: number
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          vip_tier?: 'Silver' | 'Gold' | 'Platinum' | 'Black Card'
          total_rentals?: number
          total_spent?: number
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          vip_tier?: 'Silver' | 'Gold' | 'Platinum' | 'Black Card'
          total_rentals?: number
          total_spent?: number
          notes?: string | null
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          car_id: string
          user_id: string | null
          author_name: string
          author_avatar: string | null
          rating: number
          comment: string
          is_verified: boolean
          created_at: string
        }
        Insert: {
          id?: string
          car_id: string
          user_id?: string | null
          author_name: string
          author_avatar?: string | null
          rating: number
          comment: string
          is_verified?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          car_id?: string
          user_id?: string | null
          author_name?: string
          author_avatar?: string | null
          rating?: number
          comment?: string
          is_verified?: boolean
          created_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          car_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          car_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          car_id?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string | null
          title: string
          message: string
          type: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          title: string
          message: string
          type?: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          title?: string
          message?: string
          type?: string
          is_read?: boolean
          created_at?: string
        }
      }
      maintenance: {
        Row: {
          id: string
          car_id: string
          service_type: string
          cost: number
          scheduled_date: string
          completion_date: string | null
          status: 'Scheduled' | 'In Progress' | 'Completed'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          car_id: string
          service_type: string
          cost?: number
          scheduled_date: string
          completion_date?: string | null
          status?: 'Scheduled' | 'In Progress' | 'Completed'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          car_id?: string
          service_type?: string
          cost?: number
          scheduled_date?: string
          completion_date?: string | null
          status?: 'Scheduled' | 'In Progress' | 'Completed'
          notes?: string | null
          created_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          name: string
          city: string
          country: string
          address: string
          is_airport: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          city: string
          country: string
          address: string
          is_airport?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          city?: string
          country?: string
          address?: string
          is_airport?: boolean
          created_at?: string
        }
      }
      drivers: {
        Row: {
          id: string
          name: string
          phone: string
          photo_url: string | null
          languages: string[]
          experience_years: number
          status: 'Available' | 'On Assignment' | 'Off Duty'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          photo_url?: string | null
          languages?: string[]
          experience_years?: number
          status?: 'Available' | 'On Assignment' | 'Off Duty'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          photo_url?: string | null
          languages?: string[]
          experience_years?: number
          status?: 'Available' | 'On Assignment' | 'Off Duty'
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          icon: string | null
          price_per_day: number
          is_included: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          icon?: string | null
          price_per_day?: number
          is_included?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          icon?: string | null
          price_per_day?: number
          is_included?: boolean
          created_at?: string
        }
      }
      coupons: {
        Row: {
          id: string
          code: string
          discount_percent: number | null
          discount_flat: number | null
          valid_until: string
          max_uses: number
          used_count: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          discount_percent?: number | null
          discount_flat?: number | null
          valid_until: string
          max_uses?: number
          used_count?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          discount_percent?: number | null
          discount_flat?: number | null
          valid_until?: string
          max_uses?: number
          used_count?: number
          is_active?: boolean
          created_at?: string
        }
      }
      promo_codes: {
        Row: {
          id: string
          coupon_id: string
          user_id: string
          used_at: string
        }
        Insert: {
          id?: string
          coupon_id: string
          user_id: string
          used_at?: string
        }
        Update: {
          id?: string
          coupon_id?: string
          user_id?: string
          used_at?: string
        }
      }
      media: {
        Row: {
          id: string
          title: string
          file_url: string
          media_type: 'image' | 'video' | 'document'
          file_size_bytes: number | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          file_url: string
          media_type: 'image' | 'video' | 'document'
          file_size_bytes?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          file_url?: string
          media_type?: 'image' | 'video' | 'document'
          file_size_bytes?: number | null
          created_at?: string
        }
      }
      settings: {
        Row: {
          id: string
          key: string
          value: Json
          description: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          description?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          description?: string | null
          updated_at?: string
        }
      }
      analytics: {
        Row: {
          id: string
          metric_date: string
          daily_revenue: number
          total_bookings: number
          unique_visitors: number
          created_at: string
        }
        Insert: {
          id?: string
          metric_date: string
          daily_revenue?: number
          total_bookings?: number
          unique_visitors?: number
          created_at?: string
        }
        Update: {
          id?: string
          metric_date?: string
          daily_revenue?: number
          total_bookings?: number
          unique_visitors?: number
          created_at?: string
        }
      }
    }
  }
}
