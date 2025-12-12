import { useNavigate } from 'react-router-dom';
import { Heart, Activity, Pill, Syringe, Thermometer, Wind, Apple, MoreHorizontal } from 'lucide-react';
import { MedicineCategory, CATEGORY_LABELS } from '@/lib/types';

const categories: { key: MedicineCategory; icon: React.ElementType; color: string }[] = [
  { key: 'blood_pressure', icon: Activity, color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
  { key: 'diabetes', icon: Syringe, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  { key: 'cancer', icon: Pill, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
  { key: 'pain_relief', icon: Thermometer, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' },
  { key: 'heart', icon: Heart, color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' },
  { key: 'respiratory', icon: Wind, color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400' },
  { key: 'vitamins', icon: Apple, color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
  { key: 'other', icon: MoreHorizontal, color: 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400' },
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find medicines for chronic conditions like BP, diabetes, and more
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <button
              key={cat.key}
              onClick={() => navigate(`/search?category=${cat.key}`)}
              className="p-6 rounded-2xl bg-card shadow-card hover:shadow-soft transition-all group animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`w-14 h-14 rounded-xl ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display font-semibold text-sm md:text-base">
                {CATEGORY_LABELS[cat.key]}
              </h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
