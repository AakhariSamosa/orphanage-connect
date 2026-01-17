import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Mail, Check } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  inquiry_type: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminMessages() {
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as ContactMessage[];
    },
  });

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
      toast.success('Marked as read');
    },
  });

  const unreadCount = messages?.filter(m => !m.is_read).length || 0;

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          Messages ({messages?.length || 0})
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">{unreadCount} unread</Badge>
          )}
        </h2>
      </div>

      <div className="grid gap-4">
        {messages?.map((msg) => (
          <Card key={msg.id} className={!msg.is_read ? 'border-primary/50 bg-primary/5' : ''}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {msg.name}
                    {!msg.is_read && <Badge variant="default" className="text-xs">New</Badge>}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {msg.email}
                    {msg.phone && <span>• {msg.phone}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{msg.inquiry_type}</Badge>
                  {!msg.is_read && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => markReadMutation.mutate(msg.id)}
                      disabled={markReadMutation.isPending}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {msg.subject && <p className="font-medium mb-2">{msg.subject}</p>}
              <p className="text-sm text-muted-foreground mb-2">{msg.message}</p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(msg.created_at), 'PPp')}
              </p>
            </CardContent>
          </Card>
        ))}
        {messages?.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No messages received yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
