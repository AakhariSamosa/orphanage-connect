
CREATE TABLE public.donor_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_id UUID NULL,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  donor_phone TEXT NULL,
  visit_date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  need_id UUID NULL,
  message TEXT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.donor_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create visits" ON public.donor_visits FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view their own visits" ON public.donor_visits FOR SELECT USING (donor_id = auth.uid());
CREATE POLICY "Admins can view all visits" ON public.donor_visits FOR SELECT USING (is_admin_or_subadmin(auth.uid()));
