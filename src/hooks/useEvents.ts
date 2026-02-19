import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string | null;
  location: string | null;
  image_url: string | null;
  is_upcoming: boolean;
  ashram_id: string | null;
  created_at: string;
}

export function useEvents(upcoming?: boolean, ashramId?: string | null) {
  return useQuery({
    queryKey: ['events', upcoming, ashramId],
    queryFn: async () => {
      let query = supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });
      
      if (upcoming !== undefined) {
        query = query.eq('is_upcoming', upcoming);
      }
      if (ashramId) {
        query = query.eq('ashram_id', ashramId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Event[];
    }
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (event: Omit<Event, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('events')
        .insert(event)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });
}
