import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Shield, CheckCircle } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import Dashboard from './Dashboard';
import Alert from './Alert';

const Admin = () => {

  const { isAdmin } = useAdminAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-login', { state: { from: '/admin' } });
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  // Apply landing page background and overlay
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Digital ID Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl p-6">
            <div className="flex items-center mb-6">
              <CreditCard className="h-8 w-8 text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Digital ID</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Issue ID Card */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-3 rounded-lg">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">Issue New ID</h3>
                    <p className="text-gray-300 text-sm">Create digital tourist identification</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Generate secure, blockchain-verified digital IDs for tourists with KYC validation and real-time verification capabilities.
                </p>
                <button
                  onClick={() => navigate('/digital-id')}
                  className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white py-3 px-4 rounded-lg transition-colors font-medium"
                >
                  Issue Digital ID
                </button>
              </div>
              {/* Verification Card */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-400 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">ID Verification</h3>
                    <p className="text-gray-300 text-sm">Verify existing digital IDs</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Verify the authenticity of digital tourist IDs using blockchain technology and real-time validation systems.
                </p>
                <button
                  onClick={() => navigate('/verification')}
                  className="w-full bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white py-3 px-4 rounded-lg transition-colors font-medium"
                >
                  Verify Digital ID
                </button>
              </div>
            </div>
            {/* Stats Row */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">1,247</div>
                <div className="text-sm text-gray-400">IDs Issued Today</div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">98.5%</div>
                <div className="text-sm text-gray-400">Verification Success Rate</div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">24,891</div>
                <div className="text-sm text-gray-400">Total Active IDs</div>
              </div>
            </div>
          </div>
          {/* Dashboard Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Dashboard</h2>
            <Dashboard />
          </div>
          {/* Alerts Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Alerts</h2>
            <Alert />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
