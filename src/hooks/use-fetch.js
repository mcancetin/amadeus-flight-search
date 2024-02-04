import axios from "../api/axios";
import { useState, useEffect, useCallback } from 'react';

// hasInterval = true ise interval çalışır
// interval = 300_000 ise 30 saniyede bir çalışır bkz:https://v8.dev/features/numeric-separators

const useFetch = (endpoint, hasToaster = false, intervalParam) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
     
    } catch (err) {
      setError(err);
      setLoading(false);
      setData([]);

     
      throw new Error(err);
    }
    setLoading(false);
  }, [endpoint, hasToaster]);

  useEffect(() => {
    fetchData();

    if (intervalParam) {
      const interval = setInterval(() => {
        fetchData();
      }, intervalParam);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [intervalParam, fetchData]);

  return { data, loading, error };
};

export default useFetch;