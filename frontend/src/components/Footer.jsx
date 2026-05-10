import React from 'react';
import { Shield, Mail, Phone, MapPin, Heart, Globe, Star } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Consistent Theme Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(https://media.istockphoto.com/id/1362422378/photo/abstract-blurred-purple-background-light-spot-on-dark-background.jpg?s=612x612&w=0&k=20&c=yFF6-7r_YZQ-r3rTgMPU5n4w-5x3qy0e0wZwZukM2c0=)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-animation { animation: float 6s ease-in-out infinite; }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-1">
            <div className="float-animation">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4 rounded-2xl shadow-2xl">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    SafeVoyage
                  </h2>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-xs text-gray-300 ml-2">Trusted by 50K+ travelers</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
                <p className="text-gray-200 leading-relaxed mb-4">
                  Revolutionizing travel safety with cutting-edge blockchain technology, AI-powered alerts, 
                  and real-time protection systems for the modern explorer.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Globe className="h-4 w-4" />
                  <span>Protecting travelers in 180+ countries</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mr-3"></span>
                Get in Touch
              </h3>
              
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email Support', value: 'support@safevoyage.com', color: 'blue' },
                  { icon: Phone, label: 'Call Us', value: '+1 (555) 123-4567', color: 'green' },
                  { icon: MapPin, label: 'Headquarters', value: 'Innovation District, Tech City', color: 'purple' }
                ].map((item, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                      <div className={`p-3 rounded-xl bg-${item.color}-500/20 border border-${item.color}-400/30 group-hover:bg-${item.color}-500/30 transition-colors`}>
                        <item.icon className={`h-5 w-5 text-${item.color}-400`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{item.label}</p>
                        <p className="text-white font-medium">{item.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency Section */}
          <div>
            <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center">
              <span className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-pulse"></span>
              Emergency Contacts
            </h3>
            
            <div className="space-y-4">
              {/* Emergency Hotline */}
              <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-md border border-red-400/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/30 rounded-full mb-3">
                    <Phone className="h-6 w-6 text-red-300" />
                  </div>
                  <p className="text-sm text-red-200 mb-1">24/7 Emergency</p>
                  <p className="text-3xl font-bold text-red-300">911</p>
                  <p className="text-xs text-red-200/70">Immediate Response</p>
                </div>
              </div>

              {/* Tourist Helpline */}
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-purple-400/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/30 rounded-full mb-3">
                    <Shield className="h-6 w-6 text-purple-300" />  
                  </div>
                  <p className="text-sm text-purple-200 mb-1">Tourist Safety</p>
                  <p className="text-xl font-bold text-purple-300">1-800-SAFE-NOW</p>
                  <p className="text-xs text-purple-200/70">Travel Assistance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">© 2025 SafeVoyage™</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">All rights reserved</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-300">
                <span>Built with</span>
                <Heart className="h-4 w-4 text-red-400 animate-pulse" />
                <span>for global safety</span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
                <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
                <span className="hover:text-white transition-colors cursor-pointer">Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;