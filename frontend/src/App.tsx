import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { theme } from './themes/theme';
import Navbar from './components/Navbar';
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
          }
        }}
      />
      <Navbar />
      <Home />
      <CustomScrollbar />
    </ThemeProvider>
  );
}

export default App; 