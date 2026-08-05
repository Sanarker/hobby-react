import { createTheme, type PaletteMode } from '@mui/material';

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#818CF8' : '#4F46E5', // Refined Indigo
        light: mode === 'dark' ? '#A5B4FC' : '#6366F1',
        dark: mode === 'dark' ? '#6366F1' : '#3730A3',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: mode === 'dark' ? '#38BDF8' : '#0284C7', // Sky Blue Accent
        light: mode === 'dark' ? '#7DD3FC' : '#38BDF8',
        dark: mode === 'dark' ? '#0EA5E9' : '#0369A1',
      },
      background: {
        default: mode === 'dark' ? '#090D16' : '#F8FAFC',
        paper: mode === 'dark' ? '#0F172A' : '#FFFFFF',
      },
      text: {
        primary: mode === 'dark' ? '#F8FAFC' : '#0F172A',
        secondary: mode === 'dark' ? '#94A3B8' : '#475569',
      },
      divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      action: {
        hover: mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
      },
    },
    typography: {
      fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
      h1: { fontWeight: 800 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 14,
    },
  });


