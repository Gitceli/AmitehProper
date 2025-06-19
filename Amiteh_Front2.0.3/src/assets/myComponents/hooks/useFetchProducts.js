import { useState, useEffect } from 'react';
import getApiBaseUrl from './apiConfig';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiBaseUrl = getApiBaseUrl();
        const response = await fetch(`${apiBaseUrl}/product/products`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const productsData = await response.json();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message || 'Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { 
    products, 
    loading, 
    error,
    retry: () => {
      setLoading(true);
      setError(null);
      fetchProducts();
    }
  };
};

export default useFetchProducts;