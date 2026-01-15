import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { FileDown, ArrowLeft, Loader2, Award, Zap, Shield, Users, Globe, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Documentation() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    toast.info('Generating PDF, please wait...');
    
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('documentation-content');
      
      if (!element) {
        throw new Error('Documentation content not found');
      }

      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'Medi-Share_Project_Documentation.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(element).save();
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
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
            <Button 
              onClick={handleDownloadPDF} 
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <FileDown className="w-4 h-4 mr-2" />
              )}
              {isGenerating ? 'Generating...' : 'Download PDF'}
            </Button>
          </div>
        </div>
      </div>

      {/* Documentation Content */}
      <div id="documentation-content" className="documentation-content max-w-4xl mx-auto px-6 py-8 print:p-4 print:max-w-none bg-background text-foreground">
        
        {/* ========== COVER PAGE ========== */}
        <div className="text-center mb-16 print:mb-8 border-4 border-primary/20 rounded-3xl p-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 print:border-2 print:border-gray-300">
          <div className="py-8 print:py-4">
            {/* Logo */}
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-2xl print:shadow-lg">
              <Heart className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent print:text-gray-900 mb-4">
              Medi-Share
            </h1>
            <p className="text-2xl text-muted-foreground mb-2">Healthcare Marketplace Platform</p>
            <p className="text-lg font-medium text-primary mb-8">Reducing Medicine Waste • Enabling Affordable Healthcare</p>
            
            <div className="w-48 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-8 rounded-full"></div>
            
            <h2 className="text-4xl font-bold mb-2">Project Documentation</h2>
            <p className="text-lg text-muted-foreground mb-8">Comprehensive Technical Documentation</p>
            
            {/* Badges */}
            <div className="flex justify-center gap-4 mb-8 flex-wrap">
              <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium text-primary">
                🏆 Hackathon Ready
              </div>
              <div className="px-4 py-2 bg-secondary/10 border border-secondary/30 rounded-full text-sm font-medium text-secondary-foreground">
                🌍 Social Impact
              </div>
              <div className="px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-sm font-medium">
                💡 Innovation
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 inline-block print:bg-gray-100 border border-primary/20">
              <p className="text-lg font-semibold text-muted-foreground">Developed By</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent print:text-gray-900">Team CodeMatrix</p>
              <p className="text-muted-foreground mt-2">January 2026</p>
            </div>
          </div>
        </div>

        {/* ========== QUICK HIGHLIGHTS ========== */}
        <section className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 print:grid-cols-4">
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <Award className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-primary">50%</p>
            <p className="text-xs text-muted-foreground">Cost Savings</p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
            <Zap className="w-8 h-8 mx-auto mb-2 text-secondary-foreground" />
            <p className="text-2xl font-bold text-secondary-foreground">AI</p>
            <p className="text-xs text-muted-foreground">Powered</p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
            <Globe className="w-8 h-8 mx-auto mb-2 text-accent-foreground" />
            <p className="text-2xl font-bold text-accent-foreground">5-10km</p>
            <p className="text-xs text-muted-foreground">Local Reach</p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
            <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold text-green-600">Secure</p>
            <p className="text-xs text-muted-foreground">RLS Protected</p>
          </div>
        </section>

        {/* ========== TABLE OF CONTENTS ========== */}
        <section className="mb-12 print:page-break-after-always">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-xl">📋</span>
            </div>
            <h2 className="text-3xl font-bold text-primary">Table of Contents</h2>
          </div>
          <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-6 print:bg-gray-50 border border-border">
            <div className="grid md:grid-cols-2 gap-4">
              <ol className="space-y-2 text-base">
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors"><span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">1</span> Project Overview</li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors"><span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">2</span> Problem Statement</li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors"><span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">3</span> Proposed Solution</li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors"><span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">4</span> Technology Stack</li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors"><span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">5</span> System Architecture</li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors"><span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">6</span> UML Diagrams</li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors"><span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">7</span> Database Design</li>
              </ol>
              <ol className="space-y-2 text-base" start={8}>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors"><span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary-foreground text-sm flex items-center justify-center font-bold">8</span> Features & Modules</li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors"><span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary-foreground text-sm flex items-center justify-center font-bold">9</span> API Documentation</li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors"><span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary-foreground text-sm flex items-center justify-center font-bold">10</span> Security Implementation</li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors"><span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary-foreground text-sm flex items-center justify-center font-bold">11</span> User Interface</li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors"><span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary-foreground text-sm flex items-center justify-center font-bold">12</span> Future Roadmap</li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors"><span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary-foreground text-sm flex items-center justify-center font-bold">13</span> Installation Guide</li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors"><span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary-foreground text-sm flex items-center justify-center font-bold">14</span> Conclusion</li>
              </ol>
            </div>
          </div>
        </section>

        {/* ========== SECTION 1: PROJECT OVERVIEW ========== */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">1</div>
            <h2 className="text-3xl font-bold">Project Overview</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-5 rounded-2xl border border-primary/20 print:bg-gray-50">
              <p className="font-medium text-muted-foreground text-sm">Project Name</p>
              <p className="text-2xl font-bold text-primary">Medi-Share</p>
            </div>
            <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-5 rounded-2xl border border-secondary/20 print:bg-gray-50">
              <p className="font-medium text-muted-foreground text-sm">Project Type</p>
              <p className="text-2xl font-bold">Full-Stack Web App</p>
            </div>
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-5 rounded-2xl border border-accent/20 print:bg-gray-50">
              <p className="font-medium text-muted-foreground text-sm">Domain</p>
              <p className="text-2xl font-bold">HealthTech + E-Commerce</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/5 to-green-500/10 p-5 rounded-2xl border border-green-500/20 print:bg-gray-50">
              <p className="font-medium text-muted-foreground text-sm">SDG Alignment</p>
              <p className="text-2xl font-bold text-green-600">Goal 3 & 12</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-2xl p-6 border border-border">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">📝</span> Abstract
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Medi-Share</strong> is an innovative healthcare marketplace platform that creates a bridge between 
              people with unused medicines and those who need them at affordable prices. Focusing on chronic disease medications 
              (Blood Pressure, Diabetes, Cancer, Heart), the platform enables location-based matching within 5-10km radius 
              for convenient meetups.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By enabling the sale of valid, unexpired medicines at approximately <strong className="text-primary">50% of the original price</strong>, 
              we address two critical issues: <em>reducing medicine wastage</em> and <em>making healthcare affordable</em>.
            </p>
          </div>
        </section>

        {/* ========== SECTION 2: PROBLEM STATEMENT ========== */}
        <section className="mb-12 print:page-break-before-always">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">2</div>
            <h2 className="text-3xl font-bold">Problem Statement</h2>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="bg-gradient-to-r from-red-500/10 to-red-500/5 border-l-4 border-red-500 p-5 rounded-r-2xl">
              <h4 className="font-bold mb-2 text-lg flex items-center gap-2">
                <span className="text-2xl">🏥</span> Medicine Wastage Crisis
              </h4>
              <p className="text-muted-foreground">Billions worth of medicines are wasted annually due to patient recovery/death, prescription changes, over-purchasing, and expiration of unused medicines.</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500/10 to-orange-500/5 border-l-4 border-orange-500 p-5 rounded-r-2xl">
              <h4 className="font-bold mb-2 text-lg flex items-center gap-2">
                <span className="text-2xl">💰</span> Affordability Gap
              </h4>
              <p className="text-muted-foreground">Chronic disease medicines are expensive. Many patients cannot afford continuous medication due to limited insurance coverage and high costs.</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-l-4 border-yellow-500 p-5 rounded-r-2xl">
              <h4 className="font-bold mb-2 text-lg flex items-center gap-2">
                <span className="text-2xl">🔗</span> Platform Absence
              </h4>
              <p className="text-muted-foreground">No trusted platform exists for medicine exchange, leading to trust issues and verification challenges for medicine authenticity.</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span> Key Statistics (India)
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 p-5 rounded-2xl text-center border border-red-500/20 print:bg-gray-100">
              <p className="text-3xl font-bold text-red-500">₹18,000+ Cr</p>
              <p className="text-sm text-muted-foreground mt-1">Medicines wasted annually</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 p-5 rounded-2xl text-center border border-orange-500/20 print:bg-gray-100">
              <p className="text-3xl font-bold text-orange-500">30%</p>
              <p className="text-sm text-muted-foreground mt-1">Patients skip doses (cost)</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 p-5 rounded-2xl text-center border border-yellow-500/20 print:bg-gray-100">
              <p className="text-3xl font-bold text-yellow-600">125,000+</p>
              <p className="text-sm text-muted-foreground mt-1">Preventable deaths/year</p>
            </div>
          </div>
        </section>

        {/* ========== SECTION 3: PROPOSED SOLUTION ========== */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">3</div>
            <h2 className="text-3xl font-bold">Proposed Solution</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-5 rounded-2xl border border-primary/30">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
                <span className="text-2xl">📍</span>
              </div>
              <h4 className="font-bold text-lg mb-2">Location-Based Matching</h4>
              <p className="text-sm text-muted-foreground">Connects buyers & sellers within 5-10km radius for easy meetups</p>
            </div>
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-5 rounded-2xl border border-secondary/30">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-3">
                <span className="text-2xl">✅</span>
              </div>
              <h4 className="font-bold text-lg mb-2">Verification System</h4>
              <p className="text-sm text-muted-foreground">Photo & bill verification for medicine authenticity</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 p-5 rounded-2xl border border-green-500/30">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-3">
                <span className="text-2xl">♻️</span>
              </div>
              <h4 className="font-bold text-lg mb-2">Waste Reduction</h4>
              <p className="text-sm text-muted-foreground">Redistribution of valid, unused medicines before expiry</p>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-5 rounded-2xl border border-accent/30">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-3">
                <span className="text-2xl">🤖</span>
              </div>
              <h4 className="font-bold text-lg mb-2">AI-Powered Assistant</h4>
              <p className="text-sm text-muted-foreground">Voice-enabled chatbot for platform guidance & support</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-2xl p-6 border border-green-500/30">
            <h3 className="text-xl font-bold mb-4 text-green-600 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Unique Value Proposition
            </h3>
            <ul className="grid md:grid-cols-2 gap-3 text-muted-foreground">
              <li className="flex items-center gap-2 bg-background/50 p-3 rounded-xl">✓ 50% cost savings on medicines</li>
              <li className="flex items-center gap-2 bg-background/50 p-3 rounded-xl">✓ Real-time location search with maps</li>
              <li className="flex items-center gap-2 bg-background/50 p-3 rounded-xl">✓ AI chatbot with voice input</li>
              <li className="flex items-center gap-2 bg-background/50 p-3 rounded-xl">✓ Secure in-app messaging</li>
              <li className="flex items-center gap-2 bg-background/50 p-3 rounded-xl">✓ Donation mode for charity</li>
              <li className="flex items-center gap-2 bg-background/50 p-3 rounded-xl">✓ Urgent medicine alerts</li>
            </ul>
          </div>
        </section>

        {/* ========== SECTION 4: TECHNOLOGY STACK ========== */}
        <section className="mb-12 print:page-break-before-always">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">4</div>
            <h2 className="text-3xl font-bold">Technology Stack</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Frontend */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-5 rounded-2xl border border-blue-500/30">
              <h3 className="font-bold text-lg mb-4 text-blue-600 flex items-center gap-2">
                <span className="text-xl">🎨</span> Frontend
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> React 18.3.1</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> TypeScript</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> Vite (Build Tool)</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> Tailwind CSS</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> shadcn/ui</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> React Router 6</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> Mapbox GL</li>
              </ul>
            </div>
            
            {/* Backend */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 p-5 rounded-2xl border border-green-500/30">
              <h3 className="font-bold text-lg mb-4 text-green-600 flex items-center gap-2">
                <span className="text-xl">⚙️</span> Backend
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Supabase (BaaS)</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> PostgreSQL</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Edge Functions (Deno)</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Row Level Security</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Supabase Auth</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Realtime Subscriptions</li>
              </ul>
            </div>
            
            {/* AI & APIs */}
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-5 rounded-2xl border border-purple-500/30">
              <h3 className="font-bold text-lg mb-4 text-purple-600 flex items-center gap-2">
                <span className="text-xl">🤖</span> AI & APIs
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-purple-500 rounded-full"></span> GPT-5-mini (AI Chat)</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-purple-500 rounded-full"></span> Web Speech API</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-purple-500 rounded-full"></span> Geolocation API</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-purple-500 rounded-full"></span> Mapbox Geocoding</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-purple-500 rounded-full"></span> React Query</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========== SECTION 5: SYSTEM ARCHITECTURE ========== */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">5</div>
            <h2 className="text-3xl font-bold">System Architecture</h2>
          </div>
          
          <div className="bg-gradient-to-br from-muted/50 to-muted/30 p-6 rounded-2xl border border-border overflow-x-auto print:bg-gray-50">
            <pre className="font-mono text-xs leading-relaxed whitespace-pre text-center">{`
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT LAYER                                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   React 18      │  │   TypeScript    │  │   Tailwind CSS  │  │   Mapbox GL     │  │
│  │   (UI Library)  │  │   (Type Safe)   │  │   (Styling)     │  │   (Maps)        │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           └────────────────────┴─────────────────────┴───────────────────┘           │
│                                         │                                            │
│                          ┌──────────────▼──────────────┐                            │
│                          │    React Router + TanStack   │                            │
│                          │       Query (State Mgmt)     │                            │
│                          └──────────────┬──────────────┘                            │
└─────────────────────────────────────────┼───────────────────────────────────────────┘
                                          │ HTTPS
┌─────────────────────────────────────────▼───────────────────────────────────────────┐
│                                   API LAYER                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                         Supabase Client SDK                                   │   │
│  │    • Authentication (JWT)  • Realtime Subscriptions  • Storage Client        │   │
│  └────────────────────────────────────┬─────────────────────────────────────────┘   │
└───────────────────────────────────────┼─────────────────────────────────────────────┘
                                        │
┌───────────────────────────────────────▼─────────────────────────────────────────────┐
│                                BACKEND LAYER (Supabase)                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  PostgreSQL DB  │  │ Edge Functions  │  │  Auth Service   │  │    Storage      │  │
│  │  + RLS Policies │  │ (Deno Runtime)  │  │  (JWT-based)    │  │   (Files)       │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                    │                    │                    │           │
│  ┌────────▼────────────────────▼────────────────────▼────────────────────▼────────┐  │
│  │                              Row Level Security (RLS)                          │  │
│  │            • User-based access control  • Data isolation per user              │  │
│  └────────────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────────┘
            `}</pre>
          </div>
        </section>

        {/* ========== SECTION 6: UML DIAGRAMS ========== */}
        <section className="mb-12 print:page-break-before-always">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">6</div>
            <h2 className="text-3xl font-bold">UML Diagrams</h2>
          </div>

          {/* Use Case Diagram */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">👤</span> 6.1 Use Case Diagram
            </h3>
            <div className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 p-6 rounded-2xl border border-blue-500/30 overflow-x-auto print:bg-gray-50">
              <pre className="font-mono text-xs leading-relaxed whitespace-pre">{`
                                    ┌─────────────────────────────────────────┐
                                    │           MEDI-SHARE SYSTEM             │
                                    │                                         │
   ┌──────────┐                     │  ┌─────────────────────────────────┐   │
   │          │                     │  │                                 │   │
   │  Guest   │─────────────────────┼──│  Browse Medicine Listings       │   │
   │  User    │                     │  │                                 │   │
   │          │─────────────────────┼──│  Search by Location/Category    │   │
   └──────────┘                     │  │                                 │   │
        │                           │  │  View Listing Details           │   │
        │ <<extends>>               │  │                                 │   │
        ▼                           │  │  Use AI Chatbot                 │   │
   ┌──────────┐                     │  │                                 │   │
   │          │─────────────────────┼──│  Register/Login                 │   │
   │Registered│                     │  └─────────────────────────────────┘   │
   │   User   │                     │                                         │
   │  (Buyer) │─────────────────────┼──┌─────────────────────────────────┐   │
   │          │                     │  │                                 │   │
   └──────────┘                     │  │  Send Message to Seller         │   │
        │                           │  │                                 │   │
        │ <<extends>>               │  │  Contact for Meetup             │   │
        ▼                           │  │                                 │   │
   ┌──────────┐                     │  │  Manage Profile                 │   │
   │          │                     │  │                                 │   │
   │  Seller  │─────────────────────┼──│  Create/Edit Listings           │   │
   │          │                     │  │                                 │   │
   │          │─────────────────────┼──│  Upload Medicine Photos/Bills   │   │
   │          │                     │  │                                 │   │
   │          │─────────────────────┼──│  Mark as Sold/Donated           │   │
   │          │                     │  │                                 │   │
   │          │─────────────────────┼──│  View Dashboard & Analytics     │   │
   │          │                     │  │                                 │   │
   └──────────┘                     │  └─────────────────────────────────┘   │
                                    │                                         │
                                    └─────────────────────────────────────────┘
            `}</pre>
            </div>
          </div>

          {/* Class Diagram */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🏗️</span> 6.2 Class Diagram
            </h3>
            <div className="bg-gradient-to-br from-green-500/5 to-green-500/10 p-6 rounded-2xl border border-green-500/30 overflow-x-auto print:bg-gray-50">
              <pre className="font-mono text-xs leading-relaxed whitespace-pre">{`
┌───────────────────────────────────┐     ┌───────────────────────────────────┐
│              User                 │     │            Listing                │
├───────────────────────────────────┤     ├───────────────────────────────────┤
│ - id: UUID                        │     │ - id: UUID                        │
│ - email: String                   │     │ - medicine_name: String           │
│ - created_at: DateTime            │     │ - description: String             │
├───────────────────────────────────┤     │ - category: MedicineCategory      │
│ + signUp(email, password): void   │     │ - original_price: Decimal         │
│ + signIn(email, password): void   │     │ - selling_price: Decimal          │
│ + signOut(): void                 │     │ - expiry_date: Date               │
│ + resetPassword(email): void      │     │ - photo_url: String               │
└───────────────┬───────────────────┘     │ - bill_url: String                │
                │ 1                        │ - location_lat: Float             │
                │                          │ - location_lng: Float             │
                │ has                      │ - city: String                    │
                │                          │ - status: ListingStatus           │
                ▼ 1                        │ - is_donation: Boolean            │
┌───────────────────────────────────┐     │ - is_urgent: Boolean              │
│            Profile                │     │ - user_id: UUID (FK)              │
├───────────────────────────────────┤     │ - created_at: DateTime            │
│ - id: UUID (FK to User)           │     ├───────────────────────────────────┤
│ - full_name: String               │     │ + create(): void                  │
│ - phone: String                   │     │ + update(): void                  │
│ - city: String                    │     │ + delete(): void                  │
│ - avatar_url: String              │     │ + markAsSold(): void              │
│ - is_verified: Boolean            │     │ + markAsDonated(): void           │
│ - location_lat: Float             │     └───────────────┬───────────────────┘
│ - location_lng: Float             │                     │ *
│ - created_at: DateTime            │                     │
├───────────────────────────────────┤                     │ belongs to
│ + updateProfile(): void           │                     │
│ + uploadAvatar(): void            │                     ▼ 1
└───────────────┬───────────────────┘     ┌───────────────────────────────────┐
                │ 1                        │           Message                 │
                │                          ├───────────────────────────────────┤
                │ sends/receives           │ - id: UUID                        │
                │                          │ - content: String                 │
                ▼ *                        │ - sender_id: UUID (FK)            │
┌───────────────────────────────────┐     │ - receiver_id: UUID (FK)          │
│           Message                 │◄────│ - listing_id: UUID (FK)           │
└───────────────────────────────────┘     │ - is_read: Boolean                │
                                          │ - created_at: DateTime            │
                                          ├───────────────────────────────────┤
                                          │ + send(): void                    │
                                          │ + markAsRead(): void              │
                                          └───────────────────────────────────┘

┌───────────────────────────────────┐     ┌───────────────────────────────────┐
│       <<enumeration>>             │     │       <<enumeration>>             │
│       MedicineCategory            │     │        ListingStatus              │
├───────────────────────────────────┤     ├───────────────────────────────────┤
│ BLOOD_PRESSURE                    │     │ ACTIVE                            │
│ DIABETES                          │     │ SOLD                              │
│ CANCER                            │     │ EXPIRED                           │
│ HEART                             │     │ DONATED                           │
│ PAIN_RELIEF                       │     └───────────────────────────────────┘
│ ANTIBIOTICS                       │
│ RESPIRATORY                       │
│ VITAMINS                          │
│ OTHER                             │
└───────────────────────────────────┘
            `}</pre>
            </div>
          </div>

          {/* Sequence Diagram */}
          <div className="mb-8 print:page-break-before-always">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🔄</span> 6.3 Sequence Diagram - Create Listing Flow
            </h3>
            <div className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 p-6 rounded-2xl border border-purple-500/30 overflow-x-auto print:bg-gray-50">
              <pre className="font-mono text-xs leading-relaxed whitespace-pre">{`
┌─────────┐          ┌─────────────┐          ┌──────────────┐          ┌─────────────┐          ┌─────────────┐
│  User   │          │  React App  │          │ Supabase SDK │          │  PostgreSQL │          │   Storage   │
└────┬────┘          └──────┬──────┘          └──────┬───────┘          └──────┬──────┘          └──────┬──────┘
     │                      │                        │                         │                        │
     │  1. Click "List Medicine"                     │                         │                        │
     │─────────────────────►│                        │                         │                        │
     │                      │                        │                         │                        │
     │  2. Display Form     │                        │                         │                        │
     │◄─────────────────────│                        │                         │                        │
     │                      │                        │                         │                        │
     │  3. Fill Details + Select Location            │                         │                        │
     │─────────────────────►│                        │                         │                        │
     │                      │                        │                         │                        │
     │  4. Upload Photo     │                        │                         │                        │
     │─────────────────────►│                        │                         │                        │
     │                      │                        │                         │                        │
     │                      │  5. Upload to Storage  │                         │                        │
     │                      │───────────────────────►│                         │                        │
     │                      │                        │                         │                        │
     │                      │                        │  6. Store File          │                        │
     │                      │                        │────────────────────────────────────────────────►│
     │                      │                        │                         │                        │
     │                      │                        │  7. Return URL          │                        │
     │                      │                        │◄────────────────────────────────────────────────│
     │                      │                        │                         │                        │
     │                      │  8. Receive Photo URL  │                         │                        │
     │                      │◄───────────────────────│                         │                        │
     │                      │                        │                         │                        │
     │  9. Submit Form      │                        │                         │                        │
     │─────────────────────►│                        │                         │                        │
     │                      │                        │                         │                        │
     │                      │  10. Insert Listing    │                         │                        │
     │                      │───────────────────────►│                         │                        │
     │                      │                        │                         │                        │
     │                      │                        │  11. Check RLS Policy   │                        │
     │                      │                        │────────────────────────►│                        │
     │                      │                        │                         │                        │
     │                      │                        │  12. Insert Record      │                        │
     │                      │                        │────────────────────────►│                        │
     │                      │                        │                         │                        │
     │                      │                        │  13. Return Success     │                        │
     │                      │                        │◄────────────────────────│                        │
     │                      │                        │                         │                        │
     │                      │  14. Success Response  │                         │                        │
     │                      │◄───────────────────────│                         │                        │
     │                      │                        │                         │                        │
     │  15. Show Success & Redirect                  │                         │                        │
     │◄─────────────────────│                        │                         │                        │
     │                      │                        │                         │                        │
     ▼                      ▼                        ▼                         ▼                        ▼
            `}</pre>
            </div>
          </div>

          {/* Activity Diagram */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span> 6.4 Activity Diagram - Medicine Search Flow
            </h3>
            <div className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 p-6 rounded-2xl border border-orange-500/30 overflow-x-auto print:bg-gray-50">
              <pre className="font-mono text-xs leading-relaxed whitespace-pre">{`
                                          ┌───────────────┐
                                          │    START      │
                                          └───────┬───────┘
                                                  │
                                                  ▼
                                    ┌─────────────────────────┐
                                    │  User Opens Search Page │
                                    └────────────┬────────────┘
                                                 │
                                                 ▼
                              ┌───────────────────────────────────┐
                              │  Get User's Current Location      │
                              │  (Geolocation API)                │
                              └─────────────────┬─────────────────┘
                                                │
                                    ┌───────────┴───────────┐
                                    ▼                       ▼
                         ┌──────────────────┐    ┌──────────────────┐
                         │ Location Granted │    │ Location Denied  │
                         └────────┬─────────┘    └────────┬─────────┘
                                  │                       │
                                  │                       ▼
                                  │              ┌──────────────────┐
                                  │              │ Use Default City │
                                  │              │   Location       │
                                  │              └────────┬─────────┘
                                  │                       │
                                  └───────────┬───────────┘
                                              │
                                              ▼
                              ┌───────────────────────────────────┐
                              │     Enter Search Criteria         │
                              │  • Medicine Name                  │
                              │  • Category Filter                │
                              │  • Price Range                    │
                              │  • Distance Radius (5-10km)       │
                              └─────────────────┬─────────────────┘
                                                │
                                                ▼
                              ┌───────────────────────────────────┐
                              │    Fetch Matching Listings        │
                              │    (Supabase Query with RLS)      │
                              └─────────────────┬─────────────────┘
                                                │
                                    ┌───────────┴───────────┐
                                    ▼                       ▼
                         ┌──────────────────┐    ┌──────────────────┐
                         │ Results Found    │    │ No Results       │
                         └────────┬─────────┘    └────────┬─────────┘
                                  │                       │
                                  ▼                       ▼
                    ┌──────────────────────┐   ┌──────────────────────┐
                    │ Display Listings     │   │ Show "No Results"    │
                    │ Grid + Map View      │   │ + Suggestions        │
                    └──────────┬───────────┘   └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ User Selects Listing │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ View Listing Details │
                    │ + Contact Seller     │
                    └──────────┬───────────┘
                               │
                               ▼
                          ┌─────────┐
                          │   END   │
                          └─────────┘
            `}</pre>
            </div>
          </div>
        </section>

        {/* ========== SECTION 7: DATABASE DESIGN ========== */}
        <section className="mb-12 print:page-break-before-always">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">7</div>
            <h2 className="text-3xl font-bold">Database Design</h2>
          </div>
          
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🗄️</span> Entity Relationship Diagram
          </h3>
          <div className="bg-gradient-to-br from-muted/50 to-muted/30 p-6 rounded-2xl border border-border overflow-x-auto print:bg-gray-50 mb-6">
            <pre className="font-mono text-xs leading-relaxed whitespace-pre">{`
┌──────────────────────────────────┐              ┌──────────────────────────────────┐
│            PROFILES              │              │            LISTINGS              │
├──────────────────────────────────┤              ├──────────────────────────────────┤
│ PK │ id          │ UUID         │              │ PK │ id             │ UUID       │
│    │ full_name   │ VARCHAR(255) │              │ FK │ user_id        │ UUID       │──┐
│    │ phone       │ VARCHAR(20)  │              │    │ medicine_name  │ VARCHAR    │  │
│    │ city        │ VARCHAR(100) │              │    │ description    │ TEXT       │  │
│    │ avatar_url  │ TEXT         │      1     * │    │ category       │ ENUM       │  │
│    │ is_verified │ BOOLEAN      │◄─────────────│    │ original_price │ DECIMAL    │  │
│    │ location_lat│ FLOAT        │              │    │ selling_price  │ DECIMAL    │  │
│    │ location_lng│ FLOAT        │              │    │ expiry_date    │ DATE       │  │
│    │ created_at  │ TIMESTAMP    │              │    │ photo_url      │ TEXT       │  │
│    │ updated_at  │ TIMESTAMP    │              │    │ bill_url       │ TEXT       │  │
└──────────────────────────────────┘              │    │ city           │ VARCHAR    │  │
         │                                        │    │ location_lat   │ FLOAT      │  │
         │ 1                                      │    │ location_lng   │ FLOAT      │  │
         │                                        │    │ status         │ ENUM       │  │
         │ sends/receives                         │    │ is_donation    │ BOOLEAN    │  │
         │                                        │    │ is_urgent      │ BOOLEAN    │  │
         ▼ *                                      │    │ created_at     │ TIMESTAMP  │  │
┌──────────────────────────────────┐              └──────────────────────────────────┘  │
│            MESSAGES              │                            │                       │
├──────────────────────────────────┤                            │ 1                     │
│ PK │ id          │ UUID         │                            │                       │
│ FK │ sender_id   │ UUID         │──┐                         │ has                   │
│ FK │ receiver_id │ UUID         │──┤                         │                       │
│ FK │ listing_id  │ UUID         │──┼─────────────────────────┘                       │
│    │ content     │ TEXT         │  │           *                                     │
│    │ is_read     │ BOOLEAN      │  │                                                 │
│    │ created_at  │ TIMESTAMP    │  │                                                 │
└──────────────────────────────────┘  │                                                 │
                                      │                                                 │
                                      └─────────────────────────────────────────────────┘
            `}</pre>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-5 rounded-2xl border border-blue-500/30 print:bg-gray-100">
              <h4 className="font-bold mb-3 text-blue-600">Medicine Categories (ENUM)</h4>
              <ul className="text-sm text-muted-foreground space-y-1 grid grid-cols-2">
                <li>• blood_pressure</li>
                <li>• diabetes</li>
                <li>• cancer</li>
                <li>• heart</li>
                <li>• pain_relief</li>
                <li>• antibiotics</li>
                <li>• respiratory</li>
                <li>• vitamins</li>
                <li>• other</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 p-5 rounded-2xl border border-green-500/30 print:bg-gray-100">
              <h4 className="font-bold mb-3 text-green-600">Listing Status (ENUM)</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span> active - Available
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span> sold - Purchased
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span> expired - Past date
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span> donated - Charity
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========== SECTION 8: FEATURES ========== */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">8</div>
            <h2 className="text-3xl font-bold">Features & Modules</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span>🔐</span>
                </div>
                <h3 className="font-bold text-blue-600">Authentication Module</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Email/Password registration & login</li>
                <li>• JWT-based secure authentication</li>
                <li>• Password reset functionality</li>
                <li>• Profile management</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-500/5 to-green-500/10 border border-green-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <span>💊</span>
                </div>
                <h3 className="font-bold text-green-600">Listings Module</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Create/Edit medicine listings</li>
                <li>• Photo & bill upload</li>
                <li>• Auto 50% discount pricing</li>
                <li>• Interactive location picker</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 border border-purple-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <span>🔍</span>
                </div>
                <h3 className="font-bold text-purple-600">Search Module</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Text-based search with filters</li>
                <li>• Location-based (5-10km radius)</li>
                <li>• Price & expiry date filters</li>
                <li>• Grid/Map view toggle</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border border-orange-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <span>🤖</span>
                </div>
                <h3 className="font-bold text-orange-600">AI Chatbot Module</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Natural language understanding</li>
                <li>• Voice input (Web Speech API)</li>
                <li>• Context-aware responses</li>
                <li>• Platform guidance</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-500/5 to-pink-500/10 border border-pink-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <span>💬</span>
                </div>
                <h3 className="font-bold text-pink-600">Messaging Module</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Real-time chat</li>
                <li>• Message notifications</li>
                <li>• Listing-specific conversations</li>
                <li>• Read receipts</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/5 to-cyan-500/10 border border-cyan-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <span>📊</span>
                </div>
                <h3 className="font-bold text-cyan-600">Dashboard Module</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• User listings management</li>
                <li>• Analytics & statistics</li>
                <li>• Quick actions</li>
                <li>• Status tracking</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========== SECTION 9: API DOCUMENTATION ========== */}
        <section className="mb-12 print:page-break-before-always">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">9</div>
            <h2 className="text-3xl font-bold">API Documentation</h2>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-5 rounded-2xl mb-6 border border-purple-500/30 print:bg-gray-100">
            <h4 className="font-bold mb-2 text-purple-600 flex items-center gap-2">
              <span className="text-xl">🤖</span> Edge Function: Chat Assistant
            </h4>
            <p className="text-sm mb-2"><strong>Endpoint:</strong> <code className="bg-background/50 px-2 py-1 rounded">/functions/v1/chat-assistant</code></p>
            <p className="text-sm mb-2"><strong>Method:</strong> POST</p>
            <p className="text-sm mb-2"><strong>Auth:</strong> Not required (public)</p>
            <div className="bg-background/50 p-3 rounded-xl mt-3 font-mono text-xs">
              <p className="text-muted-foreground mb-2">// Request Body</p>
              <pre>{`{
  "message": "How do I list a medicine?",
  "conversationHistory": []
}`}</pre>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">REST API Endpoints</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-primary/20 to-secondary/20">
                  <th className="border border-border p-3 text-left font-bold">Operation</th>
                  <th className="border border-border p-3 text-left font-bold">Method & Endpoint</th>
                  <th className="border border-border p-3 text-left font-bold">Auth</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-muted/30"><td className="border border-border p-3">Get all listings</td><td className="border border-border p-3 font-mono text-xs">GET /rest/v1/listings</td><td className="border border-border p-3">❌ No</td></tr>
                <tr className="bg-muted/20 hover:bg-muted/30"><td className="border border-border p-3">Create listing</td><td className="border border-border p-3 font-mono text-xs">POST /rest/v1/listings</td><td className="border border-border p-3">✅ Yes</td></tr>
                <tr className="hover:bg-muted/30"><td className="border border-border p-3">Update listing</td><td className="border border-border p-3 font-mono text-xs">PATCH /rest/v1/listings</td><td className="border border-border p-3">✅ Yes</td></tr>
                <tr className="bg-muted/20 hover:bg-muted/30"><td className="border border-border p-3">Delete listing</td><td className="border border-border p-3 font-mono text-xs">DELETE /rest/v1/listings</td><td className="border border-border p-3">✅ Yes</td></tr>
                <tr className="hover:bg-muted/30"><td className="border border-border p-3">Get profile</td><td className="border border-border p-3 font-mono text-xs">GET /rest/v1/profiles</td><td className="border border-border p-3">❌ No</td></tr>
                <tr className="bg-muted/20 hover:bg-muted/30"><td className="border border-border p-3">Send message</td><td className="border border-border p-3 font-mono text-xs">POST /rest/v1/messages</td><td className="border border-border p-3">✅ Yes</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========== SECTION 10: SECURITY ========== */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">10</div>
            <h2 className="text-3xl font-bold">Security Implementation</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 p-5 rounded-2xl border border-green-500/30">
              <h4 className="font-bold mb-3 text-green-600 flex items-center gap-2">
                <Shield className="w-5 h-5" /> Row Level Security (RLS)
              </h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">✅ <span>Public Read: Anyone can view active listings</span></li>
                <li className="flex items-start gap-2">✅ <span>Authenticated Write: Only logged-in users can create</span></li>
                <li className="flex items-start gap-2">✅ <span>Owner Access: Users modify only their own data</span></li>
                <li className="flex items-start gap-2">✅ <span>Message Privacy: Private conversations only</span></li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-5 rounded-2xl border border-blue-500/30">
              <h4 className="font-bold mb-3 text-blue-600 flex items-center gap-2">
                <Users className="w-5 h-5" /> Data Protection
              </h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">🔒 <span>JWT-based authentication</span></li>
                <li className="flex items-start gap-2">🔒 <span>Secure password hashing (bcrypt)</span></li>
                <li className="flex items-start gap-2">🔒 <span>Location data privacy controls</span></li>
                <li className="flex items-start gap-2">🔒 <span>HTTPS encryption in transit</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========== SECTION 11: UI ========== */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">11</div>
            <h2 className="text-3xl font-bold">User Interface</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-xl">🎨</span> Color Palette
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-primary shadow-lg"></div>
                  <div>
                    <span className="font-medium">Primary</span>
                    <p className="text-xs text-muted-foreground">Vibrant Orange</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-secondary shadow-lg"></div>
                  <div>
                    <span className="font-medium">Secondary</span>
                    <p className="text-xs text-muted-foreground">Teal</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-accent shadow-lg"></div>
                  <div>
                    <span className="font-medium">Accent</span>
                    <p className="text-xs text-muted-foreground">Purple</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-xl">📱</span> Responsive Design
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-muted/30 p-3 rounded-xl">
                  <span className="font-medium">Mobile</span>
                  <span className="text-sm text-muted-foreground">&lt; 640px</span>
                </div>
                <div className="flex justify-between items-center bg-muted/30 p-3 rounded-xl">
                  <span className="font-medium">Tablet</span>
                  <span className="text-sm text-muted-foreground">768px</span>
                </div>
                <div className="flex justify-between items-center bg-muted/30 p-3 rounded-xl">
                  <span className="font-medium">Desktop</span>
                  <span className="text-sm text-muted-foreground">1024px</span>
                </div>
                <div className="flex justify-between items-center bg-muted/30 p-3 rounded-xl">
                  <span className="font-medium">Large Desktop</span>
                  <span className="text-sm text-muted-foreground">1280px+</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== SECTION 12: FUTURE ROADMAP ========== */}
        <section className="mb-12 print:page-break-before-always">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">12</div>
            <h2 className="text-3xl font-bold">Future Roadmap</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-5 rounded-2xl border border-blue-500/30">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-bold mb-3 text-blue-600">Phase 2 (Q2 2026)</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Payment integration with escrow</li>
                <li>• AI photo verification</li>
                <li>• Voice responses from chatbot</li>
                <li>• React Native mobile app</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 p-5 rounded-2xl border border-green-500/30">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-3">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-bold mb-3 text-green-600">Phase 3 (Q4 2026)</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Delivery integration</li>
                <li>• Pharmacy partnerships</li>
                <li>• Multi-language support</li>
                <li>• Health records integration</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-5 rounded-2xl border border-purple-500/30">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="font-bold mb-3 text-purple-600">Phase 4 (2027)</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Doctor consultations</li>
                <li>• Prescription management</li>
                <li>• Community support groups</li>
                <li>• International expansion</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========== SECTION 13: INSTALLATION ========== */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">13</div>
            <h2 className="text-3xl font-bold">Installation Guide</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-muted/50 to-muted/30 p-5 rounded-2xl border border-border">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <span className="text-xl">📋</span> Prerequisites
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">✅ Node.js 18+</li>
                <li className="flex items-center gap-2">✅ npm or bun package manager</li>
                <li className="flex items-center gap-2">✅ Git</li>
                <li className="flex items-center gap-2">✅ Supabase account</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 p-5 rounded-2xl border border-green-500/30 font-mono text-xs">
              <h4 className="font-bold mb-3 font-sans flex items-center gap-2">
                <span className="text-xl">💻</span> Setup Commands
              </h4>
              <pre className="text-muted-foreground">{`# Clone repository
git clone <repo-url>
cd medi-share

# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build`}</pre>
            </div>
          </div>
        </section>

        {/* ========== SECTION 14: CONCLUSION ========== */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">14</div>
            <h2 className="text-3xl font-bold">Conclusion</h2>
          </div>
          
          <div className="bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-2xl p-6 border border-border mb-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Medi-Share</strong> represents a significant step towards addressing medicine wastage and healthcare affordability in India. 
              By leveraging modern web technologies, AI capabilities, and location-based services, we've created a platform that 
              connects communities and promotes sustainable healthcare practices.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The platform's unique combination of <strong className="text-primary">50% cost savings</strong>, <strong className="text-secondary-foreground">AI-powered assistance</strong>, 
              and <strong className="text-accent-foreground">location-based matching</strong> creates a compelling solution for both medicine donors and those in need.
            </p>
          </div>

          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">📈</span> Projected Impact (Year 1)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-2xl text-center border border-primary/30 print:bg-gray-100">
              <p className="text-2xl font-bold text-primary">10,000+</p>
              <p className="text-xs text-muted-foreground">Active Users</p>
            </div>
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-4 rounded-2xl text-center border border-secondary/30 print:bg-gray-100">
              <p className="text-2xl font-bold text-secondary-foreground">5,000+</p>
              <p className="text-xs text-muted-foreground">Listings</p>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-4 rounded-2xl text-center border border-accent/30 print:bg-gray-100">
              <p className="text-2xl font-bold text-accent-foreground">2,000+</p>
              <p className="text-xs text-muted-foreground">Transactions</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 p-4 rounded-2xl text-center border border-green-500/30 print:bg-gray-100">
              <p className="text-2xl font-bold text-green-600">₹50L</p>
              <p className="text-xs text-muted-foreground">Waste Reduced</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-4 rounded-2xl text-center border border-blue-500/30 print:bg-gray-100">
              <p className="text-2xl font-bold text-blue-600">10+</p>
              <p className="text-xs text-muted-foreground">Cities</p>
            </div>
          </div>

          {/* Final Thank You */}
          <div className="text-center py-8 border-4 border-primary/20 rounded-3xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-muted-foreground mb-4">For reviewing our project documentation</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium text-primary">
                Team CodeMatrix
              </div>
              <div className="px-4 py-2 bg-secondary/10 border border-secondary/30 rounded-full text-sm font-medium">
                January 2026
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
