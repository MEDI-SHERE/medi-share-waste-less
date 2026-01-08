import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { FileDown, Printer, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Documentation() {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Medi-Share - Project Documentation</title>
        <meta name="description" content="Complete project documentation for Medi-Share healthcare marketplace" />
      </Helmet>
      
      {/* Print Controls - Hidden when printing */}
      <div className="print:hidden sticky top-0 z-50 bg-background/95 backdrop-blur border-b px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex gap-2">
            <Button onClick={handlePrint} className="bg-primary hover:bg-primary/90">
              <FileDown className="w-4 h-4 mr-2" />
              Export to PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Documentation Content */}
      <div className="documentation-content max-w-4xl mx-auto px-6 py-8 print:p-0 print:max-w-none">
        
        {/* Cover Page */}
        <div className="text-center mb-16 print:mb-8 print:page-break-after-always">
          <div className="py-16 print:py-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent print:text-foreground mb-4">
              Medi-Share
            </h1>
            <p className="text-2xl text-muted-foreground mb-8">Healthcare Marketplace Platform</p>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
            <h2 className="text-3xl font-semibold mb-4">Project Documentation</h2>
            <p className="text-lg text-muted-foreground mb-12">Comprehensive Technical Documentation for Academic Submission</p>
            
            <div className="bg-muted/50 rounded-lg p-6 inline-block print:bg-gray-100">
              <p className="text-lg font-semibold">Developed By</p>
              <p className="text-2xl font-bold text-primary">Team CodeMatrix</p>
              <p className="text-muted-foreground mt-2">January 2026</p>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <section className="mb-12 print:page-break-after-always">
          <h2 className="text-3xl font-bold mb-6 text-primary">📋 Table of Contents</h2>
          <div className="bg-muted/30 rounded-lg p-6 print:bg-gray-50">
            <ol className="space-y-2 text-lg">
              <li className="flex items-center gap-2"><span className="font-semibold">1.</span> Project Overview</li>
              <li className="flex items-center gap-2"><span className="font-semibold">2.</span> Team Information</li>
              <li className="flex items-center gap-2"><span className="font-semibold">3.</span> Problem Statement</li>
              <li className="flex items-center gap-2"><span className="font-semibold">4.</span> Proposed Solution</li>
              <li className="flex items-center gap-2"><span className="font-semibold">5.</span> Technology Stack</li>
              <li className="flex items-center gap-2"><span className="font-semibold">6.</span> System Architecture</li>
              <li className="flex items-center gap-2"><span className="font-semibold">7.</span> Database Design</li>
              <li className="flex items-center gap-2"><span className="font-semibold">8.</span> Features & Modules</li>
              <li className="flex items-center gap-2"><span className="font-semibold">9.</span> API Documentation</li>
              <li className="flex items-center gap-2"><span className="font-semibold">10.</span> User Interface</li>
              <li className="flex items-center gap-2"><span className="font-semibold">11.</span> Security Implementation</li>
              <li className="flex items-center gap-2"><span className="font-semibold">12.</span> Future Enhancements</li>
              <li className="flex items-center gap-2"><span className="font-semibold">13.</span> Installation Guide</li>
              <li className="flex items-center gap-2"><span className="font-semibold">14.</span> Conclusion</li>
            </ol>
          </div>
        </section>

        {/* Section 1: Project Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary pb-2">1. Project Overview</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-muted/30 p-4 rounded-lg print:bg-gray-50">
              <p className="font-semibold text-muted-foreground">Project Name</p>
              <p className="text-xl font-bold">Medi-Share</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg print:bg-gray-50">
              <p className="font-semibold text-muted-foreground">Project Type</p>
              <p className="text-xl font-bold">Web Application</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg print:bg-gray-50">
              <p className="font-semibold text-muted-foreground">Domain</p>
              <p className="text-xl font-bold">Healthcare & E-Commerce</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg print:bg-gray-50">
              <p className="font-semibold text-muted-foreground">Development Period</p>
              <p className="text-xl font-bold">2025-2026</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Abstract</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Medi-Share is a modern healthcare marketplace platform designed to connect people who have unused medicines 
            with those who need them at affordable prices. The platform focuses on chronic disease medications 
            (BP, Diabetes, Cancer) and operates within a city-based radius (5-10km) to facilitate easy meetups 
            between buyers and sellers.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The application addresses the critical issue of medicine wastage while making healthcare more affordable 
            by enabling the sale of unused medicines at approximately 50% of the original price.
          </p>
        </section>

        {/* Section 2: Team Information */}
        <section className="mb-12 print:page-break-before-always">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary pb-2">2. Team Information</h2>
          
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg mb-6 print:bg-gray-100">
            <p className="text-lg text-muted-foreground">Team Name</p>
            <p className="text-3xl font-bold text-primary">CodeMatrix</p>
          </div>

          <h3 className="text-xl font-bold mb-4">Team Members & Responsibilities</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-3 text-left">Role</th>
                  <th className="border border-border p-3 text-left">Responsibilities</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 font-semibold">Project Lead</td>
                  <td className="border border-border p-3">Overall project management, architecture design</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border border-border p-3 font-semibold">Frontend Developer</td>
                  <td className="border border-border p-3">UI/UX implementation, React components</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-semibold">Backend Developer</td>
                  <td className="border border-border p-3">Database design, API development, Edge Functions</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="border border-border p-3 font-semibold">Full Stack Developer</td>
                  <td className="border border-border p-3">Integration, testing, deployment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Problem Statement */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary pb-2">3. Problem Statement</h2>
          
          <h3 className="text-xl font-bold mb-4">Current Healthcare Challenges</h3>
          
          <div className="space-y-4 mb-6">
            <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-r-lg">
              <h4 className="font-bold mb-2">🏥 Medicine Wastage</h4>
              <p className="text-muted-foreground">Billions of rupees worth of medicines are wasted annually due to patient recovery/death, change in prescription, over-purchasing, and expired unused medicines.</p>
            </div>
            <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-r-lg">
              <h4 className="font-bold mb-2">💰 Affordability Crisis</h4>
              <p className="text-muted-foreground">Chronic disease medicines are expensive, many patients cannot afford continuous medication, and insurance coverage is limited.</p>
            </div>
            <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-r-lg">
              <h4 className="font-bold mb-2">🔗 Lack of Platform</h4>
              <p className="text-muted-foreground">No dedicated platform for medicine exchange, trust issues between buyers and sellers, verification challenges for medicine authenticity.</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Key Statistics</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg text-center print:bg-gray-100">
              <p className="text-3xl font-bold text-primary">₹18,000+ Cr</p>
              <p className="text-sm text-muted-foreground">Medicines wasted annually in India</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center print:bg-gray-100">
              <p className="text-3xl font-bold text-primary">30%</p>
              <p className="text-sm text-muted-foreground">Chronic patients skip doses due to cost</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center print:bg-gray-100">
              <p className="text-3xl font-bold text-primary">125,000+</p>
              <p className="text-sm text-muted-foreground">Preventable deaths from non-adherence</p>
            </div>
          </div>
        </section>

        {/* Section 4: Proposed Solution */}
        <section className="mb-12 print:page-break-before-always">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary pb-2">4. Proposed Solution</h2>
          
          <h3 className="text-xl font-bold mb-4">Medi-Share Platform</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <h4 className="font-bold mb-2">📍 Location-Based Matching</h4>
              <p className="text-sm text-muted-foreground">Connects buyers & sellers within 5-10km radius</p>
            </div>
            <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20">
              <h4 className="font-bold mb-2">✅ Safety & Verification</h4>
              <p className="text-sm text-muted-foreground">Verification system for medicines and users</p>
            </div>
            <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
              <h4 className="font-bold mb-2">♻️ Waste Reduction</h4>
              <p className="text-sm text-muted-foreground">Facilitates redistribution of unused medicines</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <h4 className="font-bold mb-2">💵 Affordable Healthcare</h4>
              <p className="text-sm text-muted-foreground">Medicines sold at 50% of original price</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Key Differentiators</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>AI-powered chatbot for user guidance with voice input support</li>
            <li>Real-time location-based search with interactive maps</li>
            <li>In-app messaging for buyer-seller coordination</li>
            <li>Donation mode for charitable medicine giving</li>
            <li>Urgent alerts for time-sensitive medicines</li>
          </ul>
        </section>

        {/* Section 5: Technology Stack */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary pb-2">5. Technology Stack</h2>
          
          <h3 className="text-xl font-bold mb-4">Frontend Technologies</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-3 text-left">Technology</th>
                  <th className="border border-border p-3 text-left">Version</th>
                  <th className="border border-border p-3 text-left">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-border p-3">React</td><td className="border border-border p-3">18.3.1</td><td className="border border-border p-3">UI Library</td></tr>
                <tr className="bg-muted/30"><td className="border border-border p-3">TypeScript</td><td className="border border-border p-3">Latest</td><td className="border border-border p-3">Type Safety</td></tr>
                <tr><td className="border border-border p-3">Vite</td><td className="border border-border p-3">Latest</td><td className="border border-border p-3">Build Tool</td></tr>
                <tr className="bg-muted/30"><td className="border border-border p-3">Tailwind CSS</td><td className="border border-border p-3">Latest</td><td className="border border-border p-3">Styling Framework</td></tr>
                <tr><td className="border border-border p-3">shadcn/ui</td><td className="border border-border p-3">Latest</td><td className="border border-border p-3">Component Library</td></tr>
                <tr className="bg-muted/30"><td className="border border-border p-3">React Router</td><td className="border border-border p-3">6.30.1</td><td className="border border-border p-3">Client-side Routing</td></tr>
                <tr><td className="border border-border p-3">React Hook Form</td><td className="border border-border p-3">7.61.1</td><td className="border border-border p-3">Form Management</td></tr>
                <tr className="bg-muted/30"><td className="border border-border p-3">Mapbox GL</td><td className="border border-border p-3">3.17.0</td><td className="border border-border p-3">Interactive Maps</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold mb-4">Backend Technologies</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-3 text-left">Technology</th>
                  <th className="border border-border p-3 text-left">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-border p-3">Lovable Cloud (Supabase)</td><td className="border border-border p-3">Backend as a Service</td></tr>
                <tr className="bg-muted/30"><td className="border border-border p-3">PostgreSQL</td><td className="border border-border p-3">Database</td></tr>
                <tr><td className="border border-border p-3">Edge Functions (Deno)</td><td className="border border-border p-3">Serverless Functions</td></tr>
                <tr className="bg-muted/30"><td className="border border-border p-3">Row Level Security</td><td className="border border-border p-3">Data Protection</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold mb-4">AI Integration</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-3 text-left">Feature</th>
                  <th className="border border-border p-3 text-left">Technology</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-border p-3">AI Chatbot</td><td className="border border-border p-3">Lovable AI (GPT-5-mini)</td></tr>
                <tr className="bg-muted/30"><td className="border border-border p-3">Voice Input</td><td className="border border-border p-3">Web Speech API</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: System Architecture */}
        <section className="mb-12 print:page-break-before-always">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary pb-2">6. System Architecture</h2>
          
          <h3 className="text-xl font-bold mb-4">High-Level Architecture Diagram</h3>
          <div className="bg-muted/30 p-6 rounded-lg font-mono text-sm overflow-x-auto print:bg-gray-100 mb-6">
            <pre className="whitespace-pre">{`
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
│  │   (Database)     │ │   (Files)    │ │    (Auth System)     │ │
│  └──────────────────┘ └──────────────┘ └──────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
            `}</pre>
          </div>

          <h3 className="text-xl font-bold mb-4">Component Structure</h3>
          <div className="bg-muted/30 p-6 rounded-lg font-mono text-sm overflow-x-auto print:bg-gray-100">
            <pre className="whitespace-pre">{`
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
│   └── use-toast.ts             # Toast notifications
├── pages/
│   ├── Index.tsx                # Home page
│   ├── Auth.tsx                 # Login/Register
│   ├── Dashboard.tsx            # User dashboard
│   ├── ListMedicine.tsx         # List medicine form
│   ├── Search.tsx               # Search page
│   └── Documentation.tsx        # This page
└── integrations/
    └── supabase/
        ├── client.ts            # Database client
        └── types.ts             # TypeScript types
            `}</pre>
          </div>
        </section>

        {/* Section 7: Database Design */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary pb-2">7. Database Design</h2>
          
          <h3 className="text-xl font-bold mb-4">Entity Relationship Diagram</h3>
          <div className="bg-muted/30 p-6 rounded-lg font-mono text-sm overflow-x-auto print:bg-gray-100 mb-6">
            <pre className="whitespace-pre">{`
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
            `}</pre>
          </div>

          <h3 className="text-xl font-bold mb-4">Database Enums</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg print:bg-gray-100">
              <h4 className="font-bold mb-2">Medicine Categories</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• bp (Blood Pressure)</li>
                <li>• diabetes</li>
                <li>• cancer</li>
                <li>• heart</li>
                <li>• thyroid</li>
                <li>• kidney</li>
                <li>• liver</li>
                <li>• other</li>
              </ul>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg print:bg-gray-100">
              <h4 className="font-bold mb-2">Listing Status</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• active</li>
                <li>• sold</li>
                <li>• expired</li>
                <li>• removed</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 8: Features */}
        <section className="mb-12 print:page-break-before-always">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary pb-2">8. Features & Modules</h2>
          
          <div className="space-y-6">
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">Module 1: User Authentication</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Email/Password registration & login</li>
                <li>• Secure JWT token-based authentication</li>
                <li>• Password reset functionality</li>
                <li>• Profile management</li>
              </ul>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">Module 2: Medicine Listings</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Create/Edit medicine listings</li>
                <li>• Photo upload with cloud storage</li>
                <li>• Auto-calculate 50% discount pricing</li>
                <li>• Location picker with interactive map</li>
                <li>• Category selection & donation mode</li>
              </ul>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">Module 3: Search & Discovery</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Text-based search with filters</li>
                <li>• Location-based search (5-10km radius)</li>
                <li>• Price range & expiry date filters</li>
                <li>• Grid/Map view toggle</li>
              </ul>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">Module 4: AI Chatbot Assistant</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Natural language understanding</li>
                <li>• Voice input support (Web Speech API)</li>
                <li>• Context-aware responses</li>
                <li>• Platform guidance & navigation help</li>
              </ul>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">Module 5: Messaging System</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Real-time chat between buyer/seller</li>
                <li>• Message notifications</li>
                <li>• Listing-specific conversations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 9: API Documentation */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary pb-2">9. API Documentation</h2>
          
          <h3 className="text-xl font-bold mb-4">Edge Functions</h3>
          <div className="bg-muted/30 p-4 rounded-lg mb-6 print:bg-gray-100">
            <h4 className="font-bold mb-2">Chat Assistant API</h4>
            <p className="text-sm mb-2"><strong>Endpoint:</strong> /functions/v1/chat-assistant</p>
            <p className="text-sm mb-2"><strong>Method:</strong> POST</p>
            <p className="text-sm mb-2"><strong>Authentication:</strong> Not required (public)</p>
            <div className="bg-background p-3 rounded mt-2 font-mono text-xs">
              <p className="text-muted-foreground mb-1">// Request Body</p>
              <pre>{`{
  "message": "How do I list a medicine?",
  "conversationHistory": []
}`}</pre>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">REST API Endpoints</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-2 text-left">Operation</th>
                  <th className="border border-border p-2 text-left">Method</th>
                  <th className="border border-border p-2 text-left">Auth</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-border p-2">Get all listings</td><td className="border border-border p-2">GET /rest/v1/listings</td><td className="border border-border p-2">No</td></tr>
                <tr className="bg-muted/30"><td className="border border-border p-2">Create listing</td><td className="border border-border p-2">POST /rest/v1/listings</td><td className="border border-border p-2">Yes</td></tr>
                <tr><td className="border border-border p-2">Update listing</td><td className="border border-border p-2">PATCH /rest/v1/listings</td><td className="border border-border p-2">Yes</td></tr>
                <tr className="bg-muted/30"><td className="border border-border p-2">Delete listing</td><td className="border border-border p-2">DELETE /rest/v1/listings</td><td className="border border-border p-2">Yes</td></tr>
                <tr><td className="border border-border p-2">Get profile</td><td className="border border-border p-2">GET /rest/v1/profiles</td><td className="border border-border p-2">No</td></tr>
                <tr className="bg-muted/30"><td className="border border-border p-2">Send message</td><td className="border border-border p-2">POST /rest/v1/messages</td><td className="border border-border p-2">Yes</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 10: User Interface */}
        <section className="mb-12 print:page-break-before-always">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary pb-2">10. User Interface</h2>
          
          <h3 className="text-xl font-bold mb-4">Design System</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-bold mb-2">Color Palette</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-primary"></div>
                  <span className="text-sm">Primary - Vibrant Orange</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-secondary"></div>
                  <span className="text-sm">Secondary - Teal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-accent"></div>
                  <span className="text-sm">Accent - Purple</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-2">Typography</h4>
              <p className="text-sm text-muted-foreground mb-2"><strong>Display Font:</strong> Sora</p>
              <p className="text-sm text-muted-foreground"><strong>Body Font:</strong> Inter</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Responsive Breakpoints</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-2 text-left">Breakpoint</th>
                  <th className="border border-border p-2 text-left">Size</th>
                  <th className="border border-border p-2 text-left">Target Device</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-border p-2">sm</td><td className="border border-border p-2">640px</td><td className="border border-border p-2">Mobile landscape</td></tr>
                <tr className="bg-muted/30"><td className="border border-border p-2">md</td><td className="border border-border p-2">768px</td><td className="border border-border p-2">Tablet</td></tr>
                <tr><td className="border border-border p-2">lg</td><td className="border border-border p-2">1024px</td><td className="border border-border p-2">Desktop</td></tr>
                <tr className="bg-muted/30"><td className="border border-border p-2">xl</td><td className="border border-border p-2">1280px</td><td className="border border-border p-2">Large desktop</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 11: Security */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary pb-2">11. Security Implementation</h2>
          
          <h3 className="text-xl font-bold mb-4">Row Level Security (RLS)</h3>
          <div className="bg-muted/30 p-4 rounded-lg mb-6 print:bg-gray-100">
            <p className="text-sm text-muted-foreground mb-4">All tables have RLS enabled with granular access policies:</p>
            <ul className="text-sm space-y-2">
              <li>• <strong>Public Read:</strong> Anyone can view active listings</li>
              <li>• <strong>Authenticated Write:</strong> Only logged-in users can create listings</li>
              <li>• <strong>Owner Access:</strong> Users can only update/delete their own data</li>
              <li>• <strong>Message Privacy:</strong> Users can only view their own conversations</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold mb-4">Data Protection</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg print:bg-gray-100">
              <h4 className="font-bold mb-2">Location Privacy</h4>
              <p className="text-sm text-muted-foreground">Precise coordinates only shown to authenticated users</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg print:bg-gray-100">
              <h4 className="font-bold mb-2">Authentication</h4>
              <p className="text-sm text-muted-foreground">JWT-based authentication with secure password hashing</p>
            </div>
          </div>
        </section>

        {/* Section 12: Future Enhancements */}
        <section className="mb-12 print:page-break-before-always">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary pb-2">12. Future Enhancements</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Phase 2</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Payment integration with escrow system</li>
                <li>• Medicine photo AI verification</li>
                <li>• Voice responses from AI chatbot</li>
                <li>• React Native mobile app</li>
                <li>• Pharmacy partnership program</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Phase 3</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Delivery integration</li>
                <li>• Doctor consultations</li>
                <li>• Prescription management</li>
                <li>• Community support groups</li>
                <li>• Health record integration</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 13: Installation */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary pb-2">13. Installation Guide</h2>
          
          <h3 className="text-xl font-bold mb-4">Prerequisites</h3>
          <ul className="text-muted-foreground mb-6 space-y-1">
            <li>• Node.js 18+</li>
            <li>• npm or bun package manager</li>
            <li>• Git</li>
          </ul>

          <h3 className="text-xl font-bold mb-4">Setup Commands</h3>
          <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm print:bg-gray-100">
            <pre>{`# Clone the repository
git clone <repository-url>
cd medi-share

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build`}</pre>
          </div>
        </section>

        {/* Section 14: Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary pb-2">14. Conclusion</h2>
          
          <p className="text-muted-foreground leading-relaxed mb-6">
            Medi-Share successfully addresses the critical issue of medicine wastage while making healthcare 
            more affordable. The platform provides a user-friendly interface, secure transactions, AI assistance, 
            location-based matching, and social impact through donation support.
          </p>

          <h3 className="text-xl font-bold mb-4">Projected Impact (Year 1)</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-muted/50 p-3 rounded-lg text-center print:bg-gray-100">
              <p className="text-xl font-bold text-primary">10,000+</p>
              <p className="text-xs text-muted-foreground">Users</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg text-center print:bg-gray-100">
              <p className="text-xl font-bold text-primary">5,000+</p>
              <p className="text-xs text-muted-foreground">Listings</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg text-center print:bg-gray-100">
              <p className="text-xl font-bold text-primary">2,000+</p>
              <p className="text-xs text-muted-foreground">Transactions</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg text-center print:bg-gray-100">
              <p className="text-xl font-bold text-primary">₹50L</p>
              <p className="text-xs text-muted-foreground">Waste Reduced</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg text-center print:bg-gray-100">
              <p className="text-xl font-bold text-primary">10+</p>
              <p className="text-xs text-muted-foreground">Cities</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg text-center print:bg-gray-100">
            <p className="text-lg mb-2">Document Prepared By</p>
            <p className="text-2xl font-bold text-primary mb-2">Team CodeMatrix</p>
            <p className="text-muted-foreground">January 2026</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm py-8 border-t">
          <p>© 2026 Medi-Share by CodeMatrix. All Rights Reserved.</p>
        </footer>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body { 
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print\\:page-break-before-always { page-break-before: always; }
          .print\\:page-break-after-always { page-break-after: always; }
          .documentation-content { 
            font-size: 11pt;
            line-height: 1.4;
          }
          h2 { font-size: 18pt !important; }
          h3 { font-size: 14pt !important; }
          table { font-size: 9pt; }
          pre { font-size: 8pt; }
        }
      `}</style>
    </>
  );
}
