import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CreateContactMessageInput {
  name: string;
  email: string;
  phone?: string;
  inquiry_type: string;
  subject?: string;
  message: string;
  ashram_id?: string;
}

export function useCreateContactMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: CreateContactMessageInput) => {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert(input)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact_messages'] });
    }
  });
}
