import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Description, FileDownload } from '@mui/icons-material';

interface ResumeSectionProps {
  mode?: 'dark' | 'light';
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ mode = 'dark' }) => {

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 1, md: 3 }, textAlign: 'center' }}>
      <Typography
        className="resume-title"
        variant="h3"
        sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', mb: 4, fontWeight: 600 }}
      >
        Resume & Experience
      </Typography>
      <Typography variant="h6" sx={{ color: mode === 'dark' ? 'rgba(224, 225, 221, 0.9)' : 'rgba(27, 38, 59, 0.9)', mb: 6, maxWidth: 600, mx: 'auto' }}>
        Download my resume to learn more about my experience, skills, and projects.
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button
          className="resume-button"
          variant="contained"
          startIcon={<Description />}
          href="https://drive.google.com/file/d/1oYXYWQ_XTY6oj7upTV3WV0ODcNrZ063r/view"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: mode === 'dark' ? 'primary.main' : '#1b263b',
            color: mode === 'dark' ? '#e0e1dd' : '#fff',
            fontSize: { xs: '0.9rem', lg: '1rem' },
            py: { xs: 1.5, lg: 2 },
            px: { xs: 3, lg: 4 },
            '&:hover': {
              backgroundColor: mode === 'dark' ? 'primary.dark' : '#0d1b2a'
            }
          }}
        >
          View Resume
        </Button>
        <Button
          className="resume-button"
          variant="outlined"
          startIcon={<FileDownload />}
          href="https://drive.google.com/uc?export=download&id=1oYXYWQ_XTY6oj7upTV3WV0ODcNrZ063r"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.3)' : 'rgba(27, 38, 59, 0.5)',
            color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
            fontSize: { xs: '0.9rem', lg: '1rem' },
            py: { xs: 1.5, lg: 2 },
            px: { xs: 3, lg: 4 },
            '&:hover': {
              backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.1)' : 'rgba(27, 38, 59, 0.1)',
              borderColor: mode === 'dark' ? '#e0e1dd' : '#1b263b'
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