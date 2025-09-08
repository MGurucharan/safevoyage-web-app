import React from 'react';
import { Search, Clock, CheckCircle, AlertCircle, QrCode } from 'lucide-react';

const Verification = () => {
  return (
    <div
      className="relative font-sans min-h-screen overflow-x-hidden"
      style={{
        backgroundImage: `url(https://media.istockphoto.com/id/1362422378/photo/abstract-blurred-purple-background-light-spot-on-dark-background.jpg?s=612x612&w=0&k=20&c=yFF6-7r_YZQ-r3rTgMPU5n4w-5x3qy0e0wZwZukM2c0=)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-xl">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-blue-100 mb-4 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.7)]">
              Digital ID Verification
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.7)]">
              Verify the authenticity of SafeVoyage Digital IDs using blockchain technology
            </p>
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 rounded-xl p-8 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-orange-600 mr-3" />
              <h2 className="text-2xl font-bold text-orange-800">Coming Soon</h2>
            </div>
            <p className="text-center text-orange-700 text-lg mb-4">
              Advanced Digital ID Verification System is under development
            </p>
            <div className="text-center text-orange-600">
              <p className="mb-2">🚀 Expected features:</p>
              <ul className="text-sm space-y-1 max-w-md mx-auto">
                <li>• Real-time blockchain verification</li>
                <li>• QR code scanning capability</li>
                <li>• Instant verification results</li>
                <li>• Cross-platform compatibility</li>
              </ul>
            </div>
          </div>

          {/* Mockup Interface */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">ID Verification Portal</h2>
              <p className="text-green-100">Verify Digital Tourist IDs instantly</p>
            </div>

            <div className="p-8">
              {/* Verification Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center opacity-50">
                  <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-blue-100 mb-2 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.7)]">QR Code Scan</h3>
                  <p className="text-sm text-gray-500">Scan Digital ID QR code for instant verification</p>
                  <button disabled className="mt-4 w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed">
                    Scan QR Code
                  </button>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center opacity-50">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-blue-100 mb-2 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.7)]">ID Number Lookup</h3>
                  <p className="text-sm text-gray-500">Enter Digital ID number for verification</p>
                  <input
                    type="text"
                    placeholder="SVG-2025-XXXXXX"
                    disabled
                    className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                  <button disabled className="mt-2 w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed">
                    Verify ID
                  </button>
                </div>
              </div>

              {/* Mock Verification Result */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-blue-100 mb-4 flex items-center drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.7)]">
                  <AlertCircle className="h-5 w-5 text-gray-500 mr-2" />
                  Verification Results (Demo)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                    <span className="text-sm text-blue-100 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.7)]">Blockchain Status</span>
                    <span className="text-sm text-gray-500">Pending Implementation</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                    <span className="text-sm text-blue-100 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.7)]">KYC Verification</span>
                    <span className="text-sm text-gray-500">Pending Implementation</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                    <span className="text-sm text-blue-100 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.7)]">Expiry Status</span>
                    <span className="text-sm text-gray-500">Pending Implementation</span>
                  </div>
                </div>
              </div>

              {/* Technical Info */}
              <div className="mt-8 bg-blue-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-100 mb-3 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.7)]">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-blue-800">Verification Method</p>
                    <p className="text-blue-700">Blockchain-based cryptographic verification</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Response Time</p>
                    <p className="text-blue-700">&lt; 2 seconds (target)</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Security Level</p>
                    <p className="text-blue-700">256-bit encryption</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Supported Formats</p>
                    <p className="text-blue-700">QR Code, NFC, Manual ID</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact for Beta */}
          <div className="mt-8 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-blue-100 mb-2 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.7)]">Interested in Beta Testing?</h3>
              <p className="text-blue-100 text-sm mb-4 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.7)]">
                Join our beta program to test the verification system early
              </p>
              <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-shadow">
                Join Beta Program
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
