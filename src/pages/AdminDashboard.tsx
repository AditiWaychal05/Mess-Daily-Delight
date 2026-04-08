import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Store, Truck, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, label: "Total Users", value: "3,248", change: "+120 this week" },
  { icon: Store, label: "Active Vendors", value: "86", change: "12 pending" },
  { icon: Truck, label: "Delivery Partners", value: "45", change: "+5 new" },
  { icon: TrendingUp, label: "Revenue", value: "₹12,45,000", change: "+15% growth" },
];

const pendingVendors = [
  { name: "Shree Krishna Mess", location: "Andheri, Mumbai", cuisine: "Gujarati" },
  { name: "Desi Bites", location: "Koramangala, Bangalore", cuisine: "North Indian" },
  { name: "Amma's Kitchen", location: "T. Nagar, Chennai", cuisine: "South Indian" },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Admin Dashboard</h1>

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
            <CardTitle className="font-heading">Pending Vendor Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingVendors.map((vendor) => (
                <div key={vendor.name} className="flex items-center justify-between p-4 bg-muted rounded-xl">
                  <div>
                    <h3 className="font-medium text-foreground">{vendor.name}</h3>
                    <p className="text-sm text-muted-foreground">{vendor.location} • {vendor.cuisine}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="rounded-xl">Approve</Button>
                    <Button size="sm" variant="outline" className="rounded-xl text-destructive border-destructive/30 hover:bg-destructive/5">Reject</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-heading">User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Name</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Email</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Joined</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Rahul Sharma", email: "rahul@email.com", joined: "Jan 2026", status: "Active" },
                    { name: "Priya Patel", email: "priya@email.com", joined: "Feb 2026", status: "Active" },
                    { name: "Amit Kumar", email: "amit@email.com", joined: "Mar 2026", status: "Blocked" },
                  ].map((user, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="py-3 px-2 text-foreground">{user.name}</td>
                      <td className="py-3 px-2 text-muted-foreground">{user.email}</td>
                      <td className="py-3 px-2 text-muted-foreground">{user.joined}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "Active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                        }`}>{user.status}</span>
                      </td>
                      <td className="py-3 px-2">
                        <Button size="sm" variant="ghost" className="text-xs">
                          {user.status === "Active" ? "Block" : "Unblock"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
