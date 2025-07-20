import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Chip, IconButton, Button } from '@mui/material';
import { ArrowBack, ArrowForward, Launch, GitHub } from '@mui/icons-material';
import { gsap } from 'gsap';
import { sectionBackgrounds } from '@/themes/theme';

const ProjectsParallax = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [rotation, setRotation] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

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
    const newProject = (currentProject + 1) % projects.length;
    setCurrentProject(newProject);
    setRotation(prev => prev - 90);
  };

  const prevProject = () => {
    const newProject = (currentProject - 1 + projects.length) % projects.length;
    setCurrentProject(newProject);
    setRotation(prev => prev + 90);
  };

  const handleCardClick = (targetIndex: number) => {
    if (targetIndex === currentProject) return;

    const totalCards = projects.length;
    let diff = targetIndex - currentProject;

    if (diff > totalCards / 2) {
      diff -= totalCards;
    } else if (diff < -totalCards / 2) {
      diff += totalCards;
    }

    setCurrentProject(targetIndex);
    setRotation(prev => prev - (diff * 90));
  };

  useEffect(() => {
    // Animate carousel rotation
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        rotateY: rotation,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    // Animate info panel
    if (infoRef.current) {
      gsap.fromTo(infoRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out"
        }
      );
    }
  }, [currentProject, rotation]);

  return (
    <Box
      id="projects"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: sectionBackgrounds.projects,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 6, lg: 6 },
          height: { xs: 'auto', lg: '80vh' },
          flexDirection: { xs: 'column', lg: 'row' },
          py: { xs: 3, lg: 0 }
        }}>

          {/* 3D Carousel */}
          <Box sx={{
            flex: { xs: 'none', lg: 1 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            height: { xs: 'auto', lg: '60vh' },
            width: '100%'
          }}>
            {/* Carousel Wrapper with Navigation */}
            <Box sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 6, lg: 8 }
            }}>
              {/* Left Arrow */}
              <IconButton
                onClick={prevProject}
                sx={{
                  backgroundColor: 'rgba(224, 225, 221, 0.1)',
                  color: '#e0e1dd',
                  width: { xs: 36, lg: 40 },
                  height: { xs: 36, lg: 40 },
                  '&:hover': {
                    backgroundColor: 'rgba(224, 225, 221, 0.2)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s ease',
                  zIndex: 10
                }}
              >
                <ArrowBack />
              </IconButton>

              {/* 3D Carousel Container */}
              <Box sx={{
                position: 'relative',
                width: { xs: 180, lg: 300 },
                height: { xs: 240, lg: 400 },
                perspective: '800px'
              }}>
                <div
                  ref={carouselRef}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transform: 'translateZ(-200px)'
                  }}
                >
                  {projects.map((project, index) => {
                    const rotationY = index * 90;
                    const translateZ = 200;

                    return (
                      <div
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
                      </div>
                    );
                  })}
                </div>
              </Box>

              {/* Right Arrow */}
              <IconButton
                onClick={nextProject}
                sx={{
                  backgroundColor: 'rgba(224, 225, 221, 0.1)',
                  color: '#e0e1dd',
                  width: { xs: 36, lg: 40 },
                  height: { xs: 36, lg: 40 },
                  '&:hover': {
                    backgroundColor: 'rgba(224, 225, 221, 0.2)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s ease',
                  zIndex: 10
                }}
              >
                <ArrowForward />
              </IconButton>
            </Box>
          </Box>

          {/* Project Details */}
          <Box sx={{
            flex: { xs: 'none', lg: 1 },
            minHeight: { xs: 'auto', lg: '60vh' },
            width: { xs: '100%', lg: 'auto' },
            maxWidth: { xs: '100%', lg: 'none' }
          }}>
            <div ref={infoRef}>
              <Card sx={{
                backgroundColor: 'rgba(224, 225, 221, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(224, 225, 221, 0.1)',
                height: '100%'
              }}>
                <CardContent sx={{ p: { xs: 1.5, lg: 4 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: { xs: 1.5, lg: 3 } }}>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          color: '#e0e1dd',
                          fontWeight: 700,
                          mb: 1,
                          fontSize: { xs: '1.25rem', lg: '2.125rem' }
                        }}
                      >
                        {projects[currentProject].title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip
                          label={projects[currentProject].status}
                          size="small"
                          sx={{
                            backgroundColor: projects[currentProject].color,
                            color: 'white',
                            fontWeight: 600,
                            fontSize: { xs: '0.7rem', lg: '0.8125rem' }
                          }}
                        />
                        <Chip
                          label={projects[currentProject].year}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: 'rgba(224, 225, 221, 0.3)',
                            color: '#e0e1dd',
                            fontSize: { xs: '0.7rem', lg: '0.8125rem' }
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Typography variant="body1" sx={{
                    color: 'rgba(224, 225, 221, 0.9)',
                    lineHeight: 1.6,
                    fontSize: { xs: '0.85rem', lg: '1.1rem' },
                    mb: { xs: 1.5, lg: 4 }
                  }}>
                    {projects[currentProject].description}
                  </Typography>

                  <Typography variant="h6" sx={{ color: '#e0e1dd', mb: { xs: 1, lg: 2 }, fontWeight: 600, fontSize: { xs: '0.9rem', lg: '1.25rem' } }}>
                    Technologies
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: { xs: 1.5, lg: 4 } }}>
                    {projects[currentProject].technologies.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: 'rgba(224, 225, 221, 0.3)',
                          color: '#e0e1dd',
                          fontSize: { xs: '0.7rem', lg: '0.8125rem' },
                          '&:hover': {
                            backgroundColor: 'rgba(224, 225, 221, 0.1)',
                          }
                        }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', gap: { xs: 1, lg: 2 }, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Button
                      variant="contained"
                      startIcon={<Launch />}
                      sx={{
                        backgroundColor: projects[currentProject].color,
                        fontSize: { xs: '0.8rem', lg: '0.875rem' },
                        py: { xs: 1, lg: 1.5 },
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
                        fontSize: { xs: '0.8rem', lg: '0.875rem' },
                        py: { xs: 1, lg: 1.5 },
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
            </div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectsParallax; 