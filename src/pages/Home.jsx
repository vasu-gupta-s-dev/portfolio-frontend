import { Link } from 'react-router-dom';
import SkillBadge from '../components/SkillBadge';
import { OWNER, SKILLS } from '../utils/constants';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero__container container">
                    <div className="hero__content animate-fade-in-up">
                        <p className="hero__greeting">Hello, I'm</p>
                        <h1 className="hero__title">
                            <span className="text-gradient">{OWNER.name}</span>
                        </h1>
                        <h2 className="hero__subtitle">{OWNER.title}</h2>
                        <p className="hero__description">{OWNER.summary}</p>

                        <div className="hero__cta">
                            <Link to="/projects" className="btn btn-primary">
                                View Projects
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon-arrow">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link to="/contact" className="btn btn-secondary">
                                Get in Touch
                            </Link>
                        </div>
                    </div>

                    <div className="hero__visual animate-fade-in">
                        <div className="hero__code-block">
                            <div className="code-header">
                                <span className="code-dot code-dot--red"></span>
                                <span className="code-dot code-dot--yellow"></span>
                                <span className="code-dot code-dot--green"></span>
                            </div>
                            <pre className="code-content">
                                {`const engineer = {
  name: "${OWNER.name}",
  role: "${OWNER.title}",
  focus: [
    "Backend Architecture",
    "Full-Stack Development",
    "Clean Code"
  ],
  passion: "Building robust systems"
};`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="skills section">
                <div className="container">
                    <h2 className="section-title">Technical Skills</h2>
                    <p className="section-subtitle">
                        Technologies and tools I use to build production-grade applications
                    </p>

                    <div className="skills__grid stagger-children">
                        {SKILLS.map((skill, index) => (
                            <SkillBadge
                                key={index}
                                skill={skill.name}
                                category={skill.category}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta section">
                <div className="container">
                    <div className="cta__card">
                        <h2 className="cta__title">Interested in working together?</h2>
                        <p className="cta__description">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                        </p>
                        <Link to="/contact" className="btn btn-primary">
                            Let's Talk
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
