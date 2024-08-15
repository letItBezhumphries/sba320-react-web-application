import React from 'react';
import { createContext, useState } from 'react';

const FavoritesContext = createContext({
  favorites: [],
  toggleFav: () => {},
});

export default (props) => {
  const [favoritesList, setFavoritesList] = useState();

  const toggleFavorite = (monster) => {
    setFavoritesList((prevFavs) => {
      return [...prevFavs, monster];
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites: favoritesList, toggleFav: toggleFavorite }}
    >
      {props.children}
    </FavoritesContext.Provider>
  );
};
