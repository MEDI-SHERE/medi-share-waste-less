import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, AlertTriangle, Heart, BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Listing, CATEGORY_LABELS } from '@/lib/types';
import { formatDistanceToNow, format, differenceInMonths } from 'date-fns';

interface ListingCardProps {
  listing: Listing;
  distance?: number;
}

export default function ListingCard({ listing, distance }: ListingCardProps) {
  const navigate = useNavigate();
  const monthsToExpiry = differenceInMonths(new Date(listing.expiry_date), new Date());
  const isExpiringSoon = monthsToExpiry < 3;

  return (
    <Card
      className="overflow-hidden cursor-pointer group hover:shadow-soft transition-all animate-scale-in"
      onClick={() => navigate(`/listing/${listing.id}`)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        {listing.photo_url ? (
          <img
            src={listing.photo_url}
            alt={listing.medicine_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {listing.is_donation && (
            <Badge className="bg-accent text-accent-foreground">
              <Heart className="w-3 h-3 mr-1" />
              Donate
            </Badge>
          )}
          {listing.is_urgent && (
            <Badge variant="destructive">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Urgent
            </Badge>
          )}
          {isExpiringSoon && !listing.is_urgent && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
              Exp. Soon
            </Badge>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="backdrop-blur-sm bg-background/80">
            {CATEGORY_LABELS[listing.category]}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title & Verification */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {listing.medicine_name}
          </h3>
          {listing.bill_url && (
            <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0" />
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-display text-2xl font-bold text-primary">
            ₹{listing.selling_price}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            ₹{listing.original_price}
          </span>
          <Badge variant="secondary" className="bg-accent/10 text-accent">
            50% OFF
          </Badge>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Exp: {format(new Date(listing.expiry_date), 'MMM yyyy')}</span>
          </div>
          {distance !== undefined && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{distance.toFixed(1)} km</span>
            </div>
          )}
          {listing.city && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{listing.city}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
