import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import { School, Work, Build, EmojiEvents, ArrowBack, ArrowForward } from '@mui/icons-material';

interface AboutSectionProps {
  mode?: 'dark' | 'light';
}

const AboutSection: React.FC<AboutSectionProps> = ({ mode = 'dark' }) => {
  const [internshipIdx, setInternshipIdx] = useState(2);

  const internships = [
    {
      company: 'Intuit Credit Karma',
      title: 'SWE Intern',
      year: '2023',
      description: 'Developed a SecOps portal for real-time security alerting and automated incident response. Collaborated with cross-functional teams to enhance platform security.'
    },
    {
      company: 'Analog Devices',
      title: 'SWE Intern',
      year: '2024',
      description: 'Modernized a legacy software packaging application, implemented CI/CD pipelines, and improved deployment reliability for engineering teams.'
    },
    {
      company: 'Intuit Credit Karma',
      title: 'SWE Intern',
      year: '2025',
      description: 'Worked on cloud platform and full-stack development, building scalable microservices and user-facing features for financial products.'
    }
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 1, md: 3 } }}>
      <Typography
        className="about-section"
        variant="h3"
        sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', mb: 4, fontWeight: 600, textAlign: 'center' }}
      >
        About Me
      </Typography>

      <Typography
        className="about-section"
        variant="body1"
        sx={{ color: mode === 'dark' ? 'rgba(224, 225, 221, 0.9)' : 'rgba(27, 38, 59, 0.9)', lineHeight: 1.6, mb: 3 }}
      >
        Computer Science student at RPI with a passion for building digital products. Interned at Intuit Credit Karma and Analog Devices, focusing on cloud and full-stack development.
      </Typography>

      <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        {/* Education */}
        <Card className="about-section" sx={{
          backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.05)' : 'rgba(27, 38, 59, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(224, 225, 221, 0.1)',
          minHeight: 0,
        }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <School sx={{ mr: 2, color: mode === 'dark' ? '#e0e1dd' : '#1b263b', fontSize: 24 }} />
              <Typography variant="h6" sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', fontWeight: 600 }}>
                Education
              </Typography>
            </Box>
            <Typography variant="subtitle1" sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', fontWeight: 500, mb: 0.5 }}>
              Rensselaer Polytechnic Institute, Troy, NY
            </Typography>
            <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(224, 225, 221, 0.8)' : 'rgba(27, 38, 59, 0.8)', mb: 0.5 }}>
              B.S. in Computer Science (2022–2026)
            </Typography>
            <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(224, 225, 221, 0.8)' : 'rgba(27, 38, 59, 0.8)', mb: 0.2 }}>
              Minor in Cognitive Science of AI
            </Typography>
            <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(224, 225, 221, 0.8)' : 'rgba(27, 38, 59, 0.8)', mb: 0.2 }}>
              Minor in Information Technology & Web Science
            </Typography>
          </CardContent>
        </Card>

        {/* Work Experience */}
        <Card className="about-section" sx={{
          backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.05)' : 'rgba(27, 38, 59, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(224, 225, 221, 0.1)',
        }}>
          <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <IconButton
                onClick={() => setInternshipIdx((internshipIdx - 1 + internships.length) % internships.length)}
                size="small"
                sx={{ mr: 2, visibility: internshipIdx > 0 ? 'visible' : 'hidden' }}
              >
                <ArrowBack fontSize="small" />
              </IconButton>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Work sx={{ mr: 2, color: mode === 'dark' ? '#e0e1dd' : '#1b263b', fontSize: 28 }} />
                  <Typography variant="h6" sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', fontWeight: 600 }}>
                    Work Experience
                  </Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', fontWeight: 500, mb: 1 }}>
                  {internships[internshipIdx].company}, {internships[internshipIdx].title} ({internships[internshipIdx].year})
                </Typography>
                <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(224, 225, 221, 0.8)' : 'rgba(27, 38, 59, 0.8)' }}>
                  {internships[internshipIdx].description}
                </Typography>
              </Box>
              <IconButton
                onClick={() => setInternshipIdx((internshipIdx + 1) % internships.length)}
                size="small"
                sx={{ ml: 2, visibility: internshipIdx < internships.length - 1 ? 'visible' : 'hidden' }}
              >
                <ArrowForward fontSize="small" />
              </IconButton>
            </Box>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="about-section" sx={{
          backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.05)' : 'rgba(27, 38, 59, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(224, 225, 221, 0.1)',
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Build sx={{ mr: 2, color: mode === 'dark' ? '#e0e1dd' : '#1b263b', fontSize: 28 }} />
              <Typography variant="h6" sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', fontWeight: 600 }}>
                Core Skills
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(224, 225, 221, 0.8)' : 'rgba(27, 38, 59, 0.8)' }}>
              Full-stack development, cloud computing, AI/ML, real-time systems, DevOps practices
            </Typography>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="about-section" sx={{
          backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.05)' : 'rgba(27, 38, 59, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(224, 225, 221, 0.1)',
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmojiEvents sx={{ mr: 2, color: mode === 'dark' ? '#e0e1dd' : '#1b263b', fontSize: 28 }} />
              <Typography variant="h6" sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', fontWeight: 600 }}>
                Certifications
              </Typography>
            </Box>
            <ul style={{
              margin: 0,
              paddingLeft: 18,
              color: mode === 'dark' ? 'rgba(224, 225, 221, 0.8)' : 'rgba(27, 38, 59, 0.8)',
              fontSize: '0.92rem',
              lineHeight: 1.5
            }}>
              <li>Oracle Certified Foundations Associate – Oracle University</li>
              <li>PCEP-Certified Entry-Level Python Programmer – Python Institute</li>
              <li>Recipient of the President&apos;s Volunteer Service Award</li>
            </ul>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AboutSection; 