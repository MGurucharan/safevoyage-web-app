import React from 'react';
import { Shield, Star, AlertTriangle, CheckCircle, Info, RefreshCw } from 'lucide-react';
import aiSafetyService from '../services/aiSafetyService';

const AISafetyScore = ({ 
  safetyAnalysis, 
  loading, 
  error, 
  onRefresh, 
  compact = false 
}) => {
  if (loading) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Shield className="h-6 w-6 mr-3 text-blue-400 animate-pulse" />
            <h3 className="text-xl font-bold text-white">AI Safety Score</h3>
          </div>
          <div className="flex items-center">
            <RefreshCw className="h-4 w-4 mr-2 text-blue-400 animate-spin" />
            <span className="text-blue-400 text-sm">Analyzing...</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error && !safetyAnalysis) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-red-400/30 p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 mr-3 text-red-400" />
            <h3 className="text-xl font-bold text-white">AI Safety Score</h3>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="text-red-300 mb-4">
          Unable to analyze safety at this time. Please try again later.
        </div>
        
        <div className="text-sm text-gray-400">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!safetyAnalysis) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Shield className="h-6 w-6 mr-3 text-gray-300" />
            <h3 className="text-xl font-bold text-white">AI Safety Score</h3>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="text-gray-300">
          Safety analysis will be available once reviews are processed.
        </div>
      </div>
    );
  }

  const { 
    safetyScore, 
    overallAssessment, 
    safetyCategories, 
    keyInsights, 
    safetyConcerns, 
    recommendations,
    isFallback 
  } = safetyAnalysis;

  const scoreColor = aiSafetyService.getSafetyScoreColor(safetyScore);
  const scoreText = aiSafetyService.getSafetyScoreText(safetyScore);

  if (compact) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-4 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-400" />
            <span className="font-medium text-white">Safety Score</span>
          </div>
          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${scoreColor} text-white text-sm font-bold`}>
            {safetyScore}/10
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-1">{scoreText}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Shield className="h-6 w-6 mr-3 text-blue-400" />
          <h3 className="text-xl font-bold text-white">AI Safety Score</h3>
        </div>
        <div className="flex items-center space-x-3">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="text-blue-400 hover:text-blue-300 transition-colors"
              title="Refresh Analysis"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
          <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${scoreColor} text-white text-lg font-bold shadow-lg`}>
            {safetyScore}/10
          </div>
        </div>
      </div>

      {/* Overall Assessment */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
          <span className="font-medium text-white">{scoreText} Safety Rating</span>
        </div>
        <p className="text-gray-300 text-sm">{overallAssessment}</p>
      </div>

      {/* Safety Categories */}
      <div className="mb-6">
        <h4 className="font-semibold text-white mb-3">Safety Categories</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(safetyCategories).map(([category, rating]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">{category}</span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs text-gray-400">({rating}/5)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      {keyInsights && keyInsights.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3">Key Safety Insights</h4>
          <ul className="space-y-2">
            {keyInsights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <Info className="h-4 w-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Safety Concerns */}
      {safetyConcerns && safetyConcerns.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-orange-400 mb-3">Safety Considerations</h4>
          <ul className="space-y-2">
            {safetyConcerns.map((concern, index) => (
              <li key={index} className="flex items-start">
                <AlertTriangle className="h-4 w-4 mr-2 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-orange-300 text-sm">{concern}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-green-400 mb-3">Safety Recommendations</h4>
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className={`text-xs p-2 rounded border ${
        isFallback 
          ? 'text-orange-300 bg-orange-500/20 border-orange-400/30' 
          : 'text-blue-300 bg-blue-500/20 border-blue-400/30'
      }`}>
        {isFallback ? (
          <>⚠️ Limited data available - showing general safety guidelines</>
        ) : (
          <>🤖 AI-powered safety analysis based on traveler reviews</>
        )}
      </div>
    </div>
  );
};

export default AISafetyScore;
