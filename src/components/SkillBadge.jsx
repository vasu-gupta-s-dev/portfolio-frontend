import './SkillBadge.css';

const SkillBadge = ({ skill, category }) => {
    return (
        <span className={`skill-badge skill-badge--${category}`}>
            {skill}
        </span>
    );
};

export default SkillBadge;
