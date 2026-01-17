import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface FeedPost {
  id: string;
  title: string | null;
  content: string | null;
  media_url: string | null;
  media_type: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  hasLiked?: boolean;
}

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export function useFeedPosts() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['feed_posts', user?.id],
    queryFn: async () => {
      const { data: posts, error } = await supabase
        .from('feed_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Check if user has liked each post
      if (user && posts) {
        const { data: likes } = await supabase
          .from('post_likes')
          .select('post_id')
          .eq('user_id', user.id);
        
        const likedPostIds = new Set(likes?.map(l => l.post_id) || []);
        
        return posts.map(post => ({
          ...post,
          hasLiked: likedPostIds.has(post.id)
        })) as FeedPost[];
      }
      
      return posts as FeedPost[];
    }
  });
}

export function useLikePost() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ postId, isLiked }: { postId: string; isLiked: boolean }) => {
      if (!user) throw new Error('Must be logged in');
      
      if (isLiked) {
        // Unlike - delete the like
        const { error: deleteError } = await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
        
        if (deleteError) throw deleteError;
      } else {
        // Like - insert a new like
        const { error: insertError } = await supabase
          .from('post_likes')
          .insert({ post_id: postId, user_id: user.id });
        
        if (insertError) throw insertError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed_posts'] });
    }
  });
}

export function usePostComments(postId: string) {
  return useQuery({
    queryKey: ['post_comments', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('post_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as PostComment[];
    },
    enabled: !!postId
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ postId, content }: { postId: string; content: string }) => {
      if (!user) throw new Error('Must be logged in');
      
      const { data, error } = await supabase
        .from('post_comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
    },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['post_comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['feed_posts'] });
    }
  });
}
