import React, { useState } from 'react';
import { X, MapPin, Clock, IndianRupee, Route, Navigation } from 'lucide-react';
import { mockTransportationData } from '../data/placesData';

const TransportModal = ({ place, onClose }) => {
  const [currentLocation, setCurrentLocation] = useState('');
  const [showTransportOptions, setShowTransportOptions] = useState(false);

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (currentLocation.trim()) {
      setShowTransportOptions(true);
    }
  };

  const transportOptions = place.category === 'local' 
    ? mockTransportationData.local 
    : mockTransportationData.international;

  // Sort transport options by cost (cheapest first) and time (fastest first)
  const sortedByCost = [...transportOptions].sort((a, b) => a.cost.min - b.cost.min);
  const sortedByTime = [...transportOptions].sort((a, b) => {
    const aTime = parseInt(a.time.split('-')[0]);
    const bTime = parseInt(b.time.split('-')[0]);
    return aTime - bTime;
  });

  const cheapestOption = sortedByCost[0];
  const fastestOption = sortedByTime[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Plan Your Travel</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {/* Destination Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl mb-6">
            <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium text-gray-700">Destination:</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{place.name}</h3>
            <p className="text-gray-600">{place.district}, {place.region}, {place.country}</p>
          </div>

          {!showTransportOptions ? (
            /* Location Input Form */
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Enter Your Current Location
                </h3>
                <form onSubmit={handleLocationSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="currentLocation" className="block text-sm font-medium text-gray-700 mb-2">
                      Current Location *
                    </label>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="currentLocation"
                        value={currentLocation}
                        onChange={(e) => setCurrentLocation(e.target.value)}
                        placeholder="Enter your city, state, or landmark..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                        required
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Example: Mumbai, Maharashtra or Delhi Airport
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Find Transport Options
                  </button>
                </form>
              </div>

              {/* Info about transport calculation */}
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="font-medium text-blue-900 mb-2">What you'll get:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Multiple transport mode options</li>
                  <li>• Estimated travel times and costs</li>
                  <li>• Fastest and cheapest route recommendations</li>
                  <li>• Real-time availability (future feature)</li>
                </ul>
              </div>
            </div>
          ) : (
            /* Transport Options Display */
            <div className="space-y-6">
              {/* Current Route Info */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Navigation className="h-4 w-4 mr-1" />
                      From: {currentLocation}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      To: {place.name}, {place.region}
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTransportOptions(false)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Change Location
                  </button>
                </div>
              </div>

              {/* Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Fastest Option */}
                <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <div className="text-2xl mr-2">{fastestOption.icon}</div>
                    <div>
                      <h4 className="font-semibold text-green-800">Fastest Route</h4>
                      <p className="text-sm text-green-600">{fastestOption.name}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center text-green-700">
                      <Clock className="h-4 w-4 mr-1" />
                      {fastestOption.time}
                    </div>
                    <div className="flex items-center text-green-700">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      ₹{fastestOption.cost.min.toLocaleString()} - ₹{fastestOption.cost.max.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Cheapest Option */}
                <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <div className="text-2xl mr-2">{cheapestOption.icon}</div>
                    <div>
                      <h4 className="font-semibold text-blue-800">Cheapest Route</h4>
                      <p className="text-sm text-blue-600">{cheapestOption.name}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center text-blue-700">
                      <Clock className="h-4 w-4 mr-1" />
                      {cheapestOption.time}
                    </div>
                    <div className="flex items-center text-blue-700">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      ₹{cheapestOption.cost.min.toLocaleString()} - ₹{cheapestOption.cost.max.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* All Transport Options */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">All Transport Options</h3>
                <div className="space-y-3">
                  {transportOptions.map((option, index) => (
                    <div key={index} className="bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-3xl mr-4">{option.icon}</div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{option.name}</h4>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <Clock className="h-4 w-4 mr-1" />
                              <span className="mr-4">{option.time}</span>
                              <IndianRupee className="h-4 w-4 mr-1" />
                              <span>₹{option.cost.min.toLocaleString()} - ₹{option.cost.max.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-md transition-all duration-200 text-sm font-medium">
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Future Features Note */}
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                <h4 className="font-medium text-yellow-800 mb-2">🚀 Coming Soon:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Real-time pricing and availability</li>
                  <li>• Direct booking integration</li>
                  <li>• Route optimization based on traffic</li>
                  <li>• Multi-modal journey planning</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransportModal;
