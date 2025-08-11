import { Box, Card, Tooltip, IconButton, Container } from '@mui/material';
import { Analytics, Brightness4, Brightness7 } from '@mui/icons-material';
import { useEffect, useRef, useState, useContext } from 'react';
import ScrollProgress from '@/components/ScrollProgress';
import ProjectsCarousel from '@/components/ProjectsCarousel';
import Navbar from '@/components/Navbar';
import PageSection from '@/components/PageSection';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ResumeSection from '@/components/sections/ResumeSection';
import ContactSection from '@/components/sections/ContactSection';
import AnalyticsDialog from '@/components/AnalyticsDialog';
import { sectionBackgrounds } from '@/themes/theme';
import { pageAnalyticsAPI } from '@/services/api';
import easterEgg from '@/assets/images/icons/easter-egg.svg';
import { ThemeContext } from '../App';

const Home = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [hasClickedAnalytics, setHasClickedAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState<Record<string, unknown> | null>(null);
  const [showEgg, setShowEgg] = useState(false);
  const lastSectionRef = useRef<string>('home');
  const lastSectionStartRef = useRef<number>(Date.now());
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const analyticsBtnRef = useRef<HTMLButtonElement>(null);
  const homeBackgroundRef = useRef<HTMLDivElement>(null);
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

      // home section parallax background
      if (homeBackgroundRef.current) {
        const homeBackground = homeBackgroundRef.current.querySelector('.home-background');
        if (homeBackground) {
          gsap.to(homeBackground, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
              trigger: homeBackgroundRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
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
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
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
      <AnalyticsDialog
        open={showAnalytics}
        onClose={handleAnalyticsClose}
        analytics={analytics}
        mode={mode}
      />

      {/* Home Section - Parallax */}
      <Box
        id="home"
        ref={homeBackgroundRef}
        sx={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          background: mode === 'dark' ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)' : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="lg">
          <HeroSection
            showNavbar={showNavbar}
            heroRef={heroRef}
            mode={mode}
            navbar={<Navbar />}
          />
        </Container>
      </Box>

      {/* About */}
      <PageSection
        id="about"
        ref={aboutRef}
        background={mode === 'dark' ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)' : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'}
      >
        <AboutSection mode={mode} />
      </PageSection>

      {/* Skills Section */}
      <PageSection
        id="skills"
        ref={skillsRef}
        background={mode === 'dark' ? 'linear-gradient(135deg, #2c1b3a 0%, #0d1b2a 100%)' : 'linear-gradient(135deg, #f1f3f4 0%, #e8eaed 100%)'}
      >
        <SkillsSection mode={mode} />
      </PageSection>

      {/* Projects */}
      <PageSection
        id="projects"
        ref={projectsRef}
        background={mode === 'dark' ? 'transparent' : '#f5f5f5'}
        containerMaxWidth={false}
        sx={{ zIndex: 0 }}
      >
        <ProjectsCarousel />
      </PageSection>

      {/* Resume Section */}
      <PageSection
        id="resume"
        ref={resumeRef}
        background={mode === 'dark' ? 'linear-gradient(135deg, #1a3a2a 0%, #1a2a3a 100%)' : 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)'}
      >
        <ResumeSection mode={mode} />
      </PageSection>

      {/* Contact Section */}
      <PageSection
        id="contact"
        ref={contactRef}
        background={mode === 'dark' ? sectionBackgrounds.contact : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)'}
      >
        <ContactSection mode={mode} />
      </PageSection>
    </Box>
  );
};

export default Home; 