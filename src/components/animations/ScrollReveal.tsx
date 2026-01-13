import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    width?: "fit-content" | "100%";
}

export const ScrollReveal = ({ children, width = "fit-content" }: ScrollRevealProps) => {
    return (
        <div style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.1 }}
            >
                {children}
            </motion.div>
        </div>
    );
};
