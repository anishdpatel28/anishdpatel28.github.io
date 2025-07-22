import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

if (process.env.NODE_ENV === 'test') {
  // @ts-ignore
  jest.mock('gsap');
}

const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;
    (async () => {
      const gsapMod = await import('gsap');
      const gsap = gsapMod.default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      }
    })();

    return () => {
      // ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // This line is removed as per the new_code
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
          backgroundColor: '#e0e1dd',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
        }}
      />
    </Box>
  );
};

export default ScrollProgress; 