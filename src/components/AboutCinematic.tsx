import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Brain, Database, BarChart3, Target, Zap, Award, Users } from 'lucide-react';

// Memoized card component to prevent unnecessary re-renders
const AboutCard = memo(({ card, index, isVisible }: { card: any; index: number; isVisible: boolean }) => {
  const IconComponent = card.icon;
  
  return (
    <div
      data-card-index={index}
      className={`transition-opacity duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <Card className="group h-full border-2 bg-card/50 backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:shadow-lg relative overflow-hidden">
        {/* Simple gradient border effect - much lighter than ElectricBorder */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${card.color}40, transparent)`,
            backgroundSize: '200% 100%',
            animation: isVisible ? 'shimmer 3s infinite' : 'none'
          }}
        />
        
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors border border-primary/20">
              <IconComponent className="h-6 w-6 text-primary transition-transform duration-200 group-hover:scale-105" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-wide font-inter">
                {card.title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
            {card.content}
          </p>
        </CardContent>
      </Card>
    </div>
  );
});

AboutCard.displayName = 'AboutCard';

// Memoized skill icon component
const SkillIcon = memo(({ skill, index, isVisible }: { skill: any; index: number; isVisible: boolean }) => {
  const IconComponent = skill.icon;
  
  return (
    <div
      data-card-index={index + 4}
      className={`group transition-opacity duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transitionDelay: `${index * 30}ms` }}
    >
      <div className="text-center relative" style={{ height: '200px', width: '100%' }}>
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 group-hover:border-primary/40 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-200 backdrop-blur-sm shadow-lg">
            <IconComponent className="h-16 w-16 text-primary transition-transform duration-200 group-hover:scale-105" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 pt-2">
          <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-wider block">
            {skill.label}
          </span>
        </div>
      </div>
    </div>
  );
});

SkillIcon.displayName = 'SkillIcon';

const AboutCinematic = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  // Optimized IntersectionObserver with useCallback
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cardIndex = parseInt(entry.target.getAttribute('data-card-index') || '0');
        setVisibleCards(prev => {
          const next = new Set(prev);
          next.add(cardIndex);
          return next;
        });
      }
    });
  }, []);

  useEffect(() => {
    // Single observer instance for all cards
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '50px' // Start animation slightly before element is visible
    });

    const cards = document.querySelectorAll('[data-card-index]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [handleIntersection]);

  // Memoize data arrays to prevent recreation on every render
  const aboutCards = useMemo(() => [
    {
      title: "Who I Am",
      content: "Hello there! I'm Muhammad Wasif Athar, and I love turning numbers into narratives. I'm a finance and economics enthusiast with a passion for finding the story behind the data, and I'm always building models to bring meaning to the numbers.",
      icon: Target,
      color: '#7df9ff'
    },
    {
      title: "What I Do",
      content: "I'm currently pursuing my MSc in Economics and Finance at the University of Milan while also tackling the CFA Level I certification. Skilled in financial modeling, forecasting, and reporting using MATLAB and Excel.",
      icon: TrendingUp,
      color: '#34d399'
    },
    {
      title: "Career Highlights",
      content: "Developing AI-driven pricing strategies to boost revenue. Streamlining reports, saving 10+ hours per week. Ensuring the on-time delivery of over 1M vaccine doses.",
      icon: Award,
      color: '#a78bfa'
    },
    {
      title: "Research Impact",
      content: "Published research on brain drain in Pakistan and GDP–oil price dynamics. I thrive on teamwork, problem-solving, and critical thinking.",
      icon: Brain,
      color: '#fbbf24'
    }
  ], []);

  const skills = useMemo(() => [
    { icon: TrendingUp, label: 'Financial Modeling' },
    { icon: Brain, label: 'AI & Analytics' },
    { icon: Database, label: 'Data Science' },
    { icon: BarChart3, label: 'Risk Management' },
    { icon: Zap, label: 'Automation' },
    { icon: Users, label: 'Team Leadership' },
  ], []);

  return (
    <section id="about" className="py-20 px-6 min-h-screen flex flex-col justify-center relative overflow-hidden scroll-mt-24">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Professional Section Header - Static text instead of Shuffle */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-inter uppercase tracking-wide"
            style={{ 
              background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              backgroundClip: 'text' 
            }}
          >
            Executive Profile
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Bridging quantitative analysis and strategic finance through advanced modeling, 
            AI-driven insights, and comprehensive market research capabilities.
          </p>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {aboutCards.map((card, index) => (
            <AboutCard
              key={index}
              card={card}
              index={index}
              isVisible={visibleCards.has(index)}
            />
          ))}
        </div>

        {/* Core Competencies */}
        <div className="bg-gradient-to-r from-card/50 to-card/30 rounded-2xl p-8 border border-primary/10">
          <h3 className="text-xl font-bold text-center mb-8 font-inter uppercase tracking-wide text-primary">
            CORE COMPETENCIES
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => (
              <SkillIcon
                key={skill.label}
                skill={skill}
                index={index}
                isVisible={visibleCards.has(index + 4)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCinematic;