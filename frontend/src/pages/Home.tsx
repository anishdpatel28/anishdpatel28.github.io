import { Box, Typography, Container, Card, CardContent, Avatar, Chip, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Description, FileDownload, School, Work, Build, EmojiEvents, Email, LinkedIn, GitHub, Visibility, Analytics } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollProgress from '@/components/ScrollProgress';
import ParallaxSection from '@/components/ParallaxSection';
import ProjectsParallax from '@/components/ProjectsParallax';
import TimelineNavbar from '@/components/TimelineNavbar';
import NavbarPageViews from '@/components/NavbarPageViews';
import { sectionBackgrounds } from '@/themes/theme';
import { pageAnalyticsAPI } from '@/services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [hasClickedAnalytics, setHasClickedAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);
  const [sectionStartTimes, setSectionStartTimes] = useState<Record<string, number>>({});
  const [showEgg, setShowEgg] = useState(false);
  const lastSectionRef = useRef<string>('home');
  const lastSectionStartRef = useRef<number>(Date.now());
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  // Ref for the analytics button
  const analyticsBtnRef = useRef<HTMLButtonElement>(null);

  // Track time spent in sections
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
      if (newActiveSection !== lastSectionRef.current) {
        // Section changed, record time for previous section
        const now = Date.now();
        const timeSpent = Math.floor((now - lastSectionStartRef.current) / 1000);
        if (timeSpent > 0) {
          pageAnalyticsAPI.updateSectionTime(lastSectionRef.current, timeSpent).catch(console.error);
        }
        lastSectionRef.current = newActiveSection;
        lastSectionStartRef.current = now;
        setActiveSection(newActiveSection);
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Initialize first section timing
    lastSectionRef.current = 'home';
    lastSectionStartRef.current = Date.now();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Record final section time when component unmounts
      const now = Date.now();
      const timeSpent = Math.floor((now - lastSectionStartRef.current) / 1000);
      if (timeSpent > 0) {
        pageAnalyticsAPI.updateSectionTime(lastSectionRef.current, timeSpent).catch(console.error);
      }
    };
  }, []);

  // Increment page views on first load
  useEffect(() => {
    const sessionKey = 'portfolio_visited';
    const hasVisited = sessionStorage.getItem(sessionKey);
    if (!hasVisited) {
      pageAnalyticsAPI.incrementPageViews().then(() => {
        // Fetch analytics again to update UI
        pageAnalyticsAPI.getAnalytics().then(setAnalytics);
      }).catch(console.error);
      sessionStorage.setItem(sessionKey, 'true');
    }
  }, []);

  // Fetch analytics every time the dialog is opened
  useEffect(() => {
    if (showAnalytics) {
      pageAnalyticsAPI.getAnalytics().then(setAnalytics);
    }
  }, [showAnalytics]);

  useEffect(() => {
    // Hero animations
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
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.3"
      );
    }
    if (heroDescription) {
      heroTl.fromTo(heroDescription,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.3"
      );
    }
    if (heroImage) {
      heroTl.fromTo(heroImage,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5"
      );
    }

    // Show egg after hero animations complete
    heroTl.to({}, { duration: 0.5, onComplete: () => setShowEgg(true) });

    // About section animations with staggered reveals
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

    // Skills section animations
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

    // Resume section animations
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

    // Contact section animations
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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleAnalyticsClick = () => {
    if (!hasClickedAnalytics) {
      setHasClickedAnalytics(true);
      // Track egg click in PostHog
      pageAnalyticsAPI.captureEggClick().catch(console.error);
    }
    setShowAnalytics(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Custom Y-axis tick formatter for graph
  const formatYAxisTick = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m\u00A0${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  // Prevent background scroll when analytics dialog is open
  useEffect(() => {
    if (showAnalytics) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100vw';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [showAnalytics]);

  // Remove focus highlight from analytics button when dialog closes
  useEffect(() => {
    if (!showAnalytics && analyticsBtnRef.current) {
      analyticsBtnRef.current.blur();
    }
  }, [showAnalytics]);

  return (
    <Box>
      <ScrollProgress />
      <TimelineNavbar />
      {/* Removed NavbarPageViews (page views display) */}

      {/* Easter Egg Analytics Button */}
      <Box sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1300,
        opacity: showEgg ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      }}>
        <IconButton
          ref={analyticsBtnRef}
          onClick={handleAnalyticsClick}
          sx={{
            color: '#e0e1dd',
            backgroundColor: hasClickedAnalytics ? 'rgba(27, 38, 59, 0.8)' : 'transparent',
            backdropFilter: hasClickedAnalytics ? 'blur(10px)' : 'none',
            '&:hover': {
              backgroundColor: hasClickedAnalytics ? 'rgba(27, 38, 59, 0.9)' : 'rgba(27, 38, 59, 0.1)',
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
        >
          {hasClickedAnalytics ? <Analytics /> : '🥚'}
        </IconButton>
      </Box>

      {/* Analytics Dialog */}
      <Dialog
        open={showAnalytics}
        onClose={() => setShowAnalytics(false)}
        maxWidth="md"
        fullWidth
        scroll="body"
        PaperProps={{ sx: { overflow: 'visible' } }}
        disableScrollLock={true}
      >
        <DialogTitle sx={{ color: '#e0e1dd', bgcolor: '#1b263b' }}>
          Page Analytics
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#1b263b', color: '#e0e1dd' }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Page Views: {analytics?.page_views || 0}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Time spent per section:
            </Typography>
            {/* Analytics Bar Graph */}
            {/* @ts-ignore */}
            <Box sx={{ width: '100%', height: 240, mb: 2, mt: 3 }}>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={[{
                    section: 'Home', time: analytics?.time_spent_home || 0
                  }, {
                    section: 'About', time: analytics?.time_spent_about || 0
                  }, {
                    section: 'Skills', time: analytics?.time_spent_skills || 0
                  }, {
                    section: 'Projects', time: analytics?.time_spent_projects || 0
                  }, {
                    section: 'Resume', time: analytics?.time_spent_resume || 0
                  }, {
                    section: 'Contact', time: analytics?.time_spent_contact || 0
                  }]}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2c3e50" />
                  {/* @ts-ignore */}
                  <XAxis dataKey="section" stroke="#e0e1dd" tick={{ fill: '#e0e1dd', fontSize: 14 }} />
                  {/* @ts-ignore */}
                  <YAxis stroke="#e0e1dd" tick={{ fill: '#e0e1dd', fontSize: 12 }} tickFormatter={formatYAxisTick} />
                  <RechartsTooltip formatter={(v: number) => formatTime(v)} contentStyle={{ background: '#222e3a', color: '#e0e1dd', border: 'none' }} />
                  {/* @ts-ignore */}
                  <Bar dataKey="time" fill="#4fc3f7" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Most viewed section: {analytics?.most_viewed_section ? analytics.most_viewed_section.charAt(0).toUpperCase() + analytics.most_viewed_section.slice(1) : 'Home'}
            </Typography>
            <Typography variant="body1">
              Average session duration: {formatTime(analytics?.average_session_duration || 0)}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#1b263b' }}>
          <Button onClick={() => setShowAnalytics(false)} sx={{ color: '#e0e1dd' }}>
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
                    fontSize: { xs: '2rem', md: '3rem' }
                  }}
                >
                  Hey, I&apos;m <Box component="span" sx={{ fontWeight: 600, color: '#e0e1dd' }}>Anish</Box>
                </Typography>
                <Typography
                  className="hero-subtitle"
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
                <Typography
                  className="hero-description"
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
            </Box>

            {/* Right side - Image placeholder */}
            <Box
              className="hero-image"
              style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
            >
              <Box sx={{
                width: { xs: 280, md: 400 },
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
            </Box>
          </Box>
        </Container>
      </ParallaxSection>

      {/* About Section - Structured with Components */}
      <Box
        id="about"
        ref={aboutRef}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 1, md: 3 } }}>
            <Typography
              className="about-section"
              variant="h3"
              sx={{ color: '#e0e1dd', mb: 4, fontWeight: 600, textAlign: 'center' }}
            >
              About Me
            </Typography>

            <Typography
              className="about-section"
              variant="h6"
              sx={{ color: 'rgba(224, 225, 221, 0.9)', mb: 6, maxWidth: 700, mx: 'auto', textAlign: 'center' }}
            >
              Computer Science student at RPI with a passion for building digital products. Interned at Analog Devices and Intuit Credit Karma, focusing on cloud and full-stack development.
            </Typography>

            <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
              {/* Education */}
              <Card className="about-section" sx={{
                backgroundColor: 'rgba(224, 225, 221, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(224, 225, 221, 0.1)',
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <School sx={{ mr: 2, color: '#e0e1dd', fontSize: 28 }} />
                    <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 600 }}>
                      Education
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" sx={{ color: '#e0e1dd', fontWeight: 500, mb: 1 }}>
                    RPI, B.S. Computer Science (2022–2026)
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.8)' }}>
                    Minors: Cognitive Science of AI, Info Tech & Web Science
                  </Typography>
                </CardContent>
              </Card>

              {/* Work Experience */}
              <Card className="about-section" sx={{
                backgroundColor: 'rgba(224, 225, 221, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(224, 225, 221, 0.1)',
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Work sx={{ mr: 2, color: '#e0e1dd', fontSize: 28 }} />
                    <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 600 }}>
                      Work Experience
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" sx={{ color: '#e0e1dd', fontWeight: 500, mb: 1 }}>
                    Analog Devices, SWE Intern (2024)
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.8)', mb: 2 }}>
                    Modernized software packaging app.
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#e0e1dd', fontWeight: 500, mb: 1 }}>
                    Intuit Credit Karma, SWE Intern (2023)
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.8)' }}>
                    Built SecOps portal for security alerts.
                  </Typography>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="about-section" sx={{
                backgroundColor: 'rgba(224, 225, 221, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(224, 225, 221, 0.1)',
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Build sx={{ mr: 2, color: '#e0e1dd', fontSize: 28 }} />
                    <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 600 }}>
                      Core Skills
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.8)' }}>
                    Full-stack development, cloud computing, AI/ML, real-time systems, DevOps practices
                  </Typography>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="about-section" sx={{
                backgroundColor: 'rgba(224, 225, 221, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(224, 225, 221, 0.1)',
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmojiEvents sx={{ mr: 2, color: '#e0e1dd', fontSize: 28 }} />
                    <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 600 }}>
                      Certifications
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.8)' }}>
                    AWS Solutions Architect, Google Cloud Professional, Oracle Certified Foundations Associate
                  </Typography>
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
          background: sectionBackgrounds.skills,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 1, md: 3 } }}>
            <Typography
              className="skills-title"
              variant="h3"
              sx={{ color: '#e0e1dd', mb: 6, fontWeight: 600, textAlign: 'center' }}
            >
              Skills & Technologies
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {/* Programming Languages */}
              <Box className="skill-category">
                <Typography variant="h5" sx={{ color: '#e0e1dd', mb: 3, fontWeight: 600 }}>
                  Programming Languages
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {[
                    { name: 'Python' },
                    { name: 'JavaScript' },
                    { name: 'Java' },
                    { name: 'C' },
                    { name: 'C++' },
                    { name: 'CSS' },
                    { name: 'HTML5' }
                  ].map((skill) => (
                    <Tooltip key={skill.name} title={skill.name} arrow>
                      <Box sx={{
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        backgroundColor: 'rgba(224, 225, 221, 0.08)',
                        border: '2px solid rgba(224, 225, 221, 0.3)',
                        fontSize: 40,
                        color: '#e0e1dd',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.15)',
                          backgroundColor: 'rgba(224, 225, 221, 0.18)',
                        }
                      }}>
                        {/* Empty image placeholder */}
                        <Box sx={{ width: 40, height: 40, background: 'rgba(224,225,221,0.15)', borderRadius: 1 }} />
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
              </Box>

              {/* Frameworks & Libraries */}
              <Box className="skill-category">
                <Typography variant="h5" sx={{ color: '#e0e1dd', mb: 3, fontWeight: 600 }}>
                  Frameworks & Libraries
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {[
                    { name: 'React' },
                    { name: 'Django' },
                    { name: 'NodeJS' },
                    { name: 'OpenAPI' }
                  ].map((skill) => (
                    <Tooltip key={skill.name} title={skill.name} arrow>
                      <Box sx={{
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        backgroundColor: 'rgba(224, 225, 221, 0.08)',
                        border: '2px solid rgba(224, 225, 221, 0.3)',
                        fontSize: 40,
                        color: '#e0e1dd',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.15)',
                          backgroundColor: 'rgba(224, 225, 221, 0.18)',
                        }
                      }}>
                        {/* Empty image placeholder */}
                        <Box sx={{ width: 40, height: 40, background: 'rgba(224,225,221,0.15)', borderRadius: 1 }} />
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
              </Box>

              {/* Tools & Technologies */}
              <Box className="skill-category">
                <Typography variant="h5" sx={{ color: '#e0e1dd', mb: 3, fontWeight: 600 }}>
                  Tools & Technologies
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {[
                    { name: 'PostgreSQL' },
                    { name: 'SQL' },
                    { name: 'pgAdmin' },
                    { name: 'Docker' },
                    { name: 'GitHub' },
                    { name: 'CircleCI' },
                    { name: 'VS Code' },
                    { name: 'Jira' },
                    { name: 'Figma' },
                    { name: 'Postman' },
                    { name: 'Backstage' }
                  ].map((skill) => (
                    <Tooltip key={skill.name} title={skill.name} arrow>
                      <Box sx={{
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        backgroundColor: 'rgba(224, 225, 221, 0.08)',
                        border: '2px solid rgba(224, 225, 221, 0.3)',
                        fontSize: 40,
                        color: '#e0e1dd',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.15)',
                          backgroundColor: 'rgba(224, 225, 221, 0.18)',
                        }
                      }}>
                        {/* Empty image placeholder */}
                        <Box sx={{ width: 40, height: 40, background: 'rgba(224,225,221,0.15)', borderRadius: 1 }} />
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Projects Section */}
      <ProjectsParallax />

      {/* Resume Section */}
      <Box
        id="resume"
        ref={resumeRef}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: sectionBackgrounds.resume,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 1, md: 3 }, textAlign: 'center' }}>
            <Typography
              className="resume-title"
              variant="h3"
              sx={{ color: '#e0e1dd', mb: 4, fontWeight: 600 }}
            >
              Resume
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(224, 225, 221, 0.9)', mb: 6, maxWidth: 600, mx: 'auto' }}>
              Download my resume to learn more about my experience, skills, and projects.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                className="resume-button"
                variant="contained"
                startIcon={<Description />}
                href="https://drive.google.com/file/d/19BGb6xdeRADI9lLYGqFvN8jCOlfzvm3h/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: 'primary.main',
                  fontSize: { xs: '0.9rem', lg: '1rem' },
                  py: { xs: 1.5, lg: 2 },
                  px: { xs: 3, lg: 4 },
                  '&:hover': {
                    backgroundColor: 'primary.dark'
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
                  borderColor: 'rgba(224, 225, 221, 0.3)',
                  color: '#e0e1dd',
                  fontSize: { xs: '0.9rem', lg: '1rem' },
                  py: { xs: 1.5, lg: 2 },
                  px: { xs: 3, lg: 4 },
                  '&:hover': {
                    backgroundColor: 'rgba(224, 225, 221, 0.1)',
                    borderColor: '#e0e1dd'
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
          background: sectionBackgrounds.contact,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 1, md: 3 }, textAlign: 'center' }}>
            <Typography
              className="contact-title"
              variant="h3"
              sx={{ color: '#e0e1dd', mb: 4, fontWeight: 600 }}
            >
              Get In Touch
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(224, 225, 221, 0.9)', mb: 6, maxWidth: 600, mx: 'auto' }}>
              I&apos;m always interested in new opportunities and collaborations. Feel free to reach out!
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
              <Box className="contact-item" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  onClick={() => window.open('mailto:anish.patel@example.com', '_blank')}
                  sx={{ color: '#e0e1dd', p: 0 }}
                >
                  <Email sx={{ fontSize: 32 }} />
                </IconButton>
                <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 500 }}>
                  <a href="mailto:anish.patel@example.com" style={{ color: '#e0e1dd', textDecoration: 'none' }}>Email</a>
                </Typography>
              </Box>
              <Box className="contact-item" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  onClick={() => window.open('https://linkedin.com/in/anishpatel', '_blank')}
                  sx={{ color: '#e0e1dd', p: 0 }}
                >
                  <LinkedIn sx={{ fontSize: 32 }} />
                </IconButton>
                <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 500 }}>
                  <a href="https://linkedin.com/in/anishpatel" target="_blank" rel="noopener noreferrer" style={{ color: '#e0e1dd', textDecoration: 'none' }}>LinkedIn</a>
                </Typography>
              </Box>
              <Box className="contact-item" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  onClick={() => window.open('https://github.com/anishpatel', '_blank')}
                  sx={{ color: '#e0e1dd', p: 0 }}
                >
                  <GitHub sx={{ fontSize: 32 }} />
                </IconButton>
                <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 500 }}>
                  <a href="https://github.com/anishpatel" target="_blank" rel="noopener noreferrer" style={{ color: '#e0e1dd', textDecoration: 'none' }}>GitHub</a>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 