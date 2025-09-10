import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import ProfileInfo from './models/ProfileInfo.js';

// Load environment variables
dotenv.config();

async function checkUserProfiles() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');

    // Find all users
    const users = await User.find();
    console.log(`\n📊 Found ${users.length} users in the database:`);
    
    for (const user of users) {
      console.log(`\n👤 User: ${user.email}`);
      console.log(`   MongoDB ID: ${user._id}`);
      console.log(`   Profile Complete: ${user.isProfileComplete}`);
      
      // Check if profile exists in profile_info collection
      const profile = await ProfileInfo.findOne({ userId: user._id });
      if (profile) {
        console.log(`   ✅ Profile found in profile_info collection`);
        console.log(`   SafeVoyage User ID: ${profile.userID || 'NOT GENERATED'}`);
        console.log(`   Profile Complete Status: ${profile.isProfileComplete}`);
        console.log(`   Full Name: ${profile.fullName || 'Not set'}`);
      } else {
        console.log(`   ❌ No profile found in profile_info collection`);
      }
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

checkUserProfiles();
