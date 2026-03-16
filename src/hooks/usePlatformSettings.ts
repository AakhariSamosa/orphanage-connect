import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PlatformSettings {
  platformLogo: string;
  platformName: string;
  textSizeScale: string;
  backgroundImageUrl: string;
  backgroundVideoUrl: string;
  backgroundOverlayOpacity: string;
}

const defaultSettings: PlatformSettings = {
  platformLogo: '/logo.png',
  platformName: 'Ashram Platform',
  textSizeScale: '100',
  backgroundImageUrl: '',
  backgroundVideoUrl: '',
  backgroundOverlayOpacity: '50',
};

async function fetchSettings(): Promise<PlatformSettings> {
  const { data, error } = await supabase
    .from('platform_settings')
    .select('key, value');

  if (error) {
    console.error('Failed to load platform settings:', error);
    return defaultSettings;
  }

  const settings = { ...defaultSettings };
  data?.forEach((row: { key: string; value: string }) => {
    if (row.key in settings) {
      (settings as Record<string, string>)[row.key] = row.value;
    }
  });
  return settings;
}

export function usePlatformSettings() {
  return useQuery({
    queryKey: ['platform-settings'],
    queryFn: fetchSettings,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
}

export function useUpdatePlatformSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: Partial<PlatformSettings>) => {
      const upserts = Object.entries(settings).map(([key, value]) => ({
        key,
        value: value as string,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from('platform_settings')
        .upsert(upserts, { onConflict: 'key' });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platform-settings'] });
    },
  });
}
