import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Loader2, MapPin, Calendar, BadgeCheck, Heart, AlertTriangle, MessageSquare, ArrowLeft } from 'lucide-react';
import { format, differenceInMonths } from 'date-fns';
import Layout from '@/components/layout/Layout';
import MapboxMap from '@/components/map/MapboxMap';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Listing, Profile, CATEGORY_LABELS } from '@/lib/types';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [listing, setListing] = useState<Listing | null>(null);
  const [seller, setSeller] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    if (!id) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) {
      navigate('/search');
      return;
    }

    setListing(data as Listing);

    // Fetch seller profile
    const { data: sellerData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user_id)
      .maybeSingle();

    setSeller(sellerData as Profile | null);
    setLoading(false);
  };

  const handleSendMessage = async () => {
    if (!user || !listing || !message.trim()) return;

    setSendingMessage(true);
    const { error } = await supabase.from('messages').insert({
      listing_id: listing.id,
      sender_id: user.id,
      receiver_id: listing.user_id,
      content: message.trim(),
    });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send message',
      });
    } else {
      toast({
        title: 'Message sent!',
        description: 'The seller will be notified.',
      });
      setMessage('');
    }
    setSendingMessage(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!listing) {
    return null;
  }

  const monthsToExpiry = differenceInMonths(new Date(listing.expiry_date), new Date());
  const isOwnListing = user?.id === listing.user_id;

  return (
    <>
      <Helmet>
        <title>{listing.medicine_name} - Medi-Share</title>
        <meta name="description" content={`Buy ${listing.medicine_name} at ₹${listing.selling_price} on Medi-Share.`} />
      </Helmet>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
                {listing.photo_url ? (
                  <img
                    src={listing.photo_url}
                    alt={listing.medicine_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Map */}
              <MapboxMap
                listings={[listing]}
                center={[listing.location_lng, listing.location_lat]}
                className="h-[200px]"
              />
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{CATEGORY_LABELS[listing.category]}</Badge>
                {listing.is_donation && (
                  <Badge className="bg-accent text-accent-foreground">
                    <Heart className="w-3 h-3 mr-1" />
                    Donation
                  </Badge>
                )}
                {listing.is_urgent && (
                  <Badge variant="destructive">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Urgent
                  </Badge>
                )}
                {listing.bill_url && (
                  <Badge className="bg-primary/10 text-primary">
                    <BadgeCheck className="w-3 h-3 mr-1" />
                    Bill Verified
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl md:text-4xl font-bold">
                {listing.medicine_name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl font-bold text-primary">
                  {listing.is_donation ? 'FREE' : `₹${listing.selling_price}`}
                </span>
                {!listing.is_donation && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{listing.original_price}
                    </span>
                    <Badge className="bg-accent/10 text-accent">50% OFF</Badge>
                  </>
                )}
              </div>

              {/* Description */}
              {listing.description && (
                <p className="text-muted-foreground">{listing.description}</p>
              )}

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Expiry Date</p>
                      <p className="font-semibold">{format(new Date(listing.expiry_date), 'MMM yyyy')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold">{listing.city || 'Not specified'}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Seller Info */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={seller?.avatar_url || ''} />
                      <AvatarFallback className="gradient-primary text-primary-foreground">
                        {seller?.full_name?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{seller?.full_name || 'Anonymous Seller'}</p>
                      <p className="text-sm text-muted-foreground">
                        Listed {format(new Date(listing.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                    {seller?.is_verified && (
                      <BadgeCheck className="w-5 h-5 text-primary ml-auto" />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Seller */}
              {!isOwnListing && (
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <h3 className="font-display font-semibold flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Contact Seller
                    </h3>
                    {user ? (
                      <>
                        <Textarea
                          placeholder="Hi, I'm interested in this medicine..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button
                          className="w-full gradient-primary text-primary-foreground"
                          onClick={handleSendMessage}
                          disabled={sendingMessage || !message.trim()}
                        >
                          {sendingMessage && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                          Send Message
                        </Button>
                      </>
                    ) : (
                      <Button className="w-full" onClick={() => navigate('/auth')}>
                        Sign in to contact seller
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
