import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Box,
  IconButton,
  useTheme,
  Paper,
  Tooltip
} from '@mui/material';
import { gsap } from 'gsap';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';
import AppsIcon from '@mui/icons-material/Apps';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';

const NAVBAR_HEIGHT = 64;

const sectionIcons = [
  { id: 'home', icon: <HomeIcon fontSize="medium" /> },
  { id: 'about', icon: <PersonIcon fontSize="medium" /> },
  { id: 'skills', icon: <BuildIcon fontSize="medium" /> },
  { id: 'projects', icon: <AppsIcon fontSize="medium" /> },
  { id: 'resume', icon: <DescriptionIcon fontSize="medium" /> },
  { id: 'contact', icon: <EmailIcon fontSize="medium" /> },
];

const TimelineNavbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const theme = useTheme();
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade in animation after hero animation
    if (navbarRef.current) {
      gsap.fromTo(navbarRef.current,
        { opacity: 0, y: -32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: 2.7
        }
      );
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let newActiveSection = 'home';
      for (let i = sectionIcons.length - 1; i >= 0; i--) {
        const section = sectionIcons[i];
        const element = document.getElementById(section.id);
        if (element) {
          const sectionTop = element.offsetTop;
          if (scrollPosition >= sectionTop - 50) {
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
    <div
      ref={navbarRef}
      style={{
        position: 'fixed',
        top: 32,
        left: 0,
        right: 0,
        zIndex: 1201,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: 999,
          px: { xs: 1, md: 2 },
          py: 0.5,
          bgcolor: 'rgba(27, 38, 59, 0.95)',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 0.5, md: 1.5 },
          minHeight: NAVBAR_HEIGHT,
          pointerEvents: 'auto',
        }}
      >
        {sectionIcons.map((section, idx) => (
          <Tooltip key={section.id} title={section.id.charAt(0).toUpperCase() + section.id.slice(1)} arrow>
            <IconButton
              onClick={() => {
                const element = document.getElementById(section.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              sx={{
                color: activeSection === section.id ? '#e0e1dd' : 'rgba(224, 225, 221, 0.7)',
                backgroundColor: activeSection === section.id
                  ? 'rgba(224, 225, 221, 0.18)'
                  : 'transparent',
                border: activeSection === section.id
                  ? '2px solid #e0e1dd'
                  : '2px solid transparent',
                mx: { xs: 0.25, md: 0.5 },
                transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
                '&:hover': {
                  backgroundColor: 'rgba(65, 90, 119, 0.3)',
                  color: '#e0e1dd',
                  border: '2px solid #e0e1dd',
                },
                fontSize: 24,
                p: { xs: 0.75, md: 1.1 },
              }}
              aria-label={section.id}
            >
              {section.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Paper>
    </div>
  );
};

export default TimelineNavbar; 