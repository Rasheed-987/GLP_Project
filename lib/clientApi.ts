import axios from 'axios';

const clientApi = axios.create({
    baseURL: '', // Using relative URL for Next.js API routes
});

// Request interceptor for adding auth token and handling FormData
clientApi.interceptors.request.use(
    (config) => {
        // Only set Content-Type to JSON if it's not FormData
        if (!(config.data instanceof FormData)) {
            config.headers['Content-Type'] = 'application/json';
        }
        // If it's FormData, axios will automatically set the correct Content-Type with boundary

        // You can add logic here to get token from localStorage or cookies
        // const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling common errors
clientApi.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.error || error.message || 'Something went wrong';
        return Promise.reject(new Error(message));
    }
);

export default clientApi;
