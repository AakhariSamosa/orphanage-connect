import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type NeedCategory = Database['public']['Enums']['need_category'];
type NeedUrgency = Database['public']['Enums']['need_urgency'];

export interface ChildrenNeed {
  id: string;
  title: string;
  description: string | null;
  category: NeedCategory;
  urgency: NeedUrgency;
  quantity_needed: number;
  quantity_fulfilled: number;
  estimated_cost: number | null;
  image_url: string | null;
  is_active: boolean;
  ashram_id: string | null;
  created_at: string;
}

export function useNeeds(category?: NeedCategory, ashramId?: string | null) {
  return useQuery({
    queryKey: ['needs', category, ashramId],
    queryFn: async () => {
      let query = supabase
        .from('children_needs')
        .select('*')
        .eq('is_active', true)
        .order('urgency', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (category) {
        query = query.eq('category', category);
      }
      if (ashramId) {
        query = query.eq('ashram_id', ashramId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as ChildrenNeed[];
    }
  });
}

export function useCreateNeed() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (need: Omit<ChildrenNeed, 'id' | 'created_at' | 'quantity_fulfilled'>) => {
      const { data, error } = await supabase
        .from('children_needs')
        .insert(need)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['needs'] });
    }
  });
}

export function useUpdateNeed() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ChildrenNeed> & { id: string }) => {
      const { data, error } = await supabase
        .from('children_needs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['needs'] });
    }
  });
}
