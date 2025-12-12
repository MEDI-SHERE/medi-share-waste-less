import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Loader2, PlusCircle, Package, ShoppingBag, MessageSquare, Settings, Trash2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ListingCard from '@/components/listings/ListingCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Listing, Profile } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchData();
    }
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    if (!user) return;

    setLoading(true);

    // Fetch profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    setProfile(profileData as Profile | null);

    // Fetch my listings
    const { data: listingsData } = await supabase
      .from('listings')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setMyListings((listingsData as Listing[]) || []);
    setLoading(false);
  };

  const handleDeleteListing = async (listingId: string) => {
    const { error } = await supabase.from('listings').delete().eq('id', listingId);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete listing',
      });
    } else {
      toast({
        title: 'Deleted',
        description: 'Listing has been removed',
      });
      setMyListings(myListings.filter((l) => l.id !== listingId));
    }
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const activeListings = myListings.filter((l) => l.status === 'active');
  const soldListings = myListings.filter((l) => l.status === 'sold');

  return (
    <>
      <Helmet>
        <title>Dashboard - Medi-Share</title>
        <meta name="description" content="Manage your medicine listings and messages on Medi-Share." />
      </Helmet>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Profile */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={profile?.avatar_url || ''} />
                      <AvatarFallback className="gradient-primary text-primary-foreground text-2xl">
                        {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="font-display text-xl font-semibold mb-1">
                      {profile?.full_name || 'User'}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">{user?.email}</p>
                    {profile?.city && (
                      <p className="text-sm text-muted-foreground mb-4">📍 {profile.city}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 rounded-lg bg-muted">
                      <div className="font-display text-2xl font-bold text-primary">
                        {activeListings.length}
                      </div>
                      <div className="text-xs text-muted-foreground">Active</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted">
                      <div className="font-display text-2xl font-bold text-accent">
                        {soldListings.length}
                      </div>
                      <div className="text-xs text-muted-foreground">Sold</div>
                    </div>
                  </div>

                  <Button className="w-full gradient-primary text-primary-foreground" onClick={() => navigate('/list')}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    List Medicine
                  </Button>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              <Tabs defaultValue="listings">
                <TabsList className="mb-6">
                  <TabsTrigger value="listings" className="gap-2">
                    <Package className="w-4 h-4" />
                    My Listings
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Messages
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="listings">
                  {myListings.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                          <Package className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-display text-xl font-semibold mb-2">No listings yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Start by listing your unused medicines
                        </p>
                        <Button onClick={() => navigate('/list')}>
                          <PlusCircle className="w-4 h-4 mr-2" />
                          Create Listing
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-6">
                      {activeListings.length > 0 && (
                        <div>
                          <h3 className="font-display text-lg font-semibold mb-4">Active Listings</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {activeListings.map((listing) => (
                              <div key={listing.id} className="relative group">
                                <ListingCard listing={listing} />
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="destructive"
                                      size="icon"
                                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete listing?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will permanently remove this medicine listing.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteListing(listing.id)}>
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {soldListings.length > 0 && (
                        <div>
                          <h3 className="font-display text-lg font-semibold mb-4">Sold / Donated</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-60">
                            {soldListings.map((listing) => (
                              <ListingCard key={listing.id} listing={listing} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="messages">
                  <Card>
                    <CardHeader>
                      <CardTitle>Messages</CardTitle>
                      <CardDescription>Chat with buyers and sellers</CardDescription>
                    </CardHeader>
                    <CardContent className="py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-2">No messages yet</h3>
                      <p className="text-muted-foreground">
                        When someone contacts you about a listing, messages will appear here
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Settings</CardTitle>
                      <CardDescription>Manage your account settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-center py-8">
                        Profile settings coming soon...
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </div>
      </Layout>
    </>
  );
}
