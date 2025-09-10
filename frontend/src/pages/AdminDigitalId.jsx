import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';
import digitalIDService from '../services/digitalIDService';
import authService from '../services/authService';

const AdminDigitalID = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const [showUserIDInput, setShowUserIDInput] = useState(false);
  const [userID, setUserID] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUserIDSubmit = async (e) => {
    e.preventDefault();
    if (!userID.trim()) {
      setError('Please enter a User ID');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authService.getProfileByUserID(userID.trim());
      if (response.success) {
        setUserProfile(response.data);
        // Navigate to DigitalID page with pre-filled data
        navigate('/digital-id', { 
          state: { 
            prefillData: {
              fullName: response.data.fullName,
              email: response.data.email,
              phone: response.data.phone,
              dateOfBirth: response.data.dateOfBirth ? new Date(response.data.dateOfBirth).toISOString().split('T')[0] : '',
              nationality: response.data.nationality,
              passportNumber: response.data.passportNumber,
              aadhaarNumber: response.data.aadhaarNumber,
              address: response.data.address
            }
          }
        });
      }
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      setError(err.message || 'Failed to fetch user profile. Please check the User ID.');
    } finally {
      setLoading(false);
    }
  };

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
    setShowUserIDInput(false);
    setUserID('');
    setUserProfile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Admin Digital ID Management
        </h1>
        
        {!showScanner && !showUserIDInput && !verificationResult && !error && (
          <div className="text-center space-y-6">
            <p className="text-gray-600 mb-8">
              Choose an option to manage Digital IDs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                onClick={() => setShowUserIDInput(true)}
              >
                <span className="mr-2">🆔</span>
                Issue ID with User ID
              </button>
              <button
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                onClick={() => navigate('/digital-id')}
              >
                <span className="mr-2">📄</span>
                Issue New ID (Manual)
              </button>
              <button
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                onClick={() => setShowScanner(true)}
              >
                <span className="mr-2">🔍</span>
                Verify ID
              </button>
            </div>
          </div>
        )}

        {showUserIDInput && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Enter User ID to Issue Digital ID
            </h2>
            <form onSubmit={handleUserIDSubmit} className="max-w-md mx-auto">
              <div className="mb-4">
                <input
                  type="text"
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                  placeholder="Enter User ID (e.g., SV-2025-123456)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors duration-200"
                >
                  {loading ? 'Fetching...' : 'Fetch Profile & Issue ID'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserIDInput(false);
                    setUserID('');
                    setError(null);
                  }}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {showScanner && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Scan QR Code to Verify Digital ID
            </h2>
            <div className="max-w-md mx-auto bg-black rounded-lg overflow-hidden">
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
              <div className="mt-4 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Verifying...</span>
              </div>
            )}
            <button
              className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors duration-200"
              onClick={() => setShowScanner(false)}
              disabled={loading}
            >
              Cancel Scanning
            </button>
          </div>
        )}

        {error && (
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl">❌</span>
              </div>
              <h2 className="text-xl font-bold text-red-800 mb-2">
                Error
              </h2>
              <p className="text-red-700">{error}</p>
            </div>
            <button
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
              onClick={resetVerification}
            >
              Try Again
            </button>
          </div>
        )}

        {verificationResult && (
          <div className="text-center">
            {verificationResult.verified ? (
              // VERIFIED SUCCESSFULLY UI
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-6xl">✅</span>
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-4">
                  {verificationResult.message}
                </h2>
                <div className="text-left bg-white rounded-lg p-4 border border-green-100">
                  <h3 className="font-semibold text-green-800 mb-3">Tourist Details:</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Name:</span> {verificationResult.data.touristDetails.name}</div>
                    <div><span className="font-medium">Email:</span> {verificationResult.data.touristDetails.email}</div>
                    <div><span className="font-medium">Phone:</span> {verificationResult.data.touristDetails.phone}</div>
                    <div><span className="font-medium">Address:</span> {verificationResult.data.touristDetails.address}</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-green-100">
                    <div className="text-xs text-green-700 space-y-1">
                      <div><span className="font-medium">Verification Date:</span> {new Date(verificationResult.data.verificationDate).toLocaleString()}</div>
                      <div><span className="font-medium">Transaction Hash:</span> {verificationResult.data.transactionHash}</div>
                      <div><span className="font-medium">Hash Match:</span> {verificationResult.data.hashMatch ? '✅ Yes' : '❌ No'}</div>
                      <div><span className="font-medium">Blockchain Verified:</span> {verificationResult.data.blockchainVerified ? '✅ Yes' : '❌ No'}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // UNABLE TO VERIFY UI
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-6xl">❌</span>
                </div>
                <h2 className="text-2xl font-bold text-red-800 mb-4">
                  {verificationResult.message}
                </h2>
                <div className="text-left bg-white rounded-lg p-4 border border-red-100">
                  <h3 className="font-semibold text-red-800 mb-3">Verification Failed</h3>
                  <div className="text-sm text-red-700 mb-3">
                    <span className="font-medium">Reason:</span> {verificationResult.reason}
                  </div>
                  {verificationResult.data && verificationResult.data.touristDetails && (
                    <div>
                      <h4 className="font-medium text-red-800 mb-2">Tourist Details Found:</h4>
                      <div className="space-y-1 text-sm text-red-700">
                        <div><span className="font-medium">Name:</span> {verificationResult.data.touristDetails.name}</div>
                        <div><span className="font-medium">Email:</span> {verificationResult.data.touristDetails.email}</div>
                        <div><span className="font-medium">Phone:</span> {verificationResult.data.touristDetails.phone}</div>
                        <div><span className="font-medium">Address:</span> {verificationResult.data.touristDetails.address}</div>
                      </div>
                      {verificationResult.data.hashMatch !== undefined && (
                        <div className="mt-3 pt-2 border-t border-red-100 text-xs text-red-600">
                          <div><span className="font-medium">Hash Match:</span> {verificationResult.data.hashMatch ? '✅ Yes' : '❌ No'}</div>
                          <div><span className="font-medium">Blockchain Verified:</span> {verificationResult.data.blockchainVerified ? '✅ Yes' : '❌ No'}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
                onClick={resetVerification}
              >
                Verify Another ID
              </button>
              <button
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors duration-200"
                onClick={() => navigate('/admin')}
              >
                Back to Admin Panel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDigitalID;