import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const CloneChatSection = () => {
  const chatbotUrl = "https://www.chatbase.co/chatbot-iframe/nkOSzO4U8_hUJs4R3zA5j";

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center py-20 px-4 section-snap section-fade"
      style={{ backgroundColor: '#000000' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Bloomberg Terminal Panel */}
          <div 
            className="relative p-1"
            style={{ 
              backgroundColor: '#000000',
              border: '2px solid #00FF00',
              borderRadius: '4px',
              boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)'
            }}
          >
            {/* Bloomberg Title Bar */}
            <div 
              className="font-mono text-lg font-bold mb-2 p-3"
              style={{ 
                backgroundColor: '#000000',
                color: '#00FF00',
                borderBottom: '1px solid #00FFFF'
              }}
            >
              ATHR&lt;GO&gt;
              <span 
                className="animate-pulse ml-1"
                style={{ color: '#00FF00' }}
              >
                _
              </span>
            </div>

            {/* Terminal Grid Lines */}
            <div 
              className="relative p-4"
              style={{ 
                backgroundColor: '#000000',
                backgroundImage: `
                  linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            >
              {/* Iframe Container */}
              <div 
                className="relative"
                style={{ 
                  border: '1px solid #00FF00',
                  borderRadius: '2px'
                }}
              >
                <iframe
                  src={chatbotUrl}
                  width="100%"
                  style={{
                    height: '70vh',
                    minHeight: '520px',
                    backgroundColor: '#FFFFFF',
                    border: 'none',
                    display: 'block'
                  }}
                  frameBorder="0"
                  allow="clipboard-read; clipboard-write"
                  title="AI Clone Chat"
                />
              </div>

              {/* Terminal Status Bar */}
              <motion.div 
                className="mt-3 text-center font-mono text-xs"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                viewport={{ once: true }}
                style={{ color: '#808080' }}
              >
                <p className="mb-1">
                  HAVING TROUBLE LOADING THE CHAT? OPEN IT IN A NEW TAB.
                </p>
                <a
                  href={chatbotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs transition-colors duration-300"
                  style={{ 
                    color: '#00FF00',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#00FFFF'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#00FF00'}
                >
                  <ExternalLink className="h-3 w-3" />
                  [OPEN EXTERNAL TERMINAL]
                </a>
              </motion.div>
            </div>
          </div>

          {/* Corner Brackets */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-l-2 border-t-2" style={{ borderColor: '#00FFFF' }}></div>
          <div className="absolute -top-1 -right-1 w-6 h-6 border-r-2 border-t-2" style={{ borderColor: '#00FFFF' }}></div>
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-2 border-b-2" style={{ borderColor: '#00FFFF' }}></div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-2 border-b-2" style={{ borderColor: '#00FFFF' }}></div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CloneChatSection;

