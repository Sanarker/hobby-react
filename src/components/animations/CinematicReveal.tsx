import { motion } from 'framer-motion';

interface CinematicRevealProps {
    children: React.ReactNode;
    delay?: number;
    type?: 'mass' | 'fade' | 'slide';
}

export const CinematicReveal = ({ children, delay = 0, type = 'mass' }: CinematicRevealProps) => {
    const variants = {
        mass: {
            initial: { opacity: 0, scale: 0.8, filter: 'brightness(2)' },
            animate: { opacity: 1, scale: 1, filter: 'brightness(1)' },
            transition: { duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] } as any
        },
        fade: {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay, ease: 'easeOut' }
        },
        slide: {
            initial: { opacity: 0, x: -50 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.5, delay, ease: 'easeOut' }
        }
    };

    return (
        <motion.div
            initial={variants[type].initial}
            whileInView={variants[type].animate}
            viewport={{ once: true, amount: 0.2 }}
            transition={variants[type].transition}
            style={{ width: '100%' }}
        >
            {children}
            {/* Cinematic Lens Flare Flash */}
            {type === 'mass' && (
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: [0, 0.8, 0], scaleX: [0, 1.5] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: delay + 0.1 }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '-25%',
                        width: '150%',
                        height: '4px',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                        zIndex: 2,
                        pointerEvents: 'none'
                    }}
                />
            )}
        </motion.div>
    );
};
