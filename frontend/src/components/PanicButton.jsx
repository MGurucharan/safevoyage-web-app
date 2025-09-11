import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const PanicButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleEmergency = () => {
    setIsPressed(true);
    setShowConfirmation(true);
  };

  const handleClose = () => {
    setShowConfirmation(false);
    setIsPressed(false);
  };

  return (
    <>
      {/* Panic Button */}
      <div className="fixed bottom-6 right-6 z-10">
        <button
          onClick={handleEmergency}
          disabled={isPressed}
          className={`
            w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform backdrop-blur-sm border
            ${isPressed 
              ? 'bg-red-500 border-red-400/50 scale-110 animate-pulse' 
              : 'bg-red-500 border-red-400/30 hover:bg-red-500/80 hover:scale-105'
            }
            ${isPressed ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <AlertTriangle className="h-8 w-8 text-white mx-auto" />
        </button>
      </div>

      {/* Emergency Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900/50 to-blue-900/20 backdrop-blur-sm flex items-center justify-center z-[100] p-4 transition-opacity duration-300">
          <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative transform transition-all duration-300 scale-100">
            
            {/* Close Button */}
            <button 
              onClick={handleClose} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 z-10 rounded-full p-1 hover:bg-gray-800/50"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Emergency Icon */}
            <div className="mx-auto mb-6 inline-flex items-center justify-center h-16 w-16 rounded-xl bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
            
            {/* Title */}
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
              Emergency Alert Sent!
            </h2>
            
            {/* Description */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your location and emergency details have been sent to local authorities and emergency contacts.
            </p>

            {/* Status List */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-left">
                <div className="h-5 w-5 mr-3 flex-shrink-0 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                </div>
                <span className="text-gray-300 text-sm">GPS coordinates shared</span>
              </div>
              <div className="flex items-center text-left">
                <div className="h-5 w-5 mr-3 flex-shrink-0 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                </div>
                <span className="text-gray-300 text-sm">Emergency services notified</span>
              </div>
              <div className="flex items-center text-left">
                <div className="h-5 w-5 mr-3 flex-shrink-0 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                </div>
                <span className="text-gray-300 text-sm">Contacts alerted</span>
              </div>
            </div>
            
            {/* Info Box */}
            <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 p-4 rounded-lg mb-6 text-left">
              <p className="font-semibold text-blue-400 mb-1">Help is on the way!</p>
              <p className="text-sm text-gray-300">Stay calm and stay where you are if safe.</p>
            </div>

            {/* Action Button */}
            <button
              onClick={handleClose}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PanicButton;