import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, TrendingUp, Zap, FileCheck } from 'lucide-react';
import { useState } from 'react';
import Shuffle from './Shuffle';
import CardSwap, { Card } from './CardSwap';

const ExperienceSection = () => {
  const [openCard, setOpenCard] = useState<string | null>(null);

  const experience = [
    {
      id: 'beko',
      role: 'IT Finance Intern',
      company: 'Beko Europe',
      location: 'Milan, Italy',
      period: 'September 2025 - Present',
      type: 'Internship',
      achievements: [
        'Contributing to the IT Finance team with a focus on SAP FI/CO implementation and support',
        'Assisting in configuration, testing, and documentation of SAP FI (General Ledger, Accounts Payable/Receivable, Asset Accounting) and CO (Cost Centers, Internal Orders, Profitability Analysis)',
        'Supporting integration between SAP FI/CO and other SAP modules (MM, SD)',
        'Participating in data validation, reconciliations, and troubleshooting system errors',
        'Collaborating with business users to gather requirements and translate them into functional specifications',
        'Engaging in process optimization and automation within SAP to improve financial reporting and compliance'
      ],
      technologies: ['SAP FICO', 'Financial Modeling', 'ERP Systems', 'Invoicing', 'Accounts Receivable', 'Accounts Payable']
    },
    {
      id: 'gaddr',
      role: 'AI-Driven Finance Intern',
      company: 'Gaddr',
      location: 'Remote/Stockholm, Sweden',
      period: 'October 2024 - July 2025',
      type: 'Internship',
      achievements: [
        'Developed AI-driven pricing strategies → improved competitiveness and revenue growth',
        'Prepared year-end financial statements in compliance with regulations',
        'Automated workflows, saving 10+ hours/week',
        'Built machine learning models for financial forecasting and risk assessment'
      ],
      technologies: ['AI Pricing Models', 'Financial Automation', 'Regulatory Compliance', 'Workflow Optimization']
    },
    {
      id: 'cortex',
      role: 'Help Desk Operator',
      company: 'Cortex A.S.',
      location: 'Prague, Czech Republic',
      period: 'March 2022 - July 2022',
      type: 'Full-time',
      achievements: [
        'Supervised distribution of 1M+ Pfizer vaccine doses across 5 countries',
        'Maintained 98% on-time delivery rate',
        'Coordinated with 15+ partners, resolving 200+ logistics issues',
        'Managed complex supply chain operations and international compliance requirements'
      ],
      technologies: ['Supply Chain Management', 'International Logistics', 'Crisis Management', 'Partner Coordination']
    },
    {
      id: 'roshan',
      role: 'Junior Accountant',
      company: 'Roshan Packages',
      location: 'Lahore, Pakistan',
      period: 'September 2017 - September 2018',
      type: 'Full-time',
      achievements: [
        'Processed AP/AR with 100% accuracy',
        'Improved reporting accuracy by 15% via GL reconciliations',
        'Supported quarterly reporting on PKR 15M in transactions',
        'Streamlined manufacturing processes and improved reporting accuracy'
      ],
      technologies: ['AP/AR Management', 'GL Reconciliations', 'Manufacturing Services', 'Process Optimization']
    }
  ];

  return (
    <section id="experience" className="py-12 px-4 md:py-16 md:px-6 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 md:mb-12">
          <Shuffle
            text="Professional Experience"
            tag="h2"
            className="font-bold text-center"
            style={{ 
              background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)))', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              backgroundClip: 'text'
            }}
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
            onShuffleComplete={() => {}}
            colorFrom={undefined}
            colorTo={undefined}
          />
        </div>

        <div style={{ height: '600px', position: 'relative' }}>
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={false}
            pauseAnimation={openCard !== null}
          >
            {experience.map((exp) => (
              <Card key={exp.id} className="bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl border border-emerald-400/30 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                {/* Main Card Content */}
                <div className="flex flex-col h-full p-8 text-left">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-3 leading-tight">
                        {exp.role}
                      </h3>
                      <p className="text-xl md:text-2xl text-slate-200 font-semibold mb-4">{exp.company}</p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm md:text-base text-slate-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-emerald-400" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-emerald-400" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs md:text-sm px-4 py-2 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 whitespace-nowrap font-medium">
                      {exp.type}
                    </span>
                  </div>

                  {/* Certificates for Gaddr */}
                  {exp.id === 'gaddr' && (
                    <div className="mb-6">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 transition-all"
                          >
                            <FileCheck className="h-4 w-4 mr-2" />
                            View Certificates
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-emerald-400/30">
                          <DialogHeader>
                            <DialogTitle className="text-emerald-400">AI-Driven Finance Internship Certificates</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4 space-y-6">
                            <div>
                              <h3 className="text-lg font-semibold mb-2 text-slate-300">Internship Certificate</h3>
                              <img 
                                src="/uploads/7e16c062-aaf7-44a7-9e6c-65718fac3ab2.png" 
                                alt="Gaddr AI-Driven Finance Internship Certificate" 
                                className="w-full h-auto rounded-lg shadow-lg border border-emerald-400/30"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-2 text-slate-300">Certificate of Participation</h3>
                              <img 
                                src="/uploads/7eeb64d6-13cd-4819-b868-ca79809968f5.png" 
                                alt="Gaddr Certificate of Participation" 
                                className="w-full h-auto rounded-lg shadow-lg border border-emerald-400/30"
                              />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}

                  {/* Certificates for Roshan */}
                  {exp.id === 'roshan' && (
                    <div className="mb-6">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 transition-all"
                          >
                            <FileCheck className="h-4 w-4 mr-2" />
                            View Certificates
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-emerald-400/30">
                          <DialogHeader>
                            <DialogTitle className="text-emerald-400">Junior Accountant Employment Certificate</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <div>
                              <h3 className="text-lg font-semibold mb-2 text-slate-300">Employment Certificate</h3>
                              <img 
                                src="/uploads/b7c18f67-8688-4ebf-82de-6febfff1cb90.png" 
                                alt="Roshan Packages Employment Certificate" 
                                className="w-full h-auto rounded-lg shadow-lg border border-emerald-400/30"
                              />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}

                  {/* Expandable Details */}
                  <div className="flex-1 flex flex-col">
                    <button
                      onClick={() => {
                        setOpenCard(openCard === exp.id ? null : exp.id);
                      }}
                      className="w-full text-left text-sm md:text-base font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-2 mb-4 transition-colors"
                    >
                      <TrendingUp className="h-4 w-4" />
                      {openCard === exp.id ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>

        {/* Glass Panel Modal */}
        {openCard && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setOpenCard(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            
            {/* Glass Panel */}
            <div 
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-emerald-400/50 bg-gradient-to-br from-slate-900/95 via-emerald-900/20 to-slate-900/95 backdrop-blur-2xl shadow-2xl p-8 animate-in fade-in zoom-in duration-300"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: '0 0 60px rgba(16, 185, 129, 0.4), 0 0 100px rgba(16, 185, 129, 0.2), inset 0 0 60px rgba(16, 185, 129, 0.1)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setOpenCard(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-emerald-400/20 hover:bg-emerald-400/30 border border-emerald-400/50 text-emerald-300 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Content */}
              {(() => {
                const exp = experience.find(e => e.id === openCard);
                if (!exp) return null;
                
                return (
                  <div className="space-y-8">
                    {/* Header */}
                    <div className="border-b border-emerald-400/30 pb-6">
                      <h3 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-3">
                        {exp.role}
                      </h3>
                      <p className="text-xl md:text-2xl text-slate-200 font-semibold mb-4">{exp.company}</p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-base md:text-lg text-slate-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-emerald-400" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-emerald-400" />
                          <span>{exp.location}</span>
                        </div>
                        <span className="text-sm md:text-base px-4 py-2 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 font-medium">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div>
                      <h4 className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-emerald-400 mb-4">
                        <TrendingUp className="h-6 w-6" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-4">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-4 text-base md:text-lg text-slate-300 leading-relaxed">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60 mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Technologies & Skills */}
                    <div>
                      <h4 className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-emerald-400 mb-4">
                        <Zap className="h-6 w-6" />
                        Technologies & Skills
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {exp.technologies.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="text-sm md:text-base px-4 py-2 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Certificates */}
                    {(exp.id === 'gaddr' || exp.id === 'roshan') && (
                      <div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="lg" 
                              variant="outline"
                              className="bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-300 border-2 border-emerald-400/50 transition-all text-base"
                            >
                              <FileCheck className="h-5 w-5 mr-2" />
                              View Certificates
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-emerald-400/30">
                            <DialogHeader>
                              <DialogTitle className="text-emerald-400">
                                {exp.id === 'gaddr' ? 'AI-Driven Finance Internship Certificates' : 'Junior Accountant Employment Certificate'}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="mt-4 space-y-6">
                              {exp.id === 'gaddr' && (
                                <>
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2 text-slate-300">Internship Certificate</h3>
                                    <img 
                                      src="/uploads/7e16c062-aaf7-44a7-9e6c-65718fac3ab2.png" 
                                      alt="Gaddr AI-Driven Finance Internship Certificate" 
                                      className="w-full h-auto rounded-lg shadow-lg border border-emerald-400/30"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2 text-slate-300">Certificate of Participation</h3>
                                    <img 
                                      src="/uploads/7eeb64d6-13cd-4819-b868-ca79809968f5.png" 
                                      alt="Gaddr Certificate of Participation" 
                                      className="w-full h-auto rounded-lg shadow-lg border border-emerald-400/30"
                                    />
                                  </div>
                                </>
                              )}
                              {exp.id === 'roshan' && (
                                <div>
                                  <h3 className="text-lg font-semibold mb-2 text-slate-300">Employment Certificate</h3>
                                  <img 
                                    src="/uploads/b7c18f67-8688-4ebf-82de-6febfff1cb90.png" 
                                    alt="Roshan Packages Employment Certificate" 
                                    className="w-full h-auto rounded-lg shadow-lg border border-emerald-400/30"
                                  />
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;