import React, { useState, useEffect } from 'react';
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

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100; // 100px offset

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const getButtonStyles = (section: string) => ({
    color: 'white',
    borderRadius: 1,
    px: 2,
    py: 1,
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: activeSection === section ? '100%' : 0,
      height: '2px',
      backgroundColor: '#e0e1dd',
      transition: 'width 0.3s ease',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(224, 225, 221, 0.1)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      zIndex: -1,
    },
    '&:hover::after': {
      opacity: 1,
    },
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home', delay: 1.55 },
    { id: 'about', label: 'About', delay: 1.7 },
    { id: 'projects', label: 'Projects', delay: 1.85 },
    { id: 'contact', label: 'Contact', delay: 2.0 }
  ];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(27, 38, 59, 0.4)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
        }}
      >
        <Box sx={{ maxWidth: '1000px', width: '100%', mx: 'auto' }}>
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
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
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              >
                Anish Patel
              </Typography>
            </motion.div>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
              {navItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  {index === 0 && <NavbarPageViews />}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: item.delay }}
                  >
                    <Button
                      onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                      sx={getButtonStyles(item.id)}
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                </React.Fragment>
              ))}
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMobileMenuToggle}
                  sx={{ color: '#e0e1dd' }}
                >
                  {mobileOpen ? <Close /> : <MenuIcon />}
                </IconButton>
              </motion.div>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      {/* Mobile Menu Drawer */}
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
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleMobileNavClick('home')}
              sx={{
                backgroundColor: activeSection === 'home' ? 'rgba(224, 225, 221, 0.1)' : 'transparent'
              }}
            >
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleMobileNavClick('about')}
              sx={{
                backgroundColor: activeSection === 'about' ? 'rgba(224, 225, 221, 0.1)' : 'transparent'
              }}
            >
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleMobileNavClick('projects')}
              sx={{
                backgroundColor: activeSection === 'projects' ? 'rgba(224, 225, 221, 0.1)' : 'transparent'
              }}
            >
              <ListItemText primary="Projects" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleMobileNavClick('contact')}
              sx={{
                backgroundColor: activeSection === 'contact' ? 'rgba(224, 225, 221, 0.1)' : 'transparent'
              }}
            >
              <ListItemText primary="Contact" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar; 