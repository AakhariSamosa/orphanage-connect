import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAshrams } from '@/hooks/useAshrams';
import type { Database } from '@/integrations/supabase/types';

type NeedCategory = Database['public']['Enums']['need_category'];
type NeedUrgency = Database['public']['Enums']['need_urgency'];

interface Need {
  id: string;
  title: string;
  description: string | null;
  category: NeedCategory;
  urgency: NeedUrgency;
  quantity_needed: number;
  quantity_fulfilled: number;
  estimated_cost: number | null;
  image_url: string | null;
  is_active: boolean;
  ashram_id: string | null;
  created_at: string;
}

const categories: NeedCategory[] = ['food', 'clothing', 'education', 'healthcare', 'daily_essentials', 'other'];
const urgencies: NeedUrgency[] = ['low', 'medium', 'high', 'critical'];

export default function AdminNeeds() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNeed, setEditingNeed] = useState<Need | null>(null);
  const [selectedAshramFilter, setSelectedAshramFilter] = useState<string>('all');
  const { data: ashrams } = useAshrams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'food' as NeedCategory,
    urgency: 'medium' as NeedUrgency,
    quantity_needed: 1,
    estimated_cost: '',
    image_url: '',
    ashram_id: '',
  });

  const { data: needs, isLoading } = useQuery({
    queryKey: ['admin-needs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('children_needs')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Need[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('children_needs').insert({
        title: data.title,
        description: data.description || null,
        category: data.category,
        urgency: data.urgency,
        quantity_needed: data.quantity_needed,
        estimated_cost: data.estimated_cost ? parseFloat(data.estimated_cost) : null,
        image_url: data.image_url || null,
        ashram_id: data.ashram_id || null,
        created_by: user?.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-needs'] });
      toast.success('Need created successfully');
      resetForm();
    },
    onError: () => toast.error('Failed to create need'),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: string } & typeof formData) => {
      const { error } = await supabase
        .from('children_needs')
        .update({
          title: data.title,
          description: data.description || null,
          category: data.category,
          urgency: data.urgency,
          quantity_needed: data.quantity_needed,
          estimated_cost: data.estimated_cost ? parseFloat(data.estimated_cost) : null,
          image_url: data.image_url || null,
          ashram_id: data.ashram_id || null,
        })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-needs'] });
      toast.success('Need updated successfully');
      resetForm();
    },
    onError: () => toast.error('Failed to update need'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('children_needs').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-needs'] });
      toast.success('Need deleted successfully');
    },
    onError: () => toast.error('Failed to delete need'),
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'food',
      urgency: 'medium',
      quantity_needed: 1,
      estimated_cost: '',
      image_url: '',
      ashram_id: '',
    });
    setEditingNeed(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (need: Need) => {
    setEditingNeed(need);
    setFormData({
      title: need.title,
      description: need.description || '',
      category: need.category,
      urgency: need.urgency,
      quantity_needed: need.quantity_needed,
      estimated_cost: need.estimated_cost?.toString() || '',
      image_url: need.image_url || '',
      ashram_id: need.ashram_id || '',
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNeed) {
      updateMutation.mutate({ id: editingNeed.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const getUrgencyColor = (urgency: NeedUrgency) => {
    switch (urgency) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  const filteredNeeds = needs?.filter(n => 
    selectedAshramFilter === 'all' || n.ashram_id === selectedAshramFilter
  );

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Children's Needs ({filteredNeeds?.length || 0})</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Need
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingNeed ? 'Edit Need' : 'Add New Need'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Ashram *</Label>
                  <Select
                    value={formData.ashram_id}
                    onValueChange={(value) => setFormData({ ...formData, ashram_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an ashram" />
                    </SelectTrigger>
                    <SelectContent>
                      {ashrams?.map((a) => (
                        <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value as NeedCategory })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat.replace('_', ' ').charAt(0).toUpperCase() + cat.replace('_', ' ').slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Urgency *</Label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) => setFormData({ ...formData, urgency: value as NeedUrgency })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencies.map((urg) => (
                        <SelectItem key={urg} value={urg}>
                          {urg.charAt(0).toUpperCase() + urg.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity Needed</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min={1}
                    value={formData.quantity_needed}
                    onChange={(e) => setFormData({ ...formData, quantity_needed: parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div>
                  <Label htmlFor="cost">Estimated Cost (₹)</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={formData.estimated_cost}
                    onChange={(e) => setFormData({ ...formData, estimated_cost: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {editingNeed ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {/* Ashram filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedAshramFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedAshramFilter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          All Ashrams
        </button>
        {ashrams?.map((a) => (
          <button
            key={a.id}
            onClick={() => setSelectedAshramFilter(a.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedAshramFilter === a.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
          >
            {a.name}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredNeeds?.map((need) => {
          const ashramName = ashrams?.find(a => a.id === need.ashram_id)?.name;
          return (
          <Card key={need.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{need.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={getUrgencyColor(need.urgency)}>{need.urgency}</Badge>
                    <Badge variant="outline">{need.category.replace('_', ' ')}</Badge>
                    {ashramName && <Badge variant="secondary">{ashramName}</Badge>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(need)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => deleteMutation.mutate(need.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {need.description && <p className="text-sm text-muted-foreground mb-2">{need.description}</p>}
              <div className="flex items-center gap-4 text-sm">
                <span>Qty: {need.quantity_fulfilled}/{need.quantity_needed}</span>
                {need.estimated_cost && <span>Est. ₹{need.estimated_cost.toLocaleString()}</span>}
              </div>
            </CardContent>
          </Card>
        );
        })}
        {filteredNeeds?.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No needs added yet. Click "Add Need" to create one.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
