import { AppBar, Toolbar, Typography, Box, Button, Container, IconButton, Tooltip } from '@mui/material';
import { PrintOutlined as PrintIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/common/ThemeToggle';

export default function TopBar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(9, 13, 22, 0.8)' : 'rgba(248, 250, 252, 0.8)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid',
        borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
        color: 'text.primary',
        top: 0,
        zIndex: 1100,
        transition: 'background-color 0.3s ease, border-color 0.3s ease'
      }}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ flexGrow: 1 }}
          >
            <Typography
              variant="h6"
              onClick={() => scrollToSection('top')}
              sx={{
                fontWeight: 900,
                color: 'inherit',
                cursor: 'pointer',
                letterSpacing: 2,
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
              SANARKER S
            </Typography>
          </motion.div>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1, mr: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  letterSpacing: 0.5,
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.5,
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Print / Save PDF Resume">
              <IconButton
                onClick={() => window.print()}
                sx={{
                  color: 'text.secondary',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                  }
                }}
              >
                <PrintIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <ThemeToggle />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}



