import { Container, Typography, Paper, Box, Grid, Chip, Divider } from '@mui/material';
import { ScrollReveal } from '../components/animations/ScrollReveal';

export default function Resume() {
    const skills = ["React", "TypeScript", "Material UI", "Framer Motion", "Node.js", "Vite", "React Router"];

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <ScrollReveal width="100%">
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="h2" fontWeight="bold" gutterBottom>
                        Sanatsu Ryuu
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        Senior Full Stack Developer
                    </Typography>
                </Box>
            </ScrollReveal>

            <ScrollReveal width="100%">
                <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                    <Typography variant="h4" gutterBottom>Professional Summary</Typography>
                    <Typography variant="body1">
                        Passionate developer with 5+ years of experience building modern web applications.
                        Focused on creating intuitive user experiences with cutting-edge technologies.
                    </Typography>
                </Paper>
            </ScrollReveal>

            <ScrollReveal width="100%">
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>Experience</Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6">Lead Developer @ TechCorp</Typography>
                        <Typography variant="subtitle2" color="text.secondary">2021 — Present</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            - Led the migration from monolithic to micro-frontend architecture.
                            - Optimized build times by 40% using Vite and modularization.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6">Software Engineer @ WebSolutions</Typography>
                        <Typography variant="subtitle2" color="text.secondary">2018 — 2021</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            - Developed and maintained responsive web applications for international clients.
                            - Collaborated with UI/UX designers to implement high-fidelity prototypes.
                        </Typography>
                    </Box>
                </Box>
            </ScrollReveal>

            <ScrollReveal width="100%">
                <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                    <Typography variant="h4" gutterBottom>Technical Skills</Typography>
                    <Grid container spacing={1}>
                        {skills.map((skill) => (
                            <Grid key={skill}>
                                <Chip label={skill} color="primary" variant="outlined" />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </ScrollReveal>

            <ScrollReveal width="100%">
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" gutterBottom>Education</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="h6">Bachelor of Science in Computer Science</Typography>
                    <Typography variant="subtitle1">University of Technology, 2018</Typography>
                </Box>
            </ScrollReveal>
        </Container>
    );
}
