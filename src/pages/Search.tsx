import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search as SearchIcon, Filter, MapPin, AlertTriangle, Heart, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ListingCard from '@/components/listings/ListingCard';
import MapboxMap from '@/components/map/MapboxMap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { Listing, MedicineCategory, CATEGORY_LABELS } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<MedicineCategory | 'all'>(
    (searchParams.get('category') as MedicineCategory) || 'all'
  );
  const [radius, setRadius] = useState([10]);
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [donationOnly, setDonationOnly] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    fetchListings();
  }, [category, urgentOnly, donationOnly]);

  const fetchListings = async () => {
    setLoading(true);
    let query = supabase
      .from('listings')
      .select('*')
      .eq('status', 'active')
      .gte('expiry_date', new Date().toISOString().split('T')[0])
      .order('created_at', { ascending: false });

    if (category !== 'all') {
      query = query.eq('category', category);
    }
    if (urgentOnly) {
      query = query.eq('is_urgent', true);
    }
    if (donationOnly) {
      query = query.eq('is_donation', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching listings:', error);
    } else {
      setListings((data as Listing[]) || []);
    }
    setLoading(false);
  };

  const filteredListings = listings.filter((listing) =>
    listing.medicine_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already reactive via filteredListings
  };

  const clearFilters = () => {
    setCategory('all');
    setUrgentOnly(false);
    setDonationOnly(false);
    setRadius([10]);
    setSearchTerm('');
    setSearchParams({});
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={category} onValueChange={(value) => setCategory(value as MedicineCategory | 'all')}>
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Radius */}
      <div className="space-y-2">
        <Label>Distance: {radius[0]} km</Label>
        <Slider value={radius} onValueChange={setRadius} max={20} min={1} step={1} />
      </div>

      {/* Toggles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <Label htmlFor="urgent">Urgent Only</Label>
          </div>
          <Switch id="urgent" checked={urgentOnly} onCheckedChange={setUrgentOnly} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-accent" />
            <Label htmlFor="donate">Donations Only</Label>
          </div>
          <Switch id="donate" checked={donationOnly} onCheckedChange={setDonationOnly} />
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        <X className="w-4 h-4 mr-2" />
        Clear Filters
      </Button>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Search Medicines - Medi-Share</title>
        <meta name="description" content="Search for unused medicines in your area at half price. Filter by category, distance, and more." />
      </Helmet>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Find Medicines <span className="text-gradient">Near You</span>
            </h1>
            <p className="text-muted-foreground">
              Search from {listings.length} active listings in your area
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" className="gradient-primary text-primary-foreground">
              Search
            </Button>
            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>
          </form>

          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-24 p-6 rounded-2xl bg-card shadow-card">
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </h3>
                <FiltersContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Map Toggle */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {filteredListings.length} result{filteredListings.length !== 1 ? 's' : ''}
                </p>
                <Button
                  variant={showMap ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowMap(!showMap)}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {showMap ? 'Hide Map' : 'Show Map'}
                </Button>
              </div>

              {/* Map */}
              {showMap && (
                <div className="mb-6">
                  <MapboxMap listings={filteredListings} className="h-[300px]" />
                </div>
              )}

              {/* Results Grid */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="h-48 w-full rounded-xl" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : filteredListings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <SearchIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">No medicines found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search term
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
