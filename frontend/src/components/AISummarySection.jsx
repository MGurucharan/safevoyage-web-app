import React from 'react';
import { RefreshCw, Brain, Loader2, AlertCircle, Clock } from 'lucide-react';

const AISummarySection = ({ 
  summary, 
  isLoading, 
  error, 
  lastGenerated, 
  onRefresh, 
  className = '',
  showRefreshButton = true 
}) => {
  
  if (isLoading) {
    return (
      <section className={`bg-gray-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-lg mb-8 ${className}`}>
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Brain className="h-6 w-6 text-blue-400 animate-pulse" />
          <h2 className="text-xl font-bold text-white">
            AI Summarized Feedback & Reviews
          </h2>
          <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-blue-300">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p>Analyzing reviews with AI...</p>
        </div>
        
        <div className="mt-4 animate-pulse">
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-3 bg-gray-700 rounded w-1/2"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && !summary) {
    return (
      <section className={`bg-gray-900/50 backdrop-blur-sm border border-red-500/20 p-8 rounded-2xl shadow-lg mb-8 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Brain className="h-6 w-6 text-red-400" />
            <h2 className="text-xl font-bold text-white">
              AI Summarized Feedback & Reviews
            </h2>
          </div>
          {showRefreshButton && onRefresh && (
            <button
              onClick={onRefresh}
              className="flex items-center space-x-2 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-lg text-red-300 transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Retry</span>
            </button>
          )}
        </div>
        
        <div className="flex items-start space-x-3 text-red-300 bg-red-500/10 p-4 rounded-lg">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Unable to generate AI summary</p>
            <p className="text-sm text-red-400 mt-1">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!summary) {
    return (
      <section className={`bg-gray-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-lg mb-8 ${className}`}>
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="h-6 w-6 text-gray-400" />
          <h2 className="text-xl font-bold text-white">
            AI Summarized Feedback & Reviews
          </h2>
        </div>
        
        <p className="text-gray-400 text-center py-8">
          No reviews available for AI analysis
        </p>
      </section>
    );
  }

  return (
    <section className={`bg-gray-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-lg mb-8 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Brain className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">
            AI Summarized Feedback & Reviews
          </h2>
          {summary.isAIGenerated && (
            <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full text-blue-300 text-xs font-medium">
              AI Generated
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {lastGenerated && (
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <Clock className="h-3 w-3" />
              <span>Updated {summary.lastUpdated}</span>
            </div>
          )}
          
          {showRefreshButton && onRefresh && (
            <button
              onClick={onRefresh}
              className="flex items-center space-x-2 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-lg text-blue-300 transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Refresh</span>
            </button>
          )}
        </div>
      </div>
      
      {/* AI Summary Text */}
      <div className="mb-6">
        <p className="text-gray-300 leading-relaxed">
          "{summary.text}"
        </p>
        
        {summary.reviewCount > 0 && (
          <p className="text-sm text-gray-400 mt-2">
            Based on analysis of {summary.reviewCount} {summary.reviewCount === 1 ? 'review' : 'reviews'}
          </p>
        )}
      </div>

      {/* Category Ratings */}
      {summary.categories && summary.categories.length > 0 && (
        <div className="space-y-3">
          {summary.categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-300 font-medium capitalize">
                {category.name}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">{category.stars}</span>
                <span className="text-sm text-gray-400">
                  ({category.rating}/5)
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Information Footer */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-blue-300">
            <Brain className="h-3 w-3" />
            <span>
              {summary.isAIGenerated 
                ? 'Powered by AI analysis of customer reviews'
                : 'Fallback summary - AI service temporarily unavailable'
              }
            </span>
          </div>
          
          {error && (
            <div className="flex items-center space-x-1 text-yellow-400">
              <AlertCircle className="h-3 w-3" />
              <span>Limited functionality</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AISummarySection;
