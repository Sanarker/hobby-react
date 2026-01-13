import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface PokeRevealProps {
    children: ReactNode;
    delay?: number;
}

export const PokeReveal = ({ children, delay = 0 }: PokeRevealProps) => {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: 'brightness(2) contrast(1.2)' }}
            whileInView={{ scale: 1, opacity: 1, filter: 'brightness(1) contrast(1)' }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay,
                duration: 0.3
            }}
            viewport={{ once: false, amount: 0.2 }}
            style={{
                width: '100%',
                boxShadow: '0 0 20px rgba(0, 168, 107, 0.3)' // Emerald glow
            }}
        >
            <motion.div
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};
