import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box } from '@mui/material';

interface RaidenBurstProps {
    isActive: boolean;
    onComplete: () => void;
}

export const RaidenBurst = ({ isActive, onComplete }: RaidenBurstProps) => {
    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(onComplete, 1500);
            return () => clearTimeout(timer);
        }
    }, [isActive, onComplete]);

    return (
        <AnimatePresence>
            {isActive && (
                <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, pointerEvents: 'none' }}>
                    {/* Darkening & Inversion Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.9, 0.9, 0],
                            filter: ['invert(0)', 'invert(0)', 'invert(1)', 'invert(0)']
                        }}
                        transition={{ duration: 1.2, times: [0, 0.1, 0.2, 1] }}
                        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)' }}
                    />

                    {/* Musou Jagged Tear */}
                    <Box sx={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%) rotate(-15deg)',
                        width: '120vw', height: '100px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <svg width="100%" height="200" viewBox="0 0 1000 200" preserveAspectRatio="none">
                            <motion.path
                                d="M0,100 L150,90 L300,110 L450,85 L600,115 L750,95 L1000,105 L1000,95 L750,85 L600,105 L450,75 L300,90 L150,80 L0,100 Z"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: [0, 1, 1],
                                    opacity: [0, 1, 1, 0],
                                    fill: ['#fff', '#fff', '#e100ff']
                                }}
                                transition={{ duration: 0.6, times: [0, 0.3, 1], ease: "easeOut" }}
                                style={{
                                    stroke: '#fff',
                                    strokeWidth: 2,
                                    filter: 'drop-shadow(0 0 20px #9c27b0) drop-shadow(0 0 40px #e100ff)'
                                }}
                            />
                        </svg>
                    </Box>

                    {/* Spatial Fragments (Shards) */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={`shard-${i}`}
                            initial={{
                                x: '50%', y: '50%',
                                opacity: 0, scale: 0,
                                rotate: Math.random() * 360
                            }}
                            animate={{
                                x: `${50 + (Math.random() - 0.5) * 150}%`,
                                y: `${50 + (Math.random() - 0.5) * 150}%`,
                                opacity: [0, 1, 0],
                                scale: [0, Math.random() * 2 + 1, 0],
                                rotate: Math.random() * 720
                            }}
                            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                            style={{
                                position: 'absolute',
                                width: Math.random() * 30 + 10,
                                height: Math.random() * 30 + 10,
                                background: 'rgba(255, 255, 255, 0.9)',
                                clipPath: 'polygon(20% 0%, 100% 40%, 70% 100%, 0% 70%)',
                                boxShadow: '0 0 15px #e100ff',
                                zIndex: 10000
                            }}
                        />
                    ))}

                    {/* Impact Shockwave */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 4], opacity: [0, 1, 0] }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                            position: 'absolute', top: '50%', left: '50%',
                            width: '200px', height: '200px',
                            borderRadius: '50%',
                            border: '5px solid #fff',
                            boxShadow: '0 0 50px #9c27b0',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />

                    {/* Electro Flash Tendrils */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={`tendril-${i}`}
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: [0, 1, 0], scaleY: [0, 1, 0.5] }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            style={{
                                position: 'absolute',
                                top: '50%', left: `${20 + i * 10}%`,
                                width: '2px', height: '300px',
                                background: '#fff',
                                rotate: `${(Math.random() - 0.5) * 45}deg`,
                                boxShadow: '0 0 20px #9c27b0'
                            }}
                        />
                    ))}
                </Box>
            )}
        </AnimatePresence>
    );
};

// Chakra Desiderata Background Effect
export const ChakraRing = () => {
    return (
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            border: '2px solid rgba(156, 39, 176, 0.1)',
            pointerEvents: 'none',
            zIndex: 0,
            '&::after': {
                content: '""',
                position: 'absolute',
                inset: -20,
                borderRadius: '50%',
                border: '1px dashed rgba(156, 39, 176, 0.2)',
                animation: 'rotate 60s linear infinite'
            },
            '@keyframes rotate': {
                from: { rotate: '0deg' },
                to: { rotate: '360deg' }
            }
        }}>
            {/* Resolve Nodes */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '8px',
                        height: '8px',
                        background: '#9c27b0',
                        borderRadius: '50%',
                        boxShadow: '0 0 10px #9c27b0',
                        transform: `rotate(${i * 30}deg) translateY(-300px)`
                    }}
                />
            ))}
        </Box>
    );
};
