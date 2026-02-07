import { Navigate, Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
    const { admin, logout, loading, isAuthenticated } = useAuth();

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar__header">
                    <h2 className="admin-sidebar__title">Admin Panel</h2>
                    <p className="admin-sidebar__user">Welcome, {admin?.username}</p>
                </div>

                <nav className="admin-nav">
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) => `admin-nav__link ${isActive ? 'admin-nav__link--active' : ''}`}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                        </svg>
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/admin/projects"
                        className={({ isActive }) => `admin-nav__link ${isActive ? 'admin-nav__link--active' : ''}`}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                        </svg>
                        Projects
                    </NavLink>
                    <NavLink
                        to="/admin/messages"
                        className={({ isActive }) => `admin-nav__link ${isActive ? 'admin-nav__link--active' : ''}`}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                        Messages
                    </NavLink>
                </nav>

                <div className="admin-sidebar__footer">
                    <NavLink to="/" className="admin-nav__link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9,22 9,12 15,12 15,22" />
                        </svg>
                        View Site
                    </NavLink>
                    <button onClick={logout} className="admin-nav__link admin-nav__logout">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16,17 21,12 16,7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>

            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
