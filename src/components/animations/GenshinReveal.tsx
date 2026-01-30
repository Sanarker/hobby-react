import React, { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Box, useTheme } from '@mui/material';

interface GenshinRevealProps {
    children: ReactNode;
    delay?: number;
}

export const GenshinReveal = ({ children, delay = 0 }: GenshinRevealProps) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark'; // Dark = Ayaka (Cryo), Light = Keqing (Electro)

    const elements = isDark
        ? { color: '#b2ebf2', particle: '❄️' } // Ayaka
        : { color: '#e1bee7', particle: '⚡' }; // Keqing

    return (
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            <motion.div
                initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                <Box sx={{ width: '100%' }}>
                    {children}
                </Box>
            </motion.div>

            {/* Pointed Diagonal Slash Reveal */}
            <motion.div
                initial={{ left: '-100%', top: '-100%', skewX: -45 }}
                whileInView={{ left: '200%', top: '200%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: delay, ease: "circOut" }}
                style={{
                    position: 'absolute',
                    width: '150%',
                    height: '300%',
                    background: `linear-gradient(90deg, transparent, ${elements.color}, #fff, transparent)`,
                    zIndex: 2,
                    pointerEvents: 'none'
                }}
            />

            {/* Character Particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.2, 0.8],
                        x: [0, (i - 2) * 40],
                        y: [0, -60 - (i * 10)]
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: delay + 0.3 + (i * 0.1) }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        fontSize: '20px',
                        zIndex: 3,
                        pointerEvents: 'none'
                    }}
                >
                    {elements.particle}
                </motion.div>
            ))}
        </div>
    );
};

