import React, { useState } from 'react';
import { Shield, Bot, Brain, MapPin, ArrowRight, Check } from 'lucide-react';
import PanicButton from '../components/PanicButton';

// NOTE: To make the <Link> component functional, you would wrap the App
// in a Router in your main application file (e.g., index.js).
// For this component file, we'll use a standard <a> tag as a placeholder.
const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;


// --- LandingPage Component ---
// This is the main component for the landing page content.
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

    const backgroundImageUrl = 'https://media.istockphoto.com/id/1362422378/photo/abstract-blurred-purple-background-light-spot-on-dark-background.jpg?s=612x612&w=0&k=20&c=yFF6-7r_YZQ-r3rTgMPU5n4w-5x3qy0e0wZwZukM2c0=';

    return (
        <div
            className="relative overflow-x-hidden"
            style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="absolute inset-0 bg-black/50"></div> {/* Dark overlay for better readability */}
            
            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tighter">
                            Tourist Safety
                            <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent pb-4">
                                System
                            </span>
                        </h1>
                        {/* --- THIS IS THE CODE FOR THE SELECTED SECTION --- */}
                        <p className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-t from-gray-400 to-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                            A revolutionary platform ensuring tourist safety through cutting-edge technology,
                            real-time monitoring, and intelligent threat detection.
                        </p>
                        {/* --- END OF THE CODE FOR THE SELECTED SECTION --- */}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                            Advanced Safety Features
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Experience next-generation tourist protection with our comprehensive safety ecosystem.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:border-white/20 transition-all duration-300 transform hover:-translate-y-2"
                                >
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-white">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-16">Trusted by Millions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-12 sm:gap-8">
                            <div>
                                <div className="text-4xl sm:text-5xl font-bold mb-2">2.5M+</div>
                                <div className="text-xl opacity-90">Protected Tourists</div>
                            </div>
                            <div>
                                <div className="text-4xl sm:text-5xl font-bold mb-2">150+</div>
                                <div className="text-xl opacity-90">Countries Covered</div>
                            </div>
                            <div>
                                <div className="text-4xl sm:text-5xl font-bold mb-2">99.9%</div>
                                <div className="text-xl opacity-90">Safety Success Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
                        Ready to Travel Safely?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join millions of tourists who trust our platform for their security needs.
                    </p>
                    
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-300">
                        <div className="flex items-center justify-center space-x-2">
                            <Check className="h-5 w-5 text-green-400" />
                            <span>Free Digital ID</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <Check className="h-5 w-5 text-green-400" />
                            <span>24/7 Support</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <Check className="h-5 w-5 text-green-400" />
                            <span>Instant Activation</span>
                        </div>
                    </div>
                </div>
            </section>
            <PanicButton />
        </div>
    );
};

// --- Main App Component ---
// This is the root component that renders the LandingPage.
export default function App() {
  return (
    <LandingPage />
  );
}

