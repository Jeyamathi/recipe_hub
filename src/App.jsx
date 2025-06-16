import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import FavoritesSidebar from "./components/FavoritesSidebar";

function App() {
  const [showFav, setShowFav] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      {/* Main Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>

      {/* Floating Favorites Toggle Button */}
      <button
        onClick={() => setShowFav(!showFav)}
        className="fixed bottom-4 right-4 !bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-40 hover:!bg-blue-700 transition"
      >
        {showFav ? "Close Favorites" : "❤️ Favorites"}
      </button>

      {/* Favorites Sidebar */}
      {showFav && (
        <div className="fixed top-0 right-0 w-full sm:w-80 h-full bg-white shadow-lg z-30 transition-transform">
          <FavoritesSidebar onClose={() => setShowFav(false)} />
        </div>
      )}
    </div>
  );
}

export default App;
