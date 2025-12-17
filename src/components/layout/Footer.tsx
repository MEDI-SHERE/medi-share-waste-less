import { Link } from 'react-router-dom';
import { Pill, Heart, Mail, Phone, MapPin, Sparkles, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-soft">
                <Pill className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-gradient block">Medi-Share</span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">Open Innovation</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting communities to reduce medicine waste and make healthcare affordable for everyone.
            </p>
            <div className="flex items-center gap-2 text-xs">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-muted-foreground">
                Created by <span className="font-semibold text-foreground">CodeMatrix</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-5 text-foreground">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  Search Medicines
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/list" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  List Medicine
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  Dashboard
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Commission & Donate */}
          <div>
            <h4 className="font-display font-semibold mb-5 text-foreground">How It Works</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                <span className="text-gradient font-bold text-lg">10-15%</span>
                <span>Platform commission</span>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-xl bg-accent/10">
                <Heart className="w-5 h-5 text-[hsl(var(--innovation-pink))]" />
                <span>Free donation option</span>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                <MapPin className="w-5 h-5 text-accent" />
                <span>5-10km local radius</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-5 text-foreground">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs">medishere_codematrix@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <span>+91 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-foreground" />
                </div>
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 Medi-Share by CodeMatrix. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-primary transition-colors">Safety Guidelines</Link>
          </div>
        </div>

        {/* Partner Section */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-accent/5 to-[hsl(var(--innovation-pink)/0.05)] border border-dashed border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Partner pharmacy ads space - Contact us for advertising
            <Sparkles className="w-4 h-4 text-accent" />
          </p>
        </div>
      </div>
    </footer>
  );
}