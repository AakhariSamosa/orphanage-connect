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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      children_needs: {
        Row: {
          category: Database["public"]["Enums"]["need_category"]
          created_at: string
          created_by: string | null
          description: string | null
          estimated_cost: number | null
          id: string
          image_url: string | null
          is_active: boolean
          quantity_fulfilled: number
          quantity_needed: number
          title: string
          updated_at: string
          urgency: Database["public"]["Enums"]["need_urgency"]
        }
        Insert: {
          category: Database["public"]["Enums"]["need_category"]
          created_at?: string
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          quantity_fulfilled?: number
          quantity_needed?: number
          title: string
          updated_at?: string
          urgency?: Database["public"]["Enums"]["need_urgency"]
        }
        Update: {
          category?: Database["public"]["Enums"]["need_category"]
          created_at?: string
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          quantity_fulfilled?: number
          quantity_needed?: number
          title?: string
          updated_at?: string
          urgency?: Database["public"]["Enums"]["need_urgency"]
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          inquiry_type: string
          is_read: boolean
          message: string
          name: string
          phone: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          inquiry_type: string
          is_read?: boolean
          message: string
          name: string
          phone?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          inquiry_type?: string
          is_read?: boolean
          message?: string
          name?: string
          phone?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          donation_type: string
          donor_email: string | null
          donor_id: string | null
          donor_name: string | null
          donor_phone: string | null
          id: string
          is_anonymous: boolean
          is_recurring: boolean
          message: string | null
          need_id: string | null
          payment_method: string | null
          payment_status: string
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          donation_type?: string
          donor_email?: string | null
          donor_id?: string | null
          donor_name?: string | null
          donor_phone?: string | null
          id?: string
          is_anonymous?: boolean
          is_recurring?: boolean
          message?: string | null
          need_id?: string | null
          payment_method?: string | null
          payment_status?: string
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          donation_type?: string
          donor_email?: string | null
          donor_id?: string | null
          donor_name?: string | null
          donor_phone?: string | null
          id?: string
          is_anonymous?: boolean
          is_recurring?: boolean
          message?: string | null
          need_id?: string | null
          payment_method?: string | null
          payment_status?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "children_needs"
            referencedColumns: ["id"]
          },
        ]
      }
      donor_visits: {
        Row: {
          id: string
          donor_id: string | null
          donor_name: string
          donor_email: string
          donor_phone: string | null
          visit_date: string
          time_slot: string
          need_id: string | null
          message: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          donor_id?: string | null
          donor_name: string
          donor_email: string
          donor_phone?: string | null
          visit_date: string
          time_slot: string
          need_id?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          donor_id?: string | null
          donor_name?: string
          donor_email?: string
          donor_phone?: string | null
          visit_date?: string
          time_slot?: string
          need_id?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "donor_visits_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "children_needs"
            referencedColumns: ["id"]
          }
        ]
      }
      item_donations: {
        Row: {
          id: string
          donor_id: string | null
          donor_name: string
          donor_email: string
          donor_phone: string | null
          items_description: string
          delivery_note: string | null
          need_id: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          donor_id?: string | null
          donor_name: string
          donor_email: string
          donor_phone?: string | null
          items_description: string
          delivery_note?: string | null
          need_id?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          donor_id?: string | null
          donor_name?: string
          donor_email?: string
          donor_phone?: string | null
          items_description?: string
          delivery_note?: string | null
          need_id?: string | null
          status?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "item_donations_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "children_needs"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          event_date: string | null
          id: string
          image_url: string | null
          is_upcoming: boolean
          location: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date?: string | null
          id?: string
          image_url?: string | null
          is_upcoming?: boolean
          location?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date?: string | null
          id?: string
          image_url?: string | null
          is_upcoming?: boolean
          location?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      feed_posts: {
        Row: {
          comments_count: number
          content: string | null
          created_at: string
          created_by: string | null
          id: string
          likes_count: number
          media_type: string | null
          media_url: string | null
          title: string | null
        }
        Insert: {
          comments_count?: number
          content?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          likes_count?: number
          media_type?: string | null
          media_url?: string | null
          title?: string | null
        }
        Update: {
          comments_count?: number
          content?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          likes_count?: number
          media_type?: string | null
          media_url?: string | null
          title?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          buyer_id: string | null
          buyer_phone: string | null
          charity_amount: number
          created_at: string
          id: string
          product_id: string
          quantity: number
          shipping_address: string | null
          status: string
          total_amount: number
          updated_at: string
          vendor_id: string
        }
        Insert: {
          buyer_id?: string | null
          buyer_phone?: string | null
          charity_amount: number
          created_at?: string
          id?: string
          product_id: string
          quantity?: number
          shipping_address?: string | null
          status?: string
          total_amount: number
          updated_at?: string
          vendor_id: string
        }
        Update: {
          buyer_id?: string | null
          buyer_phone?: string | null
          charity_amount?: number
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          shipping_address?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "feed_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "feed_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean
          name: string
          price: number
          updated_at: string
          vendor_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean
          name: string
          price: number
          updated_at?: string
          vendor_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean
          name?: string
          price?: number
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vendors: {
        Row: {
          address: string | null
          business_name: string
          category: Database["public"]["Enums"]["vendor_category"]
          charity_percentage: number
          cover_image_url: string | null
          created_at: string
          description: string | null
          email: string | null
          id: string
          is_active: boolean
          is_verified: boolean
          logo_url: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          business_name: string
          category: Database["public"]["Enums"]["vendor_category"]
          charity_percentage?: number
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean
          is_verified?: boolean
          logo_url?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          business_name?: string
          category?: Database["public"]["Enums"]["vendor_category"]
          charity_percentage?: number
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean
          is_verified?: boolean
          logo_url?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decrement_likes: { Args: { post_id: string }; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_comments: { Args: { post_id: string }; Returns: undefined }
      increment_likes: { Args: { post_id: string }; Returns: undefined }
      is_admin_or_subadmin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "sub_admin" | "user"
      need_category:
        | "food"
        | "clothing"
        | "education"
        | "healthcare"
        | "daily_essentials"
        | "other"
      need_urgency: "low" | "medium" | "high" | "critical"
      vendor_category:
        | "cloud_kitchen"
        | "handicrafts"
        | "homemade"
        | "services"
        | "other"
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
    Enums: {
      app_role: ["admin", "sub_admin", "user"],
      need_category: [
        "food",
        "clothing",
        "education",
        "healthcare",
        "daily_essentials",
        "other",
      ],
      need_urgency: ["low", "medium", "high", "critical"],
      vendor_category: [
        "cloud_kitchen",
        "handicrafts",
        "homemade",
        "services",
        "other",
      ],
    },
  },
} as const
