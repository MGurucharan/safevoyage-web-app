import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, LogOut, User, LogIn } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useUserAuth } from '../hooks/useUserAuth';
import LogoutConfirmModal from './LogoutConfirmModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, targetPath: null });
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, logout } = useAdminAuth();
  const { user, isAuthenticated, logout: userLogout } = useUserAuth();

  const handleModalClose = () => {
    setModalState({ isOpen: false, targetPath: null });
  };

  const handleModalConfirm = () => {
    const targetPath = modalState.targetPath;
    handleLogout();
    navigate(targetPath);
    handleModalClose();
  };

  const handleLogout = (targetPath = '/') => {
    logout();
    navigate(targetPath);
  };

  const handleUserLogout = () => {
    userLogout();
    navigate('/');
  };

  // Updated navLinks
  const navLinks = [
    { name: 'Explore Places', path: '/explore-places' },
    { name: 'Book Hotels', path: '/book-hotels' },
    { name: 'Admin', path: '/admin', admin: true },
  ];

  // User-specific links when authenticated
  const userLinks = [
    { name: 'Dashboard', path: '/user-dashboard' },
    { name: 'Complete Profile', path: '/complete-profile', showWhen: 'incomplete' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-gradient-to-r bg-black backdrop-blur-3xl border-b border-purple-950/60 relative z-10 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              onClick={() => {
                if (isAdmin) {
                  setModalState({ isOpen: true, targetPath: '/' });
                } else {
                  navigate('/');
                }
              }}
              className="flex items-center space-x-2 group cursor-pointer"
            >
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-2 rounded-lg group-hover:scale-105 transition-transform">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                SafeVoyage
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Admin logout button */}
              {isAdmin && (
                <button
                  onClick={() => handleLogout()}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              )}

              {/* User authentication links */}
              {!isAdmin && !isAuthenticated && (
                <>
                  <Link
                    to="/signin"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/signin')
                        ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                        : 'text-gray-200 hover:text-blue-300 hover:bg-white/10'
                    }`}
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/signup"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/signup')
                        ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                        : 'text-gray-200 hover:text-blue-300 hover:bg-white/10'
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}

              {/* User links when authenticated */}
              {!isAdmin && isAuthenticated && (
                <>
                  {userLinks.map((link) => {
                    if (link.showWhen === 'incomplete' && user?.isProfileComplete) return null;
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive(link.path)
                            ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                            : 'text-gray-200 hover:text-blue-300 hover:bg-white/10'
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                  <button
                    onClick={handleUserLogout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}

              {/* Main navigation links */}
              {navLinks.map((link) => (
                link.admin ? (
                  <button
                    key={link.name}
                    onClick={() => {
                      if (isAdmin) {
                        navigate(link.path);
                      } else {
                        navigate('/admin-login', { state: { from: link.path } });
                      }
                    }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                        : 'text-gray-200 hover:text-blue-300 hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </button>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => {
                      if (isAdmin) {
                        setModalState({ isOpen: true, targetPath: link.path });
                      } else {
                        navigate(link.path);
                      }
                    }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                        : 'text-gray-200 hover:text-blue-300 hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </button>
                )
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-200 hover:text-white hover:bg-white/10"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/80 border-t border-white/10">
                {/* Authentication links for mobile */}
                {!isAdmin && !isAuthenticated && (
                  <>
                    <Link
                      to="/signin"
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive('/signin')
                          ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                          : 'text-gray-200 hover:text-blue-300 hover:bg-white/10'
                      }`}
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive('/signup')
                          ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                          : 'text-gray-200 hover:text-blue-300 hover:bg-white/10'
                      }`}
                    >
                      <User className="h-4 w-4" />
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}

                {/* User links for mobile */}
                {!isAdmin && isAuthenticated && (
                  <>
                    {userLinks.map((link) => {
                      if (link.showWhen === 'incomplete' && user?.isProfileComplete) return null;
                      return (
                        <Link
                          key={link.name}
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                            isActive(link.path)
                              ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                              : 'text-gray-200 hover:text-blue-300 hover:bg-white/10'
                          }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleUserLogout();
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </>
                )}

                {/* Main navigation for mobile */}
                {navLinks.map((link) => (
                  link.admin ? (
                    <button
                      key={link.name}
                      onClick={() => {
                        setIsMenuOpen(false);
                        if (isAdmin) {
                          navigate(link.path);
                        } else {
                          navigate('/admin-login', { state: { from: link.path } });
                        }
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive(link.path)
                          ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                          : 'text-gray-200 hover:text-blue-300 hover:bg-white/10'
                      }`}
                    >
                      {link.name}
                    </button>
                  ) : (
                    <button
                      key={link.name}
                      onClick={() => {
                        setIsMenuOpen(false);
                        if (isAdmin) {
                          setModalState({ isOpen: true, targetPath: link.path });
                        } else {
                          navigate(link.path);
                        }
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive(link.path)
                          ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                          : 'text-gray-200 hover:text-blue-300 hover:bg-white/10'
                      }`}
                    >
                      {link.name}
                    </button>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Render Modal using Portal at document root level */}
      {modalState.isOpen && createPortal(
        <LogoutConfirmModal
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          message="You are currently in Admin mode. You need to log out before accessing other pages. Would you like to logout now?"
        />,
        document.body
      )}
    </>
  );
};

export default Navbar;