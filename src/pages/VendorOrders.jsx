import VendorLayout from "@/components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const initial = [
  { customer: "Rahul Sharma", meal: "Veg Thali", time: "12:30 PM", status: "Preparing" },
  { customer: "Priya Patel", meal: "Special Thali", time: "1:00 PM", status: "Preparing" },
  { customer: "Amit Kumar", meal: "Mini Thali", time: "1:15 PM", status: "Delivered" },
  { customer: "Sneha Reddy", meal: "Veg Thali", time: "1:30 PM", status: "In Transit" },
  { customer: "Vikram Singh", meal: "Special Thali", time: "1:45 PM", status: "Preparing" },
];

const VendorOrders = () => {
  const [orders, setOrders] = useState(initial);

  const markDelivered = (i) => {
    setOrders((prev) => prev.map((o, idx) => (idx === i ? { ...o, status: "Delivered" } : o)));
    toast({ title: "Order marked delivered", description: orders[i].customer });
  };

  return (
    <VendorLayout>
      <div className="space-y-6 max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Orders</h1>
            <p className="text-sm text-muted-foreground mt-1">Track and update today's deliveries.</p>
          </div>
          <Button variant="outline" className="rounded-xl gap-2"><Filter className="w-4 h-4" /> Filter</Button>
        </div>

        <Card className="rounded-2xl shadow-card border-border/60">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Today's Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Customer</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Meal</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Time</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                      <td className="py-3 px-2 text-foreground font-medium">{order.customer}</td>
                      <td className="py-3 px-2 text-foreground">{order.meal}</td>
                      <td className="py-3 px-2 text-muted-foreground">{order.time}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          order.status === "Delivered" ? "bg-success/10 text-success" :
                          order.status === "In Transit" ? "bg-warning/10 text-warning" :
                          "bg-accent text-accent-foreground"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        {order.status !== "Delivered" && (
                          <Button size="sm" variant="outline" className="rounded-xl text-xs" onClick={() => markDelivered(i)}>
                            Mark Delivered
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorOrders;
