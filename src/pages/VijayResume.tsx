import { Container, Typography, Paper, Box, Grid, Divider, Button, Chip, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { CinematicReveal } from '../components/animations/CinematicReveal';
import SpeedIcon from '@mui/icons-material/Speed';
import SchoolIcon from '@mui/icons-material/School'; // JD the Professor
import { MouseTrail } from '../components/animations/MouseTrail';

const getMasterColors = (isDark: boolean) => ({
    orange: '#E67E22', // Burning Orange (JD personality)
    denim: isDark ? '#2C3E50' : '#34495e', // Denim Blue
    accent: isDark ? '#F1C40F' : '#f39c12',
    dark: isDark ? '#0e1111' : '#f8f9fa',
    text: isDark ? '#ffffff' : '#2c3e50',
    cardBg: isDark ? 'rgba(20, 20, 20, 0.8)' : 'rgba(255, 255, 255, 0.9)',
    cardBorder: isDark ? 'rgba(230, 126, 34, 0.3)' : 'rgba(230, 126, 34, 0.15)',
});

// Film Grain Component
const FilmGrain = () => (
    <Box sx={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 9999,
        opacity: 0.05,
        backgroundImage: `url("https://media.giphy.com/media/oEI9uWUicHk9S/giphy.gif")`, // Grainy texture
        mixBlendMode: 'overlay'
    }} />
);



