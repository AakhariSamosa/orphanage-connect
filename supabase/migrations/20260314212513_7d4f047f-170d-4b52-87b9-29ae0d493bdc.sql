
ALTER TABLE public.ashrams 
ADD COLUMN IF NOT EXISTS selected_template text DEFAULT 'premium-dark',
ADD COLUMN IF NOT EXISTS template_data jsonb DEFAULT '{}'::jsonb;
