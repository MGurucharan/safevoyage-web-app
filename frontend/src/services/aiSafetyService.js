// AI Safety Analysis Service
// This service handles communication with the backend AI safety analysis endpoints

const API_BASE_URL = 'http://localhost:5000/api/ai';

class AISafetyService {
  /**
   * Analyze safety aspects from reviews for a single location
   * @param {Array} reviews - Array of review objects
   * @param {string} type - 'hotel' or 'place'
   * @param {string} name - Name of the location
   * @returns {Promise<Object>} Safety analysis result
   */
  async analyzeSafety(reviews, type, name) {
    try {
      console.log(`🔍 [AI Safety Service] Analyzing safety for ${type}: ${name}`);
      console.log(`📊 [AI Safety Service] Processing ${reviews.length} reviews`);
      
      const response = await fetch(`${API_BASE_URL}/analyze-safety`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviews,
          type,
          name
        })
      });

      console.log(`🌐 [AI Safety Service] Response status: ${response.status}`);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ [AI Safety Service] API Error:', errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ [AI Safety Service] Safety analysis received:', data);

      return {
        success: true,
        data: data.data
      };

    } catch (error) {
      console.error('❌ [AI Safety Service] Analysis failed:', error);
      
      // Return fallback safety analysis
      return {
        success: false,
        error: error.message,
        data: this.getFallbackSafetyAnalysis(type)
      };
    }
  }

  /**
   * Batch analyze safety for multiple locations
   * @param {Array} locations - Array of location objects with reviews
   * @param {string} type - 'hotel' or 'place'
   * @returns {Promise<Object>} Batch safety analyses result
   */
  async batchAnalyzeSafety(locations, type) {
    try {
      console.log(`🔍 [AI Safety Service] Batch analyzing safety for ${locations.length} ${type}s`);
      
      const response = await fetch(`${API_BASE_URL}/batch-analyze-safety`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locations,
          type
        })
      });

      console.log(`🌐 [AI Safety Service] Batch response status: ${response.status}`);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ [AI Safety Service] Batch API Error:', errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ [AI Safety Service] Batch safety analyses received:', data);

      return {
        success: true,
        data: data.data.safetyAnalyses
      };

    } catch (error) {
      console.error('❌ [AI Safety Service] Batch analysis failed:', error);
      
      // Return fallback for all locations
      const fallbackAnalyses = {};
      locations.forEach(location => {
        fallbackAnalyses[location.id] = this.getFallbackSafetyAnalysis(type);
      });

      return {
        success: false,
        error: error.message,
        data: fallbackAnalyses
      };
    }
  }

  /**
   * Get a sample safety analysis for testing
   * @param {string} type - 'hotel' or 'place'
   * @returns {Promise<Object>} Sample safety analysis
   */
  async getSampleSafetyAnalysis(type) {
    try {
      console.log(`🔍 [AI Safety Service] Getting sample safety analysis for ${type}`);
      
      const response = await fetch(`${API_BASE_URL}/sample-safety/${type}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ [AI Safety Service] Sample safety analysis received:', data);

      return {
        success: true,
        data: data.data
      };

    } catch (error) {
      console.error('❌ [AI Safety Service] Sample analysis failed:', error);
      
      return {
        success: false,
        error: error.message,
        data: this.getFallbackSafetyAnalysis(type)
      };
    }
  }

  /**
   * Provide a fallback safety analysis when AI service is unavailable
   * @param {string} type - 'hotel' or 'place'
   * @returns {Object} Fallback safety analysis
   */
  getFallbackSafetyAnalysis(type) {
    return {
      safetyScore: 7.5,
      overallAssessment: 'Safety analysis is temporarily unavailable. Please refer to general travel safety guidelines.',
      safetyCategories: {
        Security: 4,
        Cleanliness: 4,
        Health: 4,
        Accessibility: 3,
        Emergency: 3
      },
      keyInsights: [
        'General safety standards apply',
        'Follow standard travel precautions',
        'Check local safety guidelines'
      ],
      safetyConcerns: [
        'Limited safety data available'
      ],
      recommendations: [
        'Research current local conditions',
        'Follow travel safety best practices',
        'Stay informed about local guidelines'
      ],
      lastUpdated: new Date().toISOString(),
      isFallback: true
    };
  }

  /**
   * Calculate safety score color for UI display
   * @param {number} score - Safety score (1-10)
   * @returns {string} CSS classes for color styling
   */
  getSafetyScoreColor(score) {
    if (score >= 8.5) return 'from-green-400 to-emerald-400';
    if (score >= 7.0) return 'from-blue-400 to-cyan-400';
    if (score >= 5.5) return 'from-yellow-400 to-orange-400';
    return 'from-red-400 to-pink-400';
  }

  /**
   * Get safety score description text
   * @param {number} score - Safety score (1-10)
   * @returns {string} Description text
   */
  getSafetyScoreText(score) {
    if (score >= 8.5) return 'Excellent';
    if (score >= 7.0) return 'Very Good';
    if (score >= 5.5) return 'Good';
    if (score >= 4.0) return 'Fair';
    return 'Needs Improvement';
  }
}

export default new AISafetyService();
