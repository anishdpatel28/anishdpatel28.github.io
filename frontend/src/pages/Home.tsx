import { Box, Typography, Container, Card, CardContent, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import PageViews from '@/components/PageViews';

const Home = () => {
  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <PageViews />
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 3,
                bgcolor: 'primary.main',
                fontSize: '2rem',
              }}
            >
              AP
            </Avatar>
            <Typography variant="h1" component="h1" gutterBottom>
              Welcome to My Portfolio
            </Typography>
            <Typography variant="h3" component="h2" color="text.secondary" gutterBottom>
              Anish Patel
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
              Computer Science student at Rensselaer Polytechnic Institute with experience in 
              full-stack development, machine learning, and cloud platform engineering.
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                About Me
              </Typography>
              <Typography variant="body1" paragraph>
                I'm a Computer Science student at Rensselaer Polytechnic Institute with minors in 
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
  );
};

export default Home; 