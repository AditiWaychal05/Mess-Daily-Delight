import VendorLayout from "@/components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ClipboardList, DollarSign, Truck } from "lucide-react";

const stats = [
  { icon: Users, label: "Total Subscribers", value: "142", change: "+12 this week" },
  { icon: ClipboardList, label: "Today's Orders", value: "89", change: "5 pending" },
  { icon: DollarSign, label: "Earnings", value: "₹1,24,500", change: "+8% this month" },
  { icon: Truck, label: "Active Deliveries", value: "23", change: "On track" },
];

const VendorDashboard = () => {
  return (
    <VendorLayout>
      <div className="space-y-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-heading">Recent Orders</CardTitle>
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
                  ].map((order, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="py-3 px-2 text-foreground">{order.customer}</td>
                      <td className="py-3 px-2 text-foreground">{order.meal}</td>
                      <td className="py-3 px-2 text-muted-foreground">{order.time}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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
