import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Grid, Button, Stack, Avatar, Chip, Divider, useTheme } from '@mui/material';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { IceBloodParticles } from '../components/animations/IceBloodParticles';
import { LeoReveal } from '../components/animations/LeoReveal';
import CoffeeIcon from '@mui/icons-material/Coffee';
import PetsIcon from '@mui/icons-material/Pets'; // Hyena/Lion vibes
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ShieldIcon from '@mui/icons-material/Shield';


const leoColors = {
    parthi: {
        bg: '#f5f5f7',
        accent: '#4B3621', // Coffee Brown
        text: '#1d1d1f',
        glass: 'rgba(255, 255, 255, 0.8)'
    },
    leo: {
        bg: '#0a0a0a',
        accent: '#d32f2f', // Blood Red
        text: '#ffffff',
        glass: 'rgba(20, 20, 20, 0.9)'
    }
};

// Forest Mist Component
const ForestMist = () => (
    <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity: 0.4 }}>
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                animate={{
                    x: [-100, 100],
                    opacity: [0, 0.5, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 15 + i * 5,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 2
                }}
                style={{
                    position: 'absolute',
                    top: `${i * 20}%`,
                    left: '-10%',
                    width: '120%',
                    height: '200px',
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    filter: 'blur(50px)'
                }}
            />
        ))}
    </Box>
);

