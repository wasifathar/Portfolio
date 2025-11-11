import Shuffle from './Shuffle';
import GlitchyCertificatesScreen from './GlitchyCertificatesScreen';

const CertificatesSection = () => {
  return (
    <section id="certificates" className="py-20 px-6 min-h-screen flex flex-col justify-center relative overflow-hidden">
      <div className="container mx-auto max-w-7xl w-full relative z-10 px-4">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 font-poppins">
          <Shuffle
            text="Professional Certifications"
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

        <GlitchyCertificatesScreen />
      </div>
    </section>
  );
};

export default CertificatesSection;
