import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Ashram {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  logo_url: string | null;
  cover_image_url: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  accent_color: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AshramAdmin {
  id: string;
  ashram_id: string;
  user_id: string;
  role: string;
  created_at: string;
}

export function useAshrams() {
  return useQuery({
    queryKey: ['ashrams'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ashrams')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data as Ashram[];
    }
  });
}

export function useAshramBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ['ashrams', slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from('ashrams')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();
      
      if (error) throw error;
      return data as Ashram | null;
    },
    enabled: !!slug
  });
}

export function useAllAshrams() {
  return useQuery({
    queryKey: ['ashrams', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ashrams')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Ashram[];
    }
  });
}

export function useCreateAshram() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (ashram: Omit<Ashram, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('ashrams')
        .insert(ashram)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ashrams'] });
    }
  });
}

export function useUpdateAshram() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Ashram> & { id: string }) => {
      const { data, error } = await supabase
        .from('ashrams')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ashrams'] });
    }
  });
}

export function useAshramAdmins(ashramId: string | undefined) {
  return useQuery({
    queryKey: ['ashram_admins', ashramId],
    queryFn: async () => {
      if (!ashramId) return [];
      const { data, error } = await supabase
        .from('ashram_admins')
        .select('*')
        .eq('ashram_id', ashramId);
      
      if (error) throw error;
      return data as AshramAdmin[];
    },
    enabled: !!ashramId
  });
}

export function useAddAshramAdmin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: { ashram_id: string; user_id: string; role: string }) => {
      const { data, error } = await supabase
        .from('ashram_admins')
        .insert(input)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ashram_admins'] });
    }
  });
}

export function useRemoveAshramAdmin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('ashram_admins')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ashram_admins'] });
    }
  });
}
