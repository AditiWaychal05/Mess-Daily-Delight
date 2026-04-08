import { LayoutDashboard, UtensilsCrossed, CalendarCheck, ClipboardList, DollarSign, Settings, ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/vendor" },
  { icon: UtensilsCrossed, label: "Menu Management", path: "/vendor/menu" },
  { icon: CalendarCheck, label: "Subscriptions", path: "/vendor/subscriptions" },
  { icon: ClipboardList, label: "Orders", path: "/vendor/orders" },
  { icon: DollarSign, label: "Earnings", path: "/vendor/earnings" },
  { icon: Settings, label: "Settings", path: "/vendor/settings" },
];

const VendorSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen shrink-0 hidden md:flex flex-col">
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h2 className="font-heading font-bold text-lg text-foreground mt-2">Vendor Panel</h2>
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
  );
};

export default VendorSidebar;
