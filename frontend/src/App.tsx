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
          }}
        />
        <BrowserRouter>
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
