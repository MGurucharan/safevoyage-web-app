import User from '../models/User.js';
import ProfileInfo from '../models/ProfileInfo.js';
import crypto from 'crypto';

// Simple password hashing (in production, use bcrypt)
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const comparePassword = (password, hashedPassword) => {
  return hashPassword(password) === hashedPassword;
};

// Sign Up
export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        userId: newUser._id,
        email: newUser.email,
        isProfileComplete: newUser.isProfileComplete
      }
    });

  } catch (error) {
    console.error('Sign up error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Sign In
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Get profile info if it exists to fetch the SafeVoyage userID
    let safevoyageUserID = null;
    if (user.isProfileComplete) {
      const profile = await ProfileInfo.findOne({ userId: user._id });
      if (profile) {
        safevoyageUserID = profile.userID;
      }
    }

    res.status(200).json({
      success: true,
      message: 'Sign in successful',
      data: {
        userId: user._id, // MongoDB ID (for internal use)
        userID: safevoyageUserID, // SafeVoyage User ID (SV-YYYY-XXXXXX)
        email: user.email,
        isProfileComplete: user.isProfileComplete
      }
    });

  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Complete Profile
export const completeProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profileData = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if profile already exists
    let profile = await ProfileInfo.findOne({ userId });
    
    if (profile) {
      // Update existing profile
      Object.assign(profile, profileData);
      profile.isProfileComplete = true;
    } else {
      // Create new profile
      profile = new ProfileInfo({
        userId,
        ...profileData,
        isProfileComplete: true
      });
    }

    await profile.save();

    // Update user's profile completion status
    user.isProfileComplete = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile completed successfully',
      data: {
        userID: profile.userID,
        profile: profile
      }
    });

  } catch (error) {
    console.error('Complete profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get Profile by UserID
export const getProfileByUserID = async (req, res) => {
  try {
    const { userID } = req.params;

    if (!userID) {
      return res.status(400).json({
        success: false,
        message: 'UserID is required'
      });
    }

    const profile = await ProfileInfo.findOne({ userID }).populate('userId', 'email');
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: profile
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get Profile by MongoDB ObjectId
export const getProfileById = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const profile = await ProfileInfo.findOne({ userId }).populate('userId', 'email');
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: profile
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
