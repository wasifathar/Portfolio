import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig, AnimatePresence } from "framer-motion";
import { CursorProvider, Cursor } from "@/components/animate-ui/components/animate/cursor";
import { useGaTracking } from "@/hooks/useGaTracking";
import PageLayout from "@/components/PageLayout";
import PageTransition from "@/components/PageTransition";
import { lazy, Suspense } from "react";

// Lazy load pages
const HeroPage = lazy(() => import("./pages/HeroPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const EducationPage = lazy(() => import("./pages/EducationPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const CertificatesPage = lazy(() => import("./pages/CertificatesPage"));
const ResearchPage = lazy(() => import("./pages/ResearchPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  useGaTracking(); // Track route changes for GA4
  
  return (
    <PageLayout>
      <AnimatePresence mode="wait">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-muted-foreground">Loading...</div></div>}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Index /></PageTransition>} />
            <Route path="/hero" element={<PageTransition><HeroPage /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/education" element={<PageTransition><EducationPage /></PageTransition>} />
            <Route path="/experience" element={<PageTransition><ExperiencePage /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
            <Route path="/skills" element={<PageTransition><SkillsPage /></PageTransition>} />
            <Route path="/certificates" element={<PageTransition><CertificatesPage /></PageTransition>} />
            <Route path="/research" element={<PageTransition><ResearchPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </PageLayout>
  );
};

const App = () => (
  <MotionConfig reducedMotion="user">
    <CursorProvider global={true}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
      <Cursor />
    </CursorProvider>
  </MotionConfig>
);

export default App;
