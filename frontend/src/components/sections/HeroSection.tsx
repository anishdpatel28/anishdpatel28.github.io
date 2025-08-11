import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

interface HeroSectionProps {
  showNavbar: boolean;
  heroRef: React.RefObject<HTMLDivElement>;
  mode?: 'dark' | 'light';
  navbar?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ showNavbar, heroRef, mode = 'dark', navbar }) => {

  return (
    <Box ref={heroRef} sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: { xs: 'column', md: 'row' },
      gap: { xs: 4, md: 8 },
      px: { xs: 2, md: 0 }
    }}>
      {/* Left side - Text content */}
      <Box style={{ flex: 1 }}>
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            className="hero-title"
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 300,
              mb: 1,
              fontSize: { xs: '2rem', md: '3rem' },
              opacity: 0
            }}
          >
            Hey, I&apos;m <Box component="span" sx={{ fontWeight: 600, color: mode === 'dark' ? '#e0e1dd' : '#1b263b' }}>Anish</Box>
          </Typography>
          <Typography
            className="hero-subtitle"
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 500,
              mb: 3,
              color: 'text.secondary',
              fontSize: { xs: '1.5rem', md: '2rem' },
              opacity: 0
            }}
          >
            I&apos;m a Fullstack Web Developer
          </Typography>
          <Typography
            className="hero-description"
            variant="h6"
            sx={{
              fontWeight: 400,
              opacity: 0,
              lineHeight: 1.6,
              maxWidth: { xs: '100%', md: '400px' }
            }}
          >
            I love creating innovative digital experiences and bring ideas to life.
          </Typography>
          {showNavbar && navbar}
        </Box>
      </Box>

      {/* Right side - Image placeholder */}
      <Box
        className="hero-image"
        style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: 0 }}
      >
        <Box sx={{
          width: { xs: 280, md: 400 },
          height: { xs: 250, md: 350 },
          backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.1)' : 'rgba(27, 38, 59, 0.1)',
          border: '2px dashed rgba(224, 225, 221, 0.3)',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'primary.main',
              fontSize: '2rem',
              mb: 2,
            }}
          >
            AP
          </Avatar>
          <Typography variant="body2" sx={{ opacity: 0.6, textAlign: 'center' }}>
            Profile Image<br />Placeholder
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection; 