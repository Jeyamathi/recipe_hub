// src/components/RecipeCard.jsx
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa"; 

function RecipeCard({ meal }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(meal.idMeal);

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition relative">
      <Link to={`/recipe/${meal.idMeal}`}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="h-40 mx-auto object-contain rounded mb-4"
        />
        <h2 className="font-bold text-lg">{meal.strMeal}</h2>
        <p className="text-gray-600 text-sm">{meal.strCategory}</p>
      </Link>

      <button
        onClick={() => (fav ? removeFavorite(meal.idMeal) : addFavorite(meal))}
        className="absolute top-2 right-2 text-red-500 hover:text-red-600 text-xl"
        title={fav ? "Remove from Favorites" : "Add to Favorites"}
      >
        {fav ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
}

export default RecipeCard;
