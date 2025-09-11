import aiSummarizationService from '../services/aiSummarizationService.js';

export const summarizeReviews = async (req, res) => {
  try {
    const { reviews, type, name } = req.body;

    // Validate input
    if (!reviews || !Array.isArray(reviews)) {
      return res.status(400).json({ 
        error: 'Reviews array is required',
        success: false 
      });
    }

    if (!type || !['hotel', 'place'].includes(type)) {
      return res.status(400).json({ 
        error: 'Type must be either "hotel" or "place"',
        success: false 
      });
    }

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ 
        error: 'Name is required and must be a string',
        success: false 
      });
    }

    console.log(`Generating AI summary for ${type}: ${name} with ${reviews.length} reviews`);

    // Generate AI summary
    const summary = await aiSummarizationService.summarizeReviews(reviews, type, name);

    res.status(200).json({
      success: true,
      data: {
        summary: summary.summary,
        ratings: summary.ratings,
        lastUpdated: summary.lastUpdated,
        reviewCount: reviews.length,
        type,
        name
      }
    });

  } catch (error) {
    console.error('Error in summarizeReviews controller:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate AI summary',
      message: error.message
    });
  }
};

export const batchSummarizeReviews = async (req, res) => {
  try {
    const { locations, type } = req.body;

    // Validate input
    if (!locations || !Array.isArray(locations)) {
      return res.status(400).json({ 
        error: 'Locations array is required',
        success: false 
      });
    }

    if (!type || !['hotel', 'place'].includes(type)) {
      return res.status(400).json({ 
        error: 'Type must be either "hotel" or "place"',
        success: false 
      });
    }

    // Validate each location has required fields
    for (const location of locations) {
      if (!location.id || !location.name || !location.reviews) {
        return res.status(400).json({ 
          error: 'Each location must have id, name, and reviews',
          success: false 
        });
      }
    }

    console.log(`Generating batch AI summaries for ${locations.length} ${type}s`);

    // Generate AI summaries for all locations
    const summaries = await aiSummarizationService.batchSummarize(locations, type);

    res.status(200).json({
      success: true,
      data: {
        summaries,
        count: Object.keys(summaries).length,
        type
      }
    });

  } catch (error) {
    console.error('Error in batchSummarizeReviews controller:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate batch AI summaries',
      message: error.message
    });
  }
};

export const getSampleSummary = async (req, res) => {
  try {
    const { type } = req.params;

    if (!type || !['hotel', 'place'].includes(type)) {
      return res.status(400).json({ 
        error: 'Type must be either "hotel" or "place"',
        success: false 
      });
    }

    // Generate a sample summary for demonstration
    const sampleReviews = [
      {
        id: 1,
        author: "Sample User",
        rating: 5,
        comment: "Amazing experience! Highly recommend to everyone.",
        date: "2024-01-15"
      },
      {
        id: 2,
        author: "Another User",
        rating: 4,
        comment: "Great place with beautiful views and friendly staff.",
        date: "2024-01-10"
      }
    ];

    const summary = await aiSummarizationService.summarizeReviews(
      sampleReviews, 
      type, 
      `Sample ${type === 'hotel' ? 'Hotel' : 'Destination'}`
    );

    res.status(200).json({
      success: true,
      data: {
        summary: summary.summary,
        ratings: summary.ratings,
        lastUpdated: summary.lastUpdated,
        reviewCount: sampleReviews.length,
        type,
        isSample: true
      }
    });

  } catch (error) {
    console.error('Error in getSampleSummary controller:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate sample summary',
      message: error.message
    });
  }
};

