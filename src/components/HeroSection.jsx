import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroFood from "@/assets/hero-food.jpg";

const HeroSection = () => {
  return (
    <section className="gradient-hero">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Daily Fresh Homestyle Meals{" "}
              <span className="text-primary">Delivered to Your Door</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Subscribe to your favorite local mess and enjoy fresh, homemade tiffin meals delivered daily. Affordable, healthy, and hassle-free.
            </p>

            <div className="bg-card rounded-2xl shadow-card p-2 flex flex-col sm:flex-row gap-2 max-w-xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-muted rounded-xl flex-1">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <input
                  type="text"
                  placeholder="Your location"
                  className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex items-center gap-2 px-4 py-3 bg-muted rounded-xl flex-1">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search mess or cuisine"
                  className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button className="rounded-xl px-6 shrink-0">Find Mess</Button>
            </div>
          </div>

          <div className="hidden md:block animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="absolute inset-0 gradient-orange rounded-3xl rotate-3 opacity-20" />
              <img
                src={heroFood}
                alt="Delicious homestyle thali meal"
                width={1280}
                height={720}
                className="relative rounded-3xl shadow-card-hover object-cover w-full aspect-[16/10]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
