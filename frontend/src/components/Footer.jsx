import React from 'react';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative z-0"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">SafeVoyage</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering tourists with cutting-edge safety technology through blockchain-powered digital IDs, 
              AI-driven alerts, and real-time monitoring systems.
            </p>
            <p className="text-sm text-gray-400">
              © 2025 SafeVoyage™. All rights reserved.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300">support@safevoyage.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300">Safety HQ, Tech City</span>
              </div>
            </div>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-400">Emergency</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">24/7 Emergency Hotline</p>
              <p className="text-xl font-bold text-red-400">911</p>
              <p className="text-sm text-gray-300">Tourist Safety Helpline</p>
              <p className="text-lg font-semibold text-yellow-400">1-800-SAFE-NOW</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            SafeVoyage™ is a registered trademark. Built with ❤️ for tourist safety worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;