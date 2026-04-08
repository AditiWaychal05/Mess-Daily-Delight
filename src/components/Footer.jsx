import { UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-orange flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-lg">MessDaily</span>
            </div>
            <p className="text-sm opacity-70">Subscription-based tiffin delivery platform connecting you with local mess services.</p>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm opacity-70">
              <Link to="/" className="block hover:opacity-100 transition-opacity">Browse Messes</Link>
              <Link to="/" className="block hover:opacity-100 transition-opacity">My Subscriptions</Link>
              <Link to="/vendor" className="block hover:opacity-100 transition-opacity">For Vendors</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Support</h4>
            <div className="space-y-2 text-sm opacity-70">
              <Link to="/" className="block hover:opacity-100 transition-opacity">Help Center</Link>
              <Link to="/" className="block hover:opacity-100 transition-opacity">Terms of Service</Link>
              <Link to="/" className="block hover:opacity-100 transition-opacity">Privacy Policy</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Contact</h4>
            <div className="space-y-2 text-sm opacity-70">
              <p>hello@messdaily.com</p>
              <p>+91 98765 43210</p>
              <p>Mumbai, India</p>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-sm opacity-50">
          © 2026 MessDaily. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
