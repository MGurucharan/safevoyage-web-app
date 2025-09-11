import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class AISummarizationService {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
  }

  /**
   * Summarizes reviews using OpenAI GPT
   * @param {Array} reviews - Array of review objects with comment, rating, and author
   * @param {string} type - 'hotel' or 'place'
   * @param {string} name - Name of the hotel/place
   * @returns {Object} - Summarized feedback with text and category ratings
   */
  async summarizeReviews(reviews, type, name) {
    try {
      if (!reviews || reviews.length === 0) {
        return this.getDefaultSummary(type);
      }

      // Prepare reviews text for the prompt
      const reviewsText = reviews.map((review, index) => {
        const authorName = review.author || review.user || `User${index + 1}`;
        return `Review ${index + 1}:
Author: ${authorName}
Rating: ${review.rating}/5 stars
Comment: "${review.comment}"
Date: ${review.date}
`;
      }).join('\n');

      // Create the prompt based on type (hotel vs place)
      const prompt = this.createPrompt(reviewsText, type, name);

      const response = await axios.post(
        this.apiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an expert travel analyst who specializes in summarizing tourist reviews and feedback to help travelers make informed decisions.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      
      // Parse the AI response to extract summary and ratings
      return this.parseAIResponse(aiResponse, type);

    } catch (error) {
      console.error('Error in AI summarization:', error.response?.data || error.message);
      
      // Return a fallback summary if AI fails
      return this.getFallbackSummary(reviews, type);
    }
  }

  createPrompt(reviewsText, type, name) {
    const categories = type === 'hotel' 
      ? ['Service', 'Cleanliness', 'Amenities', 'Value', 'Location']
      : ['Scenery', 'Experience', 'Accessibility', 'Value', 'Safety'];

    return `Please analyze the following ${type === 'hotel' ? 'hotel' : 'tourist destination'} reviews for "${name}" and provide:

1. A comprehensive summary (2-3 sentences) highlighting the main positive and negative points mentioned by visitors
2. Category ratings (1-5 stars) for: ${categories.join(', ')}

Here are the reviews to analyze:
${reviewsText}

Please format your response exactly as follows:
SUMMARY: [Your 2-3 sentence summary here]
RATINGS:
${categories.map(cat => `${cat}: [1-5 number only]`).join('\n')}

Make sure the summary is balanced, mentions both positive and negative aspects if present, and the ratings reflect the overall sentiment in the reviews.`;
  }

  parseAIResponse(aiResponse, type) {
    try {
      const lines = aiResponse.split('\n').filter(line => line.trim());
      
      let summary = '';
      const ratings = {};
      let isRatingSection = false;

      for (const line of lines) {
        if (line.startsWith('SUMMARY:')) {
          summary = line.replace('SUMMARY:', '').trim();
        } else if (line.startsWith('RATINGS:')) {
          isRatingSection = true;
        } else if (isRatingSection && line.includes(':')) {
          const [category, rating] = line.split(':').map(s => s.trim());
          const numericRating = parseInt(rating);
          if (!isNaN(numericRating) && numericRating >= 1 && numericRating <= 5) {
            ratings[category] = numericRating;
          }
        }
      }

      // Ensure we have all required categories with default values if missing
      const defaultCategories = type === 'hotel' 
        ? ['Service', 'Cleanliness', 'Amenities', 'Value', 'Location']
        : ['Scenery', 'Experience', 'Accessibility', 'Value', 'Safety'];

      defaultCategories.forEach(category => {
        if (!(category in ratings)) {
          ratings[category] = 4; // Default to 4 stars if not found
        }
      });

      return {
        summary: summary || 'Based on visitor feedback, this location offers a memorable experience with generally positive reviews.',
        ratings,
        lastUpdated: new Date().toISOString()
      };

    } catch (error) {
      console.error('Error parsing AI response:', error);
      return this.getDefaultSummary(type);
    }
  }

  getFallbackSummary(reviews, type) {
    // Generate a simple summary based on average ratings
    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    
    let summary = '';
    if (avgRating >= 4.5) {
      summary = 'Visitors consistently praise this location with excellent reviews highlighting outstanding experiences and high satisfaction levels.';
    } else if (avgRating >= 4.0) {
      summary = 'Most visitors have positive experiences with good overall satisfaction, though some areas for improvement have been noted.';
    } else if (avgRating >= 3.0) {
      summary = 'Reviews show mixed experiences with both positive highlights and areas that could be improved for better visitor satisfaction.';
    } else {
      summary = 'Visitor feedback indicates significant room for improvement in various aspects of the experience.';
    }

    const defaultCategories = type === 'hotel' 
      ? ['Service', 'Cleanliness', 'Amenities', 'Value', 'Location']
      : ['Scenery', 'Experience', 'Accessibility', 'Value', 'Safety'];

    const ratings = {};
    defaultCategories.forEach(category => {
      // Base rating on average with some variation
      ratings[category] = Math.max(1, Math.min(5, Math.round(avgRating + (Math.random() - 0.5))));
    });

    return {
      summary,
      ratings,
      lastUpdated: new Date().toISOString()
    };
  }

  getDefaultSummary(type) {
    const defaultCategories = type === 'hotel' 
      ? ['Service', 'Cleanliness', 'Amenities', 'Value', 'Location']
      : ['Scenery', 'Experience', 'Accessibility', 'Value', 'Safety'];

    const ratings = {};
    defaultCategories.forEach(category => {
      ratings[category] = 4; // Default to 4 stars
    });

    return {
      summary: 'This location is currently gathering visitor feedback. Please check back soon for AI-generated insights from traveler reviews.',
      ratings,
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Analyzes safety aspects from reviews using OpenAI GPT
   * @param {Array} reviews - Array of review objects with comment, rating, and author
   * @param {string} type - 'hotel' or 'place'
   * @param {string} name - Name of the hotel/place
   * @returns {Object} - Safety analysis with score and insights
   */
  async analyzeSafety(reviews, type, name) {
    try {
      if (!reviews || reviews.length === 0) {
        return this.getDefaultSafetyAnalysis(type);
      }

      // Prepare reviews text for the prompt
      const reviewsText = reviews.map((review, index) => {
        const authorName = review.author || review.user || `User${index + 1}`;
        return `Review ${index + 1}:
Author: ${authorName}
Rating: ${review.rating}/5 stars
Comment: "${review.comment}"
Date: ${review.date}
`;
      }).join('\n');

      // Create safety-focused prompt
      const safetyPrompt = this.createSafetyPrompt(reviewsText, type, name);

      const response = await axios.post(
        this.apiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a travel safety expert who analyzes tourist reviews to assess safety and security aspects of hotels and destinations. Focus on security, cleanliness, health, accessibility, and overall safety concerns.'
            },
            {
              role: 'user',
              content: safetyPrompt
            }
          ],
          max_tokens: 800,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const analysis = response.data.choices[0].message.content;
      return this.parseSafetyAnalysis(analysis);

    } catch (error) {
      console.error('Error in AI safety analysis:', error);
      return this.getFallbackSafetyAnalysis(type);
    }
  }

  createSafetyPrompt(reviewsText, type, name) {
    const entityType = type === 'hotel' ? 'hotel' : 'tourist destination';
    
    return `Analyze the following tourist reviews for "${name}" (a ${entityType}) and provide a comprehensive safety assessment.

Reviews to analyze:
${reviewsText}

Please provide your analysis in the following JSON format:
{
  "safetyScore": [number from 1-10],
  "overallAssessment": "[brief summary of safety aspects]",
  "safetyCategories": {
    "Security": [number from 1-5],
    "Cleanliness": [number from 1-5],
    "Health": [number from 1-5],
    "Accessibility": [number from 1-5],
    "Emergency": [number from 1-5]
  },
  "keyInsights": [
    "[insight 1 about safety aspects]",
    "[insight 2 about safety aspects]",
    "[insight 3 about safety aspects]"
  ],
  "safetyConcerns": [
    "[concern 1 if any]",
    "[concern 2 if any]"
  ],
  "recommendations": [
    "[recommendation 1 for travelers]",
    "[recommendation 2 for travelers]"
  ]
}

Focus on:
${type === 'hotel' ? 
  '- Room security and safety features\n- Cleanliness and hygiene standards\n- Staff safety protocols\n- Building safety and maintenance\n- Guest safety measures' :
  '- General area safety and security\n- Crowd safety and management\n- Accessibility for all visitors\n- Health and hygiene conditions\n- Emergency facilities availability'
}

Base your assessment on the actual content of the reviews, looking for mentions of safety, security, cleanliness, incidents, or any concerns raised by visitors.`;
  }

  parseSafetyAnalysis(analysisText) {
    try {
      // Try to extract JSON from the response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          safetyScore: parsed.safetyScore || 7.5,
          overallAssessment: parsed.overallAssessment || 'Safety assessment based on available reviews.',
          safetyCategories: parsed.safetyCategories || {
            Security: 4,
            Cleanliness: 4,
            Health: 4,
            Accessibility: 4,
            Emergency: 4
          },
          keyInsights: parsed.keyInsights || ['Based on visitor feedback', 'Generally positive safety aspects', 'Suitable for tourists'],
          safetyConcerns: parsed.safetyConcerns || [],
          recommendations: parsed.recommendations || ['Follow standard travel safety guidelines'],
          lastUpdated: new Date().toISOString()
        };
      }
    } catch (error) {
      console.error('Error parsing safety analysis:', error);
    }
    
    return this.getFallbackSafetyAnalysis();
  }

  getDefaultSafetyAnalysis(type) {
    return {
      safetyScore: 7.5,
      overallAssessment: 'This location is currently gathering visitor safety feedback. Please check back soon for AI-generated safety insights.',
      safetyCategories: {
        Security: 4,
        Cleanliness: 4,
        Health: 4,
        Accessibility: 4,
        Emergency: 4
      },
      keyInsights: [
        'Safety assessment in progress',
        'Based on preliminary information',
        'Follow standard travel safety guidelines'
      ],
      safetyConcerns: [],
      recommendations: [
        'Check latest travel advisories',
        'Follow standard safety precautions'
      ],
      lastUpdated: new Date().toISOString()
    };
  }

  getFallbackSafetyAnalysis(type) {
    return {
      safetyScore: 7.0,
      overallAssessment: 'Unable to generate detailed safety analysis at this time. Basic safety information available.',
      safetyCategories: {
        Security: 4,
        Cleanliness: 4,
        Health: 4,
        Accessibility: 3,
        Emergency: 3
      },
      keyInsights: [
        'Standard safety measures recommended',
        'Follow local guidelines',
        'Stay aware of surroundings'
      ],
      safetyConcerns: ['Limited safety data available'],
      recommendations: [
        'Research local safety conditions',
        'Follow travel safety best practices'
      ],
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Batch summarize multiple locations
   * @param {Array} locations - Array of location objects with reviews
   * @param {string} type - 'hotel' or 'place'
   * @returns {Object} - Object mapping location IDs to summaries
   */
  async batchSummarize(locations, type) {
    const summaries = {};
    
    for (const location of locations) {
      try {
        summaries[location.id] = await this.summarizeReviews(
          location.reviews, 
          type, 
          location.name
        );
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error summarizing ${location.name}:`, error);
        summaries[location.id] = this.getDefaultSummary(type);
      }
    }

    return summaries;
  }

  /**
   * Batch analyze safety for multiple locations
   * @param {Array} locations - Array of location objects with reviews
   * @param {string} type - 'hotel' or 'place'
   * @returns {Object} - Object mapping location IDs to safety analyses
   */
  async batchAnalyzeSafety(locations, type) {
    const safetyAnalyses = {};
    
    for (const location of locations) {
      try {
        safetyAnalyses[location.id] = await this.analyzeSafety(
          location.reviews, 
          type, 
          location.name
        );
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error analyzing safety for ${location.name}:`, error);
        safetyAnalyses[location.id] = this.getDefaultSafetyAnalysis(type);
      }
    }

    return safetyAnalyses;
  }
}

export default new AISummarizationService();
