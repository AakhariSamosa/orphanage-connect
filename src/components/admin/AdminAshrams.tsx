import { useState } from 'react';
import { useAllAshrams, useCreateAshram, useUpdateAshram, useAshramAdmins, useAddAshramAdmin, useRemoveAshramAdmin } from '@/hooks/useAshrams';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, Plus, Edit, Trash2, Users, Building } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AshramForm {
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  website: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  is_active: boolean;
}

const emptyForm: AshramForm = {
  name: '', slug: '', description: '', address: '', city: '', state: '',
  phone: '', email: '', website: '',
  primary_color: '#E8710A', secondary_color: '#FFF7ED', accent_color: '#F97316',
  is_active: true,
};

export default function AdminAshrams() {
  const { data: ashrams, isLoading } = useAllAshrams();
  const createAshram = useCreateAshram();
  const updateAshram = useUpdateAshram();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<AshramForm>(emptyForm);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [selectedAshramId, setSelectedAshramId] = useState<string | null>(null);
  const [newAdminEmail, setNewAdminEmail] = useState('');

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (ashram: any) => {
    setEditId(ashram.id);
    setForm({
      name: ashram.name,
      slug: ashram.slug,
      description: ashram.description || '',
      address: ashram.address || '',
      city: ashram.city || '',
      state: ashram.state || '',
      phone: ashram.phone || '',
      email: ashram.email || '',
      website: ashram.website || '',
      primary_color: ashram.primary_color || '#E8710A',
      secondary_color: ashram.secondary_color || '#FFF7ED',
      accent_color: ashram.accent_color || '#F97316',
      is_active: ashram.is_active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) {
      toast.error('Name and slug are required');
      return;
    }
    try {
      if (editId) {
        await updateAshram.mutateAsync({ id: editId, ...form });
        toast.success('Ashram updated');
      } else {
        await createAshram.mutateAsync(form as any);
        toast.success('Ashram created');
      }
      setDialogOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save');
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Ashrams ({ashrams?.length || 0})</h2>
        <Button onClick={openCreate}><Plus className="w-4 h-4 mr-2" />Add Ashram</Button>
      </div>

      <div className="grid gap-4">
        {ashrams?.map((ashram) => (
          <Card key={ashram.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: ashram.primary_color || '#E8710A' }}>
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{ashram.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">/ashram/{ashram.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={ashram.is_active ? 'default' : 'secondary'}>
                    {ashram.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  <Button size="sm" variant="ghost" onClick={() => { setSelectedAshramId(ashram.id); setAdminDialogOpen(true); }}>
                    <Users className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => openEdit(ashram)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{ashram.description || 'No description'}</p>
              {ashram.city && <p className="text-xs text-muted-foreground mt-1">{ashram.city}{ashram.state ? `, ${ashram.state}` : ''}</p>}
            </CardContent>
          </Card>
        ))}
        {ashrams?.length === 0 && (
          <Card><CardContent className="py-12 text-center text-muted-foreground">No ashrams yet. Add one to get started.</CardContent></Card>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId ? 'Edit Ashram' : 'Add New Ashram'}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name *</Label>
              <Input value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value, slug: editId ? form.slug : generateSlug(e.target.value) }); }} className="mt-1" />
            </div>
            <div>
              <Label>Slug *</Label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="mt-1" />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1" rows={2} />
            </div>
            <div className="md:col-span-2">
              <Label>Address</Label>
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-1" />
            </div>
            <div><Label>City</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-1" /></div>
            <div><Label>State</Label><Input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="mt-1" /></div>
            <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1" /></div>
            <div><Label>Email</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" /></div>
            <div><Label>Website</Label><Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="mt-1" /></div>
            <div className="flex items-center gap-2">
              <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
              <Label>Active</Label>
            </div>
            <div><Label>Primary Color</Label><Input type="color" value={form.primary_color} onChange={(e) => setForm({ ...form, primary_color: e.target.value })} className="mt-1 h-10" /></div>
            <div><Label>Secondary Color</Label><Input type="color" value={form.secondary_color} onChange={(e) => setForm({ ...form, secondary_color: e.target.value })} className="mt-1 h-10" /></div>
            <div><Label>Accent Color</Label><Input type="color" value={form.accent_color} onChange={(e) => setForm({ ...form, accent_color: e.target.value })} className="mt-1 h-10" /></div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={createAshram.isPending || updateAshram.isPending}>
              {(createAshram.isPending || updateAshram.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editId ? 'Update' : 'Create'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ashram Admins Dialog */}
      {selectedAshramId && (
        <AshramAdminsDialog
          ashramId={selectedAshramId}
          open={adminDialogOpen}
          onOpenChange={(v) => { setAdminDialogOpen(v); if (!v) setSelectedAshramId(null); }}
        />
      )}
    </div>
  );
}

function AshramAdminsDialog({ ashramId, open, onOpenChange }: { ashramId: string; open: boolean; onOpenChange: (v: boolean) => void }) {
  const { data: admins, isLoading } = useAshramAdmins(ashramId);
  const addAdmin = useAddAshramAdmin();
  const removeAdmin = useRemoveAshramAdmin();
  const [email, setEmail] = useState('');

  const handleAdd = async () => {
    if (!email) return;
    try {
      // Look up user by email in profiles
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('email', email)
        .maybeSingle();
      
      if (error || !profile) {
        toast.error('User not found. They must sign up first.');
        return;
      }

      await addAdmin.mutateAsync({ ashram_id: ashramId, user_id: profile.user_id, role: 'admin' });
      toast.success('Admin added');
      setEmail('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to add admin');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Ashram Admins</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="User email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button onClick={handleAdd} disabled={addAdmin.isPending}>
              {addAdmin.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-4"><Loader2 className="w-6 h-6 animate-spin" /></div>
          ) : (
            <div className="space-y-2">
              {admins?.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="text-sm font-medium">{admin.user_id}</p>
                    <Badge variant="outline" className="text-xs">{admin.role}</Badge>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => removeAdmin.mutate(admin.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
              {admins?.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No admins assigned yet.</p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
