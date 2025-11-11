import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import CircularText from "./CircularText";
import DecryptedText from "./DecryptedText";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen bg-transparent overflow-hidden flex items-center justify-center">
      
      {/* Terminal-style corner decorations */}
      <div className="absolute top-4 left-4 text-primary font-jetbrains text-xs opacity-60">
        [TERMINAL_001]
      </div>
      <div className="absolute top-4 right-4 text-accent font-jetbrains text-xs opacity-60">
        [LIVE_FEED]
      </div>
      
      {/* Main content container */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        
        {/* Profile Photo - Bloomberg Trader Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-24 md:mb-32 inline-block group"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
          <img
            src="/uploads/93ecf961-693a-4bde-9a07-c83175469e25.png"
            alt="Muhammad Wasif Athar - Financial Analyst"
            className="relative w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-2 border-primary/50 shadow-2xl group-hover:scale-105 group-hover:border-primary transition-all duration-300 z-10"
          />
          {/* Terminal-style photo border effect */}
          <div className="absolute inset-0 rounded-full border border-primary/30 animate-pulse" />
          {/* Circular Text around photo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <CircularText
              text="Math*Markets*A bit of Magic*"
              onHover="speedUp"
              spinDuration={20}
              className="text-primary"
            />
          </div>
        </motion.div>

        {/* Decrypted Text Animation - Just under photo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 mt-4"
        >
          <div className="text-xl md:text-2xl lg:text-3xl font-jetbrains text-primary leading-relaxed">
            <DecryptedText
              text="Where numbers tell stories — I'm Muhammad Wasif Athar, a Quant Finance enthusiast."
              speed={50}
              maxIterations={20}
              sequential={true}
              animateOn="both"
              revealDirection="center"
              className="text-primary"
            />
          </div>
        </motion.div>

        {/* Terminal-style Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mt-8"
        >
          <Dialog>
            <DialogTrigger asChild>
              <button className="p-[3px] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent font-jetbrains flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  [VIEW_RESUME]
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Muhammad Wasif Athar - Resume</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Page 1 - Personal Information & Experience</h3>
                  <img 
                    src="/uploads/338af449-a925-4d3a-8163-d8845d2dc512.png" 
                    alt="Resume Page 1 - Personal Information and Work Experience" 
                    className="w-full h-auto rounded-lg shadow-lg border"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Page 2 - Certificates, Projects & Skills</h3>
                  <img 
                    src="/uploads/36e626a7-d8f6-4992-9706-6163d552c01e.png" 
                    alt="Resume Page 2 - Certificates, Projects and Skills" 
                    className="w-full h-auto rounded-lg shadow-lg border"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Page 3 - Contact & Consent Information</h3>
                  <img 
                    src="/uploads/91d0a580-5126-4764-a67f-d46f9ccf8425.png" 
                    alt="Resume Page 3 - Contact Information and Consent" 
                    className="w-full h-auto rounded-lg shadow-lg border"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <a href="mailto:wasifathar@gmail.com" className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent font-jetbrains">
              [CONTACT]
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}