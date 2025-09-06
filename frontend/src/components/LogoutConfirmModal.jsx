import React from 'react';
import { X } from 'lucide-react';
import './LogoutConfirmModal.css';

export default function LogoutConfirmModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Blurred backdrop */}
      <div 
        className="fixed inset-0 backdrop-blur-lg bg-white/60"
        style={{ 
          zIndex: 9998,
          top: '64px',
          height: 'calc(100vh - 64px)'
        }}
      />
      {/* Clear modal container */}
      <div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{ 
          zIndex: 9999,
          top: '64px',
          height: 'calc(100vh - 64px)'
        }}
      >
        <div 
          className="relative bg-white rounded-xl p-8 w-[90%] max-w-md shadow-2xl border border-gray-100 animate-fadeIn pointer-events-auto"
          style={{ transform: 'translateY(-32px)' }}
        >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Logout Required</h3>
          <p className="text-gray-600 mb-8">
            {message || "You need to log out before accessing this page. Would you like to logout now?"}
          </p>
          
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition-colors rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
          </div>
        </div>
    </>
  );
}

