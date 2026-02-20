import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Users, Heart, Package, Calendar, MessageSquare, TrendingUp, Building } from 'lucide-react';
import AdminNeeds from '@/components/admin/AdminNeeds';
import AdminDonations from '@/components/admin/AdminDonations';
import AdminEvents from '@/components/admin/AdminEvents';
import AdminMessages from '@/components/admin/AdminMessages';
import AdminVendors from '@/components/admin/AdminVendors';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminAshrams from '@/components/admin/AdminAshrams';

export default function Admin() {
  const navigate = useNavigate();
  const { user, isLoading, isAdmin, isSubAdmin } = useAuth();

  useEffect(() => {
    if (!isLoading && (!user || (!isAdmin && !isSubAdmin))) {
      navigate('/auth');
    }
  }, [user, isLoading, isAdmin, isSubAdmin, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user || (!isAdmin && !isSubAdmin)) {
    return null;
  }

  return (
    <Layout>
      <div className="py-8 md:py-12 bg-secondary/30">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="heading-section mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage orphanage data, donations, vendors, and more.
              </p>
            </div>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {isAdmin ? 'Super Admin' : 'Sub-Admin'}
            </span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Total Donations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">₹0</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Active Needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Vendors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Messages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0</p>
              </CardContent>
            </Card>
          </div>

          {/* Admin Tabs */}
          <Tabs defaultValue="ashrams" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full mb-8">
              {isAdmin && <TabsTrigger value="ashrams">Ashrams</TabsTrigger>}
              <TabsTrigger value="needs">Children Needs</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="vendors">Vendors</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              {isAdmin && <TabsTrigger value="users">Users</TabsTrigger>}
            </TabsList>

            {isAdmin && (
              <TabsContent value="ashrams">
                <AdminAshrams />
              </TabsContent>
            )}

            <TabsContent value="needs">
              <AdminNeeds />
            </TabsContent>

            <TabsContent value="donations">
              <AdminDonations />
            </TabsContent>

            <TabsContent value="vendors">
              <AdminVendors />
            </TabsContent>

            <TabsContent value="events">
              <AdminEvents />
            </TabsContent>

            <TabsContent value="messages">
              <AdminMessages />
            </TabsContent>

            {isAdmin && (
              <TabsContent value="users">
                <AdminUsers />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
