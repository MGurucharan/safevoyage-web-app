import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';
import digitalIDService from '../services/digitalIDService';

const AdminDigitalID = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (detectedCodes) => {
    if (detectedCodes && detectedCodes.length > 0 && !loading) {
      setLoading(true);
      setError(null);
      
      try {
        const result = detectedCodes[0].rawValue;
        console.log('QR Code scanned:', result);
        // Parse QR code data
        const qrData = JSON.parse(result);
        
        // Verify digital ID
        const verifyResult = await digitalIDService.verifyDigitalID({
          mongoId: qrData.mongoId,
          transactionHash: qrData.transactionHash
        });
        
        setVerificationResult(verifyResult.data);
        setShowScanner(false);
      } catch (err) {
        setError(err.message || 'Failed to verify Digital ID');
        setVerificationResult(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Failed to scan QR code');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-8">Admin Digital ID Options</h1>
      
      {!showScanner && !verificationResult && (
        <div className="space-x-4">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
            onClick={() => navigate('/digital-id')}
          >
            Issue ID
          </button>
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg"
            onClick={() => setShowScanner(true)}
          >
            Verify ID
          </button>
        </div>
      )}

      {showScanner && (
        <div className="w-full max-w-md">
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
          <button
            className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg w-full"
            onClick={() => setShowScanner(false)}
          >
            Cancel Scanning
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {verificationResult && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
          <h2 className="font-bold mb-2">Verification Result:</h2>
          <pre>{JSON.stringify(verificationResult, null, 2)}</pre>
          <button
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
            onClick={() => setVerificationResult(null)}
          >
            Verify Another
          </button>
        </div>
      )}
    </div>
);
};

export default AdminDigitalID;