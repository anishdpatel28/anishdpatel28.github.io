import { useState, useEffect, useRef } from 'react';
import { Typography, Box, Chip } from '@mui/material';
import { gsap } from 'gsap';
import { pageViewsAPI } from '@/services/api';

const NavbarPageViews = ({ activeSection }: { activeSection: string; }) => {
  const [displayViews, setDisplayViews] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const viewsRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    const sessionKey = 'portfolio_visited';
    const hasVisited = sessionStorage.getItem(sessionKey);

    const animateToActualViews = (targetViews: number) => {
      if (viewsRef.current) {
        gsap.to(viewsRef.current, {
          rotateX: -90,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setDisplayViews(targetViews);
            gsap.to(viewsRef.current, {
              rotateX: 0,
              duration: 0.3,
              ease: "power2.out",
              delay: 0.1
            });
          }
        });
      }
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
  }, [hasAnimated]);

  useEffect(() => {
    // Fade in/out based on active section
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: activeSection === 'home' ? 1 : 0,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [activeSection]);

  if (!isLoaded) {
    return null;
  }

  return (
    <Box
      ref={containerRef}
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
            <span
              ref={viewsRef}
              style={{
                display: 'inline-block',
                transformOrigin: 'center',
                transformStyle: 'preserve-3d',
              }}
            >
              {displayViews.toLocaleString()}
            </span>
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