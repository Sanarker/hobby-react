import { Container, Typography, Paper, Box, Grid, Divider, Button, useTheme, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { PokeReveal } from '../components/animations/PokeReveal';
import { MouseTrail } from '../components/animations/MouseTrail';

// High-fidelity Dialogue Component
const DialogueBox = ({ text, delay = 0, isDark }: { text: string, delay?: number, isDark: boolean }) => (
    <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay }}
        style={{ transformOrigin: 'top' }}
    >
        <Box sx={{
            border: isDark ? '4px solid #fff' : '4px solid #000',
            bgcolor: isDark ? '#1a1a1a' : '#fff',
            p: 2,
            position: 'relative',
            '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -12, right: 20,
                width: 0, height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: isDark ? '10px solid #fff' : '10px solid #000'
            }
        }}>
            <Typography sx={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '0.8rem',
                lineHeight: 2,
                color: isDark ? '#fff' : '#000'
            }}>
                {text}
            </Typography>
        </Box>
    </motion.div>
);

export default function PokeResume() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const skills = ["React", "TypeScript", "Material UI", "Framer Motion", "Node.js", "Vite", "React Router"];

    const emeraldColors = {
        primary: isDark ? '#00e676' : '#00a86b',
        background: isDark ? '#1a2a1a' : '#e0f2f1',
        border: isDark ? '#00c853' : '#004d40',
        accent: '#ffa000',
        black: '#000000',
        white: '#ffffff'
    };

    const GBABoxStyles = {
        border: `4px solid ${isDark ? emeraldColors.white : emeraldColors.black}`,
        boxShadow: isDark
            ? `inset -4px -4px 0px 0px rgba(255,255,255,0.1), 0 4px 0 0 ${emeraldColors.white}`
            : `inset -4px -4px 0px 0px rgba(0,0,0,0.2), 0 4px 0 0 ${emeraldColors.black}`,
        borderRadius: '4px',
        backgroundColor: isDark ? '#000' : '#fff',
        position: 'relative' as const,
        zIndex: 1,
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.02)'
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: emeraldColors.background,
            pt: 10, pb: 10,
            position: 'relative',
            overflow: 'hidden',
            // High-Fidelity Retro Background
            background: `radial-gradient(circle at 50% 50%, ${emeraldColors.background} 0%, #000 150%)`,
        }}>
            <MouseTrail color={emeraldColors.primary} />
            {/* CRT Flicker Overlay */}
            <Box sx={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                pointerEvents: 'none', zIndex: 10000,
                background: 'rgba(18, 16, 16, 0.05)',
                opacity: 0.1,
                animation: 'flicker 0.15s infinite'
            }} />

            {/* Retro Scanlines */}
            <Box sx={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 3px)',
                pointerEvents: 'none', zIndex: 9999
            }} />

            <style>
                {`
                @keyframes flicker {
                    0% { opacity: 0.1; }
                    50% { opacity: 0.08; }
                    100% { opacity: 0.11; }
                }
                @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
                `}
            </style>

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <PokeReveal>
                    <Box sx={{
                        p: 6, mb: 6, textAlign: 'center',
                        ...GBABoxStyles,
                        borderColor: emeraldColors.primary,
                        background: isDark ? 'linear-gradient(180deg, #1a2a1a 0%, #000 100%)' : '#fff'
                    }}>
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Typography variant="h2" sx={{
                                color: emeraldColors.primary,
                                fontFamily: '"Press Start 2P", cursive',
                                fontSize: { xs: '1.2rem', md: '2.5rem' },
                                textShadow: `4px 4px 0px ${emeraldColors.black}`,
                                mb: 2
                            }}>
                                POKEMON MASTER
                            </Typography>
                        </motion.div>
                        <Divider sx={{ mb: 2, border: `2px solid ${emeraldColors.primary}` }} />
                        <Typography variant="h5" sx={{
                            fontFamily: '"Press Start 2P", cursive',
                            fontSize: '0.9rem',
                            color: emeraldColors.accent
                        }}>
                            SANATSU RYUU // FULL STACK LVL 99
                        </Typography>
                    </Box>
                </PokeReveal>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Stack spacing={4}>
                            <PokeReveal delay={0.2}>
                                <Paper sx={{ ...GBABoxStyles, p: 4, borderLeft: `12px solid ${emeraldColors.primary}` }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <Box sx={{ width: 12, height: 12, bgcolor: emeraldColors.primary, mr: 2 }} />
                                        <Typography variant="h5" sx={{ fontFamily: '"Press Start 2P", cursive', fontSize: '1rem' }}>
                                            QUEST LOG
                                        </Typography>
                                    </Box>
                                    <DialogueBox text="A wild FULL STACK DEVELOPER appeared! Sanatsu used CLEAN CODE. It's super effective!" delay={0.5} isDark={isDark} />
                                    <Typography sx={{ mt: 3, fontFamily: 'monospace', fontSize: '1.1rem' }}>
                                        Explored the Hoenn region of Web Development for 5+ years.
                                        Captured advanced techniques in TypeScript and modern UI.
                                    </Typography>
                                </Paper>
                            </PokeReveal>

                            <PokeReveal delay={0.4}>
                                <Paper sx={GBABoxStyles}>
                                    <Box sx={{ bgcolor: emeraldColors.black, p: 2 }}>
                                        <Typography sx={{ color: '#fff', fontFamily: '"Press Start 2P", cursive', fontSize: '0.8rem' }}>
                                            GYM BADGES EARNED
                                        </Typography>
                                    </Box>
                                    <Box sx={{ p: 3 }}>
                                        <Stack spacing={3}>
                                            <Box sx={{ borderBottom: '2px dashed #ccc', pb: 2 }}>
                                                <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                                                    &gt; TECHCORP GYM (2021-NOW)
                                                </Typography>
                                                <Typography sx={{ fontSize: '0.9rem', color: emeraldColors.primary, ml: 2 }}>
                                                    * Mastered Micro-Frontend Badge
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                                                    &gt; WEBSOLUTIONS GYM (2018-2021)
                                                </Typography>
                                                <Typography sx={{ fontSize: '0.9rem', color: emeraldColors.primary, ml: 2 }}>
                                                    * Developed Scalable Architecture Badge
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Paper>
                            </PokeReveal>
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <PokeReveal delay={0.6}>
                            <Paper sx={{ ...GBABoxStyles, p: 1 }}>
                                <Box sx={{ bgcolor: emeraldColors.primary, p: 1, textAlign: 'center' }}>
                                    <Typography sx={{ fontFamily: '"Press Start 2P", cursive', fontSize: '0.7rem' }}>
                                        TM / HM LIST
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 2 }}>
                                    <Stack spacing={1}>
                                        {skills.map((skill, i) => (
                                            <motion.div key={skill} whileHover={{ x: 10 }}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    p: 1,
                                                    borderBottom: '1px solid #ddd'
                                                }}>
                                                    <Typography sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                                        TM{i + 1} {skill}
                                                    </Typography>
                                                    <Typography sx={{ color: emeraldColors.primary }}>PP: 20</Typography>
                                                </Box>
                                            </motion.div>
                                        ))}
                                    </Stack>
                                </Box>
                            </Paper>
                        </PokeReveal>
                    </Grid>
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 8 }}>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: emeraldColors.primary,
                                color: emeraldColors.black,
                                fontWeight: 'bold',
                                fontFamily: '"Press Start 2P", cursive',
                                border: `4px solid ${emeraldColors.black}`,
                                borderRadius: '0px',
                                fontSize: '1rem',
                                px: 4, py: 2,
                                boxShadow: `8px 8px 0px ${emeraldColors.black}`,
                                '&:hover': {
                                    bgcolor: emeraldColors.accent,
                                    boxShadow: `4px 4px 0px ${emeraldColors.black}`,
                                }
                            }}
                        >
                            USE HM02 (HIRE)
                        </Button>
                    </motion.div>
                </Box>
            </Container>
        </Box>
    );
}

