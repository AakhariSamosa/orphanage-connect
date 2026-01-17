import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface Donation {
  id: string;
  donor_name: string | null;
  donor_email: string | null;
  amount: number;
  donation_type: string;
  payment_status: string;
  is_anonymous: boolean;
  is_recurring: boolean;
  created_at: string;
}

export default function AdminDonations() {
  const { data: donations, isLoading } = useQuery({
    queryKey: ['admin-donations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Donation[];
    },
  });

  const totalAmount = donations?.reduce((sum, d) => sum + (d.payment_status === 'completed' ? d.amount : 0), 0) || 0;

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
        <h2 className="text-xl font-semibold">Donations ({donations?.length || 0})</h2>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Received</p>
          <p className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid gap-4">
        {donations?.map((donation) => (
          <Card key={donation.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {donation.is_anonymous ? 'Anonymous Donor' : donation.donor_name || 'Unknown'}
                  </CardTitle>
                  {!donation.is_anonymous && donation.donor_email && (
                    <p className="text-sm text-muted-foreground">{donation.donor_email}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">₹{donation.amount.toLocaleString()}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant={donation.payment_status === 'completed' ? 'default' : 'secondary'}>
                      {donation.payment_status}
                    </Badge>
                    {donation.is_recurring && <Badge variant="outline">Monthly</Badge>}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {format(new Date(donation.created_at), 'PPp')}
              </p>
            </CardContent>
          </Card>
        ))}
        {donations?.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No donations received yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
