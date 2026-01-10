import React, { type JSX } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
  Box,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { getTheme } from './theme';
import { ColorModeContext } from './ColorModeContext';
import App from '../App';
import TopBar from './TopBar';

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

          {/* ✅ APP BAR (this was missing) */}
          <TopBar />

          {/* ✅ PAGE CONTENT */}
          <Box sx={{ p: 3 }}>
            <App />
          </Box>

        </ThemeProvider>
      </LocalizationProvider>
    </ColorModeContext.Provider>
  );
}
