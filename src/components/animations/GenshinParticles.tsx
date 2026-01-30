import { motion } from 'framer-motion';
import { Box } from '@mui/material';

export const GenshinParticles = () => {
    const particles = [...Array(15)];

    return (
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0 }}>
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: `${Math.random() * 100}%`,
                        y: `${Math.random() * 100}%`,
                        opacity: 0,
                        scale: Math.random() * 0.5 + 0.5
                    }}
                    animate={{
                        y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                        opacity: [0, 0.4, 0],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        width: '6px',
                        height: '6px',
                        background: i % 2 === 0 ? '#4db6ac' : '#d3bc8e',
                        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // Diamond shape
                        boxShadow: `0 0 10px ${i % 2 === 0 ? '#4db6ac' : '#d3bc8e'}`
                    }}
                />
            ))}
        </Box>
    );
};
