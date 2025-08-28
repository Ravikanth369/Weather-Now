import React, { useState } from 'react';

/**
 * SearchBar
 * - onSearch(city): callback to perform search
 * - recentSearches: array of recent city strings
 */
const SearchBar = ({ onSearch, recentSearches = [] }) => {
  const [query, setQuery] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
    setQuery('');
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={submit} className="flex items-center gap-2">
        <label htmlFor="citySearch" className="sr-only">Search city</label>
        <input
          id="citySearch"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city (e.g., New York)"
          className="flex-1 p-3 rounded-l-2xl border border-gray-300 focus:ring-2 focus:outline-none"
          aria-label="City search input"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-r-2xl bg-blue-500 hover:bg-blue-600 text-white focus:ring-2"
          aria-label="Search"
        >
          Search
        </button>
      </form>

      {/* Recent searches - clickable chips */}
      {recentSearches?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {recentSearches.map((c, i) => (
            <button
              key={i}
              onClick={() => onSearch(c)}
              className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 hover:text-white transition-colors"
              aria-label={`Search recent ${c}`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
