import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, LogOut, Settings, User as UserIcon, Search } from "lucide-react";
import { getSession, signOut } from "@/lib/auth";

const VendorTopbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const session = getSession() || { name: "Vendor", email: "vendor@messdaily.com" };
  const initial = (session.name?.[0] || "V").toUpperCase();

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = () => {
    signOut();
    navigate("/vendor/auth", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="hidden sm:flex items-center bg-muted rounded-full px-4 py-2 w-full">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Search orders, customers..."
            className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button className="relative w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
        </button>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 rounded-full gradient-orange flex items-center justify-center text-primary-foreground font-semibold text-sm shadow-card">
              {initial}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium text-foreground leading-none">{session.name}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Vendor</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-card-hover overflow-hidden animate-fade-in">
              <div className="p-3 border-b border-border">
                <div className="text-sm font-semibold text-foreground truncate">{session.name}</div>
                <div className="text-xs text-muted-foreground truncate">{session.email}</div>
              </div>
              <div className="p-1">
                <Link
                  to="/vendor/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-muted-foreground" /> Profile
                </Link>
                <Link
                  to="/vendor/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4 text-muted-foreground" /> Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default VendorTopbar;