// Blood Splatter Component
const BloodSplatter = () => (
    <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
        {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                style={{
                    position: 'absolute',
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 80}%`,
                }}
            >
                <svg width="200" height="200" viewBox="0 0 200 200">
                    <path
                        d="M100 20 C 120 40, 150 40, 160 80 C 170 120, 140 160, 100 180 C 60 160, 30 120, 40 80 C 50 40, 80 40, 100 20"
                        fill="#d32f2f"
                    />
                </svg>
            </motion.div>
        ))}
    </Box>
);

export default function LeoResume() {
    const [isLeo, setIsLeo] = useState(false);
    const [showFlash, setShowFlash] = useState(false);

    const themeInstance = useTheme();
    const isGlobalDark = themeInstance.palette.mode === 'dark';

    useEffect(() => {
        setIsLeo(isGlobalDark);
    }, [isGlobalDark]);

    const controls = useAnimation();
    const theme = isLeo ? leoColors.leo : leoColors.parthi;

    const toggleLeo = async () => {
        setShowFlash(true);
        controls.start({
            x: [0, -25, 25, -15, 15, 0],
            filter: ['brightness(1)', 'brightness(3)', 'brightness(1)'],
            transition: { duration: 0.4 }
        });

        setTimeout(() => {
            setIsLeo(!isLeo);
            setShowFlash(false);
        }, 300);
    };

    const cardStyle = {
        p: 4,
        bgcolor: theme.glass,
        backdropFilter: 'blur(15px)',
        borderRadius: 0,
        border: `1px solid ${isLeo ? 'rgba(211, 47, 47, 0.4)' : 'rgba(75, 54, 33, 0.1)'}`,
        color: theme.text,
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        '&:hover': {
            boxShadow: isLeo ? '0 0 50px rgba(211, 47, 47, 0.3)' : '0 15px 30px rgba(0,0,0,0.08)',
            transform: isLeo ? 'scale(1.02) rotate(-1deg)' : 'translateY(-5px)'
        }
    };

    const glitchStyle = isLeo ? {
        position: 'relative',
        display: 'inline-block',
        '&::before, &::after': {
            content: 'attr(data-text)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.8,
        },
        '&::before': {
            color: '#ff0000',
            zIndex: -1,
            animation: 'glitch 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite',
        },
        '&::after': {
            color: '#00ffff',
            zIndex: -2,
            animation: 'glitch 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite',
        },
        '@keyframes glitch': {
            '0%': { transform: 'translate(0)' },
            '20%': { transform: 'translate(-3px, 3px)' },
            '40%': { transform: 'translate(-3px, -3px)' },
            '60%': { transform: 'translate(3px, 3px)' },
            '80%': { transform: 'translate(3px, -3px)' },
            '100%': { transform: 'translate(0)' },
        }
    } : {};

    return (
        <motion.div animate={controls}>
            <Box sx={{
                minHeight: '100vh',
                bgcolor: theme.bg,
                color: theme.text,
                transition: 'background-color 1s cubic-bezier(0.4, 0, 0.2, 1), color 1s ease',
                pt: 12, pb: 12,
                overflow: 'hidden',
                position: 'relative'
            }}>
                <AnimatePresence>
                    {isLeo && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <BloodSplatter />
                        </motion.div>
                    )}
                </AnimatePresence>

                <ForestMist />

                {showFlash && (
                    <Box sx={{
                        position: 'fixed', inset: 0,
                        bgcolor: '#fff', zIndex: 9999,
                        opacity: 0.8,
                        animation: 'flash 0.3s'
                    }} />
                )}

                <IceBloodParticles isBloody={isLeo} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
                    <Box sx={{ textAlign: 'center', mb: 10 }}>
                        <LeoReveal delay={0.1} isLeo={isLeo}>
                            <Typography variant="h6" sx={{
                                letterSpacing: 10,
                                fontWeight: 900,
                                color: theme.accent,
                                textTransform: 'uppercase',
                                mb: 2
                            }}>
                                {isLeo ? 'BLOODY SWEET // DAS & CO' : 'HIMACHAL // COFFEE SHOP'}
                            </Typography>
                            <Typography
                                variant="h1"
                                data-text={isLeo ? 'LEO DAS' : 'PARTHIBAN'}
                                sx={{
                                    fontSize: { xs: '4rem', md: '10rem' },
                                    fontWeight: 900,
                                    letterSpacing: -6,
                                    lineHeight: 0.9,
                                    ...glitchStyle
                                }}
                            >
                                {isLeo ? 'LEO DAS' : 'PARTHIBAN'}
                            </Typography>
                        </LeoReveal>
                    </Box>

                    <Grid container spacing={5}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Stack spacing={5}>
                                <LeoReveal delay={0.3} isLeo={isLeo}>
                                    <Paper sx={cardStyle}>
                                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                                            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 1 }}>
                                                <Avatar
                                                    sx={{
                                                        width: 140, height: 140,
                                                        mx: 'auto',
                                                        bgcolor: theme.accent,
                                                        fontSize: '4rem',
                                                        fontWeight: 900,
                                                        boxShadow: `0 0 40px ${theme.accent}66`,
                                                        border: `4px solid ${theme.text}`
                                                    }}
                                                >
                                                    {isLeo ? 'L' : 'P'}
                                                </Avatar>
                                            </motion.div>
                                        </Box>
                                        <Typography variant="h5" sx={{ fontWeight: 900, textAlign: 'center', mb: 1 }}>
                                            SYSTEM SLAYER
                                        </Typography>
                                        <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.6, letterSpacing: 2 }}>
                                            SERIAL: {isLeo ? 'LCN-666-RED' : 'PAR-123-WHT'}
                                        </Typography>
                                        <Divider sx={{ my: 3, borderColor: `${theme.accent}33` }} />
                                        <Stack direction="row" spacing={1.5} justifyContent="center" flexWrap="wrap">
                                            <Chip
                                                icon={isLeo ? <WhatshotIcon /> : <CoffeeIcon />}
                                                label={isLeo ? "BADASS" : "BREWER"}
                                                sx={{ bgcolor: theme.accent, color: '#fff', fontWeight: 900 }}
                                            />
                                            <Chip
                                                icon={<PetsIcon />}
                                                label={isLeo ? "LION" : "HYENA"}
                                                variant="outlined"
                                                sx={{ borderColor: theme.accent, color: theme.text, fontWeight: 900 }}
                                            />
                                        </Stack>
                                    </Paper>
                                </LeoReveal>

                                <LeoReveal delay={0.5} isLeo={isLeo}>
                                    <Paper sx={{ ...cardStyle, borderLeft: `8px solid ${theme.accent}` }}>
                                        <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, color: theme.accent }}>CURRENT STATUS</Typography>
                                        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                            {isLeo
                                                ? "Neutralizing legacy debt with extreme prejudice. Building the LCN ecosystem one push at a time."
                                                : "Perfecting the art of silent code. Living a simple life in the shadows of the Himalayas."}
                                        </Typography>
                                    </Paper>
                                </LeoReveal>
                            </Stack>
                        </Grid>

                        <Grid size={{ xs: 12, md: 8 }}>
                            <LeoReveal delay={0.4} isLeo={isLeo}>
                                <Paper sx={cardStyle}>
                                    <Box sx={{ borderBottom: `4px solid ${theme.accent}`, pb: 2, mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                                        {isLeo ? <WhatshotIcon sx={{ color: theme.accent, fontSize: 40 }} /> : <ShieldIcon sx={{ color: theme.accent, fontSize: 40 }} />}
                                        <Typography variant="h3" sx={{ fontWeight: 900 }}>ARCHIVES</Typography>
                                    </Box>

                                    <Stack spacing={6}>
                                        {[
                                            { title: "THE RED REPO", desc: "A high-intensity trading platform. Redesigned for maximum aggression and zero latency. Survival is the only KPI." },
                                            { title: "PEACEFUL PIXELS", desc: "A meditation app for Himalayan coffee growers. Simplistic, serene, and perfectly balanced code." }
                                        ].map((proj, i) => (
                                            <Box key={i} sx={{ position: 'relative' }}>
                                                <Typography variant="h4" sx={{ fontWeight: 900, color: theme.accent, mb: 1 }}>{proj.title}</Typography>
                                                <Typography variant="body1" sx={{ fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.6 }}>
                                                    {proj.desc}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>

                                    <Divider sx={{ my: 6, borderColor: `${theme.accent}33` }} />

                                    <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>CORE WEAPONRY</Typography>
                                    <Grid container spacing={3}>
                                        {['REACT.JS', 'NODE.JS', 'CI/CD LCN', 'DOCKER', 'TYPESCRIPT', 'FIREBASE'].map(skill => (
                                            <Grid key={skill} size={{ xs: 6, sm: 4 }}>
                                                <motion.div whileHover={{ scale: 1.1, color: theme.accent }}>
                                                    <Box sx={{
                                                        p: 3,
                                                        border: `1px solid ${isLeo ? 'rgba(211,47,47,0.3)' : 'rgba(0,0,0,0.1)'}`,
                                                        textAlign: 'center',
                                                        bgcolor: 'rgba(255,255,255,0.03)',
                                                        fontWeight: 900,
                                                        letterSpacing: 2
                                                    }}>
                                                        {skill}
                                                    </Box>
                                                </motion.div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Paper>
                            </LeoReveal>
                        </Grid>
                    </Grid>

                    <Box sx={{ textAlign: 'center', mt: 12 }}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                            <Button
                                onClick={toggleLeo}
                                variant="contained"
                                sx={{
                                    bgcolor: isLeo ? '#fff' : '#d32f2f',
                                    color: isLeo ? '#d32f2f' : '#fff',
                                    px: 12, py: 3,
                                    fontSize: '2rem',
                                    fontWeight: 900,
                                    borderRadius: 0,
                                    clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)',
                                    boxShadow: `0 0 60px ${isLeo ? '#fff' : '#d32f2f'}88`,
                                    '&:hover': {
                                        bgcolor: isLeo ? '#eee' : '#b71c1c',
                                    }
                                }}
                            >
                                {isLeo ? 'GO BACK' : 'BLOODY SWEET!'}
                            </Button>
                        </motion.div>
                        {isLeo && (
                            <Typography variant="caption" sx={{ display: 'block', mt: 4, letterSpacing: 8, opacity: 0.3, fontWeight: 900 }}>
                                WARNING: LEO DAS IS IN THE HOUSE
                            </Typography>
                        )}
                    </Box>
                </Container>

                {/* Corner Watermark */}
                <Typography sx={{
                    position: 'fixed', bottom: 40, right: -60,
                    transform: 'rotate(-90deg)',
                    fontSize: '5rem', fontWeight: 900,
                    opacity: 0.03, pointerEvents: 'none',
                    letterSpacing: 20
                }}>
                    LCN-PROJECT
                </Typography>
            </Box>
        </motion.div>
    );
}

