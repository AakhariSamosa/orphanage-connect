import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, CreditCard, Building, Wallet, Phone, CheckCircle, Shield, Users, Calendar, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateDonation } from "@/hooks/useDonations";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { z } from "zod";

const donationAmounts = [500, 1000, 2500, 5000, 10000, 25000];

const donationTypes = [
  { id: "one-time", label: "One-Time", icon: Heart },
  { id: "monthly", label: "Monthly", icon: Calendar },
];

const paymentMethods = [
  { id: "upi", name: "UPI", icon: Phone, description: "Google Pay, PhonePe, Paytm" },
  { id: "card", name: "Card", icon: CreditCard, description: "Debit/Credit Card" },
  { id: "netbanking", name: "Net Banking", icon: Building, description: "All Indian Banks" },
  { id: "wallet", name: "Wallet", icon: Wallet, description: "Digital Wallets" },
];

const donationSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  amount: z.number().min(1, "Amount must be at least ₹1"),
});

const Donate = () => {
  const { user, profile } = useAuth();
  const createDonation = useCreateDonation();
  
  const [donationType, setDonationType] = useState("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [formData, setFormData] = useState({
    name: profile?.full_name || "",
    email: user?.email || "",
    phone: profile?.phone || "",
    pan: "",
    message: "",
  });

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  const handleDonate = async () => {
    const result = donationSchema.safeParse({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      amount: finalAmount,
    });
    
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    
    try {
      await createDonation.mutateAsync({
        donor_name: formData.name,
        donor_email: formData.email,
        donor_phone: formData.phone || undefined,
        amount: finalAmount!,
        donation_type: donationType === "monthly" ? "recurring" : "general",
        payment_method: paymentMethod,
        is_recurring: donationType === "monthly",
        message: formData.message || undefined,
      });
      
      toast.success("Thank you for your generous donation! You'll receive a confirmation email shortly.");
      setFormData({ name: "", email: "", phone: "", pan: "", message: "" });
      setSelectedAmount(1000);
    } catch (error) {
      toast.error("Failed to process donation. Please try again.");
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary font-medium mb-2 block">Make a Difference</span>
            <h1 className="heading-display mb-6">
              Your <span className="gradient-text">Generosity</span> Changes Lives
            </h1>
            <p className="text-body mb-8">
              Every rupee you donate goes directly towards providing food, education, healthcare, and a loving home for our children. 100% transparency guaranteed.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>80G Tax Exempt</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                <span>5000+ Donors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-3xl shadow-elevated p-8 md:p-12">
              {/* Donation Type */}
              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold mb-4">Donation Type</h3>
                <div className="grid grid-cols-2 gap-4">
                  {donationTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setDonationType(type.id)}
                      className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        donationType === type.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <type.icon className={`w-5 h-5 ${donationType === type.id ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`font-medium ${donationType === type.id ? "text-primary" : ""}`}>
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold mb-4">Select Amount</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                        selectedAmount === amount
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      ₹{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">₹</span>
                  <Input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmount(e.target.value)}
                    className="pl-8 h-12"
                  />
                </div>
              </div>

              {/* Personal Details */}
              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold mb-4">Your Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pan">PAN (for 80G receipt)</Label>
                    <Input
                      id="pan"
                      placeholder="Enter PAN number"
                      value={formData.pan}
                      onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Share a message with our children..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold mb-4">Payment Method</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <method.icon className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === method.id ? "text-primary" : "text-muted-foreground"}`} />
                      <p className={`font-medium text-sm ${paymentMethod === method.id ? "text-primary" : ""}`}>
                        {method.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary & Submit */}
              <div className="bg-secondary/50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Donation Amount</span>
                  <span className="text-2xl font-display font-bold text-primary">
                    ₹{finalAmount?.toLocaleString() || 0}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {donationType === "monthly" && "This amount will be charged monthly. You can cancel anytime."}
                </p>
              </div>

              <Button 
                variant="hero" 
                size="xl" 
                className="w-full"
                onClick={handleDonate}
                disabled={createDonation.isPending || !finalAmount}
              >
                {createDonation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5" />
                    Donate ₹{finalAmount?.toLocaleString() || 0} {donationType === "monthly" ? "Monthly" : "Now"}
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                By donating, you agree to our terms and privacy policy. Donations are eligible for 80G tax exemption.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">Trusted by thousands of donors</p>
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-5 h-5 text-accent" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Registered NGO</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="w-5 h-5 text-accent" />
                  <span>FCRA Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom text-center">
          <h2 className="heading-section mb-4">Other Ways to Help</h2>
          <p className="text-body mb-8 max-w-2xl mx-auto">
            Don't want to donate money? You can also help by fulfilling specific needs or supporting through our Earn & Support program.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg" asChild>
              <Link to="/needs">Browse Children's Needs</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/earn">Earn & Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;
