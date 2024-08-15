import { useEffect, useState } from 'react';

function useFetch(fetchFunction, initialValue, pagination, page) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(initialValue);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  // console.log('pagination:', pagination);

  /** state here will be managed by custom hook and the component that makes use of it */
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await fetchFunction(page);
        console.log('data in useFetch:', data);
        setData(data.results);
        if (pagination === true) {
          setPrev(data.previous);
          setNext(data.next);
        }
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data' });
      }
      setLoading(false);
    }

    fetchData();
  }, [fetchFunction]);

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
