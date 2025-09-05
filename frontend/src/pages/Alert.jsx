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
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100';
      case 'monitoring': return 'text-orange-600 bg-orange-100';
      case 'investigating': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Alert Management</h1>
          <p className="text-gray-600">Monitor and manage real-time safety alerts for tourists</p>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-2xl font-bold text-blue-600">3.2m</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Areas Monitored</p>
                <p className="text-2xl font-bold text-purple-600">156</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search alerts by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="sos">SOS</option>
                <option value="weather">Weather</option>
                <option value="crime">Crime</option>
                <option value="geo-fence">Geo-fence</option>
                <option value="medical">Medical</option>
                <option value="traffic">Traffic</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-6">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${getSeverityColor(alert.severity)}`}>
                      {getTypeIcon(alert.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{alert.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
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
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{alert.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{alert.responders}</span> responders assigned
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                      View Details
                    </button>
                    {alert.status === 'active' && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
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
          <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;