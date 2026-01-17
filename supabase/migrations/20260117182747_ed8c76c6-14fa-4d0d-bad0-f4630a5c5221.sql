-- Create function to increment likes count
CREATE OR REPLACE FUNCTION public.increment_likes(post_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE public.feed_posts 
    SET likes_count = likes_count + 1 
    WHERE id = post_id;
END;
$$;

-- Create function to decrement likes count
CREATE OR REPLACE FUNCTION public.decrement_likes(post_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE public.feed_posts 
    SET likes_count = GREATEST(likes_count - 1, 0)
    WHERE id = post_id;
END;
$$;

-- Create function to increment comments count
CREATE OR REPLACE FUNCTION public.increment_comments(post_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE public.feed_posts 
    SET comments_count = comments_count + 1 
    WHERE id = post_id;
END;
$$;