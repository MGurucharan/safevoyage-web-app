import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import HotelCard from '../components/HotelCard';
import { mockHotelsData } from '../data/hotelsData';

const BookHotels = () => {
  const [hotels, setHotels] = useState(mockHotelsData);
  const [filteredHotels, setFilteredHotels] = useState(mockHotelsData);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filter hotels based on search query and category
  useEffect(() => {
    let filtered = hotels;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(hotel => hotel.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(hotel => 
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredHotels(filtered);
  }, [hotels, selectedCategory, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleHotelSelect = (hotelId) => {
    navigate(`/book-hotels/${hotelId}`);
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
                Book Amazing Hotels
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Discover safe and comfortable accommodations around the world with AI-powered safety insights
              </p>
              
              {/* Search Bar */}
              <SearchBar 
                onSearch={handleSearch} 
                placeholder="Search hotels by name, location, or amenities..."
                popularSearches={['Luxury Hotels', 'Beach Resort', 'Business Hotel', 'Spa Resort', 'Mountain View', 'City Center']}
              />
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
                All Hotels
              </button>
              <button
                onClick={() => handleCategoryChange('local')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === 'local'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Local Hotels
              </button>
              <button
                onClick={() => handleCategoryChange('international')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === 'international'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                International Hotels
              </button>
            </div>
          </div>
        </section>

        {/* Hotels Grid Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredHotels.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No hotels found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or category filter.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedCategory === 'all' ? 'All Hotels' : 
                     selectedCategory === 'local' ? 'Local Hotels' : 'International Hotels'}
                  </h2>
                  <span className="text-gray-600">
                    {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} found
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredHotels.map((hotel) => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      onSelect={() => handleHotelSelect(hotel.id)}
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
};

export default BookHotels;
