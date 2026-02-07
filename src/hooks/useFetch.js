/**
 * useFetch Hook
 * Custom hook for fetching data with loading and error states
 */

import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { immediate = true, method = 'GET' } = options;

    const fetchData = useCallback(async (fetchUrl = url, fetchOptions = {}) => {
        setLoading(true);
        setError(null);

        try {
            const config = {
                method: fetchOptions.method || method,
                url: fetchUrl,
                ...fetchOptions,
            };

            if (fetchOptions.body) {
                config.data = fetchOptions.body;
            }

            const response = await axiosInstance(config);
            setData(response.data);
            return response.data;
        } catch (err) {
            const errorMessage = err.message || 'An error occurred while fetching data';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [url, method]);

    useEffect(() => {
        if (immediate && url) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [url, immediate, fetchData]);

    const refetch = useCallback(() => {
        return fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch, fetchData };
};

export default useFetch;
