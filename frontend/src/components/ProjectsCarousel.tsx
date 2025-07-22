import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Chip, IconButton, Button, useTheme, useMediaQuery } from '@mui/material';
import { ArrowBack, ArrowForward, Launch, GitHub } from '@mui/icons-material';
import { gsap } from 'gsap';
import { sectionBackgrounds } from '@/themes/theme';

const ProjectsCarousel = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [rotation, setRotation] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const prevIsMobile = useRef(isMobile);

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
    if (!isMobile) {
      setRotation(prev => prev - 90);
    }
  };

  const prevProject = () => {
    const newProject = (currentProject - 1 + projects.length) % projects.length;
    setCurrentProject(newProject);
    if (!isMobile) {
      setRotation(prev => prev + 90);
    }
  };

  const handleCardClick = (targetIndex: number) => {
    if (targetIndex === currentProject || isMobile) return;

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
    if (prevIsMobile.current !== isMobile) {
      (async () => {
        if (!isMobile && carouselRef.current) {
          if (process.env.NODE_ENV !== 'test') {
            const gsapMod = await import('gsap');
            const gsap = gsapMod.default;
            gsap.set(carouselRef.current, { rotateY: rotation });
          }
        }
        if (infoRef.current) {
          if (process.env.NODE_ENV !== 'test') {
            const gsapMod = await import('gsap');
            const gsap = gsapMod.default;
            gsap.set(infoRef.current, { opacity: 1, y: 0 });
          }
        }
        prevIsMobile.current = isMobile;
      })();
      return;
    }

    (async () => {
      if (process.env.NODE_ENV === 'test') return;
      const gsapMod = await import('gsap');
      const gsap = gsapMod.default;
      if (isMobile) {
        if (infoRef.current) {
          gsap.set(infoRef.current, { opacity: 1, y: 0 });
        }
      } else {
        if (carouselRef.current) {
          gsap.to(carouselRef.current, {
            rotateY: rotation,
            duration: 0.8,
            ease: "power2.out"
          });
        }
        if (infoRef.current) {
          gsap.fromTo(infoRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.4,
              ease: "power1.out"
            }
          );
        }
      }
    })();
  }, [currentProject, rotation, isMobile]);

  // mobile layout component
  const MobileLayout = () => (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3,
      width: '100%',
      py: 2
    }}>
      {/* Project Card */}
      <Card sx={{
        width: '100%',
        maxWidth: 400,
        backgroundColor: 'rgba(224, 225, 221, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(224, 225, 221, 0.1)',
        borderRadius: 3,
        overflow: 'hidden'
      }}>
        <Box sx={{
          height: 120,
          background: `linear-gradient(135deg, ${projects[currentProject].color}, ${projects[currentProject].color}dd)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.2)'
          }} />
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              fontWeight: 700,
              textAlign: 'center',
              px: 2,
              position: 'relative',
              zIndex: 2,
              fontSize: '1.25rem'
            }}
          >
            {projects[currentProject].title}
          </Typography>
        </Box>

        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Chip
              label={projects[currentProject].status}
              size="small"
              sx={{
                backgroundColor: projects[currentProject].color,
                color: 'white',
                fontWeight: 600,
                fontSize: '0.7rem'
              }}
            />
            <Chip
              label={projects[currentProject].year}
              size="small"
              variant="outlined"
              sx={{
                borderColor: 'rgba(224, 225, 221, 0.3)',
                color: '#e0e1dd',
                fontSize: '0.7rem'
              }}
            />
            <Chip
              label={projects[currentProject].category}
              size="small"
              variant="outlined"
              sx={{
                borderColor: 'rgba(224, 225, 221, 0.3)',
                color: '#e0e1dd',
                fontSize: '0.7rem'
              }}
            />
          </Box>

          <Typography variant="body2" sx={{
            color: 'rgba(224, 225, 221, 0.9)',
            lineHeight: 1.6,
            fontSize: '0.85rem',
            mb: 2
          }}>
            {projects[currentProject].description}
          </Typography>

          <Typography variant="subtitle2" sx={{
            color: '#e0e1dd',
            mb: 1,
            fontWeight: 600,
            fontSize: '0.9rem'
          }}>
            Technologies
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
            {projects[currentProject].technologies.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                variant="outlined"
                size="small"
                sx={{
                  borderColor: 'rgba(224, 225, 221, 0.3)',
                  color: '#e0e1dd',
                  fontSize: '0.65rem',
                  '&:hover': {
                    backgroundColor: 'rgba(224, 225, 221, 0.1)',
                  }
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
            <Button
              variant="contained"
              startIcon={<Launch />}
              fullWidth
              sx={{
                backgroundColor: projects[currentProject].color,
                fontSize: '0.8rem',
                py: 1,
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
              fullWidth
              sx={{
                borderColor: 'rgba(224, 225, 221, 0.3)',
                color: '#e0e1dd',
                fontSize: '0.8rem',
                py: 1,
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

      {/* Navigation */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        mt: 1
      }}>
        <IconButton
          onClick={prevProject}
          sx={{
            backgroundColor: 'rgba(224, 225, 221, 0.1)',
            color: '#e0e1dd',
            width: 48,
            height: 48,
            '&:hover': {
              backgroundColor: 'rgba(224, 225, 221, 0.2)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowBack />
        </IconButton>

        <Box sx={{
          display: 'flex',
          gap: 1
        }}>
          {projects.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: index === currentProject
                  ? projects[currentProject].color
                  : 'rgba(224, 225, 221, 0.3)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </Box>

        <IconButton
          onClick={nextProject}
          sx={{
            backgroundColor: 'rgba(224, 225, 221, 0.1)',
            color: '#e0e1dd',
            width: 48,
            height: 48,
            '&:hover': {
              backgroundColor: 'rgba(224, 225, 221, 0.2)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box
      id="projects"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: sectionBackgrounds.projects,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        {isMobile ? (
          <MobileLayout />
        ) : (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            height: '80vh',
            flexDirection: 'row',
          }}>
            {/* 3D Carousel */}
            <Box sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              height: '60vh',
              width: '100%'
            }}>
              {/* Carousel Wrapper with Navigation */}
              <Box sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                {/* Left Arrow */}
                <IconButton
                  onClick={prevProject}
                  sx={{
                    backgroundColor: 'rgba(224, 225, 221, 0.1)',
                    color: '#e0e1dd',
                    width: 40,
                    height: 40,
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
                  width: 300,
                  height: 400,
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
                      const isBack = (index + 2) % projects.length === currentProject;
                      const isVisible = Math.abs(index - currentProject) <= 1 || Math.abs(index - currentProject) === projects.length - 1 || isBack;
                      const cardStyle: React.CSSProperties = {
                        width: 300,
                        height: 400,
                        transform: `rotateY(${rotationY}deg) translateZ(${translateZ}px)`,
                        transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transformOrigin: 'center center',
                        translate: '-50% -50%',
                        borderRadius: 16,
                        cursor: 'pointer',
                        boxShadow: index === currentProject ? '0 8px 32px rgba(0,0,0,0.25)' : '0 2px 8px rgba(0,0,0,0.10)',
                        zIndex: index === currentProject ? 2 : 1,
                        background: '#222e3a',
                        color: '#e0e1dd',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column' as React.CSSProperties['flexDirection'],
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: isVisible ? 1 : 0,
                        pointerEvents: isVisible ? 'auto' : 'none',
                      };

                      return (
                        <div
                          key={project.id}
                          style={cardStyle}
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
                    width: 40,
                    height: 40,
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
              flex: 1,
              minHeight: '60vh',
              width: 'auto',
              maxWidth: 'none'
            }}>
              <div ref={infoRef}>
                <Card sx={{
                  backgroundColor: 'rgba(224, 225, 221, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(224, 225, 221, 0.1)',
                  height: '100%'
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{
                            color: '#e0e1dd',
                            fontWeight: 700,
                            mb: 1,
                            fontSize: '2.125rem'
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
                              fontSize: '0.8125rem'
                            }}
                          />
                          <Chip
                            label={projects[currentProject].year}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: 'rgba(224, 225, 221, 0.3)',
                              color: '#e0e1dd',
                              fontSize: '0.8125rem'
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Typography variant="body1" sx={{
                      color: 'rgba(224, 225, 221, 0.9)',
                      lineHeight: 1.6,
                      fontSize: '1.1rem',
                      mb: 4
                    }}>
                      {projects[currentProject].description}
                    </Typography>

                    <Typography variant="h6" sx={{ color: '#e0e1dd', mb: 2, fontWeight: 600, fontSize: '1.25rem' }}>
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
                            fontSize: '0.8125rem',
                            '&:hover': {
                              backgroundColor: 'rgba(224, 225, 221, 0.1)',
                            }
                          }}
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'row' }}>
                      <Button
                        variant="contained"
                        startIcon={<Launch />}
                        sx={{
                          backgroundColor: projects[currentProject].color,
                          fontSize: '0.875rem',
                          py: 1.5,
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
                          fontSize: '0.875rem',
                          py: 1.5,
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
        )}
      </Container>
    </Box>
  );
};

export default ProjectsCarousel; 