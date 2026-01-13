import { useState } from 'react';
import { Button, Box, Typography, Container, Paper } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { AnimatedContainer } from './components/AnimatedContainer';
import UsersTable from './components/tables/usersTable';
import { ScrollReveal } from './components/animations/ScrollReveal';
import { ScrollProgress } from './components/animations/ScrollProgress';

export default function App() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ minHeight: '200vh', bgcolor: 'background.default' }}>
      <ScrollProgress />

      <Container maxWidth="lg" sx={{ pt: 10, pb: 10 }}>
        <ScrollReveal width="100%">
          <Paper elevation={3} sx={{ p: 4, mb: 6, textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>
              Welcome to the Animated Dashboard
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Scroll down to see more animations in action.
            </Typography>
          </Paper>
        </ScrollReveal>

        <ScrollReveal width="100%">
          <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setOpen(o => !o)}
              endIcon={
                <ExpandMore
                  sx={{
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s'
                  }}
                />
              }
            >
              {open ? 'Hide Table' : 'Show Table'}
            </Button>
          </Box>
        </ScrollReveal>

        <AnimatedContainer>
          {open && (
            <ScrollReveal width="100%">
              <Paper elevation={6} sx={{ p: 2 }}>
                <UsersTable />
              </Paper>
            </ScrollReveal>
          )}
        </AnimatedContainer>

        <Box sx={{ mt: 20 }}>
          <ScrollReveal>
            <Typography variant="h4" gutterBottom>
              Animated Sections Below
            </Typography>
          </ScrollReveal>

          {[1, 2, 3, 4].map((i) => (
            <ScrollReveal key={i} width="100%">
              <Paper
                sx={{
                  height: 300,
                  mb: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(45deg, #1976d2 ${i * 20}%, #42a5f5)`
                }}
              >
                <Typography variant="h3" color="white">Section {i}</Typography>
              </Paper>
            </ScrollReveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
