import mongoose from 'mongoose';

const profileInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  // Basic Information from DigitalID form
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  nationality: {
    type: String,
    required: true,
    trim: true
  },
  passportNumber: {
    type: String,
    required: true,
    trim: true
  },
  aadhaarNumber: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  
  // Additional Profile Information
  favouritePlaces: {
    type: [String],
    default: []
  },
  tripItinerary: {
    destinations: [{
      place: String,
      date: Date,
      duration: String,
      notes: String
    }],
    startDate: Date,
    endDate: Date,
    totalDuration: String,
    budget: String,
    travelType: {
      type: String,
      enum: ['Solo', 'Family', 'Friends', 'Business', 'Honeymoon', 'Adventure', 'Leisure'],
      default: 'Leisure'
    }
  },
  travelPlanning: {
    preferredTransport: {
      type: [String],
      enum: ['Flight', 'Train', 'Bus', 'Car', 'Ship'],
      default: []
    },
    accommodationPreference: {
      type: String,
      enum: ['Hotel', 'Resort', 'Hostel', 'Homestay', 'Apartment', 'Villa'],
      default: 'Hotel'
    },
    budgetRange: {
      type: String,
      enum: ['Budget', 'Mid-range', 'Luxury', 'Premium'],
      default: 'Mid-range'
    },
    travelInterests: {
      type: [String],
      enum: ['Culture', 'Adventure', 'Food', 'Nature', 'History', 'Art', 'Music', 'Sports', 'Shopping', 'Nightlife'],
      default: []
    }
  },
  
  // Profile Status
  isProfileComplete: {
    type: Boolean,
    default: false
  },
  userID: {
    type: String,
    unique: true,
    sparse: true // Allows null values but ensures uniqueness when present
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate userID when profile is marked as complete
profileInfoSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  if (this.isProfileComplete && !this.userID) {
    // Generate a unique userID format: SV-YYYY-XXXXXX
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    this.userID = `SV-${year}-${randomNum}`;
  }
  
  next();
});

const ProfileInfo = mongoose.model('ProfileInfo', profileInfoSchema, 'profile_info');

export default ProfileInfo;
