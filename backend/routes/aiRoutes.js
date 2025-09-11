import express from 'express';
import { 
  summarizeReviews, 
  batchSummarizeReviews, 
  getSampleSummary,
  analyzeSafety,
  batchAnalyzeSafety,
  getSampleSafetyAnalysis
} from '../controllers/aiController.js';

const router = express.Router();

// POST /api/ai/summarize - Summarize reviews for a single location
router.post('/summarize', summarizeReviews);

// POST /api/ai/batch-summarize - Summarize reviews for multiple locations
router.post('/batch-summarize', batchSummarizeReviews);

// GET /api/ai/sample/:type - Get a sample summary for testing
router.get('/sample/:type', getSampleSummary);

// POST /api/ai/analyze-safety - Analyze safety from reviews for a single location
router.post('/analyze-safety', analyzeSafety);

// POST /api/ai/batch-analyze-safety - Analyze safety from reviews for multiple locations
router.post('/batch-analyze-safety', batchAnalyzeSafety);

// GET /api/ai/sample-safety/:type - Get a sample safety analysis for testing
router.get('/sample-safety/:type', getSampleSafetyAnalysis);

export default router;
