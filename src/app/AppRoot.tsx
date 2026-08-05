import React, { type JSX } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
  Box,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

import { getTheme } from './theme';
import { ColorModeContext } from './ColorModeContext';
import TopBar from './TopBar';
import Resume from '../pages/Resume';

export default function AppRoot(): JSX.Element {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
            {/* Scroll Progress Bar */}
            <motion.div
              style={{
                scaleX,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                transformOrigin: '0%',
                zIndex: 2000,
              }}
            />
            <TopBar />
            <Box sx={{ minHeight: 'calc(100vh - 64px)' }}>
              <Routes>
                <Route path="/" element={<Resume />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Box>
          </HashRouter>
        </ThemeProvider>
      </LocalizationProvider>
    </ColorModeContext.Provider>
  );
}


