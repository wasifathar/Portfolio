import { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import Particles from '@/components/Particles';

const AboutCinematic = lazy(() => import('@/components/AboutCinematic'));
const CloneChatSection = lazy(() => import('@/components/CloneChatSection'));

const AboutPage = () => {
  const [showChat, setShowChat] = useState(false);

  // Optimized scroll handler with useCallback and passive listener
  const handleScroll = useCallback(() => {
    if (window.scrollY > window.innerHeight * 0.5 && !showChat) {
      setShowChat(true);
    }
  }, [showChat]);

  useEffect(() => {
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="relative min-h-screen">
      {/* Optimized Particles Background - Reduced particle count for better performance */}
      <div style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={100}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      
      <div className="relative z-10">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-muted-foreground">Loading...</div></div>}>
          <AboutCinematic />
        </Suspense>
        
        {showChat && (
          <Suspense fallback={<div className="min-h-screen" />}>
            <CloneChatSection />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default AboutPage;

