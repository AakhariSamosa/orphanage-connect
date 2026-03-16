
CREATE TABLE public.platform_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read platform settings (public branding)
CREATE POLICY "Anyone can read platform settings"
ON public.platform_settings FOR SELECT TO anon, authenticated
USING (true);

-- Only admins can modify
CREATE POLICY "Admins can manage platform settings"
ON public.platform_settings FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insert defaults
INSERT INTO public.platform_settings (key, value) VALUES
  ('platformLogo', '/logo.png'),
  ('platformName', 'Ashram Platform'),
  ('textSizeScale', '100'),
  ('backgroundImageUrl', ''),
  ('backgroundVideoUrl', ''),
  ('backgroundOverlayOpacity', '50')
ON CONFLICT (key) DO NOTHING;
