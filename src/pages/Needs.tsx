import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Utensils, Shirt, GraduationCap, Heart, Package, Sparkles, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  { id: "all", name: "All Needs", icon: Package },
  { id: "food", name: "Food & Nutrition", icon: Utensils },
  { id: "clothes", name: "Clothes", icon: Shirt },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "health", name: "Healthcare", icon: Heart },
  { id: "essentials", name: "Daily Essentials", icon: Sparkles },
];

const needsData = [
  {
    id: 1,
    category: "food",
    title: "Monthly Rice Supply",
    description: "50 kg rice needed for monthly meals for all children",
    quantity: "50 kg",
    urgency: "high",
    progress: 60,
    cost: 2500,
  },
  {
    id: 2,
    category: "clothes",
    title: "Winter Sweaters",
    description: "Warm sweaters for children aged 8-14 years",
    quantity: "30 pieces",
    urgency: "high",
    progress: 25,
    cost: 9000,
  },
  {
    id: 3,
    category: "education",
    title: "School Notebooks",
    description: "Notebooks for the new academic year",
    quantity: "200 notebooks",
    urgency: "medium",
    progress: 40,
    cost: 4000,
  },
  {
    id: 4,
    category: "health",
    title: "First Aid Supplies",
    description: "Basic first aid kit supplies and medicines",
    quantity: "Complete kit",
    urgency: "medium",
    progress: 80,
    cost: 3000,
  },
  {
    id: 5,
    category: "food",
    title: "Cooking Oil",
    description: "Monthly supply of cooking oil for kitchen",
    quantity: "20 liters",
    urgency: "medium",
    progress: 50,
    cost: 3000,
  },
  {
    id: 6,
    category: "essentials",
    title: "Toiletries Pack",
    description: "Soap, toothpaste, shampoo for all children",
    quantity: "150 sets",
    urgency: "low",
    progress: 70,
    cost: 7500,
  },
  {
    id: 7,
    category: "education",
    title: "Art Supplies",
    description: "Colors, brushes, drawing sheets for art classes",
    quantity: "50 sets",
    urgency: "low",
    progress: 20,
    cost: 5000,
  },
  {
    id: 8,
    category: "clothes",
    title: "School Uniforms",
    description: "Complete uniform sets for new admissions",
    quantity: "25 sets",
    urgency: "high",
    progress: 35,
    cost: 12500,
  },
];

const Needs = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNeeds = needsData.filter((need) => {
    const matchesCategory = selectedCategory === "all" || need.category === selectedCategory;
    const matchesSearch = need.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      need.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-destructive/10 text-destructive";
      case "medium":
        return "bg-primary/10 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
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
              Browse the specific needs of our children and make a direct impact by fulfilling what they need most. Every contribution, big or small, makes a real difference.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border sticky top-16 md:top-20 z-40">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search needs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
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
          {filteredNeeds.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="heading-card mb-2">No needs found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNeeds.map((need) => {
                const CategoryIcon = categories.find((c) => c.id === need.category)?.icon || Package;
                return (
                  <div
                    key={need.id}
                    className="bg-card rounded-2xl p-6 shadow-soft card-hover"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <CategoryIcon className="w-6 h-6 text-primary" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyStyles(need.urgency)}`}>
                        {need.urgency === "high" ? "Urgent" : need.urgency === "medium" ? "Needed" : "Optional"}
                      </span>
                    </div>

                    <h3 className="heading-card mb-2">{need.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{need.description}</p>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-muted-foreground">Quantity: {need.quantity}</span>
                      <span className="font-semibold text-primary">₹{need.cost.toLocaleString()}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{need.progress}% fulfilled</span>
                        <span className="text-muted-foreground">{100 - need.progress}% remaining</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all"
                          style={{ width: `${need.progress}%` }}
                        />
                      </div>
                    </div>

                    <Button variant="default" className="w-full" asChild>
                      <Link to={`/donate?need=${need.id}`}>
                        Fulfill This Need
                      </Link>
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
              Make a general donation and we'll use it where it's needed most. Or contact us to discuss specific ways you'd like to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/donate">
                  <Heart className="w-5 h-5" />
                  General Donation
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
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
