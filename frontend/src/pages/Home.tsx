import { Box, Typography, Container, Card, CardContent, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import ScrollProgress from '@/components/ScrollProgress';
import ParallaxSection from '@/components/ParallaxSection';
import ProjectsParallax from '@/components/ProjectsParallax';

const Home = () => {
  return (
    <Box>
      <ScrollProgress />

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card sx={{
              backgroundColor: 'rgba(224, 225, 221, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(224, 225, 221, 0.1)',
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#e0e1dd', fontWeight: 600 }}>
                  About Me
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: 'rgba(224, 225, 221, 0.9)', lineHeight: 1.7 }}>
                  I&apos;m a Computer Science student at Rensselaer Polytechnic Institute with minors in
                  Cognitive Science of Artificial Intelligence and Information Technology and Web Science.
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: 'rgba(224, 225, 221, 0.9)', lineHeight: 1.7 }}>
                  I have experience working as a Software Engineer Intern at Analog Devices and
                  Intuit Credit Karma, where I developed full-stack applications and gained proficiency
                  in modern web technologies.
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(224, 225, 221, 0.9)', lineHeight: 1.7 }}>
                  My interests include machine learning, artificial intelligence, and building
                  scalable web applications.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </ParallaxSection>

      {/* Projects Section - Special Parallax */}
      <ProjectsParallax />

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