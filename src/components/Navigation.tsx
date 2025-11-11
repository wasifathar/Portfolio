import { useNavigate, useLocation } from 'react-router-dom';
import Dock from './Dock';
import { Home, User, Briefcase, GraduationCap, FolderKanban, Award, Mail, BookOpen } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Map routes to section names for active state
  const getActiveSection = () => {
    const path = location.pathname;
    if (path === '/' || path === '/hero') return 'home';
    if (path === '/about') return 'about';
    if (path === '/education') return 'education';
    if (path === '/experience') return 'experience';
    if (path === '/projects') return 'projects';
    if (path === '/skills') return 'skills';
    if (path === '/certificates') return 'certificates';
    if (path === '/research') return 'research';
    if (path === '/contact') return 'contact';
    return 'home';
  };

  const activeSection = getActiveSection();

  const dockItems = [
    { 
      icon: <Home size={18} />, 
      label: 'Home', 
      onClick: () => navigate('/hero'),
      className: activeSection === 'home' ? 'active' : ''
    },
    { 
      icon: <User size={18} />, 
      label: 'About', 
      onClick: () => navigate('/about'),
      className: activeSection === 'about' ? 'active' : ''
    },
    { 
      icon: <GraduationCap size={18} />, 
      label: 'Education', 
      onClick: () => navigate('/education'),
      className: activeSection === 'education' ? 'active' : ''
    },
    { 
      icon: <Briefcase size={18} />, 
      label: 'Experience', 
      onClick: () => navigate('/experience'),
      className: activeSection === 'experience' ? 'active' : ''
    },
    { 
      icon: <FolderKanban size={18} />, 
      label: 'Projects', 
      onClick: () => navigate('/projects'),
      className: activeSection === 'projects' ? 'active' : ''
    },
    { 
      icon: <Award size={18} />, 
      label: 'Certificates', 
      onClick: () => navigate('/certificates'),
      className: activeSection === 'certificates' ? 'active' : ''
    },
    { 
      icon: <BookOpen size={18} />, 
      label: 'Research', 
      onClick: () => navigate('/research'),
      className: activeSection === 'research' ? 'active' : ''
    },
    { 
      icon: <Mail size={18} />, 
      label: 'Contact', 
      onClick: () => navigate('/contact'),
      className: activeSection === 'contact' ? 'active' : ''
    },
  ];

  return (
    <Dock 
      items={dockItems}
      panelHeight={68}
      baseItemSize={50}
      magnification={70}
    />
  );
};

export default Navigation;