import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { theme } from './themes/theme';
import TimelineNavbar from './components/TimelineNavbar';
import Home from './pages/Home';
import CustomScrollbar from './components/CustomScrollbar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          // Hide default scrollbar
          '*::-webkit-scrollbar': {
            display: 'none',
          },
          '*': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
          },
          'html, body': {
            overflow: 'auto',
          },
          '@keyframes pulse': {
            '0%': {
              opacity: 1,
            },
            '50%': {
              opacity: 0.3,
            },
            '100%': {
              opacity: 1,
            }
          }
        }}
      />
      <TimelineNavbar />
      <Home />
      <CustomScrollbar />
    </ThemeProvider>
  );
}

export default App; 