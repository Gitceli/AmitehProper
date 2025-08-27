import { useState, useEffect } from 'react';
import getApiBaseUrl from './apiConfig';

const useFetchHomepage = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const api = getApiBaseUrl();
      const res = await fetch(`${api}/homepage/carousel-cards/`);
      if (!res.ok) throw new Error(res.statusText);
      setCardsData(await res.json());
    } catch (err) {
      setError(err.message || 'Fetch failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(fetchData, []);
  return { cardsData, loading, error, retry: fetchData };
};

export default useFetchHomepage;
