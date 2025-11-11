import { useState, useEffect, useRef, useCallback } from 'react';
import { Award, ExternalLink, Calendar, Building2, Star, BookOpen, ArrowLeft } from 'lucide-react';
import './GlitchyCertificatesScreen.css';

const GlitchyCertificatesScreen = () => {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [glitchActive, setGlitchActive] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const certificateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const highlightedIndexRef = useRef<number>(0);
  const certificatesRef = useRef<typeof certificates>([]);

  // Helper function to convert hex color to RGB string
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
    }
    return '132, 204, 22'; // Default lime green
  };

  const certificates = [
    {
      id: 'sap-fico',
      title: 'SAP FICO',
      institution: 'Udemy',
      year: '2025',
      date: 'July 13, 2025',
      instructor: 'Rana W Mehmood',
      hours: '40.5 total hours',
      certificateId: 'UC-bd279041-fbaa-4fe9-9bea-263e802a559d',
      description: 'Comprehensive SAP FICO training covering Financial Accounting and Management Accounting modules, including GL, AP, AR, Asset Accounting, Cost Center Accounting, and Profitability Analysis.',
      image: '/uploads/ba36f8e0-2613-4d97-b712-5ecbb545228a.png',
      verificationUrl: 'https://ude.my/UC-bd279041-fbaa-4fe9-9bea-263e802a559d',
      featured: true,
      skills: ['SAP FICO', 'Financial Accounting', 'Management Accounting', 'ERP Systems', 'GL/AP/AR'],
      color: '#84cc16' // Lime green
    },
    {
      id: 'pe-vc',
      title: 'Private Equity and Venture Capital',
      institution: 'Bocconi University',
      year: '2024',
      description: 'Deal structuring, valuation, fundraising, exits.',
      image: '/uploads/40da3693-3e24-41a8-8873-a2aef52b99a9.png',
      verificationUrl: 'https://coursera.org/verify/APJMU9MRNXXO',
      featured: true,
      skills: ['Deal Structuring', 'Valuation', 'PE/VC Strategies'],
      color: '#3b82f6' // Blue
    },
    {
      id: 'oxford-ai',
      title: 'AI in Financial Services',
      institution: 'Oxford University',
      year: '2024',
      description: 'AI fundamentals, open data in finance, portfolio optimization.',
      image: '/uploads/9b1fc860-b0e4-4fec-b68a-a2d28bf4aae9.png',
      verificationUrl: 'https://coursera.org/verify/specialization/WB6QGEQA2UD9',
      featured: true,
      skills: ['AI Fundamentals', 'Open Data', 'Portfolio Optimization'],
      color: '#f59e0b' // Amber/Orange
    },
    {
      id: 'wharton-modeling',
      title: 'Business & Financial Modeling',
      institution: 'Wharton',
      year: '2024',
      description: 'Valuation, forecasting, DCF, scenario analysis, Excel models.',
      image: '/uploads/21c3b235-a4b1-4b0c-99bb-3cf28b7fcc20.png',
      verificationUrl: 'https://coursera.org/verify/specialization/SC10WOWDIP0D',
      featured: true,
      skills: ['Valuation', 'Forecasting', 'DCF Models', 'Excel'],
      color: '#10b981' // Emerald green
    },
    {
      id: 'ibm-bi',
      title: 'Business Intelligence Essentials',
      institution: 'IBM',
      year: '2025',
      description: 'BI reporting, dashboards, Cognos, SQL.',
      image: '/uploads/886e8151-1567-41f1-93b8-8e6eeb53a62f.png',
      verificationUrl: 'https://coursera.org/verify/K7YUUGBE0RC6',
      featured: false,
      skills: ['BI Tools', 'Dashboards', 'SQL', 'Cognos'],
      color: '#8b5cf6' // Purple
    },
    {
      id: 'ai-finance',
      title: 'Introduction to Generative AI',
      institution: 'Coursera',
      year: '2025',
      description: 'LLMs in trading, automation, customer service.',
      image: '/uploads/680dfcab-b8c4-42a3-b031-e4af39d816f7.png',
      verificationUrl: 'https://coursera.org/verify/H9WIF7RJMQZ3',
      featured: false,
      skills: ['Generative AI', 'Trading Automation', 'LLMs'],
      color: '#ec4899' // Pink
    },
    {
      id: 'python-finance',
      title: 'Python for Finance',
      institution: 'Packt',
      year: '2024',
      description: 'Time-series, Monte Carlo, forecasting, NumPy, Pandas.',
      image: '/uploads/98265731-9a68-47bf-bcfc-81befa2c6529.png',
      verificationUrl: 'https://coursera.org/verify/925EXJIF7WXW',
      featured: false,
      skills: ['Python', 'Monte Carlo', 'Time Series', 'NumPy', 'Pandas'],
      color: '#06b6d4' // Cyan
    }
  ];

  // Initialize certificates ref
  certificatesRef.current = certificates;

  // Scroll to highlighted certificate
  const scrollToCertificate = useCallback((index: number) => {
    setTimeout(() => {
      const ref = certificateRefs.current[index];
      if (ref && listContainerRef.current) {
        const container = listContainerRef.current;
        const elementTop = ref.offsetTop;
        const elementBottom = elementTop + ref.offsetHeight;
        const containerTop = container.scrollTop;
        const containerBottom = containerTop + container.clientHeight;

        if (elementTop < containerTop) {
          container.scrollTo({ top: elementTop - 20, behavior: 'smooth' });
        } else if (elementBottom > containerBottom) {
          container.scrollTo({ top: elementBottom - container.clientHeight + 20, behavior: 'smooth' });
        }
      }
    }, 0);
  }, []);

  // Update refs when state changes
  useEffect(() => {
    highlightedIndexRef.current = highlightedIndex;
  }, [highlightedIndex]);

  // Auto-focus the container when component mounts - but prevent scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current && !selectedCert) {
        // Focus without scrolling
        containerRef.current.focus({ preventScroll: true });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Focus container when returning to list view - but prevent scroll
  useEffect(() => {
    if (!selectedCert && containerRef.current) {
      const timer = setTimeout(() => {
        containerRef.current?.focus({ preventScroll: true });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedCert]);

  // Random glitch effects
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Keyboard event handling - direct handler function
  const handleKeyDown = useCallback((e: React.KeyboardEvent | KeyboardEvent) => {
    console.log('handleKeyDown called:', e.key, 'selectedCert:', selectedCert);
    
    // Don't handle if typing in an input
    const target = 'target' in e ? e.target : (e as KeyboardEvent).target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      return;
    }

    const currentHighlightedIndex = highlightedIndexRef.current;
    const currentCertificates = certificatesRef.current;

    // Only handle keyboard events when not in detail view
    if (selectedCert) {
      // In detail view: Escape or Backspace goes back
      if (e.key === 'Escape' || e.key === 'Backspace') {
        console.log('Going back to list');
        if ('preventDefault' in e) e.preventDefault();
        if ('stopPropagation' in e) e.stopPropagation();
        setSelectedCert(null);
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
      return;
    }

    // In list view: handle navigation
    if (e.key === 'Enter') {
      console.log('Enter pressed, opening certificate at index:', currentHighlightedIndex);
      if ('preventDefault' in e) e.preventDefault();
      if ('stopPropagation' in e) e.stopPropagation();
      if (currentHighlightedIndex >= 0 && currentHighlightedIndex < currentCertificates.length) {
        setSelectedCert(currentCertificates[currentHighlightedIndex].id);
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    } else if (e.key === 'ArrowUp') {
      console.log('ArrowUp pressed');
      if ('preventDefault' in e) e.preventDefault();
      if ('stopPropagation' in e) e.stopPropagation();
      setHighlightedIndex((prev) => {
        const newIndex = prev > 0 ? prev - 1 : currentCertificates.length - 1;
        console.log('Setting highlighted index to:', newIndex);
        setTimeout(() => scrollToCertificate(newIndex), 10);
        return newIndex;
      });
    } else if (e.key === 'ArrowDown') {
      console.log('ArrowDown pressed');
      if ('preventDefault' in e) e.preventDefault();
      if ('stopPropagation' in e) e.stopPropagation();
      setHighlightedIndex((prev) => {
        const newIndex = prev < currentCertificates.length - 1 ? prev + 1 : 0;
        console.log('Setting highlighted index to:', newIndex);
        setTimeout(() => scrollToCertificate(newIndex), 10);
        return newIndex;
      });
    } else if (/^[1-9]$/.test(e.key)) {
      console.log('Number key pressed:', e.key);
      if ('preventDefault' in e) e.preventDefault();
      if ('stopPropagation' in e) e.stopPropagation();
      const num = parseInt(e.key);
      if (num >= 1 && num <= currentCertificates.length) {
        const newIndex = num - 1;
        console.log('Setting highlighted index to:', newIndex);
        setHighlightedIndex(newIndex);
        setTimeout(() => scrollToCertificate(newIndex), 10);
      }
    }
  }, [selectedCert, scrollToCertificate]);

  // Also add document listener as backup
  useEffect(() => {
    const handleDocumentKeyDown = (e: KeyboardEvent) => {
      // Only handle if no input is focused
      if (document.activeElement instanceof HTMLInputElement || 
          document.activeElement instanceof HTMLTextAreaElement) {
        return;
      }
      handleKeyDown(e);
    };

    document.addEventListener('keydown', handleDocumentKeyDown);
    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [handleKeyDown]);

  // Reset highlighted index when returning to list view
  useEffect(() => {
    if (!selectedCert) {
      setHighlightedIndex(0);
      highlightedIndexRef.current = 0;
      // Focus container when returning to list - but prevent scroll
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.focus({ preventScroll: true });
        }
      }, 100);
    }
  }, [selectedCert]);


  const selectedCertificate = selectedCert ? certificates.find(c => c.id === selectedCert) : null;

  return (
    <div 
      className="glitchy-screen-container" 
      tabIndex={0}
      ref={containerRef}
      onKeyDown={handleKeyDown}
      onFocus={(e) => {
        console.log('Container focused');
      }}
      onBlur={(e) => {
        console.log('Container blurred');
        // Only prevent blur if we're in list view AND user is interacting with certificates
        // Don't refocus if user clicked elsewhere on the page
        if (!selectedCert && e.relatedTarget && containerRef.current?.contains(e.relatedTarget as Node)) {
          setTimeout(() => {
            if (containerRef.current && document.activeElement !== containerRef.current) {
              containerRef.current.focus({ preventScroll: true });
            }
          }, 0);
        }
      }}
      style={{ outline: 'none' }}
    >
      <div className="macbook-setup">
        {/* MacBook */}
        <div className="macbook">
          {/* Screen/Lid */}
          <div className="macbook-lid">
            <div className="macbook-screen-frame">
              <div className="macbook-screen-top">
                <div className="macbook-camera"></div>
                <div className="macbook-brand">CERT TERMINAL</div>
              </div>
              
              <div className={`macbook-screen ${glitchActive ? 'glitch' : ''}`}>
                {/* Scanlines overlay */}
                <div className="scanlines"></div>
                
                {/* Screen content */}
                <div 
                  className="screen-content"
                  tabIndex={0}
                >
                  {!selectedCert ? (
                    // List View - Show all certificates
                    <>
                      <div className="terminal-header">
                        <div className="terminal-prompt">
                          <span className="prompt-text">$</span>
                          <span className="blinking-cursor">_</span>
                          <span className="command"> list_certificates.exe</span>
                        </div>
                        <div className="terminal-status">
                          <span className="status-text">[LOADED: {certificates.length} CERTIFICATES] | [SELECTED: {highlightedIndex + 1}/{certificates.length}]</span>
                        </div>
                      </div>

                      <div 
                        className="certificates-list"
                        ref={(el) => { listContainerRef.current = el; }}
                      >
                        {certificates.map((cert, index) => {
                          const certColor = cert.color || '#84cc16';
                          const rgbColor = hexToRgb(certColor);
                          const isHighlighted = highlightedIndex === index;
                          
                          return (
                            <div
                              key={cert.id}
                              ref={(el) => { certificateRefs.current[index] = el; }}
                              className="certificate-list-item"
                              style={{
                                '--cert-color': certColor,
                                '--cert-color-rgb': rgbColor,
                                background: isHighlighted ? `rgba(0, 120, 0, 1)` : 'rgba(0, 20, 0, 0.6)',
                                border: isHighlighted ? `4px solid ${certColor}` : `1px solid rgba(${rgbColor}, 0.3)`,
                                boxShadow: isHighlighted 
                                  ? `0 0 50px rgba(${rgbColor}, 1), inset 0 0 25px rgba(${rgbColor}, 0.6), 0 0 0 3px ${certColor}`
                                  : 'none',
                                transform: isHighlighted ? 'translateX(15px) scale(1.1)' : 'translateX(0) scale(1)',
                                outline: isHighlighted ? `3px solid ${certColor}` : 'none',
                                outlineOffset: isHighlighted ? '3px' : '0',
                                zIndex: isHighlighted ? 100 : 1,
                                transition: 'all 0.3s ease',
                                position: 'relative',
                              } as React.CSSProperties}
                              onClick={() => {
                                setHighlightedIndex(index);
                                setSelectedCert(cert.id);
                                setGlitchActive(true);
                                setTimeout(() => setGlitchActive(false), 200);
                              }}
                            >
                              <div className="cert-item-header">
                                <span className="cert-number-badge" style={{ 
                                  color: certColor,
                                  borderColor: `rgba(${rgbColor}, 0.5)`,
                                  backgroundColor: `rgba(${rgbColor}, 0.15)`
                                }}>
                                  {index + 1}
                                </span>
                                <Award className="h-4 w-4" style={{ color: certColor }} />
                                <span className="cert-item-title" style={{ color: certColor }}>{cert.title}</span>
                                {cert.featured && <Star className="h-3 w-3" style={{ color: certColor }} />}
                              </div>
                              <div className="cert-item-info">
                                <div className="info-row">
                                  <Building2 className="h-3 w-3" style={{ color: certColor }} />
                                  <span style={{ color: `rgba(${rgbColor}, 0.8)` }}>{cert.institution}</span>
                                </div>
                                <div className="info-row">
                                  <Calendar className="h-3 w-3" style={{ color: certColor }} />
                                  <span style={{ color: `rgba(${rgbColor}, 0.8)` }}>{cert.year}</span>
                                </div>
                              </div>
                              <div className="cert-item-image" style={{ borderColor: `rgba(${rgbColor}, 0.3)` }}>
                                <img 
                                  src={cert.image} 
                                  alt={cert.title}
                                  className="cert-item-img"
                                />
                              </div>
                              <div className="cert-item-description">
                                <span className="desc-label" style={{ color: certColor }}>DESC:</span>
                                <span className="desc-text" style={{ color: `rgba(${rgbColor}, 0.8)` }}>{cert.description}</span>
                              </div>
                              <div className="cert-item-skills">
                                {cert.skills.slice(0, 3).map((skill, idx) => (
                                  <span key={idx} className="skill-tag" style={{ 
                                    color: certColor,
                                    borderColor: `rgba(${rgbColor}, 0.3)`,
                                    backgroundColor: `rgba(${rgbColor}, 0.1)`
                                  }}>{skill}</span>
                                ))}
                                {cert.skills.length > 3 && (
                                  <span className="skill-tag" style={{ 
                                    color: certColor,
                                    borderColor: `rgba(${rgbColor}, 0.3)`,
                                    backgroundColor: `rgba(${rgbColor}, 0.1)`
                                  }}>+{cert.skills.length - 3}</span>
                                )}
                              </div>
                              <div className="cert-item-footer">
                                <span className="click-hint" style={{ color: `rgba(${rgbColor}, 0.6)` }}>[CLICK TO VIEW DETAILS →]</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    // Detail View - Show selected certificate details
                    <>
                      <div className="terminal-header">
                        <div className="terminal-prompt">
                          <span className="prompt-text">$</span>
                          <span className="blinking-cursor">_</span>
                          <span className="command"> view_certificate.exe --id={selectedCert}</span>
                        </div>
                        <button
                          className="back-button"
                          onClick={() => {
                            setSelectedCert(null);
                            setGlitchActive(true);
                            setTimeout(() => setGlitchActive(false), 200);
                          }}
                        >
                          <ArrowLeft className="h-4 w-4" />
                          <span>BACK</span>
                        </button>
                      </div>

                      {selectedCertificate && (() => {
                        const certColor = selectedCertificate.color || '#84cc16';
                        const rgbColor = hexToRgb(certColor);
                        
                        return (
                          <div className="certificate-detail-view" style={{
                            '--cert-color': certColor,
                            '--cert-color-rgb': rgbColor,
                          } as React.CSSProperties}>
                            <div className="detail-header">
                              <Award className="h-6 w-6" style={{ color: certColor }} />
                              <div>
                                <h2 className="detail-title" style={{ color: certColor }}>{selectedCertificate.title}</h2>
                                <div className="detail-meta" style={{ color: `rgba(${rgbColor}, 0.8)` }}>
                                  <Building2 className="h-4 w-4" style={{ color: certColor }} />
                                  <span>{selectedCertificate.institution}</span>
                                  <span className="separator" style={{ color: `rgba(${rgbColor}, 0.4)` }}>|</span>
                                  <Calendar className="h-4 w-4" style={{ color: certColor }} />
                                  <span>{selectedCertificate.year}</span>
                                  {selectedCertificate.featured && (
                                    <>
                                      <span className="separator" style={{ color: `rgba(${rgbColor}, 0.4)` }}>|</span>
                                      <Star className="h-4 w-4" style={{ color: certColor }} />
                                      <span>FEATURED</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="detail-image-section" style={{ borderColor: `rgba(${rgbColor}, 0.3)` }}>
                              <img 
                                src={selectedCertificate.image} 
                                alt={selectedCertificate.title}
                                className="detail-image"
                              />
                            </div>

                            {(selectedCertificate.instructor || selectedCertificate.hours || selectedCertificate.date || selectedCertificate.certificateId) && (
                              <div className="detail-info-grid" style={{ 
                                borderColor: `rgba(${rgbColor}, 0.2)`,
                                backgroundColor: `rgba(${rgbColor}, 0.05)`
                              }}>
                                {selectedCertificate.instructor && (
                                  <div className="detail-info-item">
                                    <span className="info-label" style={{ color: `rgba(${rgbColor}, 0.6)` }}>INSTRUCTOR:</span>
                                    <span className="info-value" style={{ color: certColor }}>{selectedCertificate.instructor}</span>
                                  </div>
                                )}
                                {selectedCertificate.hours && (
                                  <div className="detail-info-item">
                                    <span className="info-label" style={{ color: `rgba(${rgbColor}, 0.6)` }}>DURATION:</span>
                                    <span className="info-value" style={{ color: certColor }}>{selectedCertificate.hours}</span>
                                  </div>
                                )}
                                {selectedCertificate.date && (
                                  <div className="detail-info-item">
                                    <span className="info-label" style={{ color: `rgba(${rgbColor}, 0.6)` }}>COMPLETED:</span>
                                    <span className="info-value" style={{ color: certColor }}>{selectedCertificate.date}</span>
                                  </div>
                                )}
                                {selectedCertificate.certificateId && (
                                  <div className="detail-info-item">
                                    <span className="info-label" style={{ color: `rgba(${rgbColor}, 0.6)` }}>CERT ID:</span>
                                    <span className="info-value mono" style={{ color: certColor }}>{selectedCertificate.certificateId}</span>
                                  </div>
                                )}
                              </div>
                            )}

                            <div className="detail-description" style={{ 
                              borderColor: `rgba(${rgbColor}, 0.2)`,
                              backgroundColor: `rgba(${rgbColor}, 0.05)`
                            }}>
                              <div className="detail-section-header" style={{ color: certColor }}>
                                <BookOpen className="h-4 w-4" style={{ color: certColor }} />
                                <span>COURSE DESCRIPTION</span>
                              </div>
                              <p className="detail-desc-text" style={{ color: `rgba(${rgbColor}, 0.9)` }}>{selectedCertificate.description}</p>
                            </div>

                            <div className="detail-skills" style={{ 
                              borderColor: `rgba(${rgbColor}, 0.2)`,
                              backgroundColor: `rgba(${rgbColor}, 0.05)`
                            }}>
                              <div className="detail-section-header" style={{ color: certColor }}>
                                <span>SKILLS & TECHNOLOGIES</span>
                              </div>
                              <div className="skills-grid">
                                {selectedCertificate.skills.map((skill, idx) => (
                                  <span key={idx} className="detail-skill-tag" style={{ 
                                    color: certColor,
                                    borderColor: `rgba(${rgbColor}, 0.4)`,
                                    backgroundColor: `rgba(${rgbColor}, 0.15)`
                                  }}>{skill}</span>
                                ))}
                              </div>
                            </div>

                            {selectedCertificate.verificationUrl && (
                              <div className="detail-actions">
                                <button
                                  className="verify-button"
                                  style={{
                                    color: certColor,
                                    borderColor: `rgba(${rgbColor}, 0.4)`,
                                    backgroundColor: `rgba(${rgbColor}, 0.1)`
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = `rgba(${rgbColor}, 0.2)`;
                                    e.currentTarget.style.borderColor = certColor;
                                    e.currentTarget.style.boxShadow = `0 0 15px rgba(${rgbColor}, 0.4)`;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = `rgba(${rgbColor}, 0.1)`;
                                    e.currentTarget.style.borderColor = `rgba(${rgbColor}, 0.4)`;
                                    e.currentTarget.style.boxShadow = 'none';
                                  }}
                                  onClick={() => {
                                    try {
                                      const newWindow = window.open(selectedCertificate.verificationUrl, '_blank', 'noopener,noreferrer');
                                      if (!newWindow) {
                                        window.location.href = selectedCertificate.verificationUrl;
                                      }
                                    } catch (error) {
                                      console.error('Error opening certificate link:', error);
                                      window.location.href = selectedCertificate.verificationUrl;
                                    }
                                  }}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  <span>VERIFY CERTIFICATE</span>
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </>
                  )}

                        <div className="terminal-footer">
                          <div className="footer-line">
                            <span className="footer-text">
                              {!selectedCert 
                                ? `[TOTAL: ${certificates.length} CERTIFICATES] | [1-${certificates.length}] Navigate | [↑↓] Scroll | [ENTER] Open | [ESC/BACKSPACE] Back`
                                : '[Press ESC or BACKSPACE to return to list]'
                              }
                            </span>
                          </div>
                        </div>
                </div>

                {/* Glitch overlay effects */}
                <div className={`glitch-overlay ${glitchActive ? 'active' : ''}`}>
                  <div className="glitch-layer glitch-layer-1"></div>
                  <div className="glitch-layer glitch-layer-2"></div>
                  <div className="glitch-layer glitch-layer-3"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Hinge */}
          <div className="macbook-hinge"></div>

          {/* Base/Keyboard */}
          <div className="macbook-base">
            <div className="macbook-keyboard">
              <div className="macbook-key-row">
                <div className="macbook-key">ESC</div>
                <div className="macbook-key">F1</div>
                <div className="macbook-key">F2</div>
                <div className="macbook-key">F3</div>
                <div className="macbook-key">F4</div>
                <div className="macbook-key">F5</div>
                <div className="macbook-key">F6</div>
                <div className="macbook-key">F7</div>
                <div className="macbook-key">F8</div>
                <div className="macbook-key">F9</div>
                <div className="macbook-key">F10</div>
                <div className="macbook-key">F11</div>
                <div className="macbook-key">F12</div>
              </div>
              <div className="macbook-key-row">
                <div className="macbook-key">`</div>
                <div className="macbook-key">1</div>
                <div className="macbook-key">2</div>
                <div className="macbook-key">3</div>
                <div className="macbook-key">4</div>
                <div className="macbook-key">5</div>
                <div className="macbook-key">6</div>
                <div className="macbook-key">7</div>
                <div className="macbook-key">8</div>
                <div className="macbook-key">9</div>
                <div className="macbook-key">0</div>
                <div className="macbook-key">-</div>
                <div className="macbook-key">=</div>
                <div className="macbook-key delete">⌫</div>
              </div>
              <div className="macbook-key-row">
                <div className="macbook-key tab">⇥</div>
                <div className="macbook-key">Q</div>
                <div className="macbook-key">W</div>
                <div className="macbook-key">E</div>
                <div className="macbook-key">R</div>
                <div className="macbook-key">T</div>
                <div className="macbook-key">Y</div>
                <div className="macbook-key">U</div>
                <div className="macbook-key">I</div>
                <div className="macbook-key">O</div>
                <div className="macbook-key">P</div>
                <div className="macbook-key">[</div>
                <div className="macbook-key">]</div>
                <div className="macbook-key">\</div>
              </div>
              <div className="macbook-key-row">
                <div className="macbook-key caps">⇪</div>
                <div className="macbook-key">A</div>
                <div className="macbook-key">S</div>
                <div className="macbook-key">D</div>
                <div className="macbook-key">F</div>
                <div className="macbook-key">G</div>
                <div className="macbook-key">H</div>
                <div className="macbook-key">J</div>
                <div className="macbook-key">K</div>
                <div className="macbook-key">L</div>
                <div className="macbook-key">;</div>
                <div className="macbook-key">'</div>
                <div className="macbook-key return">↩</div>
              </div>
              <div className="macbook-key-row">
                <div className="macbook-key shift">⇧</div>
                <div className="macbook-key">Z</div>
                <div className="macbook-key">X</div>
                <div className="macbook-key">C</div>
                <div className="macbook-key">V</div>
                <div className="macbook-key">B</div>
                <div className="macbook-key">N</div>
                <div className="macbook-key">M</div>
                <div className="macbook-key">,</div>
                <div className="macbook-key">.</div>
                <div className="macbook-key">/</div>
                <div className="macbook-key shift">⇧</div>
              </div>
              <div className="macbook-key-row">
                <div className="macbook-key fn">fn</div>
                <div className="macbook-key control">⌃</div>
                <div className="macbook-key option">⌥</div>
                <div className="macbook-key command">⌘</div>
                <div className="macbook-key space">SPACE</div>
                <div className="macbook-key command">⌘</div>
                <div className="macbook-key option">⌥</div>
                <div className="macbook-key control">⌃</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlitchyCertificatesScreen;

