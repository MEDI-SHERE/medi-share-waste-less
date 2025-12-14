import { useNavigate } from 'react-router-dom';
import { MapPin, PlusCircle, Recycle, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden gradient-hero py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Recycle className="w-4 h-4" />
            Reduce Medicine Waste, Save Lives
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Buy & Sell Unused Medicines at{' '}
            <span className="text-gradient">Half Price</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Connect with people in your city (5-10km radius) to find BP, diabetes, cancer medicines 
            and more. Safe, local, affordable healthcare for everyone.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              size="lg"
              className="gradient-primary text-primary-foreground shadow-soft hover:shadow-glow transition-all text-lg px-8"
              onClick={() => navigate('/list')}
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              List Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-2"
              onClick={() => navigate('/search')}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Search Near Me
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Verified Sellers</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Local Only (5-10km)</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-accent" />
              <span>Donate Option</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
