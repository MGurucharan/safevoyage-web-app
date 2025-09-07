import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, LogOut } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import LogoutConfirmModal from './LogoutConfirmModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, targetPath: null });
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, logout } = useAdminAuth();

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

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  // Updated navLinks with admin-only Digital ID
  const navLinks = [
    { name: 'Explore Places', path: '/explore-places' },
    { name: 'Book Hotels', path: '/book-hotels' },
    { name: 'Digital ID', path: '/digital-id', adminOnly: true }, // Only visible to admins
    { name: 'Admin', path: '/admin', admin: true },
  ];

  // Filter nav links based on admin status
  const visibleNavLinks = navLinks.filter(link => {
    if (link.adminOnly) {
      return isAdmin; // Only show Digital ID if user is admin
    }
    return true; // Show all other links
  });

  const handleNavigation = (link) => {
    if (link.admin) {
      if (isAdmin) {
        navigate(link.path);
      } else {
        navigate('/admin-login', { state: { from: link.path } });
      }
    } else if (link.adminOnly) {
      // Digital ID is admin-only, so admin can access directly
      navigate(link.path);
    } else if (isAdmin) {
      setPendingNavigation(link.path);
      setShowLogoutModal(true);
    } else {
      navigate(link.path);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 relative z-10">
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
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-105 transition-transform">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SafeVoyage
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {isAdmin && (
                <button
                  onClick={() => handleLogout()}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              )}
              {visibleNavLinks.map((link) => (
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
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    {link.name}
                  </button>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => {
                      if (link.adminOnly) {
                        // Digital ID - admin can access directly
                        navigate(link.path);
                      } else if (isAdmin) {
                        setModalState({ isOpen: true, targetPath: link.path });
                      } else {
                        navigate(link.path);
                      }
                    }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
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
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                {visibleNavLinks.map((link) => (
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
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive(link.path)
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                      }`}
                    >
                      {link.name}
                    </button>
                  ) : (
                    <button
                      key={link.name}
                      onClick={() => {
                        setIsMenuOpen(false);
                        if (link.adminOnly) {
                          // Digital ID - admin can access directly
                          navigate(link.path);
                        } else if (isAdmin) {
                          setModalState({ isOpen: true, targetPath: link.path });
                        } else {
                          navigate(link.path);
                        }
                      }}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive(link.path)
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
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