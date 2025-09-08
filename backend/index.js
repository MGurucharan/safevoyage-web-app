import dotenv from "dotenv";
dotenv.config();

console.log('🚀 Starting SafeVoyage Backend Server...');

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

console.log('📦 Importing digital ID routes...');
import digitalIDRoutes from './routes/digitalIDRoutes.js';
console.log('✅ Digital ID routes imported successfully');

const app = express();
console.log('🌐 Express app created');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/digital-id', digitalIDRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'SafeVoyage API Server',
        endpoints: [
            'GET /health',
            'POST /api/digital-id/generate',
            'POST /api/digital-id/verify'
        ]
    });
});

// MongoDB Connection

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1); // Exit process with failure
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Global error handler
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.log('Uncaught Exception:', error);
});

// Add error handler middleware
app.use((error, req, res, next) => {
    console.error('Express error handler:', error);
    res.status(500).json({
        success: false,
        error: error.message
    });
});
