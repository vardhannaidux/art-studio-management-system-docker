import axios from 'axios';

/**
 * Centralized Axios instance for Artistry Studio.
 * - In Docker production: VITE_API_BASE_URL is "" (empty string) so API requests
 *   are made to relative paths on the same origin (e.g. http://localhost:3000/artstudio/...)
 *   and reverse-proxied by Nginx to the backend container.
 * - In local development: defaults to http://localhost:8081 if specified or unset.
 */
const rawBaseURL = import.meta.env.VITE_API_BASE_URL;
const baseURL = typeof rawBaseURL === 'string' ? rawBaseURL : 'http://localhost:8081';

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for consistent error extraction
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let normalizedMessage = 'An unexpected error occurred. Please try again.';
    let fieldErrors = {};
    let status = error.response ? error.response.status : null;

    if (error.response && error.response.data) {
      const data = error.response.data;
      if (typeof data === 'object') {
        normalizedMessage = data.message || data.error || normalizedMessage;
        if (data.fieldErrors) {
          fieldErrors = data.fieldErrors;
        }
      } else if (typeof data === 'string' && data.length > 0) {
        normalizedMessage = data;
      }
    } else if (error.code === 'ERR_NETWORK') {
      normalizedMessage = 'Unable to connect to the backend server. Please verify the backend service is running and healthy.';
    } else if (error.message) {
      normalizedMessage = error.message;
    }

    const enhancedError = new Error(normalizedMessage);
    enhancedError.status = status;
    enhancedError.fieldErrors = fieldErrors;
    enhancedError.originalError = error;

    return Promise.reject(enhancedError);
  }
);

export default axiosInstance;
