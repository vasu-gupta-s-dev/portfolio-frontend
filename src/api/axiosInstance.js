/**
 * Axios Instance
 * Centralized HTTP client configuration
 */

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add any auth headers or request modifications here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            if (status === 404) {
                console.error('Resource not found');
            } else if (status === 500) {
                console.error('Server error');
            }

            // Return the error message from the server if available
            return Promise.reject({
                status,
                message: data?.message || 'An error occurred',
                errors: data?.errors || null,
            });
        } else if (error.request) {
            // Request was made but no response received
            return Promise.reject({
                status: 0,
                message: 'Unable to connect to the server. Please check your internet connection.',
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
