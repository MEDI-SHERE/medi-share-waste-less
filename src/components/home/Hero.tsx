import { useNavigate } from 'react-router-dom';
import { MapPin, PlusCircle, Recycle, Shield, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center gradient-mesh">
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-[20%] w-72 h-72 bg-[hsl(var(--innovation-purple)/0.15)] rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-[hsl(var(--innovation-teal)/0.12)] rounded-full blur-[120px] animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-1/2 right-[5%] w-64 h-64 bg-[hsl(var(--innovation-orange)/0.1)] rounded-full blur-[80px] animate-float" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-10 left-[30%] w-48 h-48 bg-[hsl(var(--innovation-pink)/0.1)] rounded-full blur-[60px] animate-pulse-soft" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-primary text-sm font-semibold mb-8 animate-fade-in shadow-soft">
            <Sparkles className="w-4 h-4" />
            Open Innovation in Healthcare
            <Recycle className="w-4 h-4" />
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in leading-tight" style={{ animationDelay: '0.1s' }}>
            Buy & Sell Unused Medicines at{' '}
            <span className="text-gradient relative">
              Half Price
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                    <stop stopColor="hsl(262, 83%, 58%)" />
                    <stop offset="1" stopColor="hsl(173, 80%, 40%)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Connect with people in your city (5-10km radius) to find BP, diabetes, cancer medicines 
            and more. Safe, local, affordable healthcare for everyone.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              size="lg"
              className="gradient-primary text-primary-foreground shadow-soft hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 rounded-2xl font-semibold"
              onClick={() => navigate('/list')}
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              List Your Medicine
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-2xl border-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 font-semibold"
              onClick={() => navigate('/search')}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Search Near Me
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-card">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Verified Sellers</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-card">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Local Only (5-10km)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-card">
              <Heart className="w-5 h-5 text-[hsl(var(--innovation-pink))]" />
              <span className="text-sm font-medium">Donate Option</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}