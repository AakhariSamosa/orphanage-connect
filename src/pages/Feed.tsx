import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreVertical, Send, Image as ImageIcon, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ImageUpload } from '@/components/ImageUpload';
import { useFeedPosts, useCreatePost, useLikePost, usePostComments, useAddComment } from '@/hooks/useFeedPosts';
import { useAuth } from '@/contexts/AuthContext';
import { useAshram } from '@/contexts/AshramContext';
import { formatDistanceToNow } from 'date-fns';

function PostCard({ post }: { post: any }) {
  const { user } = useAuth();
  const { likePost, unlikePost, isLiked, isLiking } = useLikePost(post.id);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { data: comments, isLoading: loadingComments } = usePostComments(post.id, showComments);
  const addComment = useAddComment(post.id);

  const handleLike = () => { if (!user) return; isLiked ? unlikePost() : likePost(); };
  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addComment.mutate(newComment, { onSuccess: () => setNewComment('') });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar><AvatarImage src="/placeholder.svg" /><AvatarFallback>SA</AvatarFallback></Avatar>
        <div className="flex-1">
          <h3 className="font-semibold">Ashram Update</h3>
          <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</p>
        </div>
        <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
      </CardHeader>
      <CardContent className="p-0">
        {post.content && <p className="px-4 pb-4 text-foreground">{post.content}</p>}
        {post.media_url && post.media_type === 'image' && <img src={post.media_url} alt={post.title || 'Post image'} className="w-full max-h-[500px] object-cover" />}
        {post.media_url && post.media_type === 'video' && <video src={post.media_url} controls className="w-full max-h-[500px] object-cover" />}
      </CardContent>
      <CardFooter className="flex flex-col p-0">
        <div className="flex items-center justify-between w-full px-4 py-2 border-t">
          <span className="text-sm text-muted-foreground">{post.likes_count} likes · {post.comments_count} comments</span>
        </div>
        <div className="flex items-center justify-around w-full border-t py-1">
          <Button variant="ghost" className={`flex-1 ${isLiked ? 'text-primary' : ''}`} onClick={handleLike} disabled={!user || isLiking}>
            <Heart className={`w-5 h-5 mr-2 ${isLiked ? 'fill-primary' : ''}`} />Like
          </Button>
          <Button variant="ghost" className="flex-1" onClick={() => setShowComments(!showComments)}>
            <MessageCircle className="w-5 h-5 mr-2" />Comment
          </Button>
          <Button variant="ghost" className="flex-1"><Share2 className="w-5 h-5 mr-2" />Share</Button>
        </div>
        {showComments && (
          <div className="w-full border-t p-4 space-y-4">
            {loadingComments ? <div className="flex justify-center py-4"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div> : (
              <>
                {comments?.map((comment: any) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8"><AvatarFallback>U</AvatarFallback></Avatar>
                    <div className="flex-1 bg-muted rounded-lg p-3"><p className="text-sm font-medium">User</p><p className="text-sm">{comment.content}</p></div>
                  </div>
                ))}
                {comments?.length === 0 && <p className="text-center text-muted-foreground text-sm">No comments yet.</p>}
              </>
            )}
            {user && (
              <form onSubmit={handleComment} className="flex gap-2">
                <Input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." className="flex-1" />
                <Button type="submit" size="icon" disabled={addComment.isPending}><Send className="w-4 h-4" /></Button>
              </form>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

function CreatePostDialog({ ashramId }: { ashramId: string | null }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const createPost = useCreatePost();

  const handleSubmit = async () => {
    if (!content.trim() && !mediaUrl) return;
    await createPost.mutateAsync({ content: content.trim() || null, media_url: mediaUrl || null, media_type: mediaType, title: null, ashram_id: ashramId });
    setContent(''); setMediaUrl(''); setMediaType(null); setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="flex items-center gap-4 p-4">
            <Avatar><AvatarFallback>SA</AvatarFallback></Avatar>
            <div className="flex-1 bg-muted rounded-full px-4 py-2 text-muted-foreground text-sm">Share an update with supporters...</div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Create Post</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?" rows={4} />
          {!mediaUrl && <div className="flex gap-2"><Button type="button" variant="outline" onClick={() => setMediaType('image')} className="flex-1"><ImageIcon className="w-4 h-4 mr-2" />Add Image</Button></div>}
          {mediaType === 'image' && !mediaUrl && <ImageUpload folder="feed" onUpload={(url) => setMediaUrl(url)} />}
          {mediaUrl && (
            <div className="relative">
              <img src={mediaUrl} alt="Preview" className="w-full rounded-lg" />
              <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => { setMediaUrl(''); setMediaType(null); }}>Remove</Button>
            </div>
          )}
          <Button onClick={handleSubmit} disabled={createPost.isPending || (!content.trim() && !mediaUrl)} className="w-full">
            {createPost.isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Posting...</> : 'Post'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Feed() {
  const { ashramId } = useAshram();
  const { data: posts, isLoading } = useFeedPosts(ashramId);
  const { isAdmin, isSubAdmin } = useAuth();
  const canPost = isAdmin || isSubAdmin;

  return (
    <Layout>
      <div className="py-12 bg-secondary/30 min-h-screen">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="heading-section mb-2">Community Feed</h1>
            <p className="text-muted-foreground">Stay updated with our latest activities and stories</p>
          </div>
          <div className="space-y-6">
            {canPost && <CreatePostDialog ashramId={ashramId} />}
            {isLoading ? (
              <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
            ) : posts?.length === 0 ? (
              <Card><CardContent className="py-12 text-center text-muted-foreground">No posts yet. Check back soon!</CardContent></Card>
            ) : (
              posts?.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
