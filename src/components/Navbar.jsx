import { Search, User, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-lg gradient-orange flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">MessDaily</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Browse Messes</Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </div>

        <div className="hidden lg:flex items-center bg-muted rounded-full px-4 py-2 flex-1 max-w-sm">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Search mess or cuisine..."
            className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-center gap-3">
          <Link to="/" className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            My Subscriptions
          </Link>
          <Link to="/" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors">
            <User className="w-4 h-4 text-muted-foreground" />
          </Link>
          <Button asChild size="sm" className="rounded-full"><Link to="/vendor/auth">Sign In</Link></Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
