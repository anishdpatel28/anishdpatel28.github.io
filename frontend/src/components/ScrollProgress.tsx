import { useEffect, useRef, useState } from 'react';
import { Box, useTheme } from '@mui/material';

if (process.env.NODE_ENV === 'test') {
  jest.mock('gsap');
}

const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(Math.min(progress, 1));
    };

    // Initial calculation
    updateScrollProgress();

    // Add event listener
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
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
      <div
        ref={progressRef}
        style={{
          height: '100%',
          backgroundColor: theme.palette.mode === 'dark' ? '#e0e1dd' : '#1b263b',
          transformOrigin: 'left',
          transform: `scaleX(${scrollProgress})`,
          transition: 'transform 0.1s ease-out',
        }}
      />
    </Box>
  );
};

export default ScrollProgress; 