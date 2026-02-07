import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { OWNER, SOCIAL_LINKS } from '../utils/constants';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null
    });
    const [validationErrors, setValidationErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!formData.message.trim()) {
            errors.message = 'Message is required';
        } else if (formData.message.length < 10) {
            errors.message = 'Message must be at least 10 characters';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear validation error when user starts typing
        if (validationErrors[name]) {
            setValidationErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setStatus({ loading: true, success: false, error: null });

        try {
            await axiosInstance.post('/api/contact', formData);

            setStatus({ loading: false, success: true, error: null });
            setFormData({ name: '', email: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setStatus(prev => ({ ...prev, success: false }));
            }, 5000);

        } catch (err) {
            const errorMessage = err.message || 'Failed to send message. Please try again.';
            setStatus({ loading: false, success: false, error: errorMessage });

            // Handle validation errors from server
            if (err.errors) {
                const serverErrors = {};
                err.errors.forEach(e => {
                    serverErrors[e.field] = e.message;
                });
                setValidationErrors(serverErrors);
            }
        }
    };

    return (
        <div className="contact">
            <section className="contact-hero section">
                <div className="container">
                    <h1 className="section-title">Get in Touch</h1>
                    <p className="section-subtitle">
                        Have a project in mind? Let's discuss how we can work together.
                    </p>
                </div>
            </section>

            <section className="contact-content section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <div className="contact-form-wrapper">
                            <form onSubmit={handleSubmit} className="contact-form">
                                {status.success && (
                                    <div className="form-success">
                                        <span className="success-icon">✓</span>
                                        <p>Thank you for your message! I'll get back to you soon.</p>
                                    </div>
                                )}

                                {status.error && (
                                    <div className="form-error-banner">
                                        <p>{status.error}</p>
                                    </div>
                                )}

                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`form-input ${validationErrors.name ? 'form-input--error' : ''}`}
                                        placeholder="Your name"
                                        disabled={status.loading}
                                    />
                                    {validationErrors.name && (
                                        <span className="form-error">{validationErrors.name}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`form-input ${validationErrors.email ? 'form-input--error' : ''}`}
                                        placeholder="your.email@example.com"
                                        disabled={status.loading}
                                    />
                                    {validationErrors.email && (
                                        <span className="form-error">{validationErrors.email}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`form-textarea ${validationErrors.message ? 'form-input--error' : ''}`}
                                        placeholder="Tell me about your project..."
                                        rows="6"
                                        disabled={status.loading}
                                    />
                                    {validationErrors.message && (
                                        <span className="form-error">{validationErrors.message}</span>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary contact-submit"
                                    disabled={status.loading}
                                >
                                    {status.loading ? (
                                        <>
                                            <span className="btn-spinner"></span>
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <aside className="contact-info">
                            <div className="contact-card">
                                <h3>Let's Connect</h3>
                                <p>
                                    I'm always interested in hearing about new projects,
                                    creative ideas, or opportunities to collaborate.
                                </p>

                                <div className="contact-methods">
                                    <a href={SOCIAL_LINKS.email} className="contact-method">
                                        <span className="contact-method__icon">📧</span>
                                        <span className="contact-method__label">Email</span>
                                    </a>
                                    <a
                                        href={SOCIAL_LINKS.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-method"
                                    >
                                        <span className="contact-method__icon">💻</span>
                                        <span className="contact-method__label">GitHub</span>
                                    </a>
                                    <a
                                        href={SOCIAL_LINKS.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-method"
                                    >
                                        <span className="contact-method__icon">💼</span>
                                        <span className="contact-method__label">LinkedIn</span>
                                    </a>
                                </div>
                            </div>

                            <div className="contact-card">
                                <h3>Response Time</h3>
                                <p>
                                    I typically respond within 24-48 hours. For urgent inquiries,
                                    please mention it in your message.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
