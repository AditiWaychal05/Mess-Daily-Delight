import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MessCardProps {
  image: string;
  name: string;
  rating: number;
  price: number;
  isVeg: boolean;
}

const MessCard = ({ image, name, rating, price, isVeg }: MessCardProps) => {
  return (
    <div className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group min-w-[280px]">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={640}
          height={512}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge
          className={`absolute top-3 left-3 ${
            isVeg ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"
          } border-0`}
        >
          {isVeg ? "🟢 Veg" : "🔴 Non-Veg"}
        </Badge>
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-heading font-semibold text-lg text-foreground">{name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="text-sm font-medium text-foreground">{rating}</span>
          </div>
          <span className="font-heading font-bold text-primary">₹{price}/mo</span>
        </div>
        <Button className="w-full rounded-xl" size="sm">View Plans</Button>
      </div>
    </div>
  );
};

export default MessCard;
