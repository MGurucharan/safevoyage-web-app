import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const digitalIDService = {
    generateDigitalID: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/digital-id/generate`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    verifyDigitalID: async (verificationData) => {
        try {
            const response = await axios.post(`${API_URL}/digital-id/verify`, verificationData);
            
            // Handle the new response format
            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.error || 'Verification failed');
            }
        } catch (error) {
            // Handle network or parsing errors
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error || error.response.data.message || 'Verification failed');
            } else {
                throw new Error(error.message || 'Network error during verification');
            }
        }
    }
};

export default digitalIDService;
