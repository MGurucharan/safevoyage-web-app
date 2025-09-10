import React from 'react';
import { MapPin, Star, Shield, Heart, Eye } from 'lucide-react';

const PlaceCard = ({ place, onSelect }) => {
  // Function to get safety score color
  const getSafetyScoreColor = (score) => {
    if (score >= 8.5) return 'from-green-500 to-emerald-500';
    if (score >= 7.0) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  // Function to get safety score text
  const getSafetyScoreText = (score) => {
    if (score >= 8.5) return 'Excellent';
    if (score >= 7.0) return 'Good';
    return 'Fair';
  };

  return (
    <div 
      className="group relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg hover:shadow-2xl hover:border-white/20 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
      onClick={onSelect}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={place.mainImage}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-sm ${
            place.category === 'local' 
              ? 'bg-gradient-to-r from-green-500/90 to-emerald-500/90' 
              : 'bg-gradient-to-r from-orange-500/90 to-red-500/90'
          }`}>
            {place.category === 'local' ? 'Local' : 'International'}
          </span>
        </div>

        {/* Heart Icon for favorites */}
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110">
            <Heart className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 hover:scale-110">
            <Eye className="h-4 w-4 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Place Name and Location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-200">
            {place.name}
          </h3>
          <div className="flex items-center text-gray-300 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{place.district}, {place.region}, {place.country}</span>
          </div>
        </div>

        {/* AI Safety Score */}
        <div className="mb-4 p-3 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-gray-300" />
              <span className="text-sm font-medium text-white">AI Safety Score</span>
            </div>
            <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${getSafetyScoreColor(place.aiSafetyScore)} text-white text-xs font-bold shadow-lg`}>
              {place.aiSafetyScore}/10
            </div>
          </div>
          <div className="text-xs text-gray-300">
            {getSafetyScoreText(place.aiSafetyScore)} • Based on safety, affordability & accessibility
          </div>
        </div>

        {/* Sample Review */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(place.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-500'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-300 ml-2">
              {place.rating} ({place.reviewCount} reviews)
            </span>
          </div>
          <p className="text-sm text-gray-300 line-clamp-2 italic">
            "{place.sampleReview}"
          </p>
        </div>

        {/* Price Range */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            ₹{place.priceRange.min.toLocaleString()} - ₹{place.priceRange.max.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">
            per person
          </div>
        </div>

        {/* Quick Info Tags */}
        <div className="flex flex-wrap gap-2">
          {place.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-500/20 backdrop-blur-sm text-blue-300 text-xs rounded-full border border-blue-400/30"
            >
              {tag}
            </span>
          ))}
          {place.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-500/20 backdrop-blur-sm text-gray-300 text-xs rounded-full border border-gray-400/30">
              +{place.tags.length - 3} more
            </span>
          )}
        </div>
        </div>
    </div>
  );
}             


export default PlaceCard;

