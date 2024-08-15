import { set } from 'mongoose';
import { useEffect, useState } from 'react';

function useFetchPage(fetchFunction, initialValue, page) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(initialValue);
  const [currentPage, setCurrentPage] = useState(1);
  const [prev, setPrev] = useState('');
  const [next, setNext] = useState('');

  /** state here will be managed by custom hook and the component that makes use of it */
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await fetchFunction(page);
        console.log('data in useFetch:', data);
        setData(data.results);
        setPrev(data.previous);
        setNext(data.next);
        setCurrentPage(page);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data' });
      }
      setLoading(false);
    }

    fetchData();
  }, [fetchFunction, page]);

  /* in return you are able to make the setting function available in components that use this custom hook 
  to manage state
  */

  return {
    loading: loading,
    data: data,
    prev: prev,
    next: next,
    setData,
    setNext,
    setPrev,
    setLoading,
    setError,
    error: error,
  };
}

export default useFetch;
