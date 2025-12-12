import { Camera, Tag, MapPin, HandshakeIcon } from 'lucide-react';

const steps = [
  {
    icon: Camera,
    title: 'Upload Medicine',
    description: 'Take a photo of your unused medicine with visible expiry date',
  },
  {
    icon: Tag,
    title: 'Set Half Price',
    description: 'System auto-calculates 50% of original price for fair deals',
  },
  {
    icon: MapPin,
    title: 'Local Matching',
    description: 'We connect you with buyers within 5-10km of your location',
  },
  {
    icon: HandshakeIcon,
    title: 'Meet & Exchange',
    description: 'Coordinate safely through chat and complete the exchange',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-gradient">Medi-Share</span> Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A simple 4-step process to reduce medicine waste and help your community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Step number connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-border" />
              )}
              
              {/* Icon */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary shadow-soft mb-6 group-hover:shadow-glow transition-all">
                <step.icon className="w-8 h-8 text-primary-foreground" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
