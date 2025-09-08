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
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default digitalIDService;
