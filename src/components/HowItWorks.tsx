import { Store, ListChecks, Truck } from "lucide-react";

const steps = [
  { icon: Store, title: "Choose Mess", desc: "Browse local mess options and find your perfect match based on cuisine and budget." },
  { icon: ListChecks, title: "Select Plan", desc: "Pick a daily, weekly, or monthly subscription plan that suits your schedule." },
  { icon: Truck, title: "Get Daily Delivery", desc: "Enjoy fresh homestyle meals delivered right to your doorstep every day." },
];

const HowItWorks = () => {
  return (
    <section className="py-16 gradient-hero">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-12">
          How It <span className="text-primary">Works</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center gap-4 animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="w-20 h-20 rounded-2xl gradient-orange flex items-center justify-center shadow-card">
                <step.icon className="w-9 h-9 text-primary-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground">Step {i + 1}: {step.title}</h3>
              <p className="text-muted-foreground text-sm max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
