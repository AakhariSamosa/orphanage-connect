import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type VendorCategory = Database['public']['Enums']['vendor_category'];

interface Vendor {
  id: string;
  business_name: string;
  description: string | null;
  category: VendorCategory;
  email: string | null;
  phone: string | null;
  charity_percentage: number;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

export default function AdminVendors() {
  const queryClient = useQueryClient();

  const { data: vendors, isLoading } = useQuery({
    queryKey: ['admin-vendors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Vendor[];
    },
  });

  const verifyMutation = useMutation({
    mutationFn: async ({ id, verified }: { id: string; verified: boolean }) => {
      const { error } = await supabase
        .from('vendors')
        .update({ is_verified: verified })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, { verified }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-vendors'] });
      toast.success(verified ? 'Vendor verified' : 'Vendor unverified');
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await supabase
        .from('vendors')
        .update({ is_active: active })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, { active }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-vendors'] });
      toast.success(active ? 'Vendor activated' : 'Vendor deactivated');
    },
  });

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
        <h2 className="text-xl font-semibold">Vendors ({vendors?.length || 0})</h2>
      </div>

      <div className="grid gap-4">
        {vendors?.map((vendor) => (
          <Card key={vendor.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{vendor.business_name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{vendor.category.replace('_', ' ')}</Badge>
                    {vendor.is_verified ? (
                      <Badge variant="default">Verified</Badge>
                    ) : (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                    {!vendor.is_active && <Badge variant="destructive">Inactive</Badge>}
                  </div>
                </div>
                <div className="flex gap-2">
                  {!vendor.is_verified ? (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => verifyMutation.mutate({ id: vendor.id, verified: true })}
                      disabled={verifyMutation.isPending}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Verify
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => verifyMutation.mutate({ id: vendor.id, verified: false })}
                      disabled={verifyMutation.isPending}
                    >
                      Unverify
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant={vendor.is_active ? 'destructive' : 'default'}
                    onClick={() => toggleActiveMutation.mutate({ id: vendor.id, active: !vendor.is_active })}
                    disabled={toggleActiveMutation.isPending}
                  >
                    {vendor.is_active ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {vendor.description && (
                <p className="text-sm text-muted-foreground mb-2">{vendor.description}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {vendor.email && <span>{vendor.email}</span>}
                {vendor.phone && <span>{vendor.phone}</span>}
                <span className="text-primary font-medium">{vendor.charity_percentage}% charity</span>
              </div>
            </CardContent>
          </Card>
        ))}
        {vendors?.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No vendors registered yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
