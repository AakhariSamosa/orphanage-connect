import { Link } from "react-router-dom";
import { ShoppingBag, Utensils, Paintbrush, Star, ArrowRight, Heart, Users, TrendingUp, Store } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import handicraftImage from "@/assets/earn-handicraft.jpg";
import kitchenImage from "@/assets/earn-kitchen.jpg";

const categories = [
  { id: "kitchen", name: "Cloud Kitchens", icon: Utensils, count: 12 },
  { id: "crafts", name: "Handmade Crafts", icon: Paintbrush, count: 24 },
  { id: "products", name: "Local Products", icon: ShoppingBag, count: 18 },
];

const featuredVendors = [
  {
    id: 1,
    name: "Amma's Kitchen",
    category: "Cloud Kitchen",
    description: "Authentic Maharashtrian home-cooked meals delivered fresh daily.",
    image: kitchenImage,
    rating: 4.8,
    reviews: 156,
    charityPercent: 15,
  },
  {
    id: 2,
    name: "Craft with Love",
    category: "Handmade Crafts",
    description: "Beautiful crochet items, macrame decor, and handwoven products.",
    image: handicraftImage,
    rating: 4.9,
    reviews: 89,
    charityPercent: 20,
  },
  {
    id: 3,
    name: "Organic Spice Co.",
    category: "Local Products",
    description: "Pure, organic spices sourced directly from local farmers.",
    image: handicraftImage,
    rating: 4.7,
    reviews: 203,
    charityPercent: 10,
  },
];

const products = [
  { id: 1, name: "Homemade Mango Pickle", price: 250, vendor: "Amma's Kitchen", image: "🥫", charityPercent: 15 },
  { id: 2, name: "Crochet Baby Blanket", price: 1200, vendor: "Craft with Love", image: "🧶", charityPercent: 20 },
  { id: 3, name: "Organic Turmeric (500g)", price: 180, vendor: "Organic Spice Co.", image: "🌿", charityPercent: 10 },
  { id: 4, name: "Weekly Meal Box (7 days)", price: 1500, vendor: "Amma's Kitchen", image: "🍱", charityPercent: 15 },
  { id: 5, name: "Macrame Wall Hanging", price: 850, vendor: "Craft with Love", image: "🎨", charityPercent: 20 },
  { id: 6, name: "Red Chilli Powder (1kg)", price: 320, vendor: "Organic Spice Co.", image: "🌶️", charityPercent: 10 },
];

const Earn = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-accent/5 to-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="text-accent font-medium mb-2 block">Earn & Support</span>
              <h1 className="heading-display mb-6">
                Shop to <span className="text-accent">Support</span> Our Children
              </h1>
              <p className="text-body mb-6">
                Not everyone prefers direct donations. That's why we created Earn & Support—a marketplace where you can buy from local vendors, and a percentage automatically goes to support our orphanage.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-card rounded-xl shadow-soft">
                  <Store className="w-6 h-6 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-display font-bold">50+</div>
                  <div className="text-xs text-muted-foreground">Vendors</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl shadow-soft">
                  <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-display font-bold">₹5L+</div>
                  <div className="text-xs text-muted-foreground">Donated</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl shadow-soft">
                  <Users className="w-6 h-6 text-gold mx-auto mb-2" />
                  <div className="text-2xl font-display font-bold">2K+</div>
                  <div className="text-xs text-muted-foreground">Buyers</div>
                </div>
              </div>
              <Button variant="sage" size="lg">
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={kitchenImage}
                alt="Cloud Kitchen"
                className="rounded-2xl shadow-card w-full h-64 object-cover"
              />
              <img
                src={handicraftImage}
                alt="Handmade Crafts"
                className="rounded-2xl shadow-card w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section mb-4">How It Works</h2>
            <p className="text-body max-w-2xl mx-auto">
              A simple, transparent way to support the orphanage while getting great products.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Browse Products", desc: "Explore local vendors and their offerings" },
              { step: 2, title: "Make a Purchase", desc: "Buy products you love at fair prices" },
              { step: 3, title: "Auto Donation", desc: "A percentage goes to the orphanage" },
              { step: 4, title: "See Impact", desc: "Track how your purchase helps children" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent font-medium mb-2 block">Browse By</span>
            <h2 className="heading-section">Categories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-card rounded-2xl p-8 shadow-soft card-hover text-center cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <category.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="heading-card mb-2">{category.name}</h3>
                <p className="text-muted-foreground text-sm">{category.count} vendors</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-accent font-medium mb-2 block">Featured</span>
              <h2 className="heading-section">Top Vendors</h2>
            </div>
            <Button variant="outline" asChild>
              <Link to="/earn/vendors">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVendors.map((vendor) => (
              <div key={vendor.id} className="bg-card rounded-2xl overflow-hidden shadow-card card-hover">
                <div className="relative h-48">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                    {vendor.charityPercent}% to charity
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    {vendor.category}
                  </span>
                  <h3 className="heading-card mt-1 mb-2">{vendor.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{vendor.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-gold text-gold" />
                      <span className="font-medium">{vendor.rating}</span>
                      <span className="text-sm text-muted-foreground">({vendor.reviews})</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Visit Shop <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent font-medium mb-2 block">Shop Now</span>
            <h2 className="heading-section">Popular Products</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-card rounded-xl p-4 shadow-soft card-hover">
                <div className="text-4xl text-center mb-3">{product.image}</div>
                <h4 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{product.vendor}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">₹{product.price}</span>
                  <span className="text-xs text-accent">{product.charityPercent}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="sage" size="lg">
              Browse All Products
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Become a Vendor */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-section mb-4">Become a Vendor</h2>
              <p className="text-lg opacity-90 mb-6">
                Are you a small business owner, home cook, or artisan? Join our platform to sell your products while contributing to a noble cause.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Zero listing fees",
                  "Reach caring customers",
                  "Flexible charity percentage (5-25%)",
                  "We handle marketing",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-foreground/20 flex items-center justify-center">
                      <TrendingUp className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/vendor/register">
                  Apply as Vendor
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-accent-foreground/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="font-display text-xl font-semibold mb-4">Vendor Benefits</h3>
              <div className="space-y-4">
                {[
                  { label: "Average Sales Increase", value: "40%" },
                  { label: "Customer Retention", value: "85%" },
                  { label: "Marketing Reach", value: "10,000+" },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-accent-foreground/10 pb-3">
                    <span className="opacity-80">{stat.label}</span>
                    <span className="text-xl font-bold">{stat.value}</span>
                  </div>
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
