
-- Create ashrams table
CREATE TABLE public.ashrams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  primary_color TEXT DEFAULT '#E8710A',
  secondary_color TEXT,
  accent_color TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ashrams ENABLE ROW LEVEL SECURITY;

-- Anyone can view active ashrams
CREATE POLICY "Anyone can view active ashrams"
  ON public.ashrams FOR SELECT
  USING (is_active = true);

-- Only super admins can manage ashrams
CREATE POLICY "Super admins can manage ashrams"
  ON public.ashrams FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Create ashram_admins junction table (link admins to ashrams)
CREATE TABLE public.ashram_admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ashram_id UUID NOT NULL REFERENCES public.ashrams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'sub_admin')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(ashram_id, user_id)
);

ALTER TABLE public.ashram_admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ashram admins"
  ON public.ashram_admins FOR SELECT
  USING (true);

CREATE POLICY "Super admins can manage ashram admins"
  ON public.ashram_admins FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Add ashram_id to children_needs
ALTER TABLE public.children_needs ADD COLUMN ashram_id UUID REFERENCES public.ashrams(id) ON DELETE CASCADE;

-- Add ashram_id to events
ALTER TABLE public.events ADD COLUMN ashram_id UUID REFERENCES public.ashrams(id) ON DELETE CASCADE;

-- Add ashram_id to donations
ALTER TABLE public.donations ADD COLUMN ashram_id UUID REFERENCES public.ashrams(id) ON DELETE CASCADE;

-- Add ashram_id to vendors
ALTER TABLE public.vendors ADD COLUMN ashram_id UUID REFERENCES public.ashrams(id) ON DELETE CASCADE;

-- Add ashram_id to feed_posts
ALTER TABLE public.feed_posts ADD COLUMN ashram_id UUID REFERENCES public.ashrams(id) ON DELETE CASCADE;

-- Add ashram_id to contact_messages
ALTER TABLE public.contact_messages ADD COLUMN ashram_id UUID REFERENCES public.ashrams(id) ON DELETE CASCADE;

-- Create function to check if user is admin of a specific ashram
CREATE OR REPLACE FUNCTION public.is_ashram_admin(_user_id UUID, _ashram_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.ashram_admins
    WHERE user_id = _user_id AND ashram_id = _ashram_id
  ) OR EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = 'admin'
  )
$$;

-- Add indexes
CREATE INDEX idx_children_needs_ashram ON public.children_needs(ashram_id);
CREATE INDEX idx_events_ashram ON public.events(ashram_id);
CREATE INDEX idx_donations_ashram ON public.donations(ashram_id);
CREATE INDEX idx_vendors_ashram ON public.vendors(ashram_id);
CREATE INDEX idx_feed_posts_ashram ON public.feed_posts(ashram_id);
CREATE INDEX idx_contact_messages_ashram ON public.contact_messages(ashram_id);
CREATE INDEX idx_ashram_admins_ashram ON public.ashram_admins(ashram_id);
CREATE INDEX idx_ashram_admins_user ON public.ashram_admins(user_id);
CREATE INDEX idx_ashrams_slug ON public.ashrams(slug);

-- Add trigger for updated_at on ashrams
CREATE TRIGGER update_ashrams_updated_at
  BEFORE UPDATE ON public.ashrams
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the existing ashram as the first one
INSERT INTO public.ashrams (name, slug, description, city, state, logo_url)
VALUES (
  'Shri Shradhanand Anathalay',
  'shradhanand',
  'A home for orphaned children in Nagpur, providing love, care, education and a bright future.',
  'Nagpur',
  'Maharashtra',
  '/logo.png'
);
