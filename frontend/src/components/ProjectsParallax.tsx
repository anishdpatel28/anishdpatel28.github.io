import React, { useState } from 'react';
import { Box, Typography, Container, Card, CardContent, Chip, IconButton, Button } from '@mui/material';
import { ArrowBack, ArrowForward, Launch, GitHub } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsParallax = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React and Node.js. Features include user authentication, payment processing with Stripe, inventory management, and real-time order tracking. The platform supports multiple vendors and includes an admin dashboard for analytics.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redux", "AWS"],
      year: "2024",
      status: "Live Production",
      category: "Full-Stack",
      color: "#4A90E2"
    },
    {
      id: 2,
      title: "AI Analytics Dashboard",
      description: "An intelligent dashboard that uses machine learning to analyze user behavior patterns and provide actionable insights. Built with Python and TensorFlow, it processes large datasets to predict user trends and optimize business strategies.",
      technologies: ["Python", "TensorFlow", "D3.js", "Flask", "MongoDB", "Docker"],
      year: "2023",
      status: "In Development",
      category: "AI/ML",
      color: "#7B68EE"
    },
    {
      id: 3,
      title: "Real-Time Collaboration",
      description: "A collaborative workspace application with real-time editing capabilities, video calls, and project management features. Implemented using WebRTC for peer-to-peer communication and Socket.io for real-time synchronization across multiple users.",
      technologies: ["TypeScript", "WebRTC", "Socket.io", "Express", "Redis", "React"],
      year: "2023",
      status: "Beta Testing",
      category: "Real-Time",
      color: "#FF6B6B"
    },
    {
      id: 4,
      title: "Mobile Finance App",
      description: "A cross-platform mobile application for personal finance management. Features include expense tracking, budget planning, investment portfolio management, and AI-powered spending insights. Built with React Native for seamless iOS and Android experience.",
      technologies: ["React Native", "Firebase", "Plaid API", "Chart.js", "TypeScript"],
      year: "2024",
      status: "App Store Review",
      category: "Mobile",
      color: "#50E3C2"
    }
  ];

  const nextProject = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newProject = (currentProject + 1) % projects.length;
    setRotation(prev => prev + 90);
    setCurrentProject(newProject);

    // Reset animation state after transition completes
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevProject = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newProject = (currentProject - 1 + projects.length) % projects.length;
    setRotation(prev => prev - 90);
    setCurrentProject(newProject);

    // Reset animation state after transition completes
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleCardClick = (targetIndex: number) => {
    if (targetIndex === currentProject || isAnimating) return;

    setIsAnimating(true);

    // Calculate the shortest rotation direction
    const totalCards = projects.length;
    let diff = targetIndex - currentProject;

    // Normalize the difference to [-2, 2] for a 4-card carousel
    if (diff > totalCards / 2) {
      diff -= totalCards;
    } else if (diff < -totalCards / 2) {
      diff += totalCards;
    }

    setRotation(prev => prev + (diff * 90));
    setCurrentProject(targetIndex);

    // Reset animation state after transition completes
    setTimeout(() => setIsAnimating(false), 800);
  };


  return (
    <Box
      id="projects"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #2c3e50 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          height: '80vh',
          flexDirection: { xs: 'column', lg: 'row' }
        }}>

          {/* 3D Carousel */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            height: { xs: '40vh', lg: '60vh' }
          }}>
            <Box sx={{
              position: 'relative',
              width: 300,
              height: 400,
              perspective: '1000px'
            }}>
              <motion.div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(-200px)'
                }}
                animate={{
                  rotateY: rotation
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                {projects.map((project, index) => {
                  const rotationY = index * 90; // Fixed position for each card in cube
                  const translateZ = 200; // Distance from center for cube formation

                  return (
                    <motion.div
                      key={project.id}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transformStyle: 'preserve-3d',
                        transform: `rotateY(${rotationY}deg) translateZ(${translateZ}px)`
                      }}
                      onClick={() => index !== currentProject && handleCardClick(index)}
                    >
                      <Card sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: project.color,
                        background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`,
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '16px',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 15px 25px rgba(0, 0, 0, 0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                          borderRadius: '16px',
                          pointerEvents: 'none'
                        }
                      }}>
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'rgba(0, 0, 0, 0.3)',
                          backdropFilter: 'blur(10px)'
                        }} />
                        <CardContent sx={{ position: 'relative', zIndex: 2, color: 'white' }}>
                          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                            {project.title}
                          </Typography>
                          <Chip
                            label={project.category}
                            sx={{
                              backgroundColor: 'rgba(255, 255, 255, 0.2)',
                              color: 'white',
                              fontWeight: 600
                            }}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </Box>

            <IconButton
              onClick={prevProject}
              disabled={isAnimating}
              sx={{
                position: 'absolute',
                left: -8,
                backgroundColor: isAnimating ? 'rgba(224, 225, 221, 0.05)' : 'rgba(224, 225, 221, 0.1)',
                color: isAnimating ? 'rgba(224, 225, 221, 0.5)' : '#e0e1dd',
                cursor: isAnimating ? 'not-allowed' : 'pointer',
                '&:hover': {
                  backgroundColor: isAnimating ? 'rgba(224, 225, 221, 0.05)' : 'rgba(224, 225, 221, 0.2)',
                  transform: isAnimating ? 'none' : 'scale(1.1)'
                },
                '&:disabled': {
                  color: 'rgba(224, 225, 221, 0.5)'
                },
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
            >
              <ArrowBack />
            </IconButton>

            <IconButton
              onClick={nextProject}
              disabled={isAnimating}
              sx={{
                position: 'absolute',
                right: -8,
                backgroundColor: isAnimating ? 'rgba(224, 225, 221, 0.05)' : 'rgba(224, 225, 221, 0.1)',
                color: isAnimating ? 'rgba(224, 225, 221, 0.5)' : '#e0e1dd',
                cursor: isAnimating ? 'not-allowed' : 'pointer',
                '&:hover': {
                  backgroundColor: isAnimating ? 'rgba(224, 225, 221, 0.05)' : 'rgba(224, 225, 221, 0.2)',
                  transform: isAnimating ? 'none' : 'scale(1.1)'
                },
                '&:disabled': {
                  color: 'rgba(224, 225, 221, 0.5)'
                },
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
            >
              <ArrowForward />
            </IconButton>
          </Box>

          {/* Project Details */}
          <Box sx={{ flex: 1, minHeight: { xs: 'auto', lg: '60vh' } }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <Card sx={{
                  backgroundColor: 'rgba(224, 225, 221, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(224, 225, 221, 0.1)',
                  height: '100%'
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                      <Box>
                        <Typography variant="h4" sx={{ color: '#e0e1dd', fontWeight: 700, mb: 1 }}>
                          {projects[currentProject].title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          <Chip
                            label={projects[currentProject].status}
                            size="small"
                            sx={{
                              backgroundColor: projects[currentProject].color,
                              color: 'white',
                              fontWeight: 600
                            }}
                          />
                          <Chip
                            label={projects[currentProject].year}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: 'rgba(224, 225, 221, 0.3)',
                              color: '#e0e1dd'
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Typography variant="body1" sx={{
                      color: 'rgba(224, 225, 221, 0.9)',
                      lineHeight: 1.7,
                      fontSize: '1.1rem',
                      mb: 4
                    }}>
                      {projects[currentProject].description}
                    </Typography>

                    <Typography variant="h6" sx={{ color: '#e0e1dd', mb: 2, fontWeight: 600 }}>
                      Technologies
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                      {projects[currentProject].technologies.map((tech, index) => (
                        <Chip
                          key={index}
                          label={tech}
                          variant="outlined"
                          size="small"
                          sx={{
                            borderColor: 'rgba(224, 225, 221, 0.3)',
                            color: '#e0e1dd',
                            '&:hover': {
                              backgroundColor: 'rgba(224, 225, 221, 0.1)',
                            }
                          }}
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<Launch />}
                        sx={{
                          backgroundColor: projects[currentProject].color,
                          '&:hover': {
                            backgroundColor: projects[currentProject].color + 'dd'
                          }
                        }}
                      >
                        View Live
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<GitHub />}
                        sx={{
                          borderColor: 'rgba(224, 225, 221, 0.3)',
                          color: '#e0e1dd',
                          '&:hover': {
                            backgroundColor: 'rgba(224, 225, 221, 0.1)',
                            borderColor: '#e0e1dd'
                          }
                        }}
                      >
                        Source Code
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectsParallax; 