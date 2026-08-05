import { useRef, useState, useMemo } from 'react';
import { Container, Typography, Box, Stack, Chip, Grid, Button, IconButton, Snackbar, Alert, TextField, InputAdornment } from '@mui/material';
import type { Theme } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
    PersonOutlined as AboutIcon,
    WorkOutlined as ExperienceIcon,
    PsychologyOutlined as SkillsIcon,
    SchoolOutlined as EducationIcon,
    CodeOutlined as ProjectsIcon,
    LanguageOutlined as LangIcon,
    EmailOutlined as EmailIcon,
    ContentCopy as CopyIcon,
    Check as CheckIcon,
    Launch as LaunchIcon,
    LinkedIn as LinkedInIcon,
    SearchOutlined as SearchIcon,
    PrintOutlined as PrintIcon,
    LocationOnOutlined as LocationIcon,
    PhoneOutlined as PhoneIcon,
    FavoriteBorderOutlined as HeartIcon
} from '@mui/icons-material';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
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
            ease: [0.16, 1, 0.3, 1]
        }
    }
} as const;

const KineticText = ({ text }: { text: string }) => {
    const letters = Array.from(text);
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.03 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 15,
                stiffness: 240,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring" as const,
                damping: 15,
                stiffness: 240,
            },
        },
    };

    return (
        <Box
            component={motion.div}
            sx={{ display: 'flex', overflow: 'hidden', flexWrap: 'wrap' }}
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
    id?: string;
}

const SpotlightCard = ({ children, style, id }: SpotlightCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { damping: 25, stiffness: 250 });
    const mouseYSpring = useSpring(y, { damping: 25, stiffness: 250 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2deg", "-2deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2deg", "2deg"]);

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

    return (
        <motion.div
            id={id}
            style={{ perspective: "1200px" }}
        >
            <Box
                ref={cardRef}
                className="spotlight-card"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                component={motion.div}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 4,
                    bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid',
                    borderColor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease',
                    ...style,
                    '&:hover': {
                        borderColor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(129, 140, 248, 0.35)' : 'rgba(79, 70, 229, 0.25)',
                        boxShadow: (theme: Theme) => theme.palette.mode === 'dark'
                            ? `0 20px 40px -15px rgba(99, 102, 241, 0.15)`
                            : `0 20px 40px -15px rgba(79, 70, 229, 0.08)`,
                        '& .section-icon': {
                            transform: 'scale(1.08)',
                            color: 'primary.main',
                            opacity: 1
                        }
                    }
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        pointerEvents: 'none',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                        background: (theme: Theme) => `
                            radial-gradient(
                                550px circle at ${mousePos.x}px ${mousePos.y}px, 
                                ${theme.palette.mode === 'dark' ? 'rgba(129, 140, 248, 0.06)' : 'rgba(79, 70, 229, 0.04)'}, 
                                transparent 50%
                            )
                        `,
                        zIndex: 0
                    }}
                />
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    {children}
                </Box>
            </Box>
        </motion.div>
    );
};

