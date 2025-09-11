import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Shield, 
  ChevronLeft, 
  ChevronRight,
  ThumbsUp,
  Calendar,
  User,
  Clock,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Users,
  Phone,
  Camera,
  Mountain,
  Ticket
} from 'lucide-react';
import { mockPlacesData } from '../data/placesData';
import { useAISummary } from '../hooks/useAISummary';
import { useAISafetyAnalysis } from '../hooks/useAISafetyAnalysis';
import AISummarySection from '../components/AISummarySection';
import AISafetyScore from '../components/AISafetyScore';
import TransportModal from '../components/TransportModal';

const PlaceDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showTransportModal, setShowTransportModal] = useState(false);

  // AI Summary hook
  const {
    summary: aiSummary,
    isLoading: aiLoading,
    error: aiError,
    lastGenerated,
    refreshSummary
  } = useAISummary(
    place?.reviews || [],
    'place',
    place?.name || 'Place',
    !!place // Only enabled when place is loaded
  );

  // AI Safety Analysis hook
  const {
    safetyAnalysis,
    loading: safetyLoading,
    error: safetyError,
    refresh: refreshSafetyAnalysis
  } = useAISafetyAnalysis(
    place?.reviews || [],
    'place',
    place?.name || 'Place',
    !!place // Only enabled when place is loaded
  );

  useEffect(() => {
    const foundPlace = mockPlacesData.find(p => p.id === parseInt(id));
    setPlace(foundPlace);
  }, [id]);

  if (!place) {
    // Apply landing page background and overlay for not found state
    return (
      <div
        className="relative min-h-screen overflow-x-hidden flex items-center justify-center"
        style={{
          backgroundImage: `url(https://media.istockphoto.com/id/1362422378/photo/abstract-blurred-purple-background-light-spot-on-dark-background.jpg?s=612x612&w=0&k=20&c=yFF6-7r_YZQ-r3rTgMPU5n4w-5x3qy0e0wZwZukM2c0=)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 w-full max-w-md px-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Place not found</h2>
            <button
              onClick={() => navigate('/explore-places')}
              className="text-blue-600 hover:text-blue-800"
            >
              Back to Explore Places
            </button>
          </div>
        </div>
      </div>
    );
  }

  const images = place.gallery || place.images || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getHighlightIcon = (highlight) => {
    const icons = {
      'UNESCO World Heritage Site': <Mountain className="h-5 w-5" />,
      'Architectural Marvel': <Users className="h-5 w-5" />,
      'Beach Paradise': <Wifi className="h-5 w-5" />,
      'Water Sports': <Users className="h-5 w-5" />,
      'Cultural Heritage': <User className="h-5 w-5" />,
      'Photography Paradise': <Camera className="h-5 w-5" />,
      'Historic Landmark': <Mountain className="h-5 w-5" />,
      'Nature': <Mountain className="h-5 w-5" />,
      'Adventure': <Mountain className="h-5 w-5" />
    };
    return icons[highlight] || <Mountain className="h-5 w-5" />;
  };

  const handleVisitPlanning = () => {
    // Future: Integrate with visit planning system
    alert(`Planning visit to ${place.name}`);
  };

  // Apply landing page background and overlay
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        backgroundImage: `url(https://media.istockphoto.com/id/1362422378/photo/abstract-blurred-purple-background-light-spot-on-dark-background.jpg?s=612x612&w=0&k=20&c=yFF6-7r_YZQ-r3rTgMPU5n4w-5x3qy0e0wZwZukM2c0=)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10">
        {/* Header with Back Button */}
        <div className="bg-gray-900/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => navigate('/explore-places')}
              className="flex items-center text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Explore Places
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative h-96 rounded-2xl overflow-hidden">
                {images.length > 0 ? (
                  <img
                    src={images[currentImageIndex]}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/60 bg-black/20">
                    No images available
                  </div>
                )}
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-900/50 backdrop-blur-sm rounded-full hover:bg-gray-900/70 transition-all duration-200 text-white hover:scale-110"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-900/50 backdrop-blur-sm rounded-full hover:bg-gray-900/70 transition-all duration-200 text-white hover:scale-110"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 0 && (
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-sm rounded-full border border-white/20">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        currentImageIndex === index 
                          ? 'border-blue-400 ring-2 ring-blue-400/30 shadow-lg' 
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${place.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Place Information */}
            <div className="space-y-6">
              {/* Header Info */}
              <div>
                <div className="flex items-center mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white mr-3 ${
                    place.category === 'local' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}>
                    {place.category === 'local' ? 'Local Attraction' : 'International Destination'}
                  </span>
                </div>
                
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{place.name}</h1>
                
                <div className="flex items-center text-gray-300 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{place.region}</span>
                </div>

                {/* Rating Display */}
                {(place.rating || (place.reviews && place.reviews.length > 0)) && (
                  <div className="flex items-center mb-6">
                    <div className="flex items-center mr-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(place.rating || (place.reviews.reduce((acc, review) => acc + review.rating, 0) / place.reviews.length)) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-500'
                          }`}
                        />
                      ))}
                      <span className="text-lg font-medium text-white ml-2">
                        {place.rating ? place.rating.toFixed(1) : (place.reviews.reduce((acc, review) => acc + review.rating, 0) / place.reviews.length).toFixed(1)}
                      </span>
                      <span className="text-gray-300 ml-1">
                        ({place.reviewCount || place.reviews.length} reviews)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* AI Safety Score */}
              <AISafetyScore 
                safetyAnalysis={safetyAnalysis}
                loading={safetyLoading}
                error={safetyError}
                onRefresh={refreshSafetyAnalysis}
              />

              {/* Visit Information */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">Visit Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-gray-300" />
                    <div>
                      <p className="font-medium text-white">Best Time to Visit</p>
                      <p className="text-sm text-gray-400">October to March</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Ticket className="h-5 w-5 mr-2 text-gray-300" />
                    <div>
                      <p className="font-medium text-white">Entry</p>
                      <p className="text-sm text-gray-400">Open to public</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              {place.priceRange && (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-4">Estimated Cost</h3>
                  <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    ₹{place.priceRange.min.toLocaleString()} - ₹{place.priceRange.max.toLocaleString()}
                  </div>
                  <p className="text-gray-300">per person (estimated)</p>
                </div>
              )}

              {/* Transportation */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">Transportation</h3>
                <button
                  onClick={() => setShowTransportModal(true)}
                  className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center shadow-lg"
                >
                  <Car className="h-5 w-5 mr-2" />
                  Get Transport Options
                </button>
              </div>
            </div>
          </div>

          {/* Visit Planning Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Plan Your Visit</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Visit Date */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Preferred Visit Date</label>
                <input
                  type="date"
                  className="w-full p-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
                />
              </div>
              
              {/* Group Size */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Group Size</label>
                <select
                  className="w-full p-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num} className="bg-gray-800">{num} Person{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Duration</label>
                <select
                  className="w-full p-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
                >
                  <option value="half-day" className="bg-gray-800">Half Day</option>
                  <option value="full-day" className="bg-gray-800">Full Day</option>
                  <option value="2-days" className="bg-gray-800">2 Days</option>
                  <option value="3-days" className="bg-gray-800">3+ Days</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleVisitPlanning}
              className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center shadow-lg"
            >
              <Calendar className="h-6 w-6 mr-3" />
              Plan My Visit
            </button>
          </div>

          {/* Description */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">About This Place</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">{place.description}</p>
            
            {/* Highlights */}
            {(place.tags || place.highlights || place.features) && (
              <div className="flex flex-wrap gap-2">
                {(place.tags || place.highlights || place.features).map((highlight, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 border border-blue-400/30 text-blue-300 rounded-full text-sm font-medium backdrop-blur-sm"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Highlights/Features */}
          {(place.tags || place.highlights || place.features) && (
            <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Key Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(place.tags || place.highlights || place.features).map((highlight, index) => (
                  <div key={index} className="flex items-center p-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg">
                    <div className="text-blue-400 mr-3">
                      {getHighlightIcon(highlight)}
                    </div>
                    <span className="text-gray-300 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Summarized Feedback & Reviews */}
          {place.reviews && place.reviews.length > 0 && (
            <AISummarySection 
              summary={aiSummary}
              isLoading={aiLoading}
              error={aiError}
              lastGenerated={lastGenerated}
              onRefresh={refreshSummary}
              type="place"
              showRefreshButton={true}
            />
          )}

          {/* Reviews Section */}
          {place.reviews && place.reviews.length > 0 && (
            <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6">
                Visitor Reviews & Feedback
              </h2>
              
              <div className="space-y-6">
                {place.reviews.map((review) => (
                  <div key={review.id} className="border-b border-white/20 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-sm">
                          {(review.user || review.author).charAt(0)}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-semibold text-white">{review.user || review.author}</h4>
                          <div className="flex items-center">
                            <div className="flex items-center mr-3">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="flex items-center text-sm text-gray-400">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(review.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-3 leading-relaxed">{review.comment}</p>
                    
                    <div className="flex items-center text-sm text-gray-400">
                      <button className="flex items-center hover:text-blue-400 transition-colors duration-200">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Future: Dynamic review integration */}
              <div className="mt-6 text-center text-sm text-blue-300 bg-blue-400/10 backdrop-blur-sm border border-blue-400/30 p-4 rounded-lg">
                💡 Reviews are updated in real-time from multiple travel platforms and visitor feedback
              </div>
            </div>
          )}

          {/* Transport Modal */}
          {showTransportModal && (
            <TransportModal
              place={place}
              onClose={() => setShowTransportModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailView;