export default function VijayResume() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const masterColors = getMasterColors(isDark);

    const cardStyle = {
        bgcolor: masterColors.cardBg,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${masterColors.cardBorder}`,
        borderRadius: '8px',
        p: 4,
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        '&:hover': {
            transform: 'translateY(-8px) scale(1.01)',
            border: `1px solid ${masterColors.orange}`,
            boxShadow: isDark
                ? `0 30px 60px rgba(230, 126, 34, 0.2)`
                : `0 20px 40px rgba(230, 126, 34, 0.1)`
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: masterColors.dark,
            color: masterColors.text,
            pt: 12, pb: 12,
            fontFamily: '"Oswald", sans-serif',
            overflow: 'hidden',
            position: 'relative'
        }}>
            <MouseTrail color={masterColors.orange} />
            <FilmGrain />

            {/* Background Atmosphere */}
            <Box sx={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                background: `radial-gradient(circle at 10% 20%, rgba(230, 126, 34, 0.08) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(44, 62, 80, 0.15) 0%, transparent 50%)`,
                zIndex: 0
            }} />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <CinematicReveal type="mass">
                    <Box sx={{ textAlign: 'center', mb: 10 }}>
                        <motion.div
                            animate={{ scale: [1, 1.02, 1], filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                        >
                            <Typography variant="h1" sx={{
                                fontSize: { xs: '4rem', md: '8rem' },
                                fontWeight: 900,
                                color: masterColors.text,
                                letterSpacing: -2,
                                textShadow: `10px 10px 0px ${masterColors.orange}`,
                                lineHeight: 1, mb: 1
                            }}>
                                SANATSU RYUU
                            </Typography>
                        </motion.div>
                        <Box sx={{ bgcolor: masterColors.orange, display: 'inline-block', px: 4, py: 1, transform: 'skewX(-20deg)' }}>
                            <Typography variant="h5" sx={{ color: '#000', fontWeight: 900, transform: 'skewX(20deg)', letterSpacing: 4 }}>
                                THE FULL STACK PROFESSOR
                            </Typography>
                        </Box>
                    </Box>
                </CinematicReveal>

                <Grid container spacing={6}>
                    <Grid size={{ xs: 12 }}>
                        <CinematicReveal delay={0.2} type="mass">
                            <Box sx={{
                                ...cardStyle,
                                maxWidth: '600px',
                                mx: 'auto',
                                background: isDark
                                    ? 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)'
                                    : 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                                borderTop: `8px solid ${masterColors.orange}`
                            }}>
                                <Stack direction="row" spacing={4} alignItems="center">
                                    <Box sx={{
                                        width: 120, height: 140,
                                        bgcolor: masterColors.orange,
                                        borderRadius: 2,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: `0 0 30px rgba(230, 126, 34, 0.5)`
                                    }}>
                                        <Typography variant="h3" fontWeight="bold">JD</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h4" fontWeight="900" sx={{ color: masterColors.orange }}>FACULTY OF STUNTS</Typography>
                                        <Typography variant="h6" sx={{ opacity: 0.8, letterSpacing: 3 }}>RANK: THE MASTER</Typography>
                                        <Chip label="AVAILABLE 24/7" sx={{ mt: 1, bgcolor: masterColors.accent, color: '#000', fontWeight: 'bold' }} />
                                    </Box>
                                </Stack>
                                <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.1)' }} />
                                <Typography variant="h6" sx={{ fontStyle: 'italic', fontWeight: 300, lineHeight: 1.6 }}>
                                    "Life is very short, nanba. Always be happy!" <br />
                                    Migrating Legacy Monoliths to JD-Class Microservices with precise cinematic timing.
                                    CONDUCTING STYLISTIC FRONTEND MASTERCLASSES DAILY.
                                </Typography>
                            </Box>
                        </CinematicReveal>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                        <CinematicReveal delay={0.4}>
                            <Paper sx={cardStyle}>
                                <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, color: masterColors.orange, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <SchoolIcon fontSize="large" /> MISSION LOGS
                                </Typography>
                                <Stack spacing={5}>
                                    {[
                                        { title: "Kabbadi Score Engine", role: "LEAD ARCHITECT", desc: "Built a distributed real-time engine that handles 1M+ parallel student interactions without breaking a sweat." },
                                        { title: "Professor Dashboards", role: "SENIOR UI STUNTMAN", desc: "Designed high-stakes admin panels with glassmorphic aesthetics and cinematic entrance animations." }
                                    ].map((m, i) => (
                                        <Box key={i} sx={{ pl: 3, borderLeft: `4px solid ${masterColors.orange}` }}>
                                            <Typography variant="h5" fontWeight="900">{m.title}</Typography>
                                            <Typography variant="subtitle1" sx={{ color: masterColors.orange, fontWeight: 'bold' }}>{m.role}</Typography>
                                            <Typography variant="body1" sx={{ mt: 1, opacity: 0.7 }}>{m.desc}</Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        </CinematicReveal>
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        <CinematicReveal delay={0.6}>
                            <Paper sx={cardStyle}>
                                <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, color: masterColors.accent, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <SpeedIcon fontSize="large" /> MAX POWER
                                </Typography>
                                <Stack spacing={3}>
                                    {[
                                        { name: "REACTION TIME", value: 98 },
                                        { name: "UI MASS APPEAL", value: 100 },
                                        { name: "BACKEND STREAK", value: 92 },
                                        { name: "MASTER OST SYNC", value: 100 }
                                    ].map((s) => (
                                        <Box key={s.name}>
                                            <Typography fontWeight="900" sx={{ mb: 1 }}>{s.name}</Typography>
                                            <Box sx={{ height: 10, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 5, overflow: 'hidden' }}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${s.value}%` }}
                                                    transition={{ duration: 1.5, delay: 0.5 }}
                                                    style={{ height: '100%', background: `linear-gradient(90deg, ${masterColors.orange}, ${masterColors.accent})`, boxShadow: `0 0 20px ${masterColors.orange}` }}
                                                />
                                            </Box>
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        </CinematicReveal>
                    </Grid>
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 12 }}>
                    <CinematicReveal delay={0.8} type="mass">
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: masterColors.orange,
                                color: '#fff',
                                py: 3, px: 10,
                                fontSize: '1.8rem',
                                fontWeight: 900,
                                borderRadius: 0,
                                transform: 'skewX(-15deg)',
                                border: '4px solid #fff',
                                boxShadow: `20px 20px 0px ${masterColors.denim}`,
                                '&:hover': {
                                    bgcolor: masterColors.accent,
                                    color: '#000',
                                    transform: 'skewX(-15deg) scale(1.1) translateY(-10px)',
                                    boxShadow: `10px 10px 0px ${masterColors.orange}`
                                }
                            }}
                        >
                            ENROLL IN MASTERCLASS
                        </Button>
                    </CinematicReveal>
                </Box>
            </Container>

            {/* Scrolling Marquee */}
            <Box sx={{
                position: 'fixed', bottom: 0, left: 0, width: '100%',
                bgcolor: masterColors.orange, py: 1, zIndex: 100,
                borderTop: '4px solid #000'
            }}>
                <motion.div
                    animate={{ x: [0, -2000] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                    <Typography sx={{ color: '#000', fontWeight: 900, whiteSpace: 'nowrap', fontSize: '1.2rem', letterSpacing: 4 }}>
                        {"VATHI COMING! ".repeat(20)}
                    </Typography>
                </motion.div>
            </Box>
        </Box>
    );
}

