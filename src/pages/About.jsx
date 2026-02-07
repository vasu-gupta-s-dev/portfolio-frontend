import { OWNER } from '../utils/constants';
import './About.css';

const About = () => {
    return (
        <div className="about">
            <section className="about-hero section">
                <div className="container">
                    <h1 className="section-title">About Me</h1>
                    <p className="section-subtitle">
                        Engineer-first mindset. Clean architecture. Production-grade systems.
                    </p>
                </div>
            </section>

            <section className="about-content section">
                <div className="container">
                    <div className="about-grid">
                        {/* Main Content */}
                        <div className="about-main">
                            <h2 className="about-heading">Who I Am</h2>
                            <p>
                                I'm <strong>{OWNER.name}</strong>, a Software Engineer with a deep appreciation
                                for well-architected systems and clean, maintainable code. My journey in software
                                development has been driven by curiosity about how systems work at their core.
                            </p>
                            <p>
                                I believe in building software that isn't just functional, but is designed with
                                scalability, maintainability, and long-term evolution in mind. Whether it's
                                designing database schemas, architecting API layers, or implementing complex
                                business logic, I approach each challenge with the same principle:
                                <em> write code that future developers (including myself) will thank you for</em>.
                            </p>

                            <h2 className="about-heading">My Approach</h2>
                            <p>
                                I'm particularly passionate about backend architecture and systems design.
                                I enjoy working on problems that require careful thought about data flow,
                                system boundaries, and performance characteristics. My approach combines:
                            </p>
                            <ul className="about-list">
                                <li>
                                    <strong>Layered Architecture</strong> — Separation of concerns with clear
                                    boundaries between routes, controllers, services, and data access layers.
                                </li>
                                <li>
                                    <strong>API-First Design</strong> — Well-documented, consistent APIs that
                                    are easy to consume and maintain.
                                </li>
                                <li>
                                    <strong>Data Integrity</strong> — Careful database modeling with proper
                                    constraints, indexes, and transaction handling.
                                </li>
                                <li>
                                    <strong>Clean Code</strong> — Readable, tested, and documented code that
                                    communicates intent clearly.
                                </li>
                            </ul>

                            <h2 className="about-heading">Technical Focus</h2>
                            <p>
                                While I'm comfortable across the full stack, my primary focus is on backend
                                development and system architecture. I work extensively with:
                            </p>
                            <div className="tech-focus">
                                <div className="tech-focus__item">
                                    <h3>Languages</h3>
                                    <p>C++, JavaScript, PHP</p>
                                </div>
                                <div className="tech-focus__item">
                                    <h3>Backend</h3>
                                    <p>Node.js, Express, Laravel</p>
                                </div>
                                <div className="tech-focus__item">
                                    <h3>Frontend</h3>
                                    <p>React, Modern ES6+</p>
                                </div>
                                <div className="tech-focus__item">
                                    <h3>Database</h3>
                                    <p>MySQL, Prisma ORM</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="about-sidebar">
                            <div className="about-card">
                                <h3 className="about-card__title">What I Value</h3>
                                <ul className="about-card__list">
                                    <li>Clean, readable code</li>
                                    <li>Proper system architecture</li>
                                    <li>Performance and scalability</li>
                                    <li>Continuous learning</li>
                                    <li>Collaborative development</li>
                                </ul>
                            </div>

                            <div className="about-card">
                                <h3 className="about-card__title">Current Focus</h3>
                                <p className="about-card__text">
                                    Building production-grade applications with emphasis on backend
                                    architecture, database design, and API development.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
