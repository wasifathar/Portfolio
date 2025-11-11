import { ReactNode } from 'react';
import StockTicker from '@/components/StockTicker';
import Navigation from '@/components/Navigation';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-hero-terminal overflow-x-hidden">
      {/* Stock Ticker - Show on all pages */}
      <StockTicker />
      
      {/* Dock Navigation - Fixed at bottom */}
      <Navigation />
      
      {/* Page Content */}
      {children}
    </div>
  );
};

export default PageLayout;

