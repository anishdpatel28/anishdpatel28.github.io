import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { gsap } from 'gsap';
import { pageViewsAPI } from '@/services/api';

const PageViews = () => {
  const [pageViews, setPageViews] = useState<number>(0);
  const [hasIncremented, setHasIncremented] = useState(false);
  const chipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPageViews = async () => {
      try {
        const views = await pageViewsAPI.getPageViews();
        setPageViews(views);
      } catch (error) {
        console.error('Error fetching page views:', error);
      }
    };
    fetchPageViews();
  }, []);

  useEffect(() => {
    const sessionKey = 'portfolio_visited';
    const hasVisited = sessionStorage.getItem(sessionKey);
    if (!hasVisited && !hasIncremented) {
      const incrementViews = async () => {
        try {
          await pageViewsAPI.incrementPageViews();
          setPageViews(prev => prev + 1);
          setHasIncremented(true);
          sessionStorage.setItem(sessionKey, 'true');

          // Scale animation
          if (chipRef.current) {
            gsap.to(chipRef.current, {
              scale: 1.2,
              duration: 0.3,
              ease: "power2.out",
              yoyo: true,
              repeat: 1
            });
          }
        } catch (error) {
          console.error('Error incrementing page views:', error);
        }
      };
      incrementViews();
    }
  }, [hasIncremented]);

  return (
    <Box sx={{
      position: 'fixed',
      top: 16,
      right: 16,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: 1
    }}>
      <div ref={chipRef}>
        <Chip
          icon={<Visibility />}
          label={
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {pageViews.toLocaleString()} views
            </Typography>
          }
          color="primary"
          variant="outlined"
          sx={{
            backgroundColor: 'rgba(65, 90, 119, 0.1)',
            borderColor: 'primary.main',
            '& .MuiChip-icon': {
              color: 'primary.main',
            },
          }}
        />
      </div>
    </Box>
  );
};

export default PageViews; 