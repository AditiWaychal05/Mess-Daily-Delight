import VendorLayout from "@/components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Upload } from "lucide-react";
import mess1 from "@/assets/mess1.jpg";
import mess2 from "@/assets/mess2.jpg";

const meals = [
  { name: "Veg Thali", price: 80, image: mess1, desc: "Rice, Dal, Sabzi, Roti, Salad" },
  { name: "Special Thali", price: 120, image: mess2, desc: "Rice, Paneer, Dal, 3 Roti, Sweet" },
];

const VendorMenu = () => {
  return (
    <VendorLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-2xl font-bold text-foreground">Menu Management</h1>
          <Button className="rounded-xl gap-2"><Plus className="w-4 h-4" /> Add Meal</Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {meals.map((meal) => (
            <Card key={meal.name} className="shadow-card">
              <CardContent className="p-4 flex gap-4">
                <img src={meal.image} alt={meal.name} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-1 space-y-1">
                  <h3 className="font-heading font-semibold text-foreground">{meal.name}</h3>
                  <p className="text-sm text-muted-foreground">{meal.desc}</p>
                  <p className="font-heading font-bold text-primary">₹{meal.price}</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl self-start">Edit</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-heading">Add New Meal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Meal Name</Label>
                <Input placeholder="e.g. Veg Thali" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Price (₹)</Label>
                <Input type="number" placeholder="80" className="rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Upload Image</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload meal image</p>
              </div>
            </div>
            <Button className="rounded-xl">Save Meal</Button>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorMenu;
