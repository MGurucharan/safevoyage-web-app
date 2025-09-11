// Simple test using native fetch
import fetch from 'node-fetch';

async function testAIEndpoint() {
  console.log('🧪 Testing AI endpoint with native fetch...');
  
  try {
    // Test health endpoint first
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:5000/health');
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Backend is healthy:', healthData.message);
    } else {
      throw new Error(`Health check failed: ${healthResponse.status}`);
    }
    
    // Test AI sample endpoint
    console.log('\n2. Testing AI sample endpoint...');
    const sampleResponse = await fetch('http://localhost:5000/api/ai/sample/hotel');
    
    if (sampleResponse.ok) {
      const sampleData = await sampleResponse.json();
      console.log('✅ AI Sample endpoint works!');
      console.log('Summary:', sampleData.data.summary);
      console.log('Ratings:', sampleData.data.ratings);
    } else {
      const errorText = await sampleResponse.text();
      console.log('❌ AI Sample failed:', sampleResponse.status, errorText);
    }
    
    // Test AI summarization endpoint
    console.log('\n3. Testing AI summarization endpoint...');
    const reviews = [
      {
        id: 1,
        author: "John Test",
        rating: 5,
        comment: "Amazing hotel with excellent service and beautiful rooms!",
        date: "2024-08-20"
      },
      {
        id: 2,
        author: "Jane Test",
        rating: 4,
        comment: "Great location and clean facilities. Staff was very helpful.",
        date: "2024-08-15"
      }
    ];
    
    const summarizeResponse = await fetch('http://localhost:5000/api/ai/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reviews: reviews,
        type: 'hotel',
        name: 'Test Hotel'
      })
    });
    
    if (summarizeResponse.ok) {
      const summarizeData = await summarizeResponse.json();
      console.log('✅ AI Summarization works!');
      console.log('Summary:', summarizeData.data.summary);
      console.log('Ratings:', summarizeData.data.ratings);
      console.log('Review count:', summarizeData.data.reviewCount);
    } else {
      const errorText = await summarizeResponse.text();
      console.log('❌ AI Summarization failed:', summarizeResponse.status, errorText);
    }
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

testAIEndpoint();
