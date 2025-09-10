import React from 'react';
import { X } from 'lucide-react';
import './LogoutConfirmModal.css';

export default function LogoutConfirmModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 w-[90%] max-w-md shadow-2xl animate-fadeIn relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Logout Required</h3>
          <p className="text-gray-300 mb-8">
            {message || "You need to log out before accessing this page. Would you like to logout now?"}
          </p>
          
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-gray-300 hover:text-white font-medium transition-colors rounded-lg bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm border border-white/10"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

