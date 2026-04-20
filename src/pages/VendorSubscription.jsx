import VendorLayout from "@/components/VendorLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Crown, Zap } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const plans = [
  {
    name: "Basic",
    icon: Zap,
    price: 0,
    tagline: "Get started for free",
    features: ["Up to 25 subscribers", "Daily orders dashboard", "Basic analytics", "Email support"],
    cta: "Current plan",
    highlight: false,
  },
  {
    name: "Pro",
    icon: Sparkles,
    price: 999,
    tagline: "For growing mess businesses",
    features: ["Up to 250 subscribers", "Advanced analytics", "Priority listing", "Custom menu themes", "Priority support"],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Premium",
    icon: Crown,
    price: 2499,
    tagline: "Unlimited scale & support",
    features: ["Unlimited subscribers", "Multi-location support", "Dedicated account manager", "Marketing campaigns", "API access", "24/7 phone support"],
    cta: "Go Premium",
    highlight: false,
  },
];

const VendorSubscription = () => {
  return (
    <VendorLayout>
      <div className="space-y-8 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Pricing Plans
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">Choose the plan that fits your kitchen</h1>
          <p className="text-muted-foreground">Simple, transparent pricing. Upgrade or downgrade anytime — no hidden fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative rounded-2xl border-border/60 transition-all hover:-translate-y-1 ${
                plan.highlight
                  ? "shadow-card-hover border-primary/40 ring-2 ring-primary/20 md:scale-105"
                  : "shadow-card hover:shadow-card-hover"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full gradient-orange text-primary-foreground text-xs font-semibold shadow-card">
                  Most Popular
                </div>
              )}
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${plan.highlight ? "gradient-orange text-primary-foreground" : "bg-accent text-primary"}`}>
                    <plan.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.tagline}</p>
                  </div>
                </div>

                <div>
                  <span className="font-heading text-4xl font-bold text-foreground">₹{plan.price}</span>
                  <span className="text-sm text-muted-foreground ml-1">/month</span>
                </div>

                <Button
                  className={`w-full rounded-xl h-11 ${
                    plan.highlight
                      ? "gradient-orange text-primary-foreground shadow-card hover:shadow-card-hover"
                      : ""
                  }`}
                  variant={plan.highlight ? "default" : "outline"}
                  onClick={() => toast({ title: `${plan.name} plan selected`, description: "Payment integration coming soon." })}
                >
                  {plan.cta}
                </Button>

                <div className="space-y-2.5 pt-2 border-t border-border">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="rounded-2xl shadow-card border-border/60">
          <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">Need a custom enterprise plan?</h3>
              <p className="text-sm text-muted-foreground mt-1">Running a chain of mess outlets? Let's build something tailored.</p>
            </div>
            <Button variant="outline" className="rounded-xl">Contact sales</Button>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorSubscription;
