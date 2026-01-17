import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Database } from '@/integrations/supabase/types';

type VendorCategory = Database['public']['Enums']['vendor_category'];

export interface Vendor {
  id: string;
  user_id: string;
  business_name: string;
  description: string | null;
  category: VendorCategory;
  logo_url: string | null;
  cover_image_url: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  charity_percentage: number;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  vendor_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  is_available: boolean;
  created_at: string;
  vendor?: Vendor;
}

export function useVendors(category?: VendorCategory) {
  return useQuery({
    queryKey: ['vendors', category],
    queryFn: async () => {
      let query = supabase
        .from('vendors')
        .select('*')
        .eq('is_active', true)
        .eq('is_verified', true)
        .order('created_at', { ascending: false });
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Vendor[];
    }
  });
}

export function useMyVendor() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['vendors', 'my', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Vendor | null;
    },
    enabled: !!user
  });
}

export function useProducts(vendorId?: string) {
  return useQuery({
    queryKey: ['products', vendorId],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*, vendor:vendors(*)')
        .eq('is_available', true)
        .order('created_at', { ascending: false });
      
      if (vendorId) {
        query = query.eq('vendor_id', vendorId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Product[];
    }
  });
}

export function useCreateVendor() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (vendor: Omit<Vendor, 'id' | 'user_id' | 'is_verified' | 'is_active' | 'created_at'>) => {
      if (!user) throw new Error('Must be logged in');
      
      const { data, error } = await supabase
        .from('vendors')
        .insert({
          ...vendor,
          user_id: user.id
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    }
  });
}
