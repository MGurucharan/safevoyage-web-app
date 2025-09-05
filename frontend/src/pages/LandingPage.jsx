import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Bot, Brain, MapPin, ArrowRight, Check } from 'lucide-react';
import PanicButton from '../components/PanicButton';

const LandingPage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Blockchain Digital ID',
      description: 'Secure, tamper-proof digital identity system powered by blockchain technology for complete tourist verification.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Bot,
      title: 'Multi-lingual Chatbot',
      description: 'AI-powered assistant providing 24/7 support in multiple languages for seamless communication.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Brain,
      title: 'AI Safety Alerts',
      description: 'Intelligent alert system that analyzes real-time data to predict and prevent potential safety risks.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: MapPin,
      title: 'Geo-fencing Protection',
      description: 'Advanced location-based safety zones with automatic alerts when entering high-risk areas.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8">
              Tourist Safety
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                System
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Revolutionary platform ensuring tourist safety through cutting-edge technology, 
              real-time monitoring, and intelligent threat detection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/digital-id"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Get Digital ID
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Advanced Safety Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience next-generation tourist protection with our comprehensive safety ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-16">Trusted by Millions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-2">2.5M+</div>
                <div className="text-xl opacity-90">Protected Tourists</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-2">150+</div>
                <div className="text-xl opacity-90">Countries Covered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-2">99.9%</div>
                <div className="text-xl opacity-90">Safety Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Travel Safely?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join millions of tourists who trust SafeVoyage for their security needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/digital-id"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-600">
            <div className="flex items-center justify-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>Free Digital ID</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>Instant Activation</span>
            </div>
          </div>
        </div>
      </section>

      <PanicButton />
    </div>
  );
};

export default LandingPage;