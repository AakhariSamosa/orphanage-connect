import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Utensils, Shirt, GraduationCap, Heart, Package, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNeeds, type ChildrenNeed } from "@/hooks/useNeeds";
import { useAshram } from "@/contexts/AshramContext";
import type { Database } from "@/integrations/supabase/types";

type NeedCategory = Database['public']['Enums']['need_category'];

const categories = [
  { id: "all", name: "All Needs", icon: Package },
  { id: "food", name: "Food & Nutrition", icon: Utensils },
  { id: "clothing", name: "Clothes", icon: Shirt },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "healthcare", name: "Healthcare", icon: Heart },
  { id: "daily_essentials", name: "Daily Essentials", icon: Sparkles },
];

const Needs = () => {
  const { ashramId, basePath } = useAshram();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: needs, isLoading } = useNeeds(
    selectedCategory !== "all" ? selectedCategory as NeedCategory : undefined,
    ashramId
  );

  const filteredNeeds = needs?.filter((need) => {
    const matchesSearch = need.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (need.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesSearch;
  }) || [];

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-destructive/10 text-destructive";
      case "medium": return "bg-primary/10 text-primary";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case "critical": return "Critical";
      case "high": return "Urgent";
      case "medium": return "Needed";
      default: return "Optional";
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.icon || Package;
  };

  const getProgress = (need: ChildrenNeed) => {
    if (need.quantity_needed === 0) return 100;
    return Math.round((need.quantity_fulfilled / need.quantity_needed) * 100);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary font-medium mb-2 block">Children's Needs</span>
            <h1 className="heading-display mb-6">
              Help Fulfill Their <span className="gradient-text">Dreams</span>
            </h1>
            <p className="text-body mb-8">
              Browse the specific needs of our children and make a direct impact.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border sticky top-16 md:top-20 z-40">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input type="text" placeholder="Search needs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
              {categories.map((category) => (
                <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Needs Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : filteredNeeds.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="heading-card mb-2">No needs found</h3>
              <p className="text-muted-foreground">
                {needs?.length === 0 ? "No needs have been added yet." : "Try adjusting your search or filter."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNeeds.map((need) => {
                const CategoryIcon = getCategoryIcon(need.category);
                const progress = getProgress(need);
                return (
                  <div key={need.id} className="bg-card rounded-2xl p-6 shadow-soft card-hover">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <CategoryIcon className="w-6 h-6 text-primary" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyStyles(need.urgency)}`}>
                        {getUrgencyLabel(need.urgency)}
                      </span>
                    </div>
                    <h3 className="heading-card mb-2">{need.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{need.description || "Help fulfill this need."}</p>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-muted-foreground">Qty: {need.quantity_fulfilled}/{need.quantity_needed}</span>
                      {need.estimated_cost && <span className="font-semibold text-primary">₹{need.estimated_cost.toLocaleString()}</span>}
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{progress}% fulfilled</span>
                        <span className="text-muted-foreground">{100 - progress}% remaining</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                    <Button variant="default" className="w-full" asChild>
                      <Link to={`${basePath}/donate?need=${need.id}`}>Fulfill This Need</Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Custom Donation CTA */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card text-center">
            <h2 className="heading-section mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-body mb-8 max-w-2xl mx-auto">
              Make a general donation and we'll use it where it's needed most.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to={`${basePath}/donate`}>
                  <Heart className="w-5 h-5" />
                  General Donation
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to={`${basePath}/contact`}>
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Needs;
