import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.meals?.[0]));
  }, [id]);

  if (!recipe) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow mt-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2">{recipe.strMeal}</h1>
      <p className="text-gray-600 mb-4">
        Category: {recipe.strCategory} | Area: {recipe.strArea}
      </p>

      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full max-h-96 object-cover rounded mb-6" />

      <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc pl-6 mb-6">
        {ingredients.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
      <p className="text-gray-700 mb-6 whitespace-pre-line">{recipe.strInstructions}</p>

      {recipe.strYoutube && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Video Tutorial</h2>
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;
