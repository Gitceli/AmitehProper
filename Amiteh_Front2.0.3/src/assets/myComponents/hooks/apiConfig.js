// assets/myComponents/hooks/apiConfig.js
const getApiBaseUrl = () => {
  // Treat anything that is NOT localhost/127.* as production
  const localHosts = ['localhost', '127.0.0.1'];
  const isLocal    = localHosts.includes(window.location.hostname);

  return isLocal
    ? 'http://localhost:8000/api'   // dev: Django runs on :8000
    : '/api';                       // prod: nginx proxies /api → gunicorn
};

export default getApiBaseUrl;