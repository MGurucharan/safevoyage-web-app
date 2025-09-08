import React, { useState } from 'react';
import { Search, Clock, CheckCircle, AlertCircle, QrCode, Camera, X } from 'lucide-react';
import { Scanner } from '@yudiel/react-qr-scanner';
import digitalIDService from '../services/digitalIDService';

const Verification = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [idNumber, setIdNumber] = useState('');

  const handleScan = async (detectedCodes) => {
    if (detectedCodes && detectedCodes.length > 0 && !loading) {
      setLoading(true);
      setError(null);
      
      try {
        const result = detectedCodes[0].rawValue;
        console.log('QR Code scanned:', result);
        
        // Parse QR code data (expects JSON with mongoId and transactionHash)
        const qrData = JSON.parse(result);
        
        if (!qrData.mongoId || !qrData.transactionHash) {
          throw new Error('Invalid QR code format. Missing mongoId or transactionHash.');
        }
        
        // Verify digital ID following the implementation steps
        const verifyResult = await digitalIDService.verifyDigitalID({
          mongoId: qrData.mongoId,
          transactionHash: qrData.transactionHash
        });
        
        console.log('Verification result:', verifyResult);
        setVerificationResult(verifyResult);
        setShowScanner(false);
      } catch (err) {
        console.error('Verification error:', err);
        setError(err.message || 'Failed to verify Digital ID');
        setVerificationResult(null);
        setShowScanner(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleError = (err) => {
    console.error('QR Scanner error:', err);
    setError('Failed to scan QR code. Please try again.');
  };

  const resetVerification = () => {
    setVerificationResult(null);
    setError(null);
    setIdNumber('');
  };

  const handleManualVerification = async () => {
    if (!idNumber.trim()) {
      setError('Please enter a valid ID number');
      return;
    }
    
    setError('Manual ID verification is not yet implemented. Please use QR code scanning.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-xl">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Digital ID Verification</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Verify the authenticity of SafeVoyage Digital IDs using blockchain technology
          </p>
        </div>

        {/* Main Content */}
        {!showScanner && !verificationResult && !error && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">ID Verification Portal</h2>
              <p className="text-green-100">Verify Digital Tourist IDs instantly</p>
            </div>

            <div className="p-8">
              {/* Verification Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* QR Code Scan - Now Functional */}
                <div className="border-2 border-green-200 rounded-xl p-6 text-center bg-green-50 hover:bg-green-100 transition-colors">
                  <QrCode className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-green-800 mb-2">QR Code Scan</h3>
                  <p className="text-sm text-green-700 mb-4">Scan Digital ID QR code for instant verification</p>
                  <button 
                    onClick={() => setShowScanner(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Scan QR Code
                  </button>
                </div>

                {/* Manual ID Lookup - Placeholder */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center opacity-75">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-600 mb-2">ID Number Lookup</h3>
                  <p className="text-sm text-gray-500 mb-4">Enter Digital ID number for verification</p>
                  <input
                    type="text"
                    placeholder="SVG-2025-XXXXXX"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                  />
                  <button 
                    onClick={handleManualVerification}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Verify ID
                  </button>
                </div>
              </div>

              {/* Technical Info */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-900 mb-3">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-blue-800">Verification Method</p>
                    <p className="text-blue-700">Blockchain-based cryptographic verification</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Response Time</p>
                    <p className="text-blue-700">&lt; 2 seconds</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Security Level</p>
                    <p className="text-blue-700">256-bit encryption</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Supported Formats</p>
                    <p className="text-blue-700">QR Code (Active), Manual ID (Coming Soon)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QR Scanner Interface */}
        {showScanner && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Scanning QR Code</h2>
              <p className="text-blue-100">Position the QR code within the camera view</p>
            </div>
            
            <div className="p-8 text-center">
              <div className="max-w-md mx-auto bg-black rounded-lg overflow-hidden mb-6">
                <Scanner
                  onScan={handleScan}
                  onError={handleError}
                  constraints={{ 
                    facingMode: 'environment'
                  }}
                  classNames={{
                    container: 'w-full'
                  }}
                />
              </div>
              
              {loading && (
                <div className="mb-6 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">Verifying Digital ID...</span>
                </div>
              )}
              
              <button
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center mx-auto"
                onClick={() => setShowScanner(false)}
                disabled={loading}
              >
                <X className="h-5 w-5 mr-2" />
                Cancel Scanning
              </button>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-red-600 p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Verification Error</h2>
              <p className="text-red-100">An error occurred during verification</p>
            </div>
            
            <div className="p-8 text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-center mb-4">
                  <AlertCircle className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-2">Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
              
              <button
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
                onClick={resetVerification}
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Verification Results */}
        {verificationResult && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className={`p-8 text-white ${verificationResult.verified ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-red-600 to-pink-600'}`}>
              <h2 className="text-2xl font-bold mb-2">Verification Complete</h2>
              <p className={verificationResult.verified ? 'text-green-100' : 'text-red-100'}>
                {verificationResult.verified ? 'Digital ID has been successfully verified' : 'Digital ID verification failed'}
              </p>
            </div>

            <div className="p-8">
              {verificationResult.verified ? (
                // VERIFIED SUCCESSFULLY UI
                <div className="text-center">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-8 mb-6">
                    <div className="flex items-center justify-center mb-6">
                      <CheckCircle className="h-16 w-16 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-green-800 mb-6">
                      {verificationResult.message}
                    </h3>
                    
                    {/* Tourist Details Card */}
                    <div className="bg-white rounded-lg p-6 border border-green-100 text-left max-w-md mx-auto">
                      <h4 className="font-semibold text-green-800 mb-4 text-center">✅ Verified Tourist Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Name:</span>
                          <span className="text-gray-900">{verificationResult.data.touristDetails.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Email:</span>
                          <span className="text-gray-900">{verificationResult.data.touristDetails.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Phone:</span>
                          <span className="text-gray-900">{verificationResult.data.touristDetails.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Address:</span>
                          <span className="text-gray-900 text-right max-w-xs">{verificationResult.data.touristDetails.address}</span>
                        </div>
                      </div>
                      
                      {/* Verification Metadata */}
                      <div className="mt-6 pt-4 border-t border-green-100">
                        <div className="text-xs text-green-700 space-y-2">
                          <div className="flex justify-between">
                            <span>Verified:</span>
                            <span>{new Date(verificationResult.data.verificationDate).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Hash Match:</span>
                            <span>{verificationResult.data.hashMatch ? '✅ Yes' : '❌ No'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Blockchain:</span>
                            <span>{verificationResult.data.blockchainVerified ? '✅ Verified' : '❌ Failed'}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-2 break-all">
                            <span>TX: {verificationResult.data.transactionHash.substring(0, 20)}...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // UNABLE TO VERIFY UI
                <div className="text-center">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-8 mb-6">
                    <div className="flex items-center justify-center mb-6">
                      <AlertCircle className="h-16 w-16 text-red-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-red-800 mb-6">
                      {verificationResult.message}
                    </h3>
                    
                    <div className="bg-white rounded-lg p-6 border border-red-100 text-left max-w-md mx-auto">
                      <h4 className="font-semibold text-red-800 mb-4 text-center">❌ Verification Failed</h4>
                      <div className="text-red-700 mb-4 text-center">
                        <span className="font-medium">Reason:</span> {verificationResult.reason}
                      </div>
                      
                      {verificationResult.data && verificationResult.data.touristDetails && (
                        <div>
                          <h5 className="font-medium text-red-800 mb-3">Tourist Details Found:</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="font-medium">Name:</span>
                              <span>{verificationResult.data.touristDetails.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Email:</span>
                              <span>{verificationResult.data.touristDetails.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Phone:</span>
                              <span>{verificationResult.data.touristDetails.phone}</span>
                            </div>
                          </div>
                          
                          {verificationResult.data.hashMatch !== undefined && (
                            <div className="mt-4 pt-3 border-t border-red-100 text-xs text-red-600">
                              <div className="flex justify-between">
                                <span>Hash Match:</span>
                                <span>{verificationResult.data.hashMatch ? '✅ Yes' : '❌ No'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Blockchain:</span>
                                <span>{verificationResult.data.blockchainVerified ? '✅ Yes' : '❌ No'}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
                  onClick={resetVerification}
                >
                  Verify Another ID
                </button>
                <button
                  className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors duration-200"
                  onClick={() => window.location.href = '/'}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Info */}
        {!showScanner && !verificationResult && !error && (
          <div className="mt-8 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-2">🔒 Secure Verification</h3>
              <p className="text-gray-600 text-sm mb-4">
                All verifications are performed using blockchain technology for maximum security and authenticity
              </p>
              <div className="text-xs text-gray-500">
                Powered by Ethereum blockchain and 256-bit cryptographic hashing
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verification;
