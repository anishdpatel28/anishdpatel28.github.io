import { useState, useEffect } from 'react';
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
import NavbarPageViews from './NavbarPageViews';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when screen becomes wide enough for desktop nav
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900 && mobileMenuOpen) { // md breakpoint
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const getButtonStyles = (section: string) => ({
    color: 'inherit',
    position: 'relative' as const,
    '&::after': activeSection === section ? {
      content: '""',
      position: 'absolute',
      bottom: -2,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80%',
      height: 2,
      backgroundColor: '#e0e1dd',
      borderRadius: 1,
    } : {},
    '&:hover': {
      backgroundColor: 'rgba(224, 225, 221, 0.1)',
    },
  });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(27, 38, 59, 0.8)', // Navy with 80% opacity
        backdropFilter: 'blur(10px)', // Add subtle blur effect
        top: 0,
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          px: 0,
          maxWidth: '1000px',
          width: '100%',
          mx: 'auto',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          variant="h6"
          onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 600,
            ml: 2,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          Anish Patel
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
          <NavbarPageViews />
          <Button
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            sx={getButtonStyles('home')}
          >
            Home
          </Button>
          <Button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            sx={getButtonStyles('about')}
          >
            About
          </Button>
          <Button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            sx={getButtonStyles('projects')}
          >
            Projects
          </Button>
          <Button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            sx={getButtonStyles('contact')}
          >
            Contact
          </Button>
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton color="inherit" onClick={handleMobileMenuToggle}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu Drawer */}
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
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


      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 