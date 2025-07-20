import { Box, Typography, Container, Card, CardContent, Avatar, Chip, Tooltip } from '@mui/material';
import { Description, FileDownload } from '@mui/icons-material';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollProgress from '@/components/ScrollProgress';
import ParallaxSection from '@/components/ParallaxSection';
import ProjectsParallax from '@/components/ProjectsParallax';
import TimelineNavbar from '@/components/TimelineNavbar';
import NavbarPageViews from '@/components/NavbarPageViews';
import { useState } from 'react';
import { sectionBackgrounds } from '@/themes/theme';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

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
      setActiveSection(newActiveSection);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

    // About section animations
    const aboutTitle = aboutRef.current?.querySelector('.about-title');
    const aboutItems = aboutRef.current?.querySelectorAll('.about-item');

    if (aboutTitle) {
      gsap.fromTo(aboutTitle,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (aboutItems && aboutItems.length > 0) {
      gsap.fromTo(aboutItems,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Skills section animations
    const skillsTitle = skillsRef.current?.querySelector('.skills-title');
    const skillChips = skillsRef.current?.querySelectorAll('.skill-chip');

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
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (skillChips && skillChips.length > 0) {
      gsap.fromTo(skillChips,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
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
            end: "bottom 20%",
            toggleActions: "play none none reverse"
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
            end: "bottom 20%",
            toggleActions: "play none none reverse"
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
            end: "bottom 20%",
            toggleActions: "play none none reverse"
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
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Box>
      <ScrollProgress />
      <TimelineNavbar />
      <NavbarPageViews activeSection={activeSection} />

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

      {/* About Section - Parallax */}
      <ParallaxSection
        id="about"
        speed={0.2}
        backgroundColor={sectionBackgrounds.about}
      >
        <Container maxWidth="lg">
          <Box ref={aboutRef} sx={{ py: { xs: 4, md: 8 }, px: { xs: 1, md: 3 } }}>
            <Typography
              className="about-title"
              variant="h3"
              sx={{ color: '#e0e1dd', mb: 2, fontWeight: 600 }}
            >
              About Me
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(224, 225, 221, 0.9)', mb: 4, maxWidth: 700 }}>
              Computer Science student at RPI with a passion for building digital products. Interned at Analog Devices and Intuit Credit Karma, focusing on cloud and full-stack development.
            </Typography>

            {/* Education */}
            <Box className="about-item" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ mr: 1, color: '#e0e1dd' }}>
                {/* School Icon */}
              </Box>
              <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 600 }}>
                Education
              </Typography>
            </Box>
            <Box sx={{ ml: 2, mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#e0e1dd', fontWeight: 500 }}>
                RPI, B.S. Computer Science (2022–2026)
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.8)' }}>
                Minors: Cognitive Science of AI, Info Tech & Web Science
              </Typography>
            </Box>

            {/* Work Experience */}
            <Box className="about-item" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ mr: 1, color: '#e0e1dd' }}>
                {/* Work Icon */}
              </Box>
              <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 600 }}>
                Work Experience
              </Typography>
            </Box>
            <Box sx={{ ml: 2, mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#e0e1dd', fontWeight: 500 }}>
                Analog Devices, SWE Intern (2024):
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.8)' }}>
                Modernized software packaging app.
              </Typography>
              <Typography variant="subtitle2" sx={{ color: '#e0e1dd', fontWeight: 500, mt: 1 }}>
                Intuit Credit Karma, SWE Intern (2023):
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.8)' }}>
                Built SecOps portal for security alerts.
              </Typography>
            </Box>

            {/* Skills */}
            <Box className="about-item" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ mr: 1, color: '#e0e1dd' }}>
                {/* Skills Icon */}
              </Box>
              <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 600 }}>
                Skills
              </Typography>
            </Box>
            <Box sx={{ ml: 2, mb: 2 }}>
              <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.8)' }}>
                Full-stack development, cloud computing, AI/ML, real-time systems
              </Typography>
            </Box>

            {/* Certifications */}
            <Box className="about-item" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ mr: 1, color: '#e0e1dd' }}>
                {/* Cert Icon */}
              </Box>
              <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 600 }}>
                Certifications
              </Typography>
            </Box>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body2" sx={{ color: 'rgba(224, 225, 221, 0.8)' }}>
                AWS Solutions Architect, Google Cloud Professional
              </Typography>
            </Box>
          </Box>
        </Container>
      </ParallaxSection>

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
              sx={{ color: '#e0e1dd', mb: 4, fontWeight: 600, textAlign: 'center' }}
            >
              Skills & Technologies
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              {[
                'React', 'TypeScript', 'Node.js', 'Python', 'Django', 'PostgreSQL',
                'AWS', 'Docker', 'Git', 'MongoDB', 'Express', 'Redux',
                'TensorFlow', 'WebRTC', 'Socket.io', 'Firebase', 'Redis'
              ].map((skill, index) => (
                <Chip
                  key={skill}
                  className="skill-chip"
                  label={skill}
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(224, 225, 221, 0.3)',
                    color: '#e0e1dd',
                    fontSize: { xs: '0.8rem', lg: '0.9rem' },
                    '&:hover': {
                      backgroundColor: 'rgba(224, 225, 221, 0.1)',
                      borderColor: '#e0e1dd',
                    }
                  }}
                />
              ))}
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
              <Box
                component="a"
                href="https://drive.google.com/file/d/19BGb6xdeRADI9lLYGqFvN8jCOlfzvm3h/view"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'primary.main',
                  color: '#1b263b',
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }}
              >
                <Description sx={{ mr: 1 }} /> View Resume
              </Box>
              <Box
                component="a"
                href="https://drive.google.com/uc?export=download&id=19BGb6xdeRADI9lLYGqFvN8jCOlfzvm3h"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  color: '#e0e1dd',
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: '2px solid #e0e1dd',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(224, 225, 221, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(224, 225, 221, 0.2)'
                  }
                }}
              >
                <FileDownload sx={{ mr: 1 }} /> Download Resume
              </Box>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
              <Box className="contact-item" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 500 }}>
                  Email:
                </Typography>
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  anish.patel@example.com
                </Typography>
              </Box>
              <Box className="contact-item" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 500 }}>
                  LinkedIn:
                </Typography>
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  linkedin.com/in/anishpatel
                </Typography>
              </Box>
              <Box className="contact-item" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" sx={{ color: '#e0e1dd', fontWeight: 500 }}>
                  GitHub:
                </Typography>
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  github.com/anishpatel
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