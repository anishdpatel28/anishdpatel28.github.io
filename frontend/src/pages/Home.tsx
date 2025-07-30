import { Box, Typography, Container, Card, CardContent, Avatar, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Description, FileDownload, School, Work, Build, EmojiEvents, Email, LinkedIn, GitHub, Analytics, ArrowBack, ArrowForward, Brightness4 } from '@mui/icons-material';
import { useEffect, useRef, useState, useContext } from 'react';
import ScrollProgress from '@/components/ScrollProgress';
import ParallaxSection from '@/components/ParallaxSection';
import ProjectsCarousel from '@/components/ProjectsCarousel';
import TimelineNavbar from '@/components/TimelineNavbar';
import { sectionBackgrounds } from '@/themes/theme';
import { pageAnalyticsAPI } from '@/services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import easterEgg from '@/assets/images/icons/easter-egg.svg';
import { ThemeContext } from '../App';

const Home = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [hasClickedAnalytics, setHasClickedAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState<Record<string, unknown> | null>(null);
  const [showEgg, setShowEgg] = useState(false);
  const [internshipIdx, setInternshipIdx] = useState(2);
  const lastSectionRef = useRef<string>('home');
  const lastSectionStartRef = useRef<number>(Date.now());
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const analyticsBtnRef = useRef<HTMLButtonElement>(null);
  const { mode, toggleTheme } = useContext(ThemeContext);

  // track time spent in sections
  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;
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
      if (newActiveSection !== lastSectionRef.current) {
        const now = Date.now();
        const timeSpent = Math.floor((now - lastSectionStartRef.current) / 1000);
        if (timeSpent > 0) {
          pageAnalyticsAPI.updateSectionTime(lastSectionRef.current, timeSpent).catch(console.error);
        }
        lastSectionRef.current = newActiveSection;
        lastSectionStartRef.current = now;
      }
    };
    window.addEventListener('scroll', handleScroll);
    lastSectionRef.current = 'home';
    lastSectionStartRef.current = Date.now();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      const now = Date.now();
      const timeSpent = Math.floor((now - lastSectionStartRef.current) / 1000);
      if (timeSpent > 0) {
        pageAnalyticsAPI.updateSectionTime(lastSectionRef.current, timeSpent).catch(console.error);
      }
    };
  }, []);

  // increment page views on first load
  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;
    const sessionKey = 'portfolio_visited';
    const hasVisited = sessionStorage.getItem(sessionKey);
    if (!hasVisited) {
      pageAnalyticsAPI.incrementPageViews().then(() => {
        pageAnalyticsAPI.getAnalytics().then(setAnalytics);
      }).catch(console.error);
      sessionStorage.setItem(sessionKey, 'true');
    }
  }, []);

  // fetch analytics every time the dialog is opened
  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;
    if (showAnalytics) {
      pageAnalyticsAPI.getAnalytics().then(setAnalytics);
    }
  }, [showAnalytics]);

  // always remove scroll lock when dialog closes
  const handleAnalyticsClose = () => {
    setShowAnalytics(false);
    document.body.classList.remove('no-scroll');
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;
    if (showAnalytics) {
      document.body.classList.add('no-scroll');
    }
  }, [showAnalytics]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;
    (async () => {
      const gsapMod = await import('gsap');
      const gsap = gsapMod.default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      const heroTl = gsap.timeline({ delay: 0.5 });
      const heroTitle = heroRef.current?.querySelector('.hero-title');
      const heroSubtitle = heroRef.current?.querySelector('.hero-subtitle');
      const heroDescription = heroRef.current?.querySelector('.hero-description');
      const heroImage = heroRef.current?.querySelector('.hero-image');

      if (heroTitle) {
        heroTl.fromTo(heroTitle,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }
      if (heroSubtitle) {
        heroTl.fromTo(heroSubtitle,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", onStart: () => setShowNavbar(true) }, "-=0.6"
        );
      }
      if (heroDescription) {
        heroTl.fromTo(heroDescription,
          { opacity: 0, y: -30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            onStart: () => setShowNavbar(true)
          },
          "-=0.3"
        );
      }
      if (heroImage) {
        heroTl.fromTo(heroImage,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out", onComplete: () => setShowEgg(true) }, "-=0.5"
        );
      }

      // about section animations
      const aboutSections = aboutRef.current?.querySelectorAll('.about-section');
      if (aboutSections && aboutSections.length > 0) {
        gsap.fromTo(aboutSections,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 80%",
              once: true
            }
          }
        );
      }

      // skills section animations
      const skillsTitle = skillsRef.current?.querySelector('.skills-title');
      const skillCategories = skillsRef.current?.querySelectorAll('.skill-category');

      if (skillsTitle) {
        gsap.fromTo(skillsTitle,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%",
              once: true
            }
          }
        );
      }

      if (skillCategories && skillCategories.length > 0) {
        gsap.fromTo(skillCategories,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.3,
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 70%",
              once: true
            }
          }
        );
      }

      // projects section animations
      const projectsCarousel = projectsRef.current?.querySelector('.projects-carousel');
      const projectsInfo = projectsRef.current?.querySelector('.projects-info');

      if (projectsCarousel) {
        gsap.fromTo(projectsCarousel,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 80%",
              once: true
            }
          }
        );
      }

      if (projectsInfo) {
        gsap.fromTo(projectsInfo,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 70%",
              once: true
            }
          }
        );
      }

      // resume section animations
      const resumeTitle = resumeRef.current?.querySelector('.resume-title');
      const resumeButtons = resumeRef.current?.querySelectorAll('.resume-button');

      if (resumeTitle) {
        gsap.fromTo(resumeTitle,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: resumeRef.current,
              start: "top 80%",
              once: true
            }
          }
        );
      }

      if (resumeButtons && resumeButtons.length > 0) {
        gsap.fromTo(resumeButtons,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: resumeRef.current,
              start: "top 70%",
              once: true
            }
          }
        );
      }

      // contact section animations
      const contactTitle = contactRef.current?.querySelector('.contact-title');
      const contactItems = contactRef.current?.querySelectorAll('.contact-item');

      if (contactTitle) {
        gsap.fromTo(contactTitle,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 80%",
              once: true
            }
          }
        );
      }

      if (contactItems && contactItems.length > 0) {
        gsap.fromTo(contactItems,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 70%",
              once: true
            }
          }
        );
      }

      return () => {
        if (process.env.NODE_ENV === 'test') return;
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    })();
  }, []);

  const handleAnalyticsClick = () => {
    if (!hasClickedAnalytics) {
      setHasClickedAnalytics(true);
      pageAnalyticsAPI.captureEggClick().catch(console.error);
    }
    setShowAnalytics(true);
  };

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    let str = '';
    if (days > 0) str += `${days}d `;
    if (hours > 0 || days > 0) str += `${hours}h `;
    if (minutes > 0 || hours > 0 || days > 0) str += `${minutes}m `;
    str += `${remainingSeconds}s`;
    return str.trim();
  };

  // custom Y-axis tick formatter for graph
  const formatYAxisTick = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let str = '';
    if (days > 0) str += `${days}d `;
    if (hours > 0 || days > 0) str += `${hours}h `;
    if (minutes > 0 || hours > 0 || days > 0) str += `${minutes}m `;
    str += `${remainingSeconds}s`;
    return str.trim();
  };

  // custom tooltip content to capitalize "time:" label
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number; }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{
          background: mode === 'dark' ? '#222e3a' : '#ffffff',
          color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
          border: mode === 'dark' ? 'none' : '1px solid #e0e0e0',
          padding: '10px',
          borderRadius: '4px'
        }}>
          <Typography variant="body2" sx={{
            fontWeight: 'bold',
            color: mode === 'dark' ? '#e0e1dd' : '#1b263b'
          }}>
            {label}
          </Typography>
          <Typography variant="body2" sx={{
            color: mode === 'dark' ? '#e0e1dd' : '#1b263b'
          }}>
            Time: {formatTime(payload[0].value)}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  useEffect(() => { // remove analytics button highlight on close
    if (process.env.NODE_ENV === 'test') return;
    if (!showAnalytics && analyticsBtnRef.current) {
      analyticsBtnRef.current.blur();
    }
  }, [showAnalytics]);

  return (
    <Box>
      <ScrollProgress />

      {/* Analytics & Theme Toggle Card */}
      <Box sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1000,
        opacity: showEgg ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      }}>
        <Card sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          bgcolor: mode === 'dark' ? '#1b263b' : '#ffffff',
          borderRadius: 3,
          boxShadow: 3,
          px: { xs: 0.5, md: 1.5 },
          py: { xs: 0.5, md: 0.5 },
          minWidth: 0,
        }}>
          <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: mode === 'dark' ? 'rgba(224, 225, 221, 0.7)' : 'rgba(27, 38, 59, 0.7)',
                mr: { xs: 0, md: 0.5 },
                mb: { xs: 0.5, md: 0 },
                '&:hover': {
                  backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.1)' : 'rgba(27, 38, 59, 0.08)',
                },
              }}
              size="large"
            >
              <Brightness4 />
            </IconButton>
          </Tooltip>
          <Tooltip title="Analytics">
            <IconButton
              ref={analyticsBtnRef}
              type="button"
              onClick={e => { e.stopPropagation(); handleAnalyticsClick(); }}
              sx={{
                color: mode === 'dark' ? 'rgba(224, 225, 221, 0.7)' : 'rgba(27, 38, 59, 0.7)',
                backgroundColor: 'transparent',
                backdropFilter: 'none',
                ml: { xs: 0, md: 0.5 },
                transition: 'background-color 0.2s, box-shadow 0.2s',
                boxShadow: 0,
                '&:hover': {
                  backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.1)' : 'rgba(27, 38, 59, 0.08)',
                  boxShadow: 0,
                },
                ...(hasClickedAnalytics ? {} : {
                  animation: showEgg ? 'eggWobble 3s ease-in-out infinite' : 'none',
                  '@keyframes eggWobble': {
                    '0%, 76%, 100%': { transform: 'rotate(0deg)' },
                    '80%': { transform: 'rotate(-20deg)' },
                    '84%': { transform: 'rotate(20deg)' },
                    '88%': { transform: 'rotate(-15deg)' },
                    '92%': { transform: 'rotate(15deg)' },
                    '96%': { transform: 'rotate(-10deg)' }
                  }
                })
              }}
              size="large"
            >
              {hasClickedAnalytics ? <Analytics /> : (
                <img
                  src={easterEgg}
                  alt="Easter Egg"
                  style={{ width: 24, height: 24, display: 'block' }}
                />
              )}
            </IconButton>
          </Tooltip>
        </Card>
      </Box>

      {/* Analytics Dialog */}
      <Dialog
        open={showAnalytics}
        onClose={handleAnalyticsClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
        PaperProps={{ sx: { overflow: 'visible' } }}
      >
        <DialogTitle sx={{
          color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
          bgcolor: mode === 'dark' ? '#1b263b' : '#ffffff'
        }}>
          Page Analytics
        </DialogTitle>
        <DialogContent sx={{
          bgcolor: mode === 'dark' ? '#1b263b' : '#ffffff',
          color: mode === 'dark' ? '#e0e1dd' : '#1b263b'
        }}>
          <Box sx={{ p: 2, pb: 1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Page Views: {typeof analytics?.page_views === 'number' ? analytics.page_views : 0}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Time spent per section:
            </Typography>
            {/* Analytics Bar Graph */}
            <Box sx={{ width: '100%', height: 240, mb: 2, mt: 3 }}>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={[{
                    section: 'Home', time: typeof analytics?.time_spent_home === 'number' ? analytics.time_spent_home : 0
                  }, {
                    section: 'About', time: typeof analytics?.time_spent_about === 'number' ? analytics.time_spent_about : 0
                  }, {
                    section: 'Skills', time: typeof analytics?.time_spent_skills === 'number' ? analytics.time_spent_skills : 0
                  }, {
                    section: 'Projects', time: typeof analytics?.time_spent_projects === 'number' ? analytics.time_spent_projects : 0
                  }, {
                    section: 'Resume', time: typeof analytics?.time_spent_resume === 'number' ? analytics.time_spent_resume : 0
                  }, {
                    section: 'Contact', time: typeof analytics?.time_spent_contact === 'number' ? analytics.time_spent_contact : 0
                  }]}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={mode === 'dark' ? '#2c3e50' : '#e0e0e0'} />
                  <XAxis dataKey="section" stroke={mode === 'dark' ? '#e0e1dd' : '#1b263b'} tick={{ fill: mode === 'dark' ? '#e0e1dd' : '#1b263b', fontSize: 14 }} />
                  <YAxis
                    stroke={mode === 'dark' ? '#e0e1dd' : '#1b263b'}
                    tick={{ fill: mode === 'dark' ? '#e0e1dd' : '#1b263b', fontSize: 12 }}
                    tickFormatter={formatYAxisTick}
                    width={100}
                    axisLine={false}
                    tickLine={false}
                  />
                  <RechartsTooltip
                    content={<CustomTooltip />}
                  />
                  <Bar dataKey="time" fill="#4fc3f7" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Most viewed section: {
                typeof analytics?.most_viewed_section === 'string' && analytics.most_viewed_section.length > 0
                  ? analytics.most_viewed_section.charAt(0).toUpperCase() + analytics.most_viewed_section.slice(1)
                  : 'Home'
              }
            </Typography>
            <Typography variant="body1">
              Average session duration: {formatTime(typeof analytics?.average_session_duration === 'number' ? analytics.average_session_duration : 0)}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: mode === 'dark' ? '#1b263b' : '#ffffff' }}>
          <Button onClick={() => setShowAnalytics(false)} sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Home Section - Parallax */}
      <ParallaxSection
        id="home"
        speed={0.3}
        backgroundColor={sectionBackgrounds.home}
      >
        <Container maxWidth="lg">
          <Box ref={heroRef} sx={{
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
                <Typography
                  className="hero-title"
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 300,
                    mb: 1,
                    fontSize: { xs: '2rem', md: '3rem' },
                    opacity: 0
                  }}
                >
                  Hey, I&apos;m <Box component="span" sx={{ fontWeight: 600, color: mode === 'dark' ? '#e0e1dd' : '#1b263b' }}>Anish</Box>
                </Typography>
                <Typography
                  className="hero-subtitle"
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 500,
                    mb: 3,
                    color: 'text.secondary',
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    opacity: 0
                  }}
                >
                  I&apos;m a Fullstack Web Developer
                </Typography>
                <Typography
                  className="hero-description"
                  variant="h6"
                  sx={{
                    fontWeight: 400,
                    opacity: 0,
                    lineHeight: 1.6,
                    maxWidth: { xs: '100%', md: '400px' }
                  }}
                >
                  I love creating innovative digital experiences and bring ideas to life.
                </Typography>
                {showNavbar && <TimelineNavbar />}
              </Box>
            </Box>

            {/* Right side - Image placeholder */}
            <Box
              className="hero-image"
              style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: 0 }}
            >
              <Box sx={{
                width: { xs: 280, md: 400 },
                height: { xs: 250, md: 350 },
                backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.1)' : 'rgba(27, 38, 59, 0.1)',
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
            </Box>
          </Box>
        </Container>
      </ParallaxSection>

      {/* About */}
      <Box
        id="about"
        ref={aboutRef}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: mode === 'dark' ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)' : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
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
              Computer Science student at RPI with a passion for building digital products. Interned at Analog Devices and Intuit Credit Karma, focusing on cloud and full-stack development.
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
                  <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(224, 225, 221, 0.7)' : 'rgba(27, 38, 59, 0.7)' }}>
                    Dean&apos;s List, Honors Program
                  </Typography>
                </CardContent>
              </Card>

              {/* Work Experience (Internships with Arrows) */}
              <Card className="about-section" sx={{
                backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.05)' : 'rgba(27, 38, 59, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(224, 225, 221, 0.1)',
              }}>
                <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                  {(() => {
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
                    );
                  })()}
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
        </Container>
      </Box>

      {/* Skills Section */}
      <Box
        id="skills"
        ref={skillsRef}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: mode === 'dark' ? 'linear-gradient(135deg, #2c1b3a 0%, #0d1b2a 100%)' : 'linear-gradient(135deg, #f1f3f4 0%, #e8eaed 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 1, md: 3 } }}>
            <Typography
              className="skills-title"
              variant="h3"
              sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', mb: 4, fontWeight: 600, textAlign: 'center' }}
            >
              Skills & Technologies
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {/* Programming Languages */}
              <Box className="skill-category">
                <Typography variant="h6" sx={{
                  color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                  mb: 3,
                  fontWeight: 600,
                  textAlign: 'left'
                }}>
                  Programming Languages
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {[
                    {
                      name: 'Python', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
                          alt="Python"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'JavaScript', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
                          alt="JavaScript"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'Java', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
                          alt="Java"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'C', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"
                          alt="C"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'C++', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
                          alt="C++"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'HTML5', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
                          alt="HTML5"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'CSS', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
                          alt="CSS"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    }
                  ].map((skill) => (
                    <Tooltip key={skill.name} title={skill.name} arrow>
                      <Box sx={{
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.08)' : 'rgba(27, 38, 59, 0.15)',
                        border: '2px solid rgba(224, 225, 221, 0.3)',
                        fontSize: 40,
                        color: '#e0e1dd',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.15)',
                          backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.18)' : 'rgba(27, 38, 59, 0.25)',
                        }
                      }}>
                        {skill.icon ? skill.icon : (
                          <Box sx={{ width: 40, height: 40, background: mode === 'dark' ? 'rgba(224,225,221,0.15)' : 'rgba(27,38,59,0.2)', borderRadius: 1 }} />
                        )}
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
              </Box>

              {/* Frameworks & Libraries */}
              <Box className="skill-category">
                <Typography variant="h6" sx={{
                  color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                  mb: 3,
                  fontWeight: 600,
                  textAlign: 'left'
                }}>
                  Frameworks & Libraries
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {[
                    {
                      name: 'React', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
                          alt="React"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'Django', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg"
                          alt="Django"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'NodeJS', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
                          alt="NodeJS"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'OpenAPI', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openapi/openapi-original.svg"
                          alt="OpenAPI"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    }
                  ].map((skill) => (
                    <Tooltip key={skill.name} title={skill.name} arrow>
                      <Box sx={{
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.08)' : 'rgba(27, 38, 59, 0.15)',
                        border: '2px solid rgba(224, 225, 221, 0.3)',
                        fontSize: 40,
                        color: '#e0e1dd',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.15)',
                          backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.18)' : 'rgba(27, 38, 59, 0.25)',
                        }
                      }}>
                        {skill.icon ? skill.icon : (
                          <Box sx={{ width: 40, height: 40, background: mode === 'dark' ? 'rgba(224,225,221,0.15)' : 'rgba(27,38,59,0.2)', borderRadius: 1 }} />
                        )}
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
              </Box>

              {/* Tools & Technologies */}
              <Box className="skill-category">
                <Typography variant="h6" sx={{
                  color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                  mb: 3,
                  fontWeight: 600,
                  textAlign: 'left'
                }}>
                  Tools & Technologies
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {[
                    {
                      name: 'PostgreSQL', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
                          alt="PostgreSQL"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'SQL', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"
                          alt="SQL"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'Docker', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
                          alt="Docker"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'Git', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
                          alt="Git"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'GitHub', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                          alt="GitHub"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'CircleCI', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/circleci/circleci-plain.svg"
                          alt="CircleCI"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'VS Code', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"
                          alt="VS Code"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'Jira', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg"
                          alt="Jira"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'Figma', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"
                          alt="Figma"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    },
                    {
                      name: 'Postman', icon: (
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg"
                          alt="Postman"
                          style={{ width: 40, height: 40, display: 'block' }}
                        />
                      )
                    }
                  ].map((skill) => (
                    <Tooltip key={skill.name} title={skill.name} arrow>
                      <Box sx={{
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.08)' : 'rgba(27, 38, 59, 0.15)',
                        border: '2px solid rgba(224, 225, 221, 0.3)',
                        fontSize: 40,
                        color: '#e0e1dd',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.15)',
                          backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.18)' : 'rgba(27, 38, 59, 0.25)',
                        }
                      }}>
                        {skill.icon ? skill.icon : (
                          <Box sx={{ width: 40, height: 40, background: mode === 'dark' ? 'rgba(224,225,221,0.15)' : 'rgba(27,38,59,0.2)', borderRadius: 1 }} />
                        )}
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Projects */}
      <Box
        id="projects"
        ref={projectsRef}
        sx={{
          background: mode === 'dark' ? 'transparent' : '#f5f5f5',
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          zIndex: 0,
        }}
      >
        <ProjectsCarousel />
      </Box>

      {/* Resume Section */}
      <Box
        id="resume"
        ref={resumeRef}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: mode === 'dark' ? 'linear-gradient(135deg, #1a3a2a 0%, #1a2a3a 100%)' : 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 1, md: 3 }, textAlign: 'center' }}>
            <Typography
              className="resume-title"
              variant="h3"
              sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', mb: 4, fontWeight: 600 }}
            >
              Resume & Experience
            </Typography>
            <Typography variant="h6" sx={{ color: mode === 'dark' ? 'rgba(224, 225, 221, 0.9)' : 'rgba(27, 38, 59, 0.9)', mb: 6, maxWidth: 600, mx: 'auto' }}>
              Download my resume to learn more about my experience, skills, and projects.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                className="resume-button"
                variant="contained"
                startIcon={<Description />}
                href="https://drive.google.com/file/d/19BGb6xdeRADI9lLYGqFvN8jCOlfzvm3h/view"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: mode === 'dark' ? 'primary.main' : '#1b263b',
                  color: mode === 'dark' ? '#e0e1dd' : '#fff',
                  fontSize: { xs: '0.9rem', lg: '1rem' },
                  py: { xs: 1.5, lg: 2 },
                  px: { xs: 3, lg: 4 },
                  '&:hover': {
                    backgroundColor: mode === 'dark' ? 'primary.dark' : '#0d1b2a'
                  }
                }}
              >
                View Resume
              </Button>
              <Button
                className="resume-button"
                variant="outlined"
                startIcon={<FileDownload />}
                href="https://drive.google.com/uc?export=download&id=19BGb6xdeRADI9lLYGqFvN8jCOlfzvm3h"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.3)' : 'rgba(27, 38, 59, 0.5)',
                  color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                  fontSize: { xs: '0.9rem', lg: '1rem' },
                  py: { xs: 1.5, lg: 2 },
                  px: { xs: 3, lg: 4 },
                  '&:hover': {
                    backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.1)' : 'rgba(27, 38, 59, 0.1)',
                    borderColor: mode === 'dark' ? '#e0e1dd' : '#1b263b'
                  }
                }}
              >
                Download PDF
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        id="contact"
        ref={contactRef}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: mode === 'dark' ? sectionBackgrounds.contact : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 1, md: 3 }, textAlign: 'center' }}>
            <Typography
              className="contact-title"
              variant="h3"
              sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', mb: 4, fontWeight: 600 }}
            >
              Get In Touch
            </Typography>
            <Typography variant="h6" sx={{ color: mode === 'dark' ? 'rgba(224, 225, 221, 0.9)' : 'rgba(27, 38, 59, 0.9)', mb: 6, maxWidth: 600, mx: 'auto' }}>
              I&apos;m always interested in new opportunities and collaborations. Feel free to reach out!
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center', mt: 4 }}>
              <Tooltip title="Email" arrow>
                <IconButton
                  onClick={() => window.open('mailto:anish.patel@example.com', '_blank')}
                  sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', p: 2, fontSize: 40 }}
                  aria-label="Email"
                >
                  <Email sx={{ fontSize: 40 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn" arrow>
                <IconButton
                  onClick={() => window.open('https://linkedin.com/in/anishpatel', '_blank')}
                  sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', p: 2, fontSize: 40 }}
                  aria-label="LinkedIn"
                >
                  <LinkedIn sx={{ fontSize: 40 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="GitHub" arrow>
                <IconButton
                  onClick={() => window.open('https://github.com/anishdpatel28', '_blank')}
                  sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', p: 2, fontSize: 40 }}
                  aria-label="GitHub"
                >
                  <GitHub sx={{ fontSize: 40 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 