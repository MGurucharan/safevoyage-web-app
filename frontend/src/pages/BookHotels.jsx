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

  const backgroundImageUrl = 'https://media.istockphoto.com/id/1362422378/photo/abstract-blurred-purple-background-light-spot-on-dark-background.jpg?s=612x612&w=0&k=20&c=yFF6-7r_YZQ-r3rTgMPU5n4w-5x3qy0e0wZwZukM2c0=';

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tighter">
                Book Amazing
                <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent pb-4">
                  Hotels
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-t from-gray-400 to-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed">
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
        <section className="py-12 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                Explore by Hotel Category
              </h2>
              <p className="text-lg text-transparent bg-clip-text bg-gradient-to-t from-gray-400 to-gray-100 max-w-2xl mx-auto">
                Choose your hotel preference and discover amazing stays
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl scale-105'
                    : 'bg-gray-900/50 backdrop-blur-sm border border-white/10 text-white hover:border-white/20 hover:shadow-xl'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>All Hotels</span>
                </div>
                {selectedCategory === 'all' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                )}
              </button>
              <button
                onClick={() => handleCategoryChange('local')}
                className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                  selectedCategory === 'local'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl scale-105'
                    : 'bg-gray-900/50 backdrop-blur-sm border border-white/10 text-white hover:border-white/20 hover:shadow-xl'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>Local Hotels</span>
                </div>
                {selectedCategory === 'local' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                )}
              </button>
              <button
                onClick={() => handleCategoryChange('international')}
                className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                  selectedCategory === 'international'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl scale-105'
                    : 'bg-gray-900/50 backdrop-blur-sm border border-white/10 text-white hover:border-white/20 hover:shadow-xl'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>International Hotels</span>
                </div>
                {selectedCategory === 'international' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Hotels Grid Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredHotels.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
                  <h3 className="text-3xl font-bold text-white mb-4">No hotels found</h3>
                  <p className="text-transparent bg-clip-text bg-gradient-to-t from-gray-400 to-gray-100">
                    Try adjusting your search criteria or category filter.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                    {selectedCategory === 'all' ? 'All Hotels' : 
                     selectedCategory === 'local' ? 'Local Hotels' : 'International Hotels'}
                  </h2>
                  <p className="text-lg text-transparent bg-clip-text bg-gradient-to-t from-gray-400 to-gray-100">
                    {filteredHotels.length} amazing hotel{filteredHotels.length !== 1 ? 's' : ''} waiting for you
                  </p>
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
