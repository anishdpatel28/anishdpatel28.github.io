import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { theme } from './themes/theme';

import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '*::-webkit-scrollbar': {
            display: 'none',
          },
          '*': {
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          },
          'html, body': {
            overflow: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          },
          'html::-webkit-scrollbar, body::-webkit-scrollbar': {
            display: 'none',
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
      <Home />
    </ThemeProvider>
  );
}

export default App; 