-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Storage policies for images bucket
-- Anyone can view images
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Authenticated users can upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images' AND auth.uid() IS NOT NULL);

-- Users can update their own uploaded images
CREATE POLICY "Users can update own images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Users can delete their own images, admins can delete any
CREATE POLICY "Users can delete own images or admins"
ON storage.objects FOR DELETE
USING (bucket_id = 'images' AND (auth.uid()::text = (storage.foldername(name))[1] OR is_admin_or_subadmin(auth.uid())));