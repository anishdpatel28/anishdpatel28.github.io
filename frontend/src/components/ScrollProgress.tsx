import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const ScrollProgress = () => {
  const [scrollYProgress, setScrollYProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollYProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: 'transparent',
        zIndex: 1200,
      }}
    >
      <motion.div
        style={{
          height: '100%',
          backgroundColor: '#e0e1dd',
          transformOrigin: 'left',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollYProgress }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic bezier for smooth easing
        }}
      />
    </Box>
  );
};

export default ScrollProgress; 