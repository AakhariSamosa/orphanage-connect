import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Heart,
  CreditCard,
  Building,
  Wallet,
  Phone,
  CheckCircle,
  Shield,
  Users,
  Calendar as CalendarIcon,
  Loader2,
  Package,
  Banknote,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import { format, isBefore, startOfToday } from "date-fns";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateDonation } from "@/hooks/useDonations";
import { useCreateDonorVisit, getTimeSlots } from "@/hooks/useDonorVisits";
import { useCreateItemDonation } from "@/hooks/useItemDonations";
import { useNeeds } from "@/hooks/useNeeds";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { z } from "zod";
import { cn } from "@/lib/utils";

const donationAmounts = [500, 1000, 2500, 5000, 10000, 25000];

const donationTypes = [
  { id: "one-time", label: "One-Time", icon: Heart },
  { id: "monthly", label: "Monthly", icon: CalendarIcon },
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

type FlowStep =
  | "start"
  | "visit_booking"
  | "visit_confirmed"
  | "method_choice"
  | "money"
  | "money_done"
  | "items"
  | "items_done";

const Donate = () => {
  const [searchParams] = useSearchParams();
  const needIdFromUrl = searchParams.get("need");
  const { user, profile } = useAuth();
  const createDonation = useCreateDonation();
  const createVisit = useCreateDonorVisit();
  const createItemDonation = useCreateItemDonation();
  const { data: needs } = useNeeds();

  const [flowStep, setFlowStep] = useState<FlowStep>("start");
  const [visitDate, setVisitDate] = useState<Date | undefined>();
  const [visitTimeSlot, setVisitTimeSlot] = useState("");
  const [visitForm, setVisitForm] = useState({
    name: profile?.full_name || "",
    email: user?.email || "",
    phone: profile?.phone || "",
    message: "",
  });
  const [selectedNeedId, setSelectedNeedId] = useState<string | null>(needIdFromUrl);

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

  const [itemForm, setItemForm] = useState({
    name: profile?.full_name || "",
    email: user?.email || "",
    phone: profile?.phone || "",
    items_description: "",
    delivery_note: "",
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
  const timeSlots = getTimeSlots();

  const handleBookVisit = async () => {
    if (!visitDate || !visitTimeSlot) {
      toast.error("Please select date and time slot.");
      return;
    }
    const result = z
      .object({
        name: z.string().min(2, "Name is required"),
        email: z.string().email("Valid email is required"),
      })
      .safeParse(visitForm);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    try {
      await createVisit.mutateAsync({
        donor_name: visitForm.name,
        donor_email: visitForm.email,
        donor_phone: visitForm.phone || undefined,
        visit_date: format(visitDate, "yyyy-MM-dd"),
        time_slot: visitTimeSlot,
        need_id: selectedNeedId || undefined,
        message: visitForm.message || undefined,
      });
      setFlowStep("visit_confirmed");
      toast.success("Visit confirmed! We'll see you at the orphanage.");
    } catch {
      toast.error("Failed to book visit. Please try again.");
    }
  };

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
        need_id: selectedNeedId || undefined,
        payment_method: paymentMethod,
        is_recurring: donationType === "monthly",
        message: formData.message || undefined,
      });
      setFlowStep("money_done");
      toast.success("Thank you for your generous donation!");
    } catch {
      toast.error("Failed to process donation. Please try again.");
    }
  };

  const handleSendItems = async () => {
    const result = z
      .object({
        name: z.string().min(2, "Name is required"),
        email: z.string().email("Valid email is required"),
        items_description: z.string().min(5, "Please describe the items you're sending"),
      })
      .safeParse(itemForm);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    try {
      await createItemDonation.mutateAsync({
        donor_name: itemForm.name,
        donor_email: itemForm.email,
        donor_phone: itemForm.phone || undefined,
        items_description: itemForm.items_description,
        delivery_note: itemForm.delivery_note || undefined,
        need_id: selectedNeedId || undefined,
      });
      setFlowStep("items_done");
      toast.success("We've recorded your item donation. Thank you!");
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  const renderStartStep = () => (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-3xl shadow-elevated p-8 md:p-12">
            <h2 className="heading-section mb-2">Current needs</h2>
            <p className="text-muted-foreground mb-6">
              Our required items list is updated in real time. You can fulfill specific needs by visiting in person, donating money, or sending items.
            </p>
            <Button variant="outline" className="mb-8" asChild>
              <Link to="/needs">
                <Package className="w-4 h-4 mr-2" />
                View required items list
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>

            <h3 className="font-display text-lg font-semibold mb-4">Can you visit the orphanage?</h3>
            <p className="text-muted-foreground text-sm mb-6">
              If yes, you can book a visit and bring the exact items we need. If not, you can donate money or send items by delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                className="flex-1"
                onClick={() => setFlowStep("visit_booking")}
              >
                <CalendarDays className="w-5 h-5 mr-2" />
                Yes, I can visit
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => setFlowStep("method_choice")}
              >
                No, I can't visit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderVisitBookingStep = () => (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-3xl shadow-elevated p-8 md:p-12">
            <Button variant="ghost" className="mb-4 -ml-2" onClick={() => setFlowStep("start")}>
              ← Back
            </Button>
            <h2 className="heading-section mb-2">Book your visit</h2>
            <p className="text-muted-foreground mb-6">
              Choose a date and time. Please bring the required items from our needs list when you come.
            </p>

            <div className="space-y-6">
              <div>
                <Label className="mb-2 block">Visit date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !visitDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {visitDate ? format(visitDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={visitDate}
                      onSelect={setVisitDate}
                      disabled={(date) => isBefore(date, startOfToday())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="mb-2 block">Time slot</Label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setVisitTimeSlot(slot)}
                      className={cn(
                        "py-2 px-3 rounded-lg border text-sm transition-colors",
                        visitTimeSlot === slot
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:bg-muted"
                      )}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {needs && needs.length > 0 && (
                <div>
                  <Label className="mb-2 block">Fulfilling this need (optional)</Label>
                  <select
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={selectedNeedId || ""}
                    onChange={(e) => setSelectedNeedId(e.target.value || null)}
                  >
                    <option value="">General visit</option>
                    {needs.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.title} (Qty: {n.quantity_fulfilled}/{n.quantity_needed})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="v-name">Full Name *</Label>
                  <Input
                    id="v-name"
                    value={visitForm.name}
                    onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="v-email">Email *</Label>
                  <Input
                    id="v-email"
                    type="email"
                    value={visitForm.email}
                    onChange={(e) => setVisitForm({ ...visitForm, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="v-phone">Phone</Label>
                  <Input
                    id="v-phone"
                    type="tel"
                    value={visitForm.phone}
                    onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="v-message">Message (optional)</Label>
                  <Textarea
                    id="v-message"
                    value={visitForm.message}
                    onChange={(e) => setVisitForm({ ...visitForm, message: e.target.value })}
                    className="mt-1"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <Button
              variant="hero"
              size="xl"
              className="w-full mt-6"
              onClick={handleBookVisit}
              disabled={createVisit.isPending || !visitDate || !visitTimeSlot}
            >
              {createVisit.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Confirming...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Confirm visit
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );

  const renderVisitConfirmed = () => (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-card rounded-3xl shadow-elevated p-8 md:p-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="heading-section mb-2">Donation path: Visit</h2>
            <p className="text-muted-foreground mb-6">
              Your visit is confirmed. Please come on the chosen date and time with the required items. Your contribution will directly match our current needs.
            </p>
            <Button variant="outline" asChild>
              <Link to="/needs">View required items</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );

  const renderMethodChoice = () => (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-3xl shadow-elevated p-8 md:p-12">
            <Button variant="ghost" className="mb-4 -ml-2" onClick={() => setFlowStep("start")}>
              ← Back
            </Button>
            <h2 className="heading-section mb-2">Donate money or send items</h2>
            <p className="text-muted-foreground mb-6">
              You can make a secure online payment (we use it to buy required items) or arrange to send the required items to the orphanage by delivery.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFlowStep("money")}
                className="p-6 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
              >
                <Banknote className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-display font-semibold mb-1">Donate money</h3>
                <p className="text-sm text-muted-foreground">
                  Secure online payment. We'll use the amount to purchase required items.
                </p>
              </button>
              <button
                type="button"
                onClick={() => setFlowStep("items")}
                className="p-6 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
              >
                <Package className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-display font-semibold mb-1">Send items</h3>
                <p className="text-sm text-muted-foreground">
                  Arrange to send the required items to the orphanage through delivery.
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderMoneyForm = () => (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl shadow-elevated p-8 md:p-12">
            <Button variant="ghost" className="mb-4 -ml-2" onClick={() => setFlowStep("method_choice")}>
              ← Back
            </Button>
            <h2 className="heading-section mb-2">Donate money</h2>
            <p className="text-muted-foreground mb-6">
              Your donation will be used to purchase the required items for our children.
            </p>

            <div className="mb-8">
              <h3 className="font-display text-lg font-semibold mb-4">Donation Type</h3>
              <div className="grid grid-cols-2 gap-4">
                {donationTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setDonationType(type.id)}
                    className={cn(
                      "flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all",
                      donationType === type.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    )}
                  >
                    <type.icon className={cn("w-5 h-5", donationType === type.id ? "text-primary" : "text-muted-foreground")} />
                    <span className={cn("font-medium", donationType === type.id ? "text-primary" : "")}>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-display text-lg font-semibold mb-4">Select Amount</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={cn(
                      "py-3 px-4 rounded-xl font-semibold transition-all",
                      selectedAmount === amount ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                    )}
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

            <div className="mb-8">
              <h3 className="font-display text-lg font-semibold mb-4">Your Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Enter phone number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="pan">PAN (for 80G receipt)</Label>
                  <Input id="pan" placeholder="Enter PAN number" value={formData.pan} onChange={(e) => setFormData({ ...formData, pan: e.target.value })} className="mt-1" />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea id="message" placeholder="Share a message..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="mt-1" rows={3} />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-display text-lg font-semibold mb-4">Payment Method</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all text-center",
                      paymentMethod === method.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    )}
                  >
                    <method.icon className={cn("w-6 h-6 mx-auto mb-2", paymentMethod === method.id ? "text-primary" : "text-muted-foreground")} />
                    <p className={cn("font-medium text-sm", paymentMethod === method.id ? "text-primary" : "")}>{method.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-secondary/50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Donation Amount</span>
                <span className="text-2xl font-display font-bold text-primary">₹{finalAmount?.toLocaleString() || 0}</span>
              </div>
              {donationType === "monthly" && <p className="text-xs text-muted-foreground">This amount will be charged monthly. You can cancel anytime.</p>}
            </div>

            <Button variant="hero" size="xl" className="w-full" onClick={handleDonate} disabled={createDonation.isPending || !finalAmount}>
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
            <p className="text-center text-xs text-muted-foreground mt-4">By donating, you agree to our terms and privacy policy. Donations are eligible for 80G tax exemption.</p>
          </div>
        </div>
      </div>
    </section>
  );

  const renderMoneyDone = () => (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-card rounded-3xl shadow-elevated p-8 md:p-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="heading-section mb-2">Donation completed</h2>
            <p className="text-muted-foreground mb-6">
              Thank you. Your donation will be used to purchase the required items, so your contribution matches our actual needs.
            </p>
            <Button variant="outline" asChild>
              <Link to="/needs">View current needs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );

  const renderItemsForm = () => (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-3xl shadow-elevated p-8 md:p-12">
            <Button variant="ghost" className="mb-4 -ml-2" onClick={() => setFlowStep("method_choice")}>
              ← Back
            </Button>
            <h2 className="heading-section mb-2">Send items</h2>
            <p className="text-muted-foreground mb-6">
              Tell us what you're sending and how you'll deliver. We'll use this to match your contribution to our needs.
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="items">Items you're sending *</Label>
                <Textarea
                  id="items"
                  placeholder="e.g. 2 bags of rice, 5 kg dal, 10 notebooks, clothes (ages 6–10)"
                  value={itemForm.items_description}
                  onChange={(e) => setItemForm({ ...itemForm, items_description: e.target.value })}
                  className="mt-1"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="delivery">Delivery note</Label>
                <Textarea
                  id="delivery"
                  placeholder="Courier name, expected date, tracking if any"
                  value={itemForm.delivery_note}
                  onChange={(e) => setItemForm({ ...itemForm, delivery_note: e.target.value })}
                  className="mt-1"
                  rows={2}
                />
              </div>
              {needs && needs.length > 0 && (
                <div>
                  <Label className="mb-2 block">Related need (optional)</Label>
                  <select
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={selectedNeedId || ""}
                    onChange={(e) => setSelectedNeedId(e.target.value || null)}
                  >
                    <option value="">—</option>
                    {needs.map((n) => (
                      <option key={n.id} value={n.id}>{n.title}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="i-name">Full Name *</Label>
                  <Input id="i-name" value={itemForm.name} onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="i-email">Email *</Label>
                  <Input id="i-email" type="email" value={itemForm.email} onChange={(e) => setItemForm({ ...itemForm, email: e.target.value })} className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="i-phone">Phone</Label>
                  <Input id="i-phone" type="tel" value={itemForm.phone} onChange={(e) => setItemForm({ ...itemForm, phone: e.target.value })} className="mt-1" />
                </div>
              </div>
            </div>
            <Button variant="hero" size="xl" className="w-full mt-6" onClick={handleSendItems} disabled={createItemDonation.isPending}>
              {createItemDonation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Package className="w-5 h-5" />
                  Submit & complete donation
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );

  const renderItemsDone = () => (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-card rounded-3xl shadow-elevated p-8 md:p-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="heading-section mb-2">Donation completed</h2>
            <p className="text-muted-foreground mb-6">
              We've recorded your item donation. Once the items reach us, they'll be matched to our current needs. Thank you!
            </p>
            <Button variant="outline" asChild>
              <Link to="/needs">View current needs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary font-medium mb-2 block">Make a Difference</span>
            <h1 className="heading-display mb-6">
              Your <span className="gradient-text">Generosity</span> Changes Lives
            </h1>
            <p className="text-body mb-8">
              Every contribution — whether you visit in person, donate money, or send items — goes towards our current needs. 100% transparency guaranteed.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm flex-wrap">
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
                <span>Matches real needs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {flowStep === "start" && renderStartStep()}
      {flowStep === "visit_booking" && renderVisitBookingStep()}
      {flowStep === "visit_confirmed" && renderVisitConfirmed()}
      {flowStep === "method_choice" && renderMethodChoice()}
      {flowStep === "money" && renderMoneyForm()}
      {flowStep === "money_done" && renderMoneyDone()}
      {flowStep === "items" && renderItemsForm()}
      {flowStep === "items_done" && renderItemsDone()}

      {(flowStep === "start" || flowStep === "visit_confirmed" || flowStep === "money_done" || flowStep === "items_done") && (
        <section className="py-16 bg-secondary/30">
          <div className="container-custom text-center">
            <h2 className="heading-section mb-4">Other ways to help</h2>
            <p className="text-body mb-8 max-w-2xl mx-auto">
              Browse specific needs, support through Earn & Support, or get in touch.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" size="lg" asChild>
                <Link to="/needs">Children's Needs</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/earn">Earn & Support</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Donate;
