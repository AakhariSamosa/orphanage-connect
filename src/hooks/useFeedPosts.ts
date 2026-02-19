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
  ashram_id: string | null;
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

export function useFeedPosts(ashramId?: string | null) {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['feed_posts', user?.id, ashramId],
    queryFn: async () => {
      let query = supabase
        .from('feed_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (ashramId) {
        query = query.eq('ashram_id', ashramId);
      }
      
      const { data: posts, error } = await query;
      
      if (error) throw error;
      
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

export function useLikePost(postId: string) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const { data: likeData } = useQuery({
    queryKey: ['post_like', postId, user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user
  });
  
  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Must be logged in');
      const { error } = await supabase
        .from('post_likes')
        .insert({ post_id: postId, user_id: user.id });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed_posts'] });
      queryClient.invalidateQueries({ queryKey: ['post_like', postId] });
    }
  });
  
  const unlikeMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Must be logged in');
      const { error } = await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed_posts'] });
      queryClient.invalidateQueries({ queryKey: ['post_like', postId] });
    }
  });
  
  return {
    likePost: likeMutation.mutate,
    unlikePost: unlikeMutation.mutate,
    isLiked: !!likeData,
    isLiking: likeMutation.isPending || unlikeMutation.isPending
  };
}

export function usePostComments(postId: string, enabled: boolean = true) {
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
    enabled: !!postId && enabled
  });
}

export function useAddComment(postId: string) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (content: string) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post_comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['feed_posts'] });
    }
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (post: {
      title: string | null;
      content: string | null;
      media_url: string | null;
      media_type: string | null;
      ashram_id?: string | null;
    }) => {
      if (!user) throw new Error('Must be logged in');
      
      const { data, error } = await supabase
        .from('feed_posts')
        .insert({
          ...post,
          created_by: user.id
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed_posts'] });
    }
  });
}
