export type MedicineCategory = 
  | 'blood_pressure'
  | 'diabetes'
  | 'cancer'
  | 'pain_relief'
  | 'antibiotics'
  | 'heart'
  | 'respiratory'
  | 'vitamins'
  | 'other';

export type ListingStatus = 'active' | 'sold' | 'expired' | 'donated';

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  location_lat: number | null;
  location_lng: number | null;
  city: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Listing {
  id: string;
  user_id: string;
  medicine_name: string;
  description: string | null;
  category: MedicineCategory;
  original_price: number;
  selling_price: number;
  expiry_date: string;
  photo_url: string | null;
  bill_url: string | null;
  location_lat: number;
  location_lng: number;
  city: string | null;
  status: ListingStatus;
  is_donation: boolean;
  is_urgent: boolean;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
}

export interface Message {
  id: string;
  listing_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export const CATEGORY_LABELS: Record<MedicineCategory, string> = {
  blood_pressure: 'Blood Pressure',
  diabetes: 'Diabetes',
  cancer: 'Cancer',
  pain_relief: 'Pain Relief',
  antibiotics: 'Antibiotics',
  heart: 'Heart',
  respiratory: 'Respiratory',
  vitamins: 'Vitamins',
  other: 'Other',
};
