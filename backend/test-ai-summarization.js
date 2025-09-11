// Simple Node.js test script to test the AI summarization endpoint
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

async function testAISummarization() {
  console.log('🧪 Testing AI Summarization Endpoint...\n');

  // Sample hotel reviews
  const sampleHotelReviews = [
    {
      id: 1,
      author: "John Doe",
      rating: 5,
      comment: "Absolutely amazing hotel! The staff was incredibly friendly and the rooms were spotless. The pool area is beautiful and the breakfast buffet had so many delicious options.",
      date: "2024-08-20"
    },
    {
      id: 2,
      author: "Sarah Smith",
      rating: 4,
      comment: "Great location and comfortable rooms. The WiFi was fast and the gym facilities were well-maintained. Only complaint is that the air conditioning was a bit noisy.",
      date: "2024-08-15"
    },
    {
      id: 3,
      author: "Mike Johnson",
      rating: 5,
      comment: "Perfect for business travelers! The conference rooms were well-equipped and the business center was very helpful. Restaurant food was excellent.",
      date: "2024-08-10"
    },
    {
      id: 4,
      author: "Emma Wilson",
      rating: 3,
      comment: "The hotel is okay but could use some updates. The lobby is dated and the elevators are slow. However, the housekeeping was thorough and the location is convenient.",
      date: "2024-08-05"
    }
  ];

  try {
    console.log('📝 Testing Hotel Review Summarization...');
    
    const response = await axios.post(`${API_BASE_URL}/ai/summarize`, {
      reviews: sampleHotelReviews,
      type: 'hotel',
      name: 'Test Grand Hotel'
    });

    console.log('✅ Success! AI Summary Response:');
    console.log('Summary:', response.data.data.summary);
    console.log('\nCategory Ratings:');
    Object.entries(response.data.data.ratings).forEach(([category, rating]) => {
      const stars = '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
      console.log(`  ${category}: ${stars} (${rating}/5)`);
    });
    console.log('\nMetadata:');
    console.log(`  Review Count: ${response.data.data.reviewCount}`);
    console.log(`  Type: ${response.data.data.type}`);
    console.log(`  Last Updated: ${response.data.data.lastUpdated}`);

  } catch (error) {
    console.error('❌ Error testing AI summarization:', error.response?.data || error.message);
  }
}

async function testSampleEndpoint() {
  console.log('\n🧪 Testing Sample Endpoint...\n');

  try {
    console.log('📝 Getting sample hotel summary...');
    
    const response = await axios.get(`${API_BASE_URL}/ai/sample/hotel`);

    console.log('✅ Success! Sample Response:');
    console.log('Summary:', response.data.data.summary);
    console.log('\nCategory Ratings:');
    Object.entries(response.data.data.ratings).forEach(([category, rating]) => {
      const stars = '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
      console.log(`  ${category}: ${stars} (${rating}/5)`);
    });

  } catch (error) {
    console.error('❌ Error testing sample endpoint:', error.response?.data || error.message);
  }
}

async function testPlaceSummarization() {
  console.log('\n🧪 Testing Place Review Summarization...\n');

  // Sample place reviews
  const samplePlaceReviews = [
    {
      id: 1,
      author: "Travel Enthusiast",
      rating: 5,
      comment: "Breathtaking scenery and incredibly well-maintained grounds. The guided tour was informative and the staff was knowledgeable about the history.",
      date: "2024-08-20"
    },
    {
      id: 2,
      author: "Adventure Seeker",
      rating: 4,
      comment: "Amazing experience overall! The hiking trails are well-marked and the views are spectacular. Can get quite crowded during peak hours though.",
      date: "2024-08-15"
    },
    {
      id: 3,
      author: "Family Traveler",
      rating: 5,
      comment: "Perfect for families! Kids loved the interactive exhibits and the picnic areas were clean and spacious. Great value for money.",
      date: "2024-08-10"
    }
  ];

  try {
    console.log('📝 Testing Place Review Summarization...');
    
    const response = await axios.post(`${API_BASE_URL}/ai/summarize`, {
      reviews: samplePlaceReviews,
      type: 'place',
      name: 'Test Mountain Vista Park'
    });

    console.log('✅ Success! AI Summary Response:');
    console.log('Summary:', response.data.data.summary);
    console.log('\nCategory Ratings:');
    Object.entries(response.data.data.ratings).forEach(([category, rating]) => {
      const stars = '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
      console.log(`  ${category}: ${stars} (${rating}/5)`);
    });

  } catch (error) {
    console.error('❌ Error testing place summarization:', error.response?.data || error.message);
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting AI Summarization Tests\n');
  console.log('=' .repeat(50));
  
  await testSampleEndpoint();
  await testAISummarization();
  await testPlaceSummarization();
  
  console.log('\n' + '='.repeat(50));
  console.log('🏁 Tests Complete!');
}

runAllTests();
