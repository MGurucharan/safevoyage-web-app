
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PlaceCard from '../components/PlaceCard';
import { mockPlacesData } from '../data/placesData';

const ExplorePlaces = () => {
  const [places, setPlaces] = useState(mockPlacesData);
  const [filteredPlaces, setFilteredPlaces] = useState(mockPlacesData);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filter places based on search query and category
  useEffect(() => {
    let filtered = places;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(place => place.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(place => 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.district.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPlaces(filtered);
  }, [places, selectedCategory, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePlaceSelect = (placeId) => {
    navigate(`/explore-places/${placeId}`);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Explore Amazing Places
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Discover safe and beautiful destinations around the world with AI-powered safety insights
              </p>
              
              {/* Search Bar */}
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </section>

        {/* Category Filter Section */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Places
              </button>
              <button
                onClick={() => handleCategoryChange('local')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === 'local'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Local Travel
              </button>
              <button
                onClick={() => handleCategoryChange('international')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === 'international'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                International Travel
              </button>
            </div>
          </div>
        </section>

        {/* Places Grid Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPlaces.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No places found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or category filter.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedCategory === 'all' ? 'All Destinations' : 
                     selectedCategory === 'local' ? 'Local Destinations' : 'International Destinations'}
                  </h2>
                  <span className="text-gray-600">
                    {filteredPlaces.length} place{filteredPlaces.length !== 1 ? 's' : ''} found
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPlaces.map((place) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      onSelect={() => handlePlaceSelect(place.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}   

export default ExplorePlaces;


