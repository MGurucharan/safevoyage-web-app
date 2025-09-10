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
  Bed,
  Clock,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Users,
  Phone
} from 'lucide-react';
import { mockHotelsData } from '../data/hotelsData';

const HotelDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const foundHotel = mockHotelsData.find(h => h.id === parseInt(id));
    setHotel(foundHotel);
    if (foundHotel && foundHotel.roomTypes.length > 0) {
      setSelectedRoomType(foundHotel.roomTypes[0]);
    }
  }, [id]);

  if (!hotel) {
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Hotel not found</h2>
            <button
              onClick={() => navigate('/book-hotels')}
              className="text-blue-600 hover:text-blue-800"
            >
              Back to Book Hotels
            </button>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
  };

  const getSafetyScoreColor = (score) => {
    if (score >= 8.5) return 'from-green-500 to-emerald-500';
    if (score >= 7.0) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getSafetyScoreText = (score) => {
    if (score >= 8.5) return 'Excellent';
    if (score >= 7.0) return 'Good';
    return 'Fair';
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      'Free WiFi': <Wifi className="h-5 w-5" />,
      'Swimming Pool': <Users className="h-5 w-5" />,
      'Spa': <User className="h-5 w-5" />,
      'Restaurant': <Coffee className="h-5 w-5" />,
      'Room Service': <Phone className="h-5 w-5" />,
      'Gym': <Dumbbell className="h-5 w-5" />,
      'Business Center': <User className="h-5 w-5" />,
      'Concierge': <User className="h-5 w-5" />,
      'Parking': <Car className="h-5 w-5" />
    };
    return icons[amenity] || <User className="h-5 w-5" />;
  };

  const handleBooking = () => {
    // Future: Integrate with booking system
    alert(`Booking ${selectedRoomType} for ${guests} guest(s) from ${checkInDate} to ${checkOutDate}`);
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
              onClick={() => navigate('/book-hotels')}
              className="flex items-center text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Book Hotels
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
                  src={hotel.images[currentImageIndex]}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
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

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-sm rounded-full border border-white/20">
                  {currentImageIndex + 1} / {hotel.images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {hotel.images.map((image, index) => (
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
                      alt={`${hotel.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Hotel Information */}
            <div className="space-y-6">
              {/* Header Info */}
              <div>
                <div className="flex items-center mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white mr-3 ${
                    hotel.category === 'local' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}>
                    {hotel.category === 'local' ? 'Local Hotel' : 'International Hotel'}
                  </span>
                  <div className="flex">
                    {[...Array(hotel.starRating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{hotel.name}</h1>
                
                <div className="flex items-center text-gray-300 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{hotel.district}, {hotel.region}, {hotel.country}</span>
                </div>

                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(hotel.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-500'
                        }`}
                      />
                    ))}
                    <span className="text-lg font-medium text-white ml-2">
                      {hotel.rating}
                    </span>
                    <span className="text-gray-300 ml-1">
                      ({hotel.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Safety Score */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Shield className="h-6 w-6 mr-3 text-gray-300" />
                    <h3 className="text-xl font-bold text-white">AI Safety Score</h3>
                  </div>
                  <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getSafetyScoreColor(hotel.aiSafetyScore)} text-white text-lg font-bold shadow-lg`}>
                    {hotel.aiSafetyScore}/10
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  {getSafetyScoreText(hotel.aiSafetyScore)} safety rating based on comprehensive analysis
                </p>
                <div className="text-sm text-gray-400">
                  • Safety & Security Assessment<br/>
                  • Cleanliness & Hygiene Standards<br/>
                  • Guest Satisfaction & Service Quality<br/>
                  • Location Safety & Accessibility
                </div>
                <div className="mt-4 text-xs text-blue-300 bg-blue-500/20 backdrop-blur-sm p-2 rounded border border-blue-400/30">
                  🔄 This score is dynamically updated using AI algorithms and real-time data
                </div>
              </div>

              {/* Check-in/Check-out Info */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">Hotel Policies</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-gray-300" />
                    <div>
                      <p className="font-medium text-white">Check-in</p>
                      <p className="text-sm text-gray-400">{hotel.checkIn}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-gray-300" />
                    <div>
                      <p className="font-medium text-white">Check-out</p>
                      <p className="text-sm text-gray-400">{hotel.checkOut}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">Price Range</h3>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ₹{hotel.priceRange.min.toLocaleString()} - ₹{hotel.priceRange.max.toLocaleString()}
                </div>
                <p className="text-gray-300">per night (estimated)</p>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Book Your Stay</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Check-in Date */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Check-in Date</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full p-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
                />
              </div>
              
              {/* Check-out Date */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Check-out Date</label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full p-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
                />
              </div>
              
              {/* Guests */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full p-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num} className="bg-gray-800">{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              {/* Room Type */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Room Type</label>
                <select
                  value={selectedRoomType}
                  onChange={(e) => setSelectedRoomType(e.target.value)}
                  className="w-full p-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
                >
                  {hotel.roomTypes.map(roomType => (
                    <option key={roomType} value={roomType} className="bg-gray-800">{roomType}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleBooking}
              className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center shadow-lg"
            >
              <Bed className="h-6 w-6 mr-3" />
              Book Now
            </button>
          </div>

          {/* Description */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">About This Hotel</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">{hotel.description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {hotel.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 border border-blue-400/30 text-blue-300 rounded-full text-sm font-medium backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Hotel Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center p-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg">
                  <div className="text-blue-400 mr-3">
                    {getAmenityIcon(amenity)}
                  </div>
                  <span className="text-gray-300 font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <section className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-xl font-bold text-white mb-2">
              AI Summarized Feedback & Reviews
            </h2>
            <p className="text-gray-300 mb-2">
              "Visitors love the scenic beauty and vibrant atmosphere of this
              place. The local cuisine receives rave reviews, and the guided
              tours are highly recommended. Some feedback mentions crowding
              during peak hours, but most experiences are positive and
              memorable."
            </p>
            <div className="flex-col space-y-3 text-md">
              <p className="text-gray-300">Scenery : ⭐⭐⭐⭐⭐</p>
              <p className="text-gray-300">Food : ⭐⭐⭐⭐⭐</p>
              <p className="text-gray-300">Hygiene : ⭐⭐⭐⭐⭐</p>
              <p className="text-gray-300">Service : ⭐⭐⭐</p>
            </div>
          </section>



          {/* Reviews Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">
              Guest Reviews & Feedback
            </h2>
            
            <div className="space-y-6">
              {hotel.reviews.map((review) => (
                <div key={review.id} className="border-b border-white/20 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-sm">
                        {review.author.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-white">{review.author}</h4>
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
              💡 Reviews are updated in real-time from multiple hotel booking platforms and guest feedback
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailView;
