import React, { forwardRef } from 'react';
import { Box, Container, SxProps, Theme } from '@mui/material';

interface PageSectionProps {
  children: React.ReactNode;
  id?: string;
  background?: string;
  minHeight?: string;
  containerMaxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  sx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
  className?: string;
}

const PageSection = forwardRef<HTMLDivElement, PageSectionProps>(({
  children,
  id,
  background = 'transparent',
  minHeight = '100vh',
  containerMaxWidth = 'lg',
  sx = {},
  containerSx = {},
  className = '',
}, ref) => {
  return (
    <Box
      ref={ref}
      id={id}
      className={className}
      sx={{
        minHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background,
        position: 'relative',
        overflow: 'hidden',
        ...sx
      }}
    >
      <Container maxWidth={containerMaxWidth} sx={containerSx}>
        {children}
      </Container>
    </Box>
  );
});

PageSection.displayName = 'PageSection';

export default PageSection; 