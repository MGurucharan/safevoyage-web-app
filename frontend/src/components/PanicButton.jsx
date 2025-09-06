import API from "../services/api";
import React, { useState } from 'react';
import { AlertTriangle, Phone } from 'lucide-react';

const PanicButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleEmergency = async () => {
  setIsPressed(true);
  setShowConfirmation(true);

  try {
    // Send panic alert to backend
    await API.post("/alerts", {
      location: "Bangalore",   // TODO: replace with actual GPS coords
      message: "🚨 Emergency! Tourist needs help",
    });
  } catch (err) {
    console.error("Failed to send alert:", err.response?.data || err.message);
  }

  // Reset button after 5 seconds
  setTimeout(() => {
    setIsPressed(false);
    setShowConfirmation(false);
  }, 5000);
};
navigator.geolocation.getCurrentPosition(
  async (position) => {
    const { latitude, longitude } = position.coords;
    try {
      await API.post("/alerts", {
        location: { lat: latitude, lng: longitude },
        message: "🚨 Emergency! Tourist needs help",
      });
    } catch (err) {
      console.error("Failed to send alert:", err.response?.data || err.message);
    }
  },
  (error) => {
    console.error("Location error:", error.message);
  }
);
  return (
    <>
      {/* Panic Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleEmergency}
          disabled={isPressed}
          className={`
            w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform
            ${isPressed 
              ? 'bg-red-600 scale-110 animate-pulse' 
              : 'bg-red-500 hover:bg-red-600 hover:scale-105'
            }
            ${isPressed ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <AlertTriangle className="h-8 w-8 text-white mx-auto" />
        </button>
      </div>

      {/* Emergency Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center animate-scale-in">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-red-600 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-red-600 mb-2">Emergency Alert Sent!</h3>
            <p className="text-gray-600 mb-6">
              Your location and emergency details have been sent to local authorities and emergency contacts.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>✓ GPS coordinates shared</p>
              <p>✓ Emergency services notified</p>
              <p>✓ Contacts alerted</p>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">Help is on the way!</p>
              <p className="text-blue-600 text-sm">Stay calm and stay where you are if safe.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PanicButton;