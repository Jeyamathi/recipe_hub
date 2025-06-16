// src/context/FavoritesContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (meal) => {
     console.log("Trying to add favorite:", meal.strMeal);
    if (!favorites.find((fav) => fav.idMeal === meal.idMeal)) {
      setFavorites([...favorites, meal]);
    }
  };

  const removeFavorite = (idMeal) => {
    setFavorites(favorites.filter((meal) => meal.idMeal !== idMeal));
  };

  const isFavorite = (idMeal) => {
    return favorites.some((meal) => meal.idMeal === idMeal);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
