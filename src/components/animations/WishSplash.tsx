import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, useTheme } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import { soundManager } from '../../utils/SoundManager';
import { useEffect } from 'react';

export const WishSplash = ({ onComplete }: { onComplete: () => void }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const character = isDark
        ? { name: 'KAMISATO AYAKA', title: 'FROSTFLAKE HERON', color: '#81d4fa', shadow: '#fff' }
        : { name: 'KEQING', title: 'DRIVING THUNDER', color: '#ce93d8', shadow: '#ba68c8' };

    useEffect(() => {
        soundManager.playWish();
        const timer = setTimeout(onComplete, 5000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <Box sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            bgcolor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            {/* Background Symbols */}
            <Box sx={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            fontSize: '40px',
                            color: character.color
                        }}
                    >
                        {isDark ? '❄️' : '⚡'}
                    </motion.div>
                ))}
            </Box>

            {/* Meteor Fall */}
            <motion.div
                initial={{ top: '-10%', left: '110%', rotate: -45 }}
                animate={{ top: '110%', left: '-10%' }}
                transition={{ duration: 1.5, ease: "easeIn" }}
                style={{
                    position: 'absolute',
                    width: '6px',
                    height: '400px',
                    background: `linear-gradient(to bottom, transparent, #fff, ${character.color})`,
                    boxShadow: `0 0 50px ${character.color}`,
                    zIndex: 2
                }}
            />

            {/* Elemental Splash */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 5], opacity: [0, 1, 0] }}
                transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                style={{
                    position: 'absolute',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${character.color} 0%, transparent 70%)`,
                    zIndex: 1
                }}
            />

            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.5, duration: 0.8 }}
                    style={{ textAlign: 'center', zIndex: 3 }}
                >
                    <StarsIcon sx={{ color: character.color, fontSize: 80, mb: 2, filter: `drop-shadow(0 0 20px ${character.color})` }} />
                    <Typography variant="h2" sx={{
                        color: '#fff',
                        fontWeight: 900,
                        letterSpacing: { xs: 5, md: 10 },
                        textShadow: `0 0 30px ${character.shadow}`
                    }}>
                        SANATSU RYUU
                    </Typography>
                    <Typography variant="h5" sx={{ color: character.color, mt: 1, opacity: 0.9, fontWeight: 300, letterSpacing: 4 }}>
                        {character.title}
                    </Typography>
                </motion.div>
            </AnimatePresence>

            {/* Interaction Message */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 3.5 }}
                style={{ position: 'absolute', bottom: 100 }}
            >
                <Typography variant="overline" sx={{ color: '#fff', opacity: 0.5 }}>
                    TAP ANYWHERE TO CONTINUE
                </Typography>
            </motion.div>

            {/* Skip Button */}
            <Box
                onClick={onComplete}
                sx={{
                    position: 'absolute',
                    top: 40,
                    right: 40,
                    color: 'rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                    '&:hover': { color: '#fff' },
                    zIndex: 10
                }}
            >
                <Typography variant="button">SKIP &gt;&gt;</Typography>
            </Box>
        </Box>
    );
};

