import { createTheme } from '@mui/material/styles';

const colors = {
  darkBlue: '#0d1b2a',
  navy: '#1b263b',
  slate: '#415a77',
  grayBlue: '#778da9',
  lightGray: '#e0e1dd',
  darkTeal: '#1a2a3a',
  deepPurple: '#2a1b3a',
  darkGreen: '#1a3a2a',
  charcoal: '#2a2a2a',
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.slate,
      light: colors.grayBlue,
      dark: colors.navy,
    },
    secondary: {
      main: colors.grayBlue,
      light: colors.lightGray,
      dark: colors.slate,
    },
    background: {
      default: colors.darkBlue,
      paper: colors.navy,
    },
    text: {
      primary: colors.lightGray,
      secondary: colors.grayBlue,
    },
    divider: colors.slate,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: colors.lightGray,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: colors.lightGray,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: colors.lightGray,
    },
    body1: {
      fontSize: '1rem',
      color: colors.lightGray,
    },
    body2: {
      fontSize: '0.875rem',
      color: colors.grayBlue,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(27, 38, 59, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.navy,
          border: `1px solid ${colors.slate}`,
        },
      },
    },
  },
}); 

export const sectionBackgrounds = {
  home: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.navy} 100%)`,
  about: `linear-gradient(135deg, ${colors.darkTeal} 0%, ${colors.slate} 100%)`,
  skills: `linear-gradient(135deg, ${colors.deepPurple} 0%, ${colors.darkBlue} 100%)`,
  projects: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.navy} 50%, ${colors.slate} 100%)`,
  resume: `linear-gradient(135deg, ${colors.darkGreen} 0%, ${colors.darkTeal} 100%)`,
  contact: `linear-gradient(135deg, ${colors.charcoal} 0%, ${colors.darkBlue} 100%)`,
}; 