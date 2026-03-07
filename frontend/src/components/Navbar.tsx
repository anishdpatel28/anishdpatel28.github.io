import { useState, useEffect, useRef, useContext } from 'react';
import {
  IconButton,
  Paper,
  Tooltip
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';
import AppsIcon from '@mui/icons-material/Apps';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import { ThemeContext } from '@/App';

if (process.env.NODE_ENV === 'test') {
  jest.mock('gsap');
}

const NAVBAR_HEIGHT = 64;

const sectionIcons = [
  { id: 'home', icon: <HomeIcon fontSize="medium" /> },
  { id: 'about', icon: <PersonIcon fontSize="medium" /> },
  { id: 'skills', icon: <BuildIcon fontSize="medium" /> },
  { id: 'projects', icon: <AppsIcon fontSize="medium" /> },
  { id: 'resume', icon: <DescriptionIcon fontSize="medium" /> },
  { id: 'contact', icon: <EmailIcon fontSize="medium" /> },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const navbarRef = useRef<HTMLDivElement>(null);
  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;
    (async () => {
      const gsapMod = await import('gsap');
      const gsap = gsapMod.default;
      if (navbarRef.current) {
        gsap.fromTo(navbarRef.current,
          { opacity: 0, transform: 'translateY(-32px)' },
          { opacity: 1, transform: 'translateY(0)', duration: 0.8, ease: 'power2.out' }
        );
      }
    })();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let newActiveSection = 'home';

      // Check each section in order
      for (let i = 0; i < sectionIcons.length; i++) {
        const section = sectionIcons[i];
        const element = document.getElementById(section.id);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionBottom = sectionTop + element.offsetHeight;

          // Check if we're within this section
          if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom - 100) {
            newActiveSection = section.id;
            break;
          }
        }
      }

      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <nav
      ref={navbarRef}
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: 32,
        left: 0,
        right: 0,
        zIndex: 1300,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        opacity: 0,
        transform: 'translateY(-32px)',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: 10,
          px: { xs: 1, md: 2 },
          py: 0.5,
          bgcolor: mode === 'dark' ? '#1b263b' : '#ffffff',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 0.5, md: 1.5 },
          minHeight: NAVBAR_HEIGHT,
          pointerEvents: 'auto',
          transform: 'translateZ(0)',
          position: 'relative',
          zIndex: 1300,
        }}
      >
        {sectionIcons.map((section) => (
          <Tooltip key={section.id} title={section.id.charAt(0).toUpperCase() + section.id.slice(1)} arrow>
            <IconButton
              onClick={() => {
                const element = document.getElementById(section.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              sx={{
                color: activeSection === section.id
                  ? (mode === 'dark' ? '#e0e1dd' : '#1b263b')
                  : (mode === 'dark' ? 'rgba(224, 225, 221, 0.7)' : 'rgba(27, 38, 59, 0.7)'),
                backgroundColor: activeSection === section.id
                  ? (mode === 'dark' ? 'rgba(224, 225, 221, 0.18)' : 'rgba(27, 38, 59, 0.18)')
                  : 'transparent',
                border: activeSection === section.id
                  ? `2px solid ${mode === 'dark' ? '#e0e1dd' : '#1b263b'}`
                  : '2px solid transparent',
                mx: { xs: 0.25, md: 0.5 },
                transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
                '&:hover': {
                  backgroundColor: mode === 'dark' ? 'rgba(65, 90, 119, 0.3)' : 'rgba(27, 38, 59, 0.3)',
                  color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                  border: `2px solid ${mode === 'dark' ? '#e0e1dd' : '#1b263b'}`,
                },
                fontSize: 24,
                p: { xs: 0.75, md: 1.1 },
              }}
              aria-label={`Navigate to ${section.id.charAt(0).toUpperCase() + section.id.slice(1)}`}
            >
              {section.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Paper>
    </nav>
  );
};

export default Navbar; 