export default function Resume() {
    const [copied, setCopied] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<string>('All');

    const name = 'Sanarker S';
    const email = 'sanu2097@outlook.com';
    const phone = '(080) 4098-0886';
    const locationStr = 'Tokyo, Japan';
    const linkedinUrl = 'https://www.linkedin.com/in/sanarker/';

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
    };

    const stats = [
        { number: "6+ Yrs", label: "Backend & Platform Exp" },
        { number: "5 Engineers", label: "Team Leadership" },
        { number: "+30%", label: "Deployment Speed" },
        { number: "-25%", label: "Database Latency" },
    ];

    const skillsCategories = {
        Backend: ["Java", "Spring Boot", "Node.js", "Kotlin (working proficiency)", "Microservices Architecture", "RESTful APIs", "Distributed Systems", "Service Reliability & Observability"],
        CloudDevOps: ["AWS (Lambda, S3, EC2, ECS, RDS)", "Microsoft Azure", "Docker", "Kubernetes", "CI/CD Pipelines", "Automation & Custom Scripting"],
        DataStorage: ["RDS", "DynamoDB", "MongoDB", "Database Migration & Optimization"],
        FrontendTools: ["Angular", "React", "TypeScript", "JavaScript", "HTML5", "CSS", "Git", "GitHub", "Bitbucket", "JIRA", "SonarQube", "AEM"],
    };

    const allSkills = useMemo(() => Array.from(new Set(Object.values(skillsCategories).flat())), []);

    const filteredSkills = useMemo(() => {
        let list = activeTab === 'All'
            ? allSkills
            : skillsCategories[activeTab as keyof typeof skillsCategories] || [];

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            list = list.filter(skill => skill.toLowerCase().includes(query));
        }

        return list;
    }, [activeTab, searchQuery, allSkills]);

    const experiences = [
        {
            period: "SEPTEMBER 2022 — PRESENT",
            role: "Software Engineer / Team Lead (Backend & Platform)",
            company: "Tata Consultancy Services (TCS)",
            location: "Tokyo, Japan",
            bullets: [
                "Led a team of 5 engineers to develop and maintain web applications using Spring Boot, Angular, and Node.js, achieving a 30% increase in deployment speed and a 20% boost in user engagement.",
                "Designed microservices architecture for scalable backend systems, utilizing Spring Boot, Kubernetes, and AWS.",
                "Migrated legacy applications from on-premises to AWS cloud (RDS, S3, Lambda), improving system resilience and reducing operational costs.",
                "Implemented CI/CD pipelines, improving deployment efficiency by 30%.",
                "Contributed to backend enhancements using Java and Kotlin, supporting modern JVM-based service development.",
                "Supported production services by monitoring performance, investigating issues, and improving system reliability.",
                "Managed end-to-end API integrations, technical documentation, and cloud deployment strategies, enhancing workflow efficiency."
            ],
            tech: ["Spring Boot", "Java", "Kotlin", "Node.js", "Angular", "AWS (RDS, Lambda, S3)", "Docker", "Kubernetes"]
        },
        {
            period: "JULY 2019 — SEPTEMBER 2022",
            role: "Full Stack Engineer / Module Lead",
            company: "Tata Consultancy Services (TCS)",
            location: "India",
            bullets: [
                "Delivered multiple full-stack projects, focusing on microservices architecture and cloud-based deployments.",
                "Led a team in containerizing applications with Docker & Kubernetes, improving application scalability.",
                "Spearheaded cloud migration projects, successfully moving legacy applications to AWS RDS and DynamoDB, reducing database latency by 25%.",
                "Conducted requirement analysis and high/low-level system designs, leading to a 15% increase in project delivery efficiency.",
                "Achieved 100% code quality standards by implementing test automation in CI/CD pipelines.",
                "Supported data-intensive enterprise applications by optimizing database interactions and backend service performance."
            ],
            tech: ["Angular", "NgRx Redux", "Node.js", "AEM", "Spring Boot", "Kubernetes", "AWS Lambda", "NoSQL", "RDS"]
        }
    ];

    const projects = [
        {
            title: "Enterprise Digital Platform Migration",
            role: "Team Lead & Backend Architect",
            desc: "Led migration from legacy monolith architecture to a cloud-native microservices platform using Spring Boot, Angular, and AWS. Improved system scalability and deployment reliability while boosting user engagement by 20%.",
            tech: ["Spring Boot", "Java", "Angular", "AWS (RDS, Lambda, S3)", "Docker", "Kubernetes"],
            link: linkedinUrl
        },
        {
            title: "Legacy CMS to AEM Migration Suite",
            role: "Full Stack Lead",
            desc: "Successfully migrated legacy content management systems to Adobe Experience Manager (AEM) leveraging Angular and Node.js API integration layers with 100% test automation code quality standards.",
            tech: ["AEM", "Angular", "Node.js", "TypeScript", "RESTful APIs"],
            link: linkedinUrl
        }
    ];

    const filteredProjects = useMemo(() => {
        if (!searchQuery.trim()) return projects;
        const query = searchQuery.toLowerCase();
        return projects.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.desc.toLowerCase().includes(query) ||
            p.tech.some(t => t.toLowerCase().includes(query))
        );
    }, [searchQuery, projects]);

    const languages = [
        { name: "English", level: "Business Level" },
        { name: "Japanese", level: "Basic" }
    ];

    const interests = [
        "Backend Platform Engineering",
        "Experimentation & Data-Driven Development",
        "Observability and Automation",
        "Scalable Cloud Systems"
    ];

    const statusPulse = {
        '@keyframes pulse': {
            '0%': { transform: 'scale(0.95)', opacity: 0.6 },
            '50%': { transform: 'scale(1.25)', opacity: 1 },
            '100%': { transform: 'scale(0.95)', opacity: 0.6 },
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            color: 'text.primary',
            pb: 12,
            pt: { xs: 4, md: 8 },
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient Accent Blobs */}
            <motion.div
                animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -30, 20, 0],
                    scale: [1, 1.1, 0.95, 1]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ position: 'absolute', top: '2%', right: '5%', zIndex: 0, opacity: 0.06 }}
            >
                <Box sx={{
                    width: { xs: 300, md: 500 }, height: { xs: 300, md: 500 },
                    borderRadius: '50%', background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)',
                    filter: 'blur(80px)'
                }} />
            </motion.div>

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* HERO HEADER */}
                    <Box id="top" sx={{ mb: { xs: 6, md: 8 } }}>
                        <motion.div variants={itemVariants}>
                            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                                <Box sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    px: 2,
                                    py: 0.75,
                                    borderRadius: 50,
                                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                    border: '1px solid',
                                    borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(52, 211, 153, 0.25)' : 'rgba(16, 185, 129, 0.25)',
                                }}>
                                    <Box sx={{
                                        width: 8, height: 8,
                                        bgcolor: '#10B981',
                                        borderRadius: '50%',
                                        ...statusPulse,
                                        animation: 'pulse 2s infinite ease-in-out',
                                        boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
                                    }} />
                                    <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 1, color: '#10B981', textTransform: 'uppercase' }}>
                                        Software Engineer & Team Lead
                                    </Typography>
                                </Box>
                            </Stack>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Typography
                                variant="h1"
                                fontWeight="900"
                                component="div"
                                sx={{
                                    background: (theme) => `linear-gradient(135deg, ${theme.palette.text.primary} 40%, ${theme.palette.primary.main} 100%)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    letterSpacing: { xs: -1.5, md: -2.5 },
                                    fontSize: { xs: '2.5rem', sm: '3.75rem', md: '4.75rem' },
                                    lineHeight: 1.05,
                                    mb: 1.5,
                                }}
                            >
                                <KineticText text={name} />
                            </Typography>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Typography
                                variant="h5"
                                color="primary.main"
                                sx={{
                                    fontWeight: 700,
                                    letterSpacing: 0.5,
                                    fontSize: { xs: '1.1rem', md: '1.35rem' },
                                    mb: 2.5
                                }}
                            >
                                Backend, Cloud-Native Platforms & Microservices Architecture
                            </Typography>
                        </motion.div>

                        {/* Contact Meta Details Pill Bar */}
                        <motion.div variants={itemVariants}>
                            <Stack direction="row" flexWrap="wrap" gap={2} sx={{ mb: 3.5, color: 'text.secondary', fontSize: '0.875rem' }}>
                                <Stack direction="row" alignItems="center" spacing={0.75}>
                                    <LocationIcon fontSize="small" sx={{ color: 'primary.main', opacity: 0.8 }} />
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{locationStr}</Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={0.75}>
                                    <EmailIcon fontSize="small" sx={{ color: 'primary.main', opacity: 0.8 }} />
                                    <Typography variant="body2" component="a" href={`mailto:${email}`} sx={{ fontWeight: 500, color: 'inherit', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                                        {email}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={0.75}>
                                    <PhoneIcon fontSize="small" sx={{ color: 'primary.main', opacity: 0.8 }} />
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{phone}</Typography>
                                </Stack>
                            </Stack>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div variants={itemVariants}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
                                <Button
                                    variant="contained"
                                    onClick={() => window.print()}
                                    startIcon={<PrintIcon />}
                                    sx={{
                                        py: 1.4,
                                        px: 3.5,
                                        borderRadius: 2.5,
                                        fontWeight: 700,
                                        fontSize: '0.925rem',
                                        textTransform: 'none',
                                        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                        boxShadow: (theme) => `0 10px 25px -5px ${theme.palette.primary.main}45`,
                                        transition: 'all 0.25s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: (theme) => `0 14px 28px -5px ${theme.palette.primary.main}60`,
                                        }
                                    }}
                                >
                                    Print / Save PDF Resume
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={handleCopyEmail}
                                    startIcon={copied ? <CheckIcon sx={{ color: '#10B981' }} /> : <CopyIcon />}
                                    sx={{
                                        py: 1.4,
                                        px: 3,
                                        borderRadius: 2.5,
                                        fontWeight: 600,
                                        fontSize: '0.925rem',
                                        textTransform: 'none',
                                        borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                                        color: 'text.primary',
                                        transition: 'all 0.25s ease',
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    {copied ? 'Email Copied!' : 'Copy Email'}
                                </Button>

                                <Stack direction="row" spacing={1} sx={{ pt: { xs: 1, sm: 0 } }}>
                                    <IconButton
                                        aria-label="LinkedIn Profile"
                                        component="a"
                                        href={linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            color: 'text.secondary',
                                            border: '1px solid',
                                            borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                            '&:hover': { color: 'primary.main', borderColor: 'primary.main' }
                                        }}
                                    >
                                        <LinkedInIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </motion.div>

                        {/* Quantitative Metrics Grid */}
                        <motion.div variants={itemVariants}>
                            <Grid container spacing={2} sx={{ mt: 5 }}>
                                {stats.map((stat, idx) => (
                                    <Grid size={{ xs: 6, sm: 3 }} key={idx}>
                                        <Box sx={{
                                            p: 2.2,
                                            borderRadius: 3,
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.015)',
                                            border: '1px solid',
                                            borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
                                            textAlign: 'center'
                                        }}>
                                            <Typography variant="h5" fontWeight="800" color="primary.main" sx={{ letterSpacing: -0.5 }}>
                                                {stat.number}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" fontWeight="600" sx={{ letterSpacing: 0.5 }}>
                                                {stat.label}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </motion.div>

                        {/* Interactive Recruiter Skill/Project Search Bar */}
                        <motion.div variants={itemVariants}>
                            <Box sx={{ mt: 4 }} className="no-print">
                                <TextField
                                    fullWidth
                                    placeholder="Recruiter Search: Filter skills or projects (e.g. Java, Spring Boot, AWS, Kotlin, Angular, Docker)..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    size="small"
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                                                </InputAdornment>
                                            ),
                                        }
                                    }}
                                    sx={{
                                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: 3,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            '& fieldset': {
                                                borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'primary.main',
                                            },
                                        }
                                    }}
                                />
                            </Box>
                        </motion.div>
                    </Box>

                    <Stack spacing={5}>
                        {/* EXECUTIVE SUMMARY */}
                        <motion.div variants={itemVariants}>
                            <SpotlightCard id="about">
                                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                                    <AboutIcon className="section-icon" sx={{ fontSize: 22, color: 'primary.main', opacity: 0.8 }} />
                                    <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 1.5, color: 'text.secondary', fontSize: '0.75rem' }}>
                                        EXECUTIVE SUMMARY
                                    </Typography>
                                </Stack>
                                <Typography variant="body1" sx={{ lineHeight: 1.85, fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'text.secondary', mb: 2 }}>
                                    Software Engineer and Team Lead with 6+ years of experience designing scalable backend services, cloud-native platforms, and microservices architectures in enterprise environments. Experienced in developing distributed systems using Java, Spring Boot, Node.js, and Kotlin, deployed on AWS and Azure cloud platforms.
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.85, fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'text.secondary' }}>
                                    Strong background in backend service design, API integration layers, and platform scalability, with hands-on experience in CI/CD automation, containerized deployments using Docker and Kubernetes, and production system operations. Proven ability to collaborate across teams to deliver reliable systems supporting data-driven applications.
                                </Typography>
                            </SpotlightCard>
                        </motion.div>

                        {/* WORK EXPERIENCE */}
                        <motion.div variants={itemVariants}>
                            <SpotlightCard id="experience">
                                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3.5 }}>
                                    <ExperienceIcon className="section-icon" sx={{ fontSize: 22, color: 'primary.main', opacity: 0.8 }} />
                                    <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 1.5, color: 'text.secondary', fontSize: '0.75rem' }}>
                                        WORK HISTORY
                                    </Typography>
                                </Stack>
                                <Stack spacing={4}>
                                    {experiences.map((exp, index) => (
                                        <Box key={index} sx={{
                                            pb: index !== experiences.length - 1 ? 4 : 0,
                                            borderBottom: index !== experiences.length - 1 ? '1px dashed' : 'none',
                                            borderColor: 'divider'
                                        }}>
                                            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 0.5 }}>
                                                <Typography variant="h6" fontWeight="800" sx={{ fontSize: { xs: '1.05rem', md: '1.2rem' } }}>
                                                    {exp.role} <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>@ {exp.company}</Box>
                                                </Typography>
                                                <Typography variant="caption" sx={{
                                                    fontWeight: 700,
                                                    letterSpacing: 1,
                                                    color: 'secondary.main',
                                                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.08)',
                                                    px: 1.5,
                                                    py: 0.4,
                                                    borderRadius: 1.5,
                                                    mt: { xs: 0.5, sm: 0 }
                                                }}>
                                                    {exp.period}
                                                </Typography>
                                            </Stack>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 1.5 }}>
                                                {exp.location}
                                            </Typography>
                                            <Box component="ul" sx={{ pl: 2, m: 0, mb: 2 }}>
                                                {exp.bullets.map((bullet, idx) => (
                                                    <Box component="li" key={idx} sx={{ mb: 1, color: 'text.secondary', lineHeight: 1.7, fontSize: '0.9rem' }}>
                                                        {bullet}
                                                    </Box>
                                                ))}
                                            </Box>
                                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                                {exp.tech.map(t => (
                                                    <Chip
                                                        key={t}
                                                        label={t}
                                                        size="small"
                                                        sx={{
                                                            borderRadius: 1.5,
                                                            fontWeight: 600,
                                                            fontSize: '0.725rem',
                                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(129, 140, 248, 0.12)' : 'rgba(79, 70, 229, 0.08)',
                                                            color: 'primary.main',
                                                        }}
                                                    />
                                                ))}
                                            </Stack>
                                        </Box>
                                    ))}
                                </Stack>
                            </SpotlightCard>
                        </motion.div>

                        {/* FEATURED PROJECTS */}
                        <motion.div variants={itemVariants}>
                            <SpotlightCard id="projects">
                                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                                    <ProjectsIcon className="section-icon" sx={{ fontSize: 22, color: 'primary.main', opacity: 0.8 }} />
                                    <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 1.5, color: 'text.secondary', fontSize: '0.75rem' }}>
                                        PROJECT HIGHLIGHTS ({filteredProjects.length})
                                    </Typography>
                                </Stack>
                                <Grid container spacing={2.5}>
                                    {filteredProjects.map((proj, idx) => (
                                        <Grid size={{ xs: 12 }} key={idx}>
                                            <Box sx={{
                                                p: 3,
                                                borderRadius: 3.5,
                                                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.015)',
                                                border: '1px solid',
                                                borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                                                transition: 'all 0.25s ease',
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                }
                                            }}>
                                                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 0.5 }}>
                                                    <Box>
                                                        <Typography variant="h6" fontWeight="800" sx={{ fontSize: '1.1rem' }}>
                                                            {proj.title}
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700, fontSize: '0.825rem', mb: 1 }}>
                                                            {proj.role}
                                                        </Typography>
                                                    </Box>
                                                    <IconButton
                                                        component="a"
                                                        href={proj.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        size="small"
                                                        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                                                    >
                                                        <LaunchIcon fontSize="small" />
                                                    </IconButton>
                                                </Stack>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7, fontSize: '0.875rem' }}>
                                                    {proj.desc}
                                                </Typography>
                                                <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                                                    {proj.tech.map(t => (
                                                        <Chip
                                                            key={t}
                                                            label={t}
                                                            size="small"
                                                            sx={{
                                                                borderRadius: 1.5,
                                                                fontWeight: 600,
                                                                fontSize: '0.725rem',
                                                                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.08)',
                                                                color: 'secondary.main',
                                                            }}
                                                        />
                                                    ))}
                                                </Stack>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </SpotlightCard>
                        </motion.div>

                        {/* TECHNICAL SKILLS MATRIX */}
                        <motion.div variants={itemVariants}>
                            <SpotlightCard id="skills">
                                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 3 }}>
                                    <Stack direction="row" alignItems="center" spacing={1.5}>
                                        <SkillsIcon className="section-icon" sx={{ fontSize: 22, color: 'primary.main', opacity: 0.8 }} />
                                        <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 1.5, color: 'text.secondary', fontSize: '0.75rem' }}>
                                            SKILLS & PLATFORM ENGINEERING ({filteredSkills.length})
                                        </Typography>
                                    </Stack>

                                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: { xs: 1.5, sm: 0 } }}>
                                        {['All', 'Backend', 'CloudDevOps', 'DataStorage', 'FrontendTools'].map((category) => (
                                            <Button
                                                key={category}
                                                size="small"
                                                onClick={() => setActiveTab(category)}
                                                sx={{
                                                    borderRadius: 2,
                                                    px: 1.5,
                                                    py: 0.3,
                                                    fontSize: '0.75rem',
                                                    fontWeight: 700,
                                                    textTransform: 'none',
                                                    bgcolor: activeTab === category ? 'primary.main' : 'transparent',
                                                    color: activeTab === category ? 'primary.contrastText' : 'text.secondary',
                                                    border: '1px solid',
                                                    borderColor: activeTab === category ? 'primary.main' : 'divider',
                                                }}
                                            >
                                                {category === 'CloudDevOps' ? 'Cloud/DevOps' : category === 'DataStorage' ? 'Data' : category === 'FrontendTools' ? 'Frontend/Tools' : category}
                                            </Button>
                                        ))}
                                    </Stack>
                                </Stack>

                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {filteredSkills.map((skill) => (
                                        <Chip
                                            key={skill}
                                            label={skill}
                                            sx={{
                                                borderRadius: 2,
                                                fontWeight: 700,
                                                px: 0.5,
                                                py: 1.8,
                                                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                                                color: 'text.primary',
                                                border: '1px solid',
                                                borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                                                fontSize: '0.825rem',
                                                '&:hover': {
                                                    bgcolor: 'primary.main',
                                                    color: 'primary.contrastText',
                                                }
                                            }}
                                        />
                                    ))}
                                </Box>
                            </SpotlightCard>
                        </motion.div>

                        {/* EDUCATION, LANGUAGES & INTERESTS */}
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                    <SpotlightCard style={{ height: '100%', boxSizing: 'border-box' }}>
                                        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                                            <EducationIcon className="section-icon" sx={{ fontSize: 22, color: 'primary.main', opacity: 0.8 }} />
                                            <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 1.5, color: 'text.secondary', fontSize: '0.75rem' }}>
                                                EDUCATION
                                            </Typography>
                                        </Stack>
                                        <Typography variant="h6" fontWeight="800" sx={{ fontSize: '1.05rem', mb: 0.5 }}>
                                            Bachelor's Degree in Computer Science and Engineering
                                        </Typography>
                                        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 700, mb: 1 }}>
                                            SRM Institute of Science and Technology, India
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6, display: 'block', mb: 1 }}>
                                            Graduated January 2019 • First Class with Distinction (GPA / CGPA: 8.18)
                                        </Typography>
                                    </SpotlightCard>
                                </motion.div>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                    <SpotlightCard style={{ height: '100%', boxSizing: 'border-box' }}>
                                        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                                            <LangIcon className="section-icon" sx={{ fontSize: 22, color: 'primary.main', opacity: 0.8 }} />
                                            <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 1.5, color: 'text.secondary', fontSize: '0.75rem' }}>
                                                LANGUAGES
                                            </Typography>
                                        </Stack>
                                        <Stack spacing={1.5}>
                                            {languages.map((lang, idx) => (
                                                <Box key={idx}>
                                                    <Typography variant="body2" fontWeight="700" color="text.primary">
                                                        {lang.name} — <Box component="span" sx={{ color: 'secondary.main', fontWeight: 600 }}>{lang.level}</Box>
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </SpotlightCard>
                                </motion.div>
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                    <SpotlightCard style={{ height: '100%', boxSizing: 'border-box' }}>
                                        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                                            <HeartIcon className="section-icon" sx={{ fontSize: 22, color: 'primary.main', opacity: 0.8 }} />
                                            <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 1.5, color: 'text.secondary', fontSize: '0.75rem' }}>
                                                ENGINEERING INTERESTS & PLATFORM FOCUS
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" flexWrap="wrap" gap={1.25}>
                                            {interests.map((interest, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={interest}
                                                    sx={{
                                                        borderRadius: 2,
                                                        fontWeight: 600,
                                                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(129, 140, 248, 0.1)' : 'rgba(79, 70, 229, 0.06)',
                                                        color: 'primary.main',
                                                    }}
                                                />
                                            ))}
                                        </Stack>
                                    </SpotlightCard>
                                </motion.div>
                            </Grid>
                        </Grid>

                        {/* CONTACT FOOTER CTA */}
                        <motion.div variants={itemVariants}>
                            <SpotlightCard id="contact" style={{ textAlign: 'center', py: { xs: 5, md: 7 } }}>
                                <EmailIcon className="section-icon" sx={{ fontSize: 36, color: 'primary.main', mb: 1.5, opacity: 0.9 }} />
                                <Typography variant="h4" fontWeight="800" sx={{ mb: 1, letterSpacing: -0.5 }}>
                                    Let's build reliable cloud platforms together.
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, maxWidth: 520, mx: 'auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
                                    Experienced software engineer and team lead based in Tokyo, Japan. Open to backend, platform engineering, and technical leadership roles.
                                </Typography>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
                                    <Button
                                        variant="contained"
                                        component="a"
                                        href={`mailto:${email}`}
                                        startIcon={<EmailIcon />}
                                        sx={{
                                            py: 1.4,
                                            px: 3.5,
                                            borderRadius: 2.5,
                                            fontWeight: 700,
                                            fontSize: '0.925rem',
                                            textTransform: 'none',
                                            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                        }}
                                    >
                                        Send Email
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={handleCopyEmail}
                                        startIcon={copied ? <CheckIcon sx={{ color: '#10B981' }} /> : <CopyIcon />}
                                        sx={{
                                            py: 1.4,
                                            px: 3,
                                            borderRadius: 2.5,
                                            fontWeight: 600,
                                            fontSize: '0.925rem',
                                            textTransform: 'none',
                                            borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                                            color: 'text.primary',
                                        }}
                                    >
                                        {copied ? 'Copied' : email}
                                    </Button>
                                </Stack>
                            </SpotlightCard>
                        </motion.div>
                    </Stack>

                    {/* Footer */}
                    <Box sx={{ mt: 8, pt: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 0.5, fontWeight: 500 }}>
                            © {new Date().getFullYear()} SANARKER S — SOFTWARE ENGINEER & TEAM LEAD • TOKYO, JAPAN
                        </Typography>
                    </Box>
                </motion.div>
            </Container>

            <Snackbar
                open={copied}
                autoHideDuration={3000}
                onClose={() => setCopied(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setCopied(false)} severity="success" sx={{ width: '100%', borderRadius: 2.5, fontWeight: 600 }}>
                    Email address copied to clipboard!
                </Alert>
            </Snackbar>
        </Box>
    );
}



