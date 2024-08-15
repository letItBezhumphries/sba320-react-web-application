import { createContext } from 'react';
import useFetch from '../hooks/useFetch';
import { getMonsters, getMonstersPage } from '../utility/requests';

export const MonstersContext = createContext({
  monstersList: [],
  loading: true,
  error: {},
  next: '',
  prev: '',
  toggleFav: (slug) => {},
});

export default (props) => {
  const { loading, pageData, next, prev, setPageData } = useFetch(
    getMonsters,
    [],
    true
  );

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

  return (
    <MonstersContext.Provider
      value={{
        monstersList: pageData,
        loading: loading,
        prev: prev,
        next: next,
        toggleFav: toggleFav,
      }}
    >
      {props.children}
    </MonstersContext.Provider>
  );
};
