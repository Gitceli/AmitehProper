// frontend-ssr/lib/apiConfig.js
export const getServerApiBaseUrl = () => {
  // e.g. http://localhost:8000/api  (no trailing slash preferred)
  return (process.env.API_URL || 'http://localhost:8000/api').replace(/\/$/, '');
};

export const getBrowserApiBaseUrl = () => {
  if (typeof window === 'undefined') return getServerApiBaseUrl();
  // In dev/prod, Next proxy/rewrite /api → Django (configure in next.config.js)
  return '/api';
};