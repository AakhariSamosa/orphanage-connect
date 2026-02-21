import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Plus, Loader2, ArrowLeft, Pencil, Trash2, Package } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ImageUpload } from '@/components/ImageUpload';
import { useAuth } from '@/contexts/AuthContext';
import { useAshram } from '@/contexts/AshramContext';
import { useMyVendor, useProducts } from '@/hooks/useVendors';
import { useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/useVendorProducts';
import { toast } from 'sonner';

export default function VendorDashboard() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { basePath } = useAshram();
  const { data: vendor, isLoading: vendorLoading } = useMyVendor();
  const { data: products, isLoading: productsLoading } = useProducts(vendor?.id);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
  });

  const resetForm = () => {
    setForm({ name: '', description: '', price: '', category: '', image_url: '' });
    setEditingProduct(null);
  };

  const openEdit = (product: any) => {
    setForm({
      name: product.name,
      description: product.description || '',
      price: String(product.price),
      category: product.category || '',
      image_url: product.image_url || '',
    });
    setEditingProduct(product.id);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendor) return;
    if (!form.name || !form.price) {
      toast.error('Name and price are required');
      return;
    }

    try {
      const payload = {
        name: form.name,
        description: form.description || null,
        price: Number(form.price),
        category: form.category || null,
        image_url: form.image_url || null,
        vendor_id: vendor.id,
        is_available: true,
      };

      if (editingProduct) {
        await updateProduct.mutateAsync({ id: editingProduct, ...payload });
        toast.success('Product updated!');
      } else {
        await createProduct.mutateAsync(payload);
        toast.success('Product added!');
      }
      setDialogOpen(false);
      resetForm();
    } catch {
      toast.error('Failed to save product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast.success('Product deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (authLoading || vendorLoading) {
    return <Layout><div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div></Layout>;
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <Store className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Sign In Required</CardTitle>
              <CardDescription>Please sign in to access your vendor dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/auth')} className="w-full">Sign In</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!vendor) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <Store className="w-12 h-12 text-accent mx-auto mb-4" />
              <CardTitle>Not a Vendor Yet</CardTitle>
              <CardDescription>Register as a vendor first to manage your products.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate(`${basePath}/vendor/register`)} className="w-full">Register as Vendor</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 min-h-screen bg-secondary/30">
        <div className="container-custom max-w-4xl">
          <Button variant="ghost" onClick={() => navigate(`${basePath}/earn`)} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Marketplace
          </Button>

          {/* Vendor Info */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                {vendor.logo_url ? (
                  <img src={vendor.logo_url} alt={vendor.business_name} className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center"><Store className="w-8 h-8 text-accent" /></div>
                )}
                <div className="flex-1">
                  <h1 className="text-xl font-display font-bold">{vendor.business_name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={vendor.is_verified ? 'default' : 'secondary'}>{vendor.is_verified ? 'Verified' : 'Pending Verification'}</Badge>
                    <span className="text-sm text-muted-foreground">{vendor.charity_percentage}% charity</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Section */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Your Products ({products?.length || 0})</h2>
            <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button><Plus className="w-4 h-4 mr-2" /> Add Product</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label>Product Name *</Label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Handmade Basket" required />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe your product..." rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Price (₹) *</Label>
                      <Input type="number" min="1" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="199" required />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Decor" />
                    </div>
                  </div>
                  <div>
                    <Label>Product Image</Label>
                    <ImageUpload folder="products" currentImage={form.image_url} onUpload={(url) => setForm({ ...form, image_url: url })} />
                  </div>
                  <Button type="submit" className="w-full" disabled={createProduct.isPending || updateProduct.isPending}>
                    {(createProduct.isPending || updateProduct.isPending) ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {productsLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover" />
                  ) : (
                    <div className="w-full h-40 bg-accent/10 flex items-center justify-center"><Package className="w-10 h-10 text-accent/40" /></div>
                  )}
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">{product.name}</h3>
                    {product.description && <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{product.description}</p>}
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">₹{product.price}</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(product)}><Pencil className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-16 text-center">
                <Package className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="font-medium mb-2">No Products Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Add your first product to start selling!</p>
                <Button onClick={() => setDialogOpen(true)}><Plus className="w-4 h-4 mr-2" /> Add Product</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
