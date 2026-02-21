import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Utensils, Paintbrush, Star, ArrowRight, Heart, Users, TrendingUp, Store, Wrench, Package, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useAshram } from "@/contexts/AshramContext";
import { useVendors, useProducts } from "@/hooks/useVendors";
import handicraftImage from "@/assets/earn-handicraft.jpg";
import kitchenImage from "@/assets/earn-kitchen.jpg";

const categoryMeta: Record<string, { name: string; icon: React.ElementType }> = {
  cloud_kitchen: { name: "Cloud Kitchens", icon: Utensils },
  handicrafts: { name: "Handmade Crafts", icon: Paintbrush },
  homemade: { name: "Homemade Products", icon: ShoppingBag },
  services: { name: "Services", icon: Wrench },
  other: { name: "Other", icon: Package },
};

const Earn = () => {
  const navigate = useNavigate();
  const { basePath, ashramId } = useAshram();
  const { data: vendors, isLoading: vendorsLoading } = useVendors(undefined, ashramId);
  const { data: products, isLoading: productsLoading } = useProducts();

  // Build category counts from real vendors
  const categoryCounts = (vendors || []).reduce((acc, v) => {
    acc[v.category] = (acc[v.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = Object.entries(categoryCounts).map(([id, count]) => ({
    id,
    name: categoryMeta[id]?.name || id,
    icon: categoryMeta[id]?.icon || Package,
    count,
  }));

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-accent/5 to-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="text-accent font-medium mb-2 block">Earn & Support</span>
              <h1 className="heading-display mb-6">Shop to <span className="text-accent">Support</span> Our Children</h1>
              <p className="text-body mb-6">Buy from local vendors, and a percentage automatically goes to support our ashram.</p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-card rounded-xl shadow-soft"><Store className="w-6 h-6 text-accent mx-auto mb-2" /><div className="text-2xl font-display font-bold">{vendors?.length || 0}</div><div className="text-xs text-muted-foreground">Vendors</div></div>
                <div className="text-center p-4 bg-card rounded-xl shadow-soft"><Heart className="w-6 h-6 text-primary mx-auto mb-2" /><div className="text-2xl font-display font-bold">{products?.length || 0}</div><div className="text-xs text-muted-foreground">Products</div></div>
                <div className="text-center p-4 bg-card rounded-xl shadow-soft"><Users className="w-6 h-6 text-gold mx-auto mb-2" /><div className="text-2xl font-display font-bold">{categories.length}</div><div className="text-xs text-muted-foreground">Categories</div></div>
              </div>
              <Button variant="sage" size="lg" asChild>
                <a href="#products-section">Start Shopping<ArrowRight className="w-4 h-4" /></a>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={kitchenImage} alt="Cloud Kitchen" className="rounded-2xl shadow-card w-full h-64 object-cover" />
              <img src={handicraftImage} alt="Handmade Crafts" className="rounded-2xl shadow-card w-full h-64 object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12"><h2 className="heading-section mb-4">How It Works</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[{ step: 1, title: "Browse Products", desc: "Explore local vendors" }, { step: 2, title: "Make a Purchase", desc: "Buy products you love" }, { step: 3, title: "Auto Donation", desc: "A percentage goes to ashram" }, { step: 4, title: "See Impact", desc: "Track how your purchase helps" }].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">{item.step}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3><p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12"><span className="text-accent font-medium mb-2 block">Browse By</span><h2 className="heading-section">Categories</h2></div>
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category.id} className="bg-card rounded-2xl p-8 shadow-soft card-hover text-center cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4"><category.icon className="w-8 h-8 text-accent" /></div>
                  <h3 className="heading-card mb-2">{category.name}</h3><p className="text-muted-foreground text-sm">{category.count} vendor{category.count !== 1 ? 's' : ''}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No vendors registered yet.</p>
          )}
        </div>
      </section>

      {/* Vendors */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div><span className="text-accent font-medium mb-2 block">Featured</span><h2 className="heading-section">Our Vendors</h2></div>
          </div>
          {vendorsLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : vendors && vendors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {vendors.map((vendor) => (
                <div key={vendor.id} className="bg-card rounded-2xl overflow-hidden shadow-card card-hover cursor-pointer" onClick={() => navigate(`${basePath}/vendor/${vendor.id}`)}>
                  <div className="relative h-48">
                    <img src={vendor.cover_image_url || vendor.logo_url || handicraftImage} alt={vendor.business_name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">{vendor.charity_percentage}% to charity</div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">{categoryMeta[vendor.category]?.name || vendor.category}</span>
                    <h3 className="heading-card mt-1 mb-2">{vendor.business_name}</h3>
                    {vendor.description && <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{vendor.description}</p>}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-gold text-gold" /><span className="text-sm text-muted-foreground">Verified</span></div>
                      <Button variant="ghost" size="sm">View Products <ArrowRight className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No vendors available yet. Be the first to join!</p>
          )}
        </div>
      </section>

      {/* Products */}
      <section id="products-section" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12"><span className="text-accent font-medium mb-2 block">Shop Now</span><h2 className="heading-section">Available Products</h2></div>
          {productsLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-card rounded-xl overflow-hidden shadow-soft card-hover">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover" />
                  ) : (
                    <div className="w-full h-40 bg-accent/10 flex items-center justify-center"><ShoppingBag className="w-10 h-10 text-accent/40" /></div>
                  )}
                  <div className="p-4">
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h4>
                    {product.vendor && <p className="text-xs text-muted-foreground mb-2">{product.vendor.business_name}</p>}
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">₹{product.price}</span>
                      {product.vendor && <span className="text-xs text-accent">{product.vendor.charity_percentage}%</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No products available yet.</p>
          )}
        </div>
      </section>

      {/* Become a Vendor */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-section mb-4">Become a Vendor</h2>
              <p className="text-lg opacity-90 mb-6">Join our platform to sell your products while contributing to a noble cause.</p>
              <ul className="space-y-3 mb-8">
                {["Zero listing fees", "Reach caring customers", "Flexible charity percentage (5-25%)", "We handle marketing"].map((item, index) => (
                  <li key={index} className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-accent-foreground/20 flex items-center justify-center"><TrendingUp className="w-3 h-3" /></div>{item}</li>
                ))}
              </ul>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to={`${basePath}/vendor/register`}>Apply as Vendor<ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
            <div className="bg-accent-foreground/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="font-display text-xl font-semibold mb-4">Vendor Benefits</h3>
              <div className="space-y-4">
                {[{ label: "Average Sales Increase", value: "40%" }, { label: "Customer Retention", value: "85%" }, { label: "Marketing Reach", value: "10,000+" }].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-accent-foreground/10 pb-3"><span className="opacity-80">{stat.label}</span><span className="text-xl font-bold">{stat.value}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Earn;
