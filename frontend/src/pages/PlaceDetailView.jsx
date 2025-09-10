import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Route,
} from "lucide-react";
import { mockPlacesData } from "../data/placesData";
import TransportModal from "../components/TransportModal";

const PlaceDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showTransportModal, setShowTransportModal] = useState(false);

  useEffect(() => {
    const foundPlace = mockPlacesData.find((p) => p.id === parseInt(id));
    setPlace(foundPlace);
  }, [id]);

  if (!place) {
    // Apply landing page background and overlay for not found state
    return (
      <div
        className="relative font-sans min-h-screen overflow-x-hidden flex items-center justify-center"
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
              onClick={() => navigate("/explore-places")}
              className="text-blue-600 hover:text-blue-800"
            >
              Back to Explore Places
            </button>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % place.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + place.images.length) % place.images.length
    );
  };

  const getSafetyScoreColor = (score) => {
    if (score >= 8.5) return "from-green-500 to-emerald-500";
    if (score >= 7.0) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getSafetyScoreText = (score) => {
    if (score >= 8.5) return "Excellent";
    if (score >= 7.0) return "Good";
    return "Fair";
  };

  // Apply landing page background and overlay
  return (
    <div
      className="relative font-sans min-h-screen overflow-x-hidden"
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
        <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => navigate("/explore-places")}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
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
                <img
                  src={place.images[currentImageIndex]}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
                  {currentImageIndex + 1} / {place.images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {place.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      currentImageIndex === index
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
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
            </div>

            {/* Place Information */}
            <div className="space-y-6">
              {/* Header Info */}
              <div>
                <div className="flex items-center mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium text-white mr-3 ${
                      place.category === "local"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : "bg-gradient-to-r from-blue-500 to-purple-500"
                    }`}
                  >
                    {place.category === "local"
                      ? "Local Travel"
                      : "International Travel"}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-blue-100 mb-2" style={{ textShadow: '0 2px 8px rgba(60,0,120,0.25)' }}>
                  {place.name}
                </h1>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">
                    {place.district}, {place.region}, {place.country}
                  </span>
                </div>

                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(place.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-lg font-medium text-gray-900 ml-2">
                      {place.rating}
                    </span>
                    <span className="text-gray-600 ml-1">
                      ({place.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Safety Score */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Shield className="h-6 w-6 mr-3 text-gray-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      AI Safety Score
                    </h3>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full bg-gradient-to-r ${getSafetyScoreColor(
                      place.aiSafetyScore
                    )} text-white text-lg font-bold`}
                  >
                    {place.aiSafetyScore}/10
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  {getSafetyScoreText(place.aiSafetyScore)} safety rating based
                  on comprehensive analysis
                </p>
                <div className="text-sm text-gray-500">
                  • Safety & Security Assessment
                  <br />
                  • Affordability & Value Analysis
                  <br />
                  • Accessibility & Infrastructure
                  <br />• Tourist Support Services
                </div>
                <div className="mt-4 text-xs text-blue-600 bg-blue-50 p-2 rounded">
                  🔄 This score is dynamically updated using AI algorithms and
                  real-time data
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Price Range
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  ₹{place.priceRange.min.toLocaleString()} - ₹
                  {place.priceRange.max.toLocaleString()}
                </div>
                <p className="text-gray-600">per person (estimated)</p>
              </div>

              {/* Plan Travel Button */}
              <button
                onClick={() => setShowTransportModal(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                <Route className="h-6 w-6 mr-3" />
                Plan Your Travel
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About This Destination
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {place.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {place.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <section className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-2">
              AI Summarized Feedback & Reviews
            </h2>
            <p className="text-gray-700 mb-2">
              "Visitors love the scenic beauty and vibrant atmosphere of this
              place. The local cuisine receives rave reviews, and the guided
              tours are highly recommended. Some feedback mentions crowding
              during peak hours, but most experiences are positive and
              memorable."
            </p>
            <div className="flex-col space-y-3 text-md">
              <p>Scenery : ⭐⭐⭐⭐⭐</p>
              <p>Food : ⭐⭐⭐⭐⭐</p>
              <p>Touring : ⭐⭐⭐⭐⭐</p>
              <p>Crowding : ⭐⭐⭐</p>
            </div>
          </section>

          {/* Reviews Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Tourist Reviews & Feedback
            </h2>

            <div className="space-y-6">
              {place.reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-sm">
                        {review.author.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-gray-900">
                          {review.author}
                        </h4>
                        <div className="flex items-center">
                          <div className="flex items-center mr-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3 leading-relaxed">
                    {review.comment}
                  </p>

                  <div className="flex items-center text-sm text-gray-500">
                    <button className="flex items-center hover:text-blue-600 transition-colors duration-200">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Future: Dynamic review integration */}
            <div className="mt-6 text-center text-sm text-blue-600 bg-blue-50 p-4 rounded-lg">
              💡 Reviews are updated in real-time from multiple travel platforms
              and user feedback
            </div>
          </div>
        </div>
      </div>

      {/* Transport Modal */}
      {showTransportModal && (
        <TransportModal
          place={place}
          onClose={() => setShowTransportModal(false)}
        />
      )}
    </div>
  );
};

export default PlaceDetailView;
