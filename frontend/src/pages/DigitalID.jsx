import React, { useState } from 'react';
import { CreditCard, User, FileText, CheckCircle, Upload, Calendar, MapPin } from 'lucide-react';
import digitalIDService from '../services/digitalIDService';

const DigitalID = () => {
  const [hasDigitalID, setHasDigitalID] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);
  const backgroundImageUrl = 'https://media.istockphoto.com/id/1362422378/photo/abstract-blurred-purple-background-light-spot-on-dark-background.jpg?s=612x612&w=0&k=20&c=yFF6-7r_YZQ-r3rTgMPU5n4w-5x3qy0e0wZwZukM2c0=';
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    aadhaarNumber: '',
    address: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGenerateID = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    try {
      // Prepare user data for digital ID generation
      const userData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        additionalInfo: {
          dateOfBirth: formData.dateOfBirth,
          nationality: formData.nationality,
          passportNumber: formData.passportNumber,
          aadhaarNumber: formData.aadhaarNumber
        }
      };

      // Call backend to generate digital ID
      const result = await digitalIDService.generateDigitalID(userData);
      
      // Set QR code from response (it's a base64 image)
      setQrCode(result.data.qrCode);
      
      // Show success message
      setShowSuccess(true);
      
      // Update UI after success
      setTimeout(() => {
        setShowSuccess(false);
        setHasDigitalID(true);
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to generate Digital ID');
      setShowSuccess(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const digitalIDData = {
    id: 'SVG-2025-001847',
    name: formData.fullName,
    nationality: formData.nationality,
    issueDate: '2025-01-15',
    expiryDate: '2026-01-15',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ID Generated Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your digital ID has been created and is now active. You can use it for secure tourist verification.
          </p>
          
          {qrCode && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Your Digital ID QR Code:</h3>
              <div className="flex justify-center">
                <img 
                  src={qrCode} 
                  alt="Digital ID QR Code"
                  className="border-2 border-gray-300 p-2 rounded-lg shadow-md max-w-48 max-h-48"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Scan this QR code for verification
              </p>
            </div>
          )}
          
          <div className="space-y-2 text-sm text-gray-500">`
            <p>✓ Blockchain verification complete</p>
            <p>✓ KYC validation successful</p>
            <p>✓ Digital signature applied</p>
          </div>
        </div>
      </div>
    );
  }

  if (hasDigitalID) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Digital ID</h1>
            <p className="text-gray-600">Blockchain-verified tourist identification</p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-8 w-8" />
                <div>
                  <h2 className="text-xl font-bold">SafeVoyage Digital ID</h2>
                  <p className="text-blue-100 text-sm">Tourist Verification Card</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-100">ID Number</p>
                <p className="font-mono font-bold">{digitalIDData.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <div className="space-y-4">
                  <div>
                    <p className="text-blue-100 text-sm">Full Name</p>
                    <p className="text-xl font-bold">{digitalIDData.name}</p>
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm">Nationality</p>
                    <p className="font-semibold">{digitalIDData.nationality}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-blue-100 text-sm">Issue Date</p>
                      <p className="font-semibold">{digitalIDData.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm">Expiry Date</p>
                      <p className="font-semibold">{digitalIDData.expiryDate}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <img
                  src={digitalIDData.photo}
                  alt="Profile"
                  className="w-32 h-32 rounded-xl object-cover border-4 border-white/20"
                />
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="font-semibold">Verified Status</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>KYC Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Blockchain Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Biometric Linked</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Emergency Enabled</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
            <button className="flex items-center justify-center space-x-2 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">Download PDF</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <User className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Update Profile</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <MapPin className="h-5 w-5 text-red-600" />
              <span className="font-semibold">Share Location</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative font-sans min-h-screen overflow-x-hidden"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-4">Get Your Digital ID</h1>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Create a secure, blockchain-verified digital identity for safe tourism. 
              Complete KYC verification with your Aadhaar for instant approval.
            </p>
          </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="h-8 w-8" />
              <h2 className="text-2xl font-bold">Digital ID Application</h2>
            </div>
            <p className="text-blue-100">
              Fill out the form below to generate your secure digital tourist ID
            </p>
          </div>

          <form onSubmit={handleGenerateID} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nationality *
                </label>
                <select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your nationality</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="India">India</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Passport Number *
                </label>
                <input
                  type="text"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter passport number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Aadhaar Number *
                </label>
                <input
                  type="text"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="XXXX-XXXX-XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your current address"
                ></textarea>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="h-5 w-5 mr-2 text-blue-600" />
                Document Upload
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Upload Passport Copy</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Upload Aadhaar Copy</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Verification Benefits</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Instant emergency response activation</li>
                    <li>• Real-time location sharing with authorities</li>
                    <li>• Multi-lingual support and assistance</li>
                    <li>• Access to safe zone recommendations</li>
                  </ul>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
                <p className="text-sm font-medium">Error generating Digital ID:</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Generating Digital ID...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Generate Digital ID</span>
                </div>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              By generating your Digital ID, you agree to our terms of service and privacy policy.
              Your data is protected by blockchain encryption.
            </p>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DigitalID;