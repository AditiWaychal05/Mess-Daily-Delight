import { LayoutDashboard, ClipboardList, DollarSign, CreditCard, Settings, ChevronLeft, UtensilsCrossed, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "@/lib/auth";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/vendor/dashboard" },
  { icon: ClipboardList, label: "Orders", path: "/vendor/orders" },
  { icon: DollarSign, label: "Earnings", path: "/vendor/earnings" },
  { icon: CreditCard, label: "Subscription", path: "/vendor/subscription" },
  { icon: Settings, label: "Settings", path: "/vendor/settings" },
];

const VendorSidebar = ({ onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/vendor/auth", { replace: true });
  };

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 shrink-0 hidden md:flex flex-col">
      <div className="p-5 border-b border-border">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl gradient-orange flex items-center justify-center shadow-card">
            <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-heading font-bold text-base text-foreground leading-none">MessDaily</div>
            <div className="text-[11px] text-muted-foreground mt-1">Vendor Portal</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 mb-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to Home
        </Link>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-gradient-to-r from-primary to-[hsl(28_100%_55%)] text-primary-foreground shadow-card"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default VendorSidebar;
