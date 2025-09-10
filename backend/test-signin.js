import fetch from 'node-fetch';

async function testSignIn() {
  try {
    const response = await fetch('http://localhost:5000/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'mkirankumar2468@gmail.com',
        password: 'password' // Replace with actual password if different
      }),
    });

    const data = await response.json();
    
    console.log('Sign-in response status:', response.status);
    console.log('Sign-in response data:');
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('Error testing sign-in:', error);
  }
}

testSignIn();
