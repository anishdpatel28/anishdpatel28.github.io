import { Box, Typography, Container, Card, CardContent, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import ScrollProgress from '@/components/ScrollProgress';

const Home = () => {
  return (
    <Box>
      <ScrollProgress />
      {/* Home Section - Full Screen */}
      <Box
        id="home"
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1b263b', // Darker navy background
          background: 'linear-gradient(135deg, #1b263b 0%, #0d1b2a 100%)', // Subtle gradient
        }}
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
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ flex: 1 }}
            >
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
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
                  I&apos;m a fullstack web developer
                </Typography>
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
              </Box>
            </motion.div>

            {/* Right side - Image placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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
      </Box>

      {/* About Section */}
      <Box
        id="about"
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  About Me
                </Typography>
                <Typography variant="body1" paragraph>
                  I&apos;m a Computer Science student at Rensselaer Polytechnic Institute with minors in
                  Cognitive Science of Artificial Intelligence and Information Technology and Web Science.
                </Typography>
                <Typography variant="body1" paragraph>
                  I have experience working as a Software Engineer Intern at Analog Devices and
                  Intuit Credit Karma, where I developed full-stack applications and gained proficiency
                  in modern web technologies.
                </Typography>
                <Typography variant="body1">
                  My interests include machine learning, artificial intelligence, and building
                  scalable web applications.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Box>

      {/* Projects Section */}
      <Box
        id="projects"
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Skills & Technologies
                </Typography>
                <Typography variant="body1">
                  <strong>Programming Languages:</strong> Python, JavaScript, TypeScript, Java, C, C++, CSS, HTML5
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Frameworks & Libraries:</strong> React, Django, Node.js, OpenAPI, Material UI
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Tools & Technologies:</strong> PostgreSQL, Docker, GitHub, VS Code, Jira, Figma, Postman
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        id="contact"
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Contact Me
              </Typography>
              <Typography variant="body1">
                Feel free to reach out for collaboration opportunities or just to connect!
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 