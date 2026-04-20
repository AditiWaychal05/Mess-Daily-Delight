import { useState, useMemo } from "react";
import VendorLayout from "@/components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Check, X, Leaf, Drumstick } from "lucide-react";
import { toast } from "sonner";

const FILTERS = ["All", "Pending", "Preparing", "Delivered", "Cancelled"];

const initial = [
  { id: "ORD-2841", customer: "Rahul Sharma", meal: "Veg Thali", type: "Veg", amount: 120, status: "Pending" },
  { id: "ORD-2842", customer: "Priya Patel", meal: "Special Thali", type: "Veg", amount: 180, status: "Preparing" },
  { id: "ORD-2843", customer: "Amit Kumar", meal: "Chicken Thali", type: "Non-Veg", amount: 210, status: "Delivered" },
  { id: "ORD-2844", customer: "Sneha Reddy", meal: "Veg Thali", type: "Veg", amount: 120, status: "Pending" },
  { id: "ORD-2845", customer: "Vikram Singh", meal: "Mutton Thali", type: "Non-Veg", amount: 260, status: "Preparing" },
  { id: "ORD-2846", customer: "Anita Desai", meal: "Mini Thali", type: "Veg", amount: 90, status: "Cancelled" },
  { id: "ORD-2847", customer: "Karan Mehra", meal: "Special Thali", type: "Veg", amount: 180, status: "Delivered" },
];

const statusStyles = {
  Pending: "bg-warning/10 text-warning",
  Preparing: "bg-accent text-accent-foreground",
  Delivered: "bg-success/10 text-success",
  Cancelled: "bg-destructive/10 text-destructive",
  "In Transit": "bg-warning/10 text-warning",
};

const VendorOrders = () => {
  const [orders, setOrders] = useState(initial);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchFilter = filter === "All" || o.status === filter;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.meal.toLowerCase().includes(q);
      return matchFilter && matchQuery;
    });
  }, [orders, filter, query]);

  const counts = useMemo(() => {
    const map = { All: orders.length };
    FILTERS.slice(1).forEach((f) => (map[f] = orders.filter((o) => o.status === f).length));
    return map;
  }, [orders]);

  const update = (id, status, msg) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    if (status === "Preparing") toast.success(`Order ${id} accepted`, { description: msg });
    else if (status === "Cancelled") toast.error(`Order ${id} rejected`, { description: msg });
    else toast(`Order ${id} updated`, { description: msg });
  };

  return (
    <VendorLayout>
      <div className="space-y-6 max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3 animate-fade-in">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Orders</h1>
            <p className="text-sm text-muted-foreground mt-1">Track and update today's deliveries.</p>
          </div>
        </div>

        <Card className="rounded-2xl shadow-card border-border/60">
          <CardHeader className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="font-heading text-lg">All Orders</CardTitle>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by ID, customer, meal..."
                  className="h-10 pl-9 rounded-xl bg-muted/50 border-border/60 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      active
                        ? "gradient-orange text-primary-foreground shadow-card scale-105"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {f}
                    <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      active ? "bg-primary-foreground/20" : "bg-background/60"
                    }`}>
                      {counts[f] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">Order ID</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">Customer</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">Meal</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">Type</th>
                    <th className="text-right py-3 px-3 text-muted-foreground font-medium">Amount</th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">Status</th>
                    <th className="text-right py-3 px-3 text-muted-foreground font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-muted-foreground">
                        No orders match your search.
                      </td>
                    </tr>
                  )}
                  {filtered.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors"
                    >
                      <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{order.id}</td>
                      <td className="py-3 px-3 text-foreground font-medium">{order.customer}</td>
                      <td className="py-3 px-3 text-foreground">{order.meal}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${
                          order.type === "Veg" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                        }`}>
                          {order.type === "Veg" ? <Leaf className="w-3 h-3" /> : <Drumstick className="w-3 h-3" />}
                          {order.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-semibold text-foreground">₹{order.amount}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-end gap-2">
                          {order.status === "Pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => update(order.id, "Preparing", `${order.customer} • ${order.meal}`)}
                                className="rounded-lg h-8 px-3 gap-1 gradient-orange text-primary-foreground hover:shadow-card-hover transition-all hover:scale-105"
                              >
                                <Check className="w-3.5 h-3.5" /> Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => update(order.id, "Cancelled", `${order.customer} • ${order.meal}`)}
                                className="rounded-lg h-8 px-3 gap-1 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive transition-all"
                              >
                                <X className="w-3.5 h-3.5" /> Reject
                              </Button>
                            </>
                          )}
                          {order.status === "Preparing" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => update(order.id, "Delivered", `${order.customer} • ${order.meal}`)}
                              className="rounded-lg h-8 px-3 text-xs hover:bg-accent transition-all"
                            >
                              Mark Delivered
                            </Button>
                          )}
                          {(order.status === "Delivered" || order.status === "Cancelled") && (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </div>
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
