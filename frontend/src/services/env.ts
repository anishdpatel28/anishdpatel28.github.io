// This file is only imported in environments that support import.meta.env
// VITE_API_URL should be set during build for production deployments
const getApiBaseUrl = () => {
  // If explicitly set via environment variable, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Development default - only use localhost in development
  // In production, VITE_API_URL must be set during build via GitHub Actions secret
  const isProduction = typeof window !== 'undefined' && 
                       window.location.hostname !== 'localhost' && 
                       window.location.hostname !== '127.0.0.1';
  
  if (isProduction) {
    // If we reach here in production without VITE_API_URL, log a warning
    // and return empty string (API calls will fail, but won't break the app)
    console.warn(
      'VITE_API_URL is not set in production. ' +
      'Please set the VITE_API_URL secret in GitHub Actions repository settings.'
    );
    return '';
  }
  
  // Development default
  return 'http://localhost:8000/api';
};

export const API_BASE_URL = getApiBaseUrl(); 