-- Donor visits: in-person visit slot bookings
CREATE TABLE public.donor_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID REFERENCES auth.users(id),
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    donor_phone TEXT,
    visit_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    need_id UUID REFERENCES public.children_needs(id),
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Item donations: pledge to send items (delivery)
CREATE TABLE public.item_donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID REFERENCES auth.users(id),
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    donor_phone TEXT,
    items_description TEXT NOT NULL,
    delivery_note TEXT,
    need_id UUID REFERENCES public.children_needs(id),
    status TEXT NOT NULL DEFAULT 'pledged',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.donor_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.item_donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create donor_visits" ON public.donor_visits FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own donor_visits" ON public.donor_visits FOR SELECT USING (donor_id = auth.uid());
CREATE POLICY "Admins can view all donor_visits" ON public.donor_visits FOR SELECT USING (public.is_admin_or_subadmin(auth.uid()));

CREATE POLICY "Anyone can create item_donations" ON public.item_donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own item_donations" ON public.item_donations FOR SELECT USING (donor_id = auth.uid());
CREATE POLICY "Admins can view all item_donations" ON public.item_donations FOR SELECT USING (public.is_admin_or_subadmin(auth.uid()));
