import useFetch from '../hooks/useFetch';
import ProjectCard from '../components/ProjectCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './Projects.css';

// Fallback projects if API fails or returns empty
const FALLBACK_PROJECTS = [
    {
        id: 1,
        title: 'ThinkExam',
        description: 'A comprehensive exam management system with role-based access control, exam creation and management workflows, and evaluation features. Built with emphasis on correctness, data integrity, and performance. This backend-heavy, database-driven application handles complex business logic for educational institutions.',
        techStack: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'REST API'],
        githubUrl: 'https://github.com/vasu-gupta-s-dev/thinkexam',
        liveUrl: null
    },
    {
        id: 2,
        title: 'Chattreix',
        description: 'A real-time chat application designed with a backend-first architecture. Features include real-time messaging, user presence, and message persistence. Built with focus on scalability and efficient system communication patterns.',
        techStack: ['Node.js', 'Express', 'MySQL', 'React', 'WebSocket'],
        githubUrl: 'https://github.com/vasu-gupta-s-dev/chattreix',
        liveUrl: null
    }
];

const Projects = () => {
    const { data, loading, error, refetch } = useFetch('/api/projects');

    // Use API data if available, otherwise fallback
    const projects = data?.data?.projects?.length > 0
        ? data.data.projects
        : FALLBACK_PROJECTS;

    // Show loading only on initial load
    if (loading && !data) {
        return (
            <div className="projects">
                <section className="projects-hero section">
                    <div className="container">
                        <h1 className="section-title">Projects</h1>
                        <p className="section-subtitle">Real-world applications built with clean architecture</p>
                    </div>
                </section>
                <Loading message="Loading projects..." />
            </div>
        );
    }

    return (
        <div className="projects">
            <section className="projects-hero section">
                <div className="container">
                    <h1 className="section-title">Projects</h1>
                    <p className="section-subtitle">
                        Real-world applications built with clean architecture,
                        layered design patterns, and production-grade code quality.
                    </p>
                </div>
            </section>

            <section className="projects-content section">
                <div className="container">
                    {error && (
                        <div className="projects-notice">
                            <p>Showing cached projects. Backend connection unavailable.</p>
                        </div>
                    )}

                    <div className="projects-grid stagger-children">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>

                    {projects.length === 0 && !loading && (
                        <div className="projects-empty">
                            <p>No projects to display yet.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Project Philosophy Section */}
            <section className="projects-philosophy section">
                <div className="container">
                    <div className="philosophy-card">
                        <h2>Building Philosophy</h2>
                        <p>
                            Each project follows the same core principles: separation of concerns,
                            proper error handling, and code that's meant to be read and maintained
                            by other developers. These aren't just demos—they're production-grade
                            implementations designed to solve real problems.
                        </p>
                        <div className="philosophy-points">
                            <div className="philosophy-point">
                                <span className="philosophy-icon">🏗️</span>
                                <h3>Layered Architecture</h3>
                                <p>Routes → Controllers → Services → Data Layer</p>
                            </div>
                            <div className="philosophy-point">
                                <span className="philosophy-icon">🛡️</span>
                                <h3>Error Handling</h3>
                                <p>Centralized, consistent error responses</p>
                            </div>
                            <div className="philosophy-point">
                                <span className="philosophy-icon">📐</span>
                                <h3>Clean Code</h3>
                                <p>Readable, documented, maintainable</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Projects;
