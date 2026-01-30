import { Container, Typography, Paper, Box, Grid, Rating, Stack, useTheme } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { GenshinReveal } from '../components/animations/GenshinReveal';
import { GenshinParticles } from '../components/animations/GenshinParticles';

import StarsIcon from '@mui/icons-material/Stars';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LandscapeIcon from '@mui/icons-material/Landscape'; // Geo
import AirIcon from '@mui/icons-material/Air'; // Anemo
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'; // Electro

import { soundManager } from '../utils/SoundManager';
import { WishSplash } from '../components/animations/WishSplash';
import { MouseTrail } from '../components/animations/MouseTrail';
import React, { useState } from 'react';

const getGenshinColors = (isDark: boolean) => ({
    navy: isDark ? '#1a233a' : '#f3e5f5', // Deep Ayaka Blue vs Soft Keqing Purple
    navyDark: isDark ? '#0a0f1d' : '#ffffff',
    cyan: isDark ? '#81d4fa' : '#ba68c8', // Cryo vs Electro
    gold: isDark ? '#e0e0e0' : '#ffd54f', // Silver (Ayaka) vs Gold (Keqing)
    purple: isDark ? '#4fc3f7' : '#9c27b0', // Cryo Accent vs Electro Main
    textMain: isDark ? '#ece5d8' : '#4a148c',
    textDark: isDark ? '#90a4ae' : '#7b1fa2',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)'
});

// Celestial Drift Component
const CelestialDrift = ({ color }: { color: string }) => (
    <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[...Array(12)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                    y: [0, -30, 0],
                    x: [0, 20, 0]
                }}
                transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    delay: i * 1.5
                }}
                style={{
                    position: 'absolute',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                }}
            >
                <StarsIcon sx={{ color: color, fontSize: i % 3 === 0 ? 20 : 10, opacity: 0.2 }} />
            </motion.div>
        ))}
    </Box>
);

const CornerOrnament = ({ position, color }: { position: 'tl' | 'tr' | 'bl' | 'br', color: string }) => {
    const rotations = { tl: 0, tr: 90, br: 180, bl: 270 };
    const placements = {
        tl: { top: -2, left: -2 },
        tr: { top: -2, right: -2 },
        br: { bottom: -2, right: -2 },
        bl: { bottom: -2, left: -2 }
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                width: 24, height: 24,
                border: `2px solid ${color}`,
                borderColor: `${color} transparent transparent ${color}`,
                rotate: `${rotations[position]}deg`,
                zIndex: 3,
                ...placements[position],
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: 6, height: 6,
                    bgcolor: color,
                    top: -2, left: -2,
                    boxShadow: `0 0 15px ${color}`
                }
            }}
        />
    );
};



// Constellation Line Component
const ConstellationGrid = ({ color, isDark }: { color: string, isDark: boolean }) => (
    <Box sx={{ position: 'absolute', inset: 0, opacity: 0.15, zIndex: 0 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {/* Character Specific Motifs */}
            {isDark ? (
                /* Ayaka Heron/Snowflake motifs */
                <motion.path
                    d="M 500,100 L 600,300 L 500,500 L 400,300 Z M 800,200 L 900,300 L 800,400 L 700,300 Z"
                    stroke={color}
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 15, repeat: Infinity }}
                />
            ) : (
                /* Keqing Star/Lightning motifs */
                <motion.path
                    d="M 100,500 L 300,400 L 200,600 L 400,500 M 800,100 L 850,200 L 950,200 L 880,280 L 910,380 L 800,320 L 690,380 L 720,280 L 650,200 L 750,200 Z"
                    stroke={color}
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 15, repeat: Infinity }}
                />
            )}
        </svg>
    </Box>
);

