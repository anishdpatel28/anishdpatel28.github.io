import { useState, useEffect } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { pageViewsAPI } from '@/services/api';

const PageViews = () => {
  const [pageViews, setPageViews] = useState<number>(0);
  const [hasIncremented, setHasIncremented] = useState(false);
  const controls = useAnimation();

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

          controls.start({
            scale: [1, 1.2, 1],
            transition: { duration: 0.6, ease: "easeOut" }
          });
        } catch (error) {
          console.error('Error incrementing page views:', error);
        }
      };

      incrementViews();
    }
  }, [hasIncremented, controls]);

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
      <motion.div animate={controls}>
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
      </motion.div>
    </Box>
  );
};

export default PageViews; 