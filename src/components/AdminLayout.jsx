import { LayoutDashboard, Users, Store, Truck, BarChart3, ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Store, label: "Vendors", path: "/admin/vendors" },
  { icon: Truck, label: "Delivery Partners", path: "/admin/delivery" },
  { icon: BarChart3, label: "Reports", path: "/admin/reports" },
];

const AdminLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen" style={{ background: "hsl(220 14% 96%)" }}>
      <aside className="w-64 bg-card border-r border-border min-h-screen shrink-0 hidden md:flex flex-col">
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h2 className="font-heading font-bold text-lg text-foreground mt-2">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
