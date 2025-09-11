const API_BASE_URL = 'http://localhost:5000/api/ai';

class AISummarizationService {
  /**
   * Summarize reviews for a single location (hotel or place)
   * @param {Array} reviews - Array of review objects
   * @param {string} type - 'hotel' or 'place'
   * @param {string} name - Name of the location
   * @returns {Promise<Object>} - AI-generated summary and ratings
   */
  async summarizeReviews(reviews, type, name) {
    try {
      console.log(`🤖 Generating AI summary for ${type}: ${name}`);
      console.log(`📊 Review data:`, reviews);
      
      const response = await fetch(`${API_BASE_URL}/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviews,
          type,
          name
        }),
      });

      console.log(`📡 Response status:`, response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Response error:`, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log(`📋 Response data:`, data);

      console.log(`✅ AI summary generated successfully for ${name}`);
      return data;
      
    } catch (error) {
      console.error('❌ Error generating AI summary:', error);
      
      // Return fallback summary if API fails
      return this.getFallbackSummary(reviews, type);
    }
  }

  /**
   * Batch summarize reviews for multiple locations
   * @param {Array} locations - Array of location objects with reviews
   * @param {string} type - 'hotel' or 'place'
   * @returns {Promise<Object>} - Object mapping location IDs to summaries
   */
  async batchSummarize(locations, type) {
    try {
      console.log(`🤖 Generating batch AI summaries for ${locations.length} ${type}s`);
      
      const response = await fetch(`${API_BASE_URL}/ai/batch-summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locations,
          type
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate batch AI summaries');
      }

      console.log(`✅ Batch AI summaries generated successfully`);
      return data;
      
    } catch (error) {
      console.error('❌ Error generating batch AI summaries:', error);
      
      // Return fallback summaries if API fails
      const fallbackSummaries = {};
      locations.forEach(location => {
        fallbackSummaries[location.id] = this.getFallbackSummary(location.reviews, type);
      });
      
      return {
        success: true,
        data: {
          summaries: fallbackSummaries,
          count: locations.length,
          type
        }
      };
    }
  }

  /**
   * Get a sample AI summary for testing
   * @param {string} type - 'hotel' or 'place'
   * @returns {Promise<Object>} - Sample AI summary
   */
  async getSampleSummary(type) {
    try {
      console.log(`🧪 Getting sample AI summary for ${type}`);
      
      const response = await fetch(`${API_BASE_URL}/ai/sample/${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get sample summary');
      }

      console.log(`✅ Sample AI summary retrieved successfully`);
      return data;
      
    } catch (error) {
      console.error('❌ Error getting sample summary:', error);
      return this.getFallbackSummary([], type);
    }
  }

  /**
   * Fallback summary when AI service is unavailable
   * @param {Array} reviews - Array of review objects
   * @param {string} type - 'hotel' or 'place'
   * @returns {Object} - Fallback summary data
   */
  getFallbackSummary(reviews, type) {
    // Calculate average rating if reviews exist
    let avgRating = 4;
    if (reviews && reviews.length > 0) {
      avgRating = reviews.reduce((sum, review) => sum + (review.rating || 4), 0) / reviews.length;
    }

    // Generate fallback summary based on rating
    let summary = '';
    if (avgRating >= 4.5) {
      summary = 'Visitors consistently praise this location with excellent reviews highlighting outstanding experiences and high satisfaction levels.';
    } else if (avgRating >= 4.0) {
      summary = 'Most visitors have positive experiences with good overall satisfaction, though some areas for improvement have been noted.';
    } else if (avgRating >= 3.0) {
      summary = 'Reviews show mixed experiences with both positive highlights and areas that could be improved for better visitor satisfaction.';
    } else {
      summary = 'Visitor feedback indicates room for improvement in various aspects of the experience.';
    }

    // Default category ratings based on type
    const categories = type === 'hotel' 
      ? ['Service', 'Cleanliness', 'Amenities', 'Value', 'Location']
      : ['Scenery', 'Experience', 'Accessibility', 'Value', 'Safety'];

    const ratings = {};
    categories.forEach(category => {
      // Base rating on average with slight variation
      ratings[category] = Math.max(1, Math.min(5, Math.round(avgRating + (Math.random() - 0.5) * 0.5)));
    });

    return {
      success: true,
      data: {
        summary,
        ratings,
        lastUpdated: new Date().toISOString(),
        reviewCount: reviews ? reviews.length : 0,
        type,
        name: 'Fallback Summary',
        isFallback: true
      }
    };
  }

  /**
   * Generate star rating display from numeric rating
   * @param {number} rating - Numeric rating (1-5)
   * @returns {string} - Star emoji representation
   */
  getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '⭐'.repeat(fullStars);
    
    if (hasHalfStar && fullStars < 5) {
      stars += '⭐';
    }
    
    // Pad with empty stars if needed (for display consistency)
    const totalStars = hasHalfStar ? fullStars + 1 : fullStars;
    if (totalStars < 5) {
      stars += '☆'.repeat(5 - totalStars);
    }
    
    return stars;
  }

  /**
   * Format the AI summary for display
   * @param {Object} summaryData - Raw summary data from API
   * @returns {Object} - Formatted summary ready for display
   */
  formatSummaryForDisplay(summaryData) {
    if (!summaryData || !summaryData.data) {
      return null;
    }

    const { summary, ratings, lastUpdated, reviewCount, type } = summaryData.data;

    return {
      text: summary,
      categories: Object.entries(ratings).map(([category, rating]) => ({
        name: category,
        rating: rating,
        stars: this.getStarRating(rating)
      })),
      lastUpdated: new Date(lastUpdated).toLocaleDateString(),
      reviewCount,
      type,
      isAIGenerated: !summaryData.data.isFallback
    };
  }

  /**
   * Check if reviews have been updated and need re-summarization
   * @param {Array} reviews - Current reviews
   * @param {Object} existingSummary - Existing summary data
   * @returns {boolean} - Whether re-summarization is needed
   */
  needsUpdate(reviews, existingSummary) {
    if (!existingSummary || !existingSummary.data) {
      return true;
    }

    const { reviewCount, lastUpdated } = existingSummary.data;
    
    // Check if review count changed
    if (reviews.length !== reviewCount) {
      return true;
    }

    // Check if summary is more than 24 hours old
    const summaryDate = new Date(lastUpdated);
    const now = new Date();
    const hoursDiff = (now - summaryDate) / (1000 * 60 * 60);
    
    return hoursDiff > 24;
  }
}

export default new AISummarizationService();
