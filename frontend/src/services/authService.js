const API_BASE_URL = 'http://localhost:5000/api';

class AuthService {
  async signUp(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign up failed');
      }

      return data;
    } catch (error) {
      throw new Error(error.message || 'Network error during sign up');
    }
  }

  async signIn(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed');
      }

      return data;
    } catch (error) {
      throw new Error(error.message || 'Network error during sign in');
    }
  }

  async completeProfile(userId, profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Profile completion failed');
      }

      return data;
    } catch (error) {
      throw new Error(error.message || 'Network error during profile completion');
    }
  }

  async getProfileByUserID(userID) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile/user/${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      return data;
    } catch (error) {
      throw new Error(error.message || 'Network error during profile fetch');
    }
  }

  async getProfileById(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      return data;
    } catch (error) {
      throw new Error(error.message || 'Network error during profile fetch');
    }
  }
}

const authService = new AuthService();
export default authService;
