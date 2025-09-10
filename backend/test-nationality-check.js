import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProfileInfo from './models/ProfileInfo.js';

// Load environment variables
dotenv.config();

async function checkNationalities() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');

    // Find all profiles and their nationalities
    const profiles = await ProfileInfo.find({}, 'fullName nationality userID');
    console.log(`\n📊 Found ${profiles.length} profiles with nationality data:`);
    
    for (const profile of profiles) {
      console.log(`\n👤 ${profile.fullName} (${profile.userID})`);
      console.log(`   Nationality: "${profile.nationality}"`);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

checkNationalities();