export default function GenshinResume() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const genshinColors = getGenshinColors(isDark);


    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [showWish, setShowWish] = useState(true);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (event: React.MouseEvent) => {
        const { clientX, clientY } = event;
        mouseX.set(clientX);
        mouseY.set(clientY);
    };



    const bgX = useTransform(mouseX, [0, window.innerWidth], [-30, 30]);
    const bgY = useTransform(mouseY, [0, window.innerHeight], [-30, 30]);

    const skills = [
        { name: "React", level: 5, element: 'Anemo', icon: <AirIcon fontSize="inherit" /> },
        { name: "TypeScript", level: 5, element: 'Geo', icon: <LandscapeIcon fontSize="inherit" /> },
        { name: "Material UI", level: 4, element: 'Geo', icon: <LandscapeIcon fontSize="inherit" /> },
        { name: "Framer Motion", level: 4, element: 'Anemo', icon: <AirIcon fontSize="inherit" /> },
        { name: "Node.js", level: 3, element: 'Electro', icon: <ElectricBoltIcon fontSize="inherit" /> },
        { name: "Vite", level: 4, element: 'Anemo', icon: <AirIcon fontSize="inherit" /> },
        { name: "Archon Design", level: 5, element: 'Geo', icon: <LandscapeIcon fontSize="inherit" /> }
    ];

    const cardStyle = {
        bgcolor: genshinColors.cardBg,
        backdropFilter: 'blur(16px)',
        border: `1px solid ${isDark ? 'rgba(211, 188, 142, 0.4)' : 'rgba(184, 159, 107, 0.3)'}`,
        borderRadius: '0px',
        p: 4,
        position: 'relative',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        '&:hover': {
            border: `1px solid ${genshinColors.gold}`,
            boxShadow: `0 0 40px ${isDark ? 'rgba(211, 188, 142, 0.15)' : 'rgba(0,0,0,0.1)'}`,
            transform: 'scale(1.01)'
        }
    };

    if (showWish) return <WishSplash onComplete={() => setShowWish(false)} />;

    return (
        <Box
            onMouseMove={handleMouseMove}
            onMouseDown={() => soundManager.playClick()}
            sx={{
                minHeight: '100vh',
                bgcolor: genshinColors.navyDark,
                color: genshinColors.textMain,
                pt: 12, pb: 12,
                fontFamily: '"Outfit", sans-serif',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <motion.div
                style={{ x: bgX, y: bgY, position: 'absolute', top: -100, left: -100, right: -100, bottom: -100, zIndex: -1 }}
            >
                <Box sx={{
                    width: '100%', height: '100%',
                    backgroundImage: isDark
                        ? `radial-gradient(circle at 50% 20%, #2a2d3e 0%, #12141c 100%)`
                        : `radial-gradient(circle at 50% 20%, #e8edf3 0%, #ffffff 100%)`,
                }} />
            </motion.div>

            <MouseTrail color={genshinColors.cyan} symbol={isDark ? '❄️' : '⚡'} />
            <ConstellationGrid color={genshinColors.cyan} isDark={isDark} />
            <CelestialDrift color={isDark ? '#fff' : genshinColors.cyan} />
            <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 3 + i, repeat: Infinity }}
                        style={{
                            position: 'absolute',
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            fontSize: '30px',
                            filter: `drop-shadow(0 0 10px ${genshinColors.cyan})`
                        }}
                    >
                        {isDark ? '❄️' : '⚡'}
                    </motion.div>
                ))}
            </Box>
            <GenshinParticles />


            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <GenshinReveal>
                    <Box sx={{ textAlign: 'center', mb: 12 }}>
                        <Typography
                            component={motion.p}
                            animate={{ opacity: [0.4, 1, 0.4], letterSpacing: [8, 12, 8] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            variant="h6"
                            sx={{ color: genshinColors.cyan, mb: 2, fontWeight: 300 }}
                        >
                            CHARACTER ARCHIVE // TEYVAT
                        </Typography>
                        <Box sx={{ position: 'relative', display: 'inline-block' }}>
                            <Typography variant="h1" sx={{
                                fontWeight: 900,
                                letterSpacing: 8,
                                fontSize: { xs: '3.5rem', md: '6rem' },
                                textShadow: isDark
                                    ? `0 0 50px rgba(129, 212, 250, 0.5)`
                                    : `0 0 50px rgba(186, 104, 200, 0.5)`,
                                lineHeight: 1
                            }}>
                                SANATSU RYUU
                            </Typography>
                            <motion.div
                                animate={{ width: ['0%', '100%', '0%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                style={{
                                    height: '2px',
                                    background: genshinColors.gold,
                                    marginTop: '8px',
                                    marginInline: 'auto'
                                }}
                            />
                        </Box>
                    </Box>
                </GenshinReveal>

                <Grid container spacing={5}>
                    <Grid size={{ xs: 12 }}>
                        <GenshinReveal delay={0.2}>
                            <Paper sx={cardStyle}>
                                <CornerOrnament position="tl" color={genshinColors.gold} />
                                <CornerOrnament position="br" color={genshinColors.gold} />
                                <Typography variant="h5" sx={{ color: genshinColors.gold, mb: 3, display: 'flex', alignItems: 'center', gap: 2, fontWeight: 'bold', letterSpacing: 2 }}>
                                    <AutoAwesomeIcon /> BASE ATTRIBUTES
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '1.25rem', lineHeight: 1.8, opacity: 0.9, fontWeight: 300 }}>
                                    A master of digital arts, weaving <span style={{ color: genshinColors.cyan, fontWeight: 600 }}>Celestial Interfaces</span>
                                    and <span style={{ color: genshinColors.gold, fontWeight: 600 }}>Unshakable Backend Kernels</span>.
                                    Traveler through the vast ecosystems of React and Node.js.
                                </Typography>
                            </Paper>
                        </GenshinReveal>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                        <GenshinReveal delay={0.4}>
                            <Paper sx={{ ...cardStyle, height: '100%' }}>
                                <CornerOrnament position="tl" color={genshinColors.gold} />
                                <CornerOrnament position="tr" color={genshinColors.gold} />
                                <Typography variant="h5" sx={{ color: genshinColors.gold, mb: 4, display: 'flex', alignItems: 'center', gap: 2, fontWeight: 'bold' }}>
                                    <LandscapeIcon /> CONSTELLATION PATH
                                </Typography>
                                <Stack spacing={5}>
                                    {[
                                        { title: "Archon Architect @ TechHub", date: "2021 \u2014 PRESENT", desc: "Constructed the foundation for global-scale enterprise Ley Lines." },
                                        { title: "Spirit Forger @ WebForge", date: "2018 \u2014 2021", desc: "Forged legendary UI weapons used by millions across the digital realms." }
                                    ].map((xp, i) => (
                                        <Box key={i} sx={{ pl: 4, borderLeft: `1px solid rgba(211, 188, 142, 0.3)`, position: 'relative' }}>
                                            <Box sx={{
                                                position: 'absolute', left: -5, top: 8, width: 9, height: 9,
                                                bgcolor: genshinColors.gold, rotate: '45deg', boxShadow: `0 0 10px ${genshinColors.gold}`
                                            }} />
                                            <Typography variant="h6" sx={{ color: genshinColors.textMain, fontWeight: 700 }}>{xp.title}</Typography>
                                            <Typography variant="caption" sx={{ color: genshinColors.gold, letterSpacing: 1 }}>{xp.date}</Typography>
                                            <Typography variant="body2" sx={{ mt: 1.5, opacity: 0.7, fontWeight: 300 }}>{xp.desc}</Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        </GenshinReveal>
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        <GenshinReveal delay={0.6}>
                            <Paper sx={{ ...cardStyle, height: '100%' }}>
                                <CornerOrnament position="tr" color={genshinColors.gold} />
                                <CornerOrnament position="bl" color={genshinColors.gold} />
                                <Typography variant="h5" sx={{ color: genshinColors.gold, mb: 4, display: 'flex', alignItems: 'center', gap: 2, fontWeight: 'bold' }}>
                                    <StarsIcon /> COMBAT TALENTS
                                </Typography>
                                <Stack spacing={3}>
                                    {skills.map((skill) => (
                                        <Box
                                            key={skill.name}
                                            onMouseEnter={() => {
                                                setHoveredSkill(skill.name);
                                                soundManager.playClick();
                                            }}
                                            onMouseLeave={() => setHoveredSkill(null)}
                                            sx={{
                                                position: 'relative',
                                                p: 1.5,
                                                bgcolor: hoveredSkill === skill.name ? 'rgba(255,255,255,0.1)' : 'transparent',
                                                border: `1px solid ${hoveredSkill === skill.name ? genshinColors.gold : 'transparent'}`,
                                                transition: 'all 0.2s',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {hoveredSkill === skill.name && (
                                                <motion.div
                                                    layoutId="elemental-reaction"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    style={{
                                                        position: 'absolute',
                                                        inset: 0,
                                                        border: `2px solid ${skill.element === 'Anemo' ? genshinColors.cyan : skill.element === 'Geo' ? genshinColors.gold : genshinColors.purple}`,
                                                        boxShadow: `0 0 15px ${skill.element === 'Anemo' ? genshinColors.cyan : skill.element === 'Geo' ? genshinColors.gold : genshinColors.purple}`,
                                                        pointerEvents: 'none'
                                                    }}
                                                />
                                            )}
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                                                <Stack direction="row" spacing={1.5} alignItems="center">
                                                    <Box sx={{
                                                        color: skill.element === 'Anemo' ? genshinColors.cyan : skill.element === 'Geo' ? genshinColors.gold : genshinColors.purple,
                                                        filter: hoveredSkill === skill.name ? `drop-shadow(0 0 8px currentColor)` : 'none',
                                                        transition: '0.3s'
                                                    }}>
                                                        {skill.icon}
                                                    </Box>
                                                    <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>{skill.name}</Typography>
                                                </Stack>
                                                <Typography variant="caption" sx={{ color: genshinColors.gold, fontWeight: 600 }}>LVL 10</Typography>
                                            </Box>
                                            <Rating
                                                value={skill.level}
                                                readOnly
                                                size="small"
                                                icon={<StarsIcon fontSize="inherit" sx={{ color: skill.element === 'Anemo' ? genshinColors.cyan : genshinColors.gold }} />}
                                                emptyIcon={<StarsIcon fontSize="inherit" sx={{ opacity: 0.1 }} />}
                                            />
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        </GenshinReveal>
                    </Grid>
                </Grid>


            </Container>
        </Box>
    );
}

