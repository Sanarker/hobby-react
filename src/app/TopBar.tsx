import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../components/common/ThemeToggle';

const routeThemeMap: Record<string, {
  bg: string;
  text: string;
  accent: string;
  font?: string;
  glow?: string;
}> = {
  '/': { bg: '#1976d2', text: '#ffffff', accent: '#ffffff' },
  '/resume': { bg: '#2c3e50', text: '#ffffff', accent: '#3498db' },
  '/poke-resume': { bg: '#ffde00', text: '#3c5aa6', accent: '#ff0000', glow: '0 0 15px rgba(255, 222, 0, 0.5)' },
  '/genshin-resume': { bg: '#1a1c23', text: '#ece5d8', accent: '#4db6ac', glow: '0 0 20px rgba(77, 182, 172, 0.4)' },
  '/vijay-resume': { bg: '#fb8c00', text: '#ffffff', accent: '#1a237e', glow: '0 0 20px rgba(251, 140, 0, 0.5)' },
  '/leo-resume': { bg: '#0a0a0a', text: '#ffffff', accent: '#d32f2f', glow: '0 0 20px rgba(211, 47, 47, 0.5)' },
};

export default function TopBar() {
  const location = useLocation();
  const currentTheme = routeThemeMap[location.pathname] || routeThemeMap['/'];

  return (
    <motion.div
      initial={false}
      animate={{
        backgroundColor: currentTheme.bg,
        boxShadow: currentTheme.glow || '0 2px 4px rgba(0,0,0,0.1)'
      }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        width: '100%'
      }}
    >
      <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ minHeight: 70 }}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                fontWeight: 900,
                color: currentTheme.text,
                letterSpacing: 2,
                textTransform: 'uppercase'
              }}
            >
              Hobby Antigravity
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', gap: 1, mr: 4, ml: 'auto' }}>
            {[
              { path: '/', label: 'Dashboard' },
              { path: '/resume', label: 'Resume' },
              { path: '/poke-resume', label: 'Poke' },
              { path: '/genshin-resume', label: 'Genshin' },
              { path: '/vijay-resume', label: 'Master' },
              { path: '/leo-resume', label: 'LEO' },
            ].map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: 0,
                  px: 2,
                  fontWeight: location.pathname === item.path ? 900 : 500,
                  color: location.pathname === item.path ? currentTheme.accent : currentTheme.text,
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-underline"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '10%',
                      right: '10%',
                      height: '4px',
                      background: currentTheme.accent,
                      borderRadius: '2px 2px 0 0'
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Button>
            ))}
          </Box>

          <Box>
            <ThemeToggle />
          </Box>
        </Toolbar>
        {/* Hype Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${currentTheme.accent}, transparent)`,
            opacity: 0.5
          }}
        />
      </AppBar>
    </motion.div>
  );
}

