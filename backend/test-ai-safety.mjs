// Test script for AI Safety Analysis endpoints
import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:5000/api/ai';

// Sample reviews with safety-focused content
const sampleReviews = [
  {
    id: 1,
    author: "Sarah Ahmed",
    rating: 5,
    date: "2024-08-20",
    comment: "Excellent safety measures in place. The hotel has 24/7 security guards, CCTV surveillance, and all rooms have electronic locks. The beach area is well-patrolled and safe even during evening walks."
  },
  {
    id: 2,
    author: "Dr. Vinod Sharma",
    rating: 4,
    date: "2024-07-22",
    comment: "Very impressed with the cleanliness standards. All staff wear masks, sanitization is done regularly, and the dining areas follow strict hygiene protocols. Medical assistance is available on-site."
  },
  {
    id: 3,
    author: "Emily Chen",
    rating: 5,
    date: "2024-07-15",
    comment: "As a solo female traveler, I felt completely safe here. Well-lit pathways, emergency contact numbers in every room, and the staff is very responsive to any safety concerns. The fire safety systems are also clearly marked."
  }
];

async function testSafetyAnalysis() {
  console.log('🔍 Testing AI Safety Analysis endpoint...\n');

  try {
    const response = await fetch(`${API_BASE_URL}/analyze-safety`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reviews: sampleReviews,
        type: 'hotel',
        name: 'Test Hotel Safety Analysis'
      })
    });

    console.log(`Response Status: ${response.status}`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Error:', errorData);
      return;
    }

    const data = await response.json();
    console.log('✅ Safety Analysis Result:');
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

async function testSampleSafetyAnalysis() {
  console.log('\n🔍 Testing Sample Safety Analysis endpoint...\n');

  try {
    const response = await fetch(`${API_BASE_URL}/sample-safety/hotel`);

    console.log(`Response Status: ${response.status}`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Error:', errorData);
      return;
    }

    const data = await response.json();
    console.log('✅ Sample Safety Analysis Result:');
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting AI Safety Analysis Tests\n');
  console.log('================================================');
  
  await testSafetyAnalysis();
  await testSampleSafetyAnalysis();
  
  console.log('\n================================================');
  console.log('✨ Tests completed!');
}

runTests();
