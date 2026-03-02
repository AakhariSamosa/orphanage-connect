import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface DonorVisit {
  id: string;
  donor_id: string | null;
  donor_name: string;
  donor_email: string;
  donor_phone: string | null;
  visit_date: string;
  time_slot: string;
  need_id: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export interface CreateDonorVisitInput {
  donor_name: string;
  donor_email: string;
  donor_phone?: string;
  visit_date: string;
  time_slot: string;
  need_id?: string;
  message?: string;
}

const TIME_SLOTS = [
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
];

export function getTimeSlots() {
  return TIME_SLOTS;
}

export function useCreateDonorVisit() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (input: CreateDonorVisitInput) => {
      const { data, error } = await supabase
        .from('donor_visits')
        .insert({
          ...input,
          donor_id: user?.id || null,
          status: 'confirmed',
        })
        .select()
        .single();

      if (error) throw error;
      return data as DonorVisit;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donor_visits'] });
    },
  });
}
