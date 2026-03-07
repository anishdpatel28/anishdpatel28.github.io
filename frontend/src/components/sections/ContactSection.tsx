import React from 'react';
import { Box, Typography, Tooltip, IconButton } from '@mui/material';
import { Email, LinkedIn, GitHub } from '@mui/icons-material';

interface ContactSectionProps {
  mode?: 'dark' | 'light';
}

const ContactSection: React.FC<ContactSectionProps> = ({ mode = 'dark' }) => {

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 1, md: 3 }, textAlign: 'center' }}>
      <Typography
        className="contact-title"
        variant="h3"
        sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', mb: 4, fontWeight: 600 }}
      >
        Get In Touch
      </Typography>
      <Typography variant="h6" sx={{ color: mode === 'dark' ? 'rgba(224, 225, 221, 0.9)' : 'rgba(27, 38, 59, 0.9)', mb: 6, maxWidth: 600, mx: 'auto' }}>
        I&apos;m always interested in new opportunities and collaborations. Feel free to reach out!
      </Typography>
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center', mt: 4 }}>
        <Tooltip title="Email" arrow>
          <IconButton
            className="contact-item"
            component="a"
            href="mailto:anishdpatel28@gmail.com"
            sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', p: 2, fontSize: 40 }}
            aria-label="Send email to Anish Patel"
          >
            <Email sx={{ fontSize: 40 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="LinkedIn" arrow>
          <IconButton
            className="contact-item"
            component="a"
            href="https://linkedin.com/in/-anishpatel"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', p: 2, fontSize: 40 }}
            aria-label="Visit LinkedIn profile (opens in new tab)"
          >
            <LinkedIn sx={{ fontSize: 40 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="GitHub" arrow>
          <IconButton
            className="contact-item"
            component="a"
            href="https://github.com/anishdpatel28"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', p: 2, fontSize: 40 }}
            aria-label="Visit GitHub profile (opens in new tab)"
          >
            <GitHub sx={{ fontSize: 40 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ContactSection; 