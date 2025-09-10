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
              <div className="bg-gradient-to-r from-green-400 to-emerald-400 p-4 rounded-xl">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Digital ID Verification
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Verify the authenticity of SafeVoyage Digital IDs using blockchain technology
            </p>
          </div>

        {/* Main Content */}
        {!showScanner && !verificationResult && !error && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-emerald-400 p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">ID Verification Portal</h2>
              <p className="text-green-100">Verify Digital Tourist IDs instantly</p>
            </div>

            <div className="p-8">
              {/* Verification Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* QR Code Scan - Now Functional */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-green-400/30 rounded-xl p-6 text-center hover:bg-gray-800/50 transition-colors">
                  <QrCode className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-white mb-2">QR Code Scan</h3>
                  <p className="text-sm text-gray-300 mb-4">Scan Digital ID QR code for instant verification</p>
                  <button 
                    onClick={() => setShowScanner(true)}
                    className="w-full bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Scan QR Code
                  </button>
                </div>

                {/* Manual ID Lookup - Placeholder */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-6 text-center opacity-75">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-400 mb-2">ID Number Lookup</h3>
                  <p className="text-sm text-gray-500 mb-4">Enter Digital ID number for verification</p>
                  <input
                    type="text"
                    placeholder="SVG-2025-XXXXXX"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="w-full px-4 py-2 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg mb-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <button 
                    onClick={handleManualVerification}
                    className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Verify ID
                  </button>
                </div>
              </div>

              {/* Technical Info */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-3">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white">Verification Method</p>
                    <p className="text-gray-300">Blockchain-based cryptographic verification</p>
                  </div>
                  <div>
                    <p className="font-medium text-white">Response Time</p>
                    <p className="text-gray-300">&lt; 2 seconds</p>
                  </div>
                  <div>
                    <p className="font-medium text-white">Security Level</p>
                    <p className="text-gray-300">256-bit encryption</p>
                  </div>
                  <div>
                    <p className="font-medium text-white">Supported Formats</p>
                    <p className="text-gray-300">QR Code (Active), Manual ID (Coming Soon)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QR Scanner Interface */}
        {showScanner && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Scanning QR Code</h2>
              <p className="text-blue-100">Position the QR code within the camera view</p>
            </div>
            
            <div className="p-8 text-center">
              <div className="max-w-md mx-auto bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden mb-6">
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
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                  <span className="ml-2 text-gray-300">Verifying Digital ID...</span>
                </div>
              )}
              
              <button
                className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center mx-auto"
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
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-400 to-pink-400 p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Verification Error</h2>
              <p className="text-red-100">An error occurred during verification</p>
            </div>
            
            <div className="p-8 text-center">
              <div className="bg-red-400/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-center mb-4">
                  <AlertCircle className="h-12 w-12 text-red-300" />
                </div>
                <h3 className="text-xl font-bold text-red-300 mb-2">Error</h3>
                <p className="text-red-200">{error}</p>
              </div>
              
              <button
                className="px-8 py-3 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-colors duration-200"
                onClick={resetVerification}
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Verification Results */}
        {verificationResult && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-3xl shadow-xl overflow-hidden">
            <div className={`p-8 text-white ${verificationResult.verified ? 'bg-gradient-to-r from-green-400 to-emerald-400' : 'bg-gradient-to-r from-red-400 to-pink-400'}`}>
              <h2 className="text-2xl font-bold mb-2">Verification Complete</h2>
              <p className={verificationResult.verified ? 'text-green-100' : 'text-red-100'}>
                {verificationResult.verified ? 'Digital ID has been successfully verified' : 'Digital ID verification failed'}
              </p>
            </div>

            <div className="p-8">
              {verificationResult.verified ? (
                // VERIFIED SUCCESSFULLY UI
                <div className="text-center">
                  <div className="bg-green-400/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-8 mb-6">
                    <div className="flex items-center justify-center mb-6">
                      <CheckCircle className="h-16 w-16 text-green-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-green-300 mb-6">
                      {verificationResult.message}
                    </h3>
                    
                    {/* Tourist Details Card */}
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-left max-w-md mx-auto">
                      <h4 className="font-semibold text-green-300 mb-4 text-center">✅ Verified Tourist Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-white">Name:</span>
                          <span className="text-gray-300">{verificationResult.data.touristDetails.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-white">Email:</span>
                          <span className="text-gray-300">{verificationResult.data.touristDetails.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-white">Phone:</span>
                          <span className="text-gray-300">{verificationResult.data.touristDetails.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-white">Address:</span>
                          <span className="text-gray-300 text-right max-w-xs">{verificationResult.data.touristDetails.address}</span>
                        </div>
                      </div>
                      
                      {/* Verification Metadata */}
                      <div className="mt-6 pt-4 border-t border-white/10">
                        <div className="text-xs text-gray-400 space-y-2">
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
                  <div className="bg-red-400/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-8 mb-6">
                    <div className="flex items-center justify-center mb-6">
                      <AlertCircle className="h-16 w-16 text-red-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-red-300 mb-6">
                      {verificationResult.message}
                    </h3>
                    
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-left max-w-md mx-auto">
                      <h4 className="font-semibold text-red-300 mb-4 text-center">❌ Verification Failed</h4>
                      <div className="text-red-200 mb-4 text-center">
                        <span className="font-medium text-white">Reason:</span> {verificationResult.reason}
                      </div>
                      
                      {verificationResult.data && verificationResult.data.touristDetails && (
                        <div>
                          <h5 className="font-medium text-red-300 mb-3">Tourist Details Found:</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="font-medium text-white">Name:</span>
                              <span className="text-gray-300">{verificationResult.data.touristDetails.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium text-white">Email:</span>
                              <span className="text-gray-300">{verificationResult.data.touristDetails.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium text-white">Phone:</span>
                              <span className="text-gray-300">{verificationResult.data.touristDetails.phone}</span>
                            </div>
                          </div>
                          
                          {verificationResult.data.hashMatch !== undefined && (
                            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-gray-400">
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
                  className="px-8 py-3 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-colors duration-200"
                  onClick={resetVerification}
                >
                  Verify Another ID
                </button>
                <button
                  className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors duration-200"
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
            <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-white mb-2">🔒 Secure Verification</h3>
              <p className="text-gray-300 text-sm mb-4">
                All verifications are performed using blockchain technology for maximum security and authenticity
              </p>
              <div className="text-xs text-gray-400">
                Powered by Ethereum blockchain and 256-bit cryptographic hashing
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Verification;
