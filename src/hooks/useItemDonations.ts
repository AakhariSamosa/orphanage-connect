import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface ItemDonation {
  id: string;
  donor_id: string | null;
  donor_name: string;
  donor_email: string;
  donor_phone: string | null;
  items_description: string;
  delivery_note: string | null;
  need_id: string | null;
  status: string;
  created_at: string;
}

export interface CreateItemDonationInput {
  donor_name: string;
  donor_email: string;
  donor_phone?: string;
  items_description: string;
  delivery_note?: string;
  need_id?: string;
}

export function useCreateItemDonation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (input: CreateItemDonationInput) => {
      const { data, error } = await supabase
        .from('item_donations')
        .insert({
          ...input,
          donor_id: user?.id || null,
          status: 'pledged',
        })
        .select()
        .single();

      if (error) throw error;
      return data as ItemDonation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['item_donations'] });
    },
  });
}
