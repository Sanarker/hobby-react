import { motion } from 'framer-motion';


interface LeoRevealProps {
    children: React.ReactNode;
    delay?: number;
    isLeo?: boolean;
}

export const LeoReveal = ({ children, delay = 0, isLeo = false }: LeoRevealProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: isLeo ? ['blur(10px)', 'blur(0px)'] : 'none'
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.34, 1.56, 0.64, 1]
            }}
            style={{ width: '100%', position: 'relative' }}
        >
            {children}
            {/* Cinematic Shadow Sweep */}
            <motion.div
                initial={{ x: '-100%' }}
                whileInView={{ x: '200%' }}
                transition={{ duration: 0.8, delay: delay + 0.2 }}
                viewport={{ once: true }}
                style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '50%', height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    zIndex: 2,
                    pointerEvents: 'none',
                    skewX: -20
                }}
            />
        </motion.div>
    );
};
