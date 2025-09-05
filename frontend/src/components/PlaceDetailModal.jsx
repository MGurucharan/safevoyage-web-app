import React, { useState } from 'react';
import { X, MapPin, Star, Shield, Users, Calendar, ArrowRight, Navigation, Info, Award } from 'lucide-react';
import ImageGallery from './ImageGallery';
import TransportOptions from './TransportOptions';
import ReviewsSection from './ReviewsSection';

const PlaceDetailModal = ({ place, isOpen, onClose }) => {
  const [showTransport, setShowTransport] = useState(false);
  const [userLocation, setUserLocation] = useState('');

  if (!isOpen || !place) return null;

  const getSafetyScoreColor = (score) => {
    if (score >= 9) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 7) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const averageRating = place.reviews.reduce((acc, review) => acc + review.rating, 0) / place.reviews.length;

  const handlePlanTravel = () => {
    if (userLocation.trim()) {
      setShowTransport(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{place.name}</h2>
            <div className="flex items-center space-x-2 text-gray-600 mt-1">
              <MapPin className="h-4 w-4" />
              <span>{place.region}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-600 hover:text-gray-900" />
          </button>
        </div>

        <div className="p-6">
          {/* Image Gallery */}
          <ImageGallery images={place.gallery} placeName={place.name} />

          {/* Main Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About {place.name}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">{place.description}</p>

              {/* Highlights */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-500" />
                  Key Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {place.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Safety Score & Stats */}
            <div className="space-y-6 lg:pl-4">
              {/* AI Safety Score - Marked for future dynamic updates */}
              <div className={`border-2 rounded-2xl p-6 ${getSafetyScoreColor(place.aiSafetyScore)}`}>
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="h-6 w-6" />
                  <h4 className="font-bold text-lg">AI Safety Score</h4>
                </div>
                <div className="text-3xl font-bold mb-2">{place.aiSafetyScore}/10</div>
                <p className="text-sm opacity-90 leading-relaxed">
                  AI-powered analysis based on safety incidents, tourist feedback, local infrastructure, 
                  and real-time monitoring data
                </p>
                {/* TODO: Connect to real-time AI safety scoring API */}
              </div>

              {/* Rating */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <h4 className="font-bold text-lg text-gray-900">Tourist Rating</h4>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(averageRating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{place.reviews.length} reviews</p>
              </div>

              {/* Category Badge */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-3">
                  <Navigation className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-bold text-gray-900">Travel Type</h4>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${
                      place.category === 'local' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {place.category === 'local' ? 'Local Travel' : 'International Travel'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-600" />
                  Quick Info
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Best Time to Visit:</span>
                    <span className="font-semibold text-gray-900">Oct - Mar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Stay:</span>
                    <span className="font-semibold text-gray-900">2-3 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tourist Volume:</span>
                    <span className="font-semibold text-gray-900">High</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language Support:</span>
                    <span className="font-semibold text-gray-900">Multi-lingual</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <ReviewsSection reviews={place.reviews} />

          {/* Plan Travel Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 mt-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">Plan Your Safe Journey</h3>
            
            {!showTransport ? (
              <div className="max-w-lg mx-auto">
                <label className="block text-lg font-semibold text-gray-700 mb-4 text-center">
                  Enter your current location
                </label>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <input
                    type="text"
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                    placeholder="e.g., Mumbai, Maharashtra"
                    className="flex-1 px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  />
                  <button
                    onClick={handlePlanTravel}
                    disabled={!userLocation.trim()}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <div className="flex items-center space-x-2">
                      <span>Plan Journey</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </button>
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Get personalized transportation options with real-time safety monitoring
                </p>
              </div>
            ) : (
              <TransportOptions
                from={userLocation}
                to={place.name}
                category={place.category}
                onBack={() => setShowTransport(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailModal;