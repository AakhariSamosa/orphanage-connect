-- Fix overly permissive INSERT policies by adding validation

-- Drop the permissive donation insert policy
DROP POLICY IF EXISTS "Anyone can create donations" ON public.donations;

-- Create a more secure donation policy that validates required fields
CREATE POLICY "Anyone can create donations with valid data" ON public.donations 
FOR INSERT WITH CHECK (
    amount > 0 AND 
    donor_email IS NOT NULL AND 
    donor_name IS NOT NULL
);

-- Drop the permissive contact messages insert policy  
DROP POLICY IF EXISTS "Anyone can send contact messages" ON public.contact_messages;

-- Create a more secure contact policy that validates required fields
CREATE POLICY "Anyone can send contact messages with valid data" ON public.contact_messages
FOR INSERT WITH CHECK (
    name IS NOT NULL AND 
    name != '' AND
    email IS NOT NULL AND 
    email != '' AND
    message IS NOT NULL AND 
    message != '' AND
    inquiry_type IS NOT NULL
);