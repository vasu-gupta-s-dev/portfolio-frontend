/**
 * App Constants
 * Centralized constants for the application
 */

// Skills list for display
export const SKILLS = [
    { name: 'C++', category: 'language' },
    { name: 'JavaScript', category: 'language' },
    { name: 'Node.js', category: 'backend' },
    { name: 'React', category: 'frontend' },
    { name: 'PHP', category: 'language' },
    { name: 'Laravel', category: 'backend' },
    { name: 'MySQL', category: 'database' },
    { name: 'Express', category: 'backend' },
    { name: 'Prisma', category: 'database' },
    { name: 'REST APIs', category: 'architecture' },
    { name: 'Git', category: 'tools' },
    { name: 'Docker', category: 'tools' },
];

// Social links
export const SOCIAL_LINKS = {
    github: 'https://github.com/vasug369',
    linkedin: 'https://www.linkedin.com/in/vasu-gupta-bb44b222b/',
    email: 'mailto:vasupankajdbd@gmail.com',
};

// Navigation links
export const NAV_LINKS = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
];

// Owner information
export const OWNER = {
    name: 'Vasu Gupta',
    title: 'Software Engineer',
    tagline: 'Building robust backend systems and full-stack applications',
    summary: 'Software Engineer with strong fundamentals in systems, backend architecture, and full-stack development. Focused on clean code, layered architecture, and production-grade systems.',
};

export default {
    SKILLS,
    SOCIAL_LINKS,
    NAV_LINKS,
    OWNER,
};
