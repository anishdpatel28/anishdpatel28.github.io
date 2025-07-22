import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  backgroundImage?: string;
  backgroundColor?: string;
  id?: string;
  height?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  backgroundImage,
  backgroundColor = 'transparent',
  id,
  height = '100vh'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;
    (async () => {
      const gsapMod = await import('gsap');
      const gsap = gsapMod.default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    })();
    return () => {
      // No-op in test mode
    };
  }, [speed]);

  return (
    <Box
      ref={ref}
      id={id}
      sx={{
        height,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Layer */}
      <div
        ref={backgroundRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Content Layer */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ParallaxSection; 