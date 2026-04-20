import VendorLayout from "@/components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ClipboardList, DollarSign, Truck, ArrowUpRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { icon: Users, label: "Total Subscribers", value: "142", change: "+12 this week", trend: "up" },
  { icon: ClipboardList, label: "Today's Orders", value: "89", change: "5 pending", trend: "up" },
  { icon: DollarSign, label: "Earnings", value: "₹1,24,500", change: "+8% this month", trend: "up" },
  { icon: Truck, label: "Active Deliveries", value: "23", change: "On track", trend: "up" },
];

const VendorDashboard = () => {
  return (
    <VendorLayout>
      <div className="space-y-6 max-w-7xl">
        {/* Hero greeting */}
        <div className="rounded-2xl bg-gradient-to-r from-primary to-[hsl(28_100%_55%)] p-6 sm:p-8 text-primary-foreground shadow-card-hover overflow-hidden relative">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-primary-foreground/10 blur-2xl" />
          <div className="absolute -right-20 bottom-0 w-64 h-64 rounded-full bg-primary-foreground/5 blur-3xl" />
          <div className="relative">
            <div className="text-xs font-medium uppercase tracking-wider opacity-80">Good afternoon</div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold mt-2">Here's how your mess is performing today.</h1>
            <p className="text-sm opacity-90 mt-2 max-w-xl">You have 5 pending orders and 12 new subscribers this week. Keep up the great work!</p>
            <div className="flex flex-wrap gap-3 mt-5">
              <Button asChild className="rounded-xl bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-card">
                <Link to="/vendor/orders">View orders <ArrowUpRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/vendor/menu">Manage menu</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="shadow-card hover:shadow-card-hover transition-all border-border/60 rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-success mt-1 inline-flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card className="shadow-card border-border/60 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-heading text-lg">Recent Orders</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary">
              <Link to="/vendor/orders">View all <ArrowUpRight className="w-3.5 h-3.5" /></Link>
            </Button>
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
                  </tr>
                </thead>
                <tbody>
                  {[
                    { customer: "Rahul Sharma", meal: "Veg Thali", time: "12:30 PM", status: "Delivered" },
                    { customer: "Priya Patel", meal: "Special Thali", time: "1:00 PM", status: "In Transit" },
                    { customer: "Amit Kumar", meal: "Mini Thali", time: "1:15 PM", status: "Preparing" },
                    { customer: "Sneha Reddy", meal: "Veg Thali", time: "1:30 PM", status: "Preparing" },
                  ].map((order, i) => (
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

export default VendorDashboard;
