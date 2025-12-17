import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AIChatBot from '@/components/chat/AIChatBot';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <AIChatBot />
    </div>
  );
}
