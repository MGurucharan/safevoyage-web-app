// Simple fetch test for AI summarization
const testSample = async () => {
  try {
    console.log('Testing sample endpoint...');
    const response = await fetch('http://localhost:5000/api/ai/sample/hotel');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// For testing in browser console
window.testAI = testSample;
