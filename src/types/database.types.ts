export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      analytics: {
        Row: {
          created_at: string
          daily_revenue: number | null
          id: string
          metric_date: string
          total_bookings: number | null
          unique_visitors: number | null
        }
        Insert: {
          created_at?: string
          daily_revenue?: number | null
          id?: string
          metric_date: string
          total_bookings?: number | null
          unique_visitors?: number | null
        }
        Update: {
          created_at?: string
          daily_revenue?: number | null
          id?: string
          metric_date?: string
          total_bookings?: number | null
          unique_visitors?: number | null
        }
        Relationships: []
      }
      availability: {
        Row: {
          car_id: string
          created_at: string
          end_date: string
          id: string
          reason: string | null
          start_date: string
        }
        Insert: {
          car_id: string
          created_at?: string
          end_date: string
          id?: string
          reason?: string | null
          start_date: string
        }
        Update: {
          car_id?: string
          created_at?: string
          end_date?: string
          id?: string
          reason?: string | null
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_status: {
        Row: {
          booking_id: string
          created_at: string
          id: string
          notes: string | null
          status: string
        }
        Insert: {
          booking_id: string
          created_at?: string
          id?: string
          notes?: string | null
          status: string
        }
        Update: {
          booking_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_status_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_code: string
          car_id: string
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string
          discount_amount: number | null
          dropoff_date: string
          dropoff_location: string
          extras: Json | null
          id: string
          insurance_tier: string
          payment_status: string
          pickup_date: string
          pickup_location: string
          status: string
          subtotal: number
          tax_amount: number
          total_price: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          booking_code: string
          car_id: string
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone: string
          discount_amount?: number | null
          dropoff_date: string
          dropoff_location: string
          extras?: Json | null
          id?: string
          insurance_tier?: string
          payment_status?: string
          pickup_date: string
          pickup_location: string
          status?: string
          subtotal: number
          tax_amount?: number
          total_price: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          booking_code?: string
          car_id?: string
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          discount_amount?: number | null
          dropoff_date?: string
          dropoff_location?: string
          extras?: Json | null
          id?: string
          insurance_tier?: string
          payment_status?: string
          pickup_date?: string
          pickup_location?: string
          status?: string
          subtotal?: number
          tax_amount?: number
          total_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      brands: {
        Row: {
          country: string | null
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          name: string
          slug: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          slug: string
        }
        Update: {
          country?: string | null
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      cars: {
        Row: {
          acceleration: string
          brand_id: string | null
          category_id: string | null
          created_at: string
          daily_rate: number
          description: string
          engine: string
          featured_image: string
          fuel_type: string
          horsepower: number
          id: string
          is_available: boolean | null
          is_featured: boolean | null
          location: string
          seats: number
          security_deposit: number
          slug: string
          title: string
          top_speed: string
          transmission: string
          updated_at: string
          weekly_rate: number | null
          year: number
          agent_name: string | null
        }
        Insert: {
          acceleration: string
          brand_id?: string | null
          category_id?: string | null
          created_at?: string
          daily_rate: number
          description: string
          engine: string
          featured_image: string
          fuel_type?: string
          horsepower: number
          id?: string
          is_available?: boolean | null
          is_featured?: boolean | null
          location?: string
          seats?: number
          security_deposit?: number
          slug: string
          title: string
          top_speed: string
          transmission?: string
          updated_at?: string
          weekly_rate?: number | null
          year: number
          agent_name?: string | null
        }
        Update: {
          acceleration?: string
          brand_id?: string | null
          category_id?: string | null
          created_at?: string
          daily_rate?: number
          description?: string
          engine?: string
          featured_image?: string
          fuel_type?: string
          horsepower?: number
          id?: string
          is_available?: boolean | null
          is_featured?: boolean | null
          location?: string
          seats?: number
          security_deposit?: number
          slug?: string
          title?: string
          top_speed?: string
          transmission?: string
          updated_at?: string
          weekly_rate?: number | null
          year?: number
          agent_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cars_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cars_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          discount_flat: number | null
          discount_percent: number | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          used_count: number | null
          valid_until: string
        }
        Insert: {
          code: string
          created_at?: string
          discount_flat?: number | null
          discount_percent?: number | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          used_count?: number | null
          valid_until: string
        }
        Update: {
          code?: string
          created_at?: string
          discount_flat?: number | null
          discount_percent?: number | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          used_count?: number | null
          valid_until?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          total_rentals: number | null
          total_spent: number | null
          user_id: string | null
          vip_tier: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          total_rentals?: number | null
          total_spent?: number | null
          user_id?: string | null
          vip_tier?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          total_rentals?: number | null
          total_spent?: number | null
          user_id?: string | null
          vip_tier?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          created_at: string
          experience_years: number | null
          id: string
          languages: string[] | null
          name: string
          phone: string
          photo_url: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          experience_years?: number | null
          id?: string
          languages?: string[] | null
          name: string
          phone: string
          photo_url?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          experience_years?: number | null
          id?: string
          languages?: string[] | null
          name?: string
          phone?: string
          photo_url?: string | null
          status?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          created_at: string
          id: string
          question: string
          sort_order: number | null
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          question: string
          sort_order?: number | null
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          car_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          car_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          car_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string
          city: string
          country: string
          created_at: string
          id: string
          is_airport: boolean | null
          name: string
        }
        Insert: {
          address: string
          city: string
          country: string
          created_at?: string
          id?: string
          is_airport?: boolean | null
          name: string
        }
        Update: {
          address?: string
          city?: string
          country?: string
          created_at?: string
          id?: string
          is_airport?: boolean | null
          name?: string
        }
        Relationships: []
      }
      maintenance: {
        Row: {
          car_id: string
          completion_date: string | null
          cost: number | null
          created_at: string
          id: string
          notes: string | null
          scheduled_date: string
          service_type: string
          status: string | null
        }
        Insert: {
          car_id: string
          completion_date?: string | null
          cost?: number | null
          created_at?: string
          id?: string
          notes?: string | null
          scheduled_date: string
          service_type: string
          status?: string | null
        }
        Update: {
          car_id?: string
          completion_date?: string | null
          cost?: number | null
          created_at?: string
          id?: string
          notes?: string | null
          scheduled_date?: string
          service_type?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_sections: {
        Row: {
          badge: string | null
          bullets: Json | null
          button_link: string | null
          button_text: string | null
          created_at: string
          description: string | null
          highlighted_title: string | null
          id: string
          image_url: string | null
          section_id: string
          title: string
        }
        Insert: {
          badge?: string | null
          bullets?: Json | null
          button_link?: string | null
          button_text?: string | null
          created_at?: string
          description?: string | null
          highlighted_title?: string | null
          id?: string
          image_url?: string | null
          section_id: string
          title: string
        }
        Update: {
          badge?: string | null
          bullets?: Json | null
          button_link?: string | null
          button_text?: string | null
          created_at?: string
          description?: string | null
          highlighted_title?: string | null
          id?: string
          image_url?: string | null
          section_id?: string
          title?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          created_at: string
          file_size_bytes: number | null
          file_url: string
          id: string
          media_type: string
          title: string
        }
        Insert: {
          created_at?: string
          file_size_bytes?: number | null
          file_url: string
          id?: string
          media_type: string
          title: string
        }
        Update: {
          created_at?: string
          file_size_bytes?: number | null
          file_url?: string
          id?: string
          media_type?: string
          title?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string
          currency: string
          id: string
          provider: string
          status: string
          transaction_id: string | null
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string
          currency?: string
          id?: string
          provider?: string
          status?: string
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string
          currency?: string
          id?: string
          provider?: string
          status?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          driver_license_number: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          driver_license_number?: string | null
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          driver_license_number?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          coupon_id: string | null
          id: string
          used_at: string | null
          user_id: string | null
        }
        Insert: {
          coupon_id?: string | null
          id?: string
          used_at?: string | null
          user_id?: string | null
        }
        Update: {
          coupon_id?: string | null
          id?: string
          used_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promo_codes_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promo_codes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          author_avatar: string | null
          author_name: string
          car_id: string
          comment: string
          created_at: string
          id: string
          is_verified: boolean | null
          rating: number
          user_id: string | null
        }
        Insert: {
          author_avatar?: string | null
          author_name: string
          car_id: string
          comment: string
          created_at?: string
          id?: string
          is_verified?: boolean | null
          rating: number
          user_id?: string | null
        }
        Update: {
          author_avatar?: string | null
          author_name?: string
          car_id?: string
          comment?: string
          created_at?: string
          id?: string
          is_verified?: boolean | null
          rating?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string
          description: string
          icon: string | null
          id: string
          is_included: boolean | null
          price_per_day: number | null
          slug: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          icon?: string | null
          id?: string
          is_included?: boolean | null
          price_per_day?: number | null
          slug: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string | null
          id?: string
          is_included?: boolean | null
          price_per_day?: number | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          description: string | null
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      site_stats: {
        Row: {
          created_at: string
          id: string
          label: string
          prefix: string | null
          sort_order: number | null
          suffix: string | null
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          prefix?: string | null
          sort_order?: number | null
          suffix?: string | null
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          prefix?: string | null
          sort_order?: number | null
          suffix?: string | null
          value?: number
        }
        Relationships: []
      }
      vehicle_features: {
        Row: {
          car_id: string
          category: string | null
          created_at: string
          feature_name: string
          id: string
        }
        Insert: {
          car_id: string
          category?: string | null
          created_at?: string
          feature_name: string
          id?: string
        }
        Update: {
          car_id?: string
          category?: string | null
          created_at?: string
          feature_name?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_features_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_images: {
        Row: {
          car_id: string
          created_at: string
          display_order: number | null
          id: string
          is_primary: boolean | null
          url: string
        }
        Insert: {
          car_id: string
          created_at?: string
          display_order?: number | null
          id?: string
          is_primary?: boolean | null
          url: string
        }
        Update: {
          car_id?: string
          created_at?: string
          display_order?: number | null
          id?: string
          is_primary?: boolean | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_images_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
