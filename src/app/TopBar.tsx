import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import ThemeToggle from '../components/common/ThemeToggle';

export default function TopBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Users
        </Typography>

        {/* ✅ DARK MODE TOGGLE */}
        <Box>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
