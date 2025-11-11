import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalZoom } from "@/lib/motion";
import { X, ExternalLink, Github } from "lucide-react";

interface Project {
  id?: string;
  title: string;
  summary?: string;
  details?: string[];
  tools?: string[];
  impact?: string;
  images?: string[];
}

export function useProjectModal() {
  const [open, setOpen] = useState<Project | null>(null);
  
  return {
    open, 
    setOpen,
    Modal: ({ project }: { project: Project | null }) => (
      <AnimatePresence>
        {project && (
          <motion.div 
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div 
              variants={modalZoom} 
              initial="hidden" 
              animate="show" 
              exit="exit"
              className="max-w-4xl w-full max-h-[90vh] rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl border border-emerald-400/30 shadow-[0_0_60px_rgba(16,185,129,0.2)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-start gap-4 p-6 pb-4 border-b border-emerald-400/20">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-emerald-400 mb-2">{project.title}</h3>
                  {project.summary && (
                    <p className="text-slate-300 text-sm leading-relaxed">{project.summary}</p>
                  )}
                </div>
                <button 
                  className="p-2 rounded-full bg-slate-800/50 border border-slate-600/30 text-slate-400 hover:text-emerald-400 hover:border-emerald-400/30 transition-all duration-300"
                  onClick={() => setOpen(null)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Project Details */}
                {project.details && project.details.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                      Project Details
                    </h4>
                    <ul className="space-y-2">
                      {project.details.map((detail, index) => (
                        <li key={index} className="text-slate-300 text-sm leading-relaxed pl-4 relative">
                          <span className="absolute left-0 top-2 w-1 h-1 bg-emerald-400/60 rounded-full"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tools & Technologies */}
                {project.tools && project.tools.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                      Tools & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-400/20 to-teal-400/20 text-emerald-300 border border-emerald-400/30 text-sm font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Impact */}
                {project.impact && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                      Impact & Results
                    </h4>
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-400/10 to-teal-400/10 border border-emerald-400/20">
                      <p className="text-slate-200 text-sm leading-relaxed font-medium">{project.impact}</p>
                    </div>
                  </div>
                )}

                {/* Project Images */}
                {project.images && project.images.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      Project Gallery
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.images.map((src: string, index: number) => (
                        <div key={index} className="relative group overflow-hidden rounded-xl border border-slate-600/30">
                          <img 
                            src={src} 
                            alt={`${project.title} - Image ${index + 1}`}
                            className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  };
}