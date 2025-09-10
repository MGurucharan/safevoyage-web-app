import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, User } from 'lucide-react';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};


export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      onLogin();
      // Redirect to the page user wanted before login
      const redirectPath = location.state?.from || '/dashboard';
      navigate(redirectPath);
    } else {
      setError('Invalid credentials');
    }
  };

  // Apply landing page background and overlay
  return (
    <div
      className="relative font-sans min-h-screen overflow-x-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(https://media.istockphoto.com/id/1362422378/photo/abstract-blurred-purple-background-light-spot-on-dark-background.jpg?s=612x612&w=0&k=20&c=yFF6-7r_YZQ-r3rTgMPU5n4w-5x3qy0e0wZwZukM2c0=)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl mb-4 transform transition hover:scale-105">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Portal
            </h2>
            <p className="text-gray-500 mt-2 text-center">
              Please log in to access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium 
                       transform transition-all hover:scale-[1.02] hover:shadow-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}