export const analyzeSafety = async (req, res) => {
  try {
    const { reviews, type, name } = req.body;

    // Validate input
    if (!reviews || !Array.isArray(reviews)) {
      return res.status(400).json({ 
        error: 'Reviews array is required',
        success: false 
      });
    }

    if (!type || !['hotel', 'place'].includes(type)) {
      return res.status(400).json({ 
        error: 'Type must be either "hotel" or "place"',
        success: false 
      });
    }

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ 
        error: 'Name is required and must be a string',
        success: false 
      });
    }

    console.log(`Generating AI safety analysis for ${type}: ${name} with ${reviews.length} reviews`);

    // Generate AI safety analysis
    const safetyAnalysis = await aiSummarizationService.analyzeSafety(reviews, type, name);

    res.status(200).json({
      success: true,
      data: {
        safetyScore: safetyAnalysis.safetyScore,
        overallAssessment: safetyAnalysis.overallAssessment,
        safetyCategories: safetyAnalysis.safetyCategories,
        keyInsights: safetyAnalysis.keyInsights,
        safetyConcerns: safetyAnalysis.safetyConcerns,
        recommendations: safetyAnalysis.recommendations,
        lastUpdated: safetyAnalysis.lastUpdated,
        reviewCount: reviews.length,
        type,
        name
      }
    });

  } catch (error) {
    console.error('Error in analyzeSafety controller:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate AI safety analysis',
      message: error.message
    });
  }
};

export const batchAnalyzeSafety = async (req, res) => {
  try {
    const { locations, type } = req.body;

    // Validate input
    if (!locations || !Array.isArray(locations)) {
      return res.status(400).json({ 
        error: 'Locations array is required',
        success: false 
      });
    }

    if (!type || !['hotel', 'place'].includes(type)) {
      return res.status(400).json({ 
        error: 'Type must be either "hotel" or "place"',
        success: false 
      });
    }

    // Validate each location has required fields
    for (const location of locations) {
      if (!location.id || !location.name || !location.reviews) {
        return res.status(400).json({ 
          error: 'Each location must have id, name, and reviews',
          success: false 
        });
      }
    }

    console.log(`Generating batch AI safety analyses for ${locations.length} ${type}s`);

    // Generate AI safety analyses for all locations
    const safetyAnalyses = await aiSummarizationService.batchAnalyzeSafety(locations, type);

    res.status(200).json({
      success: true,
      data: {
        safetyAnalyses,
        count: Object.keys(safetyAnalyses).length,
        type
      }
    });

  } catch (error) {
    console.error('Error in batchAnalyzeSafety controller:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate batch AI safety analyses',
      message: error.message
    });
  }
};

export const getSampleSafetyAnalysis = async (req, res) => {
  try {
    const { type } = req.params;

    if (!type || !['hotel', 'place'].includes(type)) {
      return res.status(400).json({ 
        error: 'Type must be either "hotel" or "place"',
        success: false 
      });
    }

    // Generate a sample safety analysis for demonstration
    const sampleReviews = [
      {
        id: 1,
        author: "Safety Conscious Traveler",
        rating: 5,
        comment: "Very safe location with excellent security measures. Clean facilities and helpful staff.",
        date: "2024-01-15"
      },
      {
        id: 2,
        author: "Family Visitor",
        rating: 4,
        comment: "Felt secure throughout our stay. Good lighting and accessible areas for families.",
        date: "2024-01-10"
      }
    ];

    const safetyAnalysis = await aiSummarizationService.analyzeSafety(
      sampleReviews, 
      type, 
      `Sample ${type === 'hotel' ? 'Hotel' : 'Destination'}`
    );

    res.status(200).json({
      success: true,
      data: {
        safetyScore: safetyAnalysis.safetyScore,
        overallAssessment: safetyAnalysis.overallAssessment,
        safetyCategories: safetyAnalysis.safetyCategories,
        keyInsights: safetyAnalysis.keyInsights,
        safetyConcerns: safetyAnalysis.safetyConcerns,
        recommendations: safetyAnalysis.recommendations,
        lastUpdated: safetyAnalysis.lastUpdated,
        reviewCount: sampleReviews.length,
        type,
        isSample: true
      }
    });

  } catch (error) {
    console.error('Error in getSampleSafetyAnalysis controller:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate sample safety analysis',
      message: error.message
    });
  }
};
