import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, Calendar, Target, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import Shuffle from './Shuffle';
import DecayCard from './DecayCard';
import { motion } from 'framer-motion';
import { containerStagger, popCard } from '@/lib/motion';

const ResearchSection = () => {
  const [openCard, setOpenCard] = useState<string | null>(null);
  const publications = [
    {
      id: 'brain-drain',
      title: 'The Impact of Brain Drain: Assessing Economic Shifts in Pakistan',
      year: '2025',
      venue: 'SSRN',
      type: 'Research Paper',
      url: 'https://ssrn.com/abstract=5292332',
      abstract: 'This paper explores how the emigration of skilled professionals ("brain drain") affects Pakistan\'s economy. It evaluates both short-term remittance benefits and long-term challenges in human capital depletion.',
      methodology: [
        'Used World Bank and IMF datasets (1990–2023) with econometric modeling',
        'Analyzed GDP growth, labor market dynamics, and productivity loss',
        'Applied time-series analysis to measure economic impact',
        'Cross-referenced remittance data with human capital metrics'
      ],
      findings: [
        'Brain drain initially supports GDP via remittances',
        'Long-term effects are negative: reduced innovation capacity, slower economic diversification',
        'Policy recommendation: targeted incentives for talent retention and diaspora engagement',
        'Quantified both positive and negative economic impacts over different time horizons'
      ],
      keywords: ['Brain Drain', 'Economic Development', 'Migration Economics', 'Policy Analysis', 'Human Capital']
    },
    {
      id: 'gdp-oil',
      title: 'Does GDP Affect Oil Prices? An Econometric Analysis of Germany and UAE',
      year: '2025',
      venue: 'SSRN',
      type: 'Econometric Study',
      url: 'https://ssrn.com/abstract=5292418',
      abstract: 'This study examines the causal relationship between GDP growth and oil price fluctuations in Germany (a net oil importer) and UAE (a net oil exporter).',
      methodology: [
        'Time-series econometric analysis using VAR (Vector Auto Regression) models',
        'Quarterly data analysis covering 1995–2023 period',
        'Granger causality testing for directional relationships',
        'Comparative analysis between oil importer vs exporter economies'
      ],
      findings: [
        'For Germany: GDP growth significantly increases oil demand, pushing prices upward',
        'For UAE: GDP growth is closely tied to oil export revenues, showing feedback loop effects',
        'GDP–oil dynamics differ for importers vs exporters, implying tailored fiscal policies',
        'Established clear causal mechanisms and policy implications for both economic models'
      ],
      keywords: ['Econometrics', 'Oil Economics', 'GDP Analysis', 'Energy Markets', 'VAR Models']
    }
  ];

  return (
    <section id="research" className="py-20 px-6 min-h-screen flex flex-col justify-center relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 font-poppins">
          <Shuffle
            text="Research & Publications"
            tag="h2"
            className="font-bold text-center"
            style={{ background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
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

        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 justify-items-center max-w-6xl mx-auto"
        >
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              variants={popCard}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative group cursor-pointer" onClick={() => setOpenCard(openCard === pub.id ? null : pub.id)}>
                <DecayCard
                  width={400}
                  height={500}
                  image="/uploads/7b08f4d9-375c-4bb2-8e99-54de8717e9f5.png"
                >
                  <div className="decay-card-content-wrapper">
                    <h3 className="decay-card-degree">{pub.title}</h3>
                    <p className="decay-card-institution">{pub.venue}</p>
                    <div className="decay-card-meta">
                      <span className="decay-card-period">{pub.year}</span>
                      <span className="decay-card-status status-completed">{pub.type}</span>
                    </div>
                  </div>
                </DecayCard>
              </div>

              {/* Modal for details */}
              {openCard === pub.id && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  onClick={() => setOpenCard(null)}
                >
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                  <div
                    className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-slate-900/95 via-primary/20 to-slate-900/95 backdrop-blur-2xl shadow-2xl p-8 animate-in fade-in zoom-in duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setOpenCard(null)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary flex items-center justify-center transition-all hover:scale-110"
                      aria-label="Close"
                    >
                      ✕
                    </button>

                    <div className="space-y-8">
                      <div className="border-b border-primary/30 pb-6">
                        <h3 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                          {pub.title}
                        </h3>
                        <div className="flex items-center gap-4 text-base md:text-lg text-slate-300">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            <span>{pub.year}</span>
                          </div>
                          <span className="text-sm md:text-base px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/40 font-medium">
                            {pub.type}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-primary mb-4">
                          <FileText className="h-6 w-6" />
                          Abstract
                        </h4>
                        <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                          {pub.abstract}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-primary mb-4">
                            <Lightbulb className="h-6 w-6" />
                            Methodology
                          </h4>
                          <ul className="space-y-4">
                            {pub.methodology.map((method, idx) => (
                              <li key={idx} className="flex items-start gap-4 text-base md:text-lg text-slate-300 leading-relaxed">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                                <span>{method}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-primary mb-4">
                            <Target className="h-6 w-6" />
                            Key Findings
                          </h4>
                          <ul className="space-y-4">
                            {pub.findings.map((finding, idx) => (
                              <li key={idx} className="flex items-start gap-4 text-base md:text-lg text-slate-300 leading-relaxed">
                                <div className="w-2.5 h-2.5 rounded-full bg-secondary/60 mt-2 flex-shrink-0" />
                                <span>{finding}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-3">
                          {pub.keywords.map((keyword, idx) => (
                            <span
                              key={idx}
                              className="text-sm md:text-base px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/40 font-medium"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>

                        <Button
                          size="lg"
                          className="bg-primary/10 hover:bg-primary/20 text-primary border-2 border-primary/50 transition-all text-base"
                          onClick={(e) => {
                            e.stopPropagation();
                            try {
                              const newWindow = window.open(pub.url, '_blank', 'noopener,noreferrer');
                              if (!newWindow) {
                                window.location.href = pub.url;
                              }
                            } catch (error) {
                              console.error('Error opening link:', error);
                              window.location.href = pub.url;
                            }
                          }}
                        >
                          <ExternalLink className="h-5 w-5 mr-2" />
                          View on SSRN
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchSection;