import React, { type JSX } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
  Box,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { getTheme } from './theme';
import { ColorModeContext } from './ColorModeContext';
import App from '../App';
import TopBar from './TopBar';
import Resume from '../pages/Resume';
import PokeResume from '../pages/PokeResume';
import GenshinResume from '../pages/GenshinResume';
import VijayResume from '../pages/VijayResume';
import LeoResume from '../pages/LeoResume';

export default function AppRoot(): JSX.Element {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = React.useState<'light' | 'dark'>(() => {
    return (
      (localStorage.getItem('color-mode') as 'light' | 'dark') ??
      (prefersDarkMode ? 'dark' : 'light')
    );
  });

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === 'light' ? 'dark' : 'light';
          localStorage.setItem('color-mode', next);
          return next;
        });
      },
    }),
    []
  );

  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <HashRouter>
            <TopBar />
            <Box sx={{ minHeight: 'calc(100vh - 64px)' }}>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/poke-resume" element={<PokeResume />} />
                <Route path="/genshin-resume" element={<GenshinResume />} />
                <Route path="/vijay-resume" element={<VijayResume />} />
                <Route path="/leo-resume" element={<LeoResume />} />
              </Routes>
            </Box>
          </HashRouter>
        </ThemeProvider>
      </LocalizationProvider>
    </ColorModeContext.Provider>
  );
}

