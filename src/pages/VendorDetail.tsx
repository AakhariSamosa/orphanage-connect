import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag, MapPin, Phone, Mail, Heart, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAshram } from '@/contexts/AshramContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Vendor, Product } from '@/hooks/useVendors';

export default function VendorDetail() {
  const { vendorId } = useParams<{ vendorId: string }>();
  const navigate = useNavigate();
  const { basePath } = useAshram();

  const { data: vendor, isLoading: vendorLoading } = useQuery({
    queryKey: ['vendor', vendorId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('id', vendorId!)
        .single();
      if (error) throw error;
      return data as Vendor;
    },
    enabled: !!vendorId,
  });

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products', vendorId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('vendor_id', vendorId!)
        .eq('is_available', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Product[];
    },
    enabled: !!vendorId,
  });

  // Group products by category
  const grouped = (products || []).reduce((acc, p) => {
    const cat = p.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {} as Record<string, Product[]>);

  if (vendorLoading) {
    return <Layout><div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div></Layout>;
  }

  if (!vendor) {
    return <Layout><div className="min-h-[60vh] flex items-center justify-center"><p className="text-muted-foreground">Vendor not found.</p></div></Layout>;
  }

  return (
    <Layout>
      {/* Cover / Hero */}
      <div className="relative">
        {vendor.cover_image_url ? (
          <img src={vendor.cover_image_url} alt={vendor.business_name} className="w-full h-56 md:h-72 object-cover" />
        ) : (
          <div className="w-full h-56 md:h-72 bg-gradient-to-br from-accent/20 to-primary/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="container-custom absolute bottom-0 left-0 right-0 pb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(`${basePath}/earn`)} className="mb-4 text-white hover:text-white/80">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </div>
      </div>

      {/* Vendor Info */}
      <div className="container-custom -mt-12 relative z-10 mb-8">
        <div className="bg-card rounded-2xl shadow-card p-6 flex flex-col md:flex-row gap-6 items-start">
          {vendor.logo_url ? (
            <img src={vendor.logo_url} alt={vendor.business_name} className="w-20 h-20 rounded-xl object-cover border-4 border-background shadow-md" />
          ) : (
            <div className="w-20 h-20 rounded-xl bg-accent/10 flex items-center justify-center border-4 border-background shadow-md">
              <ShoppingBag className="w-8 h-8 text-accent" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-display font-bold">{vendor.business_name}</h1>
              {vendor.is_verified && <Badge variant="default" className="gap-1"><Star className="w-3 h-3" /> Verified</Badge>}
            </div>
            {vendor.description && <p className="text-muted-foreground mt-2 max-w-2xl">{vendor.description}</p>}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
              {vendor.address && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{vendor.address}</span>}
              {vendor.phone && <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{vendor.phone}</span>}
              {vendor.email && <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{vendor.email}</span>}
            </div>
            <div className="mt-3">
              <Badge variant="outline" className="gap-1 text-accent border-accent">
                <Heart className="w-3 h-3" /> {vendor.charity_percentage}% goes to charity
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Products / Menu */}
      <div className="container-custom pb-16">
        <h2 className="text-xl font-display font-bold mb-6">
          Menu & Products <span className="text-muted-foreground font-normal text-base">({products?.length || 0} items)</span>
        </h2>

        {productsLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : products && products.length > 0 ? (
          <div className="space-y-8">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((product) => (
                    <div key={product.id} className="flex gap-4 bg-card rounded-xl p-4 shadow-soft card-hover">
                      <div className="flex-1">
                        <h4 className="font-medium">{product.name}</h4>
                        {product.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>}
                        <div className="flex items-center gap-3 mt-3">
                          <span className="font-bold text-primary text-lg">₹{product.price}</span>
                          <Badge variant="outline" className="text-xs text-accent border-accent">
                            {vendor.charity_percentage}% charity
                          </Badge>
                        </div>
                      </div>
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="w-28 h-28 rounded-xl object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-28 h-28 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <ShoppingBag className="w-8 h-8 text-accent/30" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-2xl shadow-soft">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-medium mb-2">No Products Available</h3>
            <p className="text-sm text-muted-foreground">This vendor hasn't added any products yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
