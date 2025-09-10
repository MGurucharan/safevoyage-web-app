import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, MapPin, FileText, Heart, Route, Plane, CheckCircle, AlertCircle } from 'lucide-react';
import { useUserAuth } from '../hooks/useUserAuth';
import authService from '../services/authService';

const CompleteProfile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [userID, setUserID] = useState('');
  
  const navigate = useNavigate();
  const { user, updateUser } = useUserAuth();

  const [formData, setFormData] = useState({
    // Basic Information (from DigitalID form)
    fullName: '',
    email: user?.email || '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    aadhaarNumber: '',
    address: '',
    
    // Additional Profile Information
    favouritePlaces: [],
    newFavouritePlace: '',
    
    // Trip Itinerary
    tripItinerary: {
      destinations: [],
      startDate: '',
      endDate: '',
      totalDuration: '',
      budget: '',
      travelType: 'Leisure'
    },
    newDestination: {
      place: '',
      date: '',
      duration: '',
      notes: ''
    },
    
    // Travel Planning
    travelPlanning: {
      preferredTransport: [],
      accommodationPreference: 'Hotel',
      budgetRange: 'Mid-range',
      travelInterests: []
    }
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else if (type === 'checkbox') {
      const section = name.includes('Transport') ? 'preferredTransport' : 'travelInterests';
      const parentSection = 'travelPlanning';
      
      setFormData(prev => ({
        ...prev,
        [parentSection]: {
          ...prev[parentSection],
          [section]: checked 
            ? [...prev[parentSection][section], value]
            : prev[parentSection][section].filter(item => item !== value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addFavouritePlace = () => {
    if (formData.newFavouritePlace.trim()) {
      setFormData(prev => ({
        ...prev,
        favouritePlaces: [...prev.favouritePlaces, prev.newFavouritePlace.trim()],
        newFavouritePlace: ''
      }));
    }
  };

  const removeFavouritePlace = (index) => {
    setFormData(prev => ({
      ...prev,
      favouritePlaces: prev.favouritePlaces.filter((_, i) => i !== index)
    }));
  };

  const addDestination = () => {
    if (formData.newDestination.place.trim()) {
      setFormData(prev => ({
        ...prev,
        tripItinerary: {
          ...prev.tripItinerary,
          destinations: [...prev.tripItinerary.destinations, { ...prev.newDestination }]
        },
        newDestination: {
          place: '',
          date: '',
          duration: '',
          notes: ''
        }
      }));
    }
  };

  const removeDestination = (index) => {
    setFormData(prev => ({
      ...prev,
      tripItinerary: {
        ...prev.tripItinerary,
        destinations: prev.tripItinerary.destinations.filter((_, i) => i !== index)
      }
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.nationality) newErrors.nationality = 'Nationality is required';
      if (!formData.passportNumber) newErrors.passportNumber = 'Passport number is required';
      if (!formData.aadhaarNumber) newErrors.aadhaarNumber = 'Aadhaar number is required';
      if (!formData.address) newErrors.address = 'Address is required';
    }

    return newErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setErrors({});
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(1);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setCurrentStep(1);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const profileData = {
        ...formData,
        email: user?.email || formData.email
      };

      const response = await authService.completeProfile(user?.userId, profileData);
      
      if (response.success) {
        setUserID(response.data.userID);
        setShowSuccess(true);
        // Update user with both profile completion status AND the new userID
        updateUser({ 
          isProfileComplete: true,
          userID: response.data.userID
        });
        
        setTimeout(() => {
          navigate('/user-dashboard');
        }, 3000);
      }
    } catch (error) {
      setErrors({
        submit: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-950 flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 max-w-md w-full text-center border border-white/20 shadow-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Profile Completed!</h2>
          <p className="text-gray-300 mb-4">
            Your profile has been created successfully.
          </p>
          <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 mb-6">
            <p className="text-blue-400 text-sm mb-2">Your User ID:</p>
            <p className="text-white font-mono text-lg">{userID}</p>
          </div>
          <p className="text-gray-400 text-sm">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
            <p className="text-gray-300">Help us create your personalized SafeVoyage experience</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-24 h-1 mx-2 ${
                      currentStep > step ? 'bg-blue-500' : 'bg-gray-600'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Basic Info</span>
              <span>Preferences</span>
              <span>Travel Plans</span>
            </div>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <span className="text-red-400 text-sm">{errors.submit}</span>
            </div>
          )}

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled
                    className="w-full px-4 py-3 bg-gray-600/50 border border-white/20 rounded-lg text-gray-400 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.dateOfBirth && <p className="mt-1 text-sm text-red-400">{errors.dateOfBirth}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nationality</label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your nationality"
                  />
                  {errors.nationality && <p className="mt-1 text-sm text-red-400">{errors.nationality}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Passport Number</label>
                  <input
                    type="text"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your passport number"
                  />
                  {errors.passportNumber && <p className="mt-1 text-sm text-red-400">{errors.passportNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Aadhaar Number</label>
                  <input
                    type="text"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your Aadhaar number"
                  />
                  {errors.aadhaarNumber && <p className="mt-1 text-sm text-red-400">{errors.aadhaarNumber}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Enter your full address"
                />
                {errors.address && <p className="mt-1 text-sm text-red-400">{errors.address}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Preferences */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Your Preferences
              </h3>

              {/* Favourite Places */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Favourite Places</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    name="newFavouritePlace"
                    value={formData.newFavouritePlace}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a favourite place"
                  />
                  <button
                    type="button"
                    onClick={addFavouritePlace}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.favouritePlaces.map((place, index) => (
                    <span
                      key={index}
                      className="bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{place}</span>
                      <button
                        type="button"
                        onClick={() => removeFavouritePlace(index)}
                        className="text-purple-300 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Travel Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Travel Interests</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Culture', 'Adventure', 'Food', 'Nature', 'History', 'Art', 'Music', 'Sports', 'Shopping', 'Nightlife'].map((interest) => (
                    <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="travelInterests"
                        value={interest}
                        checked={formData.travelPlanning.travelInterests.includes(interest)}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-300">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Accommodation Preference */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Accommodation Preference</label>
                  <select
                    name="travelPlanning.accommodationPreference"
                    value={formData.travelPlanning.accommodationPreference}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Hotel">Hotel</option>
                    <option value="Resort">Resort</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Homestay">Homestay</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Budget Range</label>
                  <select
                    name="travelPlanning.budgetRange"
                    value={formData.travelPlanning.budgetRange}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Budget">Budget</option>
                    <option value="Mid-range">Mid-range</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
              </div>

              {/* Preferred Transport */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Preferred Transport</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {['Flight', 'Train', 'Bus', 'Car', 'Ship'].map((transport) => (
                    <label key={transport} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="preferredTransport"
                        value={transport}
                        checked={formData.travelPlanning.preferredTransport.includes(transport)}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-300">{transport}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Travel Plans */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Route className="h-5 w-5 mr-2" />
                Trip Planning
              </h3>

              {/* Trip Itinerary Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Travel Type</label>
                  <select
                    name="tripItinerary.travelType"
                    value={formData.tripItinerary.travelType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Solo">Solo</option>
                    <option value="Family">Family</option>
                    <option value="Friends">Friends</option>
                    <option value="Business">Business</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Leisure">Leisure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Budget</label>
                  <input
                    type="text"
                    name="tripItinerary.budget"
                    value={formData.tripItinerary.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., $5000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                  <input
                    type="date"
                    name="tripItinerary.startDate"
                    value={formData.tripItinerary.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                  <input
                    type="date"
                    name="tripItinerary.endDate"
                    value={formData.tripItinerary.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Destinations */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Destinations</label>
                <div className="bg-white/5 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      name="place"
                      value={formData.newDestination.place}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        newDestination: { ...prev.newDestination, place: e.target.value }
                      }))}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Destination"
                    />
                    <input
                      type="date"
                      name="date"
                      value={formData.newDestination.date}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        newDestination: { ...prev.newDestination, date: e.target.value }
                      }))}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="duration"
                      value={formData.newDestination.duration}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        newDestination: { ...prev.newDestination, duration: e.target.value }
                      }))}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Duration (e.g., 3 days)"
                    />
                    <input
                      type="text"
                      name="notes"
                      value={formData.newDestination.notes}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        newDestination: { ...prev.newDestination, notes: e.target.value }
                      }))}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Notes"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addDestination}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Destination
                  </button>
                </div>

                {formData.tripItinerary.destinations.length > 0 && (
                  <div className="space-y-2">
                    {formData.tripItinerary.destinations.map((dest, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <span className="text-white font-medium">{dest.place}</span>
                          {dest.date && <span className="text-gray-400 ml-2">({dest.date})</span>}
                          {dest.duration && <span className="text-gray-400 ml-2">- {dest.duration}</span>}
                          {dest.notes && <span className="text-gray-500 block text-sm">{dest.notes}</span>}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDestination(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Previous
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="ml-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Completing Profile...</span>
                  </div>
                ) : (
                  'Complete Profile'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
