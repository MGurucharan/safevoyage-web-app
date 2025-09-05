
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = "Search destinations by country, state, district, or city...", popularSearches = ['Paris', 'Tokyo', 'New York', 'Bali', 'Dubai', 'London'] }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Real-time search
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full pl-12 pr-16 py-4 text-lg bg-white border border-gray-300 rounded-xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-4"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Search className="h-5 w-5" />
            </div>
          </button>
        </div>
      </form>
      
      {/* Search suggestions or popular destinations */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <span className="text-blue-100 text-sm">Popular searches:</span>
        {popularSearches.map((city) => (
          <button
            key={city}
            onClick={() => {
              setQuery(city);
              onSearch(city);
            }}
            className="px-3 py-1 bg-white/20 text-white text-sm rounded-full hover:bg-white/30 transition-colors duration-200"
          >
            {city}
          </button>
        ))}

        </div>
    </div>
  );
}   


export default SearchBar;


