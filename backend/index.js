import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Tourist from './models/Item.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

// Routes
app.post('/api/digital-id', async (req, res) => {
    try {
        const touristData = new Tourist(req.body);
        await touristData.save();
        
        res.status(201).json({
            success: true,
            message: "Digital ID created successfully",
            data: touristData
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error creating Digital ID",
            error: error.message
        });
    }
});

// Get all tourists (optional - for testing)
app.get('/api/digital-id', async (req, res) => {
    try {
        const tourists = await Tourist.find();
        res.status(200).json({
            success: true,
            data: tourists
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error fetching Digital IDs",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
