import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/common/ThemeToggle';

export default function TopBar() {
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(18, 18, 18, 0.7)' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
        top: 0,
        zIndex: 1100,
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ flexGrow: 1 }}
          >
            <Typography
              variant="h6"
              component={Link}
              to="/resume"
              sx={{
                fontWeight: 900,
                color: 'inherit',
                textDecoration: 'none',
                letterSpacing: 3,
                textTransform: 'uppercase',
                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            >
              RYUU
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, ml: 'auto' }}>
            <Button
              component={Link}
              to="/resume"
              sx={{
                color: location.pathname === '/resume' || location.pathname === '/' ? 'primary.main' : 'text.secondary',
                fontWeight: (location.pathname === '/resume' || location.pathname === '/') ? 800 : 500,
                textTransform: 'none',
                fontSize: '0.95rem',
                letterSpacing: 0.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: 'primary.main',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              Resume
            </Button>
            <ThemeToggle />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

