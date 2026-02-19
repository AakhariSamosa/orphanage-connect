import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Donation {
  id: string;
  donor_id: string | null;
  donor_name: string | null;
  donor_email: string | null;
  donor_phone: string | null;
  amount: number;
  donation_type: string;
  need_id: string | null;
  payment_method: string | null;
  payment_status: string;
  transaction_id: string | null;
  is_anonymous: boolean;
  is_recurring: boolean;
  message: string | null;
  ashram_id: string | null;
  created_at: string;
}

export interface CreateDonationInput {
  donor_name: string;
  donor_email: string;
  donor_phone?: string;
  amount: number;
  donation_type?: string;
  need_id?: string;
  payment_method?: string;
  is_anonymous?: boolean;
  is_recurring?: boolean;
  message?: string;
  ashram_id?: string;
}

export function useMyDonations() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['donations', 'my', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('donor_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Donation[];
    },
    enabled: !!user
  });
}

export function useCreateDonation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (input: CreateDonationInput) => {
      const { data, error } = await supabase
        .from('donations')
        .insert({
          ...input,
          donor_id: user?.id || null,
          payment_status: 'pending'
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donations'] });
    }
  });
}
