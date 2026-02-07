import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS, OWNER } from '../utils/constants';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__container container">
                <NavLink to="/" className="navbar__logo">
                    <span className="navbar__logo-text">{OWNER.name}</span>
                    <span className="navbar__logo-dot">.</span>
                </NavLink>

                <button
                    className={`navbar__toggle ${isMobileMenuOpen ? 'navbar__toggle--active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <span className="navbar__toggle-line"></span>
                    <span className="navbar__toggle-line"></span>
                    <span className="navbar__toggle-line"></span>
                </button>

                <ul className={`navbar__menu ${isMobileMenuOpen ? 'navbar__menu--open' : ''}`}>
                    {NAV_LINKS.map((link) => (
                        <li key={link.path} className="navbar__item">
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                                }
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="navbar__actions">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
