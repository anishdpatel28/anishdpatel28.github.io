import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Card, CardContent, Chip, IconButton, Button, useTheme, useMediaQuery } from '@mui/material';
import { ArrowBack, ArrowForward, OpenInNew } from '@mui/icons-material';
import { ThemeContext } from '@/App';
import { projects } from '@/data/projects';

const ProjectsCarousel = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [rotation, setRotation] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const prevIsMobile = useRef(isMobile);
  const { mode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const nextProject = useCallback(() => {
    const newProject = (currentProject + 1) % projects.length;
    setCurrentProject(newProject);
    if (!isMobile) {
      setRotation(prev => prev - 90);
    }
  }, [currentProject, isMobile]);

  const prevProject = useCallback(() => {
    const newProject = (currentProject - 1 + projects.length) % projects.length;
    setCurrentProject(newProject);
    if (!isMobile) {
      setRotation(prev => prev + 90);
    }
  }, [currentProject, isMobile]);

  const handleViewDetails = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;
    if (prevIsMobile.current !== isMobile) {
      (async () => {
        if (!isMobile && carouselRef.current) {
          const gsapMod = await import('gsap');
          const gsap = gsapMod.default;
          gsap.set(carouselRef.current, { rotateY: rotation });
        }
        if (infoRef.current) {
          const gsapMod = await import('gsap');
          const gsap = gsapMod.default;
          gsap.set(infoRef.current, { opacity: 1, y: 0 });
        }
        prevIsMobile.current = isMobile;
      })();
      return;
    }

    (async () => {
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

  // Restrict arrow key navigation to only when Projects section is in view
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useRef(false);

  useEffect(() => {
    if (!projectsSectionRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        isSectionInView.current = entry.isIntersecting;
      },
      { threshold: 0.3 }
    );
    observer.observe(projectsSectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSectionInView.current) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevProject();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject]);

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
              zIndex: 0,
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
                borderColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.3)' : 'rgba(27, 38, 59, 0.5)',
                color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                fontSize: '0.7rem'
              }}
            />
            <Chip
              label={projects[currentProject].category}
              size="small"
              variant="outlined"
              sx={{
                borderColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.3)' : 'rgba(27, 38, 59, 0.5)',
                color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                fontSize: '0.7rem'
              }}
            />
          </Box>

          <Typography variant="body2" sx={{
            color: mode === 'dark' ? 'rgba(224, 225, 221, 0.9)' : 'rgba(27, 38, 59, 0.9)',
            lineHeight: 1.6,
            fontSize: '0.85rem',
            mb: 2
          }}>
            {projects[currentProject].shortDescription}
          </Typography>

          <Typography variant="subtitle2" sx={{
            color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
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
                  borderColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.3)' : 'rgba(27, 38, 59, 0.5)',
                  color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                  fontSize: '0.65rem',
                  '&:hover': {
                    backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.1)' : 'rgba(27, 38, 59, 0.1)',
                  }
                }}
              />
            ))}
          </Box>

          <Button
            variant="contained"
            startIcon={<OpenInNew />}
            fullWidth
            onClick={() => handleViewDetails(projects[currentProject].id)}
            sx={{
              backgroundColor: projects[currentProject].color,
              fontSize: '0.8rem',
              py: 1,
              '&:hover': {
                backgroundColor: projects[currentProject].color + 'dd'
              }
            }}
          >
            View Details
          </Button>
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
            backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.1)' : 'rgba(27, 38, 59, 0.2)',
            color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
            width: 48,
            height: 48,
            zIndex: 1,
            '&:hover': {
              backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.2)' : 'rgba(27, 38, 59, 0.3)',
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
            backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.1)' : 'rgba(27, 38, 59, 0.2)',
            color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
            width: 48,
            height: 48,
            zIndex: 1,
            '&:hover': {
              backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.2)' : 'rgba(27, 38, 59, 0.3)',
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
      ref={projectsSectionRef}
      className="projects-carousel"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 0,
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
                gap: 12
              }}>
                {/* Left Arrow */}
                <IconButton
                  onClick={prevProject}
                  sx={{
                    backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.1)' : 'rgba(27, 38, 59, 0.2)',
                    color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                    width: 44,
                    height: 44,
                    '&:hover': {
                      backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.2)' : 'rgba(27, 38, 59, 0.3)',
                      transform: 'scale(1.1)'
                    },
                    transition: 'all 0.2s ease',
                    zIndex: 1,
                    border: `2px solid ${mode === 'dark' ? 'rgba(224, 225, 221, 0.2)' : 'rgba(27, 38, 59, 0.3)'}`,
                    '&:active': {
                      transform: 'scale(0.95)'
                    }
                  }}
                  aria-label="Previous project"
                >
                  <ArrowBack sx={{ fontSize: 22 }} />
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
                        cursor: 'default',
                        boxShadow: index === currentProject ? '0 8px 32px rgba(0,0,0,0.25)' : '0 2px 8px rgba(0,0,0,0.10)',
                        zIndex: 0,
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
                            cursor: 'default',
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
                            <CardContent
                              sx={{
                                position: 'relative',
                                zIndex: 0,
                                color: 'white',
                                cursor: 'default',
                              }}
                            >
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
                    backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.1)' : 'rgba(27, 38, 59, 0.2)',
                    color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                    width: 44,
                    height: 44,
                    '&:hover': {
                      backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.2)' : 'rgba(27, 38, 59, 0.3)',
                      transform: 'scale(1.1)'
                    },
                    transition: 'all 0.2s ease',
                    zIndex: 1,
                    border: `2px solid ${mode === 'dark' ? 'rgba(224, 225, 221, 0.2)' : 'rgba(27, 38, 59, 0.3)'}`,
                    '&:active': {
                      transform: 'scale(0.95)'
                    }
                  }}
                  aria-label="Next project"
                >
                  <ArrowForward sx={{ fontSize: 22 }} />
                </IconButton>
              </Box>
            </Box>

            {/* Project Details */}
            <Box
              className="projects-info"
              sx={{
                flex: 1,
                minHeight: '60vh',
                width: 'auto',
                maxWidth: 'none'
              }}
            >
              <div ref={infoRef}>
                <Card sx={{
                  backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.05)' : 'rgba(27, 38, 59, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: mode === 'dark' ? '1px solid rgba(224, 225, 221, 0.1)' : '1px solid rgba(27, 38, 59, 0.1)',
                  height: '100%'
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{
                            color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
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
                              borderColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.3)' : 'rgba(27, 38, 59, 0.5)',
                              color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                              fontSize: '0.8125rem'
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Typography variant="body1" sx={{
                      color: mode === 'dark' ? 'rgba(224, 225, 221, 0.9)' : 'rgba(27, 38, 59, 0.9)',
                      lineHeight: 1.6,
                      fontSize: '1.1rem',
                      mb: 4
                    }}>
                      {projects[currentProject].shortDescription}
                    </Typography>

                    <Typography variant="h6" sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', mb: 2, fontWeight: 600, fontSize: '1.25rem' }}>
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
                            borderColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.3)' : 'rgba(27, 38, 59, 0.5)',
                            color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                            fontSize: '0.8125rem',
                            '&:hover': {
                              backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.1)' : 'rgba(27, 38, 59, 0.1)',
                            }
                          }}
                        />
                      ))}
                    </Box>

                    <Button
                      variant="contained"
                      startIcon={<OpenInNew />}
                      onClick={() => handleViewDetails(projects[currentProject].id)}
                      sx={{
                        backgroundColor: projects[currentProject].color,
                        fontSize: '0.875rem',
                        py: 1.5,
                        px: 4,
                        '&:hover': {
                          backgroundColor: projects[currentProject].color + 'dd'
                        }
                      }}
                    >
                      View Project Details
                    </Button>
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
