import { useState, useEffect, useCallback } from 'react';
import aiSafetyService from '../services/aiSafetyService';

/**
 * Custom hook for AI Safety Analysis
 * @param {Array} reviews - Array of review objects
 * @param {string} type - 'hotel' or 'place'
 * @param {string} name - Name of the location
 * @param {boolean} autoAnalyze - Whether to automatically analyze on mount
 * @returns {Object} Hook state and functions
 */
export const useAISafetyAnalysis = (reviews, type, name, autoAnalyze = true) => {
  const [safetyAnalysis, setSafetyAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const analyzeSafety = useCallback(async () => {
    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
      console.warn('⚠️ [useAISafetyAnalysis] No reviews provided for safety analysis');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`🔍 [useAISafetyAnalysis] Starting safety analysis for ${name}`);
      
      const result = await aiSafetyService.analyzeSafety(reviews, type, name);
      
      if (result.success) {
        setSafetyAnalysis(result.data);
        setLastUpdated(new Date().toISOString());
        console.log('✅ [useAISafetyAnalysis] Safety analysis completed successfully');
      } else {
        setError(result.error);
        setSafetyAnalysis(result.data); // Fallback data
        console.warn('⚠️ [useAISafetyAnalysis] Using fallback safety analysis');
      }
    } catch (err) {
      console.error('❌ [useAISafetyAnalysis] Safety analysis failed:', err);
      setError(err.message);
      setSafetyAnalysis(aiSafetyService.getFallbackSafetyAnalysis(type));
    } finally {
      setLoading(false);
    }
  }, [reviews, type, name]);

  const refresh = useCallback(() => {
    console.log('🔄 [useAISafetyAnalysis] Manual refresh triggered');
    analyzeSafety();
  }, [analyzeSafety]);

  const clearAnalysis = useCallback(() => {
    console.log('🗑️ [useAISafetyAnalysis] Clearing safety analysis');
    setSafetyAnalysis(null);
    setError(null);
    setLastUpdated(null);
  }, []);

  // Auto-analyze on mount or when dependencies change
  useEffect(() => {
    if (autoAnalyze && reviews && reviews.length > 0 && type && name) {
      console.log('🚀 [useAISafetyAnalysis] Auto-analyzing safety on mount/change');
      analyzeSafety();
    }
  }, [autoAnalyze, analyzeSafety]);

  return {
    safetyAnalysis,
    loading,
    error,
    lastUpdated,
    analyzeSafety,
    refresh,
    clearAnalysis,
    isAnalyzed: !!safetyAnalysis
  };
};

/**
 * Custom hook for batch AI Safety Analysis
 * @param {Array} locations - Array of location objects with reviews
 * @param {string} type - 'hotel' or 'place'
 * @param {boolean} autoAnalyze - Whether to automatically analyze on mount
 * @returns {Object} Hook state and functions
 */
export const useBatchAISafetyAnalysis = (locations, type, autoAnalyze = false) => {
  const [safetyAnalyses, setSafetyAnalyses] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const batchAnalyzeSafety = useCallback(async () => {
    if (!locations || !Array.isArray(locations) || locations.length === 0) {
      console.warn('⚠️ [useBatchAISafetyAnalysis] No locations provided for batch safety analysis');
      return;
    }

    setLoading(true);
    setError(null);
    setProgress({ current: 0, total: locations.length });

    try {
      console.log(`🔍 [useBatchAISafetyAnalysis] Starting batch safety analysis for ${locations.length} locations`);
      
      const result = await aiSafetyService.batchAnalyzeSafety(locations, type);
      
      if (result.success) {
        setSafetyAnalyses(result.data);
        setProgress({ current: locations.length, total: locations.length });
        console.log('✅ [useBatchAISafetyAnalysis] Batch safety analysis completed successfully');
      } else {
        setError(result.error);
        setSafetyAnalyses(result.data); // Fallback data
        console.warn('⚠️ [useBatchAISafetyAnalysis] Using fallback safety analyses');
      }
    } catch (err) {
      console.error('❌ [useBatchAISafetyAnalysis] Batch safety analysis failed:', err);
      setError(err.message);
      
      // Generate fallback for all locations
      const fallbackAnalyses = {};
      locations.forEach(location => {
        fallbackAnalyses[location.id] = aiSafetyService.getFallbackSafetyAnalysis(type);
      });
      setSafetyAnalyses(fallbackAnalyses);
    } finally {
      setLoading(false);
    }
  }, [locations, type]);

  const getSafetyAnalysisForLocation = useCallback((locationId) => {
    return safetyAnalyses[locationId] || null;
  }, [safetyAnalyses]);

  const refresh = useCallback(() => {
    console.log('🔄 [useBatchAISafetyAnalysis] Manual refresh triggered');
    batchAnalyzeSafety();
  }, [batchAnalyzeSafety]);

  const clearAnalyses = useCallback(() => {
    console.log('🗑️ [useBatchAISafetyAnalysis] Clearing all safety analyses');
    setSafetyAnalyses({});
    setError(null);
    setProgress({ current: 0, total: 0 });
  }, []);

  // Auto-analyze on mount or when dependencies change
  useEffect(() => {
    if (autoAnalyze && locations && locations.length > 0 && type) {
      console.log('🚀 [useBatchAISafetyAnalysis] Auto-analyzing safety on mount/change');
      batchAnalyzeSafety();
    }
  }, [autoAnalyze, batchAnalyzeSafety]);

  return {
    safetyAnalyses,
    loading,
    error,
    progress,
    batchAnalyzeSafety,
    getSafetyAnalysisForLocation,
    refresh,
    clearAnalyses,
    isAnalyzed: Object.keys(safetyAnalyses).length > 0
  };
};
