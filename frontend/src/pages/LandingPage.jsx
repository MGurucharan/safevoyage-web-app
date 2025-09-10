import React, { useState } from 'react';
import { Shield, Bot, Brain, MapPin, ArrowRight, Check } from 'lucide-react';

// NOTE: To make the <Link> component functional, you would wrap the App
// in a Router in your main application file (e.g., index.js).
// For this component file, we'll use a standard <a> tag as a placeholder.
const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;


// --- PanicButton Component ---
// This component provides the SOS button functionality and confirmation modal.
const PanicButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [alertSent, setAlertSent] = useState(false);

    const handlePanic = () => {
        if (isLoading || alertSent) return;

        setIsLoading(true);
        // Simulate sending an alert, then show the confirmation modal
        setTimeout(() => {
            setIsLoading(false);
            setAlertSent(true);
        }, 2000);
    };

    const closeAlert = () => {
        setAlertSent(false);
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
                <button
                    onClick={handlePanic}
                    className={`relative flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-red-600 text-white font-bold text-lg shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-400 ${isLoading ? 'scale-110 cursor-not-allowed' : ''}`}
                >
                    {!isLoading && (
                         <div className="transition-opacity duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 sm:h-10 sm:w-10">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </div>
                    )}
                   
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* Simple animation for the SOS button spinner */}
                            <style>{`
                                @keyframes spin {
                                    from { transform: rotate(0deg); }
                                    to { transform: rotate(360deg); }
                                }
                                .animate-spin {
                                    animation: spin 1s linear infinite;
                                }
                            `}</style>
                            <div className="h-14 w-14 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                        </div>
                    )}
                </button>
            </div>

            {alertSent && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 transition-opacity duration-300">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center relative transform transition-all duration-300 scale-100">
                         <button onClick={closeAlert} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="mx-auto mb-6 inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                        </div>
                        
                        <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">Emergency Alert Sent!</h2>
                        <p className="text-gray-600 mb-6">
                            Your location and emergency details have been sent to local authorities and emergency contacts.
                        </p>

                        <ul className="text-left space-y-3 mb-8 text-gray-700">
                            <li className="flex items-center">
                                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                <span>GPS coordinates shared</span>
                            </li>
                            <li className="flex items-center">
                                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                <span>Emergency services notified</span>
                            </li>
                             <li className="flex items-center">
                                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                <span>Contacts alerted</span>
                            </li>
                        </ul>
                        
                        <div className="bg-blue-50 p-4 rounded-lg text-left">
                           <p className="font-bold text-blue-800">Help is on the way!</p>
                           <p className="text-sm text-blue-700">Stay calm and stay where you are if safe.</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


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
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/digital-id"
                            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                            Get Started Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                    
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

