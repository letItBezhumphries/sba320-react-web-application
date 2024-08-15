import { createContext } from 'react';
import useFetch from '../hooks/useFetch';
import { getMonsters, getMonstersPage } from '../utility/requests';
import { get } from 'mongoose';

export const MonstersContext = createContext({
  monstersList: [],
  isLoading: true,
  errorThrown: {},
  nextPage: '',
  prevPage: '',
  toggleFav: (slug) => {},
});

export default (props) => {
  const {
    loading,
    pageData,
    next,
    prev,
    error,
    setPageData,
    setNext,
    setPrev,
  } = useFetch(getMonsters, [], true);

  console.log('loading:', loading, 'pageData:', pageData);

  const toggleFav = (slug) => {
    setPageData((currentMonstersList) => {
      const monsterIndex = currentMonstersList.findIndex(
        (monster) => monster.slug === slug
      );
      const newFav = !currentMonstersList[monsterIndex].isFav;
      const updatedMonsters = [...currentMonstersList];
      updatedMonsters[monsterIndex] = {
        ...currentMonstersList[monsterIndex],
        isFav: newFav,
      };

      console.log('mosnter to update', monsterIndex);

      return updatedMonsters;
    });
  };

  // const handlePaginateNext = () => {
  //   useFetch(getMonstersPage, pageData, true, next);
  // };

  // const handlePaginatePrev = () => {
  //   useFetch(getMonstersPage, pageData, true, prev);
  // };

  return (
    <MonstersContext.Provider
      value={{
        monstersList: pageData,
        isLoading: loading,
        prevPage: prev,
        nextPage: next,
        errorThrown: error,
        toggleFav: toggleFav,
      }}
    >
      {props.children}
    </MonstersContext.Provider>
  );
};
