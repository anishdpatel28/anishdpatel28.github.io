import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Menu as MenuIcon, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import NavbarPageViews from './NavbarPageViews';

const TimelineNavbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const filledLinesRef = useRef<boolean[]>([false, false, false]);
  const [animatingLineIndex, setAnimatingLineIndex] = useState<number | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sections = useMemo(() => [
    { id: 'home', label: 'Home', delay: 1.7 },
    { id: 'about', label: 'About', delay: 1.85 },
    { id: 'projects', label: 'Projects', delay: 2.0 },
    { id: 'contact', label: 'Contact', delay: 2.15 }
  ], []);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setHasAnimated(true);
    }, 2800);

    return () => clearTimeout(animationTimeout);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let newActiveSection = 'home';

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && scrollPosition >= element.offsetTop) {
          if (section.id === 'projects') {
            const projectsHeight = element.offsetHeight;
            const projectsEnd = element.offsetTop + projectsHeight;

            if (scrollPosition >= element.offsetTop && scrollPosition < projectsEnd - 100) {
              newActiveSection = 'projects';
            } else if (scrollPosition >= projectsEnd - 100) {
              const contactElement = document.getElementById('contact');
              if (contactElement && scrollPosition >= contactElement.offsetTop - 200) {
                newActiveSection = 'contact';
              } else {
                newActiveSection = 'projects';
              }
            }
          } else {
            newActiveSection = section.id;
          }
        }
      }

      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, sections]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900 && mobileOpen) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileOpen]);

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileNavClick = (sectionId: string) => {
    window.scrollTo(window.scrollX, window.scrollY);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo(window.scrollX, window.scrollY);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSectionIndex = (sectionId: string) => {
    return sections.findIndex(section => section.id === sectionId);
  };

  const currentIndex = getSectionIndex(activeSection);

  useEffect(() => {
    if (hasAnimated) {
      const newFilledLines = sections.slice(0, -1).map((_, index) => index < currentIndex);

      const changedLineIndex = newFilledLines.findIndex((shouldBeFilled, index) =>
        shouldBeFilled !== filledLinesRef.current[index]
      );

      filledLinesRef.current = newFilledLines;

      if (changedLineIndex !== -1) {
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }

        setAnimatingLineIndex(changedLineIndex);

        animationTimeoutRef.current = setTimeout(() => {
          setAnimatingLineIndex(null);
          animationTimeoutRef.current = null;
        }, 500);
      }
    }
  }, [hasAnimated, currentIndex, sections]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const TimelineButton = ({ section, index, hasAnimated, animatingLineIndex }: {
    section: { id: string, label: string, delay: number; },
    index: number;
    hasAnimated: boolean;
    animatingLineIndex: number | null;
  }) => {
    const isActive = activeSection === section.id;

    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <motion.div
          initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={hasAnimated ? { duration: 0 } : {
            duration: 0.4,
            delay: section.delay,
            ease: "easeOut"
          }}
          style={{ pointerEvents: 'auto' }}
        >
          <Button
            onClick={() => {
              const element = document.getElementById(section.id);
              if (element) {
                window.scrollTo(window.scrollX, window.scrollY);
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            sx={{
              color: 'white',
              borderRadius: 1,
              px: 2,
              py: 1,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: isActive ? 600 : 500,
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: isActive ? 'rgba(224, 225, 221, 0.2)' : 'transparent',
              transition: 'background-color 0.15s ease',
              pointerEvents: 'auto',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: isActive
                  ? 'rgba(224, 225, 221, 0.25)'
                  : 'rgba(65, 90, 119, 0.3)',
              },
            }}
          >
            {section.label}
          </Button>
        </motion.div>

        {index < sections.length - 1 && (
          <motion.div
            initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={hasAnimated ? { duration: 0 } : { duration: 0.4, delay: section.delay + 0.15, ease: "easeOut" }}
          >
            <Box
              sx={{
                width: 40,
                height: 2,
                backgroundColor: 'rgba(224, 225, 221, 0.3)',
                position: 'relative',
                mx: 1,
                overflow: 'hidden'
              }}
            >
              {hasAnimated && animatingLineIndex === index ? (
                <motion.div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#e0e1dd',
                  }}
                  initial={{
                    opacity: filledLinesRef.current[index] ? 0 : 1
                  }}
                  animate={{
                    opacity: filledLinesRef.current[index] ? 1 : 0
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#e0e1dd',
                    opacity: hasAnimated && filledLinesRef.current[index] ? 1 : 0,
                  }}
                />
              )}
            </Box>
          </motion.div>
        )}
      </Box>
    );
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
        }}
      >
        <Box sx={{ maxWidth: '1000px', width: '100%', mx: 'auto' }}>
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>
            <motion.div
              initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={hasAnimated ? { duration: 0 } : { duration: 0.8, delay: 1.4 }}
              style={{ pointerEvents: 'auto' }}
            >
              <Typography
                variant="h6"
                component="div"
                onClick={scrollToTop}
                sx={{
                  fontWeight: 600,
                  color: '#e0e1dd',
                  cursor: 'pointer',
                  userSelect: 'none',
                  pointerEvents: 'auto',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              >
                Anish Patel
              </Typography>
            </motion.div>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <motion.div
                initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={hasAnimated ? { duration: 0 } : { duration: 0.4, delay: 1.6, ease: "easeOut" }}
                style={{ pointerEvents: 'auto' }}
              >
                <NavbarPageViews />
              </motion.div>
              {sections.map((section, index) => (
                <TimelineButton key={section.id} section={section} index={index} hasAnimated={hasAnimated} animatingLineIndex={animatingLineIndex} />
              ))}
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <motion.div
                initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={hasAnimated ? { duration: 0 } : { duration: 0.8, delay: 1.4 }}
                style={{ pointerEvents: 'auto' }}
              >
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMobileMenuToggle}
                  sx={{
                    color: '#e0e1dd',
                    pointerEvents: 'auto'
                  }}
                >
                  {mobileOpen ? <Close /> : <MenuIcon />}
                </IconButton>
              </motion.div>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleMobileMenuToggle}
        PaperProps={{
          sx: {
            backgroundColor: '#1b263b',
            color: '#e0e1dd',
            width: 200,
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#e0e1dd' }}>
            Menu
          </Typography>
          <IconButton color="inherit" onClick={handleMobileMenuToggle}>
            <Close />
          </IconButton>
        </Box>
        <List>
          {sections.map((section) => (
            <ListItem key={section.id} disablePadding>
              <ListItemButton
                onClick={() => handleMobileNavClick(section.id)}
                sx={{
                  backgroundColor: activeSection === section.id ? 'rgba(224, 225, 221, 0.1)' : 'transparent'
                }}
              >
                <ListItemText primary={section.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default TimelineNavbar; 