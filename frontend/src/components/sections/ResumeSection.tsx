import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Description, FileDownload } from '@mui/icons-material';
import { textAlpha } from '@/themes/theme';

interface ResumeSectionProps {
  mode?: 'dark' | 'light';
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ mode = 'dark' }) => {

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 1, md: 3 }, textAlign: 'center' }}>
      <Typography
        className="resume-title"
        variant="h3"
        sx={{ color: 'text.primary', mb: 4, fontWeight: 600 }}
      >
        Resume & Experience
      </Typography>
      <Typography variant="h6" sx={{ color: textAlpha(mode, 0.9), mb: 6, maxWidth: 600, mx: 'auto' }}>
        Download my resume to learn more about my experience, skills, and projects.
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button
          className="resume-button"
          variant="contained"
          startIcon={<Description />}
          href="https://drive.google.com/file/d/1P5z5p6gSy7lds6PhupBybIaqLGcI_zdY/view"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: 'primary.main',
            color: mode === 'dark' ? '#e0e1dd' : '#fff',
            fontSize: { xs: '0.9rem', lg: '1rem' },
            py: { xs: 1.5, lg: 2 },
            px: { xs: 3, lg: 4 },
            '&:hover': {
              backgroundColor: 'primary.dark'
            }
          }}
        >
          View Resume
        </Button>
        <Button
          className="resume-button"
          variant="outlined"
          startIcon={<FileDownload />}
          href="https://drive.google.com/uc?export=download&id=1P5z5p6gSy7lds6PhupBybIaqLGcI_zdY"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderColor: textAlpha(mode, 0.3, 0.5),
            color: 'text.primary',
            fontSize: { xs: '0.9rem', lg: '1rem' },
            py: { xs: 1.5, lg: 2 },
            px: { xs: 3, lg: 4 },
            '&:hover': {
              backgroundColor: textAlpha(mode, 0.1),
              borderColor: 'text.primary'
            }
          }}
        >
          Download PDF
        </Button>
      </Box>
    </Box>
  );
};

export default ResumeSection; 