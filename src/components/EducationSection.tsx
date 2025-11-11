import { motion } from "framer-motion";
import { containerStagger, popCard } from "@/lib/motion";
import { Calendar, MapPin, Star, BookOpen, Award } from 'lucide-react';
import TiltedCard from './TiltedCard';

export default function EducationSection() {
  const education = [
    {
      id: 'masters',
      degree: 'MSc Economics & Finance',
      institution: 'University of Milan',
      logo: '/uploads/fe31ce80-5100-4648-8e28-d18a6ae02260.png',
      location: 'Italy',
      period: 'June 2025 - 2027 (Expected)',
      status: 'ongoing',
      grade: '',
      description: 'Since June 2025, coursework includes econometrics, financial analysis, policy evaluation, and risk management. Focus: quantitative methods, research design, and international economic policy. International program taught in English. Quantitative Finance track. Expected graduation: 2027.',
      thesis: ''
    },
    {
      id: 'bachelors',
      degree: 'BSc Management for Business & Economics',
      institution: 'University of Pisa',
      logo: '/uploads/10be7adb-29c0-4587-96d1-2e13f1d323c4.png',
      location: 'Italy',
      period: 'September 2021 - May 2025',
      status: 'completed',
      grade: '96/110',
      description: 'Sept 2021 – May 2025. Coursework: Industrial Economics, Quantitative Economics, Financial Reporting and Analysis, Corporate Finance, European Macroeconomics, Principles of Accounting.',
      thesis: ''
    },
    {
      id: 'cfa',
      degree: 'CFA Level I Candidate',
      institution: 'CFA Institute',
      logo: '/uploads/b88c8741-3f8d-43b4-b58f-4f381c001824.png',
      location: 'Global',
      period: 'January 2025 - Present',
      status: 'ongoing',
      grade: '',
      description: 'Since Jan 2025. Focus: Ethical standards, financial reporting, investment tools, equity & fixed income.',
      thesis: ''
    }
  ];

  return (
    <section id="education" className="py-12 px-4 md:py-16 md:px-6">
      <div className="mx-auto max-w-[1400px] px-4">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 md:mb-12"
          style={{ background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
        >
          Education & Qualifications
        </h2>

        <motion.div
          variants={containerStagger} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center"
        >
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              variants={popCard}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <TiltedCard
                imageSrc={edu.logo}
                altText={`${edu.institution} logo`}
                captionText={edu.institution}
                containerHeight="450px"
                containerWidth="350px"
                imageHeight="450px"
                imageWidth="350px"
                rotateAmplitude={12}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div className="tilted-card-overlay-content">
                    <h3 className="tilted-card-degree">{edu.degree}</h3>
                    <p className="tilted-card-institution">{edu.institution}</p>
                    <div className="tilted-card-meta">
                      <span className="tilted-card-period">{edu.period}</span>
                      {edu.status && (
                        <span className={`tilted-card-status ${edu.status === 'ongoing' ? 'status-ongoing' : 'status-completed'}`}>
                          {edu.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                        </span>
                      )}
                      {edu.grade && (
                        <span className="tilted-card-grade">⭐ {edu.grade}</span>
                      )}
                    </div>
                  </div>
                }
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}