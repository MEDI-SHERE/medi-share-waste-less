# Medi-Share - Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Team Information](#team-information)
3. [Problem Statement](#problem-statement)
4. [Proposed Solution](#proposed-solution)
5. [Technology Stack](#technology-stack)
6. [System Architecture](#system-architecture)
7. [Database Design](#database-design)
8. [Features & Modules](#features--modules)
9. [API Documentation](#api-documentation)
10. [User Interface](#user-interface)
11. [Security Implementation](#security-implementation)
12. [Future Enhancements](#future-enhancements)
13. [Installation Guide](#installation-guide)
14. [Conclusion](#conclusion)

---

## 1. Project Overview

**Project Name:** Medi-Share  
**Project Type:** Web Application (Healthcare Marketplace)  
**Domain:** Healthcare & E-Commerce  
**Development Period:** 2025-2026  

### Abstract

Medi-Share is a modern healthcare marketplace platform designed to connect people who have unused medicines with those who need them at affordable prices. The platform focuses on chronic disease medications (BP, Diabetes, Cancer) and operates within a city-based radius (5-10km) to facilitate easy meetups between buyers and sellers.

The application addresses the critical issue of medicine wastage while making healthcare more affordable by enabling the sale of unused medicines at approximately 50% of the original price.

---

## 2. Team Information

**Team Name:** CodeMatrix

### Team Members
| Role | Responsibilities |
|------|-----------------|
| Project Lead | Overall project management, architecture design |
| Frontend Developer | UI/UX implementation, React components |
| Backend Developer | Database design, API development, Edge Functions |
| Full Stack Developer | Integration, testing, deployment |

---

## 3. Problem Statement

### Current Healthcare Challenges

1. **Medicine Wastage:** Billions of rupees worth of medicines are wasted annually due to:
   - Patient recovery or death
   - Change in prescription
   - Over-purchasing of medicines
   - Expired unused medicines

2. **Affordability Crisis:**
   - Chronic disease medicines are expensive
   - Many patients cannot afford continuous medication
   - Insurance coverage is limited

3. **Lack of Platform:**
   - No dedicated platform for medicine exchange
   - Trust issues between buyers and sellers
   - Verification challenges for medicine authenticity

### Statistics
- Estimated ₹18,000+ crore worth of medicines wasted in India annually
- 30% of chronic disease patients skip doses due to cost
- Medicine non-adherence leads to 125,000+ preventable deaths yearly

---

## 4. Proposed Solution

### Medi-Share Platform

A web-based marketplace that:

1. **Connects Buyers & Sellers:** Location-based matching within 5-10km radius
2. **Ensures Safety:** Verification system for medicines and users
3. **Reduces Waste:** Facilitates redistribution of unused medicines
4. **Makes Healthcare Affordable:** Medicines sold at 50% of original price
5. **Supports Donations:** Option for free medicine donation

### Key Differentiators
- AI-powered chatbot for user guidance
- Voice input support for accessibility
- Real-time location-based search
- In-app messaging for coordination
- Donation mode for charitable giving

---

## 5. Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Library |
| TypeScript | Latest | Type Safety |
| Vite | Latest | Build Tool |
| Tailwind CSS | Latest | Styling Framework |
| shadcn/ui | Latest | Component Library |
| React Router DOM | 6.30.1 | Client-side Routing |
| React Hook Form | 7.61.1 | Form Management |
| Zod | 3.25.76 | Schema Validation |
| Lucide React | 0.462.0 | Icon Library |
| Framer Motion | - | Animations |

### Backend Technologies

| Technology | Purpose |
|------------|---------|
| Lovable Cloud (Supabase) | Backend as a Service |
| PostgreSQL | Database |
| Edge Functions (Deno) | Serverless Functions |
| Row Level Security | Data Protection |

### AI Integration

| Feature | Technology |
|---------|------------|
| AI Chatbot | Lovable AI (GPT-5-mini) |
| Voice Input | Web Speech API |

### External Services

| Service | Purpose |
|---------|---------|
| Mapbox GL | Interactive Maps |
| Supabase Auth | Authentication |
| Supabase Storage | File Storage |

---

## 6. System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    React Application                         ││
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐││
│  │  │  Pages   │ │Components│ │  Hooks   │ │   AI Chatbot     │││
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API LAYER                                 │
│  ┌──────────────────────┐    ┌──────────────────────────────┐   │
│  │   Supabase Client    │    │      Edge Functions          │   │
│  │   (REST API)         │    │   (Serverless Backend)       │   │
│  └──────────────────────┘    └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                  │
│  ┌──────────────────┐ ┌──────────────┐ ┌──────────────────────┐ │
│  │   PostgreSQL     │ │   Storage    │ │    Authentication    │ │
│  │   (Database)     │ │   (Files)    │ │    (Supabase Auth)   │ │
│  └──────────────────┘ └──────────────┘ └──────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
src/
├── components/
│   ├── chat/
│   │   └── AIChatBot.tsx        # AI Assistant with voice input
│   ├── home/
│   │   ├── Hero.tsx             # Landing hero section
│   │   ├── HowItWorks.tsx       # Process explanation
│   │   ├── Categories.tsx       # Medicine categories
│   │   └── Stats.tsx            # Platform statistics
│   ├── layout/
│   │   ├── Layout.tsx           # Main layout wrapper
│   │   ├── Navbar.tsx           # Navigation bar
│   │   └── Footer.tsx           # Footer section
│   ├── listings/
│   │   └── ListingCard.tsx      # Medicine listing card
│   ├── map/
│   │   └── MapboxMap.tsx        # Interactive map
│   └── ui/                      # shadcn/ui components
├── hooks/
│   ├── useAuth.tsx              # Authentication hook
│   ├── use-mobile.tsx           # Mobile detection
│   └── use-toast.ts             # Toast notifications
├── pages/
│   ├── Index.tsx                # Home page
│   ├── Auth.tsx                 # Login/Register
│   ├── Dashboard.tsx            # User dashboard
│   ├── ListMedicine.tsx         # List medicine form
│   ├── ListingDetail.tsx        # Medicine details
│   ├── Search.tsx               # Search page
│   └── NotFound.tsx             # 404 page
├── integrations/
│   └── supabase/
│       ├── client.ts            # Supabase client
│       └── types.ts             # Database types
└── lib/
    ├── types.ts                 # TypeScript types
    └── utils.ts                 # Utility functions
```

---

## 7. Database Design

### Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     profiles    │       │    listings     │       │    messages     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK, UUID)   │       │ id (PK, UUID)   │       │ id (PK, UUID)   │
│ full_name       │◄──────│ user_id (FK)    │       │ sender_id (FK)  │
│ avatar_url      │       │ medicine_name   │       │ receiver_id(FK) │
│ phone           │       │ description     │       │ listing_id (FK) │
│ city            │       │ category        │       │ content         │
│ is_verified     │       │ original_price  │       │ is_read         │
│ created_at      │       │ selling_price   │       │ created_at      │
│ updated_at      │       │ expiry_date     │       └─────────────────┘
└─────────────────┘       │ photo_url       │
                          │ bill_url        │
                          │ city            │
                          │ location_lat    │
                          │ location_lng    │
                          │ status          │
                          │ is_donation     │
                          │ is_urgent       │
                          │ created_at      │
                          └─────────────────┘
```

### Table Schemas

#### 1. Profiles Table
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### 2. Listings Table
```sql
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  medicine_name TEXT NOT NULL,
  description TEXT,
  category medicine_category NOT NULL,
  original_price NUMERIC NOT NULL,
  selling_price NUMERIC NOT NULL,
  expiry_date DATE NOT NULL,
  photo_url TEXT,
  bill_url TEXT,
  city TEXT,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  status listing_status DEFAULT 'active',
  is_donation BOOLEAN DEFAULT false,
  is_urgent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### 3. Messages Table
```sql
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) NOT NULL,
  receiver_id UUID REFERENCES auth.users(id) NOT NULL,
  listing_id UUID REFERENCES listings(id),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Enums

```sql
-- Medicine Categories
CREATE TYPE medicine_category AS ENUM (
  'bp',
  'diabetes',
  'cancer',
  'heart',
  'thyroid',
  'kidney',
  'liver',
  'other'
);

-- Listing Status
CREATE TYPE listing_status AS ENUM (
  'active',
  'sold',
  'expired',
  'removed'
);
```

### Database Functions

#### 1. Get Safe Profile
```sql
CREATE FUNCTION get_safe_profile(profile_id UUID)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  avatar_url TEXT,
  is_verified BOOLEAN,
  city TEXT
) AS $$
  SELECT p.id, p.full_name, p.avatar_url, p.is_verified, p.city
  FROM profiles p
  WHERE p.id = profile_id;
$$ LANGUAGE sql STABLE SECURITY DEFINER;
```

#### 2. Get Listing with Safe Location
```sql
CREATE FUNCTION get_listing_with_safe_location(listing_id UUID)
RETURNS TABLE (...) AS $$
  -- Returns listing with location only for authenticated users
$$ LANGUAGE sql STABLE SECURITY DEFINER;
```

---

## 8. Features & Modules

### Module 1: User Authentication

**Features:**
- Email/Password registration
- Secure login with JWT tokens
- Password reset functionality
- Profile management
- Auto-confirmation for development

**Implementation:**
```typescript
// Authentication Hook (useAuth.tsx)
export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  
  const signUp = async (email, password, fullName) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });
  };
  
  const signIn = async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };
}
```

### Module 2: Medicine Listings

**Features:**
- Create new medicine listings
- Upload medicine photos
- Set pricing (auto-calculate 50% discount)
- Add location via map
- Category selection
- Donation mode toggle
- Urgent alert flag

**Categories Supported:**
- Blood Pressure (BP)
- Diabetes
- Cancer
- Heart
- Thyroid
- Kidney
- Liver
- Other

### Module 3: Search & Discovery

**Features:**
- Text-based search
- Category filters
- Price range filter
- Expiry date filter (>6 months)
- Location-based search (5-10km radius)
- Donation filter
- Urgent alerts filter
- Grid/Map view toggle

### Module 4: AI Chatbot Assistant

**Features:**
- Natural language understanding
- Voice input support (Web Speech API)
- Context-aware responses
- Platform guidance
- Medicine information
- Navigation assistance

**Implementation:**
```typescript
// AI Chatbot Edge Function
const response = await fetch(
  'https://api.lovable.dev/v1/chat/completions',
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'openai/gpt-5-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversationHistory
      ]
    })
  }
);
```

**Voice Input:**
```typescript
const SpeechRecognition = window.SpeechRecognition || 
                          window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';
```

### Module 5: Messaging System

**Features:**
- Real-time chat between buyer/seller
- Message notifications
- Read receipts
- Listing-specific conversations

### Module 6: User Dashboard

**Features:**
- View listed medicines
- Track listing status
- View messages
- Profile settings
- Transaction history

### Module 7: Maps Integration

**Features:**
- Interactive Mapbox map
- Location picker for listings
- Nearby listings visualization
- Distance calculation

---

## 9. API Documentation

### Edge Functions

#### 1. Chat Assistant API

**Endpoint:** `/functions/v1/chat-assistant`  
**Method:** POST  
**Authentication:** Not required (public)

**Request Body:**
```json
{
  "message": "How do I list a medicine?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous message"
    },
    {
      "role": "assistant", 
      "content": "Previous response"
    }
  ]
}
```

**Response:**
```json
{
  "response": "To list a medicine on Medi-Share..."
}
```

### Supabase API Endpoints

#### Listings

| Operation | Method | Endpoint | Auth Required |
|-----------|--------|----------|---------------|
| Get all listings | GET | `/rest/v1/listings` | No |
| Get single listing | GET | `/rest/v1/listings?id=eq.{id}` | No |
| Create listing | POST | `/rest/v1/listings` | Yes |
| Update listing | PATCH | `/rest/v1/listings?id=eq.{id}` | Yes |
| Delete listing | DELETE | `/rest/v1/listings?id=eq.{id}` | Yes |

#### Profiles

| Operation | Method | Endpoint | Auth Required |
|-----------|--------|----------|---------------|
| Get profile | GET | `/rest/v1/profiles?id=eq.{id}` | No |
| Update profile | PATCH | `/rest/v1/profiles?id=eq.{id}` | Yes |

#### Messages

| Operation | Method | Endpoint | Auth Required |
|-----------|--------|----------|---------------|
| Get messages | GET | `/rest/v1/messages` | Yes |
| Send message | POST | `/rest/v1/messages` | Yes |
| Mark as read | PATCH | `/rest/v1/messages?id=eq.{id}` | Yes |

---

## 10. User Interface

### Design System

**Color Palette:**
```css
:root {
  --primary: 24 95% 53%;        /* Vibrant Orange */
  --secondary: 174 72% 40%;     /* Teal */
  --accent: 262 83% 58%;        /* Purple */
  --background: 220 20% 97%;    /* Light Gray */
  --foreground: 220 20% 10%;    /* Dark Text */
}
```

**Typography:**
- Display Font: Sora (headings)
- Body Font: Inter (content)

**Design Principles:**
- Glass morphism effects
- Gradient backgrounds
- Rounded corners (border-radius)
- Subtle shadows
- Responsive design (mobile-first)

### Page Layouts

#### Home Page
1. Hero Section - Main CTA with search
2. How It Works - 3-step process
3. Categories - Medicine category grid
4. Statistics - Platform stats

#### Search Page
1. Search bar with filters
2. Map view toggle
3. Results grid
4. Listing cards

#### Listing Detail Page
1. Medicine image gallery
2. Price comparison
3. Seller information
4. Contact button
5. Location map

### Responsive Breakpoints

| Breakpoint | Size | Target |
|------------|------|--------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |
| 2xl | 1536px | Extra large |

---

## 11. Security Implementation

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

#### Listings Policies
```sql
-- Anyone can view active listings
CREATE POLICY "Public can view active listings"
ON listings FOR SELECT
USING (status = 'active');

-- Users can create their own listings
CREATE POLICY "Users can create listings"
ON listings FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own listings
CREATE POLICY "Users can update own listings"
ON listings FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own listings
CREATE POLICY "Users can delete own listings"
ON listings FOR DELETE
USING (auth.uid() = user_id);
```

#### Messages Policies
```sql
-- Users can view their own messages
CREATE POLICY "Users can view own messages"
ON messages FOR SELECT
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Users can send messages
CREATE POLICY "Users can send messages"
ON messages FOR INSERT
WITH CHECK (auth.uid() = sender_id);
```

### Data Protection

1. **Location Privacy:**
   - Precise coordinates only shown to authenticated users
   - Anonymous users see approximate location

2. **Profile Privacy:**
   - Phone numbers hidden from public
   - Only safe profile data exposed via function

3. **Authentication:**
   - JWT-based authentication
   - Secure password hashing (bcrypt)
   - HTTPS only

---

## 12. Future Enhancements

### Phase 2 Features

1. **Payment Integration**
   - Escrow payment system
   - Multiple payment methods
   - Commission collection (10-15%)

2. **Verification System**
   - Medicine photo AI verification
   - Seller verification badges
   - Bill/prescription verification

3. **Enhanced AI**
   - Voice responses
   - Medicine interaction checker
   - Price recommendation engine

4. **Mobile Application**
   - React Native app
   - Push notifications
   - Offline support

5. **Pharmacy Partnership**
   - Pharmacy advertising
   - Verified seller program
   - Bulk medicine disposal

### Phase 3 Features

1. **Delivery Integration**
   - Partner delivery services
   - Medicine packaging guidelines
   - Temperature-controlled delivery

2. **Healthcare Integration**
   - Doctor consultations
   - Prescription management
   - Health record integration

3. **Community Features**
   - Support groups
   - Medicine reminders
   - Health tips

---

## 13. Installation Guide

### Prerequisites

- Node.js 18+ 
- npm or bun package manager
- Git

### Local Development Setup

```bash
# Step 1: Clone the repository
git clone <repository-url>
cd medi-share

# Step 2: Install dependencies
npm install

# Step 3: Set up environment variables
# Create .env file with:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key

# Step 4: Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Deployment

The application is deployed on Lovable's infrastructure with:
- Automatic HTTPS
- CDN distribution
- Edge function deployment
- Database hosting

---

## 14. Conclusion

### Project Summary

Medi-Share successfully addresses the critical issue of medicine wastage while making healthcare more affordable. The platform provides:

1. **User-Friendly Interface:** Modern, responsive design accessible to all users
2. **Secure Transactions:** Row-level security and authentication protection
3. **AI Assistance:** Intelligent chatbot with voice support for user guidance
4. **Location-Based:** Proximity matching for convenient meetups
5. **Social Impact:** Donation mode for charitable medicine giving

### Impact Metrics (Projected)

| Metric | Target (Year 1) |
|--------|-----------------|
| Registered Users | 10,000+ |
| Medicines Listed | 5,000+ |
| Successful Transactions | 2,000+ |
| Medicine Waste Reduced | ₹50 Lakhs worth |
| Cities Covered | 10+ |

### Acknowledgments

We extend our gratitude to:
- Our college faculty for guidance
- Lovable platform for development tools
- Supabase for backend infrastructure
- Open source community for libraries

---

## Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| RLS | Row Level Security - Database access control |
| JWT | JSON Web Token - Authentication mechanism |
| Edge Function | Serverless function at network edge |
| ORM | Object-Relational Mapping |
| API | Application Programming Interface |

### B. References

1. React Documentation - https://react.dev
2. Supabase Documentation - https://supabase.com/docs
3. Tailwind CSS - https://tailwindcss.com
4. TypeScript Handbook - https://www.typescriptlang.org

### C. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025 | Initial release |
| 1.1.0 | 2025 | Added AI chatbot |
| 1.2.0 | 2026 | Added voice input |
| 1.3.0 | 2026 | Open Innovation theme |

---

**Document Prepared By:** Team CodeMatrix  
**Last Updated:** January 2026  
**Document Version:** 1.0

---

*© 2026 Medi-Share by CodeMatrix. All Rights Reserved.*
