import { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const CustomScrollbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / documentHeight) * 100;
      setScrollPercentage(Math.min(Math.max(scrolled, 0), 100));

      // Show scrollbar when scrolling
      setIsVisible(true);

      // Clear existing timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      // Hide after 2 seconds of no scrolling
      if (!isDragging) {
        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      }
    };

    window.addEventListener('scroll', handleScroll);


    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isDragging]);

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const trackHeight = rect.height;
    const thumbHeight = trackHeight * 0.2; // Thumb is 20% of track height

    // Calculate where to scroll to
    const clickPercentage = (clickY - thumbHeight / 2) / (trackHeight - thumbHeight);
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = Math.max(0, Math.min(clickPercentage * documentHeight, documentHeight));

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setIsVisible(true);

    const startY = e.clientY;
    const startScrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY;
      const trackHeight = window.innerHeight; // Track height is full viewport
      const thumbHeight = trackHeight * 0.2;
      const scrollableHeight = trackHeight - thumbHeight;

      const scrollDelta = (deltaY / scrollableHeight) * documentHeight;
      const newScrollTop = Math.max(0, Math.min(startScrollTop + scrollDelta, documentHeight));

      window.scrollTo({
        top: newScrollTop,
        behavior: 'auto'
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // Hide after drag ends
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const trackHeight = window.innerHeight; // Full viewport height
  const thumbHeight = Math.max(trackHeight * 0.2, 30); // Minimum 30px
  const thumbTop = (scrollPercentage / 100) * (trackHeight - thumbHeight);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            right: 0,
            top: 0,
            height: '100%',
            width: 8,
            zIndex: 1200,
            pointerEvents: 'auto',
          }}
          onMouseEnter={() => {
            setIsVisible(true);
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current);
            }
          }}
          onMouseLeave={() => {
            if (!isDragging) {
              hideTimeoutRef.current = setTimeout(() => {
                setIsVisible(false);
              }, 1000);
            }
          }}
        >
          {/* Track */}
          <Box
            ref={trackRef}
            onClick={handleTrackClick}
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(224, 225, 221, 0.1)',
              borderRadius: 0,
              position: 'relative',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(224, 225, 221, 0.15)',
              }
            }}
          >
            {/* Thumb */}
            <Box
              onMouseDown={handleMouseDown}
              sx={{
                position: 'absolute',
                left: 0,
                width: '100%',
                height: `${Math.max((thumbHeight / trackHeight) * 100, 5)}%`,
                backgroundColor: 'rgba(224, 225, 221, 0.6)',
                borderRadius: 0,
                cursor: isDragging ? 'grabbing' : 'grab',
                transform: `translateY(${thumbTop}px)`,
                transition: isDragging ? 'none' : 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(224, 225, 221, 0.8)',
                }
              }}
            />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomScrollbar; 