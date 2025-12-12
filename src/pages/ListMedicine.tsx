import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Upload, Loader2, MapPin, Heart, AlertTriangle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import MapboxMap from '@/components/map/MapboxMap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { MedicineCategory, CATEGORY_LABELS } from '@/lib/types';

const listingSchema = z.object({
  medicine_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  description: z.string().max(500).optional(),
  category: z.enum(['blood_pressure', 'diabetes', 'cancer', 'pain_relief', 'antibiotics', 'heart', 'respiratory', 'vitamins', 'other']),
  original_price: z.number().min(1, 'Price must be greater than 0'),
  expiry_date: z.string().refine((date) => new Date(date) > new Date(), 'Expiry date must be in the future'),
  city: z.string().min(2, 'City is required'),
  is_donation: z.boolean(),
  is_urgent: z.boolean(),
});

type ListingFormData = z.infer<typeof listingSchema>;

export default function ListMedicine() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [billFile, setBillFile] = useState<File | null>(null);
  const [location, setLocation] = useState({ lat: 12.9716, lng: 77.5946 });

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      category: 'other',
      is_donation: false,
      is_urgent: false,
    },
  });

  const originalPrice = watch('original_price');
  const isDonation = watch('is_donation');
  const sellingPrice = isDonation ? 0 : Math.round((originalPrice || 0) / 2);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBillFile(file);
    }
  };

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${user!.id}/${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('medicine-images')
      .upload(fileName, file);

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('medicine-images')
      .getPublicUrl(data.path);

    return publicUrl;
  };

  const onSubmit = async (data: ListingFormData) => {
    if (!user) return;

    setIsSubmitting(true);

    try {
      let photoUrl = null;
      let billUrl = null;

      if (photoFile) {
        photoUrl = await uploadFile(photoFile, 'photos');
      }

      if (billFile) {
        billUrl = await uploadFile(billFile, 'bills');
      }

      const { error } = await supabase.from('listings').insert({
        user_id: user.id,
        medicine_name: data.medicine_name,
        description: data.description || null,
        category: data.category,
        original_price: data.original_price,
        selling_price: sellingPrice,
        expiry_date: data.expiry_date,
        photo_url: photoUrl,
        bill_url: billUrl,
        location_lat: location.lat,
        location_lng: location.lng,
        city: data.city,
        is_donation: data.is_donation,
        is_urgent: data.is_urgent,
      });

      if (error) throw error;

      toast({
        title: 'Listing created!',
        description: 'Your medicine has been listed successfully.',
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create listing',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>List Medicine - Medi-Share</title>
        <meta name="description" content="List your unused medicine on Medi-Share and help others while earning money." />
      </Helmet>
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              List Your <span className="text-gradient">Medicine</span>
            </h1>
            <p className="text-muted-foreground">
              Help others access affordable medicine while reducing waste
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Photo Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Medicine Photo
                </CardTitle>
                <CardDescription>Upload a clear photo showing the medicine and expiry date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                  ) : (
                    <div className="w-32 h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground">
                      <Camera className="w-8 h-8" />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="photo" className="cursor-pointer">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                        <Upload className="w-4 h-4" />
                        Choose Photo
                      </div>
                    </Label>
                    <Input id="photo" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                    <p className="text-xs text-muted-foreground mt-2">JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medicine Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Medicine Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medicine_name">Medicine Name *</Label>
                  <Input id="medicine_name" placeholder="e.g. Metformin 500mg" {...register('medicine_name')} />
                  {errors.medicine_name && <p className="text-xs text-destructive">{errors.medicine_name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Additional details about the medicine..." {...register('description')} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => setValue('category', value as MedicineCategory)} defaultValue="other">
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiry_date">Expiry Date *</Label>
                    <Input id="expiry_date" type="date" {...register('expiry_date')} />
                    {errors.expiry_date && <p className="text-xs text-destructive">{errors.expiry_date.message}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pricing</CardTitle>
                <CardDescription>Selling price is automatically set to 50% of original</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="original_price">Original Price (₹) *</Label>
                    <Input
                      id="original_price"
                      type="number"
                      placeholder="e.g. 500"
                      {...register('original_price', { valueAsNumber: true })}
                    />
                    {errors.original_price && <p className="text-xs text-destructive">{errors.original_price.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Selling Price (₹)</Label>
                    <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted flex items-center font-semibold text-primary">
                      {isDonation ? 'FREE (Donation)' : `₹${sellingPrice}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-accent/10">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-accent" />
                    <div>
                      <Label htmlFor="is_donation" className="font-medium">Donate for Free</Label>
                      <p className="text-xs text-muted-foreground">Give this medicine to someone in need</p>
                    </div>
                  </div>
                  <Switch
                    id="is_donation"
                    checked={isDonation}
                    onCheckedChange={(checked) => setValue('is_donation', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </CardTitle>
                <CardDescription>Click on the map or drag the marker to set your location</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" placeholder="e.g. Bangalore" {...register('city')} />
                  {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
                </div>
                <MapboxMap
                  selectable
                  onLocationSelect={(lat, lng) => setLocation({ lat, lng })}
                  center={[location.lng, location.lat]}
                  className="h-[250px]"
                />
              </CardContent>
            </Card>

            {/* Bill Upload & Urgent */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Additional Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Label htmlFor="bill" className="cursor-pointer">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                      <Upload className="w-4 h-4" />
                      Upload Bill (Optional)
                    </div>
                  </Label>
                  <Input id="bill" type="file" accept="image/*,.pdf" className="hidden" onChange={handleBillChange} />
                  {billFile && <span className="text-sm text-muted-foreground">{billFile.name}</span>}
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/10">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <div>
                      <Label htmlFor="is_urgent" className="font-medium">Mark as Urgent</Label>
                      <p className="text-xs text-muted-foreground">Medicine expiring soon or needed urgently</p>
                    </div>
                  </div>
                  <Switch
                    id="is_urgent"
                    checked={watch('is_urgent')}
                    onCheckedChange={(checked) => setValue('is_urgent', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <Button type="submit" size="lg" className="w-full gradient-primary text-primary-foreground" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              List Medicine
            </Button>
          </form>
        </div>
      </Layout>
    </>
  );
}
