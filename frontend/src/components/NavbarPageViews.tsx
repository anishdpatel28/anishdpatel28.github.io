import { useState, useEffect } from 'react';
import { Typography, Box, Chip } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { pageViewsAPI } from '@/services/api';

const NavbarPageViews = ({ activeSection }: { activeSection: string; }) => {
  const [displayViews, setDisplayViews] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;
    const sessionKey = 'portfolio_visited';
    const hasVisited = sessionStorage.getItem(sessionKey);

    const animateToActualViews = (targetViews: number) => {
      controls.start({
        rotateX: [0, -90, 0],
        transition: {
          duration: 0.6,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }
      });
      setTimeout(() => {
        setDisplayViews(targetViews);
      }, 300);
    };

    const fetchAndHandlePageViews = async () => {
      try {
        const views = await pageViewsAPI.getPageViews();
        let finalViews = views;
        if (!hasVisited) {
          await pageViewsAPI.incrementPageViews();
          finalViews = views + 1;
          sessionStorage.setItem(sessionKey, 'true');
        }
        if (!isMounted) return;
        setDisplayViews(Math.max(0, finalViews - 1));
        setIsLoaded(true);
        setTimeout(() => {
          if (isMounted && !hasAnimated) {
            animateToActualViews(finalViews);
            setHasAnimated(true);
          }
        }, 500);
      } catch (error) {
        console.error('Error with page views:', error);
        if (isMounted) setIsLoaded(true);
      }
    };
    const delayedStart = setTimeout(() => {
      if (!hasAnimated && isMounted) {
        fetchAndHandlePageViews();
      }
    }, 1600);
    return () => {
      isMounted = false;
      clearTimeout(delayedStart);
    };
  }, [hasAnimated, controls]);

  if (!isLoaded) {
    return null;
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: activeSection === 'home' ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        mr: 0,
        color: '#e0e1dd',
        pointerEvents: 'none',
      }}
    >
      <Chip
        label={
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            <motion.span
              animate={controls}
              style={{
                display: 'inline-block',
                transformOrigin: 'center',
                transformStyle: 'preserve-3d',
              }}
            >
              {displayViews.toLocaleString()}
            </motion.span>
            {' views'}
          </Typography>
        }
        sx={{
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          color: '#e0e1dd',
          fontWeight: 600,
          fontSize: '1rem',
          pointerEvents: 'auto',
        }}
      />
    </Box>
  );
};

export default NavbarPageViews; 