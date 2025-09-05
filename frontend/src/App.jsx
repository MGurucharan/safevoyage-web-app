import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DigitalID from './pages/DigitalID';
import Alerts from './pages/Alert';
import ExplorePlaces from './pages/ExplorePlaces';
import PlaceDetailView from './pages/PlaceDetailView';
import BookHotels from './pages/BookHotels';
import HotelDetailView from './pages/HotelDetailView';


function App() {
  return (
    <Router basename='/safevoyage-web-app'>
      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/explore-places" element={<ExplorePlaces />} />
            <Route path="/explore-places/:id" element={<PlaceDetailView />} />
            <Route path="/book-hotels" element={<BookHotels />} />
            <Route path="/book-hotels/:id" element={<HotelDetailView />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/digital-id" element={<DigitalID />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/explore" element={<ExplorePlaces />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;