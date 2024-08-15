import React, { useState } from 'react';
import './MonstersScreen.css';
import Error from '../components/Error';
import Loader from '../components/Loader';
import useFetch from '../hooks/useFetch';
import { useContext } from 'react';
import { MonstersContext } from '../context/monsters-context';
import axios from 'axios';
axios.defaults.headers.common = {
  Accept: 'application/json',
};
import { getMonsters } from '../utility/requests';
import CurrentMonsterView from './CurrentMonsterView';

const MonstersScreen = () => {
  // passing in [] as second argument for initialValue for state
  const [currentMonsterIndex, setCurrentMonsterIndex] = useState(0);

  const monstersList = useContext(MonstersContext).monstersList;

  console.log('monstersList', monstersList);

  const {
    loading,
    data,
    error,
    setData,
    next,
    prev,
    setLoading,
    setError,
    setNext,
    setPrev,
  } = useFetch(getMonsters, [], true);

  const handleMonsterSelect = (idx) => {
    // e.preventDefault();
    setCurrentMonsterIndex(idx);
  };

  const handlePrevClick = async () => {
    console.log('prev in handleClick:', prev);

    try {
      setLoading(true);
      const newPage = await axios.get(prev);
      console.log('res:', newPage, 'current prev:', prev);
      setData(newPage.data);
      setPrev(newPage.data.previous);
      setNext(newPage.data.next);
      console.log('new prev:', prev);
    } catch (error) {
      console.log('error', error);
      setError(error);
    }
    setLoading(false);
  };

  const handleNextClick = async () => {
    console.log('next in handleNextClick:', next);
    try {
      setLoading(true);
      const newPage = await axios.get(next);
      console.log('res:', newPage.data, 'current next');
      setData(newPage.data.results);
      setNext(newPage.data.next);
      let currentPage = next[next.length - 1];
      console.log('currentPage:', currentPage);
      setPrev(newPage.data.previous);
      console.log('new next:', next, 'new prev:', prev);
    } catch (error) {
      console.log('error', error);
      setError(error);
    }
    setLoading(false);
  };

  let currentMonster = data[currentMonsterIndex];

  // console.log('in MonstersScreen currentMonster:', data[currentMonsterIndex]);

  return (
    <div id='monsters'>
      <h2 className='page-header'>MonstersScreen</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error
          title='There was an error fetching monsters'
          message={error.message}
        />
      ) : (
        <div className='page-inner-container'>
          <div className='monster-list-container'>
            <h4>Search For Monsters</h4>
            {/* NEED to hook up the Prev and next buttons */}
            <div className='page-controls-row'>
              <button
                onClick={handlePrevClick}
                className='prev-btn'
                disabled={prev === null ? true : false}
              >
                Prev
              </button>
              <button
                onClick={handleNextClick}
                className='next-btn'
                disabled={next === null ? true : false}
              >
                Next
              </button>
            </div>
            <ul>
              {!loading && data
                ? data.map((monster, idx) => (
                    <li key={idx}>
                      <button
                        className='monster-btn'
                        onClick={() => handleMonsterSelect(idx)}
                      >
                        {monster.name}
                      </button>
                    </li>
                  ))
                : null}
            </ul>
          </div>
          <section className='current-monster-view'>
            {!loading && currentMonster ? (
              <CurrentMonsterView
                monster={currentMonster}
                loading={loading}
                error={error}
              ></CurrentMonsterView>
            ) : (
              <Loader />
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default MonstersScreen;
