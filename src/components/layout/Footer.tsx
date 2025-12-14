import { Link } from 'react-router-dom';
import { Pill, Heart, Mail, Phone, MapPin } from 'lucide-react';
export default function Footer() {
  return <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Pill className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-gradient">Medi-Share</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting communities to reduce medicine waste and make healthcare affordable.
            </p>
            <p className="text-xs text-muted-foreground">
              Created by <span className="font-semibold text-primary">CodeMatrix</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors">
                  Search Medicines
                </Link>
              </li>
              <li>
                <Link to="/list" className="text-muted-foreground hover:text-primary transition-colors">
                  List Medicine
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Commission & Donate */}
          <div>
            <h4 className="font-display font-semibold mb-4">How It Works</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-semibold">10-15%</span>
                Platform commission on sales
              </li>
              <li className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-accent mt-0.5" />
                Free donation option available
              </li>
              <li>5-10km local delivery radius</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@medishare.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +91 123 456 7890
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2025Medi-Share by CodeMatrix. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-primary transition-colors">Safety Guidelines</Link>
          </div>
        </div>

        {/* Pharmacy Ads Placeholder */}
        <div className="mt-8 p-4 border border-dashed border-border rounded-lg text-center">
          <p className="text-xs text-muted-foreground">
            📢 Partner pharmacy ads space - Contact us for advertising
          </p>
        </div>
      </div>
    </footer>;
}