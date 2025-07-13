import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
} from '@mui/material';
import { Menu as MenuIcon, ExpandMore } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [projectsAnchorEl, setProjectsAnchorEl] = useState<null | HTMLElement>(null);
  const [macroKitAnchorEl, setMacroKitAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleProjectsClick = (event: React.MouseEvent<HTMLElement>) => {
    setProjectsAnchorEl(event.currentTarget);
  };

  const handleMacroKitClick = (event: React.MouseEvent<HTMLElement>) => {
    setMacroKitAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setProjectsAnchorEl(null);
    setMacroKitAnchorEl(null);
  };

  const handleProjectNavigation = (projectId: string) => {
    navigate(`/projects#${projectId}`);
    handleClose();
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h6" component={Link} to="/" sx={{ 
            textDecoration: 'none', 
            color: 'inherit',
            flexGrow: 1,
            fontWeight: 600,
          }}>
            Anish Patel
          </Typography>
        </motion.div>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button
            color="inherit"
            onClick={handleProjectsClick}
            endIcon={<ExpandMore />}
          >
            Projects
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={projectsAnchorEl}
          open={Boolean(projectsAnchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 200,
            },
          }}
        >
          <MenuItem onClick={handleMacroKitClick}>
            MacroKit
            <ExpandMore sx={{ ml: 'auto' }} />
          </MenuItem>
          <MenuItem onClick={() => handleProjectNavigation('machine-learning')}>
            Machine Learning Projects
          </MenuItem>
          <MenuItem onClick={() => handleProjectNavigation('web-projects')}>
            Web Development Projects
          </MenuItem>
        </Menu>

        <Menu
          anchorEl={macroKitAnchorEl}
          open={Boolean(macroKitAnchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              mt: 0,
              ml: 1,
              minWidth: 160,
            },
          }}
        >
          <MenuItem onClick={() => handleProjectNavigation('curlGUI')}>
            curlGUI
          </MenuItem>
          <MenuItem onClick={() => handleProjectNavigation('MacroBoard')}>
            MacroBoard
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 