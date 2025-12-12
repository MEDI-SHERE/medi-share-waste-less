import { Pill, Users, Recycle, IndianRupee } from 'lucide-react';

const stats = [
  { icon: Pill, value: '10K+', label: 'Medicines Shared' },
  { icon: Users, value: '5K+', label: 'Active Users' },
  { icon: Recycle, value: '2 Tons', label: 'Waste Reduced' },
  { icon: IndianRupee, value: '₹50L+', label: 'Money Saved' },
];

export default function Stats() {
  return (
    <section className="py-16 gradient-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center text-primary-foreground animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <div className="font-display text-3xl md:text-4xl font-bold mb-1">
                {stat.value}
              </div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
