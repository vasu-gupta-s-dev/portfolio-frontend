import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import './ProjectsManager.css';

const ProjectsManager = () => {
    const { token } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        githubUrl: '',
        liveUrl: '',
        featured: false,
        sortOrder: 0
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axiosInstance.get('/admin/projects', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProjects(response.data.data.projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProject) {
                await axiosInstance.put(`/admin/projects/${editingProject.id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axiosInstance.post('/admin/projects', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchProjects();
            resetForm();
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            techStack: project.techStack,
            githubUrl: project.githubUrl || '',
            liveUrl: project.liveUrl || '',
            featured: project.featured,
            sortOrder: project.sortOrder
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        try {
            await axiosInstance.delete(`/admin/projects/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingProject(null);
        setFormData({
            title: '',
            description: '',
            techStack: '',
            githubUrl: '',
            liveUrl: '',
            featured: false,
            sortOrder: 0
        });
    };

    if (loading) {
        return <div className="loading-container"><div className="loading-spinner"></div></div>;
    }

    return (
        <div className="projects-manager">
            <header className="page-header">
                <h1>Projects</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    + Add Project
                </button>
            </header>

            {showForm && (
                <div className="form-overlay">
                    <div className="form-modal">
                        <h2>{editingProject ? 'Edit Project' : 'New Project'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-textarea"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Tech Stack (comma-separated)</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.techStack}
                                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                    required
                                    placeholder="React, Node.js, MySQL"
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">GitHub URL</label>
                                    <input
                                        type="url"
                                        className="form-input"
                                        value={formData.githubUrl}
                                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Live URL</label>
                                    <input
                                        type="url"
                                        className="form-input"
                                        value={formData.liveUrl}
                                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Sort Order</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={formData.sortOrder}
                                        onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div className="form-group form-checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.featured}
                                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        />
                                        Featured Project
                                    </label>
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingProject ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="projects-list">
                {projects.length === 0 ? (
                    <div className="empty-state">
                        <p>No projects yet. Add your first project!</p>
                    </div>
                ) : (
                    projects.map((project) => (
                        <div key={project.id} className="project-item">
                            <div className="project-item__content">
                                <h3>{project.title}</h3>
                                <p>{project.description.slice(0, 100)}...</p>
                                <div className="project-item__meta">
                                    <span className="tech-badge">{project.techStack.split(',')[0]}</span>
                                    {project.featured && <span className="featured-badge">Featured</span>}
                                </div>
                            </div>
                            <div className="project-item__actions">
                                <button onClick={() => handleEdit(project)} className="btn-icon-sm">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                </button>
                                <button onClick={() => handleDelete(project.id)} className="btn-icon-sm btn-danger">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="3,6 5,6 21,6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectsManager;
