import { Container, Typography, Paper, Box, Stack, Chip, Divider, useTheme } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { MouseTrail } from '../components/animations/MouseTrail';

const getGlassStyle = (isDark: boolean) => ({
    background: isDark ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
    boxShadow: isDark ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)' : '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
    p: 4, mb: 4,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: isDark ? '0 12px 40px 0 rgba(0, 0, 0, 0.4)' : '0 12px 40px 0 rgba(31, 38, 135, 0.2)',
    }
});



export default function Resume() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const glassStyle = getGlassStyle(isDark);

    const skills = ["React", "TypeScript", "Material UI", "Framer Motion", "Node.js", "Vite", "React Router"];
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

    return (
        <Box sx={{
            minHeight: '100vh',
            background: isDark
                ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'
                : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            color: 'text.primary',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <MouseTrail color={isDark ? '#90caf9' : '#1976d2'} />
            {/* Background Decor */}
            <Box sx={{ position: 'absolute', top: '10%', right: '5%', zIndex: 0 }}>
                <motion.div
                    style={{ y: y1 }}
                >
                    <Box sx={{
                        width: 300, height: 300,
                        borderRadius: '50%', background: 'rgba(52, 152, 219, 0.1)',
                        filter: 'blur(80px)'
                    }} />
                </motion.div>
            </Box>
            <Box sx={{ position: 'absolute', bottom: '10%', left: '5%', zIndex: 0 }}>
                <motion.div
                    style={{ y: y2 }}
                >
                    <Box sx={{
                        width: 400, height: 400,
                        borderRadius: '50%', background: 'rgba(155, 89, 182, 0.1)',
                        filter: 'blur(100px)'
                    }} />
                </motion.div>
            </Box>

            <Container maxWidth="md" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
                <ScrollReveal width="100%">
                    <Box sx={{ mb: 6, textAlign: 'center' }}>
                        <Typography
                            variant="h2"
                            fontWeight="900"
                            gutterBottom
                            sx={{
                                background: isDark
                                    ? 'linear-gradient(45deg, #90caf9, #fff)'
                                    : 'linear-gradient(45deg, #2c3e50, #000)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: -1
                            }}
                        >
                            Sanatsu Ryuu
                        </Typography>
                        <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Senior Full Stack Developer
                        </Typography>
                    </Box>
                </ScrollReveal>

                <ScrollReveal width="100%">
                    <Paper sx={glassStyle}>
                        <Typography variant="h4" fontWeight="800" gutterBottom color="primary">Professional Summary</Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                            Passionate developer with 5+ years of experience building modern web applications.
                            Focused on creating intuitive user experiences with cutting-edge technologies.
                        </Typography>
                    </Paper>
                </ScrollReveal>

                <ScrollReveal width="100%">
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" fontWeight="800" gutterBottom sx={{ mt: 4 }}>Experience</Typography>
                        <Divider sx={{ mb: 4, bgcolor: 'rgba(0,0,0,0.1)' }} />

                        <Stack spacing={3}>
                            <Paper sx={{ ...glassStyle, p: 3 }}>
                                <Typography variant="h5" fontWeight="bold">Lead Developer @ TechCorp</Typography>
                                <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>2021 — Present</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    • Led the migration from monolithic to micro-frontend architecture.<br />
                                    • Optimized build times by 40% using Vite and modularization.
                                </Typography>
                            </Paper>

                            <Paper sx={{ ...glassStyle, p: 3 }}>
                                <Typography variant="h5" fontWeight="bold">Software Engineer @ WebSolutions</Typography>
                                <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>2018 — 2021</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    • Developed and maintained responsive web applications for international clients.<br />
                                    • Collaborated with UI/UX designers to implement high-fidelity prototypes.
                                </Typography>
                            </Paper>
                        </Stack>
                    </Box>
                </ScrollReveal>

                <ScrollReveal width="100%">
                    <Paper sx={glassStyle}>
                        <Typography variant="h4" fontWeight="800" gutterBottom color="primary">Technical Skills</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                            {skills.map((skill) => (
                                <motion.div key={skill} whileHover={{ scale: 1.1 }}>
                                    <Chip
                                        label={skill}
                                        color="primary"
                                        sx={{
                                            fontWeight: 'bold',
                                            bgcolor: isDark ? 'rgba(144, 202, 249, 0.1)' : 'rgba(25, 118, 210, 0.1)',
                                            color: isDark ? '#90caf9' : '#1976d2',
                                            border: `1px solid ${isDark ? 'rgba(144, 202, 249, 0.2)' : 'rgba(25, 118, 210, 0.2)'}`
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </Box>
                    </Paper>
                </ScrollReveal>

                <ScrollReveal width="100%">
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" fontWeight="800" gutterBottom>Education</Typography>
                        <Divider sx={{ mb: 3 }} />
                        <Paper sx={{ ...glassStyle, p: 3 }}>
                            <Typography variant="h6" fontWeight="bold">Bachelor of Science in Computer Science</Typography>
                            <Typography variant="subtitle1" color="text.secondary">University of Technology, 2018</Typography>
                        </Paper>
                    </Box>
                </ScrollReveal>
            </Container>
        </Box>
    );
}
