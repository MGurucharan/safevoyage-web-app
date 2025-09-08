import express from 'express';
import { generateDigitalID, verifyDigitalID } from '../controllers/digitalIDController.js';
import DigitalID from '../models/DigitalID.js';

const router = express.Router();

router.post('/generate', generateDigitalID);
router.post('/verify', verifyDigitalID);

// Add route to list all digital IDs (for debugging)
router.get('/list', async (req, res) => {
    try {
        const digitalIDs = await DigitalID.find().sort({ createdAt: -1 }).limit(10);
        res.json({
            success: true,
            count: digitalIDs.length,
            data: digitalIDs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;
