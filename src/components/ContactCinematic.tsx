import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Shuffle from './Shuffle';

const ContactCinematic = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('Please fill in all required fields.');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setFormStatus('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setFormStatus('Sending…');

    try {
      const response = await fetch('https://formspree.io/f/xqaloelj', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: new FormData(formRef.current!)
      });

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' });
        setFormStatus('Thanks — I\'ll get back to you shortly.');
        if (formRef.current) formRef.current.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        setFormStatus((data.errors?.map((e: any) => e.message).join(', ')) || 'Oops, something went wrong.');
      }
    } catch (error) {
      setFormStatus('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'wasifathar@gmail.com',
      href: 'mailto:wasifathar@gmail.com',
      color: 'primary'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/wasifathar',
      href: 'https://github.com/wasifathar',
      color: 'secondary'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect with me',
      href: 'https://www.linkedin.com/in/muhammad-wasif-athar-15a0961b1/',
      color: 'accent'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Milan, Italy',
      href: '#',
      color: 'primary'
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 min-h-screen flex flex-col justify-center snap-section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-section-fade">
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-poppins">
            <Shuffle
              text="Let's Connect"
              tag="h2"
              className="font-bold"
              style={{ background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform data into insights? Let's discuss how we can work together to drive meaningful financial outcomes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary mb-8 animate-card-left">Get in Touch</h3>
            
            <div className="grid gap-4">
              {contactLinks.map((link, index) => (
                <div 
                  key={index}
                  className="animate-card-left"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="glass-terminal hover-scale-cinematic group transition-all duration-300 touch-optimized">
                    <CardContent className="p-6">
                      <a href={link.href} className="flex items-center gap-4 group">
                        <div className={`p-3 rounded-xl bg-${link.color}/20 group-hover:bg-${link.color}/30 transition-colors`}>
                          <link.icon className={`h-6 w-6 text-${link.color} group-hover:scale-110 transition-transform`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {link.label}
                          </h4>
                          <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                            {link.value}
                          </p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <div className="animate-card-left" style={{ animationDelay: '400ms' }}>
              <Card className="glass-terminal glow-accent hover-scale-cinematic group">
                <CardContent className="p-6 text-center">
                  <h4 className="text-xl font-bold text-accent mb-4">Schedule a Call</h4>
                  <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors">
                    Let's discuss your next financial project
                  </p>
                  <div className="space-y-3">
                    <p className="text-lg font-semibold text-primary">+393475347327</p>
                    <Button 
                      onClick={() => window.open('tel:+393475347327')}
                      className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent transition-cinematic touch-optimized"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-card-right">
            <Card className="glass-terminal hover-scale-cinematic">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-secondary flex items-center gap-2">
                  <Send className="h-6 w-6" />
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form 
                  ref={formRef} 
                  onSubmit={handleSubmit} 
                  action="https://formspree.io/f/xqaloelj" 
                  method="POST" 
                  noValidate
                  className="space-y-6"
                >
                  <div>
                    <Label htmlFor="name" className="text-foreground font-medium">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-2 bg-muted/50 border-primary/30 focus:border-primary transition-colors touch-optimized"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-2 bg-muted/50 border-primary/30 focus:border-primary transition-colors touch-optimized"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-foreground font-medium">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="mt-2 bg-muted/50 border-primary/30 focus:border-primary transition-colors touch-optimized resize-none"
                      placeholder="Tell me about your project or how we can collaborate..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:from-accent hover:to-primary transition-cinematic glow-primary animate-glow-pulse touch-optimized"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                  
                  {formStatus && (
                    <p 
                      className={`text-sm text-center transition-all duration-300 ${
                        formStatus.includes('Thanks') || formStatus.includes('success') 
                          ? 'text-green-400' 
                          : formStatus.includes('Sending') 
                          ? 'text-muted-foreground' 
                          : 'text-red-400'
                      }`}
                      aria-live="polite"
                    >
                      {formStatus}
                    </p>
                  )}
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <a 
                      href="https://github.com/wasifathar" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-secondary transition-colors underline"
                    >
                      View my GitHub →
                    </a>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCinematic;