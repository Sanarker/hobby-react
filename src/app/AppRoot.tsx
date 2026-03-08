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
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion';

import { getTheme } from './theme';
import { ColorModeContext } from './ColorModeContext';
import TopBar from './TopBar';
import Resume from '../pages/Resume';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = React.useState(false);

  React.useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Safety check: target must be an Element to have .closest()
      const interactive = (target && typeof target.closest === 'function')
        ? target.closest('button, a, .MuiChip-root, .spotlight-card')
        : null;

      if (interactive) {
        setIsHovering(true);
        const rect = interactive.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Magnetic pull: 20% towards the center
        const pullX = e.clientX + (centerX - e.clientX) * 0.2;
        const pullY = e.clientY + (centerY - e.clientY) * 0.2;

        cursorX.set(pullX);
        cursorY.set(pullY);
      } else {
        setIsHovering(false);
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: cursorXSpring,
        y: cursorYSpring,
        width: isHovering ? 60 : 12,
        height: isHovering ? 60 : 12,
        borderRadius: '50%',
        backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.05)' : 'rgba(128, 128, 128, 0.4)',
        border: isHovering ? '1px solid rgba(255, 255, 255, 0.4)' : 'none',
        boxShadow: isHovering ? 'inset 0 0 15px rgba(255,255,255,0.2), 0 5px 15px rgba(0,0,0,0.2)' : 'none',
        pointerEvents: 'none',
        zIndex: 10000,
        translateX: '-50%',
        translateY: '-50%',
        backdropFilter: isHovering ? 'saturate(1.8) brightness(1.1)' : 'none',
        display: { xs: 'none', md: 'block' } as any, // Hide on mobile
      }}
      transition={{
        width: { type: 'spring', ...springConfig },
        height: { type: 'spring', ...springConfig },
      }}
    />
  );
};

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
            <CustomCursor />
            {/* Elite+ Scroll Progress Bar */}
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
            {/* Super Elite Tier Plus Scanline Overlay */}
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9998,
                opacity: 0.03,
                '@keyframes scanline': {
                  '0%': { backgroundPosition: '0 0' },
                  '100%': { backgroundPosition: '0 100%' }
                },
                animation: 'scanline 120s linear infinite',
                background: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 1px,
                  ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'} 2px
                )`,
              }}
            />
            {/* Elite+ Noise Texture Overlay */}
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
                opacity: 0.015, // Ultra subtle
                background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                mixBlendingMode: 'overlay',
              }}
            />
            <TopBar />
            <Box sx={{ minHeight: 'calc(100vh - 64px)' }}>
              <Routes>
                <Route path="/" element={<Resume />} />
                <Route path="/resume" element={<Resume />} />
              </Routes>
            </Box>
          </HashRouter>
        </ThemeProvider>
      </LocalizationProvider>
    </ColorModeContext.Provider>
  );
}

