import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { theme, lightTheme } from './themes/theme';
import { createContext, useMemo, useState } from 'react';

import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';

type ThemeMode = 'dark' | 'light';
interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleTheme: () => { },
});

function App() {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const toggleTheme = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const themeObj = useMemo(() => (mode === 'dark' ? theme : lightTheme), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={themeObj}>
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
            },
            'body.no-scroll': {
              overflow: 'hidden !important',
              position: 'relative !important',
            },
            '.skip-nav': {
              position: 'absolute',
              left: '-9999px',
              top: 'auto',
              width: '1px',
              height: '1px',
              overflow: 'hidden',
              zIndex: 9999,
              '&:focus': {
                position: 'fixed',
                top: '8px',
                left: '8px',
                width: 'auto',
                height: 'auto',
                padding: '12px 24px',
                background: '#1b263b',
                color: '#e0e1dd',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                textDecoration: 'none',
              },
            },
          }}
        />
        <a className="skip-nav" href="#main-content">
          Skip to main content
        </a>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:projectId" element={<ProjectPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
