import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('adminToken'));
    const [loading, setLoading] = useState(true);

    // Check token validity on mount
    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axiosInstance.get('/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAdmin(response.data.data.admin);
            } catch (error) {
                // Token invalid, clear it
                logout();
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await axiosInstance.post('/auth/login', {
                username,
                password
            });

            const { token: newToken, admin: adminData } = response.data.data;

            localStorage.setItem('adminToken', newToken);
            setToken(newToken);
            setAdmin(adminData);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setToken(null);
        setAdmin(null);
    };

    const value = {
        admin,
        token,
        loading,
        isAuthenticated: !!admin,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
