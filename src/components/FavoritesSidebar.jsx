// src/components/FavoritesSidebar.jsx
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function FavoritesSidebar({onClose}) {
  const { favorites, removeFavorite } = useFavorites();

  return (
     <div className="w-96 fixed right-0 top-0 h-full bg-white shadow-xl p-6 z-50 border-l overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold mb-4">❤️ Favorites</h2>
      <button onClick={onClose} className="text-red-600 text-2xl font-semibold">×</button>
      </div>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites yet.</p>
      ) : (
        <ul className="space-y-2">
          {favorites.map((meal) => (
            <li key={meal.idMeal} className="flex justify-between items-center">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-16 h-16 object-cover rounded mr-2"/>
              <Link
                to={`/recipe/${meal.idMeal}`}
                className="text-blue-600 hover:underline text-sm truncate w-44"
              >
                {meal.strMeal}
              </Link>
              <button
                onClick={() => removeFavorite(meal.idMeal)}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesSidebar;
