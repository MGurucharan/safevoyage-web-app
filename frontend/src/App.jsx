import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ModalProvider } from './context/ModalContext';
import LandingPage from './pages/LandingPage';
import Admin from './pages/Admin';
import DigitalID from './pages/DigitalID';
import ExplorePlaces from './pages/ExplorePlaces';
import PlaceDetailView from './pages/PlaceDetailView';
import BookHotels from './pages/BookHotels';
import HotelDetailView from './pages/HotelDetailView';
import AdminLogin from './pages/AdminLogin';
import Verification from './pages/Verification';
import { AdminAuthProvider } from './context/AdminAuthProvider';
import { useAdminAuth } from './hooks/useAdminAuth';



import AdminDigitalID from './pages/AdminDigitalID';




function RequireAdmin({ children }) {
  const { isAdmin } = useAdminAuth();
  const location = useLocation();
  if (!isAdmin) {
    return <Navigate to="/admin-login" state={{ from: location.pathname }} replace />;
  }
  return children;
}

function AppContent() {
  const { login } = useAdminAuth();

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <Navbar />
      <main className="relative z-10" style={{ transition: 'filter 0.2s ease-in-out' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore-places" element={<ExplorePlaces />} />
          <Route path="/explore-places/:id" element={<PlaceDetailView />} />
          <Route path="/book-hotels" element={<BookHotels />} />
          <Route path="/book-hotels/:id" element={<HotelDetailView />} />
          <Route path="/admin/digital-id" element={<AdminDigitalID />} />
          <Route path="/digital-id" element={<DigitalID />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/admin" element={
            <RequireAdmin>
              <Admin />
            </RequireAdmin>
          } />
          <Route path="/admin-login" element={<AdminLogin onLogin={login} />} />
          <Route path="/explore" element={<ExplorePlaces />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router basename='/safevoyage-web-app'>
      <AdminAuthProvider>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </AdminAuthProvider>
    </Router>
  );
}

export default App;