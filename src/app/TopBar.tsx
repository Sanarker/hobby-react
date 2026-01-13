import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../components/common/ThemeToggle';

export default function TopBar() {
  const location = useLocation();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Hobby Antigravity
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mr: 4 }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{
              borderBottom: location.pathname === '/' ? '2px solid white' : 'none',
              borderRadius: 0
            }}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/resume"
            color="inherit"
            sx={{
              borderBottom: location.pathname === '/resume' ? '2px solid white' : 'none',
              borderRadius: 0
            }}
          >
            Resume
          </Button>
          <Button
            component={Link}
            to="/poke-resume"
            color="inherit"
            sx={{
              borderBottom: location.pathname === '/poke-resume' ? '2px solid #ffde00' : 'none',
              borderRadius: 0,
              fontWeight: location.pathname === '/poke-resume' ? 'bold' : 'normal',
              color: location.pathname === '/poke-resume' ? '#ffde00' : 'inherit'
            }}
          >
            Poke-Resume
          </Button>
        </Box>

        <Box>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

