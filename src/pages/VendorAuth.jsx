import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, User as UserIcon, UtensilsCrossed, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { signIn, signUp, hasAnyVendor } from "@/lib/auth";
import authHero from "@/assets/auth-hero.jpg";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/vendor/dashboard";

  // Show signup first if no vendor has ever registered on this device.
  const [mode, setMode] = useState(hasAnyVendor() ? "login" : "signup");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const isSignup = mode === "signup";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        if (!form.name.trim()) throw new Error("Please enter your name.");
        if (form.password.length < 6) throw new Error("Password must be at least 6 characters.");
        signUp(form);
        toast({ title: "Welcome to MessDaily!", description: "Your vendor account is ready." });
      } else {
        signIn({ email: form.email, password: form.password });
        toast({ title: "Welcome back!", description: "Redirecting to your dashboard..." });
      }
      navigate(from, { replace: true });
    } catch (err) {
      toast({ title: "Oops", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left visual panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <img src={authHero} alt="Fresh homestyle meals" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/40 to-foreground/70" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground w-full">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 backdrop-blur-md flex items-center justify-center border border-primary-foreground/30">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <span className="font-heading font-bold text-xl">MessDaily</span>
          </Link>
          <div className="space-y-6 max-w-md animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur-md border border-primary-foreground/20 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Vendor Portal
            </div>
            <h1 className="font-heading text-4xl xl:text-5xl font-bold leading-tight">
              Grow your mess business with MessDaily.
            </h1>
            <p className="text-base text-primary-foreground/90 leading-relaxed">
              Manage subscriptions, track daily orders, and reach thousands of hungry customers — all from one beautiful dashboard.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: "10k+", label: "Customers" },
                { value: "₹50L+", label: "Paid out" },
                { value: "4.8★", label: "Vendor rating" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-heading font-bold text-2xl">{s.value}</div>
                  <div className="text-xs text-primary-foreground/80 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-primary-foreground/70">© 2026 MessDaily. Crafted for modern food entrepreneurs.</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 gradient-hero">
        <div className="w-full max-w-md animate-fade-in">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl gradient-orange flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">MessDaily</span>
          </Link>

          <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-card p-8">
            <div className="space-y-2 mb-6">
              <h2 className="font-heading text-3xl font-bold text-foreground">
                {isSignup ? "Create your vendor account" : "Welcome back"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isSignup
                  ? "Start serving daily meals to customers in your city."
                  : "Sign in to manage your mess and orders."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="Rahul Sharma"
                      value={form.name}
                      onChange={handleChange}
                      className="pl-10 h-11 rounded-xl"
                      required
                    />
                  </div>
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@messdaily.com"
                    value={form.email}
                    onChange={handleChange}
                    className="pl-10 h-11 rounded-xl"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="pl-10 h-11 rounded-xl"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl gradient-orange text-primary-foreground font-semibold shadow-card hover:shadow-card-hover transition-all gap-2 group"
              >
                {loading ? "Please wait..." : isSignup ? "Create account" : "Sign in"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {isSignup ? "Already have an account?" : "New to MessDaily?"}{" "}
              <button
                type="button"
                onClick={() => setMode(isSignup ? "login" : "signup")}
                className="text-primary font-semibold hover:underline"
              >
                {isSignup ? "Sign in" : "Create one"}
              </button>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-6">
            By continuing you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
