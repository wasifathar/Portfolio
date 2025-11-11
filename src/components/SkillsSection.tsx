import { motion } from "framer-motion";
import { containerStagger, popCard } from "@/lib/motion";

const skills = [
  {
    name: "Python",
    logo: "/lovable-uploads/694cd1b4-b3eb-4500-af81-57db1b8a26f0.png",
    category: "Programming"
  },
  {
    name: "R",
    logo: "/lovable-uploads/697a2888-fcc4-4616-a109-bb4d47f2cd2a.png",
    category: "Programming"
  },
  {
    name: "MATLAB",
    logo: "/lovable-uploads/eefcf9be-0bff-4a8c-9693-ca1f345f86ca.png",
    category: "Programming"
  },
  {
    name: "Oracle",
    logo: "/lovable-uploads/044fa6f8-6284-4e68-bd03-5439a216bf8a.png",
    category: "Database"
  },
  {
    name: "Anaconda",
    logo: "/lovable-uploads/66107a78-8ab5-4894-81f7-3c331b49f6fb.png",
    category: "Data Science"
  },
  {
    name: "Looker",
    logo: "/lovable-uploads/976c636c-0dcd-4247-a883-e4ea6e1b4ea4.png",
    category: "Business Intelligence"
  },
  {
    name: "Cognos",
    logo: "/lovable-uploads/65ab119e-1a7e-431d-b64e-82523115b460.png",
    category: "Business Intelligence"
  },
  {
    name: "Audit Analytics",
    logo: "/lovable-uploads/beadcd87-0139-4a75-8323-f4b438be5bdd.png",
    category: "Audit & Compliance"
  },
  {
    name: "GAAP",
    logo: "/lovable-uploads/2dff0782-0733-4dcb-a705-e004a4f8ab27.png",
    category: "Accounting Standards"
  },
  {
    name: "Financial Analysis",
    logo: "/lovable-uploads/956216c2-df10-46a0-8fd8-006d05cef1e1.png",
    category: "Financial Modeling"
  },
  {
    name: "Slack",
    logo: "/lovable-uploads/5b060cba-555c-4ccf-8b75-36200dc8f928.png",
    category: "Communication"
  },
  {
    name: "SOX Compliance",
    logo: "/lovable-uploads/71914503-ce59-4f22-be44-c434862c1648.png",
    category: "Regulatory Compliance"
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold mb-12 text-center"
        >
          Technical Skills & Tools
        </motion.h2>

        <motion.div
          variants={containerStagger} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8"
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              variants={popCard}
              whileHover={{ 
                y: -8, 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group flex flex-col items-center p-6 rounded-2xl bg-[rgba(8,20,35,.4)] backdrop-blur-md border border-white/5 hover:border-emerald-400/20 transition-all duration-300"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-4 overflow-hidden rounded-xl">
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <h3 className="text-sm md:text-base font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300 text-center">
                {skill.name}
              </h3>
              
              <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mt-1 text-center">
                {skill.category}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}