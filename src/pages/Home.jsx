import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { FaUtensils } from "react-icons/fa";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("chicken");
  const [category, setCategory] = useState(""); // <-- NEW
  const [categories, setCategories] = useState([]); // <-- NEW
  const [loading, setLoading] = useState(true);

  // Fetch categories on first load
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.json())
      .then((data) => setCategories(data.meals.map((c) => c.strCategory)))
      .catch((err) => console.error("Error fetching categories", err));
  }, []);

  // Fetch recipes based on search or category
  useEffect(() => {
    setLoading(true);

    const url =
      category && category !== "All"
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`
        : `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.meals || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        setLoading(false);
      });
  }, [searchTerm, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = e.target.search.value.trim();
    if (term) {
      setCategory(""); // clear category when searching
      setSearchTerm(term);
    }
  };

  return (
   <div className="bg-blue-50 min-h-screen">
  <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl">
    {/* Title Section */}
    <div className="flex gap-3 mb-6 pt-4">
      <FaUtensils className="text-3xl text-orange-500" />
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 tracking-tight">
          My<span className="text-orange-500">Recipe</span>Hub
        </h1>
        <p className="text-sm sm:text-base text-gray-600">Explore & Favorite Meals</p>
      </div>
    </div>

    {/* Search & Filter */}
    <form onSubmit={handleSearch} className="mb-6 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          name="search"
          type="text"
          placeholder="Search by name..."
          className="border px-4 py-2 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="!bg-blue-500 text-white px-4 py-2 rounded hover:!bg-blue-600 transition"
        >
          Search
        </button>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-4 py-2 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      </div>
    </form>

    {/* Recipe Grid */}
    {loading ? (
      <p>Loading recipes...</p>
    ) : recipes.length === 0 ? (
      <p>No recipes found.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recipes.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    )}
  </div>
</div>

  );
}

export default Home;
