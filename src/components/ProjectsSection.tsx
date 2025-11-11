import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProjectModal } from "@/hooks/useProjectModal";
import Shuffle from "./Shuffle";
import ProjectLoop from "./ProjectLoop";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  thumb: string;
  tags: string[];
  summary: string;
  details: string[];
  tools: string[];
  impact: string;
  images?: string[];
}

export default function ProjectsSection() {
  const { open, setOpen, Modal } = useProjectModal();
  
  // Mobile carousel configuration  
  const [mobileEmblaRef, mobileEmblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const projects: Project[] = [
    {
      id: '1',
      title: 'Financial Forecasting for L\'Oréal',
      subtitle: '5-year financial forecast model',
      thumb: '',
      tags: ['Excel', 'VBA', 'Financial Modeling', 'Scenario Analysis'],
      summary: 'Developed a 5-year financial forecast model for L\'Oréal by analyzing 3 years of historical financial data. Built consolidated cash flow and balance sheet projections.',
      details: [
        'Conducted trend analysis on revenues, costs, and margins',
        'Modeled scenarios for aggressive, baseline, and conservative growth strategies',
        'Projected 15% annual revenue growth, highlighting risks from FX and supply chain volatility',
        'Delivered interactive model outputs in Excel with advanced formulas and macros'
      ],
      tools: ['Excel', 'VBA', 'Scenario Analysis'],
      impact: 'Provided strategic insights for financial planning & capital allocation'
    },
    {
      id: '2',
      title: 'Project Green – Sustainability Drive',
      subtitle: 'Community eco-sustainability initiative',
      thumb: '',
      tags: ['Project Management', 'Leadership', 'Sustainability', 'Community'],
      summary: 'Organized and led an eco-sustainability initiative in a community project.',
      details: [
        'Supervised a team of 20 volunteers, coordinating schedules and workflows',
        'Negotiated $2,000 in sponsorships for tools, safety equipment, and refreshments',
        'Cleared over 100kg of litter, restored land for tree plantation',
        'Launched awareness campaign with posters and outreach events'
      ],
      tools: ['Project Management', 'Team Leadership', 'Fundraising'],
      impact: 'Boosted community engagement and improved local environmental quality'
    },
    {
      id: '3',
      title: 'AI-Driven Pricing & Financial Automation',
      subtitle: 'Gaddr pricing optimization system',
      thumb: '',
      tags: ['Python', 'AI/ML', 'Financial Automation', 'Reporting'],
      summary: 'Designed an AI-powered pricing model and automated monthly reporting processes for Gaddr.',
      details: [
        'Built dynamic pricing algorithms that optimized competitiveness in a saturated digital market',
        'Automated reporting pipelines, reducing manual effort and ensuring 100% compliance with financial regulations',
        'Prepared year-end reports for regulators and internal management'
      ],
      tools: ['Python', 'Excel', 'Financial Reporting Systems'],
      impact: 'Saved 10+ hours weekly for the finance team and increased revenue capture through smarter pricing'
    },
    {
      id: '4',
      title: 'Interactive Investment Dashboard',
      subtitle: 'IBM Cognos / Google Looker dashboard',
      thumb: '',
      tags: ['IBM Cognos', 'Google Looker', 'SQL', 'Data Visualization'],
      summary: 'Developed an investment performance dashboard integrating multiple KPIs for senior stakeholders.',
      details: [
        'Consolidated datasets from multiple sources (sales, expenses, market benchmarks)',
        'Built interactive dashboards for scenario forecasting, revenue tracking, and expense management',
        'Designed real-time visualizations for executive decision-making'
      ],
      tools: ['IBM Cognos', 'Google Looker Studio', 'SQL'],
      impact: 'Reduced decision cycle time by 30%, enabling management to act faster on market shifts'
    },
    {
      id: '5',
      title: 'Personal Portfolio Website',
      subtitle: 'Code-driven portfolio development',
      thumb: '',
      tags: ['React', 'JavaScript', 'HTML/CSS', 'API Integration'],
      summary: 'Designed and developed a personal portfolio site coded entirely in HTML, CSS, JavaScript, and React (no AI assistance).',
      details: [
        'Created custom transitions, live stock ticker, and animated project cards',
        'Integrated APIs for market data',
        'Deployed on GitHub Pages for global accessibility'
      ],
      tools: ['React', 'JavaScript', 'HTML/CSS', 'GitHub Pages'],
      impact: 'Showcased technical versatility alongside finance expertise'
    },
    {
      id: '6',
      title: 'Automation of Financial Reports',
      subtitle: 'Gaddr reporting workflow optimization',
      thumb: '',
      tags: ['Excel Macros', 'Python', 'Process Automation', 'Financial Reporting'],
      summary: 'Streamlined financial reporting workflow by automating manual steps.',
      details: [
        'Built automated scripts to consolidate monthly and quarterly reports',
        'Reduced reporting cycle by 30% while cutting down manual errors',
        'Ensured audit-ready financial statements with consistent formatting'
      ],
      tools: ['Excel Macros', 'Python Scripting'],
      impact: 'Improved reporting accuracy and team efficiency'
    },
    {
      id: '7',
      title: 'Machine Learning for Market Forecasting',
      subtitle: 'University predictive modeling project',
      thumb: '',
      tags: ['Python', 'Machine Learning', 'scikit-learn', 'NLP'],
      summary: 'Built predictive models for stock returns using machine learning.',
      details: [
        'Implemented regression models and decision trees with scikit-learn',
        'Incorporated sentiment analysis from financial news headlines',
        'Back-tested on 5 years of stock data, achieving R² = 0.82'
      ],
      tools: ['Python', 'scikit-learn', 'pandas', 'NLP'],
      impact: 'Demonstrated potential for data-driven trading and portfolio forecasting'
    },
    {
      id: '8',
      title: 'Risk Management Simulation',
      subtitle: 'University VaR framework project',
      thumb: '',
      tags: ['MATLAB', 'Excel', 'Python', 'Risk Management'],
      summary: 'Modeled portfolio risk using Value at Risk (VaR) frameworks.',
      details: [
        'Conducted Monte Carlo simulations for stock and bond portfolios',
        'Built stress testing scenarios to replicate 2008 crisis conditions',
        'Designed an interactive dashboard for risk managers to test exposures'
      ],
      tools: ['MATLAB', 'Excel', 'Python'],
      impact: 'Strengthened quantitative finance expertise in risk assessment'
    }
  ];

  // Mobile navigation
  const scrollTo = useCallback((index: number) => {
    if (mobileEmblaApi) mobileEmblaApi.scrollTo(index);
  }, [mobileEmblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!mobileEmblaApi) return;

    onInit(mobileEmblaApi);
    onSelect(mobileEmblaApi);
    mobileEmblaApi.on('reInit', onInit);
    mobileEmblaApi.on('select', onSelect);
  }, [mobileEmblaApi, onInit, onSelect]);

  return (
    <>
      <section id="projects" className="projects-section py-16 md:py-24 scroll-mt-24 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <Shuffle
                text="Featured Projects"
                tag="h2"
                className="font-bold"
                style={{ background: 'linear-gradient(to right, rgb(52, 211, 153), rgb(20, 184, 166))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                shuffleDirection="right"
                duration={0.35}
                animationMode="evenodd"
                shuffleTimes={1}
                ease="power3.out"
                stagger={0.03}
                threshold={0.1}
                triggerOnce={true}
                triggerOnHover={true}
                respectReducedMotion={true}
              />
            </div>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Interactive portfolio showcase highlighting my key financial and technical achievements
            </p>
          </motion.div>

          {/* Desktop Loop */}
          <div className="hidden md:block relative" style={{ height: '400px' }}>
            <ProjectLoop
              items={projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="cursor-pointer h-full"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setOpen(project)}
                >
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl border border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] h-full">
                    <div className="p-6 h-full flex flex-col">
                      <h3 className="text-xl font-bold mb-2 text-emerald-400">{project.title}</h3>
                      <p className="text-slate-300 text-sm mb-4">{project.subtitle}</p>
                      <p className="text-slate-400 text-xs mb-4 line-clamp-3 flex-grow">{project.summary}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="text-xs px-2 py-1 rounded-lg bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-xs text-slate-500">+{project.tags.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              speed={80}
              direction="left"
              itemWidth={320}
              gap={24}
              hoverSpeed={20}
              fadeOut={false}
              scaleOnHover={true}
              ariaLabel="Featured projects"
            />
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="overflow-hidden" ref={mobileEmblaRef}>
              <div className="flex gap-4">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="flex-none w-full cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setOpen(project)}
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl border border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-emerald-400">{project.title}</h3>
                        <p className="text-slate-300 text-sm mb-4">{project.subtitle}</p>
                        <p className="text-slate-400 text-xs mb-4 line-clamp-3">{project.summary}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 4).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="text-xs px-2 py-1 rounded-lg bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Mobile Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex 
                      ? 'bg-emerald-400 w-6' 
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Modal project={open} />
    </>
  );
}