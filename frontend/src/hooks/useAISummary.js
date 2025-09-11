import { useState, useEffect, useCallback } from 'react';
import aiSummarizationService from '../services/aiSummarizationService';

/**
 * Custom hook for managing AI-generated review summaries
 * @param {Array} reviews - Array of review objects
 * @param {string} type - 'hotel' or 'place'
 * @param {string} name - Name of the location
 * @param {boolean} enabled - Whether to auto-generate summary
 */
export const useAISummary = (reviews, type, name, enabled = true) => {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastGenerated, setLastGenerated] = useState(null);

  // Generate summary
  const generateSummary = useCallback(async (forceUpdate = false) => {
    if (!enabled || !reviews || !type || !name) {
      return;
    }

    // Check if we need to update
    if (!forceUpdate && summary && !aiSummarizationService.needsUpdate(reviews, summary)) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`🔄 Generating AI summary for ${name}...`);
      const result = await aiSummarizationService.summarizeReviews(reviews, type, name);
      
      setSummary(result);
      setLastGenerated(new Date().toISOString());
      
      console.log(`✅ AI summary generated for ${name}`);
    } catch (err) {
      console.error(`❌ Failed to generate summary for ${name}:`, err);
      setError(err.message);
      
      // Set fallback summary
      const fallback = aiSummarizationService.getFallbackSummary(reviews, type);
      setSummary(fallback);
    } finally {
      setIsLoading(false);
    }
  }, [reviews, type, name, enabled, summary]);

  // Auto-generate summary when dependencies change
  useEffect(() => {
    if (enabled && reviews && type && name) {
      generateSummary();
    }
  }, [generateSummary, enabled, reviews, type, name]);

  // Refresh summary manually
  const refreshSummary = useCallback(() => {
    generateSummary(true);
  }, [generateSummary]);

  // Get formatted summary for display
  const formattedSummary = summary 
    ? aiSummarizationService.formatSummaryForDisplay(summary)
    : null;

  return {
    summary: formattedSummary,
    rawSummary: summary,
    isLoading,
    error,
    lastGenerated,
    refreshSummary,
    isEnabled: enabled
  };
};

/**
 * Custom hook for batch AI summaries
 * @param {Array} locations - Array of location objects with reviews
 * @param {string} type - 'hotel' or 'place'
 * @param {boolean} enabled - Whether to auto-generate summaries
 */
export const useBatchAISummary = (locations, type, enabled = false) => {
  const [summaries, setSummaries] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastGenerated, setLastGenerated] = useState(null);

  // Generate batch summaries
  const generateBatchSummaries = useCallback(async () => {
    if (!enabled || !locations || !type || locations.length === 0) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`🔄 Generating batch AI summaries for ${locations.length} ${type}s...`);
      const result = await aiSummarizationService.batchSummarize(locations, type);
      
      setSummaries(result.data.summaries);
      setLastGenerated(new Date().toISOString());
      
      console.log(`✅ Batch AI summaries generated for ${locations.length} ${type}s`);
    } catch (err) {
      console.error(`❌ Failed to generate batch summaries:`, err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [locations, type, enabled]);

  // Auto-generate summaries when dependencies change
  useEffect(() => {
    if (enabled && locations && type && locations.length > 0) {
      generateBatchSummaries();
    }
  }, [generateBatchSummaries, enabled, locations, type]);

  // Get summary for a specific location
  const getSummaryForLocation = useCallback((locationId) => {
    const rawSummary = summaries[locationId];
    return rawSummary 
      ? aiSummarizationService.formatSummaryForDisplay({ data: rawSummary })
      : null;
  }, [summaries]);

  return {
    summaries,
    isLoading,
    error,
    lastGenerated,
    generateBatchSummaries,
    getSummaryForLocation,
    isEnabled: enabled
  };
};

export default { useAISummary, useBatchAISummary };
