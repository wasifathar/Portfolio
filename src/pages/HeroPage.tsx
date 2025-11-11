import Hero from '@/components/Hero';
import Particles from '@/components/Particles';

const HeroPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Particles Background */}
      <div style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10">
        <Hero />
      </div>
    </div>
  );
};

export default HeroPage;

