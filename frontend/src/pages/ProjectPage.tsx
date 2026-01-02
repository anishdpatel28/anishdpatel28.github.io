import { useEffect, useRef, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Chip,
  Card,
  CardContent,
  Button,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack,
  GitHub,
  Launch,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { ThemeContext } from '@/App';
import { projects, Project } from '@/data/projects';
import ProjectNavbar from '@/components/ProjectNavbar';

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string; }>();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useContext(ThemeContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const foundProject = projects.find((p) => p.id === projectId);
    if (foundProject) {
      setProject(foundProject);
    } else {
      navigate('/');
    }
  }, [projectId, navigate]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;
    window.scrollTo(0, 0);
    (async () => {
      const gsapMod = await import('gsap');
      const gsap = gsapMod.default;
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.animate-in');
        gsap.fromTo(
          elements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          }
        );
      }
    })();
  }, [project]);

  if (!project) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          mode === 'dark'
            ? 'linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)'
            : 'linear-gradient(135deg, #f5f6fa 0%, #e9ecef 100%)',
        pt: 12,
        pb: 8,
      }}
    >
      <ProjectNavbar />

      {/* Theme Toggle */}
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <Card
          sx={{
            bgcolor: mode === 'dark' ? '#1b263b' : '#ffffff',
            borderRadius: 3,
            boxShadow: 3,
            px: 1,
            py: 0.5,
          }}
        >
          <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: mode === 'dark' ? 'rgba(224, 225, 221, 0.7)' : 'rgba(27, 38, 59, 0.7)',
                '&:hover': {
                  backgroundColor:
                    mode === 'dark' ? 'rgba(224, 225, 221, 0.1)' : 'rgba(27, 38, 59, 0.08)',
                },
              }}
              size="large"
            >
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
        </Card>
      </Box>

      <Container maxWidth="lg" ref={contentRef}>
        {/* Back Button */}
        <Button
          className="animate-in"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{
            mb: 4,
            color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
            '&:hover': {
              backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.1)' : 'rgba(27, 38, 59, 0.1)',
            },
          }}
        >
          Back to Home
        </Button>

        {/* Hero Section */}
        <Box className="animate-in" sx={{ mb: 6 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 2,
              flexWrap: 'wrap',
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: project.color,
              }}
            />
            <Chip
              label={project.category}
              sx={{
                backgroundColor: project.color,
                color: 'white',
                fontWeight: 600,
              }}
            />
            <Chip
              label={project.status}
              variant="outlined"
              sx={{
                borderColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.3)' : 'rgba(27, 38, 59, 0.5)',
                color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
              }}
            />
            <Chip
              label={project.year}
              variant="outlined"
              sx={{
                borderColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.3)' : 'rgba(27, 38, 59, 0.5)',
                color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
              }}
            />
          </Box>

          <Typography
            variant="h2"
            sx={{
              color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 2,
            }}
          >
            {project.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: mode === 'dark' ? 'rgba(224, 225, 221, 0.9)' : 'rgba(27, 38, 59, 0.9)',
              fontSize: '1.25rem',
              lineHeight: 1.8,
              maxWidth: 800,
            }}
          >
            {project.fullDescription}
          </Typography>
        </Box>

        {/* Technologies */}
        <Card
          className="animate-in"
          sx={{
            backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.05)' : 'rgba(27, 38, 59, 0.03)',
            backdropFilter: 'blur(20px)',
            border: mode === 'dark' ? '1px solid rgba(224, 225, 221, 0.1)' : '1px solid rgba(27, 38, 59, 0.1)',
            mb: 4,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              sx={{
                color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                fontWeight: 600,
                mb: 3,
              }}
            >
              Technologies Used
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {project.technologies.map((tech, index) => (
                <Chip
                  key={index}
                  label={tech}
                  sx={{
                    backgroundColor: project.color + '33',
                    color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    py: 2,
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Features */}
        <Card
          className="animate-in"
          sx={{
            backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.05)' : 'rgba(27, 38, 59, 0.03)',
            backdropFilter: 'blur(20px)',
            border: mode === 'dark' ? '1px solid rgba(224, 225, 221, 0.1)' : '1px solid rgba(27, 38, 59, 0.1)',
            mb: 4,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              sx={{
                color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                fontWeight: 600,
                mb: 3,
              }}
            >
              Key Features
            </Typography>
            <Grid container spacing={2}>
              {project.features.map((feature, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: project.color,
                        mt: 1,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        color: mode === 'dark' ? 'rgba(224, 225, 221, 0.9)' : 'rgba(27, 38, 59, 0.9)',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Challenges & Learnings */}
        <Grid container spacing={4} className="animate-in">
          {project.challenges && project.challenges.length > 0 && (
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.05)' : 'rgba(27, 38, 59, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: mode === 'dark' ? '1px solid rgba(224, 225, 221, 0.1)' : '1px solid rgba(27, 38, 59, 0.1)',
                  height: '100%',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                      fontWeight: 600,
                      mb: 3,
                    }}
                  >
                    Challenges
                  </Typography>
                  {project.challenges.map((challenge, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: '#FF6B6B',
                          mt: 1,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          color: mode === 'dark' ? 'rgba(224, 225, 221, 0.9)' : 'rgba(27, 38, 59, 0.9)',
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                        }}
                      >
                        {challenge}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          )}

          {project.learnings && project.learnings.length > 0 && (
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.05)' : 'rgba(27, 38, 59, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: mode === 'dark' ? '1px solid rgba(224, 225, 221, 0.1)' : '1px solid rgba(27, 38, 59, 0.1)',
                  height: '100%',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                      fontWeight: 600,
                      mb: 3,
                    }}
                  >
                    Key Learnings
                  </Typography>
                  {project.learnings.map((learning, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: '#4ECDC4',
                          mt: 1,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          color: mode === 'dark' ? 'rgba(224, 225, 221, 0.9)' : 'rgba(27, 38, 59, 0.9)',
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                        }}
                      >
                        {learning}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>

        {/* Image Placeholders */}
        {project.images && project.images.length > 0 && (
          <Box className="animate-in" sx={{ mt: 4 }}>
            <Typography
              variant="h5"
              sx={{
                color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                fontWeight: 600,
                mb: 3,
              }}
            >
              Project Screenshots
            </Typography>
            <Grid container spacing={3}>
              {project.images.map((image, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card
                    sx={{
                      backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.05)' : 'rgba(27, 38, 59, 0.03)',
                      border: mode === 'dark' ? '1px solid rgba(224, 225, 221, 0.1)' : '1px solid rgba(27, 38, 59, 0.1)',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        height: 250,
                        backgroundColor: project.color + '22',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      <Typography
                        sx={{
                          color: mode === 'dark' ? 'rgba(224, 225, 221, 0.5)' : 'rgba(27, 38, 59, 0.5)',
                          fontSize: '0.9rem',
                          textAlign: 'center',
                          px: 2,
                        }}
                      >
                        Coming Soon!
                        <br />
                        {image.alt}
                      </Typography>
                    </Box>
                    {image.caption && (
                      <CardContent sx={{ py: 2 }}>
                        <Typography
                          sx={{
                            color: mode === 'dark' ? 'rgba(224, 225, 221, 0.7)' : 'rgba(27, 38, 59, 0.7)',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                          }}
                        >
                          {image.caption}
                        </Typography>
                      </CardContent>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Action Buttons */}
        <Box
          className="animate-in"
          sx={{
            display: 'flex',
            gap: 2,
            mt: 6,
            flexWrap: 'wrap',
          }}
        >
          {project.githubUrl && (
            <Button
              variant="outlined"
              startIcon={<GitHub />}
              href={project.githubUrl}
              target="_blank"
              sx={{
                borderColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.3)' : 'rgba(27, 38, 59, 0.5)',
                color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                py: 1.5,
                px: 3,
                '&:hover': {
                  backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.1)' : 'rgba(27, 38, 59, 0.1)',
                  borderColor: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                },
              }}
            >
              View Source Code
            </Button>
          )}
          {project.liveUrl && (
            <Button
              variant="contained"
              startIcon={<Launch />}
              href={project.liveUrl}
              target="_blank"
              sx={{
                backgroundColor: project.color,
                py: 1.5,
                px: 3,
                '&:hover': {
                  backgroundColor: project.color + 'dd',
                },
              }}
            >
              View Live Demo
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectPage;

