import { motion } from 'framer-motion';
import { Box } from '@mui/material';

interface IceBloodParticlesProps {
    isBloody: boolean;
}

export const IceBloodParticles = ({ isBloody }: IceBloodParticlesProps) => {
    return (
        <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {[...Array(50)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: `${Math.random() * 100}%`,
                        y: -20,
                        opacity: Math.random() * 0.5 + 0.3,
                        scale: Math.random() * 0.5 + 0.2
                    }}
                    animate={{
                        y: '110vh',
                        x: `${(Math.random() * 10 - 5) + (i % 2 === 0 ? 5 : -5)}%`,
                        rotate: 360
                    }}
                    transition={{
                        duration: Math.random() * 10 + 5,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: Math.random() * 10
                    }}
                    style={{
                        position: 'absolute',
                        width: isBloody ? '6px' : '4px',
                        height: isBloody ? '10px' : '4px',
                        background: isBloody ? '#d32f2f' : '#fff',
                        borderRadius: isBloody ? '50% 50% 20% 20%' : '50%',
                        boxShadow: isBloody ? '0 0 10px #d32f2f' : '0 0 5px #fff',
                        filter: isBloody ? 'blur(1px)' : 'none'
                    }}
                />
            ))}
        </Box>
    );
};
