import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import ThemeToggle from './components/common/ThemeToggle';
import Home from './pages/home';

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Hobby React
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 2 }}>
        <Home />
      </Box>
    </>
  );
}
