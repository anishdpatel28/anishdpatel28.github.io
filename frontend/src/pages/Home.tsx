import { Box, Typography, Container, Card, CardContent, Avatar, Chip, Tooltip } from '@mui/material';
import { Description, FileDownload } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ScrollProgress from '@/components/ScrollProgress';
import ParallaxSection from '@/components/ParallaxSection';
import ProjectsParallax from '@/components/ProjectsParallax';
import TimelineNavbar from '@/components/TimelineNavbar';
import NavbarPageViews from '@/components/NavbarPageViews';
import { useState, useEffect } from 'react';

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  // Listen for section changes from TimelineNavbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 100;
      let newActiveSection = 'home';
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const sectionTop = element.offsetTop;
          if (scrollPosition >= sectionTop - 50) {
            newActiveSection = sections[i];
            break;
          }
        }
      }
      setActiveSection(newActiveSection);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box>
      <ScrollProgress />
      <TimelineNavbar />
      <NavbarPageViews activeSection={activeSection} />

      {/* Home Section - Parallax */}
      <ParallaxSection
        id="home"
        speed={0.3}
        backgroundColor="linear-gradient(135deg, #1b263b 0%, #0d1b2a 100%)"
      >
        <Container maxWidth="lg">
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 8 },
            px: { xs: 2, md: 0 }
          }}>
            {/* Left side - Text content */}
            <Box style={{ flex: 1 }}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                      fontWeight: 300,
                      mb: 1,
                      fontSize: { xs: '2rem', md: '3rem' }
                    }}
                  >
                    Hey, I&apos;m <Box component="span" sx={{ fontWeight: 600, color: '#e0e1dd' }}>Anish</Box>
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      fontWeight: 500,
                      mb: 3,
                      color: 'text.secondary',
                      fontSize: { xs: '1.5rem', md: '2rem' }
                    }}
                  >
                    I&apos;m a Fullstack Web Developer
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 400,
                      opacity: 0.9,
                      lineHeight: 1.6,
                      maxWidth: { xs: '100%', md: '400px' }
                    }}
                  >
                    I love creating innovative digital experiences and bring ideas to life.
                  </Typography>
                </motion.div>
              </Box>
            </Box>

            {/* Right side - Image placeholder */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
            >
              <Box sx={{
                width: { xs: 250, md: 350 },
                height: { xs: 250, md: 350 },
                backgroundColor: 'rgba(224, 225, 221, 0.1)',
                border: '2px dashed rgba(224, 225, 221, 0.3)',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                    mb: 2,
                  }}
                >
                  AP
                </Avatar>
                <Typography variant="body2" sx={{ opacity: 0.6, textAlign: 'center' }}>
                  Profile Image<br />Placeholder
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </ParallaxSection>

      {/* About Section - Parallax */}
      <ParallaxSection
        id="about"
        speed={0.2}
        backgroundColor="linear-gradient(135deg, #2c3e50 0%, #34495e 100%)"
      >
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 1, md: 3 } }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Typography variant="h3" sx={{ color: '#e0e1dd', fontWeight: 700, mb: 2 }}>
                About Me
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(224, 225, 221, 0.9)', mb: 4, maxWidth: 700 }}>
                Computer Science student at RPI with a passion for building digital products. Interned at Analog Devices and Intuit Credit Karma, focusing on cloud and full-stack development.
              </Typography>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ mr: 1, color: '#e0e1dd' }}>
                  {/* School Icon */}
                </Box>
                <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 600 }}>
                  Education
                </Typography>
              </Box>
              <Box sx={{ ml: 2, mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: '#e0e1dd', fontWeight: 500 }}>
                  RPI, B.S. Computer Science (2022–2026)
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.8)' }}>
                  Minors: Cognitive Science of AI, Info Tech & Web Science
                </Typography>
              </Box>
            </motion.div>

            {/* Work Experience */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ mr: 1, color: '#e0e1dd' }}>
                  {/* Work Icon */}
                </Box>
                <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 600 }}>
                  Work Experience
                </Typography>
              </Box>
              <Box sx={{ ml: 2, mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: '#e0e1dd', fontWeight: 500 }}>
                  Analog Devices, SWE Intern (2024):
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.8)' }}>
                  Modernized software packaging app.
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#e0e1dd', fontWeight: 500, mt: 1 }}>
                  Intuit Credit Karma, SWE Intern (2023):
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.8)' }}>
                  Built SecOps portal for security alerts.
                </Typography>
              </Box>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ mr: 1, color: '#e0e1dd' }}>
                  {/* Code Icon */}
                </Box>
                <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 600 }}>
                  Skills
                </Typography>
              </Box>
              <Box sx={{ ml: 2, mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.8)' }}>
                  Python, JavaScript, React, Django, NodeJS, SQL
                </Typography>
              </Box>
            </motion.div>

            {/* Certifications & Awards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ mr: 1, color: '#e0e1dd' }}>
                  {/* Award Icon */}
                </Box>
                <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 600 }}>
                  Certifications & Awards
                </Typography>
              </Box>
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.8)' }}>
                  Oracle Certified Foundations Associate
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </ParallaxSection>

      {/* Skills Section - Parallax */}
      <ParallaxSection
        id="skills"
        speed={0.18}
        backgroundColor="linear-gradient(135deg, #22304a 0%, #2c3e50 100%)"
      >
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 1, md: 3 } }}>
            <Typography variant="h3" sx={{ color: '#e0e1dd', fontWeight: 700, mb: 3 }}>
              Skills
            </Typography>
            {/* Programming Languages */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 600, mb: 1 }}>
                Programming Languages
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {/* Chips with Tooltips for each language */}
                {[
                  { label: 'Python', icon: null },
                  { label: 'JavaScript', icon: null },
                  { label: 'Java', icon: null },
                  { label: 'C', icon: null },
                  { label: 'C++', icon: null },
                  { label: 'CSS', icon: null },
                  { label: 'HTML5', icon: null },
                  { label: 'JSON', icon: null },
                ].map(skill => (
                  <Tooltip key={skill.label} title={skill.label} arrow>
                    {skill.icon !== null && skill.icon !== undefined ? (
                      <Chip
                        icon={skill.icon}
                        label={''}
                        sx={{ minWidth: 36, minHeight: 36, bgcolor: 'rgba(224,225,221,0.08)', color: '#e0e1dd', fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}
                      />
                    ) : (
                      <Chip
                        label={''}
                        sx={{ minWidth: 36, minHeight: 36, bgcolor: 'rgba(224,225,221,0.08)', color: '#e0e1dd', fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}
                      />
                    )}
                  </Tooltip>
                ))}
              </Box>
            </Box>
            {/* Frameworks & Libraries */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 600, mb: 1 }}>
                Frameworks & Libraries
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {[
                  { label: 'React', icon: null },
                  { label: 'Django', icon: null },
                  { label: 'NodeJS', icon: null },
                  { label: 'OpenAPI', icon: null },
                ].map(skill => (
                  <Tooltip key={skill.label} title={skill.label} arrow>
                    {skill.icon !== null && skill.icon !== undefined ? (
                      <Chip
                        icon={skill.icon}
                        label={''}
                        sx={{ minWidth: 36, minHeight: 36, bgcolor: 'rgba(224,225,221,0.08)', color: '#e0e1dd', fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}
                      />
                    ) : (
                      <Chip
                        label={''}
                        sx={{ minWidth: 36, minHeight: 36, bgcolor: 'rgba(224,225,221,0.08)', color: '#e0e1dd', fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}
                      />
                    )}
                  </Tooltip>
                ))}
              </Box>
            </Box>
            {/* Tools & Technologies */}
            <Box>
              <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 600, mb: 1 }}>
                Tools & Technologies
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {[
                  { label: 'PostgreSQL', icon: null },
                  { label: 'SQL', icon: null },
                  { label: 'pgAdmin', icon: null },
                  { label: 'Docker', icon: null },
                  { label: 'GitHub', icon: null },
                  { label: 'VS Code', icon: null },
                  { label: 'Jira', icon: null },
                  { label: 'Figma', icon: null },
                  { label: 'Postman', icon: null },
                  { label: 'Backstage', icon: null },
                ].map(skill => (
                  <Tooltip key={skill.label} title={skill.label} arrow>
                    {skill.icon !== null && skill.icon !== undefined ? (
                      <Chip
                        icon={skill.icon}
                        label={''}
                        sx={{ minWidth: 36, minHeight: 36, bgcolor: 'rgba(224,225,221,0.08)', color: '#e0e1dd', fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}
                      />
                    ) : (
                      <Chip
                        label={''}
                        sx={{ minWidth: 36, minHeight: 36, bgcolor: 'rgba(224,225,221,0.08)', color: '#e0e1dd', fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}
                      />
                    )}
                  </Tooltip>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </ParallaxSection>

      {/* Projects Section - Special Parallax */}
      <ProjectsParallax />

      {/* Resume Section - Parallax */}
      <ParallaxSection
        id="resume"
        speed={0.2}
        backgroundColor="linear-gradient(135deg, #34495e 0%, #2c3e50 100%)"
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card sx={{
              backgroundColor: 'rgba(224, 225, 221, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(224, 225, 221, 0.1)',
              textAlign: 'center'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#e0e1dd', fontWeight: 600, mb: 3 }}>
                  Resume
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: 'rgba(224, 225, 221, 0.9)', lineHeight: 1.7, mb: 4 }}>
                  View my detailed resume including my education, work experience, projects, and technical skills.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Box
                      component="a"
                      href="https://drive.google.com/file/d/19BGb6xdeRADI9lLYGqFvN8jCOlfzvm3h/view"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        backgroundColor: '#e0e1dd',
                        color: '#1b263b',
                        px: 3,
                        py: 1.5,
                        borderRadius: 2,
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(224, 225, 221, 0.9)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(224, 225, 221, 0.3)'
                        }
                      }}
                    >
                      <Description sx={{ mr: 1 }} /> View Resume
                    </Box>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Box
                      component="a"
                      href="https://drive.google.com/uc?export=download&id=19BGb6xdeRADI9lLYGqFvN8jCOlfzvm3h"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        color: '#e0e1dd',
                        px: 3,
                        py: 1.5,
                        borderRadius: 2,
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        border: '2px solid #e0e1dd',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(224, 225, 221, 0.1)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(224, 225, 221, 0.2)'
                        }
                      }}
                    >
                      <FileDownload sx={{ mr: 1 }} /> Download Resume
                    </Box>
                  </motion.div>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </ParallaxSection>

      {/* Contact Section - Parallax */}
      <ParallaxSection
        id="contact"
        speed={0.2}
        backgroundColor="linear-gradient(135deg, #1b263b 0%, #0d1b2a 100%)"
      >
        <Container maxWidth="lg">
          <Card sx={{
            backgroundColor: 'rgba(224, 225, 221, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(224, 225, 221, 0.1)',
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#e0e1dd', fontWeight: 600 }}>
                Contact Me
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(224, 225, 221, 0.9)', lineHeight: 1.7 }}>
                Feel free to reach out for collaboration opportunities or just to connect!
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </ParallaxSection>
    </Box>
  );
};

export default Home; 