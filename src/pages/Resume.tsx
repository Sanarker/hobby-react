import { useRef, useState } from 'react';
import { Container, Typography, Box, Stack, Chip, Grid } from '@mui/material';
import type { Theme } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
    PersonOutlined as AboutIcon,
    WorkOutlined as ExperienceIcon,
    PsychologyOutlined as SkillsIcon,
    SchoolOutlined as EducationIcon,
    CodeOutlined as ProjectsIcon,
    VerifiedOutlined as CertIcon,
    LanguageOutlined as LangIcon,
    FavoriteBorderOutlined as HeartIcon
} from '@mui/icons-material';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
} as const;

const KineticText = ({ text }: { text: string }) => {
    const letters = Array.from(text);
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 200,
            },
        },
    };

    return (
        <Box
            component={motion.div}
            sx={{ display: 'flex', overflow: 'hidden' }}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                    {letter}
                </motion.span>
            ))}
        </Box>
    );
};

interface SpotlightCardProps {
    children: React.ReactNode;
    style?: any;
}

const SpotlightCard = ({ children, style }: SpotlightCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // 3D Parallax Tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
        setMousePos({ x: mouseX, y: mouseY });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        setMousePos({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
    };

    return (
        <motion.div
            style={{
                perspective: "1000px",
            }}
            whileTap={{ scale: 0.98 }}
        >
            <Box
                ref={cardRef}
                className="spotlight-card"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseEnter={() => setIsHovered(true)}
                onTouchStart={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onTouchEnd={handleMouseLeave}
                component={motion.div}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 4,
                    bgcolor: 'action.hover',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid',
                    borderColor: 'transparent',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.4s ease, background 0.4s ease',
                    ...style,
                    '&:hover': {
                        background: (theme: Theme) => `
                            linear-gradient(${theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.4)' : 'rgba(255,255,255,0.8)'}, ${theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.4)' : 'rgba(255,255,255,0.8)'}) padding-box,
                            linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%) border-box
                        `,
                        borderColor: 'transparent',
                        boxShadow: (theme: Theme) => theme.palette.mode === 'dark'
                            ? `0 20px 40px -20px ${theme.palette.primary.main}44`
                            : `0 20px 40px -20px rgba(0,0,0,0.1)`,
                        '& .section-icon': {
                            transform: 'scale(1.2) rotate(5deg) translateZ(20px)',
                            color: 'primary.main',
                            opacity: 1
                        }
                    }
                }}
            >
                {/* Spotlight Glow Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        pointerEvents: 'none',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                        background: (theme: Theme) => `
                            radial-gradient(
                                600px circle at ${mousePos.x}px ${mousePos.y}px, 
                                ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)'}, 
                                transparent 40%
                            )
                        `,
                        zIndex: 0
                    }}
                />
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        transform: isHovered ? "translateZ(30px) scale(1.05)" : "translateZ(30px) scale(1)",
                        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                >
                    {children}
                </Box>
            </Box>
        </motion.div>
    );
};

export default function Resume() {
    const skills = [
        "React", "TypeScript", "Material UI", "Framer Motion",
        "Node.js", "Vite", "React Router", "PostgreSQL",
        "Docker", "AWS", "CI/CD", "Redis"
    ];

    const projects = [
        {
            title: "OpenCloud Infrastructure",
            role: "Core Contributor",
            desc: "Designed and implemented scalable micro-services handling 1M+ requests daily using Node.js and Kubernetes.",
            tech: ["Kubernetes", "Node.js", "gRPC"]
        },
        {
            title: "EcoTrack Mobile",
            role: "Lead Frontend",
            desc: "Built a high-performance carbon footprint tracking app with React Native and real-time visualization.",
            tech: ["React Native", "D3.js", "Firebase"]
        }
    ];

    const certifications = [
        "AWS Certified Solutions Architect – Associate",
        "Meta Front-End Developer Professional Certificate",
        "Google Cloud Professional Cloud Developer"
    ];

    const languages = [
        { name: "English", level: "Native / Bilingual" },
        { name: "Japanese", level: "Native / Bilingual" },
        { name: "German", level: "Elementary" }
    ];

    const statusPulse = {
        '@keyframes pulse': {
            '0%': { transform: 'scale(0.95)', opacity: 0.5 },
            '50%': { transform: 'scale(1.2)', opacity: 1 },
            '100%': { transform: 'scale(0.95)', opacity: 0.5 },
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            color: 'text.primary',
            py: 10,
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Living Background Decor */}
            <motion.div
                animate={{
                    x: [0, 50, -30, 0],
                    y: [0, -50, 40, 0],
                    scale: [1, 1.1, 0.9, 1]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{ position: 'absolute', top: '10%', right: '5%', zIndex: 0, opacity: 0.05 }}
            >
                <Box sx={{
                    width: { xs: 300, md: 500 }, height: { xs: 300, md: 500 },
                    borderRadius: '50%', background: 'primary.main',
                    filter: 'blur(100px)'
                }} />
            </motion.div>

            <motion.div
                animate={{
                    x: [0, -40, 60, 0],
                    y: [0, 60, -50, 0],
                    scale: [1, 0.9, 1.2, 1]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{ position: 'absolute', bottom: '10%', left: '5%', zIndex: 0, opacity: 0.05 }}
            >
                <Box sx={{
                    width: { xs: 350, md: 600 }, height: { xs: 350, md: 600 },
                    borderRadius: '50%', background: 'secondary.main',
                    filter: 'blur(120px)'
                }} />
            </motion.div>

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header Section */}
                    <motion.div variants={itemVariants}>
                        <Box sx={{ mb: { xs: 6, md: 10 }, textAlign: 'left' }}>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                                <Typography
                                    variant="h2"
                                    fontWeight="800"
                                    component="div"
                                    sx={{
                                        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        letterSpacing: { xs: -1, md: -2 },
                                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                                        lineHeight: 1.1,
                                    }}
                                >
                                    <KineticText text="Sanatsu Ryuu" />
                                </Typography>
                                <Box sx={{
                                    width: 12, height: 12,
                                    bgcolor: '#4caf50',
                                    borderRadius: '50%',
                                    ...statusPulse,
                                    animation: 'pulse 2s infinite ease-in-out',
                                    display: { xs: 'none', sm: 'block' },
                                    boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)'
                                }} />
                            </Stack>
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{
                                    fontWeight: 500,
                                    letterSpacing: { xs: 2, md: 4 },
                                    textTransform: 'uppercase',
                                    opacity: 0.7,
                                    fontSize: { xs: '0.8rem', md: '1rem' }
                                }}
                            >
                                Senior Full Stack Developer
                            </Typography>
                        </Box>
                    </motion.div>

                    <Stack spacing={4}>
                        {/* Summary Section */}
                        <motion.div variants={itemVariants}>
                            <SpotlightCard>
                                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
                                    <AboutIcon className="section-icon" sx={{ fontSize: { xs: 18, md: 20 }, color: 'primary.main', opacity: 0.7, transition: 'all 0.4s ease' }} />
                                    <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 2, color: 'text.secondary', fontSize: { xs: '0.65rem', md: '0.75rem' } }}>
                                        About
                                    </Typography>
                                </Stack>
                                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'text.secondary' }}>
                                    Passionate developer with 5+ years of experience building modern web applications.
                                    Focused on creating intuitive user experiences with cutting-edge technologies and clean code practices.
                                </Typography>
                            </SpotlightCard>
                        </motion.div>

                        {/* Experience Section */}
                        <motion.div variants={itemVariants}>
                            <SpotlightCard>
                                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                                    <ExperienceIcon className="section-icon" sx={{ fontSize: { xs: 18, md: 20 }, color: 'primary.main', opacity: 0.7, transition: 'all 0.4s ease' }} />
                                    <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 2, color: 'text.secondary', fontSize: { xs: '0.65rem', md: '0.75rem' } }}>
                                        Experience
                                    </Typography>
                                </Stack>
                                <Stack spacing={4}>
                                    <Box>
                                        <Typography variant="h6" fontWeight="700" sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>Lead Developer @ TechCorp</Typography>
                                        <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 700, fontSize: '0.875rem' }}>2021 — Present</Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: { xs: '0.85rem', md: '0.875rem' } }}>
                                            • Led the migration from monolithic to micro-frontend architecture.<br />
                                            • Optimized build times by 40% using Vite and modularization.
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="h6" fontWeight="700" sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>Software Engineer @ WebSolutions</Typography>
                                        <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 700, fontSize: '0.875rem' }}>2018 — 2021</Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: { xs: '0.85rem', md: '0.875rem' } }}>
                                            • Developed and maintained responsive web applications for international clients.<br />
                                            • Collaborated with UI/UX designers to implement high-fidelity prototypes.
                                        </Typography>
                                    </Box>
                                </Stack>
                            </SpotlightCard>
                        </motion.div>

                        {/* Projects Section */}
                        <motion.div variants={itemVariants}>
                            <SpotlightCard>
                                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                                    <ProjectsIcon className="section-icon" sx={{ fontSize: { xs: 18, md: 20 }, color: 'primary.main', opacity: 0.7, transition: 'all 0.4s ease' }} />
                                    <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 2, color: 'text.secondary', fontSize: { xs: '0.65rem', md: '0.75rem' } }}>
                                        Projects
                                    </Typography>
                                </Stack>
                                <Grid container spacing={3}>
                                    {projects.map((proj) => (
                                        <Grid size={{ xs: 12 }} key={proj.title}>
                                            <Typography variant="h6" fontWeight="700" sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>{proj.title}</Typography>
                                            <Typography variant="subtitle2" color="primary" sx={{ mb: 1, fontWeight: 700, fontSize: '0.875rem' }}>{proj.role}</Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7, fontSize: { xs: '0.85rem', md: '0.875rem' } }}>{proj.desc}</Typography>
                                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                                {proj.tech.map(t => (
                                                    <Typography key={t} variant="caption" sx={{ color: 'text.disabled', fontWeight: 800, fontSize: '0.7rem' }}>#{t}</Typography>
                                                ))}
                                            </Stack>
                                        </Grid>
                                    ))}
                                </Grid>
                            </SpotlightCard>
                        </motion.div>

                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 7 }}>
                                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                    <SpotlightCard style={{ height: '100%', boxSizing: 'border-box' }}>
                                        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
                                            <CertIcon className="section-icon" sx={{ fontSize: { xs: 18, md: 20 }, color: 'primary.main', opacity: 0.7, transition: 'all 0.4s ease' }} />
                                            <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 2, color: 'text.secondary', fontSize: { xs: '0.65rem', md: '0.75rem' } }}>
                                                Certifications
                                            </Typography>
                                        </Stack>
                                        <Stack spacing={2.5}>
                                            {certifications.map(cert => (
                                                <Box key={cert}>
                                                    <Typography variant="body2" fontWeight="700" color="text.primary" sx={{ fontSize: '0.9rem' }}>{cert}</Typography>
                                                    <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 500 }}>Professional Accreditation</Typography>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </SpotlightCard>
                                </motion.div>
                            </Grid>
                            <Grid size={{ xs: 12, md: 5 }}>
                                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                    <SpotlightCard style={{ height: '100%', boxSizing: 'border-box' }}>
                                        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
                                            <LangIcon className="section-icon" sx={{ fontSize: { xs: 18, md: 20 }, color: 'primary.main', opacity: 0.7, transition: 'all 0.4s ease' }} />
                                            <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 2, color: 'text.secondary', fontSize: { xs: '0.65rem', md: '0.75rem' } }}>
                                                Languages
                                            </Typography>
                                        </Stack>
                                        <Stack spacing={2}>
                                            {languages.map(lang => (
                                                <Box key={lang.name}>
                                                    <Typography variant="body2" fontWeight="700" sx={{ fontSize: '0.9rem' }}>{lang.name}</Typography>
                                                    <Typography variant="caption" color="primary" sx={{ fontWeight: 800, opacity: 0.8, fontSize: '0.75rem' }}>{lang.level}</Typography>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </SpotlightCard>
                                </motion.div>
                            </Grid>
                        </Grid>

                        {/* Skills Section */}
                        <motion.div variants={itemVariants}>
                            <SpotlightCard>
                                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
                                    <SkillsIcon className="section-icon" sx={{ fontSize: { xs: 18, md: 20 }, color: 'primary.main', opacity: 0.7, transition: 'all 0.4s ease' }} />
                                    <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 2, color: 'text.secondary', fontSize: { xs: '0.65rem', md: '0.75rem' } }}>
                                        Technical Skills
                                    </Typography>
                                </Stack>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25 }}>
                                    {skills.map((skill) => (
                                        <motion.div
                                            key={skill}
                                            whileHover={{ scale: 1.08 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 12 }}
                                        >
                                            <Chip
                                                label={skill}
                                                size="small"
                                                sx={{
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontWeight: 700,
                                                    bgcolor: 'primary.main',
                                                    color: 'primary.contrastText',
                                                    border: 'none',
                                                    fontSize: { xs: '0.75rem', md: '0.8125rem' },
                                                    '&:hover': {
                                                        bgcolor: 'primary.dark',
                                                    }
                                                }}
                                            />
                                        </motion.div>
                                    ))}
                                </Box>
                            </SpotlightCard>
                        </motion.div>

                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                    <SpotlightCard style={{ height: '100%', boxSizing: 'border-box' }}>
                                        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
                                            <EducationIcon className="section-icon" sx={{ fontSize: { xs: 18, md: 20 }, color: 'primary.main', opacity: 0.7, transition: 'all 0.4s ease' }} />
                                            <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 2, color: 'text.secondary', fontSize: { xs: '0.65rem', md: '0.75rem' } }}>
                                                Education
                                            </Typography>
                                        </Stack>
                                        <Typography variant="h6" fontWeight="700" sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}>BS in Computer Science</Typography>
                                        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>University of Technology, 2018</Typography>
                                    </SpotlightCard>
                                </motion.div>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                    <SpotlightCard style={{ height: '100%', boxSizing: 'border-box' }}>
                                        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
                                            <HeartIcon className="section-icon" sx={{ fontSize: { xs: 18, md: 20 }, color: 'primary.main', opacity: 0.7, transition: 'all 0.4s ease' }} />
                                            <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 2, color: 'text.secondary', fontSize: { xs: '0.65rem', md: '0.75rem' } }}>
                                                Interests
                                            </Typography>
                                        </Stack>
                                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: { xs: '0.85rem', md: '0.875rem' } }}>
                                            • Open Source Collaboration<br />
                                            • Deep Learning & AI Ethics<br />
                                            • Strategic Chess & Photography
                                        </Typography>
                                    </SpotlightCard>
                                </motion.div>
                            </Grid>
                        </Grid>
                    </Stack>
                </motion.div>
            </Container>
        </Box>
    );
}
