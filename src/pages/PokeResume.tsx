import { Container, Typography, Paper, Box, Grid, Chip, Divider, Button, useTheme } from '@mui/material';
import { PokeReveal } from '../components/animations/PokeReveal';

export default function PokeResume() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const skills = ["React", "TypeScript", "Material UI", "Framer Motion", "Node.js", "Vite", "React Router"];

    const emeraldColors = {
        primary: isDark ? '#00e676' : '#00a86b',
        background: isDark ? '#121212' : '#e0f2f1',
        border: isDark ? '#00c853' : '#004d40',
        accent: '#ffa000',
        black: '#000000',
        white: '#ffffff'
    };

    const GBABoxStyles = {
        border: `4px solid ${emeraldColors.black}`,
        boxShadow: `inset -4px -4px 0px 0px rgba(0,0,0,0.2), 0 4px 0 0 ${emeraldColors.black}`,
        borderRadius: '4px',
        backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
        position: 'relative' as const,
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            border: `2px solid rgba(255,255,255,0.3)`,
            pointerEvents: 'none'
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: emeraldColors.background,
            pt: 10,
            pb: 10,
            position: 'relative',
            overflow: 'hidden',
            // Retro Scanlines
            '&::after': {
                content: '""',
                position: 'fixed',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 2px)',
                pointerEvents: 'none',
                zIndex: 9999
            }
        }}>
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <PokeReveal>
                    <Box sx={{
                        p: 4,
                        mb: 6,
                        textAlign: 'center',
                        ...GBABoxStyles,
                        borderColor: emeraldColors.primary
                    }}>
                        <Typography variant="h2" fontWeight="bold" sx={{
                            color: emeraldColors.primary,
                            fontFamily: 'monospace',
                            textShadow: isDark ? '2px 2px #000' : '2px 2px #ccc'
                        }}>
                            EMERALD SANATSU RYUU
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                            HOENN REGION FULL STACK MASTER
                        </Typography>
                    </Box>
                </PokeReveal>

                <PokeReveal delay={0.2}>
                    <Paper elevation={0} sx={{
                        p: 4,
                        mb: 4,
                        ...GBABoxStyles,
                        borderLeft: `12px solid ${emeraldColors.primary}`
                    }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: emeraldColors.primary, fontFamily: 'monospace' }}>
                            Adventure Log
                        </Typography>
                        <Typography variant="body1" sx={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
                            Explored the Hoenn region of Web Development for 5+ years.
                            Captured advanced techniques in TypeScript and modern UI.
                            Always seeking the Battle Frontier of code!
                        </Typography>
                    </Paper>
                </PokeReveal>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <PokeReveal delay={0.4}>
                            <Paper elevation={0} sx={{
                                p: 4,
                                mb: 4,
                                ...GBABoxStyles,
                                minHeight: '400px'
                            }}>
                                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: emeraldColors.primary, fontFamily: 'monospace' }}>
                                    Gym Badges
                                </Typography>
                                <Divider sx={{ mb: 2, bgcolor: emeraldColors.primary }} />

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'monospace' }}>Sootopolis Gym @ TechCorp</Typography>
                                    <Typography variant="subtitle2" color={emeraldColors.accent} fontWeight="bold">2021 — PRESENT</Typography>
                                    <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace' }}>
                                        {">"} Mastered Micro-Frontend architecture.<br />
                                        {">"} Optimized performance with Emerald Precision.
                                    </Typography>
                                </Box>

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'monospace' }}>Petalburg Gym @ WebSolutions</Typography>
                                    <Typography variant="subtitle2" color={emeraldColors.accent} fontWeight="bold">2018 — 2021</Typography>
                                    <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace' }}>
                                        {">"} Developed scalable battle-ready applications.<br />
                                        {">"} Collaborated on high-stakes UI missions.
                                    </Typography>
                                </Box>
                            </Paper>
                        </PokeReveal>
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        <PokeReveal delay={0.6}>
                            <Paper elevation={0} sx={{
                                p: 4,
                                mb: 4,
                                ...GBABoxStyles
                            }}>
                                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: emeraldColors.primary, fontFamily: 'monospace' }}>
                                    TM LIST
                                </Typography>
                                <Divider sx={{ mb: 2, bgcolor: emeraldColors.primary }} />
                                <Grid container spacing={1}>
                                    {skills.map((skill) => (
                                        <Grid key={skill}>
                                            <Chip
                                                label={skill}
                                                sx={{
                                                    fontFamily: 'monospace',
                                                    fontWeight: 'bold',
                                                    borderRadius: '0px',
                                                    bgcolor: emeraldColors.black,
                                                    color: emeraldColors.primary,
                                                    border: `1px solid ${emeraldColors.primary}`,
                                                    '&:hover': { bgcolor: emeraldColors.primary, color: emeraldColors.black }
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </PokeReveal>
                    </Grid>
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: emeraldColors.primary,
                            color: emeraldColors.black,
                            fontWeight: 'bold',
                            fontFamily: 'monospace',
                            border: `4px solid ${emeraldColors.black}`,
                            borderRadius: '0px',
                            fontSize: '1.2rem',
                            px: 6,
                            py: 2,
                            '&:hover': {
                                bgcolor: emeraldColors.accent,
                                transform: 'translateY(-4px)',
                                boxShadow: `0 8px 0 0 ${emeraldColors.black}`
                            },
                            transition: 'all 0.1s'
                        }}
                    >
                        USE HM02 (HIRE ME)
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
