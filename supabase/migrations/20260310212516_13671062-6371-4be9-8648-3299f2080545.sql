
CREATE TABLE public.item_donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID NULL,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  donor_phone TEXT NULL,
  items_description TEXT NOT NULL,
  delivery_note TEXT NULL,
  need_id UUID NULL REFERENCES public.children_needs(id),
  status TEXT NOT NULL DEFAULT 'pledged',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.item_donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create item donations" ON public.item_donations
  FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view all item donations" ON public.item_donations
  FOR SELECT TO public
  USING (is_admin_or_subadmin(auth.uid()));

CREATE POLICY "Users can view their own item donations" ON public.item_donations
  FOR SELECT TO public
  USING (donor_id = auth.uid());
