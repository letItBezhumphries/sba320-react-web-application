import { useEffect, useState } from 'react';

function useFetch(fetchFunction, initialValue, pagination, page) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [pageData, setPageData] = useState(initialValue);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  // console.log('pagination:', pagination);

  /** state here will be managed by custom hook and the component that makes use of it */
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await fetchFunction(page);

        const extendedForFavorites = data.results.map((monster) => {
          return {
            ...monster,
            isFav: false,
          };
        });

        // console.log('data in useFetch:', data);
        setPageData(extendedForFavorites);

        if (pagination === true) {
          // console.log('pagination was passed');
          setPrev(data.previous);
          setNext(data.next);
        }
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data' });
      }
      setLoading(false);
    }

    fetchData();
  }, [fetchFunction, setNext, setPrev]);

  /* in return you are able to make the setting function available in components that use this custom hook 
  to manage state
  */

  return {
    loading: loading,
    pageData: pageData,
    prev: prev,
    next: next,
    setPageData,
    setNext,
    setPrev,
    setLoading,
    setError,
    error: error,
  };
}

export default useFetch;
