import { useEffect, useState } from "react";

function FilterPanel({ selectedCategory, setSelectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []));
  }, []);

  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold">Filter by Category:</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border px-4 py-2 rounded w-full"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.idCategory} value={cat.strCategory}>
            {cat.strCategory}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterPanel;
