import React, { useState } from 'react';
import { AlertTriangle, MapPin, Clock, Filter, Search, Bell, Shield, Info } from 'lucide-react';

const Alerts = () => {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const alerts = [
    {
      id: 1,
      type: 'SOS',
      title: 'Emergency Alert - Tourist in Distress',
      location: 'Times Square, New York City',
      time: '2 minutes ago',
      severity: 'critical',
      status: 'active',
      description: 'Tourist reported feeling unsafe in crowded area. Emergency services dispatched.',
      responders: 3
    },
    {
      id: 2,
      type: 'Weather',
      title: 'Severe Weather Warning',
      location: 'Central Park Area',
      time: '15 minutes ago',
      severity: 'high',
      status: 'monitoring',
      description: 'Heavy thunderstorm approaching. Tourists advised to seek indoor shelter.',
      responders: 1
    },
    {
      id: 3,
      type: 'Crime',
      title: 'Increased Criminal Activity',
      location: 'Brooklyn Bridge Vicinity',
      time: '1 hour ago',
      severity: 'medium',
      status: 'investigating',
      description: 'Reports of pickpocketing incidents. Extra security patrols deployed.',
      responders: 5
    },
    {
      id: 4,
      type: 'Geo-fence',
      title: 'Restricted Area Entry',
      location: 'Wall Street Financial District',
      time: '2 hours ago',
      severity: 'low',
      status: 'resolved',
      description: 'Tourist entered restricted zone. Successfully guided to safe area.',
      responders: 2
    },
    {
      id: 5,
      type: 'Medical',
      title: 'Medical Emergency',
      location: 'Statue of Liberty',
      time: '3 hours ago',
      severity: 'critical',
      status: 'resolved',
      description: 'Tourist required medical assistance. Ambulance dispatched and situation handled.',
      responders: 4
    },
    {
      id: 6,
      type: 'Traffic',
      title: 'Road Closure Alert',
      location: 'Manhattan Bridge',
      time: '4 hours ago',
      severity: 'medium',
      status: 'active',
      description: 'Bridge temporarily closed due to maintenance. Alternative routes suggested.',
      responders: 1
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-300 bg-red-400/20 border-red-400/30';
      case 'high': return 'text-orange-300 bg-orange-400/20 border-orange-400/30';
      case 'medium': return 'text-yellow-300 bg-yellow-400/20 border-yellow-400/30';
      case 'low': return 'text-green-300 bg-green-400/20 border-green-400/30';
      default: return 'text-gray-300 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-red-300 bg-red-400/20';
      case 'monitoring': return 'text-orange-300 bg-orange-400/20';
      case 'investigating': return 'text-blue-300 bg-blue-400/20';
      case 'resolved': return 'text-green-300 bg-green-400/20';
      default: return 'text-gray-300 bg-gray-400/20';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'SOS': return <AlertTriangle className="h-5 w-5" />;
      case 'Weather': return <Info className="h-5 w-5" />;
      case 'Crime': return <Shield className="h-5 w-5" />;
      case 'Geo-fence': return <MapPin className="h-5 w-5" />;
      case 'Medical': return <Bell className="h-5 w-5" />;
      case 'Traffic': return <Info className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filterType === 'all' || alert.type.toLowerCase() === filterType.toLowerCase();
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Apply landing page background and overlay
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        backgroundImage: `url(https://media.istockphoto.com/id/1362422378/photo/abstract-blurred-purple-background-light-spot-on-dark-background.jpg?s=612x612&w=0&k=20&c=yFF6-7r_YZQ-r3rTgMPU5n4w-5x3qy0e0wZwZukM2c0=)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl p-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">Alert Management</h1>
          <p className="text-gray-300">Monitor and manage real-time safety alerts for tourists</p>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Active Alerts</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <div className="p-2 bg-red-400/20 backdrop-blur-sm border border-red-400/30 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Resolved Today</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <div className="p-2 bg-green-400/20 backdrop-blur-sm border border-green-400/30 rounded-lg">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Response Time</p>
                <p className="text-2xl font-bold text-white">3.2m</p>
              </div>
              <div className="p-2 bg-blue-400/20 backdrop-blur-sm border border-blue-400/30 rounded-lg">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Areas Monitored</p>
                <p className="text-2xl font-bold text-white">156</p>
              </div>
              <div className="p-2 bg-purple-400/20 backdrop-blur-sm border border-purple-400/30 rounded-lg">
                <MapPin className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search alerts by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
              >
                <option value="all" className="bg-gray-800">All Types</option>
                <option value="sos" className="bg-gray-800">SOS</option>
                <option value="weather" className="bg-gray-800">Weather</option>
                <option value="crime" className="bg-gray-800">Crime</option>
                <option value="geo-fence" className="bg-gray-800">Geo-fence</option>
                <option value="medical" className="bg-gray-800">Medical</option>
                <option value="traffic" className="bg-gray-800">Traffic</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-6">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg hover:bg-gray-900/70 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl backdrop-blur-sm border ${getSeverityColor(alert.severity)}`}>
                      {getTypeIcon(alert.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{alert.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-300">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{alert.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getStatusColor(alert.status)}`}>
                      {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{alert.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-300">
                      <span className="font-medium">{alert.responders}</span> responders assigned
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 text-blue-300 bg-blue-400/20 backdrop-blur-sm border border-blue-400/30 rounded-lg hover:bg-blue-400/30 transition-colors text-sm font-medium">
                      View Details
                    </button>
                    {alert.status === 'active' && (
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-colors text-sm font-medium">
                        Respond
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg">
            <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No alerts found</h3>
            <p className="text-gray-300">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;