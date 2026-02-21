import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, ArrowLeft, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ImageUpload';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateVendor, useMyVendor } from '@/hooks/useVendors';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type VendorCategory = Database['public']['Enums']['vendor_category'];

const categories: { value: VendorCategory; label: string }[] = [
  { value: 'cloud_kitchen', label: 'Cloud Kitchen' },
  { value: 'handicrafts', label: 'Handicrafts' },
  { value: 'homemade', label: 'Homemade Products' },
  { value: 'services', label: 'Services' },
  { value: 'other', label: 'Other' },
];

export default function VendorRegister() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { data: existingVendor, isLoading: vendorLoading } = useMyVendor();
  const createVendor = useCreateVendor();

  const [formData, setFormData] = useState({
    business_name: '',
    description: '',
    category: '' as VendorCategory,
    phone: '',
    email: '',
    address: '',
    charity_percentage: 10,
    logo_url: '',
    cover_image_url: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.business_name || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await createVendor.mutateAsync({
        business_name: formData.business_name,
        description: formData.description || null,
        category: formData.category,
        phone: formData.phone || null,
        email: formData.email || null,
        address: formData.address || null,
        charity_percentage: formData.charity_percentage,
        logo_url: formData.logo_url || null,
        cover_image_url: formData.cover_image_url || null,
        ashram_id: null,
      });
      toast.success('Vendor application submitted! We will review and verify your account.');
      navigate('/earn');
    } catch (error) {
      toast.error('Failed to submit application');
    }
  };

  if (authLoading || vendorLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <Store className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Sign In Required</CardTitle>
              <CardDescription>
                Please sign in to register as a vendor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/auth')} className="w-full">
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (existingVendor) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <Store className="w-12 h-12 text-accent mx-auto mb-4" />
              <CardTitle>You're Already a Vendor!</CardTitle>
              <CardDescription>
                Your vendor account "{existingVendor.business_name}" is {existingVendor.is_verified ? 'verified and active' : 'pending verification'}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={() => navigate('/ashram/shradhanand/vendor/dashboard')} className="w-full">
                Manage Your Products
              </Button>
              <Button variant="outline" onClick={() => navigate('/ashram/shradhanand/earn')} className="w-full">
                Go to Marketplace
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 bg-secondary/30 min-h-screen">
        <div className="container-custom max-w-2xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/earn')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Button>

          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Become a Vendor</CardTitle>
              <CardDescription>
                Join our platform to sell your products while supporting the orphanage.
                Fill out the form below to apply.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="business_name">Business Name *</Label>
                    <Input
                      id="business_name"
                      value={formData.business_name}
                      onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                      placeholder="Your business name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value as VendorCategory })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="charity_percentage">Charity Percentage (5-25%)</Label>
                    <Input
                      id="charity_percentage"
                      type="number"
                      min={5}
                      max={25}
                      value={formData.charity_percentage}
                      onChange={(e) => setFormData({ ...formData, charity_percentage: Number(e.target.value) })}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Tell us about your business..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Business Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="business@example.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Your business address"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>Logo</Label>
                    <ImageUpload
                      folder="vendors/logos"
                      currentImage={formData.logo_url}
                      onUpload={(url) => setFormData({ ...formData, logo_url: url })}
                    />
                  </div>

                  <div>
                    <Label>Cover Image</Label>
                    <ImageUpload
                      folder="vendors/covers"
                      currentImage={formData.cover_image_url}
                      onUpload={(url) => setFormData({ ...formData, cover_image_url: url })}
                    />
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">Note:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Your vendor account will be reviewed by our team</li>
                    <li>Verification usually takes 24-48 hours</li>
                    <li>Once verified, you can start adding products</li>
                    <li>{formData.charity_percentage}% of each sale will go to the orphanage</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={createVendor.isPending}
                >
                  {createVendor.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
