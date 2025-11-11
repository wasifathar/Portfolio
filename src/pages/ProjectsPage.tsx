import { lazy, Suspense } from 'react';
import Particles from '@/components/Particles';

const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));

const ProjectsPage = () => {
  return (
    <div className="relative min-h-screen">
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

      <div className="relative z-10">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-muted-foreground">Loading...</div></div>}>
          <ProjectsSection />
        </Suspense>
      </div>
    </div>
  );
};

export default ProjectsPage;

