import { useState, useEffect } from 'react';
import getApiBaseUrl from './apiConfig';

const useFetchData = () => {
  const [makes, setMakes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  // Uncomment if needed
  // const [discounts, setDiscounts] = useState([]);
  // const [stockStatuses, setStockStatuses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBaseUrl = getApiBaseUrl();
        
        // Perform all fetch requests concurrently
        const [makeResponse, categoryResponse, areaResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/product/makes/`),
          fetch(`${apiBaseUrl}/product/categories/`),
          fetch(`${apiBaseUrl}/product/areas/`),
          // Uncomment if needed
          // fetch(`${apiBaseUrl}/product/discounts/`),
          // fetch(`${apiBaseUrl}/product/stockstatuses/`)
        ]);

        // Check for any failed responses
        if (!makeResponse.ok || !categoryResponse.ok || !areaResponse.ok) {
          throw new Error('One or more API calls failed');
        }

        // Convert all responses to JSON
        const makesData = await makeResponse.json();
        const categoriesData = await categoryResponse.json();
        const areasData = await areaResponse.json();
        // Uncomment if needed
        // const discountsData = await discountResponse.json();
        // const stockStatusesData = await stockStatusResponse.json();

        // Update state with fetched data
        setMakes(makesData);
        setCategories(categoriesData);
        setAreas(areasData);
        // Uncomment if needed
        // setDiscounts(discountsData);
        // setStockStatuses(stockStatusesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Uncomment discounts, stockStatuses if needed
  return { 
    makes, 
    categories, 
    areas, 
    // discounts, 
    // stockStatuses, 
    loading, 
    error,
    retry: () => {
      setLoading(true);
      setError(null);
      fetchData();
    }
  };
};

export default useFetchData;