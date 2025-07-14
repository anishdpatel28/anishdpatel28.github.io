import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { pageViewsAPI } from '@/services/api';

const NavbarPageViews = () => {
  const [displayViews, setDisplayViews] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;
    const sessionKey = 'portfolio_visited';
    const hasVisited = sessionStorage.getItem(sessionKey);

    const animateToActualViews = (targetViews: number) => {
      // Flip board animation
      controls.start({
        rotateX: [0, -90, 0],
        transition: {
          duration: 0.6,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }
      });

      // Change the number at the middle of the flip
      setTimeout(() => {
        setDisplayViews(targetViews);
      }, 300);
    };

    const fetchAndHandlePageViews = async () => {
      try {
        const views = await pageViewsAPI.getPageViews();
        let finalViews = views;

        // If new visitor, increment first
        if (!hasVisited) {
          await pageViewsAPI.incrementPageViews();
          finalViews = views + 1;
          sessionStorage.setItem(sessionKey, 'true');
        }

        if (!isMounted) return;

        // Show x-1 views initially
        setDisplayViews(Math.max(0, finalViews - 1));
        setIsLoaded(true);

        // After a delay for other animations to complete, animate to actual views (only once)
        setTimeout(() => {
          if (isMounted && !hasAnimated) {
            animateToActualViews(finalViews);
            setHasAnimated(true);
          }
        }, 500); // Short delay after component loads
      } catch (error) {
        console.error('Error with page views:', error);
        if (isMounted) setIsLoaded(true);
      }
    };

    // Wait for other animations to complete before starting
    const delayedStart = setTimeout(() => {
      if (!hasAnimated && isMounted) {
        fetchAndHandlePageViews();
      }
    }, 3800); // 3.8s delay to appear after profile image

    return () => {
      isMounted = false;
      clearTimeout(delayedStart);
    };
  }, [hasAnimated, controls]);

  if (!isLoaded) {
    return null; // Don't show anything until loaded
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        mr: 3,
        color: '#e0e1dd',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: '#e0e1dd',
          fontSize: '0.875rem',
          fontWeight: 400,
          opacity: 0.8,
        }}
      >
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
    </Box>
  );
};

export default NavbarPageViews; 