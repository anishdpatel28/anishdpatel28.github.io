import { createTheme } from '@mui/material/styles';

const colors = {
  darkBlue: '#0d1b2a',
  navy: '#1b263b',
  slate: '#415a77',
  grayBlue: '#778da9',
  lightGray: '#e0e1dd',
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