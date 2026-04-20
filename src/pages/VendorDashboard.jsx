import VendorLayout from "@/components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ClipboardList, DollarSign, Truck, ArrowUpRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import RevenueLineChart from "@/components/charts/RevenueLineChart";
import OrangeBarChart from "@/components/charts/OrangeBarChart";

const stats = [
  { icon: Users, label: "Total Subscribers", value: "142", change: "+12 this week", trend: "up" },
  { icon: ClipboardList, label: "Today's Orders", value: "89", change: "5 pending", trend: "up" },
  { icon: DollarSign, label: "Earnings", value: "₹1,24,500", change: "+8% this month", trend: "up" },
  { icon: Truck, label: "Active Deliveries", value: "23", change: "On track", trend: "up" },
];

const revenueData = [
  { label: "Nov", value: 82000 },
  { label: "Dec", value: 95000 },
  { label: "Jan", value: 88000 },
  { label: "Feb", value: 110000 },
  { label: "Mar", value: 118000 },
  { label: "Apr", value: 124500 },
];

const weeklyOrders = [
  { label: "Mon", value: 64 },
  { label: "Tue", value: 78 },
  { label: "Wed", value: 56 },
  { label: "Thu", value: 92 },
  { label: "Fri", value: 110 },
  { label: "Sat", value: 124 },
  { label: "Sun", value: 89 },
];

const totalRevenue = revenueData.reduce((s, d) => s + d.value, 0);
const lastTwo = revenueData.slice(-2);
const pctChange = (((lastTwo[1].value - lastTwo[0].value) / lastTwo[0].value) * 100).toFixed(1);

const VendorDashboard = () => {
  return (
    <VendorLayout>
      <div className="space-y-6 max-w-7xl">
        {/* Hero greeting */}
        <div className="rounded-2xl gradient-orange p-6 sm:p-8 text-primary-foreground shadow-card-hover overflow-hidden relative animate-fade-in">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-primary-foreground/10 blur-2xl" />
          <div className="absolute -right-20 bottom-0 w-64 h-64 rounded-full bg-primary-foreground/5 blur-3xl" />
          <div className="relative">
            <div className="text-xs font-medium uppercase tracking-wider opacity-80">Good afternoon</div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold mt-2">Here's how your mess is performing today.</h1>
            <p className="text-sm opacity-90 mt-2 max-w-xl">You have 5 pending orders and 12 new subscribers this week. Keep up the great work!</p>
            <div className="flex flex-wrap gap-3 mt-5">
              <Button asChild className="rounded-xl bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-card transition-transform hover:scale-105">
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
          {stats.map((stat, i) => (
            <Card
              key={stat.label}
              className="shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-border/60 rounded-2xl animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center shadow-card">
                  <stat.icon className="w-4 h-4 text-primary-foreground" />
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

        {/* Revenue Overview */}
        <Card className="shadow-card border-border/60 rounded-2xl hover:shadow-card-hover transition-shadow">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="font-heading text-lg">Revenue Overview</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Last 6 months performance</p>
            </div>
            <div className="text-right">
              <div className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                ₹{totalRevenue.toLocaleString()}
              </div>
              <div className="text-xs font-medium text-success inline-flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> +{pctChange}% vs last month
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RevenueLineChart data={revenueData} height={260} />
          </CardContent>
        </Card>

        {/* Weekly Orders bar chart */}
        <Card className="shadow-card border-border/60 rounded-2xl hover:shadow-card-hover transition-shadow">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="font-heading text-lg">Weekly Orders</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Orders received this week</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-heading font-bold text-foreground">
                {weeklyOrders.reduce((s, d) => s + d.value, 0)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Total orders</div>
            </div>
          </CardHeader>
          <CardContent>
            <OrangeBarChart data={weeklyOrders} height={220} valueSuffix=" orders" />
          </CardContent>
        </Card>

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
