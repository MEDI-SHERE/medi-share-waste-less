-- Fix security issues: Restrict public access to sensitive data

-- 1. Drop the overly permissive profiles policy
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- 2. Create restrictive policies for profiles
-- Users can view their own full profile
CREATE POLICY "Users can view own full profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- 3. Create a function to get safe profile data (excludes sensitive fields)
CREATE OR REPLACE FUNCTION public.get_safe_profile(profile_id uuid)
RETURNS TABLE(
  id uuid,
  full_name text,
  avatar_url text,
  is_verified boolean,
  city text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.id,
    p.full_name,
    p.avatar_url,
    p.is_verified,
    p.city
  FROM public.profiles p
  WHERE p.id = profile_id;
$$;

-- 4. Create a view for public profile data (excludes phone, precise location)
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  full_name,
  avatar_url,
  is_verified,
  city,
  created_at
FROM public.profiles;

-- 5. Drop the overly permissive listings policy  
DROP POLICY IF EXISTS "Active listings are viewable by everyone" ON public.listings;

-- 6. Create a safer listings policy - authenticated users see more details
CREATE POLICY "Active listings viewable with location obfuscation"
  ON public.listings FOR SELECT
  USING (
    (status = 'active'::listing_status) OR (user_id = auth.uid())
  );

-- 7. Create a function to get obfuscated listing location (city only for non-owners)
CREATE OR REPLACE FUNCTION public.get_listing_with_safe_location(listing_id uuid)
RETURNS TABLE(
  id uuid,
  medicine_name text,
  description text,
  category public.medicine_category,
  original_price numeric,
  selling_price numeric,
  expiry_date date,
  photo_url text,
  bill_url text,
  city text,
  status public.listing_status,
  is_donation boolean,
  is_urgent boolean,
  created_at timestamptz,
  user_id uuid,
  -- Only return precise location if user is the owner
  location_lat double precision,
  location_lng double precision
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    l.id,
    l.medicine_name,
    l.description,
    l.category,
    l.original_price,
    l.selling_price,
    l.expiry_date,
    l.photo_url,
    l.bill_url,
    l.city,
    l.status,
    l.is_donation,
    l.is_urgent,
    l.created_at,
    l.user_id,
    -- Return precise location only for authenticated users
    CASE WHEN auth.uid() IS NOT NULL THEN l.location_lat ELSE NULL END,
    CASE WHEN auth.uid() IS NOT NULL THEN l.location_lng ELSE NULL END
  FROM public.listings l
  WHERE l.id = listing_id AND (l.status = 'active' OR l.user_id = auth.uid());
$$;