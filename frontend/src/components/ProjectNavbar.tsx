import { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Paper,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ThemeContext } from '@/App';
import { projects } from '@/data/projects';

const NAVBAR_HEIGHT = 64;

const ProjectNavbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navbarRef = useRef<HTMLDivElement>(null);
  const { mode } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;
    (async () => {
      const gsapMod = await import('gsap');
      const gsap = gsapMod.default;
      if (navbarRef.current) {
        gsap.fromTo(navbarRef.current,
          { opacity: 0, transform: 'translateY(-32px)' },
          { opacity: 1, transform: 'translateY(0)', duration: 0.8, ease: 'power2.out' }
        );
      }
    })();
  }, []);

  const handleProjectsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProjectSelect = (projectId: string) => {
    navigate(`/projects/${projectId}`);
    handleClose();
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <nav
      ref={navbarRef}
      aria-label="Project navigation"
      style={{
        position: 'fixed',
        top: 32,
        left: 0,
        right: 0,
        zIndex: 1300,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        opacity: 0,
        transform: 'translateY(-32px)',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: 10,
          px: { xs: 1, md: 2 },
          py: 0.5,
          bgcolor: mode === 'dark' ? '#1b263b' : '#ffffff',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 0.5, md: 1.5 },
          minHeight: NAVBAR_HEIGHT,
          pointerEvents: 'auto',
          transform: 'translateZ(0)',
          position: 'relative',
          zIndex: 1300,
        }}
      >
        <Tooltip title="Home" arrow>
          <IconButton
            onClick={handleHomeClick}
            sx={{
              color: mode === 'dark' ? 'rgba(224, 225, 221, 0.7)' : 'rgba(27, 38, 59, 0.7)',
              mx: { xs: 0.25, md: 0.5 },
              transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
              '&:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(65, 90, 119, 0.3)' : 'rgba(27, 38, 59, 0.3)',
                color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                border: `2px solid ${mode === 'dark' ? '#e0e1dd' : '#1b263b'}`,
              },
              fontSize: 24,
              p: { xs: 0.75, md: 1.1 },
              border: '2px solid transparent',
            }}
            aria-label="Navigate to Home"
          >
            <HomeIcon fontSize="medium" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Projects" arrow>
          <IconButton
            onClick={handleProjectsClick}
            sx={{
              color: open
                ? (mode === 'dark' ? '#e0e1dd' : '#1b263b')
                : (mode === 'dark' ? 'rgba(224, 225, 221, 0.7)' : 'rgba(27, 38, 59, 0.7)'),
              backgroundColor: open
                ? (mode === 'dark' ? 'rgba(224, 225, 221, 0.18)' : 'rgba(27, 38, 59, 0.18)')
                : 'transparent',
              border: open
                ? `2px solid ${mode === 'dark' ? '#e0e1dd' : '#1b263b'}`
                : '2px solid transparent',
              borderRadius: 2,
              mx: { xs: 0.25, md: 0.5 },
              transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
              '&:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(65, 90, 119, 0.3)' : 'rgba(27, 38, 59, 0.3)',
                color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                border: `2px solid ${mode === 'dark' ? '#e0e1dd' : '#1b263b'}`,
              },
              fontSize: 24,
              p: { xs: 0.75, md: 1.1 },
              display: 'flex',
              alignItems: 'center',
              gap: 0.25,
            }}
            aria-label="Browse projects"
            aria-controls={open ? 'projects-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <AppsIcon fontSize="medium" />
            <KeyboardArrowDownIcon
              fontSize="small"
              sx={{
                transition: 'transform 0.2s',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </IconButton>
        </Tooltip>

        <Menu
          id="projects-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'projects-button',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          sx={{
            mt: 1,
            '& .MuiPaper-root': {
              bgcolor: mode === 'dark' ? '#1b263b' : '#ffffff',
              borderRadius: 2,
              minWidth: 250,
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
            },
          }}
        >
          <MenuItem disabled sx={{ opacity: 0.7 }}>
            <ListItemText
              primary="All Projects"
              primaryTypographyProps={{
                fontWeight: 600,
                color: mode === 'dark' ? '#e0e1dd' : '#1b263b'
              }}
            />
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          {projects.map((project) => (
            <MenuItem
              key={project.id}
              onClick={() => handleProjectSelect(project.id)}
              sx={{
                py: 1.5,
                '&:hover': {
                  backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.1)' : 'rgba(27, 38, 59, 0.08)',
                },
              }}
            >
              <ListItemIcon>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: project.color,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={project.title}
                secondary={project.category}
                primaryTypographyProps={{
                  color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
                  fontSize: '0.95rem',
                }}
                secondaryTypographyProps={{
                  color: mode === 'dark' ? 'rgba(224, 225, 221, 0.6)' : 'rgba(27, 38, 59, 0.6)',
                  fontSize: '0.8rem',
                }}
              />
            </MenuItem>
          ))}
        </Menu>
      </Paper>
    </nav>
  );
};

export default ProjectNavbar;

