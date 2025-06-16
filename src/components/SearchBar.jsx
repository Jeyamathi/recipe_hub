function SearchBar({ searchQuery, setSearchQuery, onSearch }) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 border border-gray-300 px-4 py-2 rounded"
      />
      <button
        onClick={onSearch}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
