import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { pageAnalyticsAPI } from '@/services/api';

const PageViews = () => {
  const [analytics, setAnalytics] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await pageAnalyticsAPI.getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  useEffect(() => {
    if (analytics) {
      const element = document.querySelector('.page-views-number');
      if (element) {
        gsap.fromTo(element,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
      }
    }
  }, [analytics]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.7)' }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!analytics) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.7)' }}>
          Analytics unavailable
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.7)' }}>
        Views:
      </Typography>
      <Typography
        className="page-views-number"
        variant="body2"
        sx={{
          color: '#e0e1dd',
          fontWeight: 600,
          fontFamily: 'monospace'
        }}
      >
        {typeof analytics.page_views === 'number' ? analytics.page_views : 0}
      </Typography>
    </Box>
  );
};

export default PageViews; 