// apiConfig.js
const getApiBaseUrl = () => {
    // Check if we're in production (deployed to ivancic.in)
    const isProduction = window.location.hostname === 'ivancic.in' || 
                         window.location.hostname === 'www.ivancic.in';
    
    // Return appropriate base URL
    return isProduction 
      ? '/api' 
      : 'http://localhost:8000/api'

  };
  
  export default getApiBaseUrl;