import { createContext } from 'react';
import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { getMonsters, getMonstersPage } from '../utility/requests';

export const MonstersContext = createContext({
  monstersList: [],
  favorites: [],
  loading: true,
  error: {},
  next: '',
  prev: '',
});

export default (props) => {
  const [monstersList, setMonstersList] = useState([]);
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

  // let extendedData = data.map((monster) => {
  //   return {
  //     ...monster,
  //     isFav: false,
  //   };
  // });
  // setMonstersList(extendedData);

  // console.log('loading:', loading, 'data:', monstersList);

  // const toggleFav = (slug) => {
  //   setMonstersList((currentMonstersList) => {
  //     const monsterIndex = currentMonstersList.findIndex(
  //       (monster) => monster.slug === slug
  //     );
  //     const newFav = !currentMonstersList[monsterIndex].isFav;
  //     const updatedMonsters = [...currentMonstersList];
  //     updatedMonsters[monsterIndex] = {
  //       ...currentMonstersList[monsterIndex],
  //       isFav: newFav,
  //     };

  //     // setFavoriteMonsters((currentFavs) => {
  //     //   return [...currentFavs, updatedMonsters[monsterIndex]];
  //     // });
  //     console.log('mosnter to update', monsterIndex);

  //     return updatedMonsters;
  //   });
  // };

  return (
    <MonstersContext.Provider
      value={{ monstersList: data, loading: loading, prev: prev, next: next }}
    >
      {props.children}
    </MonstersContext.Provider>
  );
};
