import MessCard from "./MessCard";
import mess1 from "@/assets/mess1.jpg";
import mess2 from "@/assets/mess2.jpg";
import mess3 from "@/assets/mess3.jpg";
import mess4 from "@/assets/mess4.jpg";

const messes = [
  { image: mess1, name: "Annapurna Mess", rating: 4.5, price: 2500, isVeg: true },
  { image: mess2, name: "Dakshin Delight", rating: 4.3, price: 2800, isVeg: true },
  { image: mess3, name: "Punjab Kitchen", rating: 4.7, price: 3200, isVeg: false },
  { image: mess4, name: "Green Bowl Mess", rating: 4.2, price: 2200, isVeg: true },
];

const PopularMess = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
          Popular Mess <span className="text-primary">Near You</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {messes.map((mess) => (
            <MessCard key={mess.name} {...mess} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularMess;
