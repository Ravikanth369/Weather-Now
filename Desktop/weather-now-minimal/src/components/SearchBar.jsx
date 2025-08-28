import React, { useState } from 'react';

const SearchBar = ({ onSearch, recentSearches }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    onSearch(query);
    setQuery('');
  };

  return (
    <div className="w-full max-w-md mx-auto my-4">
      <form className="flex" onSubmit={handleSubmit}>
        <input
          className="flex-1 p-3 rounded-l-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-300"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city"
          aria-label="City search input"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-r-2xl transition-colors duration-300"
        >
          Search
        </button>
      </form>
      {recentSearches?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {recentSearches.map((city, idx) => (
            <button
              key={idx}
              onClick={() => onSearch(city)}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-400 hover:text-white transition-colors duration-300"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
