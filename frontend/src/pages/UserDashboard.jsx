import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Calendar, CreditCard, Settings, LogOut, Mail, IdCard, Clock } from 'lucide-react';
import { useUserAuth } from '../hooks/useUserAuth';

const UserDashboard = () => {
  const { user, logout, refreshUserData } = useUserAuth();

  // Refresh user data when component mounts to get latest userID
  useEffect(() => {
    if (user && user.isProfileComplete && !user.userID) {
      refreshUserData();
    }
  }, [user, refreshUserData]);

//   const handleLogout = () => {
//     logout();
//   };

  return (
    <div 
      className="min-h-screen py-25 px-4"
      style={{
        backgroundImage: `url(https://media.istockphoto.com/id/1362422378/photo/abstract-blurred-purple-background-light-spot-on-dark-background.jpg?s=612x612&w=0&k=20&c=yFF6-7r_YZQ-r3rTgMPU5n4w-5x3qy0e0wZwZukM2c0=)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
              <p className="text-gray-300">Manage your SafeVoyage experience from here</p>
            </div>
            {/* <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-600/30 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button> */}
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Explore Places */}
          <Link
            to="/explore-places"
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl hover:bg-gray-900/60 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-full group-hover:scale-110 transition-transform">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Explore Places</h3>
                <p className="text-gray-300 text-sm">Discover amazing destinations</p>
              </div>
            </div>
          </Link>

          {/* Book Hotels */}
          <Link
            to="/book-hotels"
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl hover:bg-gray-900/60 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-3 rounded-full group-hover:scale-110 transition-transform">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Book Hotels</h3>
                <p className="text-gray-300 text-sm">Find perfect accommodations</p>
              </div>
            </div>
          </Link>

          {/* Complete Profile */}
          <Link
            to="/complete-profile"
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl hover:bg-gray-900/60 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-full group-hover:scale-110 transition-transform">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Update Profile</h3>
                <p className="text-gray-300 text-sm">Manage your information</p>
              </div>
            </div>
          </Link>
        </div>

        {/* User Info Card */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <User className="h-6 w-6 mr-2" />
            Your Account
          </h2>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="w-full pl-10 pr-4 py-2.5 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg text-white">
                    {user?.email}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-white mb-2">Profile Status</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="w-full pl-10 pr-4 py-2.5 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg text-white flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${user?.isProfileComplete ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    {user?.isProfileComplete ? 'Profile Complete' : 'Profile Incomplete'}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-white mb-2">User ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IdCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="w-full pl-10 pr-4 py-2.5 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg text-white flex items-center justify-between">
                    <span className="font-mono">
                      {user?.userID ? user.userID : (
                        <span className="text-yellow-400">
                          Complete profile to get your User ID
                        </span>
                      )}
                    </span>
                    {user?.isProfileComplete && !user?.userID && (
                      <button
                        onClick={refreshUserData}
                        className="ml-3 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                      >
                        Refresh
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-white mb-2">Member Since</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="w-full pl-10 pr-4 py-2.5 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg text-white">
                    {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!user?.isProfileComplete && (
            <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
              <p className="text-yellow-400 text-sm">
                Complete your profile to unlock all SafeVoyage features and get your unique User ID.
              </p>
              <Link
                to="/complete-profile"
                className="inline-block mt-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
              >
                Complete Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
