import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ProjectsManager from './pages/admin/ProjectsManager'
import MessagesInbox from './pages/admin/MessagesInbox'

function App() {
    return (
        <AuthProvider>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="contact" element={<Contact />} />
                </Route>

                {/* Admin Login (no layout) */}
                <Route path="/admin/login" element={<Login />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="projects" element={<ProjectsManager />} />
                    <Route path="messages" element={<MessagesInbox />} />
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default App
