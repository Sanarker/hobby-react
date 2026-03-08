import { createTheme, type PaletteMode } from '@mui/material';

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#90caf9' : '#1976d2',
        light: mode === 'dark' ? '#bbdefb' : '#42a5f5',
        dark: mode === 'dark' ? '#64b5f6' : '#1565c0',
      },
      secondary: {
        main: mode === 'dark' ? '#f48fb1' : '#c2185b',
      },
    },
    typography: {
      fontFamily: '"Outfit", sans-serif',
    },
    shape: {
      borderRadius: 12,
    },
  });
