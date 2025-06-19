import { useState, useEffect } from 'react';
import getApiBaseUrl from './apiConfig';

/**
 * Custom hook to fetch homepage carousel data
 * Uses centralized API configuration for environment detection
 * @returns {Object} { cardsData, loading, error, retry }
 */
const useFetchHomepage = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCarouselData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/homepage/carousel-cards/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCardsData(data);
    } catch (error) {
      console.error('Error fetching carousel data:', error);
      setError(error.message || 'Failed to fetch carousel data');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchCarouselData();
  }, []);

  // Return data, loading state, error, and a retry function
  return {
    cardsData,
    loading,
    error,
    retry: fetchCarouselData
  };
};

export default useFetchHomepage;