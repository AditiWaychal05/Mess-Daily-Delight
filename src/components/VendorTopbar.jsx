import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User as UserIcon,
  Search,
  CheckCircle2,
  XCircle,
  CreditCard,
  Clock,
  Sparkles,
  Truck,
  CheckCheck,
} from "lucide-react";
import { getSession, signOut } from "@/lib/auth";

const seedNotifications = [
  {
    id: 1,
    type: "delivered",
    title: "Order delivered",
    desc: "Order #ORD-2843 delivered to Amit Kumar.",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    type: "payment_done",
    title: "Payment received",
    desc: "₹1,800 received from Priya Patel for monthly plan.",
    time: "12m ago",
    unread: true,
  },
  {
    id: 3,
    type: "rejected",
    title: "Order rejected",
    desc: "Order #ORD-2846 was cancelled by Anita Desai.",
    time: "28m ago",
    unread: true,
  },
  {
    id: 4,
    type: "delay",
    title: "Delivery running late",
    desc: "Rider Suresh is delayed by 10 min for ORD-2842.",
    time: "45m ago",
    unread: true,
  },
  {
    id: 5,
    type: "subscription",
    title: "New subscription",
    desc: "Rahul Sharma subscribed to the Pro Veg plan.",
    time: "1h ago",
    unread: false,
  },
  {
    id: 6,
    type: "payment_pending",
    title: "Payment pending",
    desc: "Vikram Singh has a pending payment of ₹260.",
    time: "2h ago",
    unread: false,
  },
  {
    id: 7,
    type: "delivered",
    title: "Order delivered",
    desc: "Order #ORD-2840 delivered to Karan Mehra.",
    time: "3h ago",
    unread: false,
  },
  {
    id: 8,
    type: "subscription",
    title: "Subscription renewed",
    desc: "Sneha Reddy renewed her weekly tiffin plan.",
    time: "5h ago",
    unread: false,
  },
];

const iconFor = (type) => {
  switch (type) {
    case "delivered":
      return { Icon: CheckCircle2, cls: "bg-success/10 text-success" };
    case "rejected":
      return { Icon: XCircle, cls: "bg-destructive/10 text-destructive" };
    case "payment_done":
      return { Icon: CreditCard, cls: "bg-success/10 text-success" };
    case "payment_pending":
      return { Icon: Clock, cls: "bg-warning/10 text-warning" };
    case "subscription":
      return { Icon: Sparkles, cls: "bg-primary/10 text-primary" };
    case "delay":
      return { Icon: Truck, cls: "bg-warning/10 text-warning" };
    default:
      return { Icon: Bell, cls: "bg-muted text-muted-foreground" };
  }
};

const VendorTopbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(seedNotifications);
  const ref = useRef(null);
  const notifRef = useRef(null);
  const session = getSession() || { name: "Vendor", email: "vendor@messdaily.com" };
  const initial = (session.name?.[0] || "V").toUpperCase();
  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = () => {
    signOut();
    navigate("/vendor/auth", { replace: true });
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markOne = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
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
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-card animate-fade-in">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-[22rem] max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-card-hover overflow-hidden animate-fade-in">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div>
                  <div className="text-sm font-semibold text-foreground">Notifications</div>
                  <div className="text-[11px] text-muted-foreground">
                    {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}
                  </div>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-[26rem] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center text-sm text-muted-foreground">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((n) => {
                    const { Icon, cls } = iconFor(n.type);
                    return (
                      <button
                        key={n.id}
                        onClick={() => markOne(n.id)}
                        className={`w-full text-left flex items-start gap-3 px-4 py-3 border-b border-border/60 last:border-0 hover:bg-muted/60 transition-colors ${
                          n.unread ? "bg-primary/[0.04]" : ""
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cls}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-foreground truncate">
                              {n.title}
                            </div>
                            {n.unread && (
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                            {n.desc}
                          </div>
                          <div className="text-[10px] text-muted-foreground/80 mt-1">{n.time}</div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              <div className="px-3 py-2 border-t border-border bg-muted/30">
                <Link
                  to="/vendor/orders"
                  onClick={() => setNotifOpen(false)}
                  className="block text-center text-xs font-medium text-primary hover:text-primary/80 py-1.5 transition-colors"
                >
                  View all activity
                </Link>
              </div>
            </div>
          )}
        </div>

